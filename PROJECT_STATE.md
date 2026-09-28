# TriBusca — Estado oficial do projeto

Atualizado em 28/09/2026 (America/Sao_Paulo).

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

**WEB-07:** execução concluída no head `74bb3efffc4b720aa157475ce6a9c73c206fa028`. Frontend CI #47 / run `36368975036` = **SUCCESS**, com 13/13 testes unitários e **40/40 testes Playwright/Chromium**. O artifact `10948592313` (`web07-browser-evidence-74bb3eff...`) possui digest `sha256:4365b95d68c69233aef493f99a22082917abe0e08d0f111220ba1a04279a33a6` e registra screenshots/relatório/evidências para quatro viewports. O bloqueio BRAND-SONAR-01 foi corrigido usando azul institucional escuro fora do Sonar; os quatro valores da D-053 permanecem isolados no componente. O retorno de foco dos modais também foi corrigido e passou na suíte browser.

Preview temporário atualizado para o mesmo head: https://web05-preview-production.up.railway.app · deployment `2d130a93-7651-47e2-b90c-478c1e3088ea` = SUCCESS.

**Ainda não há parecer independente favorável.** O próximo gate é nova revisão independente do head/evidências/preview.

Estado preservado:
- seis recursos públicos continuam `Em desenvolvimento`;
- integração WEB da API pública ainda não está concluída;
- Issue #10 continua OPEN até parecer independente;
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

### GOV-16 — Governança Flexível v2

**PROPOSTA DOCUMENTAL — ainda não vigente. Estado observado em 28/09/2026 02:10 BRT.**

A GOV-15 foi FAVORÁVEL ao PR #14/head `f39a265f4fc633dd78d201e6c02f2db2ed620004`, mas o PR #14 continuava OPEN/DRAFT/unmerged no início da GOV-16. O usuário autorizou explicitamente seguir com a GOV-16 mesmo assim; a exceção cobre somente essa pré-condição e não autoriza merges/deploys/operação DOE-SP.

A v2 propõe classificação R0–R3:
- R0: documental/factual, praticamente sem burocracia;
- R1: baixo risco, continuidade na mesma sessão;
- R2: material, Issue/branch/PR/testes e revisão independente para mudança material;
- R3: crítico/produtivo, controles fortes completos.

A proposta substitui, após merge autorizado, as regras gerais de LOCK universal, novo chat por etapa, invalidação total por qualquer commit e fail-fast indiscriminado. Mantém integralmente proteção de secrets/dados privados, RLS/auth/tenant, autorização material, salvaguardas destrutivas e revisão independente real de R2/R3.

Referência: [docs/CLAUDE_SESSION_PROTOCOL.md](docs/CLAUDE_SESSION_PROTOCOL.md).

## Governança

A Governança Flexível v2 somente passa a valer após parecer independente favorável e merge autorizado do PR GOV-16. Até esse evento, o protocolo anterior em `main` continua vigente para esta própria atividade e sua revisão.

O Gerente Geral permanece coordenador/read-only por padrão. Após a v2, R0/R1 podem ser encaminhados sem criar nova atividade especializada; novo ID fica reservado a novo escopo material, decisão ou operação independente. Atualizações factuais usam snapshots temporais quando apropriado.

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
