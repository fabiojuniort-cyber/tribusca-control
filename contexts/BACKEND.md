# TriBusca — entrada de qualquer chat de backend

Atualizado em 27/09/2026. Este arquivo é o ponto de entrada funcional para qualquer chat que mexa em `radar-fiscal-backend`. Leia também [AGENTS.md](../AGENTS.md), [decisões](../DECISIONS.md), [arquitetura](../docs/ARCHITECTURE.md), [segurança](../docs/SECURITY.md) e a Issue atribuída. O código/schema na main do backend é a fonte da implementação; não copiar trechos de chat como se fossem atuais.

## Estado para escolher a tarefa

A frente priorizada é DOE-SP e permanece aberta até reconstrução e validação produtiva. D-017/D-036 determina page-first; a autorização vigente é **A — reconstruir somente o acervo DOE-SP** (D-052), substituindo B. O draft [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73), head `82f189c84a7b70e1985ed424c1549ae20184df46`, passou CI #432 e reexecução independente; DOE-SP-26 deu parecer favorável. Preflight produtivo DOE-SP-27b: 518 publicações/versões, 569 itens e vínculos run-publication, 3 checkpoints, 94 attachments, zero vínculos externos e zero runs ativas no snapshot. Backup de volume Postgres de 1,4 GB criado em 26/09/2026 15:08 BRT; restauração disponível na UI, sem ensaio. Nenhuma exclusão, merge ou recaptura neste marco. Próximo gate: revisão do procedimento restrito, pausa da fonte, novo preflight/backup e confirmação dos deploys após merge.

## Regras de continuidade

- Antes de iniciar: ler a Issue e verificar premissas atuais; usar [contexto do executor](EXECUTOR.md) ou [contexto do revisor](REVIEWER.md).
- A cada marco relevante (novo PR/head, revisão, merge, deploy, run/gate, bloqueio, mudança de decisão): registrar evidência e uma próxima ação na Issue. Executor atualiza documentação técnica no PR quando mudar comportamento; Gerente GPT-6 pode conferir evidências em modo somente leitura, analisa o relato e delega a um GPT-5.6 a atualização do snapshot em [CONTEXT.md](../CONTEXT.md), [PROJECT_STATE.md](../PROJECT_STATE.md) e este índice quando mudar a frente ativa.
- Outras fontes federais concluídas não são reabertas sem evidência. O próximo DOE só começa após o **fechamento formal de SP**. Depois desse fechamento, a D-055 permite que demais DOEs avancem em paralelo com taxonomia, Perfil Tributário e autenticação/comercial.
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

Implementação: draft [PR #74](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/74), branch `feat/api-01-public-readonly`, head `7e5ba9718ccb0f2c6bcf806e5471dff4dc2db8d6`, base `f25a596...`. CI #433 / run `36260320585` = **SUCCESS**. Testes cobrem as 3 rotas, fonte sem runs, UF sem dados, filtros, ausência de conteúdo integral, CORS allow/deny/OPTIONS e cache. Sem migration/job novo; `publication_versions` não é consultada. README + `docs/public-api.md` documentam o contrato. Domínios CORS reais ainda não foram comprovados e devem ser configurados no deploy. Próximo passo: Gerente decide merge; deploy/validação produtiva em gate separado.


## GOV-03 — decisões futuras que afetam backend

**Nenhuma implementação backend foi autorizada por esta atualização documental.**

- monitoramento corrente: 06h/10h/14h/18h BRT quando aplicável; backfill separado, 1 consulta/hora, recuando 1 dia por consulta/fonte até o acervo oficial disponível;
- classificação/retenção: conteúdo integral para matéria fiscal/tributária e para CNPJ exato cadastrado; rejeitados mantêm metadados mínimos + motivo; raiz de 8 dígitos não é menção;
- estratégia de reexaminar acervo antigo ao cadastrar novo CNPJ permanece aberta;
- Issue #9 deverá refletir senha mínima de 8 caracteres + maiúscula/minúscula/número/especial, primeiro usuário administrador, trial após verificação de e-mail + primeiro cadastro de empresa e CNPJ opcional no formulário;
- ao cadastrar CNPJ matriz/filial, o produto deverá tentar obter CNAE/endereço de fonte disponível; empresa sem CNPJ continua questão aberta;
- credenciais da mesma pessoa não podem manter acesso simultâneo; comportamento do segundo login ainda é questão aberta;
- nenhuma migration, endpoint, cron, sessão, Worker ou deploy foi alterado nesta GOV-03.
