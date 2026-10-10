# Checkpoint LOTE-2 — 2026-10-10
DE: CLAUDE-COORD | EXEC: GPT-EXEC-2
Frente LIMPEZA: 7/14 (50%) — por decisão do COORD
L-04: CONCLUÍDA; L-13: CONCLUÍDA; L-15: PRONTA (só proposta).
Quadro commit: `45010e84aaca070e7edd887932198c2d108a809a`
Backend base main: `8a4d28bbf95ecdb182438d08ff1c6e475d78af96`
Branch: `feat/lote2-doesp-tests-retention-20261010`; um PR DRAFT, sem merge/deploy.

## Protocolo e escopo
- Implementar somente L-05, L-07 se preflight fonte inativa, L-08, L-10 conforme propostas por extenso no checkpoint LOTE-1.
- L-09 e L-15: exclusivamente proposta até cinco linhas, sem código nem SQL produtivo.
- Sem subagentes executáveis neste chat; separação por commits/tarefas e leituras paralelas.
- Nenhum acesso destrutivo a Railway/produção. L-07 BLOQUEAR se inatividade não for comprovada no banco, sem inferir pelos logs.

## Etapas
- [x] Quadro atualizado conforme determinação do COORD, commit `45010e84aaca070e7edd887932198c2d108a809a`.
- [x] Branch do backend criada.
- [ ] Confirmar preflight DOE-SP legado inativo por evidência direta.
- [ ] L-05 código + testes.
- [ ] L-07 código + testes (condicional ao preflight).
- [ ] L-08 suíte de testes (sem alterar escopo dos próprios testes).
- [ ] L-10 rotina de retenção dry-run + testes.
- [ ] CI, PR draft e revisão de escopo; sem merge/deploy.

## Checkpoint 1 — preflight e L-08
- L-08: inclusão confirmada dos três arquivos previstos nos scripts npm `test` e `test:integration`; commit backend `c7fe52f4c904b7b552023c10c8649392470466eb`. Aguardando CI para provar execução.
- L-07: **BLOQUEADA pelo preflight**; o código do seeder cria DOE-SP legado INACTIVE por padrão, e logs do scheduler consultados não exibem execuções, mas nenhum desses indícios prova `sources.is_active=false` hoje em produção. Sem consulta SQL somente leitura ao registro real, é proibido remover do registry / script / arquivos. Conector ainda inalterado.
- L-05: verificado fallback atual chama `downloadAuthenticatedPdf` se HTML vazio; contém testes antigos que exigem fallback e que deverão ser atualizados para falha explícita sem PDF.
- L-10: `collection_items` contém created_at e ligação aos runs; rotina nova será dry-run por padrão, em lotes, preservando runs, attempts e checkpoints.

