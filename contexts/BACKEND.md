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
