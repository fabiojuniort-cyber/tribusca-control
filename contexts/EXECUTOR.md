# TriBusca — contexto para chat executor

Atualizado em 26/09/2026. Ponto de entrada: [CONTEXT.md](../CONTEXT.md), [AGENTS.md](../AGENTS.md), [decisões](../DECISIONS.md) e a Issue atribuída. Leia a Issue ao vivo: escopo, dependências, permissões, critérios e links podem mudar. Não substitua a Issue por este arquivo.

## Frente ativa

[Issue #1 — gate DOE-SP / PR #71](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) é a tarefa executável prioritária. PR: https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71. No último registro o PR continuava aberto; verificar novamente. #2 e #3 dependem de #1; #4 depende das três. Não executar tarefas dependentes até o gate correspondente.

## Contrato do executor

1. Revalidar a main, o PR, CI e produção exigida antes de agir.
2. Trabalhar apenas no repositório de código e no escopo/permissões da Issue. Se a premissa falhar, parar etapas dependentes e reportar.
3. Deixar evidências verificáveis, links, IDs, riscos e uma única próxima ação em comentário na Issue, usando [HANDOFF.md](../docs/HANDOFF.md). Se não houver permissão de comentário, entregar o texto pronto ao gerente para registrar.
4. Não declarar DOE concluído com CI verde, merge ou cron ativo; [gates](../docs/REVIEW_AND_GATES.md) e [segurança](../docs/SECURITY.md) valem integralmente.
5. O Gerente Geral audita o handoff e mantém [CONTEXT.md](../CONTEXT.md) e [PROJECT_STATE.md](../PROJECT_STATE.md). Outro chat não recebe automaticamente sua conversa.

Para iniciar novo chat executor: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/EXECUTOR.md e execute somente a Issue #N indicada, seguindo seus limites e registrando o handoff nela.”
