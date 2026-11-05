# R7 — desenho de remediação da instrumentação (não implementado)

Frente 2 — Pendências Gerais: 10%, 5/50 aceitas; avanço +0.
Estado: proposta para revisão independente. Não há aceite de equivalência, autorização de implementação ou orçamento para novo par.
Referência imutável: relatório/contraexemplos/traços em edb2763d8520ee0d600effaab547ebe4a425bab0. Estes arquivos permanecem intactos.

## AS IS e contrato TO BE

AS IS: instrumentPool substitui pool.connect, client.query e pool.query. O caminho de Promise do wrapper não conserva o listener temporário fatal do pool.query nativo. Consultas de settings/snapshot são aguardadas no cliente adquirido; falhas antes da operação podem impedi-la, e falha após COMMIT pode converter sucesso já confirmado em rejeição. O helper release(error) corrigido não elimina essas diferenças.
TO BE: execução, callback interno, listeners, liberação/descarte e propagação de resultados/erros permanecem sob responsabilidade exclusiva de pg/pg-pool nativos. Observação nunca executa release, rollback, cancelamento, retry ou reenvio. Falha da observação pertence a um canal separado, invalidando evidência afetada sem substituir o resultado do produto.
Não prometer equivalência de timing: até listeners passivos e auto_explain consomem CPU e podem influenciar escalonamento. Doubles caracterizam contratos e contraexemplos; não comprovam equivalência PG18 nem a causa da falha histórica.

## Alternativas

| Aspecto | 1 — pool.query nativo + eventos passivos e observação externa | 2 — somente observação externa |
|---|---|---|
| Métodos de produto | Não substituir pool.query/connect/client.query/release/end | Não substituir nem anexar observadores ao pool do teste |
| Pontos locais | Eventos públicos connect/acquire/release/remove; nenhum novo listener error | Nenhum evento local |
| SQL auxiliar | Somente conexão independente do observador | Somente conexão independente do observador |
| Aquisição/reutilização/descarte | Eventos do pool, sequência local e identidade efêmera do cliente | Apenas indícios por PID amostrado; não prova checkout/release |
| Erro nativo | release recebe erro que o nativo já decidiu; não editar o objeto | SQLSTATE somente se já exposto pelo teste/log original |
| Queries/resultados | Não captura argumento, resultado ou Promise de query | Também não captura |
| COMMIT/ROLLBACK | Sem gancho exato; só planos/logs permitidos e amostras | Mesma limitação |
| Ordinal/duração por batch | Não recuperável com rigor só pelos eventos de pool | Não recuperável com rigor por amostragem |
| Overhead adicional no processo do teste | Eventos síncronos e buffer limitado | Nenhum hook adicional; ainda há auto_explain/observer e I/O |
| Robustez contra falha de observador | Exige coletor local mínimo que não lance e canal separado | Falha do processo externo isolada do resultado do teste |

As duas alternativas removem os snapshots executados na conexão do produto e as substituições de métodos. Não são duas implementações aprovadas. Não compensar perdas adicionando wrappers, monkeypatch global, Promise.then/finally no retorno de pool.query, Query callbacks, listeners error ou captura de SQL/valores sem novo desenho.
Auto_explain já aprovado continua sendo instrumentação no servidor, mesmo na alternativa externa; o termo externo descreve ausência de hooks no processo do teste, não ausência de overhead no banco.

## Alternativa 1 — pontos de intervenção propostos

