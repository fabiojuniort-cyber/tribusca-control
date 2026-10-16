# ANAT — segundo checkpoint da continuidade

Origem: **CLAUDE-COORD → GPT-EXEC**. Retomada em 16/10/2026, 02:39 BRT. R0 documental e R1 leitura oficial. Base `98f9990218309bbfc33b17b8d3179353c36320e4`, conferida com a branch remota; checkout inicialmente limpo. A janela autorizada termina às **05:36:51 BRT**.

## Resultado novo

| Trabalho | Resultado documental | Limite |
|---|---|---|
| N52-060/064/068 | Cinco atos oficiais confrontados; sete relações para sete IDs. Quarta em vez de segunda; §2 da quarta em vez de quarta-feira; intervalo histórico proposto 01/10/2013–31/12/2015 para o parágrafo único da quinta | Notas literais preservadas. Relações e intervalos continuam propostas pendentes. |
| N52-126/130/134/135 | Três páginas oficiais relidas; nove IDs de redação nova e um histórico candidato | 13.4/13.5, 14.9/14.19 e 13.3/19.2 não são equivalentes. Autoria da redação anterior ao 129/19 permanece pendente. |
| Sete ambiguidades | Quatro notas com seis relações por subfragmento para cinco IDs base; três sem vínculo individual no complemento inicial | XPath de célula/parágrafo delimita a proposta; não cria IDs canônicos nem aprova vigência. |
| N52-139, exame adicional | PDF página 45/62 confirma geometria anômala; comando externo do 11/94 sustenta Válvula/7307.19.0300, distinguindo Cabeça de poço com o mesmo código | Proposta cruza descrição 01593 com célula 01592; não se inventou alinhamento no PDF. Fim 20/11/1995 e cadeia 74/95 ainda carecem de prova direta. |
| Prorrogações gerais | 178/21 e 226/23 com quatro páginas oficiais: convênios e ADs completos. Prazos 30/04/2024 e 30/04/2026; publicação da ratificação em 26/10/2021 e 12/01/2024 | Sem atribuição em massa a itens/variantes. Não restaura a cláusula terceira revogada. |
| Integridade | Oito arquivos protegidos intactos, inclusive dossiê/planilha; dez subfragmentos DOM com texto/hash conferidos; nove HTMLs novos com hashes LF conferidos | Duas aprovações restritas preservadas; 2.432 demais trechos pendentes. |

Os complementos têm relações que podem se sobrepor ao mapa anterior. **Não somar suas contagens para declarar novos trechos, aprovações ou cobertura jurídica.** O mapa editorial anterior continua em 115 notas com candidatos para 166 IDs; os novos confrontos ficam em camadas separadas. O mesmo ID base pode conter dois subfragmentos históricos diferentes, como 01724. Aprovação futura de um subfragmento não pode ser propagada a todo o ID ou às duas variantes.

## Evidências

- [Três divergências e comandos oficiais](divergencias/relatorio.md), [JSON](divergencias/divergencias-060-064-068.json), HTMLs/textos/metadados e validação local.
- [Quatro notas e alvos formais](confronto-alvos/relatorio.md), [JSON](confronto-alvos/confronto.json), excertos/paráfrases e manifesto. Hash de excerto local não é hash do HTML remoto.
- [Sete ambiguidades por célula](ambiguidades/relatorio.md), [JSON](ambiguidades/ambiguidades-celulas.json), [PDF página 45 e ato 11/94](ambiguidades/nota139/relatorio.md).
- [Prorrogações 178/21 e 226/23](prorrogacoes/relatorio.md), [eventos/datas](prorrogacoes/eventos-178-226.json), quatro HTMLs/textos/metadados. AD 27/21 também inclui expressamente o 165/21.
- [Validação integrada deste checkpoint](validacao-checkpoint02.json) e [blocos de conferência preparados](conferencia-checkpoint02.md).

As datas de publicação dos atos, dos ADs e da ratificação permanecem distintas. Vigor calculado da cláusula final é proposta documental; início de efeitos expresso, cálculo de efeitos e ausência de marco autônomo identificado têm campos/ressalvas próprios. O 1/16 fixa efeitos da revogação em 01/01/2016 embora o próprio ato e sua ratificação tenham publicações posteriores em janeiro.

Os HTMLs novos mantêm whitespace de origem e normalização LF com hashes conferidos. A checagem de whitespace dos documentos, JSON e scripts exclui somente os HTMLs de evidência. Não houve conferência integral do DOU nem aplicação estadual nesta rodada.

## Próxima fila autorizada

1. Preparar planilha complementar de evidências para conferência visual: eventos/datas, divergências e subfragmentos, todos com situação de conferência pendente e links às provas. Preservar a planilha principal e as duas aprovações; não promover relações automaticamente. Apresentar cada variante em linha própria no complemento, inclusive as que compartilham ID base.
2. Conferir 74/95 e seu ratificador para a transição histórica de Válvula; distinguir novo código 8481.80.9910 do anterior 7307.19.0300. Não supor conversão NBM/NCM.
3. Ler comandos de 111/97 e 2/93 para N52-170/171/163, sem expandir faixas ou atribuir a todo código da linha. Usar 11/94 apenas no alcance efetivamente lido.
4. Priorizar a ponte das prorrogações gerais 133/19, 22/20, 133/20 e 28/21, mantendo o restante da cadeia explicitamente pendente quando não lido.
5. Ao terminar a fila útil ou atingir 05:36:51 BRT, encerrar novos trabalhos e registrar fechamento. Conferência humana, autoria anterior e aplicação estadual permanecem gates próprios.

Sem código de produto, migration, escrita no banco, coleta operacional, merge, deploy, Railway AI Agent ou alteração Railway. `sources/` intocado. Checkpoints e retorno para CLAUDE-COORD na [issue #116](https://github.com/fabiojuniort-cyber/tribusca-control/issues/116).
