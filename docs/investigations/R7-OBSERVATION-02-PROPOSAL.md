# R7 — proposta de observação 02 — NÃO EXECUTAR
Frente 2: 10%, 5/50 aceitas. Proposta documental; nenhuma execução adicional autorizada por este documento.

## AS IS
O par observacional 01 executou uma tentativa por árvore no run 41930483691. Ambas passaram, mas a instrumentação de pool.query usava release() após erro, divergindo de pg-pool release(error). Resultado limitado, causa NOT_PROVEN; #285 bloqueado.
#287 @2a1b8f22dee48db9938d13df6508ab713d012c54 corrige esse ponto; quatro testes independentes passaram conforme instrução do COORD. Isso não comprova sozinho equivalência integral do harness. #125 permanece pendente de revisão independente.

## Hipótese e alternativas
A divergência de descarte/reabertura da conexão pode alterar estado de sessão, cache e planos após a interrupção sintética. Estatísticas/cardinalidade e seleção de plano continuam hipóteses para a falha original; concorrência, CPU/I/O e waits também permanecem abertas. O par anterior não confirma nem elimina essas causas.

## TO BE proposto e prova prévia de equivalência
Antes de qualquer novo CI, submeter a revisão independente uma comparação do harness com pg/pg-pool nas versões do lockfile (pg 8.23, pg-pool 3.14). Registrar hashes do módulo, lockfile, teste original e patch efetivo em cada árvore.
Mapear todos os usos reais: pool.query com Promise e pool.connect com transação explícita. Confrontar código nativo e instrumentado para resultados, identidade do erro, SQLSTATE, release exatamente uma vez, descarte após erro e reutilização após sucesso; cobrir falha de conexão, rejeição SQL, exceção síncrona, erro assíncrono fatal, COMMIT/ROLLBACK e limpeza de listeners. Não declarar equivalência das APIs callback sem evidência; demonstrar que elas não são usadas pelo teste e que os callbacks internos nativos relevantes foram preservados.
Testes de equivalência com doubles devem produzir traços comparáveis de aquisição/query/release(error), listeners e retorno/rejeição, sem executar novamente o ensaio de 150k. A prova deve mostrar que métricas/snapshots não abrem transações ou alteram sessões do produto. No eventual par, registrar também PID antes/depois do erro sintético para confirmar descarte, sem impor comportamento diferente do nativo.
Qualquer diferença não explicada bloqueia a observação. A correção já revisada não dispensa essa prova.

## Orçamento e condições propostas
Zero novas execuções nesta entrega. Após aprovação específica da proposta e do HEAD/harness: somente um par adicional, duas tentativas totais, uma por árvore, sem retry. O orçamento anterior de duas tentativas foi consumido; não reutilizar aquela autorização.
Ordem fixa: controle b2150ab5ef34e9f9646e219d522e47738d9c04f5 e integração 2c41fbab8169b7efca6bd2e80c963d57a50585b6, cada qual em cluster descartável novo, no mesmo job/host. Confirmar árvores e sequência de preparação equivalentes ao desenho aprovado #127.
Preservar postgres:18-bookworm@sha256:5c4783a8cc3f0074912164f94dfa1be4e043438f0f707cf968d7af9a0d31a2c8, PG18.6, Node24.22.2, 150k registros sintéticos, lotes5k, statement_timeout45s, lock_timeout5s, pool2, jit off, teste240s, comando300s e job14min. Não mudar asserções, SQL funcional, migrations ou preparação. Não adicionar ANALYZE, aquecimento ou EXPLAIN ANALYZE separados.
Instrumentação idêntica nas duas árvores: auto_explain restrito às sessões R7 com parâmetros omitidos, snapshots e observador limitado a 1Hz/300 amostras/300s, queries900ms/lock500ms, conforme contrato aprovado. Registrar duração individual e agregada das consultas auxiliares, número de amostras/erros e limites; overhead total continua não isolado sem grupo de controle próprio, que não está proposto.

## Critério de parada e interpretação
Não iniciar se equivalência, digest, versões, árvores, GUCs, hashes ou preparação divergirem. Falha de predecessor, timeout, cancelamento, erro inesperado ou falha do teste encerra o respectivo caso como falha; não reparar nem repetir. A segunda árvore só segue se ambiente e instrumentação permanecerem válidos e houver orçamento do job, preservando o resultado da primeira.
Observador encerra no limite; não ampliar coleta. Preservar exit codes e logs, com limpeza apenas dos containers descartáveis. Falta de plano, amostras ou estatísticas suficientes torna a conclusão limitada/NOT_PROVEN, sem nova tentativa automática.
Se ambas passarem: falha original não reproduzida, causa NOT_PROVEN. Se uma falhar: relacionar ordinal, SQLSTATE, plano disponível, waits/locks e estatísticas, distinguindo correlação de causalidade. Observação instrumentada não substitui CI original nem libera #285.

## Impacto e próximo gate
Apenas laboratório PG18 descartável, dados sintéticos e custo limitado a duas tentativas propostas. Nenhuma mudança produtiva ou funcional; nenhum timeout, volume ou asserção reduzido.
Próximo gate: parecer técnico independente sobre equivalência e desenho, seguido de autorização específica antes de execução. Nenhuma ação do Fábio necessária nesta etapa documental; não executar por silêncio ou por este documento.
