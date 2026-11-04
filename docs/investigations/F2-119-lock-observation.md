# F2-119 — preparação da observação sanitizada do lock

Status: diagnóstico **não concluído**. Artefato de preparação somente leitura; nenhuma execução produtiva autorizada por este documento. Controle: [#119](https://github.com/fabiojuniort-cyber/tribusca-control/issues/119); baseline Frente 2: [#124](https://github.com/fabiojuniort-cyber/tribusca-control/issues/124).

## AS IS observado

No backend `1a6419d0d23e9815de90463731e14157e8fc09cf`, [collection-filter.direct.ts](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/collection-filter.direct.ts):

- `confirmDirectFilterRule`, linhas 223–226: statement_timeout de 11 s, lock_timeout de 2,5 s e a chave global `collection-filter-direct-rule`.
- O lock permanece durante revalidação, gravação/retomada e lotes; linha 289 limita o laço por orçamento superior a 2,5 s. Isso torna a contenção plausível, sem provar o tempo real de posse.
- `saveDirectFilterRule`, linhas 328–330: mesma chave e limites.
- A chave protege a política compartilhada; fonte/tipo distintos não significam transações independentes. Não reduzir seu escopo ou aumentar timeout por inferência.

O comentário histórico relata SQLSTATE 55P03 e reprodução isolada. O detentor/concorrência real do incidente continuam **NOT_PROVEN**. A observação atual não reconstrói uma sessão que já terminou nem identifica um incidente passado sem evidência contemporânea.

## TO BE da investigação, sem mudança funcional

Preparar uma amostra que separe lock concedido, espera e processos bloqueadores relatados pelo PostgreSQL, sem publicar identificadores privados. O [SQL proposto](119-advisory-lock-observation.sql) não altera código, timeout, permissões, sessões ou advisory locks. Não propõe aceitar a falha nem modificar o produto.

A consulta:
- filtra o banco atual, a chave bigint exata e objsubid=1; não mistura a variante de duas chaves integer;
- limita a observação a 20 linhas de locks da chave e informa truncamento; chama pg_blocking_pids apenas para esperas selecionadas;
- usa os PIDs somente internamente, sem devolvê-los;
- publica somente categorias fixas de papel/estado, contagens, tempos disponíveis e carimbo de coleta;
- não seleciona query text, application_name, IP, nomes empresariais, tenant, CNPJ, credenciais ou nomes livres de usuário;
- preserva tempos desconhecidos como NULL, distinguindo-os de zero; identifica o retorno especial de transação preparada;
- usa BEGIN READ ONLY, SELECT e ROLLBACK, sem SET de timeout, GRANT, cancelamento, término de sessão ou liberação/aquisição de advisory lock.

## Limites da inferência

- A transação/statement pode ter começado antes da aquisição do lock. **Idade da transação não é duração de posse do lock.**
- As categorias APP_ROLE/WORKER_ROLE são papéis do banco, não prova da rota HTTP ou do serviço detentor.
- Campos de atividade podem ficar ocultos pelas permissões já existentes. NULL não significa sessão inativa, ausência de espera ou duração zero. Não conceder privilégios para preencher lacunas nesta etapa.
- O estado pode mudar entre pg_locks, pg_stat_activity e pg_blocking_pids; o resultado é rotulado como observação não atômica.
- Uma amostra vazia significa somente ausência observada naquele instante. Após 55P03, a espera já pode ter sumido.
- A agregação não fornece identidade persistente nem atribui operação a um detentor específico. Correlação por classe de operação e janela temporal sanitizada ainda precisa ser comprovada em canal autorizado.
- Não criar um coletor periódico, não adicionar instrumentação ao produto e não reproduzir contenção em produção. Uma amostra deve ser aprovada no canal operacional próprio antes de uso; o mandato atual proíbe operação produtiva.
- Coleta frequente pode ter custo no gerenciador de locks. Não há loop, sleep, cron ou retry no SQL.

## Verificação realizada e próxima etapa

A sintaxe foi analisada offline pelo parser PostgreSQL 18.6 (pglast 8.7); AST conferida para três comandos (BEGIN READ ONLY, SELECT, ROLLBACK), funções de observação/lista fechada e ausência de comandos de escrita/configuração/controle. Essa análise **não é execução no servidor, teste PG18 de permissões ou prova da identidade do detentor**.

Próxima etapa executável sem produção: revisão do SQL/documentação e, quando houver PostgreSQL descartável identificado, ensaio sintético isolado da consulta e da sanitização. A execução produtiva/captura de telemetria permanece parada pelo limite operacional atual; nenhuma ação produtiva foi solicitada ao Fábio neste pacote.

## Fontes técnicas primárias

- PostgreSQL 18: [pg_locks](https://www.postgresql.org/docs/18/view-pg-locks.html), formato das chaves e limites de consistência.
- PostgreSQL 18: [pg_blocking_pids](https://www.postgresql.org/docs/18/functions-info.html), bloqueios por detentor/fila, PIDs duplicados/zero e custo de chamadas frequentes.
- PostgreSQL 18: [estatísticas/visibilidade](https://www.postgresql.org/docs/18/monitoring-stats.html), campos limitados por permissões e snapshots por transação.

Sem encerramento da #119, sem aceite de limitação e sem alteração de escopo. Revisão independente continua separada da conferência do executor.
