# F2 R7 sizing — implementação para revisão, execução aguardando PASS

05/11/2026 — Frente2:10%,5/50 aceitas,+0.
Branch: impl/f2-r7-sizing-20261105. Base82a40fc68e17ece381c1eb42faa634de90fd017c.
DECIDIDO F2-R7-SIZING-01: aprovação expressa do Fábio registrada em [#124/6660090517](https://github.com/fabiojuniort-cyber/tribusca-control/issues/124#issuecomment-6660090517) e [#127/6660091033](https://github.com/fabiojuniort-cyber/tribusca-control/pull/127#issuecomment-6660091033). Substitui AGUARDANDO do plano histórico, sem reescrever sua evidência.
Orçamento aprovado: até6 tentativas,1/árvore/volume,6000→18000→45000,3 etapas sequenciais14min,zero retry/rerun/paralelismo,parada global na primeira anomalia. Consumo nesta entrega: **0 tentativas PG18**.

## Entrega e preservação

diagnostic.mjs valida SHA2569cc1208240ba761efe055d9cff3c27c58e25be2824214ee6ace0ab6501055346 do original150k e gera outro arquivo: test/onb02-r7-sizing-diagnostic.integration.test.ts. O original nunca é sobrescrito, sendo novamente verificado no finally. O gate/CI/backend também não são alterados.
Diferenças autorizadas no diagnóstico:10 ocorrências numéricas enumeradas de massa/contagens, expectativa completed correspondente ao volume e título explicitamente DIAGNOSTIC. O patch passivo somente envolve o ponto de construção do Pool e registra hook de flush independente; SQL/asserts de produto, falha sintética, fechamento/reabertura e invariantes preservados, com contagens recalculadas. Todos os SQL literals são iguais exceto os2 limites de generate_series.
Pins dos módulos passivos, preparador, observador externo e agregador previamente revisados são idênticos aos de881fafe6/b2720cd9; hashes completos e gerados em hashes.json. Os contraexemplos/traços anteriores permanecem intactos.
run-stage.mjs mantém ordem dos predecessores e scripts originais, incluindo massa150k/420k e ANALYZE preexistente. Não há chamada ao teste original150k no cenário-alvo nem alteração de sua aceitação; os predecessores conservam suas massas. A preparação não se torna pequena só por reduzir novos pendentes.
Cada caso usa checkout/backend e cluster descartável independentes; controle e integração no mesmo job/host. Jobs de volumes diferentes podem usar hosts diferentes; não inferir causalidade/performance apenas comparando tempos de jobs.

## Workflow e jobs exatos

Workflow candidato: **.github/workflows/f2-r7-sizing-manual.yml**, nome “F2 R7 sizing manual single-use grant”.
Jobs: **stage_6000 →stage_18000 →stage_45000**, cada qual14min, needs em cadeia e somente sucesso permite próximo degrau.
Inputs obrigatórios:
- reviewed_head: SHA completo desta implementação aprovado pelo COORD.
- review_comment_id: ID de comentário na #127 com linha exata COORD_PASS_R7_SIZING seguida de espaço e SHA completo aprovado.
O comentário deve vir da conta fabiojuniort-cyber e pertencer à #127. O gate consulta GitHub em leitura e recusa referência/HEAD/autoria divergentes.
Apenas workflow_dispatch. Sem push/PR/ready/synchronize/schedule/workflow_call/repository_dispatch. Rerun é recusado por GITHUB_RUN_ATTEMPT!=1. A primeira execução deste workflow reserva o orçamento do grant em todos os HEADs; qualquer run anterior com ID menor bloqueia outro dispatch. Isso é conservador: mesmo um dispatch que falhe antes de PG não pode ser repetido sob o mesmo grant sem decisão distinta. Não foi feito dispatch para testar.
A consulta de runs é paginada, falha fechada em erro/limite e recusa reutilização. Concurrency global sem cancelamento evita jobs de runs concorrentes; a trava de inventário recusa o segundo run. Um job chama cada árvore no máximo uma vez, em sequência. No primeiro produto não verde, preparação, hash, métrica ou observação inválida, o loop para e o job não libera o seguinte.
Token do gate só tem contents/issues/actions read; não é transmitido ao subprocesso de preparação. Checkout privado referencia o segredo OPS_BACKEND_READ_TOKEN já utilizado no controle, sem modificar segredo/permissão. Disponibilidade do segredo precisa estar válida na execução; falha encerra sem correção/retry do orçamento.

## Limites e agregação
PG18.6; imagem postgres:18-bookworm@sha256:5c4783a8cc3f0074912164f94dfa1be4e043438f0f707cf968d7af9a0d31a2c8; Node24.22.2 no job. Árvores controleb2150ab5ef34e9f9646e219d522e47738d9c04f5 e integração2c41fbab8169b7efca6bd2e80c963d57a50585b6.
Lote5000,max2,statement45s,lock5s,timeout de teste240s,comando300s,job14min. Passivo2048 eventos/pool/16pools; externo300 amostras/300s/1Hz/statement900ms/lock500ms/pool1. Não acrescenta SQL auxiliar ou ANALYZE.
Produto (código/sinal e limite do wrapper GNU timeout), validade da observação e diagnóstico permanecem separados. Flush com prefixo TAP é normalizado só para leitura da evidência; log original e exitcode são preservados. Ausência/divergência de métricas invalida observação sem falsificar produto.
Resumo e artefatos por volume: f2-r7-sizing-6000, f2-r7-sizing-18000, f2-r7-sizing-45000, retenção7dias. Artifact upload if:always preserva falhas quando o job consegue executá-lo; morte/cancelamento externo pode impedir upload, tornando evidência incompleta. Não inferir PASS sem artefatos válidos.
Se todas as etapas passarem: “não reprodução até45000 neste protocolo”; causa continua NOT_PROVEN sem prova suficiente; resultados menores não substituem150k nem liberam #285.

## Validação offline realizada
Node local v24.22.1/Linux; não é o Node24.22.2/PG18 do job. **12/12 testes PASS**, zero skip, log em offline-tests.txt.
- Modelo independente de expectativa para os3 volumes: lote com erro não confirma nada,checkpoint,primeiros lotes,estado serializado para retomada,idempotência,contagens por ação e preservação de cabeçalhos/contexto permitido.
- Modelo não executa SQL/transações/rede/PG nem prova atomicidade PostgreSQL; os asserts gerados deverão comprová-la na futura execução.
- Hash de entrada,volumes não permitidos,lista fechada de diferenças e igualdade dos SQL literals salvo generate_series.
- Gates de evento,rerun,HEAD,grant,comentário de review,segunda execução em outro HEAD/API falhando.
- Política global de parada e casos de resultado incompleto/divergente; formato TAP não esconde flush inválido.
- Subprocesso executou somente a recusa do gate em contexto não autorizado, antes de filesystem/spawn/PG; não consumiu tentativa de banco.
- Sintaxe JS do executor PASS; três fixtures TypeScript geradas passaram em transpileModule (sintaxe) sem executar testes/inicialização.
- YAML parseado: somente workflow_dispatch,3jobs sequenciais,14min cada. Não foi executado em Actions.
Guia de teste: node --test docs/investigations/r7-sizing/sizing.test.mjs. Nenhuma dependência/serviço de banco necessário.

| N | Empresa /curadoria | Criados /atualizados | Primeira parte | Retomada | Lotes confirmados |
|---:|---:|---:|---:|---:|---:|
|6000|4000 /2000|1333 /2667|6000|0|2|
|18000|12000 /6000|4000 /8000|15000|3000|4|
|45000|30000 /15000|10000 /20000|15000|30000|9|

Todos mantêm também uma tentativa de lote com erro/rollback; não conta como commit.6000 tem reabertura com0 pendentes, explicitamente sem prova de retomada não vazia após3 commits.

## Gate técnico e bloqueio de ativação da plataforma

Não há PASS do COORD neste HEAD ainda. Não executar antes dele; depois, autorização do Fábio dentro dos limites já foi dada, não solicitar de novo por orçamento.
Há também impedimento operacional identificado: [GitHub Docs, workflow_dispatch](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch) exige arquivo do workflow na branch padrão para disparo inicial. A árvore main do controle consultada só contém ops02-protocol-ci.yml,ops02-runner-ci.yml e ops02-runner.yml, sem o novo workflow. O OPS-02 existente tem allowlist read-only e gate main, portanto não foi alterado ou reutilizado para PG.
Assim, arquivo/manualização entregues **não significam workflow já despachável** sob a restrição “sem merge”. A tentativa de inventário /actions/workflows pelo conector retornou INVALID_ARGUMENT (endpoint não permitido), não foi tentativa de dispatch. A ausência na árvore main e o requisito oficial são evidências do impedimento.
Encaminhar ao COORD para compatibilizar um caminho manual existente com o limite sem merge; não publicar este workflow em main, criar gatilho alternativo, ampliar runner OPS ou infraestrutura por presunção. Este ponto não pede novo orçamento ao Fábio; eventual mudança de limite operacional exigiria decisão própria. Nenhum comando de ativação foi emitido/executado.

## Encerramento da etapa
Entrega para revisão independente do código/diff/hashes/workflow. **0/6 tentativas consumidas**, nenhum PG18/matriz/rerun/dispatch. Preparação e teste150k intactos; sem merge/deploy/produção. #285 bloqueado e causa NOT_PROVEN. #143 tecnicamente aceito sem integração; #125 pendente de revisão. Próximo passo: parecer do COORD no HEAD completo e resolução do caminho de ativação, sem autoaprovação.
