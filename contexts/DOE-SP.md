# TriBusca — frente DOE São Paulo

Atualizado em 26/09/2026. Este índice serve a qualquer chat futuro desta fonte; a Issue vinculada e o PR são a evidência detalhada.

## Regra global aplicável

A D-017/D-036 vale também para DOE-SP: **página oficial integral tem prioridade e o PDF autenticado redundante não deve ser baixado**. Se o corpo oficial estiver ausente, o PDF passa a ser material obrigatório; `attachments[]` com conteúdo próprio continuam necessários. A regra global está em [OFFICIAL_CONTENT_POLICY.md](../docs/OFFICIAL_CONTENT_POLICY.md) e a adequação das demais fontes na [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6).

## Ordem e bloqueios

1. [#1 — redefinir gate do PR #71 após mudança para HTML principal](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1): tarefa prioritária. O usuário determinou que PDF autenticado não pode ser requisito para capturar ato com HTML oficial. O [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) permanece aberto/unmerged e suspenso no head `3c286c982d983ecc7bce8f9722a1f967898665d3` (CI #394 SUCCESS).
2. [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73) está no head revisado `82f189c84a7b70e1985ed424c1549ae20184df46`, 0 commits atrás da main; CI #432 / run `36252974888` e reexecução independente do job `108437300694` = **SUCCESS**. DOE-SP-26 aprovou page-first, PDF material, attachments, preservação same-origin, compatibilidade v1→v2, SRE 42 e ausência de regressão observada.
3. O Gerente decidiu **B — preservar o acervo existente**. Reconstrução está fora deste gate. O auditor `db:audit-doe-sp-rebuild` foi revisado apenas como código; **não foi executado em produção e não existe manifesto atual**. O review formal `APPROVE` não pôde ser enviado porque a conta conectada é autora do PR; o parecer favorável foi registrado como review `COMMENT`. Próximo gate: Gerente decide merge; eventual deploy e validação produtiva devem ocorrer depois, separadamente. Sem merge/deploy/migration/coleta/replay/repair/rebuild por este registro.
4. [#2 — concluir bootstrap e replay](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2): depende de #1.
5. [#3 — artefatos e política `publication_files`](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3): depende de #1; não está autorizada migration produtiva apenas por essa Issue.
6. [#4 — fechar gates e documentação](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4): depende de #1, #2 e #3.

Evidência produtiva somente leitura desta reavaliação: logs `DOE_SP_AUDIT` registraram 517 publicações, 517 versões, 516 PDFs autenticados e 94 anexos; o checkpoint ainda tinha faixa pendente a partir de 29/07/2025 no snapshot consultado. O conector Railway desta conversa não oferece execução SQL direta; nenhuma consulta modificadora foi executada. Escopo aprovado permanece Executivo → Atos Normativos, bootstrap 01/01/2025 até hoje. Critérios produtivos em [REVIEW_AND_GATES.md](../docs/REVIEW_AND_GATES.md) e documentação técnica em `radar-fiscal-backend/docs/phase-doe-sp.md`. Não declarar concluído por CI, merge, cron ou queda parcial dos dias pendentes.

## Ao retomar

Leia [BACKEND.md](BACKEND.md), [AGENTS.md](../AGENTS.md), a Issue escolhida, PR e documentação técnica. Revalide deploys, runs e PostgreSQL conforme o escopo da tarefa. Registre handoff na Issue. O Gerente Geral atualiza este índice quando o bloqueio, a sequência ou os gates mudarem; não mantenha um diário duplicado de runs aqui.