## Checkpoint 2 — execução e propostas independentes
- Backend draft PR [#203](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/203), branch `feat/lote2-doesp-tests-retention-20261010`, sem merge ou deploy.
- L-05 conector HTML-only, erro explícito para HTML vazio; commits `a0a607598db2cbbe40004f9362ae3fc063ca1523`, `6c7b5dae58533a9e5bde9f96bf46c8327e373c9c` e `a50c4ef4863342617bdbee0e79b247390c9bf537`. CI ainda exigido.
- L-08 scripts `test` e `test:integration` alterados para rodar os três testes órfãos; commit `c7fe52f4c904b7b552023c10c8649392470466eb`.
- L-10 retenção dry-run, query em lotes, CLI e integração PG18 (29/30/31 dias, idempotência e runs/attempts); commits `78b2ee7e2e9daa8a28d15d1b34fe9b6b65b58133`, `c7c21b29845e707dd0692fb569d7d861460d8446`, `0780acae4f3db6f1b3f3da8131238de1b014c2f2`, `6a57319145968eca42fff0b2a5bd737b18fafbc1` e correção TS `8037297bc1c8017af2ea40c3f42bc4b4b2f40948`.
- Workflow CI PostgreSQL18 isolado para L-05/L-08/L-10 no PR draft, commit `6a364389d0bc102419dbf5d97d69098a7e403728`.
- L-07 permanece BLOQUEADA pelo preflight: Railway scheduler não mostrou `doe-sp-legado` entre 01/10 e 10/10, e seed usa inactive por default, mas `sources.is_active` e runs manuais pendentes não são verificáveis sem consulta SQL real. NENHUMA remoção do conector iniciada. O bloqueio será preservado até evidência.

### L-15 — proposta SUBSTITUTIVA aprovada pelo Fábio (SEM código)
1. Antes de executar, Fábio fará backup **manual** do PostgreSQL no Railway, pela aba **Backups**, e confirmará sua conclusão.
2. Executar dry-run somente leitura para contagem real de publicações DOU `OUT_OF_SCOPE`, IDs, dependências e bloqueios; não tratar ~23 mil como total confirmado.
3. Após o backup, reaproveitar a rotina de purge da L-11 para excluir em lotes, preservando proteções existentes para vínculo a empresa e outras fontes.
4. Exigir novo **OK explícito do Fábio** sobre contagem e operação antes da primeira exclusão; registrar IDs, totais e auditoria.
5. Esta proposta **não exige restore isolado nem revisão independente adicional**, por decisão expressa do Fábio. Não há autorização de execução nesta tarefa.
### L-09 — proposta, até cinco linhas, SEM código
1. Inventariar 63 arquivos em `ops/`, 83 scripts npm e 44 arquivos em `docs/` na main atual, com consumidores CI, scripts chamados e dependências de rollback.
2. Candidatos para ARQUIVAR (se não usados): `ops/act-scope-02/` concluído, ensaios `ops/doe-sp/rehearsal`, pilotos `ops/doe-sp-legacy`, benchmarks `ops/perf/`, `benchmark:doe-sp-pdf` e relatórios históricos de fases.
3. MANTER enquanto houver gate aberto: `ops/dou-clean-02/runner` de backup/restore e smoke, scripts DOE-SP rebuild vinculados aos PRs #76/#128, ferramentas de migração/checkpoint e manifesto da taxonomia.
4. Registrar classificação manter/arquivar/indefinido por caminho e script com última referência na main, owner funcional, PR/Issue dependente e plano reversível de arquivamento.
5. Submeter inventário para aprovação do Fábio/COORD antes de mover/deletar arquivos; nenhum arquivo arquivado nesta tarefa.

## Checkpoint 3 — CI executado e diagnóstico L-08
- PR backend [#203](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/203) DRAFT. Runner isolado PostgreSQL18 run `38089080870`: SUCCESS no HEAD `8037297bc1c8017af2ea40c3f42bc4b4b2f40948` — build, unit DOE-SP L-05, PG18, integração L-05/L-08/L-10 e CLI dry-run.
- CI rápido run `38089080815`: Typecheck PASS, build PASS; testes unitários 619 PASS / 2 FAIL, ambos do arquivo TAX13 órfão L-08 incluído no script, e gate draft bloqueia regressão plena.
- Falhas TAX13 **não ocultadas**: `TAX13 scoped: saved official CV100/97 and CV52/91 strip editorial history` (conteúdo editorial de histórico no texto operativo); `TAX13 F1 R2: nested P annex title inherits TH/TD revocation or unverified status` (NCM 8450.11.00 indevidamente presente em anexo revogado). Corrigir classificação jurídica excede o escopo do LOTE-2; encaminhar frente TAX13/COORD, não desativar testes.
- L-07 preflight ainda sem `SELECT code,is_active,connector_key,schedule_cron FROM sources WHERE code='doe-sp-legado'` validado contra produção nem `SELECT status FROM collection_runs ...` para pendências. Não fechar/remove conector até evidência direta de inatividade; zeros de logs não equivalem a inatividade.
- Sem alterações produtivas, sem SQL, merge ou deploy; CI integral não aprovado. L-05, L-08, L-10 implementadas em DRAFT com gates/pendências. L-07 bloqueada.

## Checkpoint final do executor — LOTE-2 parcial, PR draft
- Backend PR [#203](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/203) DRAFT, HEAD `8037297bc1c8017af2ea40c3f42bc4b4b2f40948`; base main `8a4d28bbf95ecdb182438d08ff1c6e475d78af96`; 10 commits, 8 arquivos, sem merge/deploy.
- L-05 e L-10: **PASS** em PostgreSQL 18 isolado, [run 38089080870](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38089080870), testando unidade DOE-SP, captura/versões, rotina de retenção, fronteira 29/30/31 e dry-run padrão.
- L-08: os três testes entraram no CI. [CI rápido 38089080815](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38089080815): typecheck/build PASS, 619/621 unidades PASS e **dois FAIL TAX13**. Falhas preexistiam como testes órfãos, sem evidência de PASS anterior; mudanças jurídicas TAX13 fora do escopo. Não desabilitar testes.
- L-07: gate INATIVIDADE NÃO COMPROVADA (`sources.is_active` SQL atual inacessível), portanto **não executada**, apesar de nenhum evento scheduler observado e seed inactive por default. L-07 não está aprovada tecnicamente para remoção.
- L-09 e L-15: propostas de cinco linhas SEM CÓDIGO documentadas acima. ~23 mil DOU OUT_OF_SCOPE é estimativa informada, não volume comprovado; backup restaurável é gate da L-15, nunca executado.
- Frente LIMPEZA 7/14 (50%) por ordem COORD; L-04 e L-13 CONCLUÍDA; L-15 PRONTA (só proposta). O fato de L-04 estar CONCLUÍDA é decisão COORD, e não nova comprovação independente dos checkpoints de consulta.
- Encaminhar: desbloquear L-07 somente após preflight SQL read-only, direcionar falhas TAX13 à frente responsável, manter #203 DRAFT e sem merge/deploy.

## Checkpoint 4 — solicitação de ajustes do CLAUDE-COORD (10/10/2026)
- Quadro: adicionada L-16 na seção Próxima frente, **AGUARDANDO OK**, sem alterar LIMPEZA 7/14 (50%); decisão L-15 registrada. Commit `df0438f141813c21928b392c019d23cf71cc1e85`.
- L-11 backend PR #202: migration 051 agora aborta com `L11_MIGRATION_BLOCKED_CONFIGURED_DRAFT` e detalhe id/versão/contagens se DRAFT contiver regras, aliases ou termos. Apenas DRAFT vazio é removido. Commit `f961d32d98f6f4d4dc2fb90e16d19dbb94532ea7`. Medição PG18 de ~120 mil DOU pendente.
- L-11 web PR #91: prévia soma bloqueios e mostra `Y protegidas (não serão apagadas)` mais motivo cliente/outra fonte; teste ajustado. Commits `b1eacf2eeb0d249e1b44c0e9451f95bbd72bb35c`, `118742f77d3e6d9fe1f4dfeadfabb0c9b952986d`.
- L-08 backend PR #203: removido temporariamente `tax13.scoped-presentation.unit.test.ts` de npm test; arquivo retido com comentário apontando L-16, sem adulterar asserções. Commits `3c973625f6dbc41de45b430f6b66904936f3d148`, `a52d88a1d5dfef44ec0ef42e7832b10bd158392c`.
- L-07: print de consulta mencionado no pedido não consta dos arquivos da conversa nem foi recuperado; consulta `sources.is_active` e existência de runs últimos 7 dias não comprovadas. **Não remover** conector legado sem preflight.
- Continua proibido merge/deploy/exclusão em produção; os próximos checkpoints incluirão CI e tempos medidos.

## Checkpoint final — retorno integrado L-11 + LOTE-2 (10/10/2026)
- Parte 1 L-11 backend PR #202 HEAD `16a83a7fafe473539299cb26620d9860f9ca1713` DRAFT, PostgreSQL18 isolado **PASS** run `38089759512`. Benchmark 120k DOU sintéticas: seed 24529 ms, **preview 147752 ms > 60s**, confirm 8812 ms < 60s. Modo KEEP_ALWAYS sem apagar 120k. Proposta de lotear somente documentada no checkpoint L-11, não implementada.
- Parte 1 L-11 web PR #91 HEAD `2ff6eab0e3839dd254c6059a47d8bf00d8264d7f` DRAFT; texto agregado `Y protegidas (não serão apagadas)`, motivo de vínculo empresarial e/ou origem externa. Typecheck/Test/Build PASS; gate final FAIL pela política draft.
- Parte 2 PR #203 HEAD `a52d88a1d5dfef44ec0ef42e7832b10bd158392c` DRAFT: teste TAX13 isolado retirado da suíte por ordem do COORD e comentário `L-16` no arquivo. Permanecem onboarding-identity.unit e publication.presentation.integration. Typecheck/Build/Unit PASS; PG18 isolated PASS; gate geral FAIL pela política draft.
- L-07 NÃO IMPLEMENTADA: nenhum print/arquivo da consulta doe-sp* acessível nesta conversa. `is_active=false` + ausência de runs nos últimos sete dias não comprovados simultaneamente; não inferir a partir de logs.
- Parte 3: board L-16 AGUARDANDO OK na seção Próxima frente; L-15 proposta anterior substituída pelo backup manual Railway Backups, dry-run, purge L-11 em lotes e OK expresso do Fábio. Sem restore isolado e sem revisão independente específica conforme decisão COORD. Commit inicial board `df0438f141813c21928b392c019d23cf71cc1e85`.
- Todos três PRs seguem DRAFT e SEM merge/deploy. A frente LIMPEZA permanece 7/14 (50%). Retorno único ao COORD só com evidências observadas.


## LOTE-2 pré-merge — L-07 e quadro (10/10/2026)
- Evidência operacional **fornecida pelo Fábio via CLAUDE-COORD**: `doe-sp-legado.is_active=false`, um run total, último em 2026-10-02; critério autorizado para remoção (não é leitura SQL nova do executor).
- PR backend [#203](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/203) commit `adbab0d114dec892a1c952adfeab986d92d958ee`: removidos registro do conector legado no registry, 15 arquivos exclusivos de módulos/scripts/testes, scripts npm de ativação/pilot/benchmark; novo teste comprova que registry não oferece `doe-sp-legacy` e preserva `doe-sp` e `rfb-normas`. Banco histórico e publicações não tocados.
- CI rápido no HEAD acima: Typecheck, Build e Unit PASS; PG18 isolado PASS, gate `verify` FAIL só por PR draft (regressão completa bloqueada até Ready for review).
- Quadro `coordenacao/TAREFAS.md`: L-05/L-07/L-08/L-10 → `REVISAR (aguardando merge)`; commit `62548247a78f553e9dd0c9cd2b3331218a2fe203`. Frente LIMPEZA 7/14 (50%).
- PRs sem merge, sem deploy, nenhuma exclusão ou mudança na fonte de produção.


## LOTE-2 — pré-merge CI integral iniciado (10/10/2026)
- Governança: L-05, L-07, L-08, L-10 em `REVISAR (aguardando merge)`, commit de quadro `62548247a78f553e9dd0c9cd2b3331218a2fe203`.
- Backend [#203](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/203) HEAD `adbab0d114dec892a1c952adfeab986d92d958ee`: remoção L-07 com evidência fornecida Fábio/COORD (fonte inativa, run antigo 02/10), 15 arquivos exclusivos deletados; conector DOE-SP atual preservado, sem alterações em banco.
- [#203](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/203), frontend [#91](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/91) e backend [#202](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/202) passaram a Ready for review para disparar CI integral; **sem merge/deploy**.
- Benchmark final da L-11: 120.000 DOU sintéticas, 10% alvo, preview **3926 ms**, confirm **3641 ms**, run 38090752117 PG18 PASS. Teste DRAFT com regras bloqueando 051 PASS.
- Os três CI integrais foram disparados e permanecem pendentes de resultado no momento deste checkpoint. Não confundir CI rápido verde com aprovação do pipeline.


## Pré-merge: PR #203 CI integral PASS (10/10/2026)
- PR [#203](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/203) Ready for review, HEAD `adbab0d114dec892a1c952adfeab986d92d958ee`, sem merge/deploy.
- Full CI [run 38090824865](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38090824865): `verify` **SUCCESS**.
- Complementares: DOU-CLEAN-02 isolated PG18 **SUCCESS**, ONB-01 migrations/identity/RLS PG18 **SUCCESS**, LOTE-2 isolated PG18 [run 38090824668](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38090824668) **SUCCESS**.
- Ficam L-05/L-07/L-08/L-10 em REVISAR aguardando merge, com preservação de acervo e histórico. Sem autorização de merge ou produção.


## Pré-merge — CI final dos três PRs em avaliação (10/10/2026)
- Backend #203 HEAD `adbab0d114dec892a1c952adfeab986d92d958ee` **FULL PASS**: verify [38090824865](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38090824865), LOTE2 PG18 [38090824668](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38090824668), ONB-01 PG18 e DOU-CLEAN-02 PG18 SUCCESS.
- Frontend #91 substituiu E2E antigos ligados a rascunho/CSV (retirados pelo escopo L-11) por cenários de classificação direta, protegidas, drift de contagem e reconfirmação, 4 viewports. Commit `53ab6c2fb9577821efd541640ae4c8fccf80211d`; novo CI integral pendente.
- Backend #202 ajustou fixture de backfill e retirou índice de expressão que exigia EXECUTE para papéis operacionais, mantendo filtro SQL. HEAD `230d8decfff28b73bcb5e9a59f57152916a0c0d3`; CI completo e benchmark sem índice pendentes. **Não mergear/deployar nenhum PR**.


## Pré-merge CI final dos três PRs — read-back (10/10/2026)
- **#203 backend** Ready for review, HEAD `adbab0d114dec892a1c952adfeab986d92d958ee`; CI integral [run 38090824865](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38090824865) SUCCESS; LOTE-2 PG18, ONB-01 PG18 e DOU-CLEAN-02 PG18 SUCCESS. L-07 removido só no código, com inatividade atestada por Fábio/COORD, sem modificar histórico no banco.
- **#91 frontend** Ready for review, HEAD `53ab6c2fb9577821efd541640ae4c8fccf80211d`; CI integral [run 38091312979](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38091312979) SUCCESS incluindo testes de navegador Playwright atualizados para classificação direta, quantidades protegidas e reconfirmação.
- **#202 backend** Ready for review, HEAD `f42918ff5c514f7a84d3a4a2af601888b9b8d2cc`; verify CI integral job `114328808706` SUCCESS ([run 38091539028](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38091539028)); PG18 L11 [run 38091538871](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38091538871) SUCCESS. Tempos finais preview **9787 ms**, confirmação **9400 ms**, 120k/10%. ONB/DOU complementares acionados e status a conferir.
- **Quadro L-05/L-07/L-08/L-10:** REVISAR (aguardando merge), commit `62548247a78f553e9dd0c9cd2b3331218a2fe203`, Frente LIMPEZA **7/14 (50%)**.
- **BLOQUEIO:** sem autorização de merge, deploy, operações produtivas ou purga real, apesar de CI verde. A revisão funcional/segurança e a liberação são decisões separadas do COORD.


## CI íntegro pré-merge: all SUCCESS (10/10/2026)
- #202 backend HEAD `f42918ff5c514f7a84d3a4a2af601888b9b8d2cc`: Ready; verify FULL SUCCESS, L11 PG18 SUCCESS, ONB-01 PG18 SUCCESS, DOU-CLEAN-02 PG18 SUCCESS.
- #91 frontend HEAD `53ab6c2fb9577821efd541640ae4c8fccf80211d`: Ready; validate FULL SUCCESS inclusive Playwright 4 viewports.
- #203 backend HEAD `adbab0d114dec892a1c952adfeab986d92d958ee`: Ready; verify FULL SUCCESS, LOTE2 PG18 SUCCESS, ONB-01 PG18 SUCCESS, DOU-CLEAN-02 PG18 SUCCESS.
- L11 benchmark final com 120k DOU sintéticas/10% selecionadas: preview 9787ms, confirm 9400ms, seed 20783ms, limite 60s, todos os tempos no HEAD final verificados no run 38091538871.
- L05/L07/L08/L10 permanecem REVISAR (aguardando merge). L07 removido do código com base no preflight confirmado pelo Fábio (inativo; único run último em 2026-10-02). Nenhuma tabela, publicação ou histórico da produção alterado.
- Protocolo encerrado para entrega ao COORD; **NÃO MERGEAR, NÃO DEPLOYAR** até autorização expressa.


## MERGE autorizado Fábio — interrupção no gate Railway (10/10/2026)
- Autorização explícita do Fábio: backup manual PostgreSQL feito; merge estrito #203 → deploy backend/worker/scheduler SUCCESS → #202 → deploy SUCCESS → #91 → deploy web SUCCESS. Se falhar, parar e não fazer rollback.
- **PR #203 MERGED** na main de radar-fiscal-backend com **merge SHA `3afdeabcb71fea94c7fee0f7e915d081f511ed40`**, após CI integral verde e HEAD `adbab0d114dec892a1c952adfeab986d92d958ee`.
- **Railway backend** `radar-fiscal-backend` id `1bb13b39-5f1c-4a50-8940-0986909f389a`: novo deployment `92681fc4-f6f6-44b2-850b-0d5805b0a99a` criado 2026-10-10T22:58:36Z, status **SUCCESS**; logs confirmam db runtime security, connection verified, server listening.
- **Railway worker** `radar-fiscal-worker` id `fe4d9f52-7b14-40d0-a352-6a60d459672e`: source commitSha FIXADO `ac818d609b4c0c8963642ff1f5470b1865d984bd`, deployment mais recente `a0458373-e797-4a79-9487-9efc9137d802` SUCCESS mas criado **antes do merge**, 2026-10-10T17:12:30Z. NÃO confirma implantação do #203.
- **Railway scheduler** `radar-fiscal-scheduler` id `5545fffa-60f5-4028-9537-6282dd5a5cf1`: source commitSha FIXADO `068506811ae4c0a257816c38e899e3a1dccb0fb8`, deployment mais recente `131bbc56-db97-45ba-bc9b-b344a3e49285` SUCCESS mas criado **antes do merge**, 2026-10-05T22:55:08Z. NÃO confirma implantação do #203.
- **BLOQUEIO:** inexistência de novos deploys de worker e scheduler para o merge #203, apesar dos deploys anteriores SUCCESS. Não atualizar config Railway nem disparar deploy não autorizado; exigir orientação/autorização do Fábio sobre SHAs fixados. **Sequência interrompida** após #203: #202 NÃO MERGEADO; #91 NÃO MERGEADO; migration 051 NÃO disparada por este executor.
- **Quadro:** manter L-05/L-07/L-08/L-10 em REVISAR (aguardando merge/deploy integrado), L-11 pendente, Frente LIMPEZA 7/14 (50%). Não registrar CONCLUÍDA ou 10/14 até cumprir os gates exigidos pelo Fábio. Nenhuma limpeza real ou rollback executado.


## Retomada de deploy autorizado — 10/10/2026 20h BRT
- Fábio confirmou backup PostgreSQL manual Railway 10/10 19:57 BRT, 9,64 GB, e reiterou autorização de execução sequencial #203 → #202 → #91, bloqueando avanço por deploy FAIL.
- #203 mergeado na main com SHA **`3afdeabcb71fea94c7fee0f7e915d081f511ed40`**.
- Railway produção #203: backend deployment `92681fc4-f6f6-44b2-850b-0d5805b0a99a` **SUCCESS**; worker `4a7a68dd-5982-4c50-93e6-3b6d979cde87` **SUCCESS**; scheduler `5d4e43ea-9493-43be-af9c-8c2a92a6f521` **SUCCESS**.
- Os dois serviços estavam pinados a commits anteriores. Alteradas **somente** as referências de origem do worker/scheduler para o merge SHA #203, aplicadas em patch Railway `cdb245a6-192f-43b8-ae30-ddbbf45a6368` não destrutivo; respectivos deploys SUCCESS, sem alteração de banco por esta ação.
- PR #202 ficou `mergeable_state=dirty` após #203; conflito exclusivamente com `package.json` das duas frentes. Criado merge de integração no HEAD do #202 **`74f3d869c99cf0279043a08798d920823d8f8ae7`**, pais #202 anterior `f42918ff5c514f7a84d3a4a2af601888b9b8d2cc` e main #203 `3afdeabcb71fea94c7fee0f7e915d081f511ed40`. Árvore baseada na main com os 16 arquivos da PR #202, preservando os scripts L-08/L-10 e remoções L-07 do #203.
- **#202 NÃO mergeado neste checkpoint**. Seu HEAD novo ficou mergeable, com CI integral, L-11 PG18 e LOTE-2 PG18 disparados. Não prosseguir à migration 051 antes de CI verde do SHA novo. #91 ainda OPEN.
- Quadro mantido em LIMPEZA 7/14 (50%) até #202/#91 e deploys SUCCESS; sem rollback, sem limpeza real.

## Fábio — fechamento dos merges e deploys (10/10/2026, BRT)
- Backup manual PostgreSQL informado por Fábio: **10/10 às 19h57 BRT, 9,64 GB**, antes do primeiro merge. Não houve restauração nem nova cópia pelo executor.
- **#203** backend MERGED `3afdeabcb71fea94c7fee0f7e915d081f511ed40`; Railway produção backend `92681fc4-f6f6-44b2-850b-0d5805b0a99a` SUCCESS, worker `4a7a68dd-5982-4c50-93e6-3b6d979cde87` SUCCESS, scheduler `5d4e43ea-9493-43be-af9c-8c2a92a6f521` SUCCESS.
- **#202** backend MERGED `0cb2363d552ff120144949236c74c716f957d0af`. Após integrar PR #203 à branch #202 em merge de dois pais `74f3d869c99cf0279043a08798d920823d8f8ae7`, CI integral + L11 PG18 + LOTE2 PG18 + ONB/DOU todos PASS antes do merge. Railway backend `cdcd6502-0ab3-4a8d-ba12-ddf2d087aef2` SUCCESS, worker `3022a1e6-0461-4321-8a70-363e7e4f2d6e` SUCCESS, scheduler `a1c9051a-68a4-4b23-9cd8-88da81ee3d64` SUCCESS.
- Migration 051 **aplicada em produção** pelo preDeploy do backend #202; logs registram `Applying migration: 051_collection_filter_direct_rules_cleanup.sql` e `Migration applied: 051_collection_filter_direct_rules_cleanup.sql`, runtime/worker/taxonomy checks PASS. Não interpretar como prova de redução física imediata do DB em 471 MB.
- Worker e scheduler possuíam source commits pinados; foram alterados somente seus SHAs de origem por patches Railway revisados, não destrutivos, para os merges #203 e #202. Não foram alteradas configurações de banco nem executadas tarefas de limpeza real.
- **#91 web** MERGED `658616a8361d0226d141fc51595347323dae0e7c`. Railway projeto `tribusca-web-preview-web05`, serviço `web05-preview`, deploy `e214c670-b589-4e27-bb6d-53ca9db46355` SUCCESS, ONLINE, commit pin atualizado para SHA do merge. **ATENÇÃO:** esse é serviço de preview Railway; a atualização do domínio público `trifaros.com.br` não foi verificada com conector do host da produção web. CI push de main foi acionado e estava em andamento na leitura inicial.
- Quadro atualizado L-05, L-07 e L-08 → CONCLUÍDA (observação: teste TAX13 continua fora da suíte até L-16); L-10 → REVISAR (limpeza real depende de OK Fábio); L-11 → REVISAR (primeira classificação em produção pendente). Frente LIMPEZA **10/14 (71%)**. Commit do quadro `369b51558072d70d5372dc70e26aff8dd5cbe430`.
- Sem rollback. Não rodou `db:prune-collection-items --apply`, não houve classificação em produção, não houve purge DOU OUT_OF_SCOPE L-15.