1. Remover no futuro o wrapper de query/connect e o patch por cliente; preservar o snapshot antigo como evidência. Conferir identidade dos métodos nativos antes/depois de anexar o observador. O patch reversível de preparação não deve chamar instrumentPool antigo.
2. Anexar somente handlers aos eventos públicos connect/acquire/release/remove de cada pool R7 criado, incluindo reabertura. Nenhum listener de error adicional: instalá-lo poderia transformar erro não tratado em tratado. Não usar _clients/_idle nem alterar listeners do driver. Não mutar o cliente ou erro; identidade efêmera via WeakMap, sem publicar identificadores reais.
3. Handler faz somente append de registro mínimo em buffer de tamanho fixo, sem await, SQL, fs, console ou formatação pesada. Registra sequência monotônica, tipo, ID local e código de erro primitivo seguro quando disponível. Todo acesso/append deve ser protegido para não lançar; não chamar toJSON/getters arbitrários de objetos do produto. Se não for possível ler com segurança, marcar campo indisponível.
4. Buffer tem limite explícito fixado no desenho implementável; ao atingir limite, marcar perda/overflow e parar coleta local, nunca ampliar nem bloquear. Flag e contador separados. Persistir fora da seção observada, sem substituir retorno/erro do teste. Falha de flush marca evidência inválida. O mecanismo não pode garantir imunidade a OOM, falha fatal do runtime ou morte do processo; declarar limite.
5. Remover exclusivamente os handlers anexados, por referência, em teardown. Não chamar removeAllListeners. Não esperar flush no caminho de COMMIT/query nem instalar tratamento global de unhandledRejection/uncaughtException.
6. Manter observador externo com conexão própria/autocommit/read-only. Mover snapshots selecionados para esse canal em cadência/limites aprovados, sem aumentar consultas por amostra inadvertidamente. Se não couberem no orçamento já aprovado, registrar indisponibilidade e submeter novo orçamento antes de implementação; não ampliar silenciosamente.
7. Verificação de GUCs por conexão do produto deixa de ser possível por SQL auxiliar nesse cliente. Usar contrato de preparação, opções fixadas, logs e configuração observável externamente; distinguir configuração esperada de valor efetivo individual NOT_PROVEN. Não alegar prova equivalente.
8. auto_explain e coleta de logs mantêm parâmetros/sanitização/limites aprovados. Falta de plano concluído após timeout não é autorização para EXPLAIN adicional. Eventos de pool não permitem inferir COMMIT bem-sucedido, duração SQL ou ordinal exato.

## Alternativa 2 — pontos de intervenção propostos

Retirar toda importação/chamada do módulo no teste. Manter somente preparação fixa permitida para auto_explain e processo independente de observação. Preservar teste/asserts/SQL de produto e registrar hashes antes/depois; separar qualquer ajuste de opções de conexão permitido da retirada de wrappers.
Fontes: saída original do teste, logs sanitizados de planos concluídos, pg_stat_activity/locks/estatísticas com conexão auxiliar e métricas do host. Sem consulta auxiliar pela sessão do produto.
Perdas adicionais: não mede aquisições/releases por checkout, cardinalidade exata de reutilização/descarte ou ordem fina dos erros no driver. PID amostrado não prova causalidade com um batch; ausência de blocker em amostra não prova ausência de lock entre amostras.
Vantagem: menor intervenção no processo que executa R7 e melhor isolamento de falhas do coletor. Limite: menor poder para diagnosticar a semântica do pool, nenhuma prova de equivalência de servidor e overhead do observador/auto_explain continua não isolado.

## Contrato de resultado e de evidência

Manter três campos independentes:
- product_outcome: saída/código terminal original do teste, inclusive falha/timeout; preservar código e identidade do erro dentro do processo.
- observation_outcome: COMPLETE / INCOMPLETE / INVALID, com motivo, arquivos/hashes e lacunas. Collector failure não reescreve product_outcome.
- diagnostic_conclusion: NOT_PROVEN por padrão; conclusão mais forte exige evidência suficiente e revisão independente.

Em qualquer falha de observação, preservar o produto até seu término/limite original; não interromper, repetir ou reparar para completar evidência. Agregador pode sinalizar falha da coleta em status separado; o relatório nunca deve converter produto PASS em produto FAIL ou o inverso. O código de saída original do produto fica explícito mesmo se o job agregado falhar por evidência inválida.
Falha após COMMIT deve constar somente como observation_error; não induzir nova gravação/retry. Se o processo inteiro morrer, resultado passa a indisponível/interrompido conforme saída real, sem inferir sucesso.
Não registrar conteúdo de publicações, parâmetros SQL, credenciais ou identificadores produtivos. Ambiente é sintético.

## Critérios de teste para futura implementação autorizada

