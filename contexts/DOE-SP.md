# TriBusca — frente DOE São Paulo

Atualizado em 26/09/2026. Este índice serve a qualquer chat futuro desta fonte; a Issue vinculada e o PR são a evidência detalhada.

## Regra global aplicável

A decisão D-017 vale também para DOE-SP: página oficial integral pode ser a captura canônica; PDF autenticado redundante não é requisito nem pode bloquear a publicação; anexos com conteúdo próprio permanecem necessários. A decisão global está em [OFFICIAL_CONTENT_POLICY.md](../docs/OFFICIAL_CONTENT_POLICY.md), a matriz inicial por fonte em [OFFICIAL_CONTENT_INVENTORY.md](../docs/OFFICIAL_CONTENT_INVENTORY.md) e o acompanhamento global na [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6). **Isso não significa que o conector DOE-SP já esteja adequado.**

## Ordem e bloqueios

1. [#1 — redefinir gate do PR #71 após mudança para HTML principal](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1): tarefa prioritária. O usuário determinou que PDF autenticado não pode ser requisito para capturar ato com HTML oficial. O [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) permanece aberto/unmerged e suspenso no head `3c286c982d983ecc7bce8f9722a1f967898665d3` (CI #394 SUCCESS).
2. [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73) é o draft de implementação da opção A, branch `feat/doe-sp-html-primary-gate`, head revisado `c836e22837b5ed056da5995613b832336039432e`, criado diretamente da main sem #71/#68 e 0 commits atrás. CI #416 / run `36227675798` e sua reexecução independente = **SUCCESS**. A DOE-SP-23 aprovou hash v2, opt-in, prova positiva v1→v2, attachments, PDF 404 e o teste SRE 42/2025, mas o parecer final é **BLOQUEANTE**.
3. Bloqueio reproduzível: no v2, PDF autenticado pertence somente à origem; entretanto `upsertOrigin()` substitui todo `publication_origins.metadata`. Se o mesmo origin passa de PDF `CAPTURED` para 404/500 em replay posterior, a nova observação sem `files` pode apagar o PDF/SHA/tamanho já preservados. Correção requerida: manter a última evidência autenticada da mesma origem durante falha degradada, registrar simultaneamente o diagnóstico atual e cobrir `CAPTURED → 404/500 → CAPTURED` sem nova versão nem cruzamento de arquivos entre origens. Próximo gate: correção em novo head → CI → nova revisão independente; sem merge/deploy/migration/coleta/replay/repair produtivo.
4. [#2 — concluir bootstrap e replay](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2): depende de #1.
5. [#3 — artefatos e política `publication_files`](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3): depende de #1; não está autorizada migration produtiva apenas por essa Issue.
6. [#4 — fechar gates e documentação](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4): depende de #1, #2 e #3.

Evidência produtiva somente leitura desta reavaliação: logs `DOE_SP_AUDIT` registraram 517 publicações, 517 versões, 516 PDFs autenticados e 94 anexos; o checkpoint ainda tinha faixa pendente a partir de 29/07/2025 no snapshot consultado. O conector Railway desta conversa não oferece execução SQL direta; nenhuma consulta modificadora foi executada. Escopo aprovado permanece Executivo → Atos Normativos, bootstrap 01/01/2025 até hoje. Critérios produtivos em [REVIEW_AND_GATES.md](../docs/REVIEW_AND_GATES.md) e documentação técnica em `radar-fiscal-backend/docs/phase-doe-sp.md`. Não declarar concluído por CI, merge, cron ou queda parcial dos dias pendentes.

## Ao retomar

Leia [BACKEND.md](BACKEND.md), [AGENTS.md](../AGENTS.md), a Issue escolhida, PR e documentação técnica. Revalide deploys, runs e PostgreSQL conforme o escopo da tarefa. Registre handoff na Issue. O Gerente Geral atualiza este índice quando o bloqueio, a sequência ou os gates mudarem; não mantenha um diário duplicado de runs aqui.
