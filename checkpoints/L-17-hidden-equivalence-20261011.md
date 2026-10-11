# L-17 R2 — PROTOCOLO FINAL | 11/10/2026 12:28 BRT
**Avanço da execução autorizada: 100%. Implantação técnica: SUCCESS. Avaliação funcional/primeira execução do cron: REVISAR. Este bloco é o estado corrente, prevalece sobre o histórico abaixo.**

## Causa e correções
- O caso real DO1E 09/10/2026 `RESOLUÇÃO CIT-SNC/MINC`, na origem DOU com `sourceActType=Resolução`, era considerado `TYPE_CONFLICT` antes de `EXCLUDE_ALWAYS`. Função/adapter compartilhado agora trata o metadado genérico compatível com o ato específico, preservando `TYPE_CONFLICT` para incompatibilidades reais. Testes runtime e purge histórico confirmam `DISCARD / EXCLUDE_ALWAYS` para CIT-SNC e `KEEP / TYPE_CONFLICT` com proveniência `Portaria`.
- Lock do preview/confirm em RLS corrigido por helper `SECURITY DEFINER` apenas para PLATFORM_ADMIN (migration 059). Tipos da resposta web corrigidos.
- Preview de botão agrega sem duplicar `OUT_OF_SCOPE`, decisões do motor por regra (inclusive condicionais **somente no manual**) e `is_hidden`. Contagens por regra e proteções de empresa/outra origem mantidas.
- Scheduler 03:30 America/Sao_Paulo faz EXCLUDE_ALWAYS + ocultas em pequenos lotes; nunca aplica modos condicionais automaticamente. Mesma engine/filtro. Flag `COLLECTION_ITEMS_RETENTION_ENABLED=true` preservada.
- Trigger `058_l17_archive_purge_discards.sql` registra `ARCHIVE_PURGE` na mesma transação da remoção em `collection_filter_discards` para purges Classificar, Editar modo, botão e cron; 3 meses de retenção. Sem backfill das ~31 mil publicações anteriormente apagadas. Nova aba Desconsiderados relatório, paginação, filtros, ordenação, link oficial e exportação Excel integral pelo filtro; apenas texto da prévia alterado na área anterior. Migration 029 e `is_hidden` não alteradas.

