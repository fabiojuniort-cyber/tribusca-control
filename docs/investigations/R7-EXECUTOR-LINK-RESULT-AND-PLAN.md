# R7 — ligação candidata ao executor, bloqueada para execução

Frente 2: 10% — 5/50 aceitas; avanço +0.
Base técnica OFFLINE aprovada pelo COORD: 881fafe64d6b733e073773eae8a86ab7f3ecbb23. Este delta requer revisão independente própria.
Branch isolada: impl/f2-r7-executor-link-offline-20261104.

## Implementação e limites
O executor candidato run-pair-candidate.mjs deriva do executor anterior, mas remove todo uso/import do wrapper antigo. prepareCandidate confere hashes fixos de passive-pool, prepare-passive, external-observer e teste original; só então aplica o patch reversível do ponto de construção do Pool e copia os dois módulos candidatos.
Os arquivos aprovados @881fafe6 permanecem inalterados. Pool.query/connect/client.query/release/end continuam nativos; sem listener error novo no pool do produto. O processo filho do observador tem seus próprios handlers de erro/close para registrar a coleta.
Nenhuma mudança nos150k/lotes5k/statement45s/lock5s/max2/teste240s/comando300s/job14min; buffer2048/pool e até16 pools; externo300 amostras/300s/1Hz/900ms/500ms/pool1. Não adiciona consultas externas.

## Três resultados independentes
- product_outcome: registro imutável do código/sinal observado no processo filho, ou SPAWN_ERROR/NOT_RUN. Observação não modifica esse objeto, reenvia query ou repete o teste.
- observation_outcome: COMPLETE/INVALID e motivos. Arquivo ausente/malformado, flush inválido, overflow, hashes divergentes, coleta vazia, erro/limite ou encerramento antecipado do observador invalidam evidência.
- diagnostic_conclusion: NOT_PROVEN; nunca calculada como causa comprovada por um par instrumentado.

Falha do agregador/coleta pode tornar o job agregado não verde sem modificar o resultado original registrado. Produto com exit1 e coleta completa continua exit1; produto com exit0 e coleta inválida continua exit0. Falha de preparação deixa produto NOT_RUN, não FAIL inventado.
O comando mantido é GNU timeout300s seguido de npx tsx --test. exit124/137 nessa fronteira é marcado TIMEOUT_WRAPPER, preservando código bruto e innerExitCode:null; não inventar código/sinal do teste interno que o wrapper não expôs. Falhas de spawn preservam sua categoria.
O observador encerrado antes de product_outcome estar disponível invalida a evidência mesmo com exit0 e observer_end. Esse limite usa a ordem de eventos do processo pai; não constitui cronologia PG de precisão absoluta.
Cap/overflow invalidam evidência sem ampliar orçamento. Produto morto/sinalizado mantém sinal/código bruto; evidência é inválida/incompleta. Não existe retry automático. Falha de preparação ou observação invalida encerra o restante do par candidato; falha R7 com evidência válida pode ser comparada à segunda árvore, conforme eventual autorização futura.

## Bloqueio de execução
candidate-config.mjs exporta executionAuthorized=false e requireBudget() que lança R7_PAIR_NOT_AUTHORIZED incondicionalmente. A chamada é anterior a mkdir, spawn, Docker, preparação ou PG. Não há variável de ambiente, argumento ou ready que remova o bloqueio.
Nenhum arquivo .github/workflows é criado/alterado; candidato existe apenas sob docs/investigations/r7-passive-offline no controle. Não está ligado ao executor backend nem a push, ready_for_review, synchronize ou dispatch. Backend#287 e workflow anterior permanecem intactos.
Um subprocesso offline testou a recusa antecipada do candidato; não executou o par. Autorização futura exigiria novo delta de ativação revisado/HEAD fixado, não simplesmente tentar rodar este arquivo.

## Testes realizados
Node v24.21.0 local Windows, sem servidor/sockets/Docker. node --test executor-link.test.mjs: **17/17 PASS**, zero skip; node --check run-pair-candidate.mjs: PASS.
Cobertura: separação produto/evidência; flush; arquivo ausente/malformado; overflow; observador morto/ausente/erro; hash divergente; child real saindo17 e sinal simulado; produto exit1 com coleta válida; timeout wrapper124; observador encerrado cedo com exit0; limites/shape; preparação pinada; bloqueio antecipado; parâmetros fixos.
Os testes usam os módulos passivos aprovados sem alteração. Os testes nativos e traços @881fafe6 são preservados e não foram reclassificados como prova PG18. Este delta testa o adaptador/estados offline, não a sequência real Docker/predecessores/PG/auto_explain. O branch não foi executado em CI para gerar prova PG.

