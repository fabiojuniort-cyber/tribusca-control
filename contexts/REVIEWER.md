# TriBusca — contexto para revisor independente

Atualizado em 26/09/2026. Leia [CONTEXT.md](../CONTEXT.md), [BACKEND.md](BACKEND.md) ou [WEB.md](WEB.md), [AGENTS.md](../AGENTS.md), [gates](../docs/REVIEW_AND_GATES.md), a Issue e o PR específicos. O revisor é distinto do executor; um nome de agente ou chat não prova revisão realizada.

## Revisão corrente

[Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) e [PR #71 do backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) são o gate ativo informado na última atualização. Revalidar head, diff, CI, comentários e deploys ao vivo; nada neste arquivo aprova merge.

## Contrato do revisor

- Verificar escopo, proveniência dos PDFs, dedup/versionamento, segurança, replays e casos de falha; reportar achados com arquivo/linha ou evidência verificável.
- Separar parecer de código, resultado de CI e validação produtiva. Se um gate falhar, dizer qual e interromper passos dependentes.
- Registrar parecer no PR e/ou na Issue vinculada quando a ferramenta permitir; caso contrário, fornecer texto exato e links ao Gerente. Seguir [HANDOFF.md](../docs/HANDOFF.md).
- Não tomar o lugar do Gerente na declaração de conclusão; o gerente atualiza [CONTEXT.md](../CONTEXT.md) e [PROJECT_STATE.md](../PROJECT_STATE.md) após auditar evidências.

Para iniciar novo chat revisor: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/REVIEWER.md e revise de forma independente a Issue #N e o PR vinculado, sem assumir aprovação ou estado de produção.”
