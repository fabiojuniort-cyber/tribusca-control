# TriBusca — frente DOE São Paulo

Atualizado em 28/09/2026. Este índice serve a qualquer chat futuro desta fonte; a Issue vinculada e o PR são a evidência detalhada.

## Regra global aplicável

A D-017/D-036 vale também para DOE-SP: **página oficial integral tem prioridade e o PDF autenticado redundante não deve ser baixado**. Se o corpo oficial estiver ausente, o PDF passa a ser material obrigatório; `attachments[]` com conteúdo próprio continuam necessários. A regra global está em [OFFICIAL_CONTENT_POLICY.md](../docs/OFFICIAL_CONTENT_POLICY.md) e a adequação das demais fontes na [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6).

## Ordem e bloqueios

1. [Issue #1 — gate DOE-SP HTML-primary](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) continua **OPEN** e prioritária.
2. DOE-SP-35 concluiu a PREPARAÇÃO no head `4917cdc2265fa87b35d555b98698f42a75d6c223`: CI #443 SUCCESS, runner Railway 31/31 PASS, preflight somente leitura, backup/restauração e ensaio fora da produção; 0 escritas produtivas.
3. DOE-SP-36 fez REVISÃO independente e **APROVOU** o mesmo SHA e a preparação; review `pullrequestreview-5333911708`.
4. Em DOE-SP-37, o [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73) foi squash-merged como `e2c4f9a58fe43cb56ca36a1925eb80cf612423ae`. Na última leitura da GOV-12 havia LOCK DOE-SP-37 ativo para EXECUÇÃO-A e ainda não havia handoff/UNLOCK final dessa atividade. Portanto, não declarar deploys, run SCHEDULED, pausa, SQL, exclusão, reconstrução ou recaptura como concluídos sem evidência posterior na Issue.
5. [#2 — concluir bootstrap e replay](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2) depende de #1.
6. [#3 — artefatos e política `publication_files`](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3) depende de #1.
7. [#4 — fechar gates e documentação](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4) depende de #1, #2 e #3.

A autorização vigente registrada na frente permite prosseguir conforme os gates, mas ela não substitui o protocolo de sessão nem prova execução. Esta GOV-12 apenas sincroniza documentação e não realizou qualquer operação DOE-SP.

## Ao retomar

Leia [BACKEND.md](BACKEND.md), [AGENTS.md](../AGENTS.md), a Issue escolhida, PR e documentação técnica. Revalide deploys, runs e PostgreSQL conforme o escopo da tarefa. Registre handoff na Issue. O Gerente Geral atualiza este índice quando o bloqueio, a sequência ou os gates mudarem; não mantenha um diário duplicado de runs aqui.