| Área | Prova exigida |
|---|---|
| Identidade nativa | pool.query/connect e client.query/release sem substituição; nenhum hook global; versões/lockfile/source hashes fixados |
| Sucesso/erro SQL | Mesmo resultado/erro e mesma semântica nativa; P0001/57014, throw síncrono, falha de conexão |
| Fatal assíncrono | Contraexemplo original preservado; executar cenário em subprocesso isolado para comparar também comportamento fatal real do EventEmitter, sem capturar artificialmente como equivalência |
| Callbacks tardios | Falha fatal seguida de callback não gera dupla release; handlers nativos conservados |
| Transações | BEGIN/COMMIT e erro seguido de ROLLBACK em cliente explícito; observador não executa transação nem substitui sucesso pós-COMMIT |
| Falhas do coletor | Simular append/serialização/flush indisponíveis, buffer cheio e coletor externo encerrado; produto mantém resultado, evidência INVALID/INCOMPLETE |
| Listeners | Comparar baseline nativo por fase, incluindo resíduo síncrono já documentado; teardown remove só handlers próprios; nenhum novo error listener |
| Pool | Aquisição/release por checkout, descarte/reutilização, reabertura e fila com max2 em doubles; não mudar max do produto |
| Ordem e timing | Traços completos e projeção documentada; explicitar eventos auxiliares/microtasks; nenhum benchmark offline tratado como overhead PG |
| Preservação | Hashes de teste/asserções/SQL e preparação antes/depois; diff permitido delimitado; nenhum timeout, volume ou asserção alterado |
| Isolamento | Runner de doubles não abre sockets/não chama Docker/CI; workflow de observação não é disparado pela entrega |
| Externo | Para alternativa2, evidenciar ausência de handlers e teste intacto; métricas ausentes explicitadas, sem inferir checkout/ordinal por PID |

Novos testes devem comparar o módulo nativo real das versões fixadas, não reimplementar o algoritmo do pool em doubles. Preservar os traços completos antigos e gerar novos arquivos com referência aos anteriores. Aprovação desses testes não autoriza PG18; orçamento e execução permanecem gates separados.

## Recomendação, impacto e decisão de cobertura

Recomendo tecnicamente a alternativa1 como candidata, por preservar o caminho nativo e permitir observar aquisição/release sem envolver queries/Promises. Ela ainda precisa provar isolamento dos handlers e exige declarar perda de medições exatas. Alternativa2 é preferível se for impossível demonstrar contenção de falhas/overhead do coletor local; não adotá-la por conveniência sem decidir cobertura.
Nenhuma alternativa mantém o contrato anterior de snapshot por conexão/COMMIT/batch. Não aceitar essa redução silenciosamente. Não proponho correção funcional de R7 nem mudança de teste do produto.

🔴 DECISÃO DO FÁBIO — AGUARDANDO
ID: F2-R7-OBS-COVERAGE-01
Pedido: antes de implementar um desenho que retire medições do contrato anterior, decidir a cobertura revisada da observação.
Escopo aprovado: instrumentação equivalente nas duas árvores, verificação por sessão, snapshots e métricas delimitadas; equivalência ainda não aceita.
Mudança proposta: substituir wrappers por eventos passivos e observação externa (alternativa1), ou somente externa (alternativa2); perder confirmação efetiva de GUC por sessão e snapshots exatos pós-COMMIT/pré-batch; alternativa2 perde também checkout/release.
Motivo: diferenças semânticas demonstradas nos contraexemplos impedem tratar o wrapper como observador transparente.
Impactos e alternativas: menor interferência, menor precisão/cobertura; alternativa1 conserva eventos do pool; alternativa2 isola melhor o coletor. Manter desenho antigo preservaria medições, mas preserva também as diferenças conhecidas, não recomendável.
Recomendação: revisão técnica independente primeiro; submeter alternativa1 com perdas explícitas para decisão de cobertura antes de implementação. Não exigir ação imediata do Fábio nesta entrega.
Trabalho dependente que ficará parado: implementação com cobertura reduzida, aceite dessa cobertura e qualquer novo par PG18. Nenhuma decisão é presumida; nenhum orçamento adicional concedido.

## Estado preservado e próximo gate

#143@0aa605c7 permanece tecnicamente aceito e CI41937960075 SUCCESS, sem autorização de merge/deploy; regra Railway ainda pendente de leitura comprobatória. #125 continua pendente de revisão independente. #285 bloqueado, causa R7 NOT_PROVEN.
Próximo gate: parecer independente deste desenho e encaminhamento da decisão de cobertura quando maduro. Esta entrega só adiciona este documento ao controle#127; não altera harness, testes, workflows, infraestrutura, timeouts, volume ou asserções e não executa nenhum ensaio.
