# TriBusca — entrada de qualquer chat de backend

Atualizado em 26/09/2026. Este arquivo é o ponto de entrada funcional para qualquer chat que mexa em `radar-fiscal-backend`. Leia também [AGENTS.md](../AGENTS.md), [decisões](../DECISIONS.md), [arquitetura](../docs/ARCHITECTURE.md), [segurança](../docs/SECURITY.md) e a Issue atribuída. O código/schema na main do backend é a fonte da implementação; não copiar trechos de chat como se fossem atuais.

## Estado para escolher a tarefa

A frente priorizada é DOE-SP, que permanece aberta até decisão de merge/validação produtiva. A D-017/D-036 determina **page-first**. O Gerente escolheu **B — preservar o acervo existente**. O draft [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73), head `82f189c84a7b70e1985ed424c1549ae20184df46`, base `f25a596edce592e6e365e87ed4cbf16ba0922de8`, passou CI #432 e reexecução independente do job `108437300694`. A revisão DOE-SP-26 foi favorável: HTML completo não solicita PDF redundante; HTML ausente usa PDF material; attachments seguem materiais; preservação same-origin está restrita a `AUTHENTICATED_PUBLICATION_PDF` DOE-SP; compatibilidade v1→v2 mantém hashes históricos. O auditor de rebuild foi revisado somente como código e não executado em produção. Próximo gate: Gerente decide merge; deploy/validação produtiva ficam separados. PR #71 segue apenas comparativo.

## Regras de continuidade

- Antes de iniciar: ler a Issue e verificar premissas atuais; usar [contexto do executor](EXECUTOR.md) ou [contexto do revisor](REVIEWER.md).
- A cada marco relevante (novo PR/head, revisão, merge, deploy, run/gate, bloqueio, mudança de decisão): registrar evidência e uma próxima ação na Issue. Executor atualiza documentação técnica no PR quando mudar comportamento; Gerente GPT-6 pode conferir evidências em modo somente leitura, analisa o relato e delega a um GPT-5.6 a atualização do snapshot em [CONTEXT.md](../CONTEXT.md), [PROJECT_STATE.md](../PROJECT_STATE.md) e este índice quando mudar a frente ativa.
- Outras fontes federais concluídas não são reabertas sem evidência. O próximo DOE só começa após o gate final de SP.
- Para nova frente backend, gerente define a Issue e o contexto curto específico; executor GPT-5.6 cria/atualiza em `contexts/`, apontando ao código e às evidências sem duplicá-los.

Retomada: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/BACKEND.md e a Issue #N. Revalide o estado e trabalhe somente nos limites autorizados.”


## API-01 — API pública read-only para Acervo e Cobertura

Definido em 26/09/2026 pelo usuário e formalizado na D-050 / Issue #11.

Definição anterior: o site público não possuía contrato real para métricas de Cobertura/Acervo e exibia “—”.

Nova definição:
- prefixo `/public/v1`;
- `GET /public/v1/sources`;
- `GET /public/v1/publications`;
- `GET /public/v1/stats`;
- somente metadados oficiais globais já públicos;
- nenhum `content_text`, empresa, tenant, usuário ou dado autenticado;
- CORS por `PUBLIC_API_ALLOWED_ORIGINS`, sem credentials;
- cache `public, max-age=300`;
- rate limit por IP permanece pendente porque não existe plugin instalado no backend;
- `RUNNING/PENDING` sem sucesso nos últimos 48h é `UNAVAILABLE`; com sucesso recente é `UNSTABLE`;
- `importedToday` considera apenas `NEW_PUBLICATION` e `NEW_VERSION` no dia civil de America/Sao_Paulo.

Impacto: habilita Home/Cobertura do site a usar dados reais depois de merge+deploy separados.

Limite de evidência: o conector Railway desta sessão não oferece SQL read-only ad hoc. Migrations, grants, tipos Kysely e view foram revalidados no repositório; não declarar schema produtivo como consultado ao vivo.

Próximo passo: implementar em branch/PR do backend, testes e CI. Merge/deploy continuam gate do Gerente.
