# ✅ L-15 + L-10 — FECHAMENTO TÉCNICO / DEPLOY SUCCESS — 11/10/2026
**Avanço: 100% da execução autorizada; validação funcional pendente do Fábio e do cron.**
**Este bloco é o estado corrente e SUPERA os checkpoints históricos abaixo.**
**Quadro: L-15 → REVISAR (aguardando clique do Fábio); L-10 → REVISAR (aguardando primeira execução às 03:30, America/Sao_Paulo, em 12/10/2026).**

### Raiz exata da falha de teste L-15
O erro da fixture não era o campo de contagem de candidatos: `plan.count=1` e `blockedCompany=1` já estavam corretos; a falha em PG18 era `blockedOtherSource=0`, esperado 1. A fixture acrescentava uma origem oficial **após** escrever `OUT_OF_SCOPE`. O trigger `publication_scope_origin_material` da migration 033 restaurava legitimamente essa publicação a `IN_SCOPE`. Ajustou-se **somente a ordem da fixture**, criando a segunda origem antes do evento SUPPRESS. Nenhuma regra/guard de produção foi desativada. A L-15 continua protegendo vínculos de empresas e de outras fontes, com preflight token e audit da 051.

### Provas de CI antes dos merges
- Backend `f4e5cabc526f91b91148582c626835f60169c4de`: CI [#38138440651](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38138440651) **SUCCESS**; L11 PG18 [#38138440657](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38138440657) **SUCCESS**; L15/L10 PG18 [#38138441016](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38138441016) **SUCCESS**, dois testes aprovados/zero falhas (admin, company, cross-source, purge audit synthetic, L10 index e least privilege).
- Web `f271448503db0bf26820cc0401f08bce632ce566`: Frontend CI [#38138514179](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38138514179) **SUCCESS**; reconciliação com popup L11 publicado preservada.
- Backend [PR #208](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/208) MERGED `e74425f18808ebf403cca4f6e22f15b8cbc4e77c` em 11/10/2026 09:20:21 BRT.
- Web [PR #96](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/96) MERGED `e04691548f72cf78f83eae3275b918d5ee84c5f6` em 11/10/2026 09:21:48 BRT.

### Railway produção: readback SUCCESS dos 4 serviços
| Serviço | Deployment | Commit | Resultado |
|---|---|---|---|
| Backend | `54addb5d-6ba5-4855-94d0-147410487019` | `e74425f18808ebf403cca4f6e22f15b8cbc4e77c` | SUCCESS / 1 de 1 |
| Worker | `b9115124-2506-403d-998d-fcc7f9e7e72d` | `e74425f18808ebf403cca4f6e22f15b8cbc4e77c` | SUCCESS / 2 de 2 |
| Scheduler | `c3c0c046-d3d0-4753-a29b-ee1bcb1cea58` | `e74425f18808ebf403cca4f6e22f15b8cbc4e77c` | SUCCESS / 1 de 1 |
| Web | `ab3388b9-882b-4f82-b032-5f9206111f05` | `e04691548f72cf78f83eae3275b918d5ee84c5f6` | SUCCESS / 1 de 1 |

Migrations em produção (backend, 11/10/2026 ~09:20:59 BRT):
```text
Migration applied: 054_l15_scope_purge_and_l10_runner.sql
Migration applied: 055_collection_items_created_at_index.sql
Database migrations are up to date.
```
Railway environment_status após implantação: `totalFailures:0`, `servicesWithIssues:0`, `pendingWork:0` em backend e web.

### L-10: dry-run real e ativação
- SQL real entregue pelo usuário em 11/10: **379.882 de 538.623** `collection_items` mais antigos que 7 dias.
- Primeiro boot em produção no novo backend: scheduler logou `mode=DRY_RUN`, `eligibleItems=379882`, `sampleBatchCandidates=100`, `enabled=false`; CONFERE exatamente com SQL do usuário, nenhuma exclusão nesse ponto.
- Após SUCCESS completo, Railway scheduler recebeu variável `COLLECTION_ITEMS_RETENTION_ENABLED=true`, resposta sem staging, redeploy `c3c0c046-d3d0-4753-a29b-ee1bcb1cea58` SUCCESS. Segundo boot logou `mode=DRY_RUN`, `eligibleItems=379882`, `sampleBatchCandidates=100`, **`enabled=true`**; `Collection scheduler started`.
- Programação única diária `30 3 * * *`, timezone `America/Sao_Paulo`, ledger diário anti-duplicidade, até 100 registros/transação, teto de 1000 batches/120s por execução. Backlog de 379.882 pode requerer múltiplos dias; não aumentar lote para forçar conclusão.
- A primeira execução prevista é **12/10/2026 às 03:30 BRT**, ainda não ocorrida. Confirmar no Railway `L10 collection_items daily retention completed`, `deletedItems`, `remainingEligible`, `batches`, duração e integridade da coleta.
- Nenhum purge L-15 foi invocado, nenhum clique de exclusão e nenhuma publicação foi apagada pelo executor. A ativação L10 pode excluir SOMENTE `collection_items` com mais de 7 dias na próxima janela programada.

---

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


## Entrega independente concluída — L-11 popup (11/10/2026)
- O ajuste mínimo foi separado em [web PR #97](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/97), para não publicar o botão L-15 antes do backend aprovado.
- Frontend [CI #38135042056](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38135042056): COMPLETED/SUCCESS (tipagem, testes, build e Playwright).
- Merge web por squash: `1e0f2a87fc654a0195e3e2ae13fc31d451584d1d`.
- Railway web05-preview: deployment `26213bde-5f54-472e-bf3c-a312467220d5`, SUCCESS no SHA do merge; Vite preview porta 8080, domínios trifaros.com.br e www.trifaros.com.br.
- Backend/API, worker, scheduler: deployment atual SUCCESS no SHA anterior `4662d75738258a11c085a6453ee473284a02ce22`. **Migration 054/055 não aplicada**, nenhum purge L-15 executado.
- PRs backend #208 e web #96 permanecem ABERTOS, aguardando correção do teste isolado L-15 e todos os gates.
- L-10 ainda desativada, dry-run real ainda pendente; L-15/L-10 seguem **REVISAR / BLOCK de produção**.


## Retomada solicitada por CLAUDE-COORD — 11/10/2026 08:51 BRT
- Novo pedido autoriza merge/deploy #208/#96 **somente se** CI e PG18 ficarem verdes; há migrations 054/055, e a janela exigida permanece minutos :20–:40. Nenhuma exclusão de publicações nesta atividade.
- **Achado SQL confirmado:** `l15_out_of_scope_candidates` não usa `sourceActType`, seção nem `publication_versions`; faz join de `publication_scope_state.scope='OUT_OF_SCOPE'`, `publication_origins` e `sources.code='dou'`. A hipótese de obrigatoriedade desses metadados não se sustenta no código.
- **Inconsistência concreta na fixture:** no caso `kind==='other'`, o teste insere a segunda origem DOU/externa **após** gravar `OUT_OF_SCOPE`. O trigger `publication_scope_origin_material` (migration 033) invoca `restore_publication_scope_on_material_change`, que transiciona a publicação para `IN_SCOPE`. Isso invalida a expectativa de `blockedOtherSource=1` no teste como está escrito. Corrigir ordem do fixture — ambas as origens primeiro, SUPPRESS por último — respeita a semântica jurídica; não desabilitar trigger.
- **Lacuna ainda aberta:** o resultado `count=0` em vez de `count=1` para a publicação `eligible` não foi explicado pelo trigger da segunda origem; exige instrumentação/novo teste no mesmo ambiente PG18. Portanto, ainda não existe causa exata confirmada para toda a divergência.
- Teste isolado [PG18 run 38134710624](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38134710624) continua FAILED; CI padrão backend #38134710579 passou, frontend PR #96 #38134763462 passou. **A soma de CIs verdes não supera esse gate vermelho.**
- Frontend `main` evoluiu no merge L-11 PR #97 para `1e0f2a87fc654a0195e3e2ae13fc31d451584d1d`, enquanto a branch web #96 ainda foi criada sobre `150ef73fc4e415a0bcc902160688d9c4277abeb5`. PR #96 agora não está mergeable; precisa atualizar branch/reconciliar com L-11 antes de merge, além de testes.
- **Dry-run produtivo L-10:** o texto recebido contém literalmente `<NÚMERO>`, não uma contagem inteira. Nenhum valor real foi fornecido/verificado. Ativar `COLLECTION_ITEMS_RETENTION_ENABLED=true` antes de obter/validar esse número violaria a exigência. Retenção segue **OFF**.
- **Status:** L-15 REVISAR / produção BLOCK; L-10 REVISAR / retenção OFF. Nenhum merge/deploy de #208/#96, nenhuma migration 054/055 em produção e nenhuma exclusão de publicações.


## L-15 / L-10 — fechamento em progresso, 11/10/2026 09:17 BRT

### Diagnóstico comprovado, NÃO modificar a regra jurídica
- A falha anterior atribuída a `count=0` era leitura incorreta da linha do teste: `plan.count === 1` e `plan.blockedCompany === 1` passaram; quem retornava zero era `plan.blockedOtherSource`, esperado um.
- Causa exata: a fixture introduzia a segunda origem oficial depois de gravar `publication_scope_state.scope='OUT_OF_SCOPE'`. O gatilho `publication_scope_origin_material` (migration 033) aplica RESTORE para `IN_SCOPE` por mutação material. Portanto, o ato deixou de ser candidato e não era computado como protegido por outra fonte.
- Ajuste SOMENTE da fixture para cadastrar a segunda origem antes do evento SUPPRESS; lógica de produção, guard e gatilho permaneceram inalterados. HEAD backend `f4e5cabc526f91b91148582c626835f60169c4de`.
- PG18 dedicado [CI #38138441016](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38138441016): **SUCCESS**, 2 testes aprovados, incluindo L15 preview e confirm synthetic, protected company, cross-source, PLATFORM_ADMIN, audit 051, L10 index e ACL worker; nenhuma exclusão em produção.
- PR web #96 reconciliado via merge commit com main L11 #97, preservando popup Modo vazio; HEAD web `f271448503db0bf26820cc0401f08bce632ce566`, mergeable. CI frontend em execução até a confirmação final.

### Dry-run real L-10 — confirmado pelo usuário
- SQL em produção em 11/10/2026 informado por Fábio: **379.882 elegíveis (>7 dias) de 538.623 `collection_items`**. Não trocar pelo total geral.
- Programação: 03:30 America/Sao_Paulo, até 100 itens por batch, máximo de 1.000 batches e limite de 120s por execução. A primeira execução pode deixar backlog; não aumentar indiscriminadamente os lotes e não interromper a coleta.
- Flag `COLLECTION_ITEMS_RETENTION_ENABLED=true` deve ser definida **somente após** backend/worker/scheduler SUCCESS e migrations 054/055 confirmadas. Scheduler registra novo dry-run read-only e o valor de itens elegíveis.
- **Nenhuma exclusão de publicações autorizada durante merge/deploy; nenhum clique L-15.**
- Quadro solicitado: **L-15 REVISAR** (aguardando clique do Fábio); **L-10 REVISAR** (aguardando primeira execução automática 03:30).
- **Pendente neste checkpoint:** CIs integrais, merge/deploy dentro da janela :20–:40 e ativação final. Não alegar conclusão antes do readback Railway.
