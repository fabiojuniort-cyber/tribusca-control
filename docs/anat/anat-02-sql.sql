-- ANAT-02 | origem CLAUDE-COORD; executor GPT-EXEC.
-- Fábio: executar SOMENTE no Railway Dashboard, editor SQL do PostgreSQL.
-- Nunca Railway AI Agent. Executar o bloco inteiro na MESMA conexão.
-- Consulta somente atos oficiais indicados; nenhum dado de empresa/tenant.
-- Schema conferido no backend main ef292f1792f46f93269b2b01efdfcbc4791f5969.
-- Zero DDL/DML, funções de aplicação, locks explícitos, coleta ou refresh.
BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY;
SET LOCAL statement_timeout = '30s';
SET LOCAL lock_timeout = '3s';
SET LOCAL search_path = pg_catalog, public;

SELECT transaction_timestamp() AS consulted_at,
       current_setting('transaction_read_only') AS transaction_read_only,
       current_setting('transaction_isolation') AS transaction_isolation;

-- Leitura da visibilidade: resultado vazio sob RLS não prova ausência física.
-- Não mudar role, grants ou configuração de segurança para contornar restrição.
SELECT c.relname AS table_name, c.relrowsecurity AS rls_enabled,
       c.relforcerowsecurity AS force_rls,
       r.rolsuper AS session_is_superuser, r.rolbypassrls AS session_bypasses_rls,
       c.relowner = r.oid AS session_owns_table,
       has_table_privilege(current_user,c.oid,'SELECT') AS can_select
FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
CROSS JOIN pg_roles r
WHERE n.nspname='public'
  AND c.relname IN ('publications','publication_versions')
  AND r.rolname=current_user;

-- 1. Confirme os campos reais; divergência => parar, ROLLBACK, informar executor.
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND ((table_name = 'publication_versions' AND column_name IN
       ('id','publication_id','version_no','is_current','content_hash',
        'content_text','source_metadata','captured_at'))
    OR (table_name = 'publications' AND column_name IN
       ('id','title','primary_official_url')))
ORDER BY table_name, ordinal_position;

-- 2. Inventário de TODAS as versões, inclusive ausência do ID esperado.
-- content_hash é hash canônico da versão, NÃO hash do HTML/snapshot.
-- saved_page_sha256 é proveniência declarada no metadata; não prova HTML igual.
WITH targets(id, act) AS (VALUES
 ('07d24640-61a0-45db-8f69-3b064320b2b2'::uuid,'Conv. 52/91'),
 ('4c92f7ce-2e3d-4a61-9524-d4beca0c2af7'::uuid,'Conv. 100/97'))
