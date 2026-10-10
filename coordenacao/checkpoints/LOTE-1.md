# Checkpoint LOTE-1
- DE: CLAUDE-COORD
- EXEC atual: GPT-EXEC-2
- Atualizado: 2026-10-10 (America/Sao_Paulo)
- Avanço: 0/4 partes completas (0%)
- Frente LIMPEZA: 3/13 (23%) — L-13 incluída no denominador após atualização do quadro

## A — Runs L-04
- [ ] Run agendado de 2026-10-10 18:00 UTC ainda não ocorrido na conferência de 14:19 BRT (17:19 UTC); não inventar run IDs, statuses, janela, publicações ou versions.
- [ ] Após run, conferir DOE-SP/RFB Normas, bootstrap.complete, pendingRanges e versões artificiais. Ferramentas atuais do Railway não expõem consultas SQL diretas: usar evidência confiável disponível.

## B — Triagem L-13
- [x] Quatro PRs expressamente autorizados comentados com "Superado pela main — triagem L-13" e fechados sem merge: backend #187, #188 e web #80, #87.
- [ ] Dez PRs condicionais: conferir precondições e recomendar manter/fechar sem mutação.
- [ ] Inventariar migrations de todos os PRs ainda abertos e colisões.

## C — Propostas
- [ ] L-05, L-07, L-08, L-10, L-11: máximo cinco linhas cada, sem código.

## D — Governança
- [ ] Adicionar L-13 a TAREFAS.md; atualizar somente a própria linha L-13 e L-04, preservando demais.
- [ ] Revisar checksum/head/PR, retornar ao COORD.

## Próximo passo
Finalizar a triagem condicional e inventário de migrations da parte B; obter evidências das partes C/D. Parte A depende de execução futura.

## Atenção
O PR #104 ainda está aberto na branch chore/protocolo-v1. Não fazer merge. L-04 permanece aberta; lookback=2 não impede bootstrap/backfill.