## Hashes SHA256 deste delta
- execution-state.mjs: `6963443ea26a9e8f2f99f7f7e96ec1914503bde62423e703984e72a08955e018`
- candidate-config.mjs: `b34b15c386e291cdbbba7027f5af99b3bb731fb6e02e060755d30853bcea645a`
- candidate-support.mjs: `acdc167d9f4bd696320a5524cda2a5478bfa18f41442a0e64defe3d3b33aac55`
- run-pair-candidate.mjs: `20b72eed3064e9fe24a4258b4e0a1f4cd593d7be0cbf6fcdf32924dccc4c9f24`
- executor-link.test.mjs: `5b86e6a27ddc99dc652821efc172b70ef6dfb034dcd315e2d391e40267f932c6`
Pins mantidos: passive-pool f71c77cadb7c3bb725b73993c65f79ca001afdda0902745ce63e4f147da00fd2; prepare-passive5d7362b978c3125f59574dfdd0c0efca19522fd7ed52fca3ec045b91fcac1cd2; external16945d4afe7e62a81cc59ec16a65fdea4813f26b897ff15ac825a90a359c67aa; teste original9cc1208240ba761efe055d9cff3c27c58e25be2824214ee6ace0ab6501055346.
Contraexemplos e traços @edb2763d permanecem intactos.

## Plano exato de eventual par adicional — PROPOSTA, NÃO EXECUTAR
1. Revisão independente deste HEAD/diff, testes, hashes e limites. Aceite offline não é orçamento de par. Depois, decisão expressa sobre um orçamento novo de no máximo2 tentativas,1/árvore, zero retries. Nenhuma concedida agora.
2. Se autorizado, preparar delta mínimo de ativação manual, com HEAD final fixado e revisado. Nenhum trigger por push/ready/synchronize. Declarar workflow/job exatos e concessão específica antes de habilitar; hoje não há workflow/dispatch ativo para o candidato.
3. Um job Ubuntu com Node24.22.2 e limite14min; imagem postgres:18-bookworm@sha256:5c4783a8cc3f0074912164f94dfa1be4e043438f0f707cf968d7af9a0d31a2c8, PG18.6. Validar digest/runtime/hashes/GUCs esperadas e perdas aceitas. Não afirmar GUC efetiva por conexão.
4. Ordem fixa: controle b2150ab5ef34e9f9646e219d522e47738d9c04f5 (árvore b7f5a585ebc31b61334a56650264855d74aab8fb), depois integração2c41fbab8169b7efca6bd2e80c963d57a50585b6 (árvore6f6feff772a08a1cf004ec7c33382f6ea5acbb6e). Worktree separado e container/cluster descartável novo por árvore, mesmos recursos do job, sem volumes/dados reais.
5. Manter sequência anterior: npm ci; npm run build; npm run db:prepare; node ops/onb02/audit-backfill.mjs --apply --ack-irreversible-r7 somente nesse cluster sintético; depois testes public-signup, onboarding-integrity, onb02-company-purge-graph, onb02-r6-purge, onb02-r71-backfill, onb02-r74-historical-events, onb02-r73-tax10-cli, onb02-r72-backfill. Preservar verificação da preparação e hashes.
6. Aplicar somente patch reversível pinado. Iniciar observador externo; executar uma única vez timeout --signal=TERM --kill-after=10s 300s npx tsx --test test/onb02-r7-audit.integration.test.ts. Produto mantém150k/5k/asserts. Nenhum ANALYZE/aquecimento/EXPLAIN adicional. Semantic gate ops/onb02/ci-evidence-pg18.sh apenas se R7 exit0.
7. Capturar resultado bruto; após encerramento do produto, encerrar observador pelos meios já delimitados, colher arquivo de eventos/flush/status, planos sanitizados e logs. Agregar separadamente os três resultados e preservar arquivos/hashes, inclusive falhas. Cleanup somente dos containers descartáveis identificados.
8. Parar sem reparo/retry se preparação/hash/ambiente divergir, observação inválida ou limites esgotados. Se não houver tempo no job, segunda árvore fica NOT_RUN; não aumentar limite nem executar outra tentativa. Falha do produto conserva sua falha. Duas passagens apenas significam não reprodução nessa observação; causa continua NOT_PROVEN. Nenhum resultado libera #285 automaticamente.

## Gate atual
Somente revisão deste candidato/planejamento. Sem par PG18, rerun ou dispatch ativo; sem merge/deploy/produção. #285 bloqueado, causa NOT_PROVEN. #143 permanece tecnicamente aceito sem autorização de integração; #125 pendente de revisão independente. Nenhuma ação do Fábio necessária agora.
