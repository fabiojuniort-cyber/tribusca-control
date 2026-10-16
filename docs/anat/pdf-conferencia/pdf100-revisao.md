# ANAT - revisão visual do PDF Convênio ICMS 100/97

Origem: CLAUDE-COORD -> GPT-EXEC. Continuidade do desenho GPT 6 Astra. Referência: 15/10/2026, America/Sao_Paulo. Esta é uma inspeção documental do PDF enviado por Fábio, não sua aprovação tributária individual.

## Arquivo e método

- Entrada: `C:/Users/fabio/Downloads/100 97.pdf`, preservada sem alterações.
- SHA-256: `d38d4712a71ee2818ba48b16cb9f1c4bee078e31772adfcc48b325eeea8692ed`.
- `pdfinfo`: 8 páginas A4, 3.987.699 bytes, PDF 1.7, produtor Microsoft: Print To PDF, autor Fábio Terasaka, criação 15/10/2026 23:01:14 (horário do Brasil).
- Cabeçalho impresso: 15/10/2026, 23:00; rodapé com URL `https://www.confaz.fazenda.gov.br/legislacao/convenios/1997/CV100_97` e numeração 1/8 a 8/8.
- Todas as oito páginas foram renderizadas via Poppler a 1700 pixels e inspecionadas visualmente, incluindo conteúdo, notas e rodapés. Não se usou OCR para reconstruir palavras. Não há anexo tabular neste PDF.
- Comparação com as 111 linhas de 100/97 em `docs/anat/anat-03-trechos.json`, a síntese e as dependências verificadas. Os textos centrais e a distinção visual entre notas, redações apresentadas e redações anteriores estão presentes. A associação derivada de notas precisa de correções descritas abaixo.

## Conferência página a página

| Página | Conteúdo visível | Achado documental | Limite / pendência |
|---|---|---|---|
| 1 | Título; publicação DOU 06/11/1997; ratificação 21/11/1997; histórico de alterações, prorrogações e remissões; caput da primeira | Prorrogação até 31/12/2027 pelo 79/25 explicitamente impressa. Primeira apresenta redução **em 60% da base**, para saídas interestaduais dos produtos especificados. | Prazo geral não restaura revogados nem resolve condições estaduais; 60% não é alíquota. Remissão à terceira do 26/21 deve permanecer ligada à terceira-A. |
| 2 | Primeira I a V; redações anteriores e II revogado; III e condições a-c | II expressamente REVOGADO pelo 26/21, efeitos 01/01/2022. Incisos atuais e versões verdes separáveis por notas de início/fim. | Uma nota de redação anterior não vale para o dispositivo seguinte. Não presumir qualquer medicamento/ração/semente abrangido sem requisitos. |
| 3 | Variantes de V e VI; VI apresentado com efeitos desde 01/06/2016; cadeias 123/11, 55/09, 152/02, 97/99 e 40/98 | Histórico do VI é extenso e atravessa a página 4. Presença de produtos na versão histórica não prova enquadramento atual. | Ler continuidade entre páginas. Não usar cor como único critério de vigência. |
| 4 | Fim do histórico VI; VII-XVII; X com código NBM/SH 3507.90.4; §1 revogado | Nota expressa revoga §1 da primeira pelo 104/21, efeitos 01/01/2022. A nota 'efeitos até 23.04.00' antecede e pertence à versão histórica do IX, não ao X. | Código aparece como NBM/SH literal; não converter automaticamente em NCM atual. A dependência 104/21 permanece pendente de leitura individual do ato posterior. |
| 5 | §1 histórico; §2 conceitos I-V; §§3-6; segunda caput e I | Segunda apresenta redução **em 30% da base** nas saídas interestaduais. §2 é texto preto separado do §1 histórico e não herda o fim 31/12/2021. | O §6 é disposição temporal específica de sementes; não tomar o prazo geral de 2027 como renovação de seu período de dois anos. |
| 6 | Segunda I histórico, II milho e variantes, III revogado, IV aveia; terceira caput e §1; versões históricas | Segunda III expressamente REVOGADO pelo 26/21 desde 01/01/2022. Terceira autoriza benefícios nas operações internas, observadas condições. | Nota histórica do inciso II do §1 da terceira imprime fim **21.07.15**; há suspeita documental a conferir no 63/05. Não corrigir a fonte silenciosamente. |
| 7 | Histórico terceira; §§2 e 3; terceira-A I, a-d e II, parágrafo único; terceira-B | Terceira-A apresenta carga equivalente a **4%**, com produtos e destinos definidos; terceira-B contém condição para importação. Parágrafo único acrescentado pelo 104/21 desde 01/01/2022. | 4% é carga resultante; não equivale às reduções em 60% e 30%. Remissões, transições do 26/21 e implementação estadual continuam necessárias. Terceira-A/B não aparecem revogadas no PDF. |
| 8 | Quarta, quinta I revogado e histórico, II, sexta, sétima e original; nota sobre 74/07 | Quinta I expressamente REVOGADO pelo 26/21 desde 01/01/2022. Sétima tem nova redação 79/25, efeitos desde 25/07/2025, com prazo até 31/12/2027. | A versão original em verde menciona 30/04/1999 e não é prazo atual. Nota sob quinta I cita literalmente 'cláusula primeira', aparente impropriedade editorial que deve ser preservada e sinalizada. |

