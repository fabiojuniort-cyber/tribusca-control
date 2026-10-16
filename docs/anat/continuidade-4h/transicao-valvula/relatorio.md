# Válvula: alteração específica entre dois códigos NBM/SH

Origem: CLAUDE-COORD → GPT-EXEC. Consulta documental em 16/10/2026, aproximadamente 06:16 UTC. Complemento R0 / leitura pública R1 à nota N52-139. Nenhuma aprovação jurídica criada.

A transição entre `7307.19.0300` e `8481.80.9910` tem comando externo explícito. O [Convênio ICMS 74/95](https://www.confaz.fazenda.gov.br/legislacao/convenios/1995/cv074_95), na cláusula primeira, manda alterar o código do produto do inciso II acrescido ao Anexo I do 52/91 pelo 11/94. A cláusula segunda fixa entrada em vigor na publicação da ratificação nacional. Trata-se de alteração específica de código NBM/SH de dez dígitos; não é conversão para NCM atual.

## Datas e dispositivos, sem misturar os eventos

| Evento | Data | Fundamento e alcance |
| --- | --- | --- |
| Celebração do 11/94 | 29/03/1994 | Acréscimo de válvula, NBM 7307.19.0300, cláusula segunda, inciso II. |
| Publicação do 11/94 | 05/04/1994 | Cabeçalho oficial; não é a condição temporal da cláusula terceira. |
| Ato COTEPE/ICMS 05/94 e publicação da ratificação | 22/04/1994 | Ato oficial expressamente enumera o 11/94. Com a cláusula terceira, sustenta início proposto em 22/04/1994. |
| Celebração do 74/95 | 26/10/1995 | Alteração específica pela cláusula primeira, inciso II reproduzido. |
| Publicação do 74/95 | 30/10/1995 | Cabeçalho oficial; distinta da ratificação. |
| Data do Ato COTEPE/ICMS 07/95 | 20/11/1995 | Data do ato; ainda distinta da publicação. |
| Publicação da ratificação do 74/95 | 21/11/1995 | DOU indicado no 07/95, que ratifica 66/95 a 93/95 e enumera especificamente 74/95. Com a cláusula segunda do 74/95, sustenta início proposto em 21/11/1995. |

Fontes abertas: [11/94](https://www.confaz.fazenda.gov.br/legislacao/convenios/1994/CV011_94), [05/94](https://www.confaz.fazenda.gov.br/legislacao/atos/atos_cotepe/1994/ac005_94), [74/95](https://www.confaz.fazenda.gov.br/legislacao/convenios/1995/cv074_95) e [07/95](https://www.confaz.fazenda.gov.br/legislacao/atos/atos_cotepe/1995/ac007_95). O texto do 74/95 foi também aberto na [reprodução oficial da SEFA/PR](https://www.sefanet.pr.gov.br/dados/SEFADOCUMENTOS/8199500074.pdf), página única. Os quatro HTMLs foram lidos diretamente pelo HTTP quando o leitor web falhou; URLs dos ratificadores foram obtidas dos links reais dos convênios.

## Proposta documental de intervalos

- Válvula com código `7307.19.0300`: início proposto **22/04/1994**; último dia proposto **20/11/1995**, como véspera da alteração específica. Esse fim é inferência documental apoiada pela transição e compatível com o intervalo literal da nota N52-139; não se atribui ao 74/95 uma cláusula autônoma de revogação com esse dia.
- Válvula com código `8481.80.9910`: início proposto **21/11/1995**. A nota local do snapshot imprime término em **18/10/2008**. Este complemento não conferiu o ato substituidor de 2008: o término continua pendente de cadeia própria. O cabeçalho agregado imprime 19/10/2008; são evidências distintas que não foram fundidas.

## IDs conferidos no dataset, preservados

| ID | Caminho literal | Papel preservado |
| --- | --- | --- |
| ANAT03-01591 | ANEXO I/tabela 5/linha 3/item sem número | Válvula e 8481.80.9910 na mesma linha. |
| ANAT03-01592 | ANEXO I/tabela 5/linha 4/item sem número | Nota do 11/94 e célula lateral 7307.19.0300. |
| ANAT03-01593 | ANEXO I/tabela 5/linha 5/item sem número | Somente descrição Válvula, código vazio. |
| ANAT03-01594 | ANEXO I/tabela 5/linha 6/item sem número | Cabeça de poço para perfuração de poços de petróleo, com 7307.19.0300 próprio. |

O 11/94 acrescenta cabeça de poço pelo inciso X, separadamente da válvula do inciso II. O 74/95 modifica os incisos II e IX; não modifica o X. Portanto, o fim proposto para a antiga válvula **não deve ser propagado** para ANAT03-01594 pelo mesmo código ou por proximidade. A associação candidata entre descrição em 01593 e código em 01592 permanece externa ao literal, fundamentada pelo inciso II do 11/94; a geometria irregular do PDF não foi corrigida.

## Proveniência e limites

`transicao-valvula.json` contém as quatro entradas completas do dataset, seus hashes e XPath, comandos e datas em campos separados, URLs, hora da consulta, status HTTP, SHA256 dos bytes das respostas e do texto extraído. Os quatro `.txt` conservam o texto de `#parent-fieldname-text`, com espaços normalizados por lxml; não são cópias byte a byte do HTML. `registrar.py` registra apenas esta leitura documental local.

Dataset e planilha não foram editados. Nenhum literal, ID ou aprovação foi alterado. Os dois IDs aprovados por Fábio continuam restritos ao escopo histórico anterior; os demais 2.432 seguem pendentes. Aplicação estadual, operação concreta, elegibilidade atual e aprovação humana continuam pendentes. O 05/94 possui a expressão editorial anômala “05 de abril dezembro de 1994” no corpo; preservou-se o texto, usando a publicação específica informada no cabeçalho do 11/94 e a publicação de ratificação indicada no próprio 05/94, sem reescrever a fonte.
