# TriBusca — contexto para revisor independente

Atualizado em 28/09/2026. Leia [CONTEXT.md](../CONTEXT.md), [BACKEND.md](BACKEND.md) ou [WEB.md](WEB.md), [AGENTS.md](../AGENTS.md), [gates](../docs/REVIEW_AND_GATES.md), a Issue e o PR específicos. O revisor é um **chat/sessão distinto do executor**, sem participação no intervalo revisado. GPT-5.6 e Claude são ambos válidos para revisão, mesmo quando o modelo efetivo divergir do indicado no prompt; a divergência é registrada, mas não substitui a independência. Um nome de agente ou chat não prova revisão realizada. O Gerente GPT-6 pode ler o PR e as evidências em modo somente leitura, mas não executa alterações.

## Revisão corrente

[Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) continua o gate DOE-SP ativo. DOE-SP-36 revisou independentemente o head `4917cdc2265fa87b35d555b98698f42a75d6c223` e a PREPARAÇÃO DOE-SP-35, com resultado **APROVADO** (`pullrequestreview-5333911708`). O PR #73 foi posteriormente squash-merged como `e2c4f9a58fe43cb56ca36a1925eb80cf612423ae`. Na última leitura havia LOCK DOE-SP-37 ativo para EXECUÇÃO-A; não inferir seus resultados antes do handoff/UNLOCK. Próxima revisão independente somente sobre um gate/resultado explicitamente delegado e respeitando C-06.

## Revisor em sessão Claude

Quando o prompt declarar **Modelo: Claude**, leia também [CLAUDE_SESSION_PROTOCOL.md](../docs/CLAUDE_SESSION_PROTOCOL.md). A sessão deve ser do tipo **REVISÃO**, sem participação no intervalo revisado (C-06). Gate 0, identificação de sessão/modelo e LOCK/UNLOCK continuam obrigatórios; o parecer declara identificador, modelo efetivo e participação anterior. O revisor apenas audita e aprova/reprova; correção exige nova sessão CÓDIGO/PREPARAÇÃO conforme o caso.

## Contrato do revisor

- Verificar escopo, proveniência dos PDFs, dedup/versionamento, segurança, replays e casos de falha; reportar achados com arquivo/linha ou evidência verificável.
- Separar parecer de código, resultado de CI e validação produtiva. Se qualquer erro ou gate falhar, investigar até onde for seguro, separar causa comprovada de hipótese, preservar evidência e devolver ao Gerente para análise e novo direcionamento; concluir passos independentes autorizados.
- Registrar parecer no PR e/ou na Issue vinculada quando a ferramenta permitir; caso contrário, fornecer texto exato e links ao Gerente. Seguir [HANDOFF.md](../docs/HANDOFF.md).
- Não tomar o lugar do Gerente na declaração de conclusão; o Gerente decide o gate com base nos relatos; um GPT-5.6 delegado atualiza [CONTEXT.md](../CONTEXT.md) e [PROJECT_STATE.md](../PROJECT_STATE.md) e retorna commit e resumo do diff.

Para iniciar novo chat revisor: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/REVIEWER.md e revise de forma independente a Issue #N e o PR vinculado, sem assumir aprovação ou estado de produção.”