## Inconsistências concretas no dossiê derivado

Os IDs abaixo são da versão examinada. O campo `notaConfaz` carrega em vários pontos a última nota encontrada, mesmo quando o PDF abre novo dispositivo. Isso é um erro de associação de escopo; o texto literal da publicação deve continuar intacto. As situações já estão pendentes, portanto não houve aprovação indevida, mas não se deve inferir intervalos a partir dessas notas.

| Linha(s) | Página | Associação problemática | Tratamento proposto |
|---|---|---|---|
| ANAT03-02356, primeira X | 4 | Recebeu 'Redação original, efeitos até 23.04.00', nota do IX histórico. | Desvincular a nota do X; intervalo do X permanece pendente de cadeia própria. |
| ANAT03-02368, primeira §2 | 5 | Recebeu 'Redação original, efeitos até 31.12.21', nota do §1 histórico. | Não aplicar revogação/fim do §1 ao §2. Rever também seus subitens antes da próxima nota específica. |
| ANAT03-02385, segunda caput | 5 | Recebeu nota de acréscimo do §6 da primeira pelo 99/04. | Não atribuir 19/10/2004 como início do caput da segunda por essa nota. |
| ANAT03-02407 e sucessores do bloco histórico da terceira §1 | 7 | III histórico recebe nota expressamente do inciso II. | Modelar o escopo da variante completa e a nota específica do II separadamente; não generalizar intervalo. |
| ANAT03-02427 e ANAT03-02428, quarta e quinta caput | 8 | Receberam nota de acréscimo da terceira-B pelo 26/21. | Desvincular: não são dispositivos acrescidos por essa nota. |
| ANAT03-02431 e ANAT03-02432, quinta II e sexta | 8 | Herdam nota da versão histórica da quinta I, incluindo fim 31/12/2021 e referência textual à primeira. | Não tratar quinta II ou sexta como encerradas nessa data. Desvincular a nota. |

Também foram observadas duas impropriedades já impressas no PDF e preservadas no JSON: (a) ANAT03-02405 traz '21.07.15' na nota histórica da terceira §1 II; (b) ANAT03-02430 cita 'cláusula primeira' na nota posicionada sob quinta I. São pendências de fonte, distintas do erro de propagação do derivado. Não há fundamento para corrigir literalmente 2015 para 2005 sem conferir o ato posterior.

## Resultado e limites

O PDF permite identificar visualmente as estruturas, redações históricas e quatro revogações expressas: primeira II, primeira §1, segunda III e quinta I. Confirma documentalmente os destaques que a síntese já descrevia (60%, 30%, terceira-A/B e prazo 2027), sem dispensar leitura das normas modificadoras ou decisão de Fábio.

A revisão achou erros de associação de notas no material derivado. Prioridade: corrigir/sinalizar esses vínculos no JSON e na planilha antes da aprovação individual, preservando IDs, texto, URL e notas literais. O envio deste PDF não é aprovação da planilha nem confirmação de aplicabilidade a cliente, UF, produto ou operação.

## Patch incremental de associação

Foi feito QA dos 111 registros do 100/97, comparando texto e nota com as oito páginas. O arquivo `correcoes100.json` contém **27 correções de associação confirmadas visualmente**. Inclui a nota anterior esperada para aplicação defensiva por ID, a página de evidência e a nota descartada em campo de contexto. Nenhum texto literal do ato é substituído. O campo `atoPosterior` estava vazio nos 111 registros e continua vazio neste patch; não foi preenchido com atos inferidos só por proximidade.

Além dos exemplos da tabela, o patch cobre: primeira III b/c e IV (ANAT03-02338 a 02340), primeira VII/VIII (02351/02352), primeira §2 I/II (02369/02370), primeira §§3-5 e incisos do §5 (02375 a 02383), terceira §1 histórico III-V (02407 a 02409) e terceira §3 (02412). Em todos, a nota removida menciona outro alvo ou versão, ou é fim de redação histórica indevidamente aplicado a texto preto seguinte. Quando há contexto de cláusula/§ mais amplo, este não foi convertido em certeza do intervalo individual; deve ser conferido separadamente.

As outras 84 linhas mantêm as notas examinadas, inclusive as duas impropriedades editoriais sinalizadas acima. Manter a nota não homologa vigência, alcance, cadeia de alterações nem ato posterior. Permanecem pendentes de aprovação tributária.

A tentativa de consultar individualmente o 104/21 no portal CONFAZ nesta rodada retornou timeout; não se incorporou conclusão jurídica nova a partir de fonte secundária. Nenhum banco, produto, Railway, coletor, migration, merge ou deploy foi alterado nesta inspeção.
