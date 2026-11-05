# F2 / ONB-auditoria R7 — origem dos150mil e proposta de dimensionamento

Data:05/11/2026 (America/Sao_Paulo). Frente2:10%,5/50 aceitas,+0.
Estado: investigação documental e proposta para decisão. Nenhum teste, matriz PG18, preparação SQL, rerun ou dispatch executado.
Responsabilidade: R7 é auditoria/ONB nas Pendências Gerais; #285 é dependente afetado. Esta entrega não implementa Anatomia do Ato.

## 1. Origem rastreada e limite da conclusão

A introdução localizada do arquivo test/onb02-r7-audit.integration.test.ts é o commit backend [f233944ea2641494faf4133a99d52cb5475d907e](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/commit/f233944ea2641494faf4133a99d52cb5475d907e), em19/10/2026, associado ao PR#246. A fixture já nasce com100000 eventos company +50000 eventos TAXONOMY_CURATION_IMPORT. O mesmo commit introduz docs/audit-policy-r7.md e inclui o cenário150k no CI.
O pai bec85bfe0b87042f887d54976ed788b3988e8467 ainda usava a abordagem anterior. A revisão [5569950000](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/246#pullrequestreview-5569950000), anterior ao novo commit, reproduziu crescimento de custo e cancelamento em123000 auditorias na minimização textual antiga, recomendando variar volume/JSON/concorrência sem aumentar timeout.
Isso fornece contexto técnico para um ensaio de histórico maior, **não prova que150000 tenha sido calculado a partir de123000**, imposto como mínimo por negócio ou dimensionado pelo tráfego diário. Não encontrei essa derivação nos documentos/reviews/checkpoints examinados.
A primeira entrega R7 [#118 comentário6265538548](https://github.com/fabiojuniort-cyber/tribusca-control/issues/118#issuecomment-6265538548) registra150k como evidência sintética de purga/backfill. O follow-up R7.1 [6276413591](https://github.com/fabiojuniort-cyber/tribusca-control/issues/118#issuecomment-6276413591) o conserva como regressão de volume; a revisão [5579902999](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/246#pullrequestreview-5579902999) também registra150k como benchmark, explicitando que não é SLO produtivo.
Portanto: **origem no código e adoção como regressão comprovadas; justificativa quantitativa exata do número150000 NOT_PROVEN**. Não apresentá-lo como volume diário, contagem produtiva atual, requisito legal ou limite de capacidade universal.

Busca delimitada: histórico Git do caminho do teste (7 commits retornados), diff de introdução, política original, reviews do PR#246 e checkpoints da #118/#124. Referências de outros assuntos foram descartadas da análise. Não houve nova consulta produtiva.

## 2. O que o teste atual efetivamente demonstra

Referência fixa [teste @2c41fbab](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/2c41fbab8169b7efca6bd2e80c963d57a50585b6/test/onb02-r7-audit.integration.test.ts):
- 100k eventos de empresa, distribuídos entre2 tenants, com contexto permitido e campos privados/nested/NFD a remover;50k eventos de curadoria com contexto permitido a conservar. Todos entram no legado pendente; mesmo linha com payload permitido precisa receber marcador de política.
- `--plan` é somente leitura, inclusive checkpoint.
- Lote com erro sintético é atômico: não avança pendência/checkpoint.
- Lotes5k: interrompe após3 commits/15000 processados; fecha pool, abre outro, retoma135000 restantes.
- Repetição termina sem alterações; cabeçalhos/autor/tenant/correlação, contexto permitido e entidade de negócio preservados por comparação/asserções.
- Auditorias ficam conformes à projeção;66667 COMPANY_UPDATED e33333 COMPANY_CREATED conservam exatamente contexto permitido.
- O arquivo também cobre rejeição de gravações fora da allowlist e histórico/isolamento tenant. Os testes R7.1/R7.2 e outros predecessores têm coberturas próprias; este cenário não substitui toda a política de auditoria.

O [serviço audit-backfill.ts](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/2c41fbab8169b7efca6bd2e80c963d57a50585b6/src/modules/audit/audit-backfill.ts) faz preflight e chama um lote SQL por commit. A [função na074](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/2c41fbab8169b7efca6bd2e80c963d57a50585b6/migrations/074_audit_allowlist_and_backfill.sql) verifica pares ação/tipo no histórico, seleciona pendentes ordenados, atualiza e conta restantes/checkpoint.
Logo, reduzir pendentes pode reduzir trabalho por ciclo, número de ciclos e custo da varredura global. Não implica relação linear nem elimina influência de estatísticas, cache, versões físicas da tabela e preparação.
O cenário150k tem timeout de teste240s e sessão45s/lock5s/max2. Medir elapsed não constitui asserção de SLO por lote ou limite produtivo. Falha original em #285 não prova defeito de capacidade geral; causa segue NOT_PROVEN.

## 3. Quantidades que não são intercambiáveis

| Quantidade | Significado | Uso correto |
|---|---|---|
| Atos/publicações por dia | Documentos oficiais novos/consultados; deduplicação/retries podem afetar contagens de coleta | Dimensionar ingestão, fontes e processamento de publicações |
| collection_items | Itens/tentativas/resultados de coleta | Não equivale automaticamente a atos únicos ou auditorias |
| Eventos audit_log por dia | Ações de cadastro, perfil, administração, curadoria etc., em múltiplos tenants | Dimensionar produção diária de auditoria com inventário dos escritores |
| Histórico total audit_log | Eventos acumulados, inclusive já processados | Afeta leitura global de tipos/preflight e cardinalidade de tabela |
| Pendentes de tratamento | Subconjunto com política/ator ainda pendente | Afeta atualizações, número de lotes e checkpoints |
|150k da fixture R7 |100k empresa +50k curadoria sintéticos, pendentes | Ensaio histórico, não taxa diária de ingestão |

Histórico: H(t+1)=H(t)+eventos novos−remoções efetivas; pendência P não é necessariamente H. Operações de auditoria ocorrem fora da importação de atos e a relação não é1:1; um lote de curadoria pode registrar um evento com contador de muitas linhas. Nenhuma taxa real atual foi medida nesta etapa.
Por isso, usar “duas vezes os atos importados por dia” como substituto de150k auditorias não tem unidade causal adequada. Se futuramente for necessário dimensionamento operacional, levantar taxa de auditoria, retenção efetiva, total/pendentes, distribuição de políticas/JSON e tenants por autorização própria; não pedir ao Fábio investigação técnica ou executar consulta produtiva agora.

## 4. Proposta: escada diagnóstica, sem substituir o aceite original

Sugestão para decisão: **6000 →18000 →45000 pendentes sintéticos**, lote fixo5000, na mesma proporção2/3 empresa e1/3 curadoria, com os mesmos campos/tipos/Unicode/tenants.
Motivos:6000 cruza o limite de um lote e gera cauda;18000 conserva3 commits antes de reiniciar e uma retomada não vazia com cauda;45000 exercita9 lotes completos e6 após reinício. Valores escolhidos por fronteiras do algoritmo, não por previsão diária nem ponto de falha conhecido.

| N pendentes | Empresa / curadoria | Commits de lote esperados* | Após3 primeiros commits ou esgotamento | Retomada após fechar pool | Garantias alcançáveis e perdas |
|---:|---:|---:|---|---|---|
|6000|4000 /2000|2|6000 processados,0 restantes,completed=true|0 processados|Atomicidade,mais de um lote,cauda,idempotência,preservação; NÃO demonstra retomada com pendentes após3 commits nem escala150k |
|18000|12000 /6000|4|15000 processados,3000 restantes,completed=false|3000|Retomada real após3 commits,cauda e invariantes; somente4 lotes/escala menor |
|45000|30000 /15000|9|15000 processados,30000 restantes,completed=false|30000|Retomada de múltiplos lotes completos e invariantes; não cobre30 lotes nem cardinalidade150k |
|150000 original, preservado fora da matriz|100000 /50000|30|15000 processados,135000 restantes|135000|Regressão original de maior volume; ainda não é capacidade/SLO de produção |

*Commits bem-sucedidos da fixture principal; além disso cada caso mantém uma tentativa sintética que falha e faz rollback. Não contar rollback como lote processado. Preparação/outros testes não integram essas contagens.
Por ação, espera-se created=floor((2N/3)/3) e updated=(2N/3)−created; não presumir proporção exata por lote porque UUIDs ordenam seleção. Gerar expectativas independentes verificadas offline e invariantes de contagem, sem remover comparações de cabeçalhos/contexto/entidade/checkpoint.
Os6000 não podem passar pelas asserções originais de135000 restantes: exigem um **cenário diagnóstico novo e explicitamente rotulado**, com expectativas correspondentes ao N. O arquivo/gate original150k permanece byte a byte intacto. Não remover sua asserção, aumentar timeout ou chamar o resultado reduzido de PASS do original.
Futura implementação só após decisão/revisão: gerar fixture diagnóstica em laboratório, com diferenças de constantes/contagens enumeradas e hash próprio por N. Os pins atuais do preparador recusam outro hash: mantê-los até delta revisado, sem desligar verificação ou parametrizar por env silenciosamente.

## 5. Preparação não é pequena só porque N é menor

O [predecessor onb02-r6-purge.integration.test.ts @2c41fbab](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/2c41fbab8169b7efca6bd2e80c963d57a50585b6/test/onb02-r6-purge.integration.test.ts) cria sua própria fixture de150k auditorias e420k collection_items, confirma transações, executa ANALYZE audit_log/collection_items e remove auditorias privadas no finally; o próprio comentário declara que itens globais ficam para testes seguintes.
Assim,6k/18k/45k são os novos pendentes do cenário-alvo, NÃO tamanho máximo da tabela/disco nem de todo o job. Estatísticas e histórico físico dos predecessores podem influenciar o resultado.
Recomendação: manter sequência de preparação igual nas duas árvores e entre degraus; não retirar predecessor/ANALYZE preexistente ou modificar suas massas nesta proposta. Não adicionar ANALYZE extra, aquecimento ou EXPLAIN ANALYZE separado. Mudar a preparação para economizar custo criaria outro protocolo a revisar.
Sem expectativa de redução proporcional do custo total: a matriz executa mais preparações do que um par. Apenas soma dos novos pendentes R7 na matriz completa=2×(6000+18000+45000)=138000, contra300000 de um par150k; isso não inclui o trabalho dos predecessores.

## 6. Orçamento proposto e parada — nenhuma execução concedida

Máximo proposto:3 degraus, cada um1 par controle→integração, **até6 tentativas PG totais**, uma por árvore/volume, zero retries. Um job por degrau, limite existente14min/job (teto agregado42min), execução sequencial. Não é o orçamento antigo de2 tentativas; não herdar autorização nem ativar automaticamente.
Árvores fixas: controle b2150ab5ef34e9f9646e219d522e47738d9c04f5 e integração2c41fbab8169b7efca6bd2e80c963d57a50585b6. Cluster descartável novo por tentativa, dados sintéticos, PG18.6/imagem digest5c4783a8cc3f0074912164f94dfa1be4e043438f0f707cf968d7af9a0d31a2c8/Node24.22.2 e preparação do plano anterior.
Preservar45s/5s,max2,240s/comando300s/job14min,lotação5k; coleta passiva2048/pool/16pools e externa300 amostras/300s/1Hz/900ms/500ms. Não aumentar orçamento externo por volume. Coleta e resultado do produto separados; logs/hashes/exit codes originais preservados.

Parada por degrau/matriz:
1. Não iniciar sem aprovação específica de matriz, volumes, cobertura, orçamento e HEAD final de ativação revisado. Candidato atual permanece bloqueado.
2. Falha em ambiente, hash, preparação, invariantes, timeout/lock ou evidência inválida: preservar resultado, parar toda a matriz sem retry e não subir de volume. Se a segunda árvore ainda não rodou, fica NOT_RUN; ausência de par completo limita conclusão.
3. Divergência entre árvores ou falha reproduzida: parar; comparar evidências disponíveis, sem outro ensaio para “confirmar”. Correlação não vira causa comprovada.
4. Só subir ao degrau seguinte se ambas passarem com evidência válida e orçamento remanescente. Sem paralelismo entre volumes; sem alterar estatísticas/configuração para fazer passar.
5. Se limite do job impedir terminar, registrar tentativa interrompida/NOT_RUN e parar; não aumentar timeout nem reenfileirar.
6. Se todos os3 degraus passarem: falha não reproduzida até45k nesse protocolo, causa NOT_PROVEN. Não executar150k por consequência. Não liberar #285 nem substituir aceite original.
Nenhum workflow/dispatch é criado nesta etapa; futura ativação manual exige autorização própria e revisão, sem gatilhos push/ready/synchronize.

## 7. Recomendação AS IS / TO BE / impacto e decisão

AS IS: regressão150k foi introduzida como fixture histórica sintética e conservada em revisões; mínimo quantitativo de negócio/ligação a atos por dia não localizado. Último candidato de executor @b2720cd9 recebeu APPROVED técnico OFFLINE em [#124 comentário6658477632](https://github.com/fabiojuniort-cyber/tribusca-control/issues/124#issuecomment-6658477632), sem execução concedida.
TO BE recomendado: aprovar um diagnóstico separado por6000/18000/45000, no máximo6 tentativas, parada antecipada, mesma preparação e limites; manter teste/aceite original150k e #285 bloqueado.
Impacto: isola fronteiras do algoritmo e pode localizar falha com menor massa-alvo; aumenta quantidade de preparações e perde prova de escala150k nos diagnósticos. Nenhuma mudança produtiva, funcional ou de ANAT. Reduzir gate definitivo é outra decisão, não proposta como consequência automática.

🔴 DECISÃO DO FÁBIO — AGUARDANDO
ID: F2-R7-SIZING-01
Pedido: decidir os volumes e o orçamento do diagnóstico separado, antes de implementar/ativar a matriz.
Escopo aprovado: investigar origem/dimensionamento e propor plano; teste original150k/lotes5k e aceites permanecem intactos; novo PG18 não autorizado.
Mudança proposta: cenários diagnósticos6000→18000→45000, no máximo6 tentativas/3 jobs14min, sem retry, com expectativas explícitas por N e perdas acima.
Motivo: pesquisar se falha aparece em fronteiras menores sem tratar volume diário de atos como volume de auditoria acumulada.
Impactos e alternativas: custo de até6 preparações; não prova escala150k. Alternativas: aprovar apenas o primeiro par6000 (teto2 tentativas; novas etapas dependeriam de outra decisão), ou manter somente o plano150k sem nova execução. Não reduzir lote, timeout ou assert original.
Recomendação: matriz progressiva com teto6, parada na primeira anomalia; não aceitar resultados menores como liberação do original.
Trabalho dependente que ficará parado: implementação dos cenários variáveis, alteração de pins/ativação e toda execução da matriz; #285 permanece bloqueado.
Sem resposta explícita, manter AGUARDANDO. Esta entrega não muda o volume executável nem autoriza uma tentativa.

## 8. Estado e preservação
Somente este documento foi acrescentado, em branch documental isolada. Backend, executor bloqueado @b2720cd9, módulos passivos aprovados @881fafe6, contraexemplos/traços @edb2763d e teste original preservados. Nenhum teste PG18, matriz, rerun ou dispatch realizado.
#143 tecnicamente aceito, sem merge/deploy. #125 pendente de revisão independente. Causa R7 NOT_PROVEN; #285 bloqueado.
