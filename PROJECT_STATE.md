# TriBusca — Estado oficial do projeto

Atualizado em 26/09/2026 (America/Sao_Paulo).

Este arquivo resume o estado executivo. Issues e PRs registram execução, evidências e decisões. Uma declaração de conclusão produtiva exige os respectivos gates observados na produção.

## Repositórios

- [radar-fiscal-backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend): backend, Worker, Scheduler e conectores.
- [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web): frontend/site; primeira implementação pública está no draft PR #1, ainda sem merge/deploy.
- [tribusca-control](https://github.com/fabiojuniort-cyber/tribusca-control): governança, decisões e tarefas.

## Prioridade atual: DOE São Paulo

**ABERTO — não declarar produtivo/concluído.**

Em 26/09/2026 foi aprovada a decisão global **D-017**: conteúdo completo e fiel publicado em página oficial pode ser coletado diretamente; PDF redundante não é requisito de captura e sua falha isolada não pode bloquear a publicação. URL oficial e referência de autenticidade disponível devem ser preservadas; PDF/anexo com conteúdo material ausente da página continua necessário. A implementação por fonte permanece incremental, com matriz canônica em [docs/OFFICIAL_CONTENT_INVENTORY.md](docs/OFFICIAL_CONTENT_INVENTORY.md) e acompanhamento na [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6).

Na DOE-SP, a direção técnica foi reaberta: **o HTML oficial deve ser o conteúdo principal e o PDF certificado não deve bloquear a captura da legislação**. O caminho anterior de reconciliação/histórico do [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) foi suspenso para reavaliação. O PR #71 permanece OPEN e unmerged e chegou ao head `3c286c982d983ecc7bce8f9722a1f967898665d3` (CI #394 SUCCESS) antes do redirecionamento; esse CI não autoriza merge.

A investigação somente leitura mantém a evidência de impacto legado: `DOE_SP_AUDIT` registrou 517 publicações/517 versões, 610 arquivos, **516 PDFs autenticados** e 94 anexos, todos os 610 com SHA-256 válido naquele snapshot. A opção A foi implementada no draft [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73), head `c836e22837b5ed056da5995613b832336039432e`: hash v2 opt-in usa título + HTML oficial + vigência + anexos materiais; PDF autenticado redundante fica como proveniência exclusiva da origem; compatibilidade com v1 exige reconstrução exata do hash legado e igualdade de título/texto/vigência/anexos, sem reescrever hash/arquivos históricos. CI #416 / run `36227675798` = **SUCCESS**. Testes cobrem legado com e sem PDF, mudanças reais, evidência insuficiente, falha de anexo material, 404 não bloqueante e as duas origens observadas da Portaria SRE 42/2025 resultando em uma publicação/uma versão sem PDF emprestado. Merge, deploy, migration, coleta manual e repair produtivo permanecem não autorizados; próximo gate é revisão independente.

O último diagnóstico produtivo comunicado antes do PR #71 apontava bootstrap parado em 29/07/2025, com 399 dias pendentes. Esses números são históricos, não uma leitura produtiva nova. A janela de bootstrap aprovada é 01/01/2025 até a data de validação.

### Issues ativas

| Issue | Resultado esperado | Dependência |
| --- | --- | --- |
| [#1 — gate DOE-SP HTML-primary](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) | Revisar independentemente a implementação v2/compatibilidade legada do PR #73 | Atual; PR #73 head `c836e228`, CI #416 SUCCESS; merge não autorizado; PR #71 apenas comparativo |
| [#2 — bootstrap e replay](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2) | Cobertura aprovada com pendingRanges vazio e replay idempotente | #1 |
| [#3 — artefatos/publication_files](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3) | Evidência e política de persistência dos arquivos | #1 |
| [#4 — fechamento DOE-SP](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4) | Gates, seção 13 do backend e temporários tratados | #1, #2 e #3 |
| [#5 — teste da governança](https://github.com/fabiojuniort-cyber/tribusca-control/issues/5) | Fluxo Issue → PR → revisão → gate → estado observado | #1 e quadro |
| [#6 — inventário global de conteúdo oficial](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6) | Inventariar HTML/JSON/PDF/anexos/autenticidade/versionamento por fonte conforme D-017 | P1; não altera conectores nesta Issue |

As Issues descrevem trabalho ainda não executado. Nenhuma delas é prova de conclusão. O PR #68 também permanecia aberto na consulta de PRs; não incorporar automaticamente POCs, repairs históricos ou mudanças fora da frente DOE-SP.

## Demais frentes

- Motor, autenticação/RLS, infraestrutura e fontes federais: entregas reportadas anteriormente; esta atualização não fez revalidação produtiva completa.
- DOU/INLABS: operacional, com gate final ainda a confirmar.
- CONFAZ: DOU como fonte primária dos atos formalmente publicados; portal direto indisponível no Railway segundo diagnósticos anteriores.
- Outros 26 DOEs: pendentes; só iniciar outro estado após fechamento formal de SP.
- API do produto, taxonomia, perfil e integrações autenticadas de Sonar/Revela/Decodifica/Acervo: prioridades posteriores conforme [ROADMAP.md](ROADMAP.md). A camada pública do site foi excepcionalmente autorizada em paralelo pela D-035 / WEB-01.

### WEB-01 — site público

**EM REVISÃO — não declarar publicado.**

A [Issue #8](https://github.com/fabiojuniort-cyber/tribusca-control/issues/8) autorizou a camada pública em paralelo. O draft [frontend PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1), head `29a6c06a1395944c97b185b5fbf3d643b9a3a40c`, contém Home, Portfólio, página Reforma Tributária, Sonar animado em CSS, Revela, Decodifica e Acervo em apresentação conceitual, com recursos não entregues marcados como em desenvolvimento. GitHub Actions run `36228862164` = **SUCCESS** para typecheck, testes e build. Sem merge e sem deploy.

## Governança

**GOV-01 — Padronizar prompts, handoffs e progresso:** regra documental vigente em 26/09/2026. Todo direcionamento Gerente → executor/revisor e todo handoff executor/revisor → Gerente usa bloco isolado copiável contendo somente a mensagem operacional destinada ao outro chat; linguagem técnica compacta é permitida quando inequívoca e sem omitir evidência necessária. O Gerente traduz o handoff em resumo claro ao usuário fora do bloco. Delegações exigem ID sequencial por frente, título, frente explícita e passos numerados; cada avanço relata resultado, evidência, próximo passo, progresso estimado da frente por marcos verificáveis e incerteza. Ao encerrar uma frente e abrir outra, o Gerente registra passos restantes e estimativa fundamentada do projeto total. Percentual é informativo e não substitui gate. A [Issue #5](https://github.com/fabiojuniort-cyber/tribusca-control/issues/5) permanece aberta para validar o ciclo completo de governança; esta atualização não altera nem conclui DOE-SP.

Decisões aprovadas de [produto/UX](docs/PRODUCT_AND_UX.md), [site/comercial](docs/SITE_AND_MARKETING.md), [marca v1](docs/BRAND_MANUAL_V1.md) e [ativos](docs/BRAND_ASSETS.md) foram incorporadas ao repositório; [questões abertas](docs/OPEN_QUESTIONS.md) mantêm propostas separadas do que foi decidido. O [índice de decisões](DECISIONS.md) liga esses temas. A camada pública do site foi retomada pela D-035 / WEB-01, sem declarar recursos autenticados implementados.

[CONTEXT.md](CONTEXT.md) é o ponto de leitura direta do Gerente Geral GPT-6 ao abrir uma conversa; ele pode reler contexto e evidências sempre que necessário, sem chat de bootstrap. [Backend](contexts/BACKEND.md), [frontend](contexts/WEB.md) e [DOE-SP](contexts/DOE-SP.md) são índices de frente; [executor](contexts/EXECUTOR.md) e [revisor](contexts/REVIEWER.md) apontam para as Issues atuais sem duplicar seus handoffs. O [protocolo de atualização](docs/CONTEXT_MAINTENANCE.md) define responsáveis e marcos. `radar-fiscal-web` possui agora o draft PR #1 (`feat/web-01-site-publico`, head `29a6c06a1395944c97b185b5fbf3d643b9a3a40c`) com Home, Portfólio e Reforma Tributária; CI run `36228862164` SUCCESS (typecheck, testes e build). O PR não foi mergeado nem deployado. [Backend PR #72](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/72) foi mergeado com autorização em 26/09/2026 no commit `f25a596edce592e6e365e87ed4cbf16ba0922de8`, com dois arquivos de governança e CI #382 SUCCESS. Deploys automáticos desse commit: Backend `d0e39486-cdff-4ff1-9531-04a4f3b4dedd`, Worker `cfcb6909-ce88-4694-b493-daf7aa302bc7` e Scheduler `c34c8850-6c48-4d16-a0a4-14f817184d5d`, todos SUCCESS. Isso não é evidência de fechamento DOE-SP. No protocolo vigente, o Gerente Geral GPT-6 pode ler diretamente contextos e evidências quando necessário para analisar erros, handoffs e decisões, mas não realiza escritas nem ações que alterem estado; o GPT-5.6 delegado atualiza CONTEXT.md e este arquivo após o marco definido e traz commit/link. Os executores e revisores GPT-5.6 registram evidências nas Issues. A atualização não ocorre automaticamente entre conversas.

Documentos de decisões, arquitetura, papéis, segurança, handoff, revisão e modelos de Issue/PR criados neste repositório. Cinco Issues representam a frente atual, com etiquetas de prioridade e área. O [quadro TriBusca — Gestão do Projeto](https://github.com/users/fabiojuniort-cyber/projects/1) foi criado com importação das cinco Issues; o usuário informou a movimentação da Issue #1 para In Progress. O quadro oferece Todo, In Progress e Done; etapas específicas de revisão e validação produtiva são registradas em comentários da Issue. O conector GitHub atual não altera as colunas do Projects. O ciclo completo permanece em validação na Issue #5. Chats não se comunicam automaticamente por causa desses arquivos; o estado oficial é registrado no GitHub.
