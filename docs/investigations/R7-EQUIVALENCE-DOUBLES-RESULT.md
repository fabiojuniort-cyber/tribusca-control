# R7 — equivalência com doubles: resultado
Frente 2: 10%, 5/50 aceitas; +0. Código e evidências para revisão independente, sem autoaprovação.

## Resultado
10 cenários x 2 modos = 20 casos offline, asserções de caracterização PASS. **Equivalência do harness NOT_PROVEN; equivalência PG18 NOT_PROVEN; causa histórica R7 NOT_PROVEN; #285 bloqueado.**
Execução local: Node v24.21.0 no Windows. Nenhum socket/banco/Docker, ensaio de150k ou workflow de observação executado. Não é o runtime Linux/Node24.22.2 do par anterior.
Comando: `node docs/investigations/r7-equivalence/equivalence.mjs <checkout-backend-com-node_modules>`.
Usa o módulo pg-pool3.14.0 nativo instalado e seu algoritmo real de aquisição/fila/release/discard, com Client double EventEmitter. Carrega pg8.23.0; não executa protocolo/Client real de pg ou servidor. Versões confrontadas ao lockfile; snapshots de observer/lockfile verificam blobs Git exatos do backend#287 @2a1b8f22. Não executa npm install nem scripts. SRI dos tarballs não foi revalidado; versões e hashes dos arquivos instalados estão registrados. Pool nativo tem hash obrigatório no runner.

## Comparações
| Cenário | Projeção sem auxiliares/listenerCount | Evidência |
|---|---|---|
| Sucesso | igual | Mesmo objeto de retorno; reutiliza cliente1; release uma vez por checkout |
| P0001 | igual | Mesmo objeto de erro; release(error), descarta1, cria2 |
| 57014 rejeitado | igual | Preserva erro, descarte e aquisição seguinte |
| Exceção síncrona | igual apenas na projeção | Nativo deixa2 listeners no cliente descartado; harness1. Não declarar limpeza equivalente |
| Falha de conexão | igual | Não libera cliente não adquirido; próxima aquisição funciona |
| Fatal assíncrono antes do callback | diferente | Nativo tem once(error), libera/descarta; wrapper não tem listener e emit gera erro não tratado |
| COMMIT | igual na projeção | Wrapper acrescenta snapshot depois de COMMIT |
| ROLLBACK | igual na projeção | Transação em cliente explícito, release uma vez |
| Erro seguido de ROLLBACK | igual na projeção | Erro preservado; rollback pelo cliente; release sem erro reutiliza conforme caminho explícito |
| Erro no snapshot após COMMIT | diferente | COMMIT concluiu nos dois modos; só wrapper rejeita a operação ao chamador |

A projeção remove eventos observe e listenerCount das entradas query; não oculta fatal_event_* nem release/retorno/erro. O JSON contém traços completos, incluindo listenerCount por dispatch, listeners antes de pool.end, eventos discard e resultado. O teste verifica release/acquire por cliente, reutilização/descarte e identidade de erro/retorno nos caminhos exercitados. Callbacks tardios do cenário fatal não devem causar segunda liberação; releaseOnce nativo também protege.
No double fatal, o próprio teste captura a exceção de EventEmitter para registrar fatal_event_unhandled e permitir comparação; sem essa captura, esse ordenamento pode interromper o processo. Não afirmar que o driver PG18 real emite nessa ordem: é contraexemplo da equivalência para o contrato do double.
O listener residual no síncrono é comportamento observado do nativo, não correção proposta nem vazamento produtivo comprovado. Sem equivalência de callback API pública, cancelamento real, sockets, fila sob saturação, encerramento concorrente ou erros de rede reais.

## Diferenças observacionais e timing
Wrapper faz 3 consultas auxiliares antes do primeiro dispatch por conexão e mais uma após COMMIT; batches também teriam snapshots, mas execução de batch150k não integra estes testes. Consulta auxiliar que falha pode abortar antes do produto ou converter sucesso pós-COMMIT em rejeição. Portanto não é observação transparente.
Native pool.query instala listener temporário e usa callback interno; wrapper usa await pool.connect/await client.query sem esse listener. Promises acrescentam continuations/microtasks; aquisições ficam retidas durante snapshots, podendo alterar escalonamento/cache/locks. Doubles usam queueMicrotask, sem latência PG/CPU/I/O e sem medir overhead real; não apresentar duração offline como estimativa PG18. Nenhuma mudança de timeout/volume/asserção feita.
O import do snapshot troca somente a resolução de pg para caminho local absoluto; funções instrumentPool/queryWithRelease executam completas e inalteradas. Não extraímos apenas o helper para alegar equivalência.

## Hashes SHA256
- observer: `c5b782c329bc55b408c80b52f272030936a1967285a76f27c148cf9d4b73c779`
- lock: `028496fa43daec1b9f9b3110670e76774bd787773f360f18842c98abf478d7a8`
- nativePool: `6f304776edaabde2954cbf8c4366fa6d9512bfba0e408e78cc56b3c46c69d058`
- nativePgEntry: `3fad6e6d3d976edbabe0cbc9e1d39f4340bcb719bbbb186a0d3a24f3dbd4a94c`
- nativeClient: `992c12d10cd42ece06b0b224601fa783a02ed08f3ace8bd8089cc441b6308abf`
- test: `102d95683ceeffd19ecb3d7a370b80433efd0682bb23bb2c3fd19a4fe267fdf8`

## AS IS / TO BE / impacto e gate
AS IS: release(error) corrigido, mas persistem diferenças demonstradas; 4 testes anteriores não demonstravam equivalência completa.
TO BE nesta entrega: disponibilizar testes, snapshots e traços para parecer independente. Não alterar o harness de observação ou implementar correção funcional. Uma futura remediação de instrumentação exige desenho separado e revisão, distinguindo proteção de erro fatal e propagação de erro auxiliar.
Impacto atual apenas documental/teste offline. Proposta anterior de novo par não autoriza execução. Orçamento novo continua sem decisão; zero tentativas PG adicionais. Não disparar CI backend indiretamente: entrega somente na branch documental do controle#127, sem workflow novo/alterado.
#143@0aa605c7 mantém aceite técnico e CI41937960075 SUCCESS informado pelo COORD; sem integração. Regra atual Railway permanece pendente de prova por leitura; nenhuma configuração alterada. #125 aguarda revisão independente.
Próximo gate: revisão independente destes contraexemplos e da estratégia de equivalência; nenhuma ação do Fábio necessária agora.
