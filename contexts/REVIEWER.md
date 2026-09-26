# TriBusca — contexto para revisor independente

Atualizado em 26/09/2026. Leia [CONTEXT.md](../CONTEXT.md), [BACKEND.md](BACKEND.md) ou [WEB.md](WEB.md), [AGENTS.md](../AGENTS.md), [gates](../docs/REVIEW_AND_GATES.md), a Issue e o PR específicos. O revisor é um **GPT-5.6 em chat distinto do GPT-5.6 executor**; um nome de agente ou chat não prova revisão realizada. O Gerente GPT-6 pode ler o PR e as evidências em modo somente leitura, mas não executa alterações.

## Revisão corrente

[Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) e [PR #73 do backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73) continuam o gate ativo. Head atual a revisar após decisão do Gerente: `5803a84ebd686beb2272c61348668c39076352ce`; CI #431 / run `36251237575` = SUCCESS. DOE-SP-24 implementa page-first e preservação same-origin apenas de `AUTHENTICATED_PUBLICATION_PDF` DOE-SP; teste comprova material PDF → HTML sem perda do PDF e sem resurrectar attachment antigo. Ainda não é gate de merge: o Gerente decide A/rebuild condicional × B/preservar. Na revisão seguinte, confirmar também que A elimina somente compatibilidade v1→v2 do corpus reconstruído, não a regra de proveniência para PDF material. PR #71 permanece comparativo.

## Contrato do revisor

- Verificar escopo, proveniência dos PDFs, dedup/versionamento, segurança, replays e casos de falha; reportar achados com arquivo/linha ou evidência verificável.
- Separar parecer de código, resultado de CI e validação produtiva. Se qualquer erro ou gate falhar, investigar até onde for seguro, separar causa comprovada de hipótese, preservar evidência e devolver ao Gerente para análise e novo direcionamento; concluir passos independentes autorizados.
- Registrar parecer no PR e/ou na Issue vinculada quando a ferramenta permitir; caso contrário, fornecer texto exato e links ao Gerente. Seguir [HANDOFF.md](../docs/HANDOFF.md).
- Não tomar o lugar do Gerente na declaração de conclusão; o Gerente decide o gate com base nos relatos; um GPT-5.6 delegado atualiza [CONTEXT.md](../CONTEXT.md) e [PROJECT_STATE.md](../PROJECT_STATE.md) e retorna commit e resumo do diff.

Para iniciar novo chat revisor: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/REVIEWER.md e revise de forma independente a Issue #N e o PR vinculado, sem assumir aprovação ou estado de produção.”
