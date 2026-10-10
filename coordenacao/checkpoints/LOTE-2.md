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

### L-15 — proposta, até cinco linhas, SEM código
1. Ler em modo somente leitura os candidatos DOU `OUT_OF_SCOPE` (~23 mil é estimativa), versão do escopo, origens, vínculos cliente e todas as dependências para obter contagem real e bloqueios.
2. Fazer backup restaurável do PostgreSQL + prova de restauração isolada, manifesto IDs/hashes/contagens e opção de rollback; não confiar apenas no indicador PITR.
3. Reaproveitar o padrão seguro da L-11 para exclusão transacional em lotes, **somente** dos DOU `OUT_OF_SCOPE` sem vínculos de cliente/empresas e sem origens de outras fontes, tratando scope events, versões, origens e evidências em ordem.
4. Dry-run primeiro, reconfirmação se a seleção mudar, limite de lote e trilha de auditoria de IDs excluídos, assinaturas/hash antes/depois e evidência jurídica de preservação de bloqueados.
5. PR e revisão independente/adversarial + teste de rollback em PostgreSQL 18 antes de qualquer execução produtiva; **não executar nem apagar agora**.

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
