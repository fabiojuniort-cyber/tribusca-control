# TriBusca — entrada de qualquer chat de backend

Atualizado em 30/09/2026. Este arquivo é o ponto de entrada funcional para qualquer chat que mexa em `radar-fiscal-backend`. Leia também [AGENTS.md](../AGENTS.md), [decisões](../DECISIONS.md), [arquitetura](../docs/ARCHITECTURE.md), [segurança](../docs/SECURITY.md) e a Issue atribuída. O código/schema na main do backend é a fonte da implementação; não copiar trechos de chat como se fossem atuais.

## Estado para escolher a tarefa

A frente priorizada é DOE-SP e permanece aberta até reconstrução e validação produtiva. D-017/D-036 determina page-first; a autorização vigente é **A — reconstruir somente o acervo DOE-SP** (D-052), substituindo B. O draft [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73), head `82f189c84a7b70e1985ed424c1549ae20184df46`, passou CI #432 e reexecução independente; DOE-SP-26 deu parecer favorável. Preflight produtivo DOE-SP-27b: 518 publicações/versões, 569 itens e vínculos run-publication, 3 checkpoints, 94 attachments, zero vínculos externos e zero runs ativas no snapshot. Backup de volume Postgres de 1,4 GB criado em 26/09/2026 15:08 BRT; restauração disponível na UI, sem ensaio. Nenhuma exclusão, merge ou recaptura neste marco. Próximo gate: revisão do procedimento restrito, pausa da fonte, novo preflight/backup e confirmação dos deploys após merge.

## Taxonomia — estado consolidado

A Taxonomia TriBusca v1 está **implementada e ativada em produção**.

Backend `main@25c2c42ed43d001dcfa1eb0edc9ce4fa35fffbe7` contém TAX-07, TAX-08 e TAX-09 após reviews independentes favoráveis e merges dos PRs #91, #93 e #95.

