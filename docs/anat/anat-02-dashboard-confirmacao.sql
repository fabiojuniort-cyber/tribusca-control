-- ANAT-02: consulta SELECT fornecida ao Fábio no chat e executada por ele
-- no Railway Dashboard. Não é o diagnóstico ampliado anat-02-sql.sql.
WITH alvos(id, convenio, hash_esperado) AS (
  VALUES
  (
    '07d24640-61a0-45db-8f69-3b064320b2b2'::uuid,
    '52/91',
    'bd035220215bf691ce6dd1c6f8c9d8b8e8c3180f9df43f97f0debd3a3ac1dd83'
  ),
  (
    '4c92f7ce-2e3d-4a61-9524-d4beca0c2af7'::uuid,
    '100/97',
    'fe90af8fb89645b2bf40e8e3f8f6cd2cb4c6c15ef044ce58f1683482de5999f7'
  )
),
dados AS (
  SELECT
    a.*,
    v.id AS versao_id,
    v.version_no,
    v.is_current,
    v.captured_at,
    v.source_metadata #>> '{presentation,format}' AS formato,
    v.source_metadata #>> '{presentation,html}' AS html
  FROM alvos a
  LEFT JOIN public.publication_versions v
    ON v.publication_id = a.id
)
SELECT
  convenio,
  versao_id,
  version_no AS numero_versao,
  is_current AS versao_atual,
  captured_at AS data_captura,
  formato,
  octet_length(html) AS tamanho_html,
  CASE
    WHEN versao_id IS NULL THEN 'VERSAO NAO ENCONTRADA'
    WHEN html IS NULL THEN 'SEM HTML'
    WHEN encode(sha256(convert_to(html, 'UTF8')), 'hex')
         = hash_esperado THEN 'IGUAL AO SNAPSHOT SANITIZADO'
    ELSE 'DIFERENTE — PRECISA COMPARAR'
  END AS comparacao
FROM dados
ORDER BY convenio, version_no;
