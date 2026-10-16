# ANAT — pacote documental de conferência

Origem: CLAUDE-COORD → GPT-EXEC. Base confirmada diretamente pelo Fábio: desenho GPT-6 Astra do [PR #115](https://github.com/fabiojuniort-cyber/tribusca-control/pull/115), com seções 1–10 preservadas. Coordenação: [issue #116](https://github.com/fabiojuniort-cyber/tribusca-control/issues/116). Referência proposta: 15/10/2026, America/Sao_Paulo.

## Entregas

- [ANAT-02: relatório](anat-02-leitura.md), [SQL read-only](anat-02-sql.sql), [30 fichas](anat-02-fichas.md) e [anotação dos convênios](anat-02-anotacao.md).
- [ANAT-03: planilha](anat-03-dossie-vigencia.xlsx) e [síntese das evidências](anat-03-sintese.md).
- Dados auditáveis: [trechos](anat-03-trechos.json), [dependências verificadas](anat-03-dependencias-verificadas.json), [fila de notas/dependências](anat-03-dependencias.json), [estrutura](anat-02-estrutura-resumo.json) e [sanitização local](anat-02-sanitizacao-local.json).

## Estado efetivo

O runner existente possui allowlist para outros diagnósticos e não aceita ANAT. Nenhum SQL produtivo foi executado. O SQL alternativo é para Fábio executar no Railway Dashboard, nunca pelo Railway AI Agent. **Classes e conteúdo persistidos continuam pendentes de comparação real.** A reprodução local do sanitizador está identificada separadamente no relatório.

As 30 fichas são expectativas do desenho, não resultados de parser nem medição de precisão/recall. A anotação cobre 2.444 unidades estruturais dos snapshots, com literais, XPath, células e hashes. A planilha contém 2.434 linhas por trecho/código: 2.323 do 52/91 e 111 do 100/97, além de 10 eventos de atos posteriores. Uma linha pode repetir o mesmo trecho quando contém mais de um código. NBM histórica permanece identificada separadamente de NCM.

Todas as situações individuais estão **pendentes de conferência visual**. Prazos gerais conferidos não homologam redações, variantes nem aplicação estadual. A investigação temporal não é exaustiva: dependências não lidas permanecem na fila. As duas ocorrências históricas de `8450.11.00` foram preservadas e não recebem elegibilidade corrente.

Na planilha, as colunas “Conferência Fábio” e “Observação Fábio” são editáveis. Registrar na observação o revisor, a data, o intervalo aprovado, as condições e a próxima reconferência. Marcar “Aprovado” é registro documental e não altera produto ou banco.

## Verificações

Conferidas 30 fichas, 2.434 IDs únicos, duas ocorrências `8450.11.00`, seis tabelas/2.088 linhas de tabela e hashes de fonte normalizados LF. Hashes dos arquivos locais CRLF foram preservados separadamente. Planilha exportada e renderizada nas três abas; valores de início/meio/fim, datas tipadas, listas de conferência e fórmulas de aprovação verificados. O contador foi alterado para uma aprovação e voltou a zero antes da entrega. Nenhuma aprovação ficou pré-preenchida. Sem teste em Microsoft Excel nativo.

## Próximos gates

1. Fábio executa o SQL de leitura no Dashboard e devolve os resultados oficiais para comparação do HTML/classes/hashes.
2. Fábio confere visualmente os trechos e dependências, resolve pendências temporais e registra aprovação por linha.
3. GPT-EXEC registra o retorno na issue #116 e devolve o checkpoint a CLAUDE-COORD.

Sem código de produto, migration, escrita no banco, coleta do produto, merge, deploy ou alteração Railway. Este pacote não autoriza iniciar F1–F3 nem ativar destaques/classificação vigente.
