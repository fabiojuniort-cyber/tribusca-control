# TriBusca — frente DOE São Paulo

Atualizado em 26/09/2026. Este índice serve a qualquer chat futuro desta fonte; a Issue vinculada e o PR são a evidência detalhada.

## Ordem e bloqueios

1. [#1 — revisar PR #71 e validar primeiro run](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1): tarefa prioritária; [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) estava aberto na última consulta.
2. [#2 — concluir bootstrap e replay](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2): depende de #1.
3. [#3 — artefatos e política `publication_files`](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3): depende de #1; não está autorizada migration produtiva apenas por essa Issue.
4. [#4 — fechar gates e documentação](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4): depende de #1, #2 e #3.

No último diagnóstico transmitido, o bootstrap parava em 29/07/2025 com 399 dias pendentes; é uma evidência histórica, não leitura atual. Escopo aprovado: Executivo → Atos Normativos, bootstrap 01/01/2025 até hoje. Critérios produtivos em [REVIEW_AND_GATES.md](../docs/REVIEW_AND_GATES.md) e documentação técnica em `radar-fiscal-backend/docs/phase-doe-sp.md`. Não declarar concluído por CI, merge, cron ou queda parcial dos dias pendentes.

## Ao retomar

Leia [BACKEND.md](BACKEND.md), [AGENTS.md](../AGENTS.md), a Issue escolhida, PR e documentação técnica. Revalide deploys, runs e PostgreSQL conforme o escopo da tarefa. Registre handoff na Issue. O Gerente Geral atualiza este índice quando o bloqueio, a sequência ou os gates mudarem; não mantenha um diário duplicado de runs aqui.
