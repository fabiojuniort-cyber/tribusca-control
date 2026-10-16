# ANAT — pacote documental de conferência

Origem: CLAUDE-COORD → GPT-EXEC. Base confirmada diretamente pelo Fábio: desenho GPT-6 Astra do [PR #115](https://github.com/fabiojuniort-cyber/tribusca-control/pull/115), com seções 1–10 preservadas. Coordenação: [issue #116](https://github.com/fabiojuniort-cyber/tribusca-control/issues/116). Referência proposta: 15/10/2026, America/Sao_Paulo.

## Entregas

- [Continuidade de quatro horas: checkpoint atual](continuidade-4h/README.md): 105 notas triadas, 44 novas notas com candidatos para 89 IDs, ratificação do 104/21 confirmada pelo CONFAZ/AD e controle dos oito atos. Planilha e JSON principal preservados; nenhuma aprovação adicional.

- [ANAT-02: relatório](anat-02-leitura.md), [SQL read-only](anat-02-sql.sql), [30 fichas](anat-02-fichas.md) e [anotação dos convênios](anat-02-anotacao.md).
- [ANAT-03: planilha](anat-03-dossie-vigencia.xlsx) e [síntese das evidências](anat-03-sintese.md).
- [Conferência visual dos PDFs enviados pelo Fábio](pdf-conferencia/README.md): 70 páginas inspecionadas, páginas de referência e revisões dos vínculos de notas.
- Dados auditáveis: [trechos](anat-03-trechos.json), [dependências verificadas](anat-03-dependencias-verificadas.json), [fila de notas/dependências](anat-03-dependencias.json), [estrutura](anat-02-estrutura-resumo.json) e [sanitização local](anat-02-sanitizacao-local.json).

## Estado efetivo

O runner existente possui allowlist para outros diagnósticos e não aceita ANAT. Fábio executou manualmente a consulta SELECT de confirmação no Railway Dashboard e devolveu os resultados: os dois HTMLs persistidos são idênticos aos snapshots sanitizados por SHA-256. **Comparação de HTML/classes concluída.** A igualdade permite aplicar as contagens locais de classes aos HTMLs persistidos. [Consulta executada](anat-02-dashboard-confirmacao.sql), [resultado informado pelo Fábio](anat-02-dashboard-resultado.json) e limites estão no relatório. Não houve acesso direto do executor ao banco nem uso do Railway AI Agent. O diagnóstico ampliado `anat-02-sql.sql` não foi executado integralmente; `content_text`, grants/RLS e vigência não são comprovados por esse SELECT.

As 30 fichas são expectativas do desenho, não resultados de parser nem medição de precisão/recall. A anotação cobre 2.444 unidades estruturais dos snapshots, com literais, XPath, células e hashes. A planilha contém 2.434 linhas por trecho/código: 2.323 do 52/91 e 111 do 100/97, além de 10 eventos de atos posteriores. Uma linha pode repetir o mesmo trecho quando contém mais de um código. NBM histórica permanece identificada separadamente de NCM.

Fábio confirmou duas marcações em 16/10/2026: `ANAT03-00342` (39.1, revogado desde 30/12/2015) e `ANAT03-00961` (25.01(a) do anexo anterior, intervalo histórico 20/10/2008–14/10/2009). Ambas com `8450.11.00`, aprovadas somente para exclusão do texto corrente do piloto, sem elegibilidade vigente. **As outras 2.432 linhas continuam pendentes.** Prazos gerais conferidos não homologam redações, variantes nem aplicação estadual. A investigação temporal não é exaustiva; dependências não lidas permanecem na fila. [Registro das duas aprovações](lote-autonomo/aprovacoes-fabio.json).

A inspeção dos PDFs identificou notas indevidamente agregadas a itens ou variantes vizinhos no dossiê. No checkpoint `cb4d066` foram aplicadas 77 revisões pontuais de vínculo e 2.273 registros do 52/91 ficaram marcados como contexto editorial com vínculo individual pendente. Após as duas confirmações do Fábio, restam 2.271 registros nessa categoria. A coluna E distingue “Nota CONFAZ / contexto”; os contextos anteriores continuam no JSON para auditoria. No 100/97, os 111 registros tiveram o vínculo documental examinado nas oito páginas, com 27 correções. O [lote autônomo](lote-autonomo/FECHAMENTO.md) acrescenta um mapa de 176 notas, 71 ligações candidatas e pesquisa de oito atos, sem converter candidatas em aprovações.

Na planilha, as colunas “Conferência Fábio” e “Observação Fábio” são editáveis. Registrar na observação o revisor, a data, o intervalo aprovado, as condições e a próxima reconferência. Marcar “Aprovado” é registro documental e não altera produto ou banco.

## Verificações

Conferidas 30 fichas, 2.434 IDs únicos, duas ocorrências `8450.11.00`, seis tabelas/2.088 linhas de tabela e hashes de fonte normalizados LF. Hashes dos arquivos locais CRLF foram preservados separadamente. A preparação anterior exercitou os contadores e restaurou zero, sem aprovações presumidas. Neste lote, somente as duas confirmações reais do Fábio foram propagadas; contador do 52/91 = 2 e do 100/97 = 0. Demais valores, fórmulas e controles preservados, conforme validação do lote. Sem teste em Microsoft Excel nativo.

## Próximos gates

1. Concluído: Fábio executou o SELECT de confirmação no Dashboard; igualdade dos dois HTMLs/classes registrada no relatório e na issue #116.
2. Fábio confere visualmente os trechos e dependências, resolve pendências temporais e registra aprovação por linha.
3. GPT-EXEC registra o retorno na issue #116 e devolve o checkpoint a CLAUDE-COORD.

Sem código de produto, migration, escrita no banco, coleta do produto, merge, deploy ou alteração Railway. Este pacote não autoriza iniciar F1–F3 nem ativar destaques/classificação vigente.