SELECT t.act, t.id AS expected_publication_id, p.id IS NOT NULL AS found,
       p.title, p.primary_official_url,
       v.id AS version_id, v.version_no, v.is_current, v.captured_at,
       v.content_hash,
       v.source_metadata #>> '{presentation,format}' AS presentation_format,
       v.source_metadata #>> '{savedPage,sha256}' AS saved_page_sha256,
       length(v.content_text) AS text_chars,
       octet_length(v.source_metadata #>> '{presentation,html}') AS html_bytes,
       encode(sha256(convert_to(v.content_text,'UTF8')),'hex') AS text_sha256,
       encode(sha256(convert_to(v.source_metadata #>> '{presentation,html}','UTF8')),'hex') AS html_sha256
FROM targets t LEFT JOIN public.publications p ON p.id=t.id
LEFT JOIN public.publication_versions v ON v.publication_id=p.id
ORDER BY t.act, v.version_no;

-- 3. Inventário real das classes preservadas no HTML sanitizado de cada versão.
-- Preserva linha com zero classes/HTML ausente; NULL não é prova de perda.
WITH targets(id, act) AS (VALUES
 ('07d24640-61a0-45db-8f69-3b064320b2b2'::uuid,'Conv. 52/91'),
 ('4c92f7ce-2e3d-4a61-9524-d4beca0c2af7'::uuid,'Conv. 100/97')),
class_counts AS (
 SELECT v.id AS version_id, c.class_name, count(*) AS occurrences
 FROM targets t JOIN public.publication_versions v ON v.publication_id=t.id
 CROSS JOIN LATERAL regexp_matches(
   coalesce(v.source_metadata #>> '{presentation,html}',''),
   $re$class="([^"]*)"$re$, 'g') AS m(parts)
 CROSS JOIN LATERAL regexp_split_to_table(m.parts[1], E'\\s+') AS c(class_name)
 WHERE c.class_name <> '' GROUP BY v.id, c.class_name
)
SELECT t.act, v.id AS version_id, v.version_no, v.is_current,
       v.source_metadata #>> '{presentation,format}' AS presentation_format,
       c.class_name, coalesce(c.occurrences,0) AS occurrences
FROM targets t LEFT JOIN public.publication_versions v ON v.publication_id=t.id
LEFT JOIN class_counts c ON c.version_id=v.id
ORDER BY t.act, v.version_no, c.class_name;

-- 4. Comparação exata com a simulação LOCAL do sanitizador main sobre ops/confaz/acts.
-- MATCH = HTML sanitizado idêntico; DIFFERENT => conferir código/captura/hash.
-- Não permite inferir vigência ou que uma diferença foi causada por sanitização.
WITH targets(id, act, expected_html_sha256) AS (VALUES
 ('07d24640-61a0-45db-8f69-3b064320b2b2'::uuid,'Conv. 52/91',
  'bd035220215bf691ce6dd1c6f8c9d8b8e8c3180f9df43f97f0debd3a3ac1dd83'),
 ('4c92f7ce-2e3d-4a61-9524-d4beca0c2af7'::uuid,'Conv. 100/97',
  'fe90af8fb89645b2bf40e8e3f8f6cd2cb4c6c15ef044ce58f1683482de5999f7')),
observed AS (
 SELECT t.*, v.id AS version_id, v.version_no, v.is_current,
        v.source_metadata #>> '{presentation,format}' AS presentation_format,
        encode(sha256(convert_to(v.source_metadata #>> '{presentation,html}','UTF8')),'hex') AS stored_html_sha256
 FROM targets t LEFT JOIN public.publication_versions v ON v.publication_id=t.id
)
SELECT *, CASE WHEN version_id IS NULL THEN 'MISSING_VERSION'
               WHEN stored_html_sha256 IS NULL THEN 'MISSING_HTML'
               WHEN presentation_format IS DISTINCT FROM 'SANITIZED_HTML' THEN 'FORMAT_DIFFERENT'
               WHEN stored_html_sha256=expected_html_sha256 THEN 'MATCH'
               ELSE 'DIFFERENT' END AS comparison
FROM observed ORDER BY act,version_no;

-- 5. Conteúdo integral APENAS dos dois atos oficiais, por versão.
-- Se o Dashboard truncar células, não declarar conteúdo completo comprovado;
-- use a consulta 6 paginada. Não exportar source_metadata inteiro.
SELECT v.publication_id, v.id AS version_id, v.version_no, v.is_current,
       v.content_text,
       v.source_metadata #>> '{presentation,html}' AS presentation_html
FROM public.publication_versions v
WHERE v.publication_id IN
 ('07d24640-61a0-45db-8f69-3b064320b2b2'::uuid,
  '4c92f7ce-2e3d-4a61-9524-d4beca0c2af7'::uuid)
ORDER BY v.publication_id,v.version_no;

-- 6. Fatias de 8.000 caracteres do HTML: primeira página (fatias 1..10).
-- Para próxima página troque BETWEEN 1 AND 10 por 11 AND 20, etc.,
-- dentro de NOVA transação READ ONLY quando a anterior já terminou.
-- chunk_count indica quando todas as fatias da versão foram lidas.
WITH bodies AS (
 SELECT v.publication_id,v.id AS version_id,v.version_no,v.is_current,
        v.source_metadata #>> '{presentation,html}' AS html
 FROM public.publication_versions v
 WHERE v.publication_id IN
  ('07d24640-61a0-45db-8f69-3b064320b2b2'::uuid,
   '4c92f7ce-2e3d-4a61-9524-d4beca0c2af7'::uuid)
)
SELECT b.publication_id,b.version_id,b.version_no,b.is_current,
       g.chunk_no,ceil(length(b.html)/8000.0)::int AS chunk_count,
       substring(b.html FROM (g.chunk_no-1)*8000+1 FOR 8000) AS html_chunk
FROM bodies b CROSS JOIN LATERAL
 generate_series(1,ceil(length(b.html)/8000.0)::int) AS g(chunk_no)
WHERE g.chunk_no BETWEEN 1 AND 10
ORDER BY b.publication_id,b.version_no,g.chunk_no;

ROLLBACK;
