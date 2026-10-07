# TriBusca — Estado oficial do projeto

Atualizado em 02/10/2026 (America/Sao_Paulo).

Este arquivo resume o estado executivo. Issues e PRs registram execução, evidências e decisões. Uma declaração de conclusão produtiva exige os respectivos gates observados na produção.

## Repositórios

- [radar-fiscal-backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend): backend, Worker, Scheduler e conectores.
- [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web): frontend/site; primeira implementação pública está no draft PR #1, ainda sem merge/deploy.
- [tribusca-control](https://github.com/fabiojuniort-cyber/tribusca-control): governança, decisões e tarefas.

## Prioridade atual: DOE São Paulo

**ABERTO — não declarar produtivo/concluído.**

Em 26/09/2026 a **D-017**, refinada pela **D-036**, passou a estabelecer prioridade operacional da página oficial: conteúdo oficial completo e fiel é coletado diretamente e PDF que apenas o reproduz **não é baixado**; PDF oficial só é obtido quando necessário para conteúdo ausente/incompleto; anexos próprios continuam necessários. URL, autenticidade e proveniência disponíveis devem ser preservadas. Implementação por fonte permanece incremental na [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6).

Na DOE-SP, a direção técnica foi reaberta: **o HTML oficial deve ser o conteúdo principal e o PDF certificado não deve bloquear a captura da legislação**. O caminho anterior de reconciliação/histórico do [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) foi suspenso para reavaliação. O PR #71 permanece OPEN e unmerged e chegou ao head `3c286c982d983ecc7bce8f9722a1f967898665d3` (CI #394 SUCCESS) antes do redirecionamento; esse CI não autoriza merge.

A preparação DOE-SP-35 foi concluída no head `4917cdc2265fa87b35d555b98698f42a75d6c223`: CI #443 SUCCESS e runner Railway 31/31 PASS, com preflight somente leitura, backup/restauração e ensaio destrutivo realizados fora da produção; 0 escritas produtivas. A revisão independente DOE-SP-36 aprovou esse SHA e a preparação. Em 28/09/2026, durante DOE-SP-37, o [PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73) foi incorporado por squash no backend como `e2c4f9a58fe43cb56ca36a1925eb80cf612423ae`. A [Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) permanece **OPEN** e o LOCK DOE-SP-37 (EXECUÇÃO-A) estava ativo na última leitura desta GOV-12; não havia handoff/UNLOCK final dessa execução no momento do registro. Esta GOV-12 não executou nem validou deploy, pausa da fonte, SQL, exclusão, recaptura ou fase destrutiva DOE-SP.

O último diagnóstico produtivo comunicado antes do PR #71 apontava bootstrap parado em 29/07/2025, com 399 dias pendentes. Esses números são históricos, não uma leitura produtiva nova. A janela de bootstrap aprovada é 01/01/2025 até a data de validação.

### Issues ativas

| Issue | Resultado esperado | Dependência |
| --- | --- | --- |
| [#1 — gate DOE-SP HTML-primary](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1) | Concluir execução/validação pós-merge e somente depois os gates destrutivos/recaptura previstos | DOE-SP-36 aprovou `4917cdc`; PR #73 mergeado em `e2c4f9a`; DOE-SP-37 EXECUÇÃO-A em andamento no último snapshot; Issue #1 segue OPEN |
| [#2 — bootstrap e replay](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2) | Cobertura aprovada com pendingRanges vazio e replay idempotente | #1 |
| [#3 — artefatos/publication_files](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3) | Evidência e política de persistência dos arquivos | #1 |
| [#4 — fechamento DOE-SP](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4) | Gates, seção 13 do backend e temporários tratados | #1, #2 e #3 |
| [#5 — teste da governança](https://github.com/fabiojuniort-cyber/tribusca-control/issues/5) | Fluxo Issue → PR → revisão → gate → estado observado | #1 e quadro |
| [#6 — inventário global de conteúdo oficial](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6) | Aplicar D-017/D-036 por fonte: página integral primeiro, sem download de PDF redundante; PDF/anexo material quando necessário | P1; política global aprovada, adequação individual pendente por conector |

As Issues descrevem trabalho ainda não executado. Nenhuma delas é prova de conclusão. O PR #68 também permanecia aberto na consulta de PRs; não incorporar automaticamente POCs, repairs históricos ou mudanças fora da frente DOE-SP.

## Taxonomia TriBusca

**TAX-01→TAX-09 CONCLUÍDA EM CÓDIGO E ATIVADA EM PRODUÇÃO.**

Em 30/09/2026, as três fases finais foram aprovadas por revisão independente e mergeadas sequencialmente no backend:
- TAX-07 / PR #91 → merge `04c234a22b6fc160393ef3b74ea225413893ce16`;
- TAX-08 / PR #93 → merge `a9a581a2969899dbf7a37be33b969a842f07152a`;
- TAX-09 / PR #95 → merge `25c2c42ed43d001dcfa1eb0edc9ce4fa35fffbe7`.

A `main` do backend permanece em `25c2c42ed43d001dcfa1eb0edc9ce4fa35fffbe7`. Backend, Worker e Scheduler estão em SUCCESS.

A ativação produtiva R3 foi concluída na [Issue #46](https://github.com/fabiojuniort-cyber/tribusca-control/issues/46):
- `schema_migrations`: **001→021**;
- migration 020: classificação global aplicada;
- migration 021: UNMAPPED/candidatos aplicada;
- runtime / worker / curator security verificados em produção;
- release `v1.0.0` ID `6e6ad5ff-fa6d-45dc-a3ea-ae4c5e4c2f3b` = **PUBLISHED**;
- `approved_at = published_at = 2026-09-30T04:20:04.829Z`;
- baseline R6: 20 dimensões / 628 conceitos / 55 NEEDS_EVIDENCE / 21 aliases / 23 bindings / relações 7/15/31;
- manifest `cdbad652dbafddef45193be9f5092ab17cb5097523085135e1f3b2ce00eb85ee`;
- derivation fingerprint `ac315c0ad591836c8c98c03b04769aa8442ebec5409fd1fc5961dffc04a2414b`;
- publicação da release reexecutada com resultado `IDEMPOTENT_ALREADY_PUBLISHED`;
- smoke TAX-07/TAX-08/TAX-09 executado somente dentro de transação com rollback: PASS;
- RLS TAX-09 com tenant inexistente: 0 perfis visíveis;
- imutabilidade da release publicada: PASS;
- contadores de runs/assertions/spans/reviews/UNMAPPED/candidates/links ficaram 0 antes e depois do smoke;
- nenhum backfill/classificação em massa foi executado nesta ativação.

A Issue #46 está **CLOSED / completed** e o LOCK TAX-ACT foi liberado. A frente Taxonomia não deve ser reaberta como implementação pendente. Qualquer classificação/backfill futuro pertence a operação própria.

DOE-SP pode retomar somente após adquirir novo LOCK R3 e revalidar seu próprio estado.

D-065 permanece obrigatória: Railway AI Agent é proibido.

## Desempenho do catálogo (PERF-01 / PERF-02)

**CONCLUÍDO E EM PRODUÇÃO.** Estado observado em 02/10/2026 ~02:30 (America/Sao_Paulo). Issue [#55](https://github.com/fabiojuniort-cyber/tribusca-control/issues/55) **CLOSED / completed**.

- Backend [PR #114](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/114) → merge `36e4cbdf55ea5bd709c2bb9a314184845cdea42e` (01/10, 22:50 UTC). O pre-deploy (`db:prepare`) aplicou a **migration `029_catalog_scale.sql`** em ~70 s.
  - Revisada como `028_catalog_scale`; renumerada sem alteração (sha256 `5dae80d6…5cae8`) porque o NCM-03 levou `028_publication_ncm_scans` à produção antes.
  - `schema_migrations` = **001→029**.
- Conteúdo da migration:
  - flags gravadas `is_hidden`/`is_confaz`;
  - `title_vector` e `search_vector` com a config `pt_unaccent`;
  - tabela `publication_source_feed`, mantida por triggers, para o filtro por fonte;
  - índices ordenados.
- API: cache de 1 h para os agregados; busca sem acento, por prefixo e em duas etapas (título por padrão, texto completo opcional); contagem limitada ("mais de 10.000").
- Web: [PR #25](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/25) → `b42afef`, e [PR #28](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/28) → `aeeec71`. O #28 corrigiu Publicações, que reusava os filtros do Acervo, e tornou visível a busca ativa.
- Preparação R3:
  - preflight read-only;
  - dois ensaios em restore PITR da produção (o segundo depois do NCM-03): migration 54–61 s;
  - validação `ops/catalog/029-validate.sql` com 0 diferenças;
  - `pg_dump`/`pg_restore` com 0 diferenças.
- Validação produtiva: `029-validate.sql` read-only com 0 diferenças em todas as fontes; planos usam os índices novos; 0 respostas 5xx. Smoke funcional confirmado pelo responsável.
- Latência observada em produção (logs, 01/10 23:05 UTC):

  | Endpoint | Tempo |
  | --- | --- |
  | `/public/v2/stats` | 0,3 ms |
  | `/public/v2/sources` | 0,2 ms |
  | `/api/v2/archive/facets` | 3 ms |
  | Acervo, página 1 | 8–10 ms |
  | busca "conv" | 63 ms |

- Infra: volume `postgres-volume` ampliado de 5 GB para **100 GB** pelo responsável (live resize, sem restart). PITR (`Postgres-PITR`) ativo; repositório pgBackRest em `/pgbackrest/cluster-<id>`.
- Limpeza Railway: Issue [#56](https://github.com/fabiojuniort-cyber/tribusca-control/issues/56) **CLOSED** — removidos 19 temporários `tmp-*` das frentes encerradas (TAX-06, TAX-ACT, smokes) e o volume `postgres-restored`. Mantidos os temporários DOE-SP (Issue #4) e `tmp-auth-01-bootstrap-2` (Issue #17).
- Pendentes (fora desta frente):
  - **F6**: `pg_stat_statements`, log de consultas lentas, dimensionamento de RAM;
  - **F7**: carga histórica do DOU.
  
  Plano: `radar-fiscal-backend/docs/catalog-scale-plan.md`.


### ACT-SCOPE-02 — Filtro de Coleta Configurável

**R2 / GOVERNANÇA EM PREPARAÇÃO — Issue #87. Nenhuma mudança produtiva aplicada neste marco.**

- ACT-SCOPE-02 substitui a Issue #85 / ACT-SCOPE-01 e o backend PR #164, que **não deve ser mergeado**; seus testes úteis serão portados para a nova implementação.
- Decisões novas a versionar nesta frente: D-067 a D-071.
- Arquitetura funcional: filtro central e versionado em dois níveis, aplicado a todos os caminhos de entrada; tipo desconhecido = KEEP + Novos tipos; CNPJ/processo/valor isolados não preservam ato.
- Reuso obrigatório: dou-scope-v4; SUPPRESS/RESTORE em `publication_scope_state` / `publication_scope_events`; planner/executor histórico; contrato normalizado/publication spool; `platform_user_roles`.
- DOE-SP permanece fora desta frente.
- Etapas: (0) governança; (1) levantamento read-only; (2) PLATFORM_ADMIN; (3) motor 2 níveis; (4) telas; (5) simulação completa; (6) ativação DOU + Desconsiderados + alertas; (7) SUPPRESS histórico aprovado.
- Etapa 1 concluída em read-only: 118.871 publicações; 2.374 grupos brutos fonte/seção/tipo; ~2,57 GiB em relações públicas; dou-scope-v4 reavaliou 113.975 publicações sem escrita. Evidência: `docs/workstreams/ACT-SCOPE-02-STAGE-1.md`.
- Gate atual: aprovação do responsável da Etapa 1. Depois: Etapa 2 — `PLATFORM_ADMIN`. O draft PR #88 permanece sem merge até revisão independente material.

## Demais frentes

- Motor, autenticação/RLS, infraestrutura e fontes federais: entregas reportadas anteriormente; esta atualização não fez revalidação produtiva completa.
- DOU/INLABS: operacional. Em 29/09/2026, um run preso em retry persistente (`INLABS_INVALID_DOWNLOAD`) foi destravado pelo backend `985a812` (PR #80), com cerca de 10,5 mil publicações persistidas; pacote inválido agora isolado sem receipt. Gate final ainda a confirmar.
- CONFAZ: **operacional e validado em produção via DOU (PRIMARY, D-006)** — 29/09/2026, Issue #29, backend `985a812`: 26 atos CONFAZ via DOU; Convênio ICMS 113/2026 conferido contra a página certificada do DOU. Portal `www.confaz.fazenda.gov.br` segue bloqueado na rede para o egress Railway (descarte TCP no segmento 189.9.128–129.x), agora com falha rápida classificada (`CONFAZ_HOST_UNREACHABLE`, ~10 s). Enriquecimento pelo portal via egress brasileiro é opcional futuro (R3), condicionado a probe real.
- Outros 26 DOEs: pendentes; **nenhum novo DOE começa antes do fechamento formal de SP**. Depois do fechamento, a D-055 permite paralelismo com taxonomia, Perfil Tributário e autenticação/comercial.
- O roadmap foi refinado pela D-055: após o fechamento formal do DOE-SP, demais DOEs, taxonomia, Perfil Tributário e autenticação/comercial podem avançar em paralelo. Sonar/Revela/Decodifica e integrações autenticadas continuam dependentes das respectivas bases/Issues. A camada pública segue autorizada em paralelo.

### WEB-01 / WEB-07 — site público

**BLOQUEADO EM REVISÃO — não declarar publicado nem aprovado.**

A [Issue #8](https://github.com/fabiojuniort-cyber/tribusca-control/issues/8) acompanha o draft [frontend PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1), que permanece **OPEN / DRAFT / unmerged**.

**WEB-06:** revisão independente do head `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d` = **REPROVADO/BLOQUEANTE**. Bloqueios comprovados:
- `#237032`, ratificado pela D-053 como exceção restrita ao Sonar, também era usado em `.password-rules .rule-ok`;
- não foi executada validação real em navegador para viewports, teclado/foco, focus trap/return, overflow e reduced-motion.

A ratificação conceitual D-053 permanece válida, porém a **Issue #10 continua OPEN** e o gate técnico não foi concluído.

**WEB-07:** execução concluída no head `74bb3efffc4b720aa157475ce6a9c73c206fa028`. Frontend CI #47 / run `36368975036` = **SUCCESS**, com 13/13 testes unitários e **40/40 testes Playwright/Chromium**. O artifact `10948592313` (`web07-browser-evidence-74bb3eff...`) possui digest `sha256:4365b95d68c69233aef493f99a22082917abe0e08d0f111220ba1a04279a33a6` e registra screenshots/relatório/evidências para quatro viewports. O bloqueio BRAND-SONAR-01 foi corrigido usando azul institucional escuro fora do Sonar; os quatro valores da D-053 permanecem isolados no componente. O retorno de foco dos modais também foi corrigido e passou na suíte browser.

Preview temporário atualizado para o mesmo head: https://web05-preview-production.up.railway.app · deployment `2d130a93-7651-47e2-b90c-478c1e3088ea` = SUCCESS.

**Ainda não há parecer independente favorável.** O próximo gate é nova revisão independente do head/evidências/preview.

Estado preservado:
- seis recursos públicos continuam `Em desenvolvimento`;
- integração WEB de `GET /public/v1/sources` para Cobertura concluída no draft WEB-11; CORS real do backend permanece pendente;
- Issue #10 está CLOSED/COMPLETED; D-053 permanece preservada;
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

### GOV-04 → GOV-20 — evolução da governança

**Estado atual em 28/09/2026 após GOV-20.**

- GOV-10 emitiu parecer independente **FAVORÁVEL** ao SHA `e39239301795a087f2c6fada67d7e3e04d6f1a32`; GOV-11 incorporou o PR #13 em `bae943208cb99f236748bd6118ce482e4538a5ba`.
- GOV-15 aprovou o PR #14/head `f39a265f4fc633dd78d201e6c02f2db2ed620004`.
- GOV-19 emitiu parecer **FAVORÁVEL** ao PR #15/head `d4f294e0daa4856df37337fa74ef964cc3e92e38` e concluiu que o PR #15 substitui integralmente o PR #14.
- GOV-20 incorporou o PR #15 por squash na `main` em `6f6a7169cfe5b8ddb6c235569d637c2d6f4435ba`; PR #14 foi fechado sem merge como `superseded`.
- **Governança Flexível v2 = VIGENTE.**

Referência canônica: [docs/CLAUDE_SESSION_PROTOCOL.md](docs/CLAUDE_SESSION_PROTOCOL.md).

## Governança

A Governança Flexível v2 governa as atividades futuras por R0–R3, Gate 0 proporcional, LOCK proporcional/lease, revisão incremental, continuidade de sessão, snapshots temporais e handoff proporcional.

O Gerente Geral é coordenador/read-only por padrão e possui autorização permanente para identificar e corrigir gargalos/loops de governança dentro da classificação de risco. Antes de delegar, deve pré-checar bloqueios previsíveis e evitar repetição de formalidades que já falharam pelo mesmo motivo.

Atualizações factuais e ajustes procedurais R0 não exigem nova GOV/chat/LOCK/revisão. Mudanças materiais de governança continuam R2/R3.

A classificação R0–R3 não reduz proteção de secrets, dados privados, auth, RLS, integridade tenant, autorização material nem salvaguardas destrutivas de R3.

## API-01 — API pública do site

**MERGEADA E VALIDADA EM PRODUÇÃO NO ESCOPO D-050; `GET /public/v1/sources` JÁ INTEGRADO NO DRAFT WEB-11.**

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

**Ainda abertos na #11:** confirmação/configuração das origens CORS reais e rate limit por IP. A integração WEB da Cobertura com `/public/v1/sources` foi implementada no PR frontend #1, ainda sem merge.

**Nova dependência GOV-03 / D-057:** publicação não fiscal retida apenas por CNPJ exato é privada da respectiva conta. A API D-050 atual consulta metadados globais e não possui filtro fiscal/tenant para essa nova categoria. **Antes de introduzir esses registros, o filtro/proteção precisa estar implementado e validado**; sem isso, eles não podem ser persistidos em tabelas globais consultadas por `GET /public/v1/publications` nem ficar de outra forma alcançáveis pela API pública. Restrição apenas visual não satisfaz o gate. A futura Issue técnica permanece aberta.

**Divergência D-058 × contrato atual:** a exibição pública aprovada contém título, data, órgão e link oficial; `GET /public/v1/publications` também retorna `id`, `actType`, `actNumber`, `uf` e `effectiveOn`. A API não será alterada por esta GOV-03 e a exibição desses campos adicionais requer decisão de produto posterior.


### WEB-11 — release candidate do site público

Head frontend `a7303d14fc725adf4d590fc1e2f475405fd38bc1` · CI #65 / run `36444458147` SUCCESS · 24/24 Vitest · 48/48 Playwright · artifact `10980146266`.

D-054 aplicada no draft enquanto Issue #9 está OPEN: cadastro/trial não são apresentados como funcionais; CTAs públicos viraram **Em breve** e recuperação pública está indisponível sem simulação de backend.

Cobertura consome somente `GET /public/v1/sources` D-050 e mantém `—` em loading/refetch/erro. Não houve ampliação de `/publications` nem exposição D-057.

Preview Railway `eff05426-969c-4481-8e70-9ed41583b454` = SUCCESS no mesmo SHA, com `VITE_API_BASE` apontando para o backend produtivo.

**Pendência real para dados live no browser:** backend sem `PUBLIC_API_ALLOWED_ORIGINS`. Origem de preview necessária: `https://web05-preview-production.up.railway.app`. Nenhuma variável backend foi alterada pela WEB-11.

Próximo gate: revisão independente do release candidate. PR permanece OPEN/DRAFT/unmerged.


### WEB-11 — release candidate público

PR frontend #1 permanece **OPEN / DRAFT / unmerged**.

- head: `a7303d14fc725adf4d590fc1e2f475405fd38bc1`;
- CI #65 / run `36444458147` = **SUCCESS**;
- 24/24 testes unitários;
- 48/48 testes Playwright/Chromium;
- artifact browser `10980146266`, digest `sha256:e163a43ca31b8f72e84837243a3c93a2504ec1fd1bb69ffec87b24e2333fa99e`;
- preview deployment `eff05426-969c-4481-8e70-9ed41583b454` = **SUCCESS** no mesmo SHA.

D-054 está aplicada: cadastro/trial e recuperação não são apresentados como funcionais enquanto #9 estiver aberta. Login real foi preservado.

Cobertura consome somente `GET /public/v1/sources`, com tradução D-050 e fallback seguro `—`. O preview está configurado com `VITE_API_BASE` do backend produtivo.

**Pendência real para dados ao vivo no navegador:** `PUBLIC_API_ALLOWED_ORIGINS` não está definida no backend produtivo. A origem do preview `https://web05-preview-production.up.railway.app` precisa ser autorizada em gate backend separado. Nenhuma alteração backend foi feita pela WEB-11.

**Gate atual:** revisão independente única do release candidate. Sem merge/publicação definitiva.

## Governança Railway

Desde 29/09/2026, D-065 proíbe o uso do **Railway AI Agent** em qualquer atividade do TriBusca. Railway permanece como infraestrutura aprovada e deve ser operada somente por meios não-AI permitidos. Nenhum gate ou evidência nova pode depender do Agent.
