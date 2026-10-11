# L-11 — Hotfix indexação da confirmação do purge (053)

**Checkpoint de 11/10/2026 (UTC). Estado: PR preparado e benchmark PG18 aprovado; merge/deploy PRODUTIVO NÃO AUTORIZADO/REALIZADO NESTE CHECKPOINT.**
**Progresso: preparação e validação técnica 100%, produção 0%.**

## Evidência operacional recebida de CLAUDE-COORD
- Prévia em produção: 7.460 DOU para apagar, 0 protegidas.
- Primeiro lote: HTTP 500, `statement timeout` reportado em 11/10/2026 02:43:25 UTC. Transação abortada; **0 exclusões**, conforme coordenação. Esta execução não realizou novo purge.
- Hipótese material confirmada no schema: `collection_items.publication_id` sem B-tree (535 mil linhas / aproximadamente 1 GB produtivo), enquanto 051 faz `UPDATE collection_items SET publication_id=NULL WHERE publication_id=ANY(p_ids)`.

## Código em branch/PR
- Backend [PR #207](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/207), branch `fix/l11-index053-purge-20261010`, HEAD `0bb55c7f99c0c924480887c4c2fa864806bb6460`, base `d252f054148217c45664c549e2d1ec5b69a3140a`.
- `migrations/053_collection_filter_purge_lookup_indexes.sql`: somente **seis** `CREATE INDEX IF NOT EXISTS`, sem DELETE/UPDATE de dados, mudança de business rules, SQL da 051 ou grants:
  1. `collection_items(publication_id) WHERE publication_id IS NOT NULL`;
  2. `company_publications(publication_id)`;
  3. `collection_run_publications(publication_version_id) WHERE publication_version_id IS NOT NULL`;
  4. `publication_scope_state(current_event_id,publication_id)`;
  5. `taxonomy_candidate_occurrence_links(occurrence_id)` (inclusive SUPERSEDED);
  6. `collection_filter_new_types` GIN `sample_publication_ids`.
- Teste isolado: `test/collection-filter.l11-index053.integration.test.ts`; workflow dedicado `.github/workflows/l11-index053-pg18.yml`.

## Provas do PostgreSQL 18 (base efêmera, registros sintéticos)
- Ensaio inicial do SHA anterior (três índices): [workflow #38107051650](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38107051650) SUCCESS, **535.500 collection_items**, volume 270.876.672 bytes, prévia **41 ms**, confirmação real de **500 objetos sintéticos em 121 ms**, 535.000 históricos preservados.
- Ensaio do HEAD atual (seis índices): [workflow #38107140180](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38107140180) SUCCESS, **535.500 collection_items**, volume 270.090.240 bytes, prévia **52 ms**, confirmação de **500 objetos sintéticos em 107 ms**, 535.000 históricos preservados, EXPLAIN para UPDATE indexado; 1 PASS, 0 FAIL.
- [CI integral #38107140194](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38107140194): **COMPLETED/SUCCESS** (verify, ONB-01 PG18 e DOU-CLEAN-02 PG18 concluídos).

## Riscos/gates/limites da autorização
- A mensagem recebida oferece opções **A ou B** para execução produtiva do hotfix e **A ou B** para mudar worker/scheduler para acompanhar a main, mas não contém escolha inequívoca do proprietário. **Nenhum merge/deploy ou mudança de pin foi executado.**
- `db:migrate` inicia `BEGIN` e `COMMIT`; `CREATE INDEX` normal (não CONCURRENTLY) bloqueia gravações enquanto constrói o índice. O tempo de 107 ms mede **purge após indexação** em 270 MB isolados, **não** o tempo de construção de índice na tabela produtiva de ~1 GB.
- Caso haja escolha A para hotfix: somente após CI integral SUCCESS, confirmar janela/lock e backup, merge sob HEAD SHA congelado, observar migration 053 e deploy Railway SUCCESS. Nenhuma exclusão de publicações é autorizada como parte do hotfix.
- Até aplicação/validação produtiva, operador **não deve clicar em Continuar**.

## Autorização posterior expressa do proprietário — 11/10/2026 (America/Sao_Paulo)

**Fábio confirmou A + A nesta frente:**
- A para merge e deploy da PR backend #207, com início do deploy na janela de minutos **:20 a :40** de uma hora, distante da coleta na virada da hora. Exigir API SUCCESS e literal `Migration applied: 053_collection_filter_purge_lookup_indexes.sql` nos logs.
- A para retirar `commitSha` fixo de `radar-fiscal-worker` e `radar-fiscal-scheduler`, ligar ambos à branch `main` e observar seus deploys SUCCESS no mesmo SHA do merge da #207.
- Proibição expressa de exclusão de publicações nesta atividade.

**Pré-flight read-only às 00:10–00:13 BRT:** PR #207 OPEN, mergeable, HEAD congelado `0bb55c7f99c0c924480887c4c2fa864806bb6460` e base `d252f054148217c45664c549e2d1ec5b69a3140a`; pipelines CI #38107140194 e benchmark PG18 #38107140180 COMPLETED/SUCCESS. API/worker/scheduler/Postgres online, sem falhas recentes e sem patch Railway pendente. Backend acompanha `main`, worker/scheduler seguem pins anteriores. Snapshot de capacidade nos logs do scheduler em 11/10 03:02 UTC: estimado **76,27% de 5 GiB**, com `collection_items` ~1,10 GB. Backup anterior de 10/10 19:57 BRT informado por Fábio/CLAUDE-COORD, não verificado independentemente aqui. A migration usa CREATE INDEX normal em transação e pode bloquear writes; respeitar janela operacional.

**Aguardando abertura da janela antes do merge que aciona deploy automático.** Os parágrafos de bloqueio por falta de A/B acima são registro anterior, superado por esta autorização; não interpretar como estado atual.
