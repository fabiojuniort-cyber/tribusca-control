# LIMPEZA — L-11 ajuste, L-15 e L-10

**Checkpoint 11/10/2026 — QA EM ANDAMENTO / NÃO LIBERADO PARA PRODUÇÃO.**
**Quadro solicitado pelo proprietário: L-15 → REVISAR; L-10 → REVISAR.** O status REVISAR neste checkpoint não significa aprovação para merge ou deploy.

## Entregas em branches (não implantadas)
- Backend PR [#208](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/208), branch `feat/l15-l10-cleanup-safe-20261011`, HEAD inicialmente `c45bff7af020b3778e2b0fb14d8d6189a6479c2e`.
- Frontend PR [#96](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/96), branch `feat/l11-l15-ui-20261011`.
- L-11: somente popup `Classificar tipo de publicação` de Novos tipos recebe `Modo` em branco, opção `Selecione o modo`, botão de consulta desabilitado até escolha. Sem alteração no fluxo de edição de tipos existentes.
- L-15: único botão na tela Filtro de Coleta; prévia com protegidos, confirmação manual em lotes max 500, filtros do DOU por `publication_scope_state.scope='OUT_OF_SCOPE'`, guard de plataforma, reválida após locks, usa `collection_filter_direct_purge_batch` da 051 e seus audit logs.
- L-10: módulo de dry-run/retenção de sete dias já existia; conectado ao scheduler para agendamento `30 3 * * *` no fuso `America/Sao_Paulo`, com claim durável diário, retenção em lotes de até 100, teto por duração e quantidade, logs. Migration 055 é exclusivamente `CREATE INDEX IF NOT EXISTS ix_collection_items_created_at_id ON collection_items(created_at,id)`. Funções worker-only e registro diário na migration 054.
- **Flag de ativação L-10 default desligada**, via `COLLECTION_ITEMS_RETENTION_ENABLED` estritamente `true` para habilitar. Scheduler faz dry-run **somente leitura** no startup após eventual implantação, fornecendo número exato de itens elegíveis; ainda não existe esse número real. Não ativar antes de obtê-lo/revisá-lo.
- Nenhuma exclusão executada por GPT-EXEC-2. Nenhuma migration 054/055 aplicada em produção; os PRs ainda não foram mergeados.

## Gates
- `L15 L10 Isolated PG18 Security and Retention` [#38134710624](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38134710624): **FAILED** no teste da prévia L-15 — recebeu `count=0` diante de fixture esperada `count=1`. Migrações 054 e 055 aplicadas normalmente no PG18 isolado, permissões L-10 passaram. **BLOCK para merge** até reproduzir e corrigir causa, passar integrações e review adversarial.
- Backend CI #38134710579 e Frontend CI #38134763462 estavam em andamento na última consulta deste checkpoint.
- Tentativas de instrumentar o arquivo de teste foram bloqueadas pela ferramenta GitHub. Não contornar controle; seguir com diagnóstico em executor autorizado antes de merge.
- Screenshots reais do popup e do botão ainda **não** produzidos/verificados. Não inventar prints.
- Dry-run do volume real de `collection_items` ainda **pendente**, porque requer consulta read-only na base produtiva. Não inferir número pela contagem total aproximada de linhas.
- Depois de todos os gates verdes, a implantação de migrations só pode começar nos minutos :20–:40 de uma hora, com SUCCESS API/worker/scheduler; frontend após backend. Nenhuma exclusão real nesta tarefa.

## Próximo passo
Investigar com PostgreSQL 18 isolado os IDs, estado `publication_scope_state`, vínculos DOU e o resultado de `l15_out_of_scope_candidates` sob contexto PLATFORM_ADMIN, preservar proteção de cliente/outra fonte e auditar exclusão sintética. Destravar QA, obter CI verde, dry-run real antes de ativar retenção, preparar prints reais via Playwright e só então considerar deploy.
