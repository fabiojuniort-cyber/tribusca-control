# TriBusca — frente DOE São Paulo

Atualizado em 26/09/2026. Este índice serve a qualquer chat futuro desta fonte; a Issue vinculada e o PR são a evidência detalhada.

## Regra global aplicável

A decisão D-017 vale também para DOE-SP: página oficial integral pode ser a captura canônica; PDF autenticado redundante não é requisito nem pode bloquear a publicação; anexos com conteúdo próprio permanecem necessários. A decisão global está em [OFFICIAL_CONTENT_POLICY.md](../docs/OFFICIAL_CONTENT_POLICY.md) e o inventário das demais fontes está na [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6). **Isso não significa que o conector DOE-SP já esteja adequado.**

## Ordem e bloqueios

1. [#1 — redefinir gate do PR #71 após mudança para HTML principal](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1): tarefa prioritária. O usuário determinou que PDF autenticado não pode ser requisito para capturar ato com HTML oficial. O [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) permanece aberto/unmerged e foi suspenso em reavaliação no head `3c286c982d983ecc7bce8f9722a1f967898665d3` (CI #394 SUCCESS). A `main` já usa HTML como `content`, mas inclui SHA de `files` no `contentHash`. Evidência Railway: 517 publicações/517 versões, 516 PDFs autenticados + 94 anexos. Remover PDFs do hash sem compatibilidade criaria versões artificiais; o caso real da Portaria SRE 42 confirma HTML idêntico entre duas representações, com a representação válida já persistida e a 404 ainda bloqueada. **Nenhum PR alternativo foi aberto**, pois a solução segura exige decisão do Gerente sobre hash/versionamento compatível com legado.
2. Opção técnica preferida para decisão: PDF autenticado como proveniência opcional por origem; anexos próprios continuam material de conteúdo; hash canônico baseado em HTML + anexos; compatibilidade explícita com versões v1 já persistidas, sem atribuir PDF de outra origem ao ato 404. Essa opção altera materialmente a semântica de versão e não foi implementada sem gate.
2. [#2 — concluir bootstrap e replay](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2): depende de #1.
3. [#3 — artefatos e política `publication_files`](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3): depende de #1; não está autorizada migration produtiva apenas por essa Issue.
4. [#4 — fechar gates e documentação](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4): depende de #1, #2 e #3.

Evidência produtiva somente leitura desta reavaliação: logs `DOE_SP_AUDIT` registraram 517 publicações, 517 versões, 516 PDFs autenticados e 94 anexos; o checkpoint ainda tinha faixa pendente a partir de 29/07/2025 no snapshot consultado. O conector Railway desta conversa não oferece execução SQL direta; nenhuma consulta modificadora foi executada. Escopo aprovado permanece Executivo → Atos Normativos, bootstrap 01/01/2025 até hoje. Critérios produtivos em [REVIEW_AND_GATES.md](../docs/REVIEW_AND_GATES.md) e documentação técnica em `radar-fiscal-backend/docs/phase-doe-sp.md`. Não declarar concluído por CI, merge, cron ou queda parcial dos dias pendentes.

## Ao retomar

Leia [BACKEND.md](BACKEND.md), [AGENTS.md](../AGENTS.md), a Issue escolhida, PR e documentação técnica. Revalide deploys, runs e PostgreSQL conforme o escopo da tarefa. Registre handoff na Issue. O Gerente Geral atualiza este índice quando o bloqueio, a sequência ou os gates mudarem; não mantenha um diário duplicado de runs aqui.
