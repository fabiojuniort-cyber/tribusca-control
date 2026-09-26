# TriBusca — entrada de qualquer chat de backend

Atualizado em 26/09/2026. Este arquivo é o ponto de entrada funcional para qualquer chat que mexa em `radar-fiscal-backend`. Leia também [AGENTS.md](../AGENTS.md), [decisões](../DECISIONS.md), [arquitetura](../docs/ARCHITECTURE.md), [segurança](../docs/SECURITY.md) e a Issue atribuída. O código/schema na main do backend é a fonte da implementação; não copiar trechos de chat como se fossem atuais.

## Estado para escolher a tarefa

A frente priorizada é DOE-SP, que permanece aberta. A D-017/D-036 determina **page-first**: página oficial integral → não baixar PDF redundante; página insuficiente → PDF oficial material; attachments próprios continuam materiais. [Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) é o gate DOE-SP. O draft [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73), head `22ec75c937e781eb9e063a0037f5c3df50aa0467`, implementa esse fluxo e passou CI #424 / run `36249562497`. A DOE-SP-24 também adicionou auditor read-only de dependências do acervo, não executado em produção. O Gerente deve decidir entre A reconstrução, somente após preflight sem blockers, e B preservação, mantendo compatibilidade v1→v2 e corrigindo o overwrite de `upsertOrigin()` apontado pela DOE-SP-23. PR #71 segue apenas comparativo. #2 e #3 dependem de #1; #4 depende de #1–#3. Não assumir autorização de merge, deploy, reconstrução, coleta ou migration.

## Regras de continuidade

- Antes de iniciar: ler a Issue e verificar premissas atuais; usar [contexto do executor](EXECUTOR.md) ou [contexto do revisor](REVIEWER.md).
- A cada marco relevante (novo PR/head, revisão, merge, deploy, run/gate, bloqueio, mudança de decisão): registrar evidência e uma próxima ação na Issue. Executor atualiza documentação técnica no PR quando mudar comportamento; Gerente GPT-6 pode conferir evidências em modo somente leitura, analisa o relato e delega a um GPT-5.6 a atualização do snapshot em [CONTEXT.md](../CONTEXT.md), [PROJECT_STATE.md](../PROJECT_STATE.md) e este índice quando mudar a frente ativa.
- Outras fontes federais concluídas não são reabertas sem evidência. O próximo DOE só começa após o gate final de SP.
- Para nova frente backend, gerente define a Issue e o contexto curto específico; executor GPT-5.6 cria/atualiza em `contexts/`, apontando ao código e às evidências sem duplicá-los.

Retomada: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/BACKEND.md e a Issue #N. Revalide o estado e trabalhe somente nos limites autorizados.”
