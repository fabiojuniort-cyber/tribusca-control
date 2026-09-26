# TriBusca — entrada de qualquer chat de backend

Atualizado em 26/09/2026. Este arquivo é o ponto de entrada funcional para qualquer chat que mexa em `radar-fiscal-backend`. Leia também [AGENTS.md](../AGENTS.md), [decisões](../DECISIONS.md), [arquitetura](../docs/ARCHITECTURE.md), [segurança](../docs/SECURITY.md) e a Issue atribuída. O código/schema na main do backend é a fonte da implementação; não copiar trechos de chat como se fossem atuais.

## Estado para escolher a tarefa

A frente priorizada é DOE-SP, que permanece aberta. [Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) e [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) são o trabalho ativo registrado. #2 e #3 dependem de #1; #4 depende de #1–#3. Leia [CONTEXT.md](../CONTEXT.md) para o snapshot datado e revalide GitHub/Railway/PostgreSQL apenas na medida exigida pela Issue. Não assumir que este arquivo autorizou merge, deploy, coleta ou migration.

## Regras de continuidade

- Antes de iniciar: ler a Issue e verificar premissas atuais; usar [contexto do executor](EXECUTOR.md) ou [contexto do revisor](REVIEWER.md).
- A cada marco relevante (novo PR/head, revisão, merge, deploy, run/gate, bloqueio, mudança de decisão): registrar evidência e uma próxima ação na Issue. Executor atualiza documentação técnica no PR quando mudar comportamento; gerente audita e atualiza o snapshot em [CONTEXT.md](../CONTEXT.md), [PROJECT_STATE.md](../PROJECT_STATE.md) e este índice quando mudar a frente ativa.
- Outras fontes federais concluídas não são reabertas sem evidência. O próximo DOE só começa após o gate final de SP.
- Para nova frente backend, gerente cria Issue e contexto curto específico em `contexts/`, apontando ao código e às evidências sem duplicá-los.

Retomada: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/BACKEND.md e a Issue #N. Revalide o estado e trabalhe somente nos limites autorizados.”
