# F2-R7 — alternativa1 implementada para revisão offline

Frente2: 10%, 5/50 aceitas; +0. Não constitui aceite independente.
Decisão F2-R7-OBS-COVERAGE-01: **DECIDIDO — alternativa1**, por escolha expressa do Fábio transmitida nesta sessão. Referências persistentes: [#124](https://github.com/fabiojuniort-cyber/tribusca-control/issues/124#issuecomment-6646487445), [#127](https://github.com/fabiojuniort-cyber/tribusca-control/pull/127#issuecomment-6646487882). Supera o marcador AGUARDANDO do desenho histórico @ccd1c46c; não altera nem apaga a referência histórica.
Perdas expressamente aceitas: GUC efetiva por conexão, snapshots exatos pós-COMMIT/pré-batch e ordinal/duração exatos dos lotes pela instrumentação.

## AS IS / TO BE / entrega
AS IS: backend#287 permanece @2a1b8f22 com wrapper antigo, sem alteração ou execução adicional.
TO BE candidato: módulo passive-pool.mjs anexa somente connect/acquire/release/remove. Nenhum método query/connect/release/end é substituído; não adiciona listener error. Falhas de coleta ficam em observation_outcome INVALID, sem retry/cancel/rollback/release pelo coletor.
Implementação isolada no controle, sem alterar backend ou workflows. prepare-passive.mjs é transformação pura que gera patch reversível do ponto de construção do Pool e hook after para flush fora das queries; não executa nem escreve o teste. external-observer.mjs é candidato preservando as seis consultas e métricas/guardas do observador original; não é executado.
O executor antigo run-pair não foi modificado nem invocado. Ativação futura desse candidato e ligação ao executor dependem de revisão e orçamento específico: não basta executar o runner antigo, que ainda utiliza o wrapper anterior.

## Limites fixados
- 2048 registros por pool, até16 pools por sessão: máximo32768 registros, sem ring/realloc para ampliar cobertura.
- A 2049ª tentativa marca BUFFER_FULL e cessa registros daquele pool. Limite de pools marca POOL_LIMIT e não anexa handlers adicionais.
- Apenas sequência, tipo, ID local WeakMap e SQLSTATE primitivo seguro. Não persiste SQL, parâmetros, erro/cliente serializados ou payload.
- Leitura de erro não invoca getter; campo inseguro/instrumentação falha invalida evidência.
- Handler não faz SQL, fs, console ou await. Mede overhead local agregado com performance.now; overhead total de servidor/agendamento não isolado.
- Flush explícito após produto/pool.end, síncrono e bounded pelo volume armazenado; erro de serialização/escrita separado. Sink assíncrono é recusado como evidência inválida e sua rejeição é consumida separadamente.
- Teardown remove apenas handlers próprios, idempotentemente, sem removeAllListeners.
- Externo inalterado: máximo300 amostras,300s, cadência1Hz, pool1 separado read-only/autocommit, statement900ms/lock500ms. Não foram adicionados snapshots/consultas externas ou aumentado orçamento. PG original45s/5s/max2/150k/5k/asserts preservados.

## Testes executados
Runtime local Windows/Node v24.21.0, pg8.23.0 e pg-pool3.14.0 do lockfile. Fonte nativa Pool com hash fixado no runner; Client é double EventEmitter, sem sockets. Não é Linux/Node24.22.2/PG18 real.
1. node --test passive.test.mjs: **10/10 PASS**, zero skip. Identidade dos métodos/listeners, teardown, buffer/limite de pools, captura insegura, serialização/flush/sink assíncrono, preparação reversível, orçamento externo, fila max2, preservação de resultado nativo após falhas e fatal em subprocessos.
2. node passive-equivalence.mjs <checkout-backend-com-node_modules>: **10 cenários x2 modos**; todos os traços completos e listeners iguais entre pool nativo e pool observado nos doubles. Sucesso, P0001,57014,throw síncrono,conexão,fatal,COMMIT,ROLLBACK,erro+ROLLBACK e ausência de snapshot pós-COMMIT.
3. Fatal sem captura artificial: quatro subprocessos (nativo/passivo; pool.query/cliente direto). Pool.query captura fatal nos dois; cliente direto sem listener termina com código1 nos dois. Nenhum listener novo suprime fatal.
4. Em três cenários de falha do coletor, COMMIT via Pool nativo mantém mesmo objeto de retorno e evidência INVALID. Preserva também resíduo de listeners do throw síncrono nativo, sem tentar corrigir o driver.
Resultados detalhados: passive-results.json. Os traços anteriores em r7-equivalence e relatório @edb2763d permanecem intactos.
Comandos a partir da raiz do controle: node --test docs/investigations/r7-passive-offline/passive.test.mjs e node docs/investigations/r7-passive-offline/passive-equivalence.mjs <checkout-backend-com-node_modules>. Para o primeiro, configurar F2_NATIVE_ROOT com caminho do checkout se fora do cwd. Não executar external-observer nem preparar/executar PG.

## Hashes SHA256
- passive-pool.mjs: `f71c77cadb7c3bb725b73993c65f79ca001afdda0902745ce63e4f147da00fd2`
- prepare-passive.mjs: `5d7362b978c3125f59574dfdd0c0efca19522fd7ed52fca3ec045b91fcac1cd2`
- external-observer.mjs: `16945d4afe7e62a81cc59ec16a65fdea4813f26b897ff15ac825a90a359c67aa`
- passive-equivalence.mjs: `6f1cbae58a1226e7eb6c41a175db0a8c210db01291caa9faca3146c7eaa6e493`
- passive.test.mjs: `02e7db5b406dcadc8991f68950e8b8965e5d9642cbfee86dcc539c0fd29880e2`
- r7-test.snapshot.ts: `9cc1208240ba761efe055d9cff3c27c58e25be2824214ee6ace0ab6501055346`
- passive-results.json: `4799efd7b210fa1e78f9df26ea3a2e7087e73a87ab182a13f5d7c25183786540`
Dependências nativas: pool `6f304776edaabde2954cbf8c4366fa6d9512bfba0e408e78cc56b3c46c69d058`; pg entry `3fad6e6d3d976edbabe0cbc9e1d39f4340bcb719bbbb186a0d3a24f3dbd4a94c`; pg Client `992c12d10cd42ece06b0b224601fa783a02ed08f3ace8bd8089cc441b6308abf`. Lockfile `028496fa43daec1b9f9b3110670e76774bd787773f360f18842c98abf478d7a8`. SRI dos tarballs não revalidado; versões e arquivos instalados registrados.

## Limitações e gate
Resultado offline não comprova equivalência PG18, planos, semântica real de rede/transação nem causa histórica. Ordem de eventos do double e microtasks não reproduz timing de servidor. Eventos passivos ainda consomem CPU/alocação; não declarar transparência de timing. Eventos release/remove não provam COMMIT, duração de query ou ordinal de lote.
Falha fatal do runtime/OOM/morte do processo não pode ser contida por try/catch; evidência incompleta permanece inválida. Hook after e flush podem consumir tempo após o produto; resultado/exit original do produto deve continuar separado da validade do artefato na futura ligação ao executor. Status só é COMPLETE após detach, sujeito à validação de arquivo e encerramento externo; não prova que todo o cenário PG foi observado.
Nenhum novo par, PG18, rerun ou workflow/backend disparado por esta implementação. Sem mudanças de timeout, volume, assertions, merge/deploy/produção. #285 bloqueado; causa R7 NOT_PROVEN. #143 tecnicamente aceito, sem merge/deploy; #125 pendente de revisão independente.
Próximo gate: revisão independente de código, patch puro, hashes e traços. Nova execução exige orçamento futuro, não concedido. Se a alternativa1 não passar, parar e reportar; alternativa2 não será adotada automaticamente.
