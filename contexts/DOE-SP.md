# TriBusca — frente DOE São Paulo

Atualizado em 26/09/2026. Este índice serve a qualquer chat futuro desta fonte; a Issue vinculada e o PR são a evidência detalhada.

## Regra global aplicável

A decisão D-017 vale também para DOE-SP: página oficial integral pode ser a captura canônica; PDF autenticado redundante não é requisito nem pode bloquear a publicação; anexos com conteúdo próprio permanecem necessários. A decisão global está em [OFFICIAL_CONTENT_POLICY.md](../docs/OFFICIAL_CONTENT_POLICY.md), a matriz inicial por fonte em [OFFICIAL_CONTENT_INVENTORY.md](../docs/OFFICIAL_CONTENT_INVENTORY.md) e o acompanhamento global na [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6). **Isso não significa que o conector DOE-SP já esteja adequado.**

## Ordem e bloqueios

1. [#1 — redefinir gate do PR #71 após mudança para HTML principal](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1): tarefa prioritária. O usuário determinou que PDF autenticado não pode ser requisito para capturar ato com HTML oficial. O [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) permanece aberto/unmerged e suspenso no head `3c286c982d983ecc7bce8f9722a1f967898665d3` (CI #394 SUCCESS).
2. [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73) é o draft de implementação da opção A, branch `feat/doe-sp-html-primary-gate`, head `c836e22837b5ed056da5995613b832336039432e`, criado diretamente da main sem #71/#68 e 0 commits atrás. CI #416 / run `36227675798` = **SUCCESS**. Hash v2: título + HTML oficial + vigência + SHA-256 de `MATERIAL_CONTENT`; PDF autenticado redundante = `PROVENANCE` origin-scoped fora do hash/metadata canônico. Compatibilidade v1→v2 exige reprodução exata do hash v1 persistido + igualdade de título/texto/vigência/anexos materiais; falha de prova permanece `NEW_VERSION`.
3. Evidência específica: testes cobrem replay de legado com/sem PDF, mudanças reais de título/texto/vigência/anexos, arquivo legado desconhecido/hash inconsistente, falha de anexo material e teste ponta a ponta da Portaria SRE 42/2025 com IDs observados `6098db3e-...` e `645399a3-...`: 2 origens, 1 publicação, 1 versão, replay idempotente, PDF somente na origem que o forneceu. Próximo gate: revisão independente do head atual; sem merge/deploy/migration/coleta/repair.
4. [#2 — concluir bootstrap e replay](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2): depende de #1.
5. [#3 — artefatos e política `publication_files`](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3): depende de #1; não está autorizada migration produtiva apenas por essa Issue.
6. [#4 — fechar gates e documentação](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4): depende de #1, #2 e #3.

Evidência produtiva somente leitura desta reavaliação: logs `DOE_SP_AUDIT` registraram 517 publicações, 517 versões, 516 PDFs autenticados e 94 anexos; o checkpoint ainda tinha faixa pendente a partir de 29/07/2025 no snapshot consultado. O conector Railway desta conversa não oferece execução SQL direta; nenhuma consulta modificadora foi executada. Escopo aprovado permanece Executivo → Atos Normativos, bootstrap 01/01/2025 até hoje. Critérios produtivos em [REVIEW_AND_GATES.md](../docs/REVIEW_AND_GATES.md) e documentação técnica em `radar-fiscal-backend/docs/phase-doe-sp.md`. Não declarar concluído por CI, merge, cron ou queda parcial dos dias pendentes.

## Ao retomar

Leia [BACKEND.md](BACKEND.md), [AGENTS.md](../AGENTS.md), a Issue escolhida, PR e documentação técnica. Revalide deploys, runs e PostgreSQL conforme o escopo da tarefa. Registre handoff na Issue. O Gerente Geral atualiza este índice quando o bloqueio, a sequência ou os gates mudarem; não mantenha um diário duplicado de runs aqui.
