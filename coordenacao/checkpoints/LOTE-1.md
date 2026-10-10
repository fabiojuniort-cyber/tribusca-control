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


## Complemento documental — B(2) e C por extenso (10/10/2026)

Esta seção preserva, por extenso, a triagem e as propostas já entregues ao CLAUDE-COORD. É registro documental, **não** autorização de merge, deploy, exclusão de dados ou implementação.

### B(2) — Dez PRs condicionais: nº | condição exata | ação recomendada

| Nº | Condição exata | Ação recomendada |
|---|---|---|
| [Backend #196](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/196) | Concluir revisão independente R9-DESIGN-R3 e reconciliar seu contrato de proveniência com o R4 posterior. O próprio PR proíbe migration 049+, merge e operações produtivas. | **Manter aberto e bloqueado.** Fechar somente após confirmação de substituição pelo contrato definitivo. |
| [Backend #195](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/195) | Confirmar que as correções R2 — limites de fonte DOU e RFC SQL v2 — estão integralmente contempladas pela versão R3/R4 revisada. | **Manter.** Fechar como superado apenas após reconciliação documental. |
| [Backend #185](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/185) | Confirmar CI e revisão, equivalência com a implementação TAX13 e resultado dos testes sobre texto operativo, títulos, histórico e NCM; validar a aplicação aos Convênios 52/91 e 100/97 antes da adoção produtiva. | **Manter.** Fechar se os requisitos já estiverem incorporados e comprovados na main ou em outro PR aprovado. |
| [Backend #151](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/151) | Revisão independente do SHA, autorização RAM-01, LOCK de execução, preflight e condições do runner isolado. O PR proíbe merge e SQL produtivo antes dos gates. | **Manter sem merge.** Fechar somente quando o diagnóstico tiver sido incorporado, executado conforme autorização ou formalmente cancelado. |
| [Backend #144](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/144) | Validar a necessidade e autorização da carga de 1.332 CNAEs, 32 segmentos, 137 subsegmentos e 17.671 sinônimos, considerando a decisão posterior sobre remoção de sinônimos. | **Manter.** Decidir entre aproveitar, reformular ou cancelar a carga antes de fechar. |
| [Backend #128](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/128) | Revisão independente pendente; verificar se as regras OCR do DOE-SP legado ainda serão utilizadas ou se o conector será removido pela L-07. | **Manter até L-07.** Fechar se o conector legado for descontinuado definitivamente. |
| [Backend #76](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/76) | Nova revisão independente do runner corrigido (4b8b227) e confirmação de necessidade operacional para o rebuild DOE-SP. Sem autorização automática de execução ou merge. | **Manter bloqueado.** Fechar quando o rebuild deixar de exigir esse runner ou sua função for incorporada. |
| [Backend #75](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/75) | Confirmar se a política HTML-primary, a compatibilidade de hashes v1/v2 e a preservação de proveniência já estão implementadas e cobertas por testes na solução vigente. | **Manter até análise L-05.** Fechar se houver equivalência comprovada. |
| [Backend #68](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/68) | Verificar se a recuperação histórica de PDF autenticado ainda é necessária após definir a política HTML-only da L-05 e solucionar os checkpoints pendentes. | **Manter provisoriamente.** Fechar se a recuperação deixar de ser necessária, preservando evidências históricas. |
| [Backend #60](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/60) | PR #59 mergeado e produtivo; confirmar que os 11 pares DOU/RFB continuam pendentes, sem ambiguidades ou vínculos bloqueantes. Aplicação apenas mediante gate operacional específico. | **Manter sem merge automático.** Fechar após reparo autorizado, comprovação de desnecessidade ou cancelamento formal. |

Todos os dez permanecem abertos; não houve fechamento autorizado desses PRs na triagem L-13.

### C — Propostas completas, sem codificação

#### L-05 — DOE-SP sem PDF autenticado
1. **Arquivo:** \`src/modules/collection/doe-sp.connector.ts\`.
2. Remover a chamada automática a \`downloadAuthenticatedPdf\`, mantendo o HTML oficial como conteúdo primário; HTML insuficiente deve produzir erro explícito, não resultado vazio.
3. **Testes:** \`test/doe-sp.connector.unit.test.ts\`, \`test/doe-sp.auth-pdf.unit.test.ts\`, \`test/doe-sp.collection.integration.test.ts\`.
4. **Prova:** zero downloads de PDF autenticado e zero versões novas causadas apenas pela retirada do PDF.
5. **Subagentes:** não.

#### L-07 — Remover DOE-SP legado
1. **Pré-requisito:** confirmar por consulta somente leitura que a fonte \`doe-sp-legado\` está inativa e não é necessária em produção.
2. **Arquivos:** \`connector-registry.factory.ts\`, módulos \`doe-sp-legacy.*\`, scripts \`ensure-doe-sp-legacy-source.ts\` e \`trigger-doe-sp-legacy-run.ts\`, referências no \`package.json\`.
3. Remover registro e pontos de execução, preservando publicações e histórico já armazenados.
4. **Prova:** teste do registry sem o conector legado e testes dos conectores remanescentes; retirar testes exclusivos do código removido.
5. **Subagentes:** não.

#### L-08 — Três testes órfãos
1. **Arquivo:** \`package.json\`; \`.github/workflows/ci.yml\` apenas se necessário.
2. Incluir \`test/onboarding-identity.unit.test.ts\` na suíte unitária.
3. Incluir \`test/tax13.scoped-presentation.unit.test.ts\` na suíte unitária e \`test/publication.presentation.integration.test.ts\` na suíte PostgreSQL.
4. **Prova:** CI executa efetivamente os três arquivos, registrando PASS/FAIL individualmente.
5. **Subagentes:** não.

#### L-10 — Retenção de 30 dias em collection_items
1. **Arquivos:** aproveitar o padrão de \`src/modules/operations/metadata-retention.ts\` e \`src/infrastructure/database/prune-collection-metadata.ts\`, criando rotina específica para \`collection_items\`.
2. Excluir somente registros com mais de 30 dias, em lotes limitados, com \`dry-run\` antes de qualquer aplicação.
3. Preservar \`collection_runs\`, \`collection_attempts\` e dependências necessárias para auditoria, diagnósticos e checkpoints.
4. **Prova:** integração PostgreSQL com itens de 29, 30 e 31 dias, teste de fronteira, integridade referencial e idempotência.
5. **Subagentes:** não.

**Estado:** somente documentação; nenhuma dessas quatro propostas foi implementada nesta etapa.