A [Issue #46](https://github.com/fabiojuniort-cyber/tribusca-control/issues/46) concluiu o gate R3:
- migrations produtivas 001→021;
- release `v1.0.0` / `6e6ad5ff-fa6d-45dc-a3ea-ae4c5e4c2f3b` = `PUBLISHED`;
- manifest `cdbad652dbafddef45193be9f5092ab17cb5097523085135e1f3b2ce00eb85ee`;
- derivation `ac315c0ad591836c8c98c03b04769aa8442ebec5409fd1fc5961dffc04a2414b`;
- runtime, worker e curator security = PASS;
- smoke TAX-07/08/09 rollback-only = PASS;
- RLS matching = PASS;
- release PUBLISHED imutável = PASS;
- zero dado de smoke persistido e zero backfill em massa.

A Issue #46 está CLOSED/completed e o LOCK TAX-ACT foi liberado. Não reabrir TAX-01→TAX-09 como implementação pendente. Operações futuras de classificação, backfill, curadoria ou matching devem usar gates próprios e preservar a release publicada/histórico.

DOE-SP somente pode retomar writes no PostgreSQL após adquirir novo LOCK R3.

## PERF-01/02 — catálogo escalável (em produção desde 01/10/2026)

- Migration `029_catalog_scale.sql` aplicada.
- Contrato e runbook em `docs/catalog-performance.md`; plano de escala e fases F6/F7 em `docs/catalog-scale-plan.md`.
- Validação: `ops/catalog/029-validate.sql` (read-only). Ensaio em restore: `ops/catalog/rehearse-029.mjs`, que só roda dentro da Railway.
- Regras para mudanças futuras:
  - regras de famílias ocultas e de atos CONFAZ mudam **só por nova migration** (colunas geradas);
  - escrita em `publication_origins`/`publications` atualiza `publication_source_feed` por trigger;
  - carga em massa: preferir INSERT multi-linha; ou desligar os triggers do feed, reconstruir e rodar o `029-validate.sql`.
- Atenção: no backend, **merge em `main` aplica migrations** no pre-deploy (`npm run db:prepare`).
- Issue de execução: [#55](https://github.com/fabiojuniort-cyber/tribusca-control/issues/55) (CLOSED).

## Regras de continuidade

- Antes de iniciar: ler a Issue e verificar premissas atuais; usar [contexto do executor](EXECUTOR.md) ou [contexto do revisor](REVIEWER.md).
- A cada marco relevante (novo PR/head, revisão, merge, deploy, run/gate, bloqueio, mudança de decisão): registrar evidência e uma próxima ação na Issue. Executor atualiza documentação técnica no PR quando mudar comportamento; Gerente GPT-6 pode conferir evidências em modo somente leitura, analisa o relato e delega a um GPT-5.6 a atualização do snapshot em [CONTEXT.md](../CONTEXT.md), [PROJECT_STATE.md](../PROJECT_STATE.md) e este índice quando mudar a frente ativa.
- Outras fontes federais concluídas não são reabertas sem evidência. O próximo DOE só começa após o **fechamento formal de SP**. Depois desse fechamento, a D-055 permite que demais DOEs avancem em paralelo com taxonomia, Perfil Tributário e autenticação/comercial.
- Para nova frente backend, gerente define a Issue e o contexto curto específico; executor GPT-5.6 cria/atualiza em `contexts/`, apontando ao código e às evidências sem duplicá-los.

Retomada: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/BACKEND.md e a Issue #N. Revalide o estado e trabalhe somente nos limites autorizados.”


## API-01 — API pública read-only para Acervo e Cobertura

Definida pela D-050 / Issue #11.

### Estado verificado

O [backend PR #74](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/74) foi **mergeado por squash** no commit `4688ff87a0b039eb426b80f5e279c95214fb87d2`.

A Issue #11 registra:
- revisão independente favorável do head pré-merge `cf623e2458fcde39ebfd03bd9eb5c3f4bde205f6`;
- deploys automáticos de Backend, Worker e Scheduler = **SUCCESS**;
- validação produtiva dos três GETs públicos, todos HTTP 200:
  - `GET /public/v1/sources`;
  - `GET /public/v1/publications?uf=SP&limit=3`;
  - `GET /public/v1/stats`;
- `Cache-Control: public, max-age=300`;
- `Vary` incluindo `Origin`;
- nenhuma chave de conteúdo integral, tenant, company, usuário, credencial ou token nos payloads inspecionados;
- sem migration ou job novo.

A API pública, portanto, está **mergeada, publicada e validada no escopo D-050**.

### Trabalho ainda aberto

A Issue #11 permanece aberta para:
- integração do frontend/WEB com a URL base pública;
- confirmação/configuração das **origens CORS reais**;
- avaliação/implementação futura de **rate limit por IP**.

Esses itens não invalidam a validação produtiva já concluída dos três GETs.

### Dependência nova da D-057

A D-057 admite preservar publicação **não fiscal** quando houver menção exata a CNPJ cadastrado, mas esse registro deve ser visível **somente à respectiva conta**.

A API D-050 foi desenhada para metadados globais públicos e atualmente **não possui filtro fiscal/tenant para essa nova categoria**. **Antes de introduzir registros não fiscais retidos apenas por CNPJ**, o filtro/proteção deve estar implementado e validado. Sem isso, esses registros **não podem ser persistidos em tabelas globais consultadas por `GET /public/v1/publications` nem ficar de outra forma alcançáveis pela API pública**. Restringir somente o componente visual do site não atende ao gate. A futura Issue técnica permanece aberta. Não alterar API/schema nesta GOV-03.

### Divergência de campos D-058 × API atual

A D-058 aprovou para **exibição no Acervo público** somente:
- título;
- data;
- órgão;
- link oficial.

O contrato atual de `GET /public/v1/publications` retorna:
- `id`;
- `title`;
- `actType`;
- `actNumber`;
- `agency`;
- `uf`;
- `publishedOn`;
- `effectiveOn`;
- `officialUrl`.

Mapeamento direto dos quatro campos aprovados: `title`, `publishedOn`, `agency`, `officialUrl`. Os campos adicionais existem no contrato D-050, mas **não estão automaticamente aprovados para exibição pela D-058**. A decisão de produto sobre exibi-los permanece aberta; esta atividade não muda a API.

## GOV-03 — decisões futuras que afetam backend

**Nenhuma implementação backend foi autorizada por esta atualização documental.**

- monitoramento corrente: 06h/10h/14h/18h BRT quando aplicável; backfill separado, 1 consulta/hora, recuando 1 dia por consulta/fonte até o acervo oficial disponível;
- classificação/retenção: conteúdo integral para matéria fiscal/tributária e para CNPJ exato cadastrado; rejeitados mantêm metadados mínimos + motivo; raiz de 8 dígitos não é menção; publicação não fiscal retida apenas por CNPJ é privada da conta e **não deve ser introduzida em tabelas globais consultadas pela API pública, nem ficar alcançável por ela, antes de filtro/proteção implementado e validado em Issue técnica própria**;
- estratégia de reexaminar acervo antigo ao cadastrar novo CNPJ permanece aberta;
- Issue #9 deverá refletir senha mínima de 8 caracteres + maiúscula/minúscula/número/especial, primeiro usuário administrador, trial após verificação de e-mail + primeiro cadastro de empresa e CNPJ opcional no formulário;
- ao cadastrar CNPJ matriz/filial, o produto deverá tentar obter CNAE/endereço de fonte disponível; empresa sem CNPJ continua questão aberta;
- credenciais da mesma pessoa não podem manter acesso simultâneo; comportamento do segundo login ainda é questão aberta;
- nenhuma migration, endpoint, cron, sessão, Worker ou deploy foi alterado nesta GOV-03.

## Railway AI Agent

Nesta frente, o **Railway AI Agent não pode ser usado** para diagnóstico, logs, banco, deploy, variáveis, serviços ou qualquer outra ação. Para Railway, usar somente meios não-AI permitidos pela D-065 e por [RAILWAY_AI_AGENT_POLICY.md](../docs/RAILWAY_AI_AGENT_POLICY.md). Se uma evidência não puder ser obtida por canal permitido, registrar `NOT_PROVEN`.

### ACT-SCOPE-02 — Filtro de Coleta Configurável

**CONCLUÍDO E VALIDADO EM PRODUÇÃO — 07/10/2026, 16:47 BRT. Avanço: 100%.** Atualização factual R0 somente desta frente. Evidências e liberação do lease: [Issue #87](https://github.com/fabiojuniort-cyber/tribusca-control/issues/87).

- Etapas 0–7 concluídas. ACT-SCOPE-01/Issue #85 e backend PR #164 foram substituídos; não incorporar a implementação anterior. Controle PR #88 já fechado.
- Motor central DOU de dois níveis, tipo desconhecido KEEP + Novos tipos, auditoria FILTERED_OUT sem conteúdo integral e retenção de 3 meses: backend PR #178, merge `ac818d609b4c0c8963642ff1f5470b1865d984bd`; migration 041 aplicada.
- Política APPROVED `cada0d81-95bd-4d18-bd03-66067cc9893c`, v1/r5. FULL_ARCHIVE `2dfb162f-5901-4170-addd-f25627bd7da0`: 99.498 itens = 25.574 KEEP + 73.924 DISCARD; unknown = 0.
- Frontend PR #77, merge `35b6efbdad343812b00b27b59159babca81c163b`; CI #432/run 37637719439 SUCCESS (182 unitários, 136 browser, 4 viewports). Telas de políticas/simulação/Desconsiderados/Novos tipos e isolamento de sessão/cache revisados e publicados. Deploy ACT `bee45924-acc3-42f9-b870-74f4359a3e81` SUCCESS.
- Smoke real DOU de 15/07/2026, run `18059cb0-a1b7-4f96-a4fe-d6d85118d597`: 2.627 itens; 775 KEEP (772 novas publicações, 1 existente, 2 novas versões); 1.852 FILTERED_OUT sem publicação persistida; 0 erros. Auditoria/política/expiração conferidas; 0 descartes DOE-SP.
- Backup/restore PG18 PASS, dump SHA-256 `20acd13cc7eb20d2b7d1d0de8de4dfd3d663965454f95e1f72e90b626189891d`. Ensaio isolado do mesmo executor/manifest PASS.
- Histórico produtivo deployment `14696fbb-6c38-4615-8267-f397032270e5`, executor revisado `5dbc15f03c0bc36797ff145c4543891c56aab270`, manifest `a43e813460385351b0eaf36e1cb3162fcca1d0f25f01e94f10c42ac89e957a2a`: 61.345 SUPPRESS com visibilidade normal/RLS + feed = 0; 61.345 RESTORE com visibilidade/feed = 61.345. PASS às 19:32:14 UTC; remaining = 0, failedChunks = 0. **Estado final RESTORED/IN**, conforme ciclo de reversibilidade autorizado.
- Preservação: 61.345 publicações, 61.352 versões, 61.355 origens, 0 arquivos; outside_hash `cce430ca721e8842d54a6adb817ee535` preservado; feed_hash retornou a `6ae2e15c638edd42669458e39dc56c15`; global OUT retornou a 23.024; epoch 23.026 → 84.371 → 145.716. Dos 73.924 DISCARD, 10.743 já OUT e 1.836 com deriva foram preservados fora do conjunto.
- Revisão independente FAVORÁVEL ao artefato, gate produtivo e PASS final. CI #1086/run 37671991803 SUCCESS. PR #183 head `7fc38dcbcd7dfeee7af5d37f867ab1e837059947` com revisão incremental favorável; CI #1089/run 37674214315 tentativa 2 SUCCESS (regressão completa e PG18 isolado). Tentativa 1 teve timeout inicial do runner, resolvido por reexecução do mesmo commit.
- Operadores incorporados por squash na PR #183: merge `1ce907d7516fc61d726c741dd4955da2f1d1e45e`. Deploy automático da API `0e417198-39a3-4df6-b4a4-e386de779972` SUCCESS e online após o merge. Nenhum módulo de runtime alterado pela PR operacional.
- Removidos somente os 3 temporários ACT (seed/smoke, review, backup-restore), com inventário reconferido. Volume privado `81b881b4-d4fa-4cdb-9293-5f89541917c4` preservado/live/desanexado, 30.000 MB, com dump/manifest/evidências sem exportação.
- Saúde final: API /health ok/database up às 19:47:06.625 UTC; backend 1/1, worker 2/2, scheduler 1/1, Postgres 1/1 online; 0 issues/falhas nos serviços centrais e pendingWork vazio. Web online e rota /admin/filtro-coleta HTTP 200. Browser CI e visibilidade normal/RLS/feed foram comprovados; smoke visual autenticado em produção não foi realizado nesta sessão.
- DOE-SP e outras frentes preservadas. Nenhum DELETE de publicação; Railway AI Agent não utilizado. Sem pendência material ACT; futuras políticas, exclusão física ou novas fontes exigem operação própria.
