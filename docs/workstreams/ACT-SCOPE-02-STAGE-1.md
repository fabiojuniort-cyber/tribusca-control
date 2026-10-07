# ACT-SCOPE-02 — Etapa 1 — Levantamento read-only

**Estado observado:** 06/10/2026 22:09–22:10 BRT (07/10/2026 01:09–01:10 UTC)  
**Classificação:** R1/R2 preparatória, somente leitura  
**Backend observado:** `main@6959db9409248eb0efa473c614110b09204756e8`  
**Issue canônica:** #87

## Segurança da execução

O levantamento foi executado por runner temporário `tmp-act-scope-02-inventory`, sem domínio, volume ou TCP proxy, com `restart=NEVER`.

A sessão PostgreSQL comprovou:
- `transaction_read_only = on`;
- isolamento `repeatable read`;
- consultas agregadas somente;
- `ROLLBACK` ao final.

O runner também executou o `db:dou-cleanup-dry-run` existente, cujo contrato é `DRY_RUN_READ_ONLY` e não oferece execução.

O runner temporário foi removido após a captura. Pós-check: Backend, Worker (2/2), Scheduler e Postgres online; zero falhas; nenhum staged change pendente.

## Volume atual

Contagem exata no snapshot:
- publicações: **118.871**;
- origens: **119.007**;
- versões: **118.974**;
- fontes: **9**.

### Fonte / seção / tipo bruto

Foram encontradas **2.374 combinações distintas de fonte + seção + tipo bruto**.

> Importante: 2.374 é o número de combinações brutas observadas, **não** o número de tipos canônicos após normalização. A especificação prevê carga inicial de 1.328 tipos classificados; a diferença reforça a necessidade do mapa de variações de grafia antes da carga do rascunho.

| Fonte | Seção | Publicações ligadas ao grupo | Tipos brutos |
| --- | --- | ---: | ---: |
| cgibs | — | 98 | 11 |
| confaz | — | 2 | 1 |
| doe-sp | — | 3.073 | 16 |
| doe-sp-legado | — | 12 | 1 |
| dou | DO1 | 12.773 | 627 |
| dou | DO1E | 429 | 137 |
| dou | DO2 | 23.005 | 880 |
| dou | DO2E | 24 | 10 |
| dou | DO3 | 77.733 | 653 |
| dou | DO3E | 16 | 11 |
| nfe-encat | — | 510 | 4 |
| rfb-normas | — | 982 | 14 |
| sped | — | 256 | 9 |

Uma publicação pode ter mais de uma origem; por isso a soma dos grupos por fonte não deve ser usada como total global de publicações.

## Bytes por tabela

O snapshot encontrou **78 relações públicas** com aproximadamente **2,57 GiB** somados por `pg_total_relation_size` (inclui índices/TOAST da relação).

Maiores relações:

| Tabela | Tamanho |
| --- | ---: |
| `collection_items` | 983,8 MiB |
| `publication_versions` | 956,1 MiB |
| `publication_origins` | 294,7 MiB |
| `publications` | 173,0 MiB |
| `collection_run_publications` | 89,3 MiB |
| `publication_ncm_scans` | 38,6 MiB |
| `publication_source_feed` | 26,2 MiB |
| `collection_attempts` | 13,4 MiB |
| `publication_scope_events` | 13,3 MiB |
| `official_catalog_entries` | 9,2 MiB |
| `taxonomy_aliases` | 7,6 MiB |
| `publication_scope_state` | 5,3 MiB |

Isso confirma que qualquer futura exclusão física precisa medir impacto em `collection_items` e `publication_versions`, não apenas em `publications`.

## Estado persistido do dou-scope

No snapshot DOU:
- publicações DOU: **113.975**;
- com alguma decisão `douScope` persistida: **2.875**;
- sem decisão persistida: **111.100**;
- decisões mistas por publicação: **0**;
- KEEP persistido: **10**;
- REVIEW persistido: **2.865**;
- IGNORE persistido: **0**.

Conclusão: ACT-SCOPE-02 **não pode tratar o metadata legado como catálogo completo de decisões**. O novo motor versionado precisa recalcular/simular o acervo.

## Reavaliação pelo motor atual dou-scope-v4

O `db:dou-cleanup-dry-run` existente avaliou as **113.975** publicações DOU:

- candidatas: **23.024**;
- KEEP: **81.063**;
- REVIEW: **9.888**;
- candidatas DO2: **23.002**;
- candidatas DO2E: **22**;
- candidatas já ocultas: **0**;
- com vínculos a empresas: **0**;
- com matches de empresa: **0**;
- com runs de taxonomia: **0**;
- com menções NCM: **0**.

Motivos REVIEW mais frequentes no dry-run:
- material de apresentação não examinado: **3.752**;
- decisão REVIEW/escopo inválido persistido: **2.865**;
- completude histórica de texto não comprovada: **2.668**;
- conflito/ausência de tipo em extrato contratual: **490**.

A execução terminou com `READ_ONLY; NO_WRITE; EXECUTION_NOT_AVAILABLE`.

## Achados para as próximas etapas

1. O mapa de normalização é obrigatório antes de considerar os 1.328 tipos como carga inicial canônica.
2. O metadata legado de `douScope` cobre apenas uma fração do DOU; a primeira política deve ser simulada novamente sobre o acervo.
3. A maior oportunidade de bytes está em `collection_items` e `publication_versions`; SUPPRESS não equivale a economia física de armazenamento.
4. Os testes úteis do ACT-SCOPE-01/#164 continuam relevantes como guardas fail-open, mas a política fixa daquele PR não será portada.
5. Nenhuma exclusão, SUPPRESS ou mudança de coleta foi feita nesta etapa.

## Gate

**Etapa 1 executada e documentada; aguarda aprovação do responsável antes da Etapa 2 — PLATFORM_ADMIN.**
