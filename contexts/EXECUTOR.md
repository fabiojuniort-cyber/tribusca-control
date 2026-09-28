# TriBusca — contexto para chat executor

Atualizado em 26/09/2026. Ponto de entrada: [CONTEXT.md](../CONTEXT.md), [BACKEND.md](BACKEND.md) ou [WEB.md](WEB.md), o índice da frente quando houver, [AGENTS.md](../AGENTS.md), [decisões](../DECISIONS.md) e a Issue atribuída. Leia a Issue ao vivo: escopo, dependências, permissões, critérios e links podem mudar. Não substitua a Issue por este arquivo.

## Frente ativa

[Issue #1 — gate DOE-SP / PR #71](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) é a tarefa executável prioritária. PR: https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71. No último registro o PR continuava aberto; verificar novamente. #2 e #3 dependem de #1; #4 depende das três. Não executar tarefas dependentes até o gate correspondente.

## Executor em sessão Claude

Quando o prompt declarar **Modelo: Claude**, leia também [CLAUDE_SESSION_PROTOCOL.md](../docs/CLAUDE_SESSION_PROTOCOL.md). Antes de qualquer trabalho, execute Gate 0; adquira LOCK na Issue e confirme um único tipo de gate. Não misture CÓDIGO/PREPARAÇÃO/REVISÃO/EXECUÇÃO. Ao concluir ou bloquear depois do Gate 0, registre UNLOCK. O handoff separa Preparado / Executado / Validado.

## Contrato do executor GPT-5.6

1. Revalidar a main, PR, CI e produção exigidos antes de agir; ler Issue e autorização vigente.
2. Trabalhar continuamente no escopo autorizado, sem pedir ao usuário passos acessíveis ao executor. O prompt pode conter até cinco passos independentes; seguir até o gate ou barreira real. Erro em uma premissa bloqueia apenas etapas dependentes: investigar a causa, preservar evidências, continuar etapas seguras independentes e devolver o erro ao Gerente.
3. Para **todo erro**, relatar fato vs. hipótese, logs/IDs sanitizados, impacto, etapas feitas e interrompidas, correção proposta e uma próxima ação. Não inventar status de deploy ou causa. Usar [HANDOFF.md](../docs/HANDOFF.md) na Issue e em resumo autocontido ao usuário.
4. Atualizar por delegação `CONTEXT.md`, `PROJECT_STATE.md`, `contexts/`, `DECISIONS.md` e documentação temática afetados quando o Gerente definir o marco/decisão; pode registrar fatos provisórios claramente rotulados. Retornar caminhos, link e commit. O Gerente pode ler repositórios e evidências em modo somente leitura, mas não os edita nem realiza ações que alterem estado.
5. Não declarar DOE concluído com CI verde, merge ou cron ativo; [gates](../docs/REVIEW_AND_GATES.md) e [segurança](../docs/SECURITY.md) valem integralmente. Revisão independente exige outro chat GPT-5.6.


Para iniciar novo chat executor: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/EXECUTOR.md e execute somente a Issue #N indicada, seguindo seus limites e registrando o handoff nela.”
