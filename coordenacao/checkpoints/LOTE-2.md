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
