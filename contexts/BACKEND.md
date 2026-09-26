# TriBusca — entrada de qualquer chat de backend

Atualizado em 26/09/2026. Este arquivo é o ponto de entrada funcional para qualquer chat que mexa em `radar-fiscal-backend`. Leia também [AGENTS.md](../AGENTS.md), [decisões](../DECISIONS.md), [arquitetura](../docs/ARCHITECTURE.md), [segurança](../docs/SECURITY.md) e a Issue atribuída. O código/schema na main do backend é a fonte da implementação; não copiar trechos de chat como se fossem atuais.

## Estado para escolher a tarefa

A frente priorizada é DOE-SP, que permanece aberta. O [PR de governança #72](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/72) foi mergeado com autorização em 26/09/2026; `AGENTS.md` e template de PR estão na main (commit `f25a596edce592e6e365e87ed4cbf16ba0922de8`). Backend, Worker e Scheduler concluíram deploy automático em SUCCESS; isso não valida nenhum gate DOE-SP. A decisão global D-017 sobre conteúdo oficial está em [OFFICIAL_CONTENT_POLICY.md](../docs/OFFICIAL_CONTENT_POLICY.md) e a matriz por fonte em [OFFICIAL_CONTENT_INVENTORY.md](../docs/OFFICIAL_CONTENT_INVENTORY.md). [Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) é o gate DOE-SP. O draft [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73), head `c836e22837b5ed056da5995613b832336039432e`, implementa HTML-primary v2 e compatibilidade legada; CI #416 e reexecução independente foram SUCCESS. A revisão DOE-SP-23, porém, emitiu parecer **BLOQUEANTE**: o overwrite integral em `upsertOrigin()` pode apagar proveniência de PDF previamente capturada quando o mesmo origin sofre 404/500 em replay posterior. O próximo trabalho autorizado é corrigir essa preservação e testar `CAPTURED → 404/500 → CAPTURED`, seguido de nova revisão independente. PR #71 segue apenas comparativo. #2 e #3 dependem de #1; #4 depende de #1–#3. Leia [CONTEXT.md](../CONTEXT.md) para o snapshot datado e revalide GitHub/Railway/PostgreSQL apenas na medida exigida pela Issue. Não assumir autorização de merge, deploy, coleta ou migration.

## Regras de continuidade

- Antes de iniciar: ler a Issue e verificar premissas atuais; usar [contexto do executor](EXECUTOR.md) ou [contexto do revisor](REVIEWER.md).
- A cada marco relevante (novo PR/head, revisão, merge, deploy, run/gate, bloqueio, mudança de decisão): registrar evidência e uma próxima ação na Issue. Executor atualiza documentação técnica no PR quando mudar comportamento; Gerente GPT-6 pode conferir evidências em modo somente leitura, analisa o relato e delega a um GPT-5.6 a atualização do snapshot em [CONTEXT.md](../CONTEXT.md), [PROJECT_STATE.md](../PROJECT_STATE.md) e este índice quando mudar a frente ativa.
- Outras fontes federais concluídas não são reabertas sem evidência. O próximo DOE só começa após o gate final de SP.
- Para nova frente backend, gerente define a Issue e o contexto curto específico; executor GPT-5.6 cria/atualiza em `contexts/`, apontando ao código e às evidências sem duplicá-los.

Retomada: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/BACKEND.md e a Issue #N. Revalide o estado e trabalhe somente nos limites autorizados.”
