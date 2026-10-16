# ANAT — continuidade documental de quatro horas

Origem: **CLAUDE-COORD → GPT-EXEC**. Primeiro checkpoint iniciado em 16/10/2026, 02:09 BRT. R0 documental e R1 leitura oficial. Base `a73a52911fbb822a1866f5b78bfc6624b45802f4`; prazo autorizado termina às **05:36:51 BRT**. Este checkpoint não encerra a janela de continuidade.

## Resultado deste lote

| Trabalho | Resultado | Limite |
|---|---|---|
| Triagem remanescente do 52/91 | 105/105 notas classificadas; 44 com 92 relações candidatas para 89 IDs adicionais | Nenhuma associação foi aplicada ao dossiê principal ou aprovada. |
| Notas sem candidato individual | 61: 42 gerais, 5 de anexos inteiros, 7 inconsistências editoriais e 7 ambiguidades | Triagem completa não equivale a solução jurídica completa. |
| União dos mapas de notas | 115 notas com candidatos para 166 IDs únicos; 71/77 no mapa anterior mais 44/89 neste complemento | Sem sobreposição de IDs entre os dois mapas; as relações ainda precisam de conferência. |
| Ratificação do 104/21 | AD 16/21 de 26/07/2021; publicação nacional em 27/07/2021, confirmada no CONFAZ e AD completo | DOU integral não conferido; vigor em 27/07 é proposta derivada da cláusula terceira. Efeitos expressos em 01/01/2022. |
| Conferência adicional do 223/21 | AD 38/21 de 28/12/2021, publicado em 29/12/2021, inclui o 223/21 | Preservar cadeia com 228/21 e 26/22 e aplicação estadual pendente. |
| Controle dos oito atos | 46 pares documentais diretos e 3 âncoras indiretas; 49 pares, 47 IDs únicos | Inclui redações anteriores candidatas ao encerramento; não são 49 redações correntes aprovadas. |
| Integridade | Oito arquivos protegidos intactos; 2.434 registros, duas aprovações restritas, 2.432 demais pendentes | Nenhuma aprovação nova ou uso vigente aprovado. |

## Evidências e reprodução

- [Triagem e critérios](notas/relatorio.md), [105 entradas](notas/triagem-105.json) e [reprodução offline](notas/triagem_offline.py).
- [Ratificação e fontes oficiais](atos/ratificacao-104-21.md), [eventos/datas](atos/ratificacao-104-21.json) e [validação das quatro fontes](atos/validacao-fontes.json). HTML/texto/metadados preservados nesta pasta; hashes HTTP e LF diferenciados.
- [Controle de atos e IDs](controle/relatorio.md), [mapa](controle/mapa-atos-ids.json) e [validação local](controle/validacao.json).
- [Estado inicial e hashes protegidos](estado-inicial.json) e [validação integrada](validacao-integrada.json).

Os campos nulos e as pendências nos pacotes históricos são o estado observado naquela etapa. A nova prova do 104/21 está neste complemento, sem reescrever evidência anterior. A planilha e o JSON principal não foram alterados neste lote.

## Próxima fila durante a janela autorizada

1. Conferir oficialmente 165/21 e 86/23 para N52-060; 10/26 para N52-064; 69/13 e 1/16 para N52-068. Distinguir nota literal de comando formal e evento temporal. Se o acesso falhar, registrar pendência e avançar.
2. Cruzar as provas já obtidas de 146/20, 199/23 e 129/19 com N52-126/130/134/135 em um complemento de divergências. Não corrigir silenciosamente as notas nem criar aprovação humana.
3. Examinar as sete ambiguidades N52-139/145/146/163/169/170/171 por célula/variante e, quando necessário, páginas dos PDFs já enviados. Um mesmo XPath de linha ou NCM repetido não resolve autoria da nota. Não expandir faixas NBM nem equiparar NBM/NCM.
4. Manter as 42 notas gerais e cinco de anexo inteiro em fila própria. Priorizar dependências com impacto demonstrável; evitar ligações em massa a 2.323 linhas.
5. Registrar novos resultados verificáveis na issue #116; ao atingir o limite, encerrar novos trabalhos e deixar fechamento. Decisões humanas bloqueiam somente sua parte dependente.

As conferências visuais já preparadas no [lote anterior](../lote-autonomo/auditoria/blocos-conferencia.md) permanecem válidas e não são solicitadas novamente durante a ausência do Fábio. Novos candidatos devem apresentar nota, alvo/variante, fonte, datas distintas e limite de aprovação em blocos pequenos.

Sem código de produto, migrations, escrita em banco, coleta operacional, merge, deploy, Railway AI Agent ou alterações Railway. `sources/` intocado. Retorno durável para CLAUDE-COORD: [issue #116](https://github.com/fabiojuniort-cyber/tribusca-control/issues/116).

Os HTMLs oficiais preservam espaços e indentação da resposta de origem; a checagem de whitespace do Git os aponta. A exceção é restrita às quatro evidências HTML, cuja integridade é conferida pelos hashes LF. Documentos, JSON e scripts são verificados separadamente.
