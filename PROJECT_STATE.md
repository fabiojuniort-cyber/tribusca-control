# TriBusca — Estado oficial do projeto

Atualizado em 26/09/2026 (America/Sao_Paulo).

Este arquivo resume o estado executivo. Issues e PRs registram execução, evidências e decisões. Uma declaração de conclusão produtiva exige os respectivos gates observados na produção.

## Repositórios

- [radar-fiscal-backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend): backend, Worker, Scheduler e conectores.
- [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web): frontend/site; primeira implementação pública está no draft PR #1, ainda sem merge/deploy.
- [tribusca-control](https://github.com/fabiojuniort-cyber/tribusca-control): governança, decisões e tarefas.

## Prioridade atual: DOE São Paulo

**ABERTO — não declarar produtivo/concluído.**

Em 26/09/2026 a **D-017**, refinada pela **D-036**, passou a estabelecer prioridade operacional da página oficial: conteúdo oficial completo e fiel é coletado diretamente e PDF que apenas o reproduz **não é baixado**; PDF oficial só é obtido quando necessário para conteúdo ausente/incompleto; anexos próprios continuam necessários. URL, autenticidade e proveniência disponíveis devem ser preservadas. Implementação por fonte permanece incremental na [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6).

Na DOE-SP, a direção técnica foi reaberta: **o HTML oficial deve ser o conteúdo principal e o PDF certificado não deve bloquear a captura da legislação**. O caminho anterior de reconciliação/histórico do [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) foi suspenso para reavaliação. O PR #71 permanece OPEN e unmerged e chegou ao head `3c286c982d983ecc7bce8f9722a1f967898665d3` (CI #394 SUCCESS) antes do redirecionamento; esse CI não autoriza merge.

A evidência produtiva histórica read-only para DOE-SP continua sendo o snapshot de 517 publicações/517 versões, mas **não é manifesto atual de reconstrução**. O Gerente decidiu **B — preservar o acervo existente**. O draft [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73) está no head `82f189c84a7b70e1985ed424c1549ae20184df46`; CI #432 / run `36252974888` e reexecução independente do job `108437300694` = **SUCCESS**. A revisão DOE-SP-26 foi favorável: HTML completo não solicita PDF redundante; HTML ausente exige PDF material; attachments seguem materiais; PDF autenticado material já capturado permanece na mesma origem sem resurrectar attachments; compatibilidade v1→v2 e hashes históricos foram preservados. `db:audit-doe-sp-rebuild` foi revisado apenas como código e não executado em produção.

O último diagnóstico produtivo comunicado antes do PR #71 apontava bootstrap parado em 29/07/2025, com 399 dias pendentes. Esses números são históricos, não uma leitura produtiva nova. A janela de bootstrap aprovada é 01/01/2025 até a data de validação.

### Issues ativas

| Issue | Resultado esperado | Dependência |
| --- | --- | --- |
| [#1 — gate DOE-SP HTML-primary](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) | Gerente decidir merge do PR #73 após DOE-SP-26 favorável; validação produtiva fica em gate posterior | PR #73 head `82f189c`, CI #432 + rerun SUCCESS; opção B/preservar; auditor não executado; merge não autorizado por esta atualização |
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
- Outros 26 DOEs: pendentes; só iniciar outro estado após fechamento formal de SP.
- API do produto, taxonomia, perfil e integrações autenticadas de Sonar/Revela/Decodifica/Acervo: prioridades posteriores conforme [ROADMAP.md](ROADMAP.md). A camada pública do site foi excepcionalmente autorizada em paralelo pela D-035 / WEB-01.

### WEB-01 / WEB-02 — site público

**EM REVISÃO — não declarar publicado.**

A [Issue #8](https://github.com/fabiojuniort-cyber/tribusca-control/issues/8) autorizou a camada pública em paralelo; em 26/09/2026 a WEB-02 substituiu as definições visuais conflitantes conforme D-037–D-049. O draft [frontend PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1), head `8167fff49cf2ba254b8d64075724df1f0331e40e`, contém Home, Cobertura, Portfólio, Como funciona e Reforma Tributária; modais de acesso; login conectado ao contrato existente `POST /auth/login`; carrossel estadual; seis recursos; Sonar/Revela/Decodifica conforme WEB-02; Cobertura federal + 27 UFs com status e métricas sem API em `—`; e timeline da Reforma sem datas especulativas. GitHub Actions run `36260136076` = **SUCCESS** para instalação, typecheck, testes e build.

**Sem merge e sem deploy.** Antes do merge: Gerente deve confirmar `Acervo/Central = Disponível`; Branding deve ratificar cores semânticas do Sonar (Issue #10); ainda cabe revisão visual/funcional. Cadastro/reset dependem da Issue #9; dados públicos da Cobertura/Acervo dependem da Issue #11.

## Governança

**GOV-01 — Padronizar prompts, handoffs e progresso:** regra documental vigente em 26/09/2026. Todo direcionamento Gerente → executor/revisor e todo handoff executor/revisor → Gerente usa bloco isolado copiável contendo somente a mensagem operacional destinada ao outro chat; linguagem técnica compacta é permitida quando inequívoca e sem omitir evidência necessária. O Gerente traduz o handoff em resumo claro ao usuário fora do bloco. Delegações exigem ID sequencial por frente, título, frente explícita e passos numerados; cada avanço relata resultado, evidência, próximo passo, progresso estimado da frente por marcos verificáveis e incerteza. Ao encerrar uma frente e abrir outra, o Gerente registra passos restantes e estimativa fundamentada do projeto total. Percentual é informativo e não substitui gate. A [Issue #5](https://github.com/fabiojuniort-cyber/tribusca-control/issues/5) permanece aberta para validar o ciclo completo de governança; esta atualização não altera nem conclui DOE-SP.

Decisões aprovadas de [produto/UX](docs/PRODUCT_AND_UX.md), [site/comercial](docs/SITE_AND_MARKETING.md), [marca v1](docs/BRAND_MANUAL_V1.md) e [ativos](docs/BRAND_ASSETS.md) foram incorporadas ao repositório; [questões abertas](docs/OPEN_QUESTIONS.md) mantêm propostas separadas do que foi decidido. O [índice de decisões](DECISIONS.md) liga esses temas. A camada pública do site foi retomada pela D-035 / WEB-01, sem declarar recursos autenticados implementados.

[CONTEXT.md](CONTEXT.md) é o ponto de leitura direta do Gerente Geral GPT-6 ao abrir uma conversa; ele pode reler contexto e evidências sempre que necessário, sem chat de bootstrap. [Backend](contexts/BACKEND.md), [frontend](contexts/WEB.md) e [DOE-SP](contexts/DOE-SP.md) são índices de frente; [executor](contexts/EXECUTOR.md) e [revisor](contexts/REVIEWER.md) apontam para as Issues atuais sem duplicar seus handoffs. O [protocolo de atualização](docs/CONTEXT_MAINTENANCE.md) define responsáveis e marcos. `radar-fiscal-web` possui agora o draft PR #1 (`feat/web-01-site-publico`, head `8167fff49cf2ba254b8d64075724df1f0331e40e`) com Home, Portfólio e Reforma Tributária; CI run `36260136076` SUCCESS (typecheck, testes e build). O PR não foi mergeado nem deployado. [Backend PR #72](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/72) foi mergeado com autorização em 26/09/2026 no commit `f25a596edce592e6e365e87ed4cbf16ba0922de8`, com dois arquivos de governança e CI #382 SUCCESS. Deploys automáticos desse commit: Backend `d0e39486-cdff-4ff1-9531-04a4f3b4dedd`, Worker `cfcb6909-ce88-4694-b493-daf7aa302bc7` e Scheduler `c34c8850-6c48-4d16-a0a4-14f817184d5d`, todos SUCCESS. Isso não é evidência de fechamento DOE-SP. No protocolo vigente, o Gerente Geral GPT-6 pode ler diretamente contextos e evidências quando necessário para analisar erros, handoffs e decisões, mas não realiza escritas nem ações que alterem estado; o GPT-5.6 delegado atualiza CONTEXT.md e este arquivo após o marco definido e traz commit/link. Os executores e revisores GPT-5.6 registram evidências nas Issues. A atualização não ocorre automaticamente entre conversas.

Documentos de decisões, arquitetura, papéis, segurança, handoff, revisão e modelos de Issue/PR criados neste repositório. Cinco Issues representam a frente atual, com etiquetas de prioridade e área. O [quadro TriBusca — Gestão do Projeto](https://github.com/users/fabiojuniort-cyber/projects/1) foi criado com importação das cinco Issues; o usuário informou a movimentação da Issue #1 para In Progress. O quadro oferece Todo, In Progress e Done; etapas específicas de revisão e validação produtiva são registradas em comentários da Issue. O conector GitHub atual não altera as colunas do Projects. O ciclo completo permanece em validação na Issue #5. Chats não se comunicam automaticamente por causa desses arquivos; o estado oficial é registrado no GitHub.


## API-01 — API pública do site

**ABERTA — implementação autorizada, merge/deploy não autorizados.**

Issue executora: [#11](https://github.com/fabiojuniort-cyber/tribusca-control/issues/11).

D-050 define três rotas read-only sob `/public/v1` para fontes, publicações e estatísticas. Escopo estritamente global/público; não expor conteúdo integral nem dados privados. CORS restrito por ambiente, cache de 300s e rate limit registrado como pendência.

Produção: PostgreSQL está online, mas o conector Railway disponível não executa SQL read-only; portanto schema/view produtivos não foram consultados diretamente neste marco. O código/migrations confirmam grants SELECT da role da API para os objetos necessários e índices `ix_publications_scope_date` e `ix_collection_runs_source_history`.

Próximo gate: PR backend + CI verde + handoff; Gerente decide merge/deploy.
