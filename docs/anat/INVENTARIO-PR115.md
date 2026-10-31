# Inventário do tribusca-control#115 (ANAT-00 a 03)

Governança: #116, decisão 2 do comentário 6542971547. **O inventário foi feito só pelos caminhos e contagens de linhas do git** (`git diff --numstat main...c83f3c69`). Nenhum arquivo foi aberto, e nenhum conteúdo reservado foi consultado. A classificação é automática, pelo padrão do caminho; um revisor independente deve conferi-la.

HEAD do #115: `c83f3c69958827ef69ecef9b54417693a6bd398d`. Total: **216 arquivos, 251.491 linhas adicionadas**.

## Classes

| Classe | Conteúdo | Arquivos | Risco | Proposta |
|---|---|---:|---|---|
| A | Desenho, checkpoints, notas e sínteses documentais | 84 | baixo | integrar como **registro histórico**, com nota de escopo |
| B | Derivados dos Convênios ICMS 52/91 e 100/97 (trechos, classificação, blocos, planilhas, conferência) | 62 | **alto**: o 52/91 e o 100/97 são as entradas 01 e 02 do corpus (BLOCK_CORPUS_INPUTS_AND_GOLD) | **não integrar à `main`**; preservar em tag de arquivo, marcado como *proposta, 0/25 homologados* |
| C | Cópias de atos oficiais (HTML/TXT de convênios, ADs e prorrogações) | 63 | médio: cópias sem procedência normalizada (URL, data e hash) | não integrar; uma coleta oficial futura segue o OFFICIAL-01, com procedência |
| D | Componentes executáveis (Python, SQL) | 7 | médio: código de execução num repositório de governança, que não é revisado como código | não integrar; se for útil, migrar para o backend com revisão |

## Proposta de integração segura

1. Abrir um **PR documental menor, sanitizado**, só com a classe A:
   - acrescentar uma nota de escopo explícita: *"ANAT-03: 25 blocos = proposta, 0 homologados; critério de conferência substituído pelo direcionamento de 30/10 (#116 c.6514510003); o conteúdo derivado do 52/91 e do 100/97 fica fora da main por BLOCK_CORPUS_INPUTS_AND_GOLD."*;
   - acrescentar um ponteiro para o commit `c83f3c69` como fonte histórica.
2. **Fechar o #115 sem merge**, referenciando o PR sanitizado e a tag `anat-00-03-historico` no commit `c83f3c69`. A tag preserva as classes B, C e D sem levá-las à `main`.
3. Revisão independente do PR sanitizado. A integração exige autorização específica.
4. Nada disso pede ao Product Owner revisão linha a linha.

## Lista completa (classe, linhas, caminho)

