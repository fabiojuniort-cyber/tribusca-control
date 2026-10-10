# Checkpoint LOTE-1
- DE: CLAUDE-COORD
- EXEC atual: GPT-EXEC-2
- Atualizado: 2026-10-10 (America/Sao_Paulo)
- Avanço: 1/4 partes completas (25%)
- Frente LIMPEZA: 3/13 (23%) — L-13 incluída no denominador após atualização do quadro

## A — Runs L-04
- [ ] Run agendado de 2026-10-10 18:00 UTC ainda não ocorrido na conferência de 14:19 BRT (17:19 UTC); não inventar run IDs, statuses, janela, publicações ou versions.
- [ ] Após run, conferir DOE-SP/RFB Normas, bootstrap.complete, pendingRanges e versões artificiais. Ferramentas atuais do Railway não expõem consultas SQL diretas: usar evidência confiável disponível.

## B — Triagem L-13
- [x] Quatro PRs expressamente autorizados comentados com "Superado pela main — triagem L-13" e fechados sem merge: backend #187, #188 e web #80, #87.
- [x] Dez PRs condicionais (backend #196,#195,#185,#151,#144,#128,#76,#75,#68,#60) inspecionados; todos mantidos abertos; recomendações no retorno ao COORD.
- [x] Inventário dos 21 PRs abertos backend e 3 web: novas migrations dos PRs #186=044, #192=045, #193=046/047, #194=048, #200=050; demais sem migrations diretas. PRs empilhados #195/#196 carregam 044-048 no compare contra main, mas não as introduzem em seu próprio diff. Potencial colisão de número 050: o arquivo de #200 contradiz seu título/body (sem migração); nome de outro arquivo 050 na main ainda não comprovado com listagem completa; não chamar colisão confirmada. e2e/onb01-b5/seed.sql no web #85 é fixture, não migration.

## C — Propostas
- [ ] L-05, L-07, L-08, L-10, L-11: máximo cinco linhas cada, sem código.

## D — Governança
- [ ] Adicionar L-13 a TAREFAS.md; atualizar somente a própria linha L-13 e L-04, preservando demais.
- [ ] Revisar checksum/head/PR, retornar ao COORD.

## Próximo passo
Produzir propostas C sem código, atualizar governança D e depois validar eventual execução A em horário apropriado. Parte A depende de execução futura.

## Atenção
O PR #104 ainda está aberto na branch chore/protocolo-v1. Não fazer merge. L-04 permanece aberta; lookback=2 não impede bootstrap/backfill.