## CI e SHAs congelados
- Backend PR [#209](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/209), HEAD `cf75bdcabbdd136bead5b1d3b5eafe22edd2f03f`. [CI integral 38149773057](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149773057) SUCCESS incluindo ONB PG18/DOU PG18, [L11 PG18 38149773132](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149773132) SUCCESS, [L17 PG18 38149773027](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149773027) SUCCESS. MERGED 11/10 12:23:43 BRT → **`b39279330a49b44989ffece09ee5c186631e26e6`**.
- Frontend PR [#98](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/98), HEAD `f1f6501cf97085ee78229eabe7ecd0063b9a6f4b`, [Frontend CI 38148760486](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38148760486) SUCCESS, incluindo Playwright e XLSX. MERGED 11/10 12:25:50 BRT → **`ec1d820495c8531d37cd860fe7d71e3433cf7f9f`**.

## Railway produção — readback de SUCCESS nos quatro serviços
| Serviço | Deployment ID | SHA | Status |
|---|---|---|---|
| Backend | `27158ad2-950d-4c4f-99b1-4faf58210937` | `b39279330a49b44989ffece09ee5c186631e26e6` | SUCCESS 1/1 |
| Worker | `0cb06c89-81f1-4cc9-a651-09006a24b495` | `b39279330a49b44989ffece09ee5c186631e26e6` | SUCCESS 2/2 |
| Scheduler | `df18b355-082d-46ff-98c5-68cbe191dc75` | `b39279330a49b44989ffece09ee5c186631e26e6` | SUCCESS 1/1 |
| Web | `f44c4296-89a6-41f8-b82d-d9caa34cb9c7` | `ec1d820495c8531d37cd860fe7d71e3433cf7f9f` | SUCCESS 1/1 |

Backend log `Migration applied` comprovado para **056, 057, 058, 059 e 060**, seguido de `Database migrations are up to date.`. Migrations aplicadas entre :20 e :40 BRT. Ambiente Railway backend e web: `totalFailures=0`, `servicesWithIssues=0`, `pendingWork=0`. Scheduler log de boot com `mode=DRY_RUN`, `enabled=true` e `Collection scheduler started`. Não houve purge manual em produção pelo executor.

## Screenshot/evidências
- Print real de execução **Playwright com APIs sintéticas**, desktop 1440x900 (PNG 1440x1006): `/mnt/data/L17_Desconsiderados_Playwright.png`, obtido do artefato GitHub Actions [#11706536052](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38148760486/artifacts/11706536052), `playwright-artifacts/l17-review/desktop-1440x900/desconsiderados.png`. Não representa o banco real da produção. Também há imagens mobile 390x844/360x800 e desktop 1920x1080 no mesmo artefato.

## Quadro e limitações
- L-15 → **CONCLUÍDA**, 0 OUT_OF_SCOPE em 11/10/2026 conforme dado informado por Fábio.
- L-17 → **REVISAR**, aguardando validação humana do relatório/previews e primeira execução agendada às 03:30 America/Sao_Paulo; não equivale a ter apagado as 12.339 ocultas.
- Frente LIMPEZA → **14/15**.
- Item de contagem de remanescentes por regra antes do merge **dispensado** por CLAUDE-COORD; não alegar consulta produtiva não efetuada. Nenhuma exclusão manual de publicações durante implementação/deploy. A próxima execução automática às 03:30 deverá ser auditada nos logs e ledger, incluindo total apagado e impacto operacional.

---

## L-17 R2 — checkpoint 11/10/2026 ~12:26 BRT — 99% / backend implantado, web em rollout
**Estado corrente, prevalece sobre os registros anteriores até readback final.**

- Gate congelado backend PR #209 HEAD `cf75bdcabbdd136bead5b1d3b5eafe22edd2f03f`: CI integral [38149773057](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149773057) SUCCESS (verify/DOU PG18/ONB PG18), L11 PG18 [38149773132](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149773132) SUCCESS e L17 PG18 [38149773027](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149773027) SUCCESS.
- Backend PR #209 MERGED em 11/10/2026 12:23:43 BRT → `b39279330a49b44989ffece09ee5c186631e26e6`; serviços Railway backend deployment `27158ad2-950d-4c4f-99b1-4faf58210937`, worker `0cb06c89-81f1-4cc9-a651-09006a24b495`, scheduler `df18b355-082d-46ff-98c5-68cbe191dc75` — todos STATUS **SUCCESS**, log backend `PostgreSQL connection verified` e `Server listening`, worker `Collection worker started`, scheduler `Collection scheduler started`.
- **Migrations 056–060 em produção: log backend confirmado `Migration applied: 056_l17_hidden_cleanup.sql`, `057_l17_canonical_type_conflict.sql`, `058_l17_archive_purge_discards.sql`, `059_l17_admin_lock.sql`, `060_l17_worker_always.sql`; `Database migrations are up to date.`** Durante a janela :20–:40 BRT. Não foi executado DELETE manual pelo executor.
- Frontend CI [38148760486](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38148760486) SUCCESS no HEAD `f1f6501cf97085ee78229eabe7ecd0063b9a6f4b`, Playwright real em quatro resoluções. PR #98 MERGED às 12:25:50 BRT SHA `ec1d820495c8531d37cd860fe7d71e3433cf7f9f`. Railway web05-preview configurado com fonte pinada nesse exato SHA; aguardando deploy SUCCESS.
- Artefato Playwright (API sintética, não dados de produção): [GitHub artifact #11706536052](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38148760486/artifacts/11706536052), path `playwright-artifacts/l17-review/desktop-1440x900/desconsiderados.png`. Extraído para `/mnt/data/L17_Desconsiderados_Playwright.png` e conferido visualmente na conversa.
- Quadro: **L-15 CONCLUÍDA**, com 0 OUT_OF_SCOPE em 11/10 segundo Fábio; **L-17 REVISAR**, aguarda validação funcional e 1ª execução às 03:30; **LIMPEZA 14/15**.
- Não houve purge manual, clique do botão, nem execução ad hoc do cron no banco de produção. A habilitação pré-existente do scheduler deve ser confirmada nos logs mais recentes.

---

## L-17 R2 — checkpoint 11/10/2026 12:23 BRT — 96% / TODOS OS GATES VERDES, autorização de merge
**Esta seção prevalece até o readback dos deployments.**

- HEAD backend PR #209: `cf75bdcabbdd136bead5b1d3b5eafe22edd2f03f`. CI integral [38149773057](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149773057) SUCCESS: verify, DOU-CLEAN-02 PG18, ONB-01 PG18. L11 PG18 [38149773132](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149773132) SUCCESS. L15/L10/L17 PG18 [38149773027](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149773027) SUCCESS. Casos do runtime CIT-SNC, purge histórico com generic sourceActType, worker EXCLUDE_ALWAYS, ACL/audit e origem protegida cobertos por testes do HEAD.
- HEAD web PR #98: `f1f6501cf97085ee78229eabe7ecd0063b9a6f4b`, [Frontend CI 38148760486](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38148760486) SUCCESS com Playwright. Evidência [artifact #11706536052](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38148760486/artifacts/11706536052), screenshot `playwright-artifacts/l17-review/desktop-1440x900/desconsiderados.png` recuperado e conferido via ZIP original.
- Mudança de escopo final confirmada: grupos OUT_OF_SCOPE, RULE (engine inclusive modos condicionais no botão) e HIDDEN; cron somente EXCLUDE_ALWAYS/HIDDEN; Desconsiderados e exportação completa por filtro; migration 029/is_hidden imutáveis. Sem contagem SQL produtiva por regra conforme dispensa do COORD.
- Em sequência: merge/deploy **somente na janela local :20–:40**; readback SHAs/migrations 056–060 e quatro SUCCESS obrigatórios; nenhuma exclusão manual. Após conclusão, L-17 permanece REVISAR, L-15 CONCLUÍDA conforme Fábio, LIMPEZA 14/15.

---

## L-17 R2 — checkpoint 11/10/2026 12:00 BRT — 94% / PG18 + WEB CI VERDES
**Esta seção tem precedência até o fechamento de produção.**

- Backend [PR #209](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/209) READY (sem merge), HEAD `24e9ee9ab1afd79a0bbec52179fdbd75a40b17aa`. PG18 isolado [run 38149273828](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149273828) **SUCCESS, 5 PASS / 0 FAIL**: L15 proteção e auditoria por sublote, L10 least privilege, L17 hidden worker, DO1E CIT-SNC runtime/histórico, L17 worker EXCLUDE_ALWAYS via mesmo motor + audit `L17_RULE_PURGE` + `ARCHIVE_PURGE`. Migrations 056–060 migradas SOMENTE no PG18 isolado; logs PG18 contêm `Migration applied: 059_l17_admin_lock.sql`, `Migration applied: 060_l17_worker_always.sql`. L11 PG18 run [38149273839](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149273839) **SUCCESS**. CI backend full [38149273796](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38149273796) ainda em andamento.
- Frontend [PR #98](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/98) READY (sem merge), HEAD `f1f6501cf97085ee78229eabe7ecd0063b9a6f4b`. [Frontend CI 38148760486](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38148760486) **SUCCESS integral**, incluindo Playwright em 1440×900, 1920×1080, 390×844 e 360×800. Artefato [11706536052](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38148760486/artifacts/11706536052) com screenshots reais dos browsers via APIs **sintéticas, sem escrita em produção**: `playwright-artifacts/l17-review/desktop-1440x900/desconsiderados.png`, `.../mobile-390x844/desconsiderados.png`. PNG extraído/conferido no chat.
- Última correção backend: remoção de duplicidades entre HIDDEN e RULE, com prioridade `OUT_OF_SCOPE > RULE > HIDDEN`, teste PG18 cobrindo contagem por regra. Os cinco testes passaram.
- Nenhum merge, migration, deploy ou purge L17 em produção até este momento. Qualquer rollout só na próxima janela :20–:40 BRT com **CI backend full SUCCESS**, SHAs constantes, 4 serviços Railway SUCCESS + log migration 056–060.
- Quadro: **L-15 CONCLUÍDA** (0 OUT_OF_SCOPE, informação fornecida por Fábio em 11/10); **L-17 REVISAR**; **LIMPEZA 14/15**. Nenhuma consulta SQL ad hoc de contagem produtiva: item 6 dispensado pelo coordenador.

---

## L-17 R2 — checkpoint 11/10/2026 11:54 BRT — 88% / validação integral
**Esta seção prevalece sobre as anteriores até a atualização final.**

- Backend [PR #209](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/209) agora READY, HEAD `538711cc8801495a4aec4830b734ffb088c4056e`. Correção do lock RLS por SECURITY DEFINER admin-only migration 059; migration 060 implementa **cron somente EXCLUDE_ALWAYS** com o mesmo `evaluateCollectionFilter` do runtime, nova validação após locks e worker-only purge com batch 20 + auditoria/ledger próprios. Não usa modos condicionais no cron. Sem tocar is_hidden ou migration 029.
- PG18 dedicado no SHA anterior [#38148831359](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38148831359): **SUCCESS 5/5**, incluindo runtime DO1E CIT-SNC específico, worker auto EXCLUDE_ALWAYS sintético, audit L17_RULE_PURGE, três registros ARCHIVE_PURGE de purge manual agrupado, e preservação company/cross-source. O HEAD atual contém só a correção da auditoria + mesmo método; **revalidação CI full e PG18 em andamento**. CI principal do HEAD atual [#38148926987](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38148926987) em andamento.
- Frontend [PR #98](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/98) READY, HEAD `f1f6501cf97085ee78229eabe7ecd0063b9a6f4b`. TypeScript `ruleDiscards`/`byRule` confirmado em interfaces. Teste Playwright e2e Desconsiderados adaptado à grade e escreve **screenshot de CI sintético**, em `playwright-artifacts/l17-review/<viewport>/desconsiderados.png`. E2E de evidências L11 adaptado. CI completo [#38148760486](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38148760486) em andamento.
- **Nenhuma exclusão em produção / nenhum merge/deploy R2**. Todos os dados apagados nos testes foram sintéticos no PG18 isolado.
- Prazo :20–:40 para todas migrations 056–060. Próxima janela operacional segura possível **12:20–12:40 BRT**, SOMENTE após todos os gates verdes, confirmação dos SHAs e PR mergeable. Não antecipar.
- Quadro: **L-15 CONCLUÍDA** (0 OUT_OF_SCOPE em 11/10 informado pelo Fábio); **L-17 REVISAR**; **LIMPEZA 14/15**. Contagens produtivas por regra dispensadas; não inventar.
- Print de Desconsiderados PENDENTE de artefato real do Playwright e leitura do CI. Não alegar entregue antecipadamente.

---

## Estado atual L-17 R2 — 11/10/2026
AVANÇO 65%. BLOCK DE PRODUÇÃO. Esta seção tem precedência sobre estados antigos abaixo.
Backend PR #209 DRAFT; HEAD 9cc4ad94a4d645995a4403b643059af9e92ab041. CI 38146268180 FAILED; PG18 38146268023 FAILED; L11 PG18 38146268025 SUCCESS.
Web PR #98 DRAFT; HEAD c1f1fb35833750ee2f3f0a8bcbabb3b025a20d99. CI 38146300157 FAILED TypeScript: ruleDiscards/byRule ausentes em CollectionFilterDirectConfirmResult.
Causa concreta: migration 051 prefiltra publications.act_type canônico, mas typeConflict considera sourceActType='Resolução' incompatível com ato específico 'RESOLUÇÃO CIT-SNC/MINC'. Runtime/engine mantém KEEP por falso TYPE_CONFLICT. Helper de prefixo normalizado e migration 057 no PR, regressão sintética DO1E passou em PG18. Conflitos entre classes realmente distintas continuam protegidos.
Migração 058 e trigger BEFORE DELETE para inserir collection_filter_discards (origem ARCHIVE, razão ARCHIVE_PURGE, metadados legais, URL, política, retenção 3 meses) na mesma transação implementados; novo PG18 ainda não passou ao reavaliar confirmação.
Prévia global usa o motor atual para OUT_OF_SCOPE, todas regras DISCARD incluindo condicionais e is_hidden; conta grupos, proteções e por-regra, dedup. Mas confirmação SQL falha HTTP 403 porque SELECT FOR UPDATE cruza RLS radar_app; migração 059 com lock SECURITY DEFINER foi preparada como blob, não integrada na branch. FALTA corrigir e testar adversarialmente.
Cron 03:30 na branch somente elimina hidden. FALTA seleção worker-only EXCLUDE_ALWAYS via motor compartilhado, SEM modos condicionais, proteções e audit. O teste worker anterior encontrou 3 sintéticos elegíveis quando esperava 1; corrigir isolamento/teste, não eliminar proteções.
Desconsiderados tab report com 12 colunas, filtros, ordem, total/paginação, ajuda e .xlsx total filtrado está implementada no PR web mas ainda sem CI green ou captura de screenshot real.
Produção: sem consulta SQL direta de remanescentes por regra — NÃO HÁ número verificado. 12.339 ocultas e 0 OUT_OF_SCOPE vieram de Fábio/COORD. Print da nova aba não está disponível. Não inventar.
Nenhuma exclusão em produção, nenhum merge/deploy desta versão. Antiga automação 11:20 DESABILITADA. Manter PRs DRAFT.
Quadro: L-15 CONCLUÍDA (0 OUT_OF_SCOPE reportado em 11/10); L-17 REVISAR / BLOCK; LIMPEZA 14/15.
---


## 11/10/2026 — Escopo consolidado substitui plano anterior (L-17 R2)
- A versão FINAL recebida de CLAUDE-COORD acrescenta três grupos na prévia e no botão: OUT_OF_SCOPE, TODOS os remanescentes cujo motor vigente retornaria DISCARD (inclusive modos condicionais), e LEGACY_HIDDEN. Por regra, contagem desagregada; decisão exclusivamente `evaluateCollectionFilter` usando política aprovada, sem duplicar a classificação. O cron diário inclui APENAS EXCLUDE_ALWAYS + LEGACY_HIDDEN, nunca modos condicionais. Categorias mutuamente exclusivas: OUT_OF_SCOPE precede DISCARD_BY_RULE, que precede LEGACY_HIDDEN; proteções empresa/outra fonte valem em todas. `is_hidden` e migration 029 imutáveis.
- Todo purge físico de qualquer botão e scheduler deve gravar em `collection_filter_discards` **ANTES** do DELETE, na MESMA transação, com origem `ARCHIVE`, referência, título, número, data, URL, policy revision, mode, reason_code, termo decisivo quando houver, e TTL de 3 meses. Não retroagir sobre ~31 mil já apagadas. Isto exige rever estrutura existente (campo `collection_run_id NOT NULL` hoje impede descarte tardio sem run).
- Nova aba Desconsiderados como relatório tabular com 12 colunas, filtros e ordenação server-side, contagem/paginação, exportação XLSX de TODOS os registros filtrados; manter Ajuda e não alterar outras abas. Screenshot deve ser REAL, não protótipo ou simulação.
- **Achado técnico verificável:** migration 051 `collection_filter_direct_candidates` já pré-filtra por `public.collection_filter_l11_normalize(p.act_type)`, NÃO por `origin.metadata.dou.sourceActType`. Entretanto `type_conflict` considera qualquer diferença entre metadado de origem e tipo canônico; `evaluateCollectionFilter` devolve KEEP / TYPE_CONFLICT antes de EXCLUDE_ALWAYS. Runtime também aplicava tal guarda. Assim, a causa concreta para o exemplo "RESOLUÇÃO CIT-SNC/MINC" / "Resolução" é a incompatibilidade artificial entre tipo genérico de origem e tipo específico da publicação, NÃO um join por sourceActType no pré-filtro. Reter proteção para divergências verdadeiras.
- O PR backend #209 recebeu alteração inicial em commit `067e4626613c2335a27948c48dc3c3bc0d60d3ff` com helper compartilhado `collectionFilterTypeConflict`: labels de origem que são prefixos normalizados do tipo específico não são conflitos; "Portaria" x "Resolução" permanece KEEP/TYPE_CONFLICT. Migration 057 alinha SQL 051 e teste unitário DO1E específico. PG18 isolado SUCCESS no novo SHA; CI global #38144602622 tem falha esperada `Require full regression before merge` porque PR permanece DRAFT; NÃO é autorização de merge.
- **PRs #209 backend e #98 frontend foram convertidos para DRAFT**, pois suas implementações anteriores ignoram grupo DISCARD_BY_RULE, escrita transacional no arquivo e relatório XLSX. Ambos permanecem não autorizados para merge/deploy. A automação antiga "L-17 Deploy Final" para 11:20 foi **desativada**, para impedir deploy de código incompleto.
- Acesso SQL de produção para contagem de remanescentes por regra NÃO foi confirmado: o conector Railway disponível fornece serviços, deployments, logs e variáveis, mas não executa SELECT ad hoc. Não inventar números. 12.339 is_hidden e 0 OUT_OF_SCOPE foram valores informados pelo coordenador; não são auditoria SQL independente.
- Quadro preservado: L-15 CONCLUÍDA (0 OUT_OF_SCOPE informado por Fábio 11/10); L-17 REVISAR/BLOCK até novo CI PG18, código completo e screenshot; LIMPEZA 14/15. Nenhuma exclusão em produção foi executada no R2.

---

# L-17 — Equalização de publicações ocultas (checkpoint 11/10/2026)

## Quadro
- **L-15: CONCLUÍDA** — 0 publicações OUT_OF_SCOPE restantes em 11/10/2026, **contagem informada por Fábio**, sem consulta SQL independente pelo executor.
- **L-17: REVISAR** — implementação/CI sob fechamento, dependente de implantação validada e revisão funcional.
- **Frente LIMPEZA: 14/15** por decisão de CLAUDE-COORD/Fábio. O 15º item é L-17.
- **Nenhuma exclusão manual no ambiente produtivo pelo executor L-17.**

## Escopo autorizado
- Marcador atual do Acervo permanece `WHERE NOT is_hidden`. Coluna gerada e migration 029 **preservadas**.
- Fábio informou 12.339 publicações ocultas: 12.312 avisos de licitação, 26 comissões de análise de projetos, 1 portaria do coordenador geral.
- Prévia L-15 somará sem duplicar: `outOfScope`, `hiddenLegacy` e `blockedCompany+blockedOtherSource`; sem alterar botão/layout, somente texto da prévia. Publicação simultaneamente fora de escopo e oculta pertence à primeira categoria.
- Proteções de vínculos com clientes e outras origens oficiais preservadas. Ocultas não-DOU aparecem como protegidas, não são excluídas pelo fluxo DOU. Portanto, eventual saldo oculto protegido **não pode ser apagado só para igualar um marcador**.
- Scheduler 03:30 America/Sao_Paulo adiciona limpeza de ocultas apenas com retenção habilitada, limite de 20 publicações por lote, até 10 lotes/15 segundos, ledger diário separado e audit `L17_HIDDEN_PURGE`, executado por função SECURITY DEFINER com EXECUTE somente `radar_worker`. O generic purge 051 **não recebe** GRANT ao worker.
- Migration nova 056 `l17_hidden_cleanup.sql`, DDL e índice parcial; não deleta dados ao aplicar.

## GitHub e gates
- Backend [PR #209](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/209), HEAD `678f9dfeae0b38c4b1478b0c4e6211d9a8e16e8e`.
- Web [PR #98](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/98), HEAD `ae859f17a772e2a91c7565721f5f9c1fe480ba84`.
- PG18 dedicado [run 38143739185](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38143739185): **SUCCESS**, 3 testes/0 falhas, migration 056 aplicada em **PG18 isolado**, L15+L10+L17 worker-only com execução sintética, proteção cross-source e auditoria.
- Frontend CI [run 38143494432](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38143494432): **SUCCESS** incluindo Playwright.
- Backend CI [run 38143739207](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38143739207): job `verify` SUCCESS; jobs adicionais ONB-01 e DOU-CLEAN-02 ainda rodando na última observação (~10:39 BRT).
- **Bloqueio de implantação:** não mergear até todos os jobs verdes; por conter migration 056, agendar merge/deploy somente com janela Railway :20–:40, garantindo que aplicação de migration ocorra nessa janela. Não declarar production SUCCESS antecipadamente.

## Validação pós-deploy (pendente)
1. SHAs de merge backend e web e quatro deployment IDs Railway SUCCESS.
2. Log backend `Migration applied: 056_l17_hidden_cleanup.sql`.
3. Scheduler no mesmo SHA, variável `COLLECTION_ITEMS_RETENTION_ENABLED=true` preservada e log de boot saudável.
4. Prévia não destrutiva mostrar X + Y / Z; Fábio decide se executará lotes manuais.
5. Primeiro cron 03:30 validar `deletedPublications`, `batches`, ledger e ausência de impacto na coleta.
