# TriBusca — Estado oficial do projeto

Atualizado em 27/09/2026 (America/Sao_Paulo).

Este arquivo resume o estado executivo. Issues e PRs registram execução, evidências e decisões. Uma declaração de conclusão produtiva exige os respectivos gates observados na produção.

## Repositórios

- [radar-fiscal-backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend): backend, Worker, Scheduler e conectores.
- [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web): frontend/site; primeira implementação pública está no draft PR #1, ainda sem merge/deploy.
- [tribusca-control](https://github.com/fabiojuniort-cyber/tribusca-control): governança, decisões e tarefas.

## Prioridade atual: DOE São Paulo

**ABERTO — não declarar produtivo/concluído.**

Em 26/09/2026 a **D-017**, refinada pela **D-036**, passou a estabelecer prioridade operacional da página oficial: conteúdo oficial completo e fiel é coletado diretamente e PDF que apenas o reproduz **não é baixado**; PDF oficial só é obtido quando necessário para conteúdo ausente/incompleto; anexos próprios continuam necessários. URL, autenticidade e proveniência disponíveis devem ser preservadas. Implementação por fonte permanece incremental na [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6).

Na DOE-SP, a direção técnica foi reaberta: **o HTML oficial deve ser o conteúdo principal e o PDF certificado não deve bloquear a captura da legislação**. O caminho anterior de reconciliação/histórico do [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) foi suspenso para reavaliação. O PR #71 permanece OPEN e unmerged e chegou ao head `3c286c982d983ecc7bce8f9722a1f967898665d3` (CI #394 SUCCESS) antes do redirecionamento; esse CI não autoriza merge.

O preflight produtivo DOE-SP-27b em modo somente leitura registrou **518 publicações / 518 versões, 569 `collection_items`, 569 vínculos run-publication, 3 checkpoints e 94 attachments**, com zero vínculos tenant/company/matches/cross-source, zero referências diretas no audit log e zero runs ativas naquele snapshot. Manifesto agregado SHA-256 `54fcdb05eb5f362e0be87a77457861d5a4c22f9674e8f7fae59005632ab16c71`; manifesto individual privado nos logs Railway. A decisão vigente é **A — reconstruir o acervo DOE-SP** (D-052), substituindo B. O draft [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73) permanece no head `82f189c84a7b70e1985ed424c1549ae20184df46`, com CI #432 e reexecução independente SUCCESS e parecer DOE-SP-26 favorável. Um snapshot de volume Postgres de 1,4 GB foi criado em 26/09/2026 15:08 BRT; recuperação disponível na UI, sem ensaio de restore. Procedimento destrutivo e gates produtivos pendentes; nenhuma exclusão ou recaptura executada.

O último diagnóstico produtivo comunicado antes do PR #71 apontava bootstrap parado em 29/07/2025, com 399 dias pendentes. Esses números são históricos, não uma leitura produtiva nova. A janela de bootstrap aprovada é 01/01/2025 até a data de validação.

### Issues ativas

| Issue | Resultado esperado | Dependência |
| --- | --- | --- |
| [#1 — gate DOE-SP HTML-primary](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) | Revisar procedimento restrito, pausar DOE-SP, repetir preflight/backup, finalizar PR #73, confirmar deploys e reconstruir/recapturar | Opção A autorizada (D-052); preflight 518/569/3 sem vínculos externos; PR #73 draft, CI verde; nenhuma exclusão ainda |
| [#2 — bootstrap e replay](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2) | Cobertura aprovada com pendingRanges vazio e replay idempotente | #1 |
| [#3 — artefatos/publication_files](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3) | Evidência e política de persistência dos arquivos | #1 |
| [#4 — fechamento DOE-SP](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4) | Gates, seção 13 do backend e temporários tratados | #1, #2 e #3 |
| [#5 — teste da governança](https://github.com/fabiojuniort-cyber/tribusca-control/issues/5) | Fluxo Issue → PR → revisão → gate → estado observado | #1 e quadro |
| [#6 — inventário global de conteúdo oficial](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6) | Aplicar D-017/D-036 por fonte: página integral primeiro, sem download de PDF redundante; PDF/anexo material quando necessário | P1; política global aprovada, adequação individual pendente por conector |

As Issues descrevem trabalho ainda não executado. Nenhuma delas é prova de conclusão. O PR #68 também permanecia aberto na consulta de PRs; não incorporar automaticamente POCs, repairs históricos ou mudanças fora da frente DOE-SP.

## Demais frentes

- Motor, autenticação/RLS, infraestrutura e fontes federais: entregas reportadas anteriormente; esta atualização não fez revalidação produtiva completa.
- DOU/INLABS: operacional, com gate final ainda a confirmar.
- CONFAZ: DOU como fonte primária dos atos formalmente publicados; portal direto indisponível no Railway segundo diagnósticos anteriores.
- Outros 26 DOEs: pendentes; **nenhum novo DOE começa antes do fechamento formal de SP**. Depois do fechamento, a D-055 permite paralelismo com taxonomia, Perfil Tributário e autenticação/comercial.
- O roadmap foi refinado pela D-055: após o fechamento formal do DOE-SP, demais DOEs, taxonomia, Perfil Tributário e autenticação/comercial podem avançar em paralelo. Sonar/Revela/Decodifica e integrações autenticadas continuam dependentes das respectivas bases/Issues. A camada pública segue autorizada em paralelo.

### WEB-01 / WEB-07 — site público

**BLOQUEADO EM REVISÃO — não declarar publicado nem aprovado.**

A [Issue #8](https://github.com/fabiojuniort-cyber/tribusca-control/issues/8) acompanha o draft [frontend PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1), que permanece **OPEN / DRAFT / unmerged**.

**WEB-06:** revisão independente do head `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d` = **REPROVADO/BLOQUEANTE**. Bloqueios comprovados:
- `#237032`, ratificado pela D-053 como exceção restrita ao Sonar, também era usado em `.password-rules .rule-ok`;
- não foi executada validação real em navegador para viewports, teclado/foco, focus trap/return, overflow e reduced-motion.

A ratificação conceitual D-053 permanece válida, porém a **Issue #10 continua OPEN** e o gate técnico não foi concluído.

**WEB-07:** em execução. O PR #1 avançou durante esta atualização; **head vivo revalidado:** `c35065abfb3ff7e39914eef9bc79337aea086bce`. O head intermediário `515e6b7...` teve Frontend CI #42 / run `36364670460` = **FAILURE**. Para `c35065a...`, Frontend CI #45 / run `36365215109` estava **IN_PROGRESS** no snapshot do gate documental. **Não há parecer independente favorável** e não se deve inferir aprovação por commit, CI ou existência de Playwright.

Estado preservado:
- seis recursos públicos continuam `Em desenvolvimento`;
- integração WEB da API pública ainda não está concluída;
- Issue #9 e D-054 continuam gates de cadastro/lançamento;
- sem merge e sem publicação definitiva do frontend.

### GOV-03 — decisões de coleta, produto, site e comercial

**DOCUMENTAÇÃO CONSOLIDADA EM BRANCH — nenhuma implementação, merge ou deploy por esta atividade.**

D-055 a D-063 registram: paralelismo condicionado ao fechamento formal DOE-SP; cadência corrente/backfill; escopo fiscal/retenção e CNPJ exato; Acervo público/auth/trial; Sonar; Revela; Decodifica; Reforma; e comercial.

Pontos de estado:
- DOE-SP permanece **ABERTO** e prioritário;
- D-055 não libera outro DOE antes do fechamento de SP;
- D-054 continua sendo o gate do CTA se houver lançamento do site antes da #9;
- cadastro/trial continuam bloqueados pela #9; D-058 define as regras funcionais futuras;
- D-053 segue como ratificação cromática do Sonar; Issue #10 continua aberta para verificação independente final;
- questões remanescentes estão em `docs/OPEN_QUESTIONS.md`;
- nenhuma disponibilidade de produto foi inferida de páginas, previews, mocks, PRs ou contratos em draft.

### GOV-04 — protocolo de sessões Claude

**EM PR DRAFT — somente documentação.**

[PR #13](https://github.com/fabiojuniort-cyber/tribusca-control/pull/13) registra o protocolo de sessões Claude na Issue #5, sem atuar na frente DOE-SP. O protocolo canônico contém 12 regras obrigatórias sobre Gate 0, exclusividade de tipo de sessão, executor único, LOCK/UNLOCK, revisão independente, autorizações, prompts compactos, critérios mensuráveis, artefatos em `ops/<frente>/`, proteção de dados privados, salvaguardas de preparação, limitação de exclusão de serviços Railway e estados Preparado/Executado/Validado.

Limites do marco:
- 0 código de produto/backend/frontend;
- 0 scripts, SQLs ou runbooks DOE-SP;
- 0 operações produtivas;
- merge em `main` requer decisão posterior do usuário.

## Governança

**GOV-01 — Padronizar prompts, handoffs e progresso:** regra documental vigente em 26/09/2026. Todo direcionamento Gerente → executor/revisor e todo handoff executor/revisor → Gerente usa bloco isolado copiável contendo somente a mensagem operacional destinada ao outro chat; linguagem técnica compacta é permitida quando inequívoca e sem omitir evidência necessária. O Gerente traduz o handoff em resumo claro ao usuário fora do bloco. Delegações exigem ID sequencial por frente, título, frente explícita e passos numerados; cada avanço relata resultado, evidência, próximo passo, progresso estimado da frente por marcos verificáveis e incerteza. Ao encerrar uma frente e abrir outra, o Gerente registra passos restantes e estimativa fundamentada do projeto total. Percentual é informativo e não substitui gate. A [Issue #5](https://github.com/fabiojuniort-cyber/tribusca-control/issues/5) permanece aberta para validar o ciclo completo de governança; esta atualização não altera nem conclui DOE-SP.

Decisões aprovadas de [produto/UX](docs/PRODUCT_AND_UX.md), [site/comercial](docs/SITE_AND_MARKETING.md), [marca v1](docs/BRAND_MANUAL_V1.md) e [ativos](docs/BRAND_ASSETS.md) foram incorporadas ao repositório; [questões abertas](docs/OPEN_QUESTIONS.md) mantêm propostas separadas do que foi decidido. O [índice de decisões](DECISIONS.md) liga esses temas. A camada pública do site foi retomada pela D-035 / WEB-01, sem declarar recursos autenticados implementados.

[CONTEXT.md](CONTEXT.md) é o ponto de leitura direta do Gerente Geral GPT-6 ao abrir uma conversa; ele pode reler contexto e evidências sempre que necessário, sem chat de bootstrap. [Backend](contexts/BACKEND.md), [frontend](contexts/WEB.md) e [DOE-SP](contexts/DOE-SP.md) são índices de frente; [executor](contexts/EXECUTOR.md) e [revisor](contexts/REVIEWER.md) apontam para as Issues atuais sem duplicar seus handoffs. O [protocolo de atualização](docs/CONTEXT_MAINTENANCE.md) define responsáveis e marcos. `radar-fiscal-web` mantém o draft PR #1 (`feat/web-01-site-publico`), **head vivo `c35065abfb3ff7e39914eef9bc79337aea086bce`**. WEB-06 foi REPROVADO/BLOQUEANTE no head `f92fbea8...`; WEB-07 está em execução. O head intermediário `515e6b7...` teve workflow #42 / run `36364670460` = FAILURE; o workflow #45 / run `36365215109` do head observado estava IN_PROGRESS no snapshot do gate documental. O PR não foi mergeado e não há aprovação independente do novo head. [Backend PR #72](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/72) foi mergeado com autorização em 26/09/2026 no commit `f25a596edce592e6e365e87ed4cbf16ba0922de8`, com dois arquivos de governança e CI #382 SUCCESS. Deploys automáticos desse commit: Backend `d0e39486-cdff-4ff1-9531-04a4f3b4dedd`, Worker `cfcb6909-ce88-4694-b493-daf7aa302bc7` e Scheduler `c34c8850-6c48-4d16-a0a4-14f817184d5d`, todos SUCCESS. Isso não é evidência de fechamento DOE-SP. No protocolo vigente, o Gerente Geral GPT-6 pode ler diretamente contextos e evidências quando necessário para analisar erros, handoffs e decisões, mas não realiza escritas nem ações que alterem estado; o GPT-5.6 delegado atualiza CONTEXT.md e este arquivo após o marco definido e traz commit/link. Os executores e revisores GPT-5.6 registram evidências nas Issues. A atualização não ocorre automaticamente entre conversas.

Documentos de decisões, arquitetura, papéis, segurança, handoff, revisão e modelos de Issue/PR criados neste repositório. Cinco Issues representam a frente atual, com etiquetas de prioridade e área. O [quadro TriBusca — Gestão do Projeto](https://github.com/users/fabiojuniort-cyber/projects/1) foi criado com importação das cinco Issues; o usuário informou a movimentação da Issue #1 para In Progress. O quadro oferece Todo, In Progress e Done; etapas específicas de revisão e validação produtiva são registradas em comentários da Issue. O conector GitHub atual não altera as colunas do Projects. O ciclo completo permanece em validação na Issue #5. Chats não se comunicam automaticamente por causa desses arquivos; o estado oficial é registrado no GitHub.


## API-01 — API pública do site

**MERGEADA E VALIDADA EM PRODUÇÃO NO ESCOPO D-050; INTEGRAÇÃO WEB AINDA ABERTA.**

Issue executora: [#11](https://github.com/fabiojuniort-cyber/tribusca-control/issues/11).

O [backend PR #74](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/74) foi mergeado por squash no commit `4688ff87a0b039eb426b80f5e279c95214fb87d2`.

Evidência registrada na Issue #11:
- revisão independente favorável do head pré-merge;
- deploys automáticos de Backend, Worker e Scheduler = **SUCCESS**;
- validação produtiva HTTP 200 dos três GETs:
  - `GET /public/v1/sources`;
  - `GET /public/v1/publications?uf=SP&limit=3`;
  - `GET /public/v1/stats`;
- cache `public, max-age=300`;
- `Vary` contendo `Origin`;
- sem conteúdo integral ou chaves tenant/company/user/credencial/token nos payloads inspecionados;
- sem migration ou job novo.

**Ainda abertos na #11:** integração WEB, confirmação/configuração das origens CORS reais e rate limit por IP.

**Nova dependência GOV-03 / D-057:** publicação não fiscal retida apenas por CNPJ exato é privada da respectiva conta. A API D-050 atual consulta metadados globais e não possui filtro fiscal/tenant para essa nova categoria. **Antes de introduzir esses registros, o filtro/proteção precisa estar implementado e validado**; sem isso, eles não podem ser persistidos em tabelas globais consultadas por `GET /public/v1/publications` nem ficar de outra forma alcançáveis pela API pública. Restrição apenas visual não satisfaz o gate. A futura Issue técnica permanece aberta.

**Divergência D-058 × contrato atual:** a exibição pública aprovada contém título, data, órgão e link oficial; `GET /public/v1/publications` também retorna `id`, `actType`, `actNumber`, `uf` e `effectiveOn`. A API não será alterada por esta GOV-03 e a exibição desses campos adicionais requer decisão de produto posterior.
