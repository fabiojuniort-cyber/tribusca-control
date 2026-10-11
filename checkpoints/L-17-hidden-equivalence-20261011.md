# L-17 — Equalização de publicações ocultas (checkpoint 11/10/2026)

## Quadro
- **L-15: CONCLUÍDA** — 0 publicações OUT_OF_SCOPE restantes em 11/10/2026, **contagem informada por Fábio**, sem consulta SQL independente pelo executor.
- **L-17: REVISAR** — implementação/CI sob fechamento, dependente de implantação validada e revisão funcional.
- **Frente LIMPEZA: 14/15** por decisão de CLAUDE-COORD/Fábio. O 15º item é L-17.
- **Nenhuma exclusão manual no ambiente produtivo pelo executor L-17.**

## Escopo autorizado
- Marcador atual do Acervo permanece `WHERE NOT is_hidden`. Coluna gerada e migration 029 **preservadas**.
- Fábio informou 12.339 publicações ocultas: 12.312 avisos de licitação, 26 comissões de análise de projetos, 1 portaria do coordenador geral.
- Prévia L-15 somará sem duplicar: `outOfScope`, `hiddenLegacy` e `blockedCompany+blockedOtherSource`; sem alterar botão/layout, somente texto da prévia. Publicação simultaneamente fora de escopo e oculta pertence à primeira categoria.
- Proteções de vínculos com clientes e outras origens oficiais preservadas. Ocultas não-DOU aparecem como protegidas, não são excluídas pelo fluxo DOU. Portanto, eventual saldo oculto protegido **não pode ser apagado só para igualar um marcador**.
- Scheduler 03:30 America/Sao_Paulo adiciona limpeza de ocultas apenas com retenção habilitada, limite de 20 publicações por lote, até 10 lotes/15 segundos, ledger diário separado e audit `L17_HIDDEN_PURGE`, executado por função SECURITY DEFINER com EXECUTE somente `radar_worker`. O generic purge 051 **não recebe** GRANT ao worker.
- Migration nova 056 `l17_hidden_cleanup.sql`, DDL e índice parcial; não deleta dados ao aplicar.

## GitHub e gates
- Backend [PR #209](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/209), HEAD `678f9dfeae0b38c4b1478b0c4e6211d9a8e16e8e`.
- Web [PR #98](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/98), HEAD `ae859f17a772e2a91c7565721f5f9c1fe480ba84`.
- PG18 dedicado [run 38143739185](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38143739185): **SUCCESS**, 3 testes/0 falhas, migration 056 aplicada em **PG18 isolado**, L15+L10+L17 worker-only com execução sintética, proteção cross-source e auditoria.
- Frontend CI [run 38143494432](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38143494432): **SUCCESS** incluindo Playwright.
- Backend CI [run 38143739207](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38143739207): job `verify` SUCCESS; jobs adicionais ONB-01 e DOU-CLEAN-02 ainda rodando na última observação (~10:39 BRT).
- **Bloqueio de implantação:** não mergear até todos os jobs verdes; por conter migration 056, agendar merge/deploy somente com janela Railway :20–:40, garantindo que aplicação de migration ocorra nessa janela. Não declarar production SUCCESS antecipadamente.

## Validação pós-deploy (pendente)
1. SHAs de merge backend e web e quatro deployment IDs Railway SUCCESS.
2. Log backend `Migration applied: 056_l17_hidden_cleanup.sql`.
3. Scheduler no mesmo SHA, variável `COLLECTION_ITEMS_RETENTION_ENABLED=true` preservada e log de boot saudável.
4. Prévia não destrutiva mostrar X + Y / Z; Fábio decide se executará lotes manuais.
5. Primeiro cron 03:30 validar `deletedPublications`, `batches`, ledger e ausência de impacto na coleta.