| Classe | Linhas | Caminho |
|---|---:|---|
| A | 29 | `docs/anat-checkpoint.md` |
| A | 647 | `docs/anat-desenho.md` |
| A | 41 | `docs/anat/README.md` |
| A | 2489 | `docs/anat/anat-02-anotacao.md` |
| A | 33 | `docs/anat/anat-02-dashboard-resultado.json` |
| A | 70 | `docs/anat/anat-02-estrutura-resumo.json` |
| A | 375 | `docs/anat/anat-02-fichas.md` |
| A | 123 | `docs/anat/anat-02-leitura.md` |
| A | 166 | `docs/anat/anat-02-sanitizacao-local.json` |
| A | 38 | `docs/anat/continuidade-4h/CHECKPOINT-02.md` |
| A | 24 | `docs/anat/continuidade-4h/CHECKPOINT-03.md` |
| A | 40 | `docs/anat/continuidade-4h/README.md` |
| A | 340 | `docs/anat/continuidade-4h/ambiguidades/ambiguidades-celulas.json` |
| A | 135 | `docs/anat/continuidade-4h/ambiguidades/nota139/nota139-evidencia.json` |
| A | 28 | `docs/anat/continuidade-4h/ambiguidades/nota139/relatorio.md` |
| A | 114 | `docs/anat/continuidade-4h/ambiguidades/relatorio.md` |
| A | 14 | `docs/anat/continuidade-4h/atos/AD016_21-fonte.json` |
| A | 12 | `docs/anat/continuidade-4h/atos/AD038_21-fonte.json` |
| A | 44 | `docs/anat/continuidade-4h/atos/CV104_21-fonte.json` |
| A | 38 | `docs/anat/continuidade-4h/atos/CV223_21-fonte.json` |
| A | 189 | `docs/anat/continuidade-4h/atos/ratificacao-104-21.json` |
| A | 32 | `docs/anat/continuidade-4h/atos/ratificacao-104-21.md` |
| A | 9 | `docs/anat/continuidade-4h/atos/relatorio.md` |
| A | 26 | `docs/anat/continuidade-4h/atos/validacao-fontes.json` |
| A | 379 | `docs/anat/continuidade-4h/confronto-alvos/confronto.json` |
| A | 26 | `docs/anat/continuidade-4h/confronto-alvos/manifesto.json` |
| A | 28 | `docs/anat/continuidade-4h/confronto-alvos/relatorio.md` |
| A | 1200 | `docs/anat/continuidade-4h/controle/mapa-atos-ids.json` |
| A | 45 | `docs/anat/continuidade-4h/controle/relatorio.md` |
| A | 41 | `docs/anat/continuidade-4h/controle/validacao.json` |
| A | 38 | `docs/anat/continuidade-4h/divergencias/CV001_16-fonte.json` |
| A | 38 | `docs/anat/continuidade-4h/divergencias/CV010_26-fonte.json` |
| A | 34 | `docs/anat/continuidade-4h/divergencias/CV069_13-fonte.json` |
| A | 34 | `docs/anat/continuidade-4h/divergencias/CV086_23-fonte.json` |
| A | 38 | `docs/anat/continuidade-4h/divergencias/cv165_21-fonte.json` |
| A | 395 | `docs/anat/continuidade-4h/divergencias/divergencias-060-064-068.json` |
| A | 46 | `docs/anat/continuidade-4h/divergencias/relatorio.md` |
| A | 41 | `docs/anat/continuidade-4h/divergencias/validacao.json` |
| A | 72 | `docs/anat/continuidade-4h/estado-inicial.json` |
| A | 12 | `docs/anat/continuidade-4h/notas-codigos/AC001_98-fonte.json` |
| A | 12 | `docs/anat/continuidade-4h/notas-codigos/AC002_93-fonte.json` |
| A | 21 | `docs/anat/continuidade-4h/notas-codigos/CV002_93-fonte.json` |
| A | 21 | `docs/anat/continuidade-4h/notas-codigos/CV111_97-fonte.json` |
| A | 60 | `docs/anat/continuidade-4h/notas-codigos/manifesto.json` |
| A | 280 | `docs/anat/continuidade-4h/notas-codigos/notas-codigos.json` |
| A | 19 | `docs/anat/continuidade-4h/notas-codigos/relatorio.md` |
| A | 30 | `docs/anat/continuidade-4h/notas-codigos/validacao.json` |
| A | 164 | `docs/anat/continuidade-4h/notas/relatorio.md` |
| A | 2578 | `docs/anat/continuidade-4h/notas/triagem-105.json` |
| A | 1351 | `docs/anat/continuidade-4h/planilha/conteudo-congelado.json` |
| A | 50 | `docs/anat/continuidade-4h/planilha/validacao.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD006_20-fonte.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD006_21-fonte.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD009_19-fonte.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD021_20-fonte.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV022_20-fonte.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV028_21-fonte.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV133_19-fonte.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV133_20-fonte.json` |
| A | 352 | `docs/anat/continuidade-4h/prorrogacoes-ponte/eventos-ponte.json` |
| A | 29 | `docs/anat/continuidade-4h/prorrogacoes-ponte/relatorio.md` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes/AD001_24-fonte.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes/AD027_21-fonte.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes/CV178_21-fonte.json` |
| A | 15 | `docs/anat/continuidade-4h/prorrogacoes/CV226_23-fonte.json` |
| A | 126 | `docs/anat/continuidade-4h/prorrogacoes/eventos-178-226.json` |
| A | 25 | `docs/anat/continuidade-4h/prorrogacoes/relatorio.md` |
| A | 41 | `docs/anat/continuidade-4h/transicao-valvula/relatorio.md` |
| A | 291 | `docs/anat/continuidade-4h/transicao-valvula/transicao-valvula.json` |
| A | 27 | `docs/anat/continuidade-4h/validacao-checkpoint02.json` |
| A | 46 | `docs/anat/continuidade-4h/validacao-integrada.json` |
| A | 27 | `docs/anat/lote-autonomo/CONTINUIDADE-4H.md` |
| A | 45 | `docs/anat/lote-autonomo/FECHAMENTO.md` |
| A | 29 | `docs/anat/lote-autonomo/PLANO.md` |
| A | 13 | `docs/anat/lote-autonomo/TRATAMENTO_AUDITORIA.md` |
| A | 35 | `docs/anat/lote-autonomo/aprovacoes-fabio.json` |
| A | 16 | `docs/anat/lote-autonomo/aprovacoes-planilha.json` |
| A | 194 | `docs/anat/lote-autonomo/atos/dependencias-adicionais.json` |
| A | 37 | `docs/anat/lote-autonomo/atos/relatorio.md` |
| A | 36 | `docs/anat/lote-autonomo/auditoria/parecer.md` |
| A | 40 | `docs/anat/lote-autonomo/notas/manifesto.json` |
| A | 3595 | `docs/anat/lote-autonomo/notas/notas-alvos.json` |
| A | 116 | `docs/anat/lote-autonomo/notas/relatorio.md` |
| A | 40 | `docs/anat/lote-autonomo/validacao-final.json` |
| B | - | `docs/anat/anat-03-conferencia-blocos.xlsx` |
| B | 172 | `docs/anat/anat-03-dependencias-verificadas.json` |
| B | 2510 | `docs/anat/anat-03-dependencias.json` |
| B | - | `docs/anat/anat-03-dossie-vigencia.xlsx` |
| B | - | `docs/anat/anat-03-evidencias-complementares.xlsx` |
| B | 32 | `docs/anat/anat-03-sintese.md` |
| B | 87239 | `docs/anat/anat-03-trechos.json` |
| B | 14 | `docs/anat/continuidade-4h/conferencia-checkpoint02.md` |
| B | 47 | `docs/anat/escopo-corrigido/README.md` |
| B | 6610 | `docs/anat/escopo-corrigido/blocos.json` |
| B | 40 | `docs/anat/escopo-corrigido/blocos.md` |
| B | 20 | `docs/anat/escopo-corrigido/blocos/ANAT03-B01.md` |
| B | 20 | `docs/anat/escopo-corrigido/blocos/ANAT03-B02.md` |
| B | 18 | `docs/anat/escopo-corrigido/blocos/ANAT03-B03.md` |
| B | 16 | `docs/anat/escopo-corrigido/blocos/ANAT03-B04.md` |
| B | 16 | `docs/anat/escopo-corrigido/blocos/ANAT03-B05.md` |
| B | 36 | `docs/anat/escopo-corrigido/blocos/ANAT03-B06.md` |
| B | 71 | `docs/anat/escopo-corrigido/blocos/ANAT03-B07.md` |
| B | 76 | `docs/anat/escopo-corrigido/blocos/ANAT03-B08.md` |
| B | 77 | `docs/anat/escopo-corrigido/blocos/ANAT03-B09.md` |
| B | 98 | `docs/anat/escopo-corrigido/blocos/ANAT03-B10.md` |
| B | 81 | `docs/anat/escopo-corrigido/blocos/ANAT03-B11.md` |
| B | 118 | `docs/anat/escopo-corrigido/blocos/ANAT03-B12.md` |
| B | 77 | `docs/anat/escopo-corrigido/blocos/ANAT03-B13.md` |
| B | 42 | `docs/anat/escopo-corrigido/blocos/ANAT03-B14.md` |
| B | 43 | `docs/anat/escopo-corrigido/blocos/ANAT03-B15.md` |
| B | 28 | `docs/anat/escopo-corrigido/blocos/ANAT03-B16.md` |
| B | 52 | `docs/anat/escopo-corrigido/blocos/ANAT03-B17.md` |
| B | 32 | `docs/anat/escopo-corrigido/blocos/ANAT03-B18.md` |
| B | 28 | `docs/anat/escopo-corrigido/blocos/ANAT03-B19.md` |
| B | 23 | `docs/anat/escopo-corrigido/blocos/ANAT03-B20.md` |
| B | 20 | `docs/anat/escopo-corrigido/blocos/ANAT03-B21.md` |
| B | 22 | `docs/anat/escopo-corrigido/blocos/ANAT03-B22.md` |
| B | 30 | `docs/anat/escopo-corrigido/blocos/ANAT03-B23.md` |
| B | 28 | `docs/anat/escopo-corrigido/blocos/ANAT03-B24.md` |
| B | 32 | `docs/anat/escopo-corrigido/blocos/ANAT03-B25.md` |
| B | 58797 | `docs/anat/escopo-corrigido/classificacao.json` |
| B | 44 | `docs/anat/escopo-corrigido/classificacao.md` |
| B | 17 | `docs/anat/escopo-corrigido/planilha/README.md` |
| B | 48 | `docs/anat/escopo-corrigido/planilha/validacao-xlsx.json` |
| B | 15 | `docs/anat/escopo-corrigido/planilha/validacao.json` |
| B | 9 | `docs/anat/escopo-corrigido/prazos/AD004_26-fonte.json` |
| B | 9 | `docs/anat/escopo-corrigido/prazos/AD016_25-fonte.json` |
| B | 9 | `docs/anat/escopo-corrigido/prazos/CV026_21-fonte.json` |
| B | 9 | `docs/anat/escopo-corrigido/prazos/CV052_91-fonte.json` |
| B | 9 | `docs/anat/escopo-corrigido/prazos/CV079_25-fonte.json` |
| B | 9 | `docs/anat/escopo-corrigido/prazos/CV100_97-fonte.json` |
| B | 148 | `docs/anat/escopo-corrigido/prazos/evidencias.json` |
| B | 25 | `docs/anat/escopo-corrigido/prazos/relatorio.md` |
| B | 28 | `docs/anat/escopo-corrigido/validacao-classificacao.json` |
| B | 24 | `docs/anat/escopo-corrigido/validacao-final.json` |
| B | 15 | `docs/anat/lote-autonomo/auditoria/blocos-conferencia.md` |
| B | 48 | `docs/anat/pdf-conferencia/README.md` |
| B | 299 | `docs/anat/pdf-conferencia/correcoes100.json` |
| B | 80 | `docs/anat/pdf-conferencia/correcoes52-first.json` |
| B | 486 | `docs/anat/pdf-conferencia/correcoes52-last.json` |
| B | 18 | `docs/anat/pdf-conferencia/manifesto-pdfs.json` |
| B | 56 | `docs/anat/pdf-conferencia/pdf100-revisao.md` |
| B | 61 | `docs/anat/pdf-conferencia/pdf52-p01-p32.md` |
| B | 48 | `docs/anat/pdf-conferencia/pdf52-p33-p62.md` |
| B | 780 | `docs/anat/pdf-conferencia/revisao-aplicada.json` |
| B | 21 | `docs/anat/pdf-conferencia/validacao-planilha.json` |
| C | 1 | `docs/anat/continuidade-4h/atos/AD016_21-texto.txt` |
| C | 1544 | `docs/anat/continuidade-4h/atos/AD016_21.html` |
| C | 1 | `docs/anat/continuidade-4h/atos/AD038_21-texto.txt` |
| C | 1531 | `docs/anat/continuidade-4h/atos/AD038_21.html` |
| C | 1 | `docs/anat/continuidade-4h/atos/CV104_21-texto.txt` |
| C | 4720 | `docs/anat/continuidade-4h/atos/CV104_21.html` |
| C | 1 | `docs/anat/continuidade-4h/atos/CV223_21-texto.txt` |
| C | 4717 | `docs/anat/continuidade-4h/atos/CV223_21.html` |
| C | 13 | `docs/anat/continuidade-4h/confronto-alvos/evidencia-129-19.txt` |
| C | 13 | `docs/anat/continuidade-4h/confronto-alvos/evidencia-146-20.txt` |
| C | 13 | `docs/anat/continuidade-4h/confronto-alvos/evidencia-199-23.txt` |
| C | 1 | `docs/anat/continuidade-4h/divergencias/CV001_16-texto.txt` |
| C | 3070 | `docs/anat/continuidade-4h/divergencias/CV001_16.html` |
| C | 1 | `docs/anat/continuidade-4h/divergencias/CV010_26-texto.txt` |
| C | 2737 | `docs/anat/continuidade-4h/divergencias/CV010_26.html` |
| C | 1 | `docs/anat/continuidade-4h/divergencias/CV069_13-texto.txt` |
| C | 3777 | `docs/anat/continuidade-4h/divergencias/CV069_13.html` |
| C | 1 | `docs/anat/continuidade-4h/divergencias/CV086_23-texto.txt` |
| C | 4377 | `docs/anat/continuidade-4h/divergencias/CV086_23.html` |
| C | 1 | `docs/anat/continuidade-4h/divergencias/cv165_21-texto.txt` |
| C | 4717 | `docs/anat/continuidade-4h/divergencias/cv165_21.html` |
| C | 1 | `docs/anat/continuidade-4h/notas-codigos/AC001_98-texto.txt` |
| C | 1048 | `docs/anat/continuidade-4h/notas-codigos/AC001_98.html` |
| C | 1 | `docs/anat/continuidade-4h/notas-codigos/AC002_93-texto.txt` |
| C | 988 | `docs/anat/continuidade-4h/notas-codigos/AC002_93.html` |
| C | 1 | `docs/anat/continuidade-4h/notas-codigos/CV002_93-texto.txt` |
| C | 3118 | `docs/anat/continuidade-4h/notas-codigos/CV002_93.html` |
| C | 1 | `docs/anat/continuidade-4h/notas-codigos/CV111_97-texto.txt` |
| C | 2968 | `docs/anat/continuidade-4h/notas-codigos/CV111_97.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD006_20-texto.txt` |
| C | 1300 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD006_20.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD006_21-texto.txt` |
| C | 1525 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD006_21.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD009_19-texto.txt` |
| C | 1286 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD009_19.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD021_20-texto.txt` |
| C | 1296 | `docs/anat/continuidade-4h/prorrogacoes-ponte/AD021_20.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV022_20-texto.txt` |
| C | 3449 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV022_20.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV028_21-texto.txt` |
| C | 5126 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV028_21.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV133_19-texto.txt` |
| C | 4733 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV133_19.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV133_20-texto.txt` |
| C | 3887 | `docs/anat/continuidade-4h/prorrogacoes-ponte/CV133_20.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes/AD001_24-texto.txt` |
| C | 1465 | `docs/anat/continuidade-4h/prorrogacoes/AD001_24.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes/AD027_21-texto.txt` |
| C | 1530 | `docs/anat/continuidade-4h/prorrogacoes/AD027_21.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes/CV178_21-texto.txt` |
| C | 4972 | `docs/anat/continuidade-4h/prorrogacoes/CV178_21.html` |
| C | 1 | `docs/anat/continuidade-4h/prorrogacoes/CV226_23-texto.txt` |
| C | 4636 | `docs/anat/continuidade-4h/prorrogacoes/CV226_23.html` |
| C | 1 | `docs/anat/continuidade-4h/transicao-valvula/ac005_94.txt` |
| C | 1 | `docs/anat/continuidade-4h/transicao-valvula/ac007_95.txt` |
| C | 1 | `docs/anat/continuidade-4h/transicao-valvula/cv011_94.txt` |
| C | 1 | `docs/anat/continuidade-4h/transicao-valvula/cv074_95.txt` |
| C | 1 | `docs/anat/escopo-corrigido/prazos/AD004_26-texto.txt` |
| C | 1 | `docs/anat/escopo-corrigido/prazos/AD016_25-texto.txt` |
| C | 1 | `docs/anat/escopo-corrigido/prazos/CV026_21-texto.txt` |
| C | 1 | `docs/anat/escopo-corrigido/prazos/CV052_91-texto.txt` |
| C | 1 | `docs/anat/escopo-corrigido/prazos/CV079_25-texto.txt` |
| C | 1 | `docs/anat/escopo-corrigido/prazos/CV100_97-texto.txt` |
| D | 45 | `docs/anat/anat-02-dashboard-confirmacao.sql` |
| D | 134 | `docs/anat/anat-02-sql.sql` |
| D | 70 | `docs/anat/continuidade-4h/controle/construir-mapa.py` |
| D | 44 | `docs/anat/continuidade-4h/divergencias/consolidar.py` |
| D | 44 | `docs/anat/continuidade-4h/divergencias/consultar_fontes.py` |
| D | 188 | `docs/anat/continuidade-4h/notas/triagem_offline.py` |
| D | 46 | `docs/anat/lote-autonomo/notas/build_note_map.py` |
