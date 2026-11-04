# F2 R7 — resultado do par observacional01 (04/11/2026)

Frente2:6%,3/50 controles aceitos; sem novo aceite pela investigação.
Autorizações: #127/6642909200 e #124/6642917997.

## Conclusão

**Causa raiz NOT_PROVEN. #285 permanece bloqueado.**
Foi executado exatamente um par, controle b2150ab5 e integração2c41fbab, uma tentativa por árvore, clusters PG18.6 novos no mesmo job/host, Node24.22.2 e digest5c4783a8… fixados. Os dois processos terminaram com exit0; isso **não é CI limpa de #285**.
Além do overhead aprovado, a implementação inicial do wrapper tinha diferença de semântica de conexão em erro. Portanto este par **não constitui comparação equivalente com o R7 original e não pode ser usado para excluir/afirmar causa**.

## Referências imutáveis

- Harness executado: backend#287 @23c9226fb88f7fa5abcf9730ae772ce62036670b.
- Checkout real do harness:35d7b3f1da2beef67f5f26ecdf9e986e32e60aff (merge de teste, sem main alterada).
- [Run41930483691](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/41930483691), job126925814711, SUCCESS sob instrumentação.
- [Artefato13371117560](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/41930483691/artifacts/13371117560), SHA256 **0d5b0ac52064eaaa93c5b8edd5c28caf1500b992d355d5d63f926bc3bda2d543**, baixado/conferido.37 arquivos sanitizados.
- Teste original nas duas árvores:SHA2569cc1208240ba761efe055d9cff3c27c58e25be2824214ee6ace0ab6501055346.
- Teste instrumentado nas duas:SHA256b8536b24b97d1a2af1a257539f0d99e141e2c06e133c8b6527e5d201caf1e1bc.
- Módulo de instrumentação executado:SHA256a66f929315d335591779166295b133e379688cdc782d4eb13fbb8b60cb5fddc7.

## O que executou

Toda a sequência predecessora e a verificação de migrations foram executadas em ambos os casos, sem repetição. Árvores de fonte b7f5a585 e6f6feff7 conferidas. Build/predecessores originais; patch local reversível só antes do R7. Nenhuma asserção ou SQL de produto foi removido/modificado. R7:3 testes passaram em cada caso, incluindo rollback sintético,150k, reinício real de pool, idempotência e outras entidades/cabeçalhos. Gate semântico posterior também exit0 nos dois.
150k foram processados em30 lotes efetivos de5k em cada caso; ordinal1 é a interrupção sintética esperada/P0001, ordinais2–31 são lotes confirmados. Timeout45s/lock5s, pool2/jitoff, teste240s/comando300s/job14min preservados. Cleanup do observador e containers completou no finally. Nenhuma operação produtiva.

| Observação | Controle | Integração |
|---|---:|---:|
| Duração do comando R7 instrumentado |44,532s|44,895s|
| Duração do teste150k |42,622s|42,572s|
| Trecho medido de backfill/reinício |30,410s|30,583s|
| Menor/maior lote efetivo |950,435/1057,392ms|944,136/1155,169ms|
| Amostras observador |45|48|
| Erros do observador |0|0|
| Amostras com blockers retornados |0|0|
| Metadados/snapshots:tempo somado |109,948ms|115,321ms|
| Queries do observador:tempo somado |317,420ms|317,420ms|
| Planos finalizados exportados |71|71|

GUCs das quatro conexões instrumentadas de cada caso foram registradas/verificadas, inclusive após reabrir pool:PG18.6,statement45s,lock5s,jitoff,work_mem4MB,plan_cache_modeauto,stats_target100,auto_explain250ms/analyzeon/timingoff/nestedon/bufferson/parameter_max_length0/formatjson,track_io_timingon. Nada disso prova configuração das execuções históricas falhas.

## Estatísticas, planos, waits e overhead

Estados iniciais divergiram apesar da mesma sequência: no controle houve autovacuum/autoanalyze antes do R7, audit_log reltuples1/relpages1; na integração reltuples150001/relpages6001, cerca150k dead tuples e nenhum last_autoanalyze registrado naquele snapshot. Os dois passaram sob a instrumentação não equivalente: isso não demonstra que estatísticas sejam irrelevantes nem que sejam a causa.
Planos capturados incluem Index/Seq/CTE Scan,Hash Join,Aggregate eLockRows; controle também inclui Nested Loop/Bitmap em algum plano. Não atribuir esse nó à falha histórica nem inferir um plano da consulta cancelada a partir de planos rápidos. As expressões/query text foram removidas por allowlist.
Waits amostrados:controle ClientRead/WALWrite; integração WalSync/VacuumDelay/MessageQueueSend, além de execução sem espera. Zero blockers nessas amostras não exclui bloqueios não amostrados ou históricos. IO/cgroup/checkpointer foram preservados no artefato.
Os tempos acima medem só consultas explícitas de metadados/observação. **Overhead total de auto_explain/track_io_timing, scheduling e mudança de cache não foi isolado.** Não subtrair110ms e chamar o resto de baseline sem instrumentação. Não comparar causalmente com o controle antigo de19,236s.

## Defeito do harness identificado pelo executor

Em observe.mjs do HEAD23c9226f, pool.query chamava client.release() em finally mesmo quando c.query rejeitava. O pg-pool3.14.0 (versão fixada pelo lock) chama client.release(err) quando a consulta falha; o erro é usado pelo pool para descartar a conexão. A implementação executada podia conservar sessão/cache depois do erro sintético, em vez de descartá-los. Isso viola a equivalência pretendida de observação e limita todas as inferências do par.
O executor identificou/publicou a limitação, preservou os arquivos e **não fez rerun para obter resultado melhor**. Não houve correção funcional R7.
Correção exclusiva do harness:backend#287 @ **2a1b8f22dee48db9938d13df6508ab713d012c54**, passando o erro a release e adicionando teste de falha/sucesso para o descarte. Quatro testes locais de guardas/descarte/sanitização/invariantes PASS; node --check PASS. **Esse HEAD corrigido não executou novo par PG18.** Não reutilizar o SUCCESS23c9226f como prova2a1b8f22.

## AS IS → TO BE / impacto e continuação

AS IS: falha histórica57014 não reproduzida; observação01 passou nos dois casos, mas diferença do wrapper impede comparação equivalente. Causa permanece NOT_PROVEN.
TO BE imediato dentro do escopo: entregar este resultado e a correção do harness para revisão independente, sem nova execução. Conferir equivalência completa com pg-pool e o efeito de snapshots/auto_explain antes de propor outro experimento.
Impacto: só laboratório/documentação; nenhum arquivo R7 de produto, timeout, volume, asserção, política, migration ou produção alterado.
O limite autorizado de um par foi consumido. **Não há autorização para novas duas tentativas por esta entrega.** Se após a revisão for necessário outro par, apresentar pedido específico com AS IS/TO BE/impacto e decisão expressa, sem presumir aprovação desta correção como autorização de repetir.
Nenhuma ação indispensável do Fábio agora: revisão do artefato pode prosseguir; web#143 e conferência documental#6 são independentes. #285 não liberado. Sem merge/deploy/operação produtiva.
