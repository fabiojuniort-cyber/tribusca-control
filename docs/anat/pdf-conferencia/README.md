# ANAT — conferência visual dos PDFs enviados pelo Fábio

**Registro histórico da conferência PDF em `cb4d066`.** As duas confirmações humanas recebidas posteriormente, em 16/10/2026, estão no [lote autônomo](../lote-autonomo/FECHAMENTO.md). Somente ANAT03-00342 e ANAT03-00961 foram confirmados para exclusão do texto corrente do piloto; 2.432 demais linhas continuam pendentes. O envio inicial dos PDFs, por si só, não aprovou trechos.

Origem: CLAUDE-COORD → GPT-EXEC. Continuidade do desenho GPT-6 Astra, PR #115 e issue #116. O envio dos PDFs é insumo de conferência e não aprovação individual da planilha.

## Material examinado

| Arquivo enviado | Páginas | Conferência |
|---|---:|---|
| 100 97.pdf | 8 | Todas as páginas renderizadas e inspecionadas visualmente |
| 52 91.pdf | 62 | Todas as páginas renderizadas e inspecionadas visualmente |

Os arquivos são impressões das páginas do CONFAZ. A extração com pypdf devolveu zero caracteres de corpo em todas as páginas; por isso a revisão usou imagens renderizadas com Poppler, e não texto extraído ou OCR presumido. Os hashes e tamanhos dos arquivos estão no [manifesto](manifesto-pdfs.json). Os PDFs originais foram preservados; não foram incorporados como cópias binárias ao repositório.

Relatórios por página: [100/97](pdf100-revisao.md), [52/91 páginas 1–32](pdf52-p01-p32.md) e [52/91 páginas 33–62](pdf52-p33-p62.md).

## Pontos que os PDFs permitem identificar

| Convênio / página | Identificação visual | Limite |
|---|---|---|
| 100/97, p. 1 | Histórico editorial com prorrogação até 31/12/2027 pelo 79/25; caput da primeira com redução em 60% da base | Data geral e percentual não homologam todas as operações ou trechos |
| 100/97, pp. 5 e 7 | Segunda com redução em 30% da base; terceira-A com carga equivalente a 4%; terceira-B com condição específica | São mecanismos e contextos diferentes |
| 100/97, pp. 2, 4, 6 e 8 | Notas de revogação da primeira II, primeira §1, segunda III e quinta I | A nota deve permanecer vinculada ao seu próprio dispositivo e variante |
| 52/91, p. 1 | Histórico editorial com prorrogação até 31/12/2026 pelo 10/26 | Não restaura itens revogados nem redações antigas |
| 52/91, pp. 4 e 5 | Candidatos `7307.19.20` (item 1) e grafia literal `8417.8020` (13.6) | Texto/célula identificados; elegibilidade tributária continua pendente |
| 52/91, p. 12 | Nota expressa de revogação 39.1–39.3 pelo 154/15; `8450.11.00` no 39.1 aparece em redação anterior | Não selecionar como ocorrência corrente |
| 52/91, pp. 21 e 29 | Título delimita o anexo anterior e a p. 29 contém a segunda `8450.11.00` | O alcance histórico do anexo deve abranger as células, mesmo sem classe própria |
| 52/91, pp. 39–45 | Anexo II e sua variante anterior, delimitada por notas editoriais | Cor auxilia a leitura, mas o alvo e as datas vêm das notas |
| 52/91, pp. 45–62 | Anexos originais, com códigos NBM de dez dígitos | Não truncar para equiparar automaticamente à NCM atual |

## Correção do material derivado

Foi constatado um erro no dossiê preparado: a última nota editorial lida havia sido agregada a outros itens ou dispositivos. Em outros casos, a nota da nova redação e a da redação anterior foram reunidas na mesma linha. Isso não altera o PDF ou o texto original, mas torna a associação derivada inadequada para conferência.

Foram integradas **77 revisões pontuais de associação**: 27 no 100/97, seis no primeiro intervalo do 52/91 e 44 no segundo. Esse número inclui correções de herança indevida, separação de variantes e registros de impropriedades que já aparecem na fonte; não significa 77 erros independentes do CONFAZ. O [registro aplicado](revisao-aplicada.json) preserva o antes, o depois, o ID e a página. Propostas detalhadas: [100](correcoes100.json), [52 primeira parte](correcoes52-first.json) e [52 segunda parte](correcoes52-last.json).

Os 84 registros restantes do 100/97 tiveram sua associação documental examinada nas oito páginas. Nos 2.273 registros restantes do 52/91, as notas agregadas foram explicitamente marcadas como **contexto editorial com vínculo individual pendente**, evitando apresentá-las como efeito confirmado do item. Isso não afirma que todas essas notas estejam erradas; registra que a revisão visual das páginas não homologou cada relação individual agregada. O campo `notaContextualAnterior` conserva o texto anterior; `associacaoNota` distingue o estado da ligação. Referências de contexto em `atoPosterior` também ficaram identificadas como tais.

Na planilha, a coluna E passou a chamar-se “Nota CONFAZ / contexto”. Somente notas, referências e explicações diretamente relacionadas à revisão foram atualizadas. Foram preservados os 2.434 IDs, os textos literais, caminhos, NCM/NBM, hashes, as três abas, os controles de conferência e as aprovações pendentes. Não houve autorização implícita para aprovar trechos pelo envio do PDF.

## Pendências da própria fonte

Algumas inconsistências já estão impressas, como referências a outro item (13.5/13.4, 14.19/14.9, 19.2/13.3) e datas conflitantes de variantes. Foram preservadas literalmente e sinalizadas. Resolver essas pendências exige conferir o ato modificador correspondente. As páginas recebidas não substituem essa pesquisa nem demonstram aplicabilidade a uma UF, empresa ou operação.

## Estado do trabalho

A confirmação anterior do HTML persistido por SELECT humano permanece válida para os hashes/versionamentos registrados na ANAT-02. A revisão de PDF não muda o banco ou os snapshots. Nenhum código de produto, migration, escrita no banco, coleta, merge, deploy ou alteração Railway foi realizado. A homologação jurídica individual pelo Fábio permanece pendente.
