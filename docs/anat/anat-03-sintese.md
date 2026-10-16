# ANAT-03 — Dossiê documental para conferência visual

**Complemento por PDF recebido:** as 70 páginas enviadas pelo Fábio foram inspecionadas. A revisão identificou notas agregadas a outros itens/variantes no dossiê; 77 vínculos documentais receberam revisão pontual, e os contextos restantes do 52/91 foram sinalizados como vínculos individuais pendentes. [Relatório por página e registro das revisões](pdf-conferencia/README.md). Literais, códigos e aprovações pendentes preservados; o envio do PDF não homologa a planilha.

Origem: CLAUDE-COORD → GPT-EXEC. Base: desenho GPT 6 Astra do PR #115, §§5.2 e 5.3. Referência:15/10/2026, America/Sao_Paulo.

## Evidência oficial confirmada

O [Convênio 10/26](https://www.confaz.fazenda.gov.br/legislacao/convenios/2026/CV010_26) foi publicado em 29/01/2026 e ratificado em 19/02/2026. Sua cláusula primeira prorroga as disposições do 52/91 até 31/12/2026, e a terceira fixa efeitos a partir de 01/05/2026. A cláusula segunda altera somente o§2 da quarta, incluindo São Paulo entre as UFs autorizadas a não aplicar a dispensa de estorno do caput. O prazo não restaura partes revogadas nem transforma variantes anteriores em atuais.

O [Convênio 79/25](https://www.confaz.fazenda.gov.br/legislacao/convenios/2025/CV079_25), publicado em 08/07/2025 e ratificado em 25/07/2025, prorroga as disposições do 100/97 até 31/12/2027 e modifica sua cláusula sétima. Sua terceira revoga expressamente a cláusula quarta do 26/21, que condicionava os efeitos à expansão 35% da produção nacional. Não confundir essa revogação com revogação da terceira-A do 100/97.

O [Convênio 154/15](https://www.confaz.fazenda.gov.br/legislacao/convenios/2015/CV154_15), publicado 15/12/2015 e ratificado 30/12/2015, revoga expressamente os itens 39.1, 39.2, 39.3 e 40.2 do AnexoI do 52/91. Altera os incisosII das primeiras duas cláusulas e as linhas 39.5, 40.4, 40.8. A menção 8450.11.00 do 39.1 não pode integrar uma seleção corrente; a outra ocorrência está no AnexoI anterior 20/10/2008–14/10/2009, igualmente sem elegibilidade corrente.

O [Convênio 21/97](https://www.confaz.fazenda.gov.br/legislacao/convenios/1997/CV021_97) revoga a cláusula terceira do 52/91 e prorroga apenas suas demais disposições até 30/04/1998. Vigência na ratificação 15/04/1997 e efeitos 01/05/1997. Esse exemplo impede aplicar a maior data de prorrogação a todo dispositivo indiscriminadamente.

O [Convênio 26/21](https://www.confaz.fazenda.gov.br/legislacao/convenios/2021/CV026_21), publicado 15/03/2021 e ratificado 19/03/2021, produz efeitos 01/04/2021 para a prorrogação histórica e 01/01/2022 para seus demais dispositivos. Revoga cláusula primeiraII, segundaIII e quintaI do 100/97; acresce terceira-A e terceira-B. A terceira 26/21 contém gradações 2022–2024 e ressalvas estaduais modificadas por 223/21, 228/21 e 26/22, ainda dependentes de leitura individual. O§1 da primeira 100/97 e o parágrafo único terceira-A têm dependência 104/21 também pendente. Não atribuir automaticamente 4% a qualquer produto/UF/operação nem aplicar gradação 2024 em 2026.

O [Convênio 226/23](https://www.confaz.fazenda.gov.br/legislacao/convenios/2023/CV226_23), cláusula segundaVIII, foi lido para confirmar a etapa intermediária do 52/91 até 30/04/2026. Suas datas de publicação e efeitos ainda precisam de conferência e não foram preenchidas por inferência. A cadeia histórica completa listada nas páginas-base está no inventário de notas; cada ato não lido continua pendente.

## Conteúdo e limites

- `anat-03-trechos.json`:2434 linhas(2323 do 52/91 e 111 do 100/97), incluindo 1876 ocorrências de códigos NCM/NBM. Uma linha por bloco normativo ou linha de tabela/código; linhas sem código são mantidas. NBM de dez dígitos tem domínio separado e nunca é truncado para catálogo atual.
- `anat-03-dependencias-verificadas.json`:10 eventos oficiais individualizados, com publicação, vigência, efeitos, fim, alvo, alcance, fonte e ressalvas. Publicação/ratificação indicadas nos cabeçalhos oficiais foram consultadas; os respectivos arquivos DOU não foram baixados nem validados separadamente.
- `anat-03-dependencias.json`:notas editoriais e histórico global do snapshot; funciona como fila de dependências ainda não homologadas. Links são os disponíveis no HTML; não foram inventados links internos do Acervo.
- `anat-02-anotacao.md`:2444 unidades estruturais literais, com XPath, classes e células; seis tabelas 2088 linhas. Não há texto não vazio do `content-core` fora dos tipos parágrafo/tabela/cabeçalho inventariados, excluídos script/style. Não foram reconstruídas mesclagens ambíguas: `rowspan/colspan` e coordenadas DOM permanecem disponíveis para conferência.

As duas variantes 8450.11.00 estão identificadas sem omissão. A grafia 8417.8020 e os candidatos 7307.19.20 e 8201.10.00 permanecem literais. A coluna ITEM e o número do dispositivo não geram NCM.

Todos os trechos permanecem **pendentes de aprovação individual**. O prazo global conferido aparece separado do intervalo do trecho. Uma data geral não é prova de redação vigente. A anotação completa é inventário verificável do snapshot; o dossiê não afirma investigação temporal completa nem substitui a conferência visual de Fábio. Na planilha, registrar aprovação, revisor, data, intervalo aprovado e condição de reconferência por linha.

O dossiê foi preparado sem acesso direto ao banco. Posteriormente, Fábio executou o SELECT de confirmação no Railway Dashboard: o HTML persistido dos dois convênios coincide por SHA-256 com os snapshots sanitizados, conforme [relatório ANAT-02](anat-02-leitura.md). Essa confirmação técnica não homologa a vigência dos trechos. Nenhum coletor, importador, migration, escrita no banco, código de produto, merge, deploy ou alteração Railway foi executado.
