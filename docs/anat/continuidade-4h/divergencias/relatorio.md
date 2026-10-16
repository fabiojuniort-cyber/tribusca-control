# ANAT — três divergências confrontadas com comandos oficiais

Origem **CLAUDE-COORD → GPT-EXEC**. Conferência documental R0/R1 em 16/10/2026, a partir de 02:40 BRT. Cinco páginas integrais do CONFAZ foram consultadas por HTTP e preservadas com metadados. Não houve alteração do dataset principal, da planilha ou dos mapas anteriores; as três notas continuam literais. O complemento registra **sete relações documentais para sete IDs**, todas pendentes de aprovação humana. Essas relações podem se sobrepor aos mapas anteriores e não devem ser somadas às contagens globais sem deduplicação.

## N52-060: cláusula segunda versus quarta

O [165/21](https://www.confaz.fazenda.gov.br/legislacao/convenios/2021/cv165_21), cláusula primeira, acrescenta o § 2º **à cláusula quarta** e renumera seu parágrafo único para § 1º. O [86/23](https://www.confaz.fazenda.gov.br/legislacao/convenios/2023/CV086_23), cláusula primeira, dá nova redação ao § 1º **da quarta**, mantendo apenas Sergipe. A referência à cláusula segunda no literal da N52-060 diverge dos dois comandos formais. A nota não foi corrigida.

Alvos propostos: `ANAT03-00036`, variante ainda denominada parágrafo único; `ANAT03-00035`, variante renumerada para § 1º com Piauí/Sergipe; `ANAT03-00034`, variante de 86/23 com Sergipe. A renumeração não muda, por si só, o conteúdo da exceção. Propostas temporais: renumeração em **26/10/2021**; variante renumerada com efeitos até **24/08/2023**; redação seguinte a partir de **25/08/2023**. São inferências da publicação nacional anunciada pelo CONFAZ e das cláusulas de entrada em vigor, sujeitas à aprovação por trecho.

## N52-064: quarta-feira versus quarta

O [10/26](https://www.confaz.fazenda.gov.br/legislacao/convenios/2026/CV010_26), cláusula segunda, altera o § 2º **da cláusula quarta**, incluindo São Paulo junto a Paraná, Rio Grande do Sul e Santa Catarina na autorização para não aplicar o caput. A expressão `quarta-feira` da nota é anômala perante o comando formal, preservado no HTML e no texto derivado.

Alvos propostos: `ANAT03-00039`, variante incluindo São Paulo; `ANAT03-00040`, variante anterior sem São Paulo. A data de vigor proposta é **19/02/2026**, publicação nacional informada pelo CONFAZ. A cláusula terceira fixa efeitos em **01/05/2026**; portanto a variante anterior tem fim de efeitos proposto em **30/04/2026**. Não trocar vigor por efeitos. A cláusula primeira também prorroga o prazo geral até **31/12/2026**, sem restaurar trechos revogados nem aprovar a aplicação estadual de cada variante.

## N52-068: fim em 2016 versus revogação com efeitos em janeiro de 2016

O [69/13](https://www.confaz.fazenda.gov.br/legislacao/convenios/2013/CV069_13), cláusula primeira, acrescenta parágrafo único às cláusulas quarta **e quinta**, para Mato Grosso. Sua segunda cláusula define efeitos no primeiro dia do segundo mês subsequente à ratificação. O CONFAZ informa publicação nacional em **16/08/2013**; resulta, como cálculo documental, **01/10/2013**. Esse ato não estabelece o fim em 31/12/2016 informado pela N52-068.

O [1/16](https://www.confaz.fazenda.gov.br/legislacao/convenios/2016/CV001_16), cláusula segunda, revoga o parágrafo único **da quinta**. A cláusula terceira fixa efeitos em **01/01/2016**, embora a publicação do ato seja **15/01/2016** e a publicação nacional anunciada seja **22/01/2016**. Assim, **22/01/2016** é o início de vigor proposto e **01/01/2016** é a data expressa dos efeitos da revogação. A N52-067 é concordante com essa data; a N52-068 conserva literal incompatível indicando 31/12/2016.

Alvos propostos: `ANAT03-00043`, redação anterior Mato Grosso, com intervalo de efeitos proposto **01/10/2013–31/12/2015**; `ANAT03-00042`, marcador REVOGADO, com efeitos propostos em **01/01/2016**. Não aplicar esse encerramento à cláusula quinta inteira ou às linhas dos anexos. Não alterar a data literal da N52-068.

## Datas e alcance da prova

| Ato | Data do ato | Publicação do ato | Publicação nacional informada no CONFAZ | Vigor proposto | Efeitos propostos |
|---|---|---|---|---|---|
| 165/21 | 01/10/2021 | 08/10/2021 | 26/10/2021 — AD 27/21 | 26/10/2021 | 26/10/2021, sem marco separado |
| 86/23 | 04/08/2023 | 08/08/2023 | 25/08/2023 — AD 31/23 | 25/08/2023 | 25/08/2023, sem marco separado |
| 10/26 | 27/01/2026 | 29/01/2026 | 19/02/2026 — AD 04/26 | 19/02/2026 | 01/05/2026, expresso |
| 69/13 | 26/07/2013 | 30/07/2013 | 16/08/2013 — AD 16/13 | 16/08/2013 | 01/10/2013, calculado pela cláusula segunda |
| 1/16 | 14/01/2016 | 15/01/2016 | 22/01/2016 — AD 1/16 | 22/01/2016 | 01/01/2016, expresso |

Os cinco atos completos foram lidos; **não** se conferiram os textos integrais dos cinco ADs ou do DOU neste complemento. A prova da data de publicação nacional está nos metadados editoriais oficiais do próprio CONFAZ, distinta de uma conferência independente do DOU. Não se prova a ausência de quaisquer modificadores posteriores ou a implementação por UF. Nenhum candidato representa aprovação de vigência ou de operação do cliente.

## Integridade e reprodução

- [Resultado estruturado](divergencias-060-064-068.json): literais das notas, comandos, sete IDs, textos, XPaths, hashes e limites.
- [Validação](validacao.json): cinco HTTP 200, hashes LF reproduzidos, zero caracteres de substituição, sete alvos pendentes, duas aprovações principais preservadas e 2.432 demais pendentes.
- Arquivos `*-fonte.json` registram URL, consulta UTC, status, hashes dos bytes HTTP e dos arquivos LF, método de texto derivado e links do corpo. Os bytes originais HTTP ficam no diretório local indicado nos metadados; os HTMLs versionáveis usam exclusivamente normalização de quebras de linha e UTF-8.
- `consultar_fontes.py` efetua a consulta documental delimitada; `consolidar.py` reproduz offline JSON e controles. Nenhum deles integra produto ou acessa banco.

A primeira tentativa HTTP falhou por resolução de DNS no sandbox; a repetição autorizada fora do sandbox obteve quatro páginas. Para o 165/21, a variante `CV165_21` respondeu 404; a URL literal `cv165_21`, extraída do inventário do próprio snapshot, respondeu 200. O metadado preserva o erro anterior. Isso é diferença real de caminho no servidor, não inexistência do ato. Não houve loops de pesquisa.

As inconsistências de nome de dispositivo e de data foram esclarecidas documentalmente; a aceitação dos vínculos/intervalos continua **pendente**. As duas aprovações históricas restritas de Fábio permanecem as únicas aprovações.
