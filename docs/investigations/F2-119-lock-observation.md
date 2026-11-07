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

## Reconferência da Frente 2 — 07/11/2026

Backend atual conferido em `bb6c61798aed34993a52e398795551ed2ca46393`. Esta rodada só lê código e registra pendências; não executa SQL, operador ou coleta de telemetria, não altera timeout nem sessões/locks.

Em linguagem simples: existe uma proteção que faz certas alterações do filtro esperarem umas pelas outras. O código confirma que duas operações usam a mesma proteção e têm espera máxima de2,5s. Isso explica como a disputa pode acontecer, mas não identifica quem segurava a proteção no erro antigo. Uma leitura feita agora não recupera uma sessão que já terminou.

| Follow-up da #119 | Evidência atual | Situação / próxima prova |
| --- | --- | --- |
| Inventário de atores em SQL, comandos e documentação | O scanner existente trata declarações, SQL literal, strings resolvidas e adaptadores array.join. O teste existente contém12 contracasos negativos. Teste focal executado:1 teste PASS, sem falhas. | Mecanismo existente confirmado; não reimplementar por causa da checkbox aberta. Varredura integral do repositório e revisão de completude não executadas nesta rodada. |
| Rótulos históricos de ator | O teste integral existente compara o registro com a guarda SQL e o mapa fechado de aliases da074; esse teste integral não foi executado aqui. | Não confundir identidade canônica com referência histórica ou valor redigido. Não publicar rótulos privados rejeitados nem conceder aceite por leitura parcial. |
| SQL NULL versus JSON null | audit_project preserva SQL NULL; valores JSON que não são objetos seguem para objeto vazio, inclusive JSON null. O teste histórico atual injeta before=null como parâmetro SQL NULL. O documento ainda afirma "before SQL NULL" sobre a evidência histórica. | A representação do incidente não está comprovada. Patch documental preparado separadamente; fixture JSON null continua pendente. Nenhum ensaio PG18 nesta rodada. |
| Detentor do lock | confirm/save mantêm a mesma chave global e lock_timeout2500ms nas linhas223–225 e328–330; o conteúdo do método não foi alterado. | Detentor e duração real de posse permanecem NOT_PROVEN. SQL do #126 preservado; nenhuma execução produtiva. |
| Cobertura do operador R8 | O laço usa uma transação por alvo, revalida inatividade, compara fingerprint das empresas ativas e para na falha. | A prova do laço completo com estado anterior à076 e falha na segunda transação continua pendente; não executar o operador para obtê-la. |
| Baseline de ativas no runbook R8 | Runbook pede active=2; script exige exatamente3inativas/1tenant/sem pendências/OWNER único e captura a quantidade de ativas como baseline, sem exigir exatamente2. | Divergência documental confirmada; não alterar o código ou reduzir a guarda de três inativas. Uma redação futura deve separar o snapshot esperado da validação automática efetiva, com revisão do artefato operacional. |

### Prova focal reproduzível

`node --test --test-name-pattern='inventory guard catches' test/onb02-r73-actors.unit.test.mjs`

Executado sobre cópia dos três arquivos exatos do SHA fixado: teste, scanner e registro. Resultado:1 teste PASS; seus12 contracasos negativos e dois positivos foram exercitados. Não é execução de todos os testes do backend, varredura integral, CI ou PostgreSQL. Nenhum fonte/corpus da Anatomia foi aberto.

Blobs: scanner `1055099a5c657ff523d75cb54a9a566284fbcc77`; teste `c02e2a04e5757986668149e5b313f5de456dea14`; registro `d48fbc7eb2a6aef42aefe1fce679a0b08af780bc`.

### Fontes fixadas e patch preparado

- [Scanner de atores](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/ops/onb02/audit-actor-inventory.mjs) e [teste focal/integral existente](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/test/onb02-r73-actors.unit.test.mjs).
- [Filtro e locks](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/collection-filter.direct.ts#L223).
- [Projeção SQL](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/migrations/074_audit_allowlist_and_backfill.sql), [contratos históricos075](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/migrations/075_audit_historical_event_rules.sql) e [fixture atual](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/test/onb02-r74-historical-events.integration.test.ts).
- [Runbook R8](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/ops/onb02/R8_OPERATOR.md#L36) e [guardas do operador](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/ops/onb02/r8-inactive-purge.mjs#L55).
- [Patch documental de NULL](F2-119-historical-null-doc.patch): aplica-se somente ao documento do backend no SHA acima. Não foi aplicado/publicado no backend. Não muda SQL, dados nem o contrato de projeção; não adiciona a fixture pendente.

A #119 permanece aberta. Nenhum item foi encerrado por presunção. Revisão independente do #126 continua pendente; a preparação não autoriza telemetria produtiva.

Validação adicional do patch documental: `git apply --check` passou em cópia local isolada do documento base. O patch não foi aplicado no backend nem altera o SQL proposto. Os três arquivos do teste focal foram conferidos pelos blobs SHA-1 antes da execução, evitando mudança de bytes por cópia local.
