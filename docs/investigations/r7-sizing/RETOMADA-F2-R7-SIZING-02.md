# F2-R7-SIZING-02 — desenho de retomada (somente revisão; nada publicado)

Preserva: run 42132149543 (SHA 7f2e69d…), grant F2-R7-SIZING-01 e workflow
`f2-r7-sizing-manual.yml` ficam intactos e consumidos. Saldo: 1 disparo, 0/6 PG18.

## Peças novas
- Workflow distinto `f2-r7-sizing-02.yml`, `F2_GRANT=F2-R7-SIZING-02`, só `workflow_dispatch`,
  `concurrency: f2-r7-sizing-02`, matriz 6k → 18k → 45k encadeada por `needs` + `result=='success'`,
  1 tentativa por árvore (máx. 6 PG18), zero retries, parada na primeira anomalia (run-stage.mjs inalterado).
- PASS novo no #127, linha exata:
  `COORD_PASS_R7_SIZING_02 <sha40> prev_run=42132149543`
- Permissões: as mesmas do 01. `pull-requests: read` entra SOMENTE se a sonda provar
  a hipótese (ver diagnóstico), em PR próprio revisado.

## Rejeições (cada uma vira teste offline no manual-gate)
| Ameaça | Regra | Erro |
|---|---|---|
| re-run | `GITHUB_RUN_ATTEMPT==='1'`, checado antes de qualquer request | manual_context_blocked |
| disparo duplicado | inventário paginado de `f2-r7-sizing-02.yml`; qualquer id < atual bloqueia; concurrency serializa | budget_already_assigned |
| SHA divergente | `reviewed_head===GITHUB_SHA`, 40 hex, e o PASS contém esse SHA | manual_context_blocked / coordinator_pass_missing |
| PASS inválido | autor `fabiojuniort-cyber`, `issue_url` termina em `/issues/127`, linha exata com `prev_run=42132149543`, `updated_at===created_at` (não editado), `created_at` posterior ao commit do SHA | coordinator_pass_missing |
| falha ao ler inventário | qualquer não-2xx, transporte, JSON inválido, `workflow_runs` não-array ou >20 páginas → fail closed, com `stage` e `http_status` | authorization_* / run_inventory_* |
| histórico | gate confirma, via inventário do workflow 01, que existe exatamente 1 run (42132149543) e que ele não está em execução | prior_run_mismatch |

Testes a adicionar: os 10 atuais + `prev_run` ausente/errado, comentário editado,
PASS do 01 reaproveitado (prefixo antigo deve falhar), inventário 01 com 0 ou 2 runs.

## Pré-requisitos para disparar (todos)
1. Resultado da sonda registrado. 2. Autorização expressa do Fábio. 3. PASS do COORD no SHA exato.
4. Publicação do workflow 02 por PR revisado. 5. Disparo único manual. #285 segue congelado.
