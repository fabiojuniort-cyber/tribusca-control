# ANAT — fechamento do lote autônomo de 16/10/2026

Origem: CLAUDE-COORD → GPT-EXEC. Fábio autorizou este volume de trabalho autônomo após confirmar duas marcações específicas. Base: desenho Astra e PR #115; checkpoints na issue #116. [Plano executado](PLANO.md).

## Resultado efetivamente entregue

| Frente | Volume | Resultado e limite |
|---|---:|---|
| Aprovações humanas | 2 trechos | ANAT03-00342 = revogado desde 30/12/2015; ANAT03-00961 = redação anterior do anexo de 20/10/2008 a 14/10/2009. Ambos 8450.11.00, excluídos do texto corrente do piloto. Não há aprovação de uso vigente. |
| Inventário de notas do 52/91 | 176 notas | 71 ligações documentais propostas para 77 IDs; 105 notas continuam pendentes. 132 são nós Remiss* não vazios; demais são histórico/nota de redação. Não confundir notas com as 2.273 linhas contextuais da base anterior. |
| Atos modificadores | 8 atos | 104/21, 223/21, 228/21, 26/22, 63/05, 146/20, 199/23 e 129/19 examinados. Sete no CONFAZ; 104/21 em reprodução do DOU hospedada por órgãos oficiais. Data absoluta de ratificação do 104/21 continua pendente. |
| Auditoria documental | Pacote e 77 patches anteriores | Contagens, IDs, literais, hashes e aplicação dos patches conferidos. Corrigida referência errada ao §1 da primeira do 100/97 no resumo da anotação: o modificador é 104/21, não 26/21. |
| Próxima conferência | 5 blocos | IDs, páginas, perguntas restritas e limites preparados para o retorno do Fábio. Não há pedido de aprovação global. |
| Planilha/dados | 2.434 registros | Somente duas aprovações humanas; 2.432 demais linhas pendentes. Contador 52/91 = 2; 100/97 = 0. Literais, códigos, hashes, tabelas, fórmulas e controles preservados. |

## Arquivos

- [Aprovações do Fábio e escopo](aprovacoes-fabio.json), [planilha atualizada](../anat-03-dossie-vigencia.xlsx) e [dados principais](../anat-03-trechos.json).
- [Mapa de notas](notas/notas-alvos.json), [critérios e relatório](notas/relatorio.md), [manifesto](notas/manifesto.json) e script documental de reprodução.
- [Oito atos adicionais](atos/dependencias-adicionais.json) e [relatório com fontes oficiais](atos/relatorio.md).
- [Auditoria da base cb4d066](auditoria/parecer.md), [tratamento dos achados](TRATAMENTO_AUDITORIA.md) e [cinco blocos para conferência](auditoria/blocos-conferencia.md).
- [Validação final do lote](validacao-final.json).

## Como as novas evidências foram integradas

As duas marcações confirmadas receberam `aprovado=true` apenas no escopo histórico/revogação e exclusão do texto corrente do piloto. `elegivelTextoCorrentePiloto=false` permanece explícito. Data de aprovação 16/10/2026; referência do piloto preservada em 15/10/2026. O caminho literal “item sem número” de ANAT03-00961 foi preservado; o rótulo visual 25.01(a) foi acrescentado separadamente.

As 71 ligações de notas e os oito atos adicionais são evidências documentais separadas, não aprovações novas nem alterações automáticas das outras 2.432 linhas. O mapa exclui os dois IDs confirmados. Os 52 IDs contextuais alcançados pelo mapa continuam candidatos; nenhuma última nota foi propagada a todos os itens seguintes. As 105 notas pendentes não são 105 publicações ou 105 linhas de planilha.

As verificações dos atos esclareceram alvos e diferenças documentais em notas (13.5/13.4, 14.19/14.9, 19.2/13.3 e data histórica de 63/05). Os PDFs/literais originais foram preservados; propostas de correção/intervalo não são errata oficial nem aplicação tributária homologada. Cabeçalhos de ratificação de sete atos foram lidos nas páginas oficiais; não se refez toda a cadeia DOU/atos declaratórios ou legislação estadual.

## Validação e limites

Comparação semântica do XLSX exportado: conteúdo alterado somente em D/E/F/I/K/L/O/P nas linhas dos dois IDs, legenda A3, rótulo C4 e valor calculado D4 do 52/91. Fórmula D4 preservada; nenhuma outra célula ou aba mudou de valor. Tabelas, listas de validação, formatação condicional e congelamentos preservados. Prévia dos dois trechos conferida; sem erros de fórmula detectados. Não houve teste em Microsoft Excel nativo.

Comparação do JSON: somente os dois registros aprovados foram atualizados; os demais permanecem idênticos à base do lote. IDs, XPath, literais, códigos e hashes preservados em todos os registros. O estado anterior sem aprovações permanece registrado nos checkpoints históricos e no parecer da base; o estado atual é duas confirmações restritas, sem uso vigente.

## Pendências para o próximo passo

1. Confirmar integralmente a publicação da ratificação do 104/21, sem substituir data de publicação pela data do ato declaratório.
2. Revisar ligações candidatas e as 105 notas ainda pendentes; obter atos posteriores quando necessários. Não prometer completude temporal da legislação com este mapa.
3. Apresentar os cinco blocos ao Fábio, uma decisão restrita por ID/tipo de conferência. Não reconfirmar decisões de produto já registradas nem pedir aprovação das 2.432 linhas em lote.
4. Manter a proibição de uso em produto/produção até os gates próprios. Nenhum código de produto, migration, escrita no banco, coleta, merge, deploy, Railway AI Agent ou alteração Railway foi executado neste lote.

Este volume foi executado na sessão atual. Nenhuma automação recorrente foi criada e não há promessa de execução após o encerramento da sessão. Retorno para CLAUDE-COORD pelo checkpoint durável na issue #116.
