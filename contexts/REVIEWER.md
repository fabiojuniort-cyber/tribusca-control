# TriBusca — contexto para revisor independente

Atualizado em 26/09/2026. Leia [CONTEXT.md](../CONTEXT.md), [BACKEND.md](BACKEND.md) ou [WEB.md](WEB.md), [AGENTS.md](../AGENTS.md), [gates](../docs/REVIEW_AND_GATES.md), a Issue e o PR específicos. O revisor é um **GPT-5.6 em chat distinto do GPT-5.6 executor**; um nome de agente ou chat não prova revisão realizada. O Gerente GPT-6 pode ler o PR e as evidências em modo somente leitura, mas não executa alterações.

## Revisão corrente

[Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) e [PR #73 do backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73) continuam o gate ativo. O head reprovado DOE-SP-23 `c836e228...` foi superado pela DOE-SP-24; novo head preparado `22ec75c937e781eb9e063a0037f5c3df50aa0467`, CI #424 SUCCESS, com política page-first e auditor read-only de reconstrução. **Ainda não é gate de merge:** o Gerente deve decidir A reconstrução condicional × B preservação/correção. Nova revisão independente deve ocorrer sobre o head vigente após essa decisão e qualquer ajuste correspondente. PR #71 permanece apenas comparativo.

## Contrato do revisor

- Verificar escopo, proveniência dos PDFs, dedup/versionamento, segurança, replays e casos de falha; reportar achados com arquivo/linha ou evidência verificável.
- Separar parecer de código, resultado de CI e validação produtiva. Se qualquer erro ou gate falhar, investigar até onde for seguro, separar causa comprovada de hipótese, preservar evidência e devolver ao Gerente para análise e novo direcionamento; concluir passos independentes autorizados.
- Registrar parecer no PR e/ou na Issue vinculada quando a ferramenta permitir; caso contrário, fornecer texto exato e links ao Gerente. Seguir [HANDOFF.md](../docs/HANDOFF.md).
- Não tomar o lugar do Gerente na declaração de conclusão; o Gerente decide o gate com base nos relatos; um GPT-5.6 delegado atualiza [CONTEXT.md](../CONTEXT.md) e [PROJECT_STATE.md](../PROJECT_STATE.md) e retorna commit e resumo do diff.

Para iniciar novo chat revisor: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/REVIEWER.md e revise de forma independente a Issue #N e o PR vinculado, sem assumir aprovação ou estado de produção.”
