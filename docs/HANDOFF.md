# TriBusca — Handoff proporcional ao risco

Handoff registra o necessário para continuidade e prova; não deve virar formulário mecânico.

## R0 / R1
Use formato curto:
- resultado;
- arquivos/SHA/PR quando houver;
- testes/verificações;
- pendências;
- próximo passo.

Campos obviamente irrelevantes podem ser omitidos.

## R2
Inclua, conforme impacto:
- atividade/Issue;
- escopo e classificação;
- branch/PR/head/base;
- testes/CI;
- revisão independente quando exigida;
- mudanças de contrato/dados/comportamento;
- ações executadas e não executadas;
- riscos/pendências;
- próximo passo.

## R3
Manter handoff completo:
- **Preparado:** artefatos, preflight, autorização, backup/restore/dry-run/rollback aplicáveis;
- **Executado:** ação produtiva realmente aplicada, IDs/horários/recursos;
- **Validado:** evidência pós-execução e revisão independente quando exigida;
- autorização e origem;
- estado produtivo;
- rollback/reversão;
- incidentes e pendências;
- LOCK/UNLOCK;
- próximo gate.

## Erros
Separar fato de hipótese. Bloquear apenas parte dependente, salvo fail-safe material. Nunca declarar sucesso por ausência de evidência.

## Evidência
CI, merge, deploy, run e estado produtivo são evidências distintas. Secrets, cookies, tokens, dumps, conteúdo sensível e dados privados não entram em Issue/PR/handoff.

## Comunicação
Para delegações formais, o Gerente pode usar bloco copiável isolado; para R0 contínuo, não é necessário criar nova atividade apenas para registrar um fato.
