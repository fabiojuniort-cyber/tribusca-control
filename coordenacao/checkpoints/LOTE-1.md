# Checkpoint LOTE-1
- DE: CLAUDE-COORD
- EXEC atual: GPT-EXEC-2
- Atualizado: 2026-10-10 (America/Sao_Paulo)
- Avanço: 3/4 partes completas (75%)
- Frente LIMPEZA: 3/13 (23%) — L-13 incluída no denominador após atualização do quadro

## A — Runs L-04
- [ ] Run agendado de 2026-10-10 18:00 UTC ainda não ocorrido na conferência de 14:19 BRT (17:19 UTC); não inventar run IDs, statuses, janela, publicações ou versions.
- [ ] Após run, conferir DOE-SP/RFB Normas, bootstrap.complete, pendingRanges e versões artificiais. Ferramentas atuais do Railway não expõem consultas SQL diretas: usar evidência confiável disponível.

## B — Triagem L-13
- [x] Quatro PRs expressamente autorizados comentados com "Superado pela main — triagem L-13" e fechados sem merge: backend #187, #188 e web #80, #87.
- [x] Dez PRs condicionais (backend #196,#195,#185,#151,#144,#128,#76,#75,#68,#60) inspecionados; todos mantidos abertos; recomendações no retorno ao COORD.
- [x] Inventário dos 21 PRs abertos backend e 3 web: novas migrations dos PRs #186=044, #192=045, #193=046/047, #194=048, #200=050; demais sem migrations diretas. PRs empilhados #195/#196 carregam 044-048 no compare contra main, mas não as introduzem em seu próprio diff. Potencial colisão de número 050: o arquivo de #200 contradiz seu título/body (sem migração); nome de outro arquivo 050 na main ainda não comprovado com listagem completa; não chamar colisão confirmada. e2e/onb01-b5/seed.sql no web #85 é fixture, não migration.

## C — Propostas
- [x] L-05, L-07, L-08, L-10, L-11: propostas de até cinco linhas com arquivos/testes, sem alteração de código. L-07 exige fonte inativa; L-11 depende da substituição aprovada do gate de simulação.

## D — Governança
- [x] L-13 adicionada ao quadro como REVISAR; L-04 segue EM ANDAMENTO; frente ajustada 3/13 (23%). Somente L-05/07/08/10/11 receberam indicação de proposta entregue, sem código. Outras tarefas preservadas.
- [x] Quadro atualizado via dois commits GitHub: 2718bdcc3fb912e9cf8310f9b05e1df29b4b7c1e e 73e50f27d1103b38ea0728ad6423d3a31f53d778; PR #104 permanece aberto, sem merge.


## Decisões do Fábio (10/10/2026, 14:34 BRT)
- L-11: opção B escolhida. ANTES da remoção das simulações, definir e aprovar mecanismo substituto de autorização de filtros. Proposta mínima a revisar: validar o DRAFT e a revisão exata, exigir confirmação explícita por PLATFORM_ADMIN, registrar audit_log e publicar atomicamente como APPROVED substituindo a anterior, sem depender da tabela de simulações. A função atual collection_filter_approve_draft(UUID) em migrations/039_collection_filter_simulation_review.sql exige simulação COMPLETED e FULL_ARCHIVE na primeira aprovação, e retorna simulation_id; não remover as tabelas/funções antes de migrar essa dependência. Nenhuma implementação feita.
- L-04: opção B escolhida. Verificação automática ÚNICA agendada para 10/10/2026, aproximadamente 16:00 BRT (19:00 UTC), após o run agendado às 18:00 UTC. O agendamento foi confirmado pelo serviço de tarefas; verificação somente leitura, sem disparar coleta nem alterar produção. Se não houver dados suficientes, retornar pendência, NÃO concluir L-04.
- Quadro TAREFAS.md atualizado nas linhas L-04 e L-11; commit d3f5325e02335a327b3b9625f265198cf63c0ad1.

## Próximo passo
Consultar o retorno da verificação automática agendada após 18:00 UTC. Se não comprovar todas as evidências A, deixar L-04 EM ANDAMENTO e encaminhar ao COORD. Desenhar/aprovar o gate L-11 ANTES de qualquer remoção de simulação. Nunca atribuir IDs/status/versions sem prova. Parte A depende de execução futura.

## Atenção
O PR #104 ainda está aberto na branch chore/protocolo-v1. Não fazer merge. L-04 permanece aberta; lookback=2 não impede bootstrap/backfill.
