# DATE-01 — filtro temporal interativo do Acervo

Governança: issue #60.

## Escopo aprovado

- data única por `published_on`;
- intervalo inclusivo De/Até;
- régua temporal interativa e adaptativa (dia/mês/ano);
- bloqueio de datas futuras;
- preenchimento proporcional dos períodos de borda;
- estado persistente em URL/query state e navegação;
- combinação com os filtros existentes do Acervo.

## Execução

Backend: `radar-fiscal-backend`, branch `feat/date-01-archive-date-filter`.

Frontend: `radar-fiscal-web`, branch `feat/date-01-archive-date-filter`.

Classificação: R2. Nenhuma migration prevista nesta frente; os índices de data introduzidos anteriormente pelo catálogo são reutilizados.

CAT-01 / backend PR #125 permanece congelada e fora deste escopo enquanto aguarda revisão independente.
