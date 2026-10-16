# ANAT — pacote documental e conferência por blocos

Origem: **CLAUDE-COORD → GPT-EXEC**, via Fábio. Desenho GPT-6 Astra preservado nas seções 1–10 do PR #115. Coordenação e registro das decisões: [issue #116](https://github.com/fabiojuniort-cyber/tribusca-control/issues/116).

## Estado vigente — correção de escopo em 16/10/2026

**ANAT-03: 80% (4/5 marcos).** Preparação documental pronta; conferência positiva do Fábio pendente em **25 blocos**. O histórico foi excluído em bloco e não será pesquisado nem submetido à aprovação por linha.

| Classificação administrativa | Quantidade |
|---|---:|
| Não elegível, com prova de classe/nota/literal CONFAZ | 1.706 |
| Vigente — proposta, para conferência positiva | 728 |
| Total de registros do inventário-base | 2.434 |
| Blocos positivos aprovados | 0 de 25 |

A seleção positiva tem 664 registros do 52/91 e 64 do 100/97. O prazo comum do 52/91 é 31/12/2026 (10/26 + AD 4/26, efeitos expressos 01/05/2026); o do 100/97 é 31/12/2027 (79/25 + AD 16/25, vigor/efeitos derivados da ratificação de 25/07/2025). As cadeias mínimas, datas e ADs completos estão documentados. Prorrogação não restaura revogados ou variantes anteriores.

- [Planilha atual de conferência por blocos](anat-03-conferencia-blocos.xlsx).
- [Índice dos 25 blocos e passo a passo](escopo-corrigido/blocos.md).
- [Classificação por escopo](escopo-corrigido/classificacao.md) e [registro completo por ID](escopo-corrigido/classificacao.json).
- [Prova dos prazos atuais](escopo-corrigido/prazos/relatorio.md).
- [Escopo, percentual e limites](escopo-corrigido/README.md).

Marcar somente os blocos positivos na issue #116. Duas confirmações anteriores, ANAT03-00342 e ANAT03-00961, permanecem restritas à exclusão histórica de 8450.11.00; não são aprovações positivas de blocos. Referências NBM em textos normativos atuais não habilitam seleção ou conversão de códigos NBM no piloto.

## Entregas anteriores preservadas

- [ANAT-02: relatório](anat-02-leitura.md), [SQL read-only](anat-02-sql.sql), [30 fichas](anat-02-fichas.md) e [anotação estrutural](anat-02-anotacao.md).
- [Resultado do SELECT humano](anat-02-dashboard-resultado.json): dois HTMLs persistidos idênticos aos snapshots sanitizados por SHA-256. Isso confirma HTML/classes das versões verificadas; não comprova content_text, grants/RLS ou vigência jurídica.
- [Dossiê-base anterior](anat-03-dossie-vigencia.xlsx), [dataset congelado](anat-03-trechos.json), [dependências anteriores](anat-03-dependencias-verificadas.json) e [síntese](anat-03-sintese.md). As marcações e pendências de linha desses inventários são o estado histórico da preparação; a conferência atual usa o novo checklist de blocos.
- [PDFs conferidos](pdf-conferencia/README.md): 8 + 62 páginas e 77 revisões documentais anteriores.
- [Primeiro lote autônomo](lote-autonomo/FECHAMENTO.md), [primeiro checkpoint da janela](continuidade-4h/README.md), [segundo](continuidade-4h/CHECKPOINT-02.md) e [CHECKPOINT-03](continuidade-4h/CHECKPOINT-03.md).
- [Planilha complementar congelada do terceiro lote](anat-03-evidencias-complementares.xlsx), publicada como estava; não é a nova fila de conferência positiva.

O CHECKPOINT-03 foi publicado em084d804 sem pesquisa nova. Divergências históricas ficaram registradas sem aprofundamento. A classificação atual preserva os 2.434 IDs, literais, códigos, XPath e hashes do dataset-base. As classes/notas do CONFAZ são prova da exclusão documental; a cor isolada não foi usada para declarar vigência.

## Próximo passo

Fábio abre os blocos na issue #116, confere trecho/fundamento e marca os que aprovar integralmente. Divergência: manter a caixa desmarcada e apontar bloco/trecho. A issue é o registro primário e a planilha não se sincroniza automaticamente. A pesquisa histórica individual e a antiga fila de 2.432 aprovações por linha foram substituídas pela correção do COORD.

Sem código, migration, banco, coleta operacional, merge, deploy ou Railway. Nenhuma implementação F1–F3 ou mudança de produto autorizada. A automação anterior permanece pausada.
