# ANAT-03 — conferência por blocos em 16/10/2026

Origem: **CLAUDE-COORD → GPT-EXEC**, correção encaminhada diretamente pelo Fábio e registrada na issue #116. Pesquisa histórica encerrada. O [CHECKPOINT-03](../continuidade-4h/CHECKPOINT-03.md) publicou o lote local como estava, sem pesquisa nova.

## Resultado do escopo corrigido

| Medida | Resultado |
|---|---:|
| Registros do inventário-base | 2.434 |
| Não elegíveis, classificados em bloco | 1.706 |
| Trechos vigentes — proposta | 728 |
| Propostos do 52/91 | 664 |
| Propostos do 100/97 | 64 |
| Blocos positivos para conferência | 25 |
| Blocos positivos aprovados pelo Fábio | 0 |
| Aprovações históricas anteriores preservadas | 2 |

Os 1.706 registros fora do conjunto positivo incluem redações/anexos anteriores, NBM históricos, revogados, notas, cabeçalhos e alcance temporal interno encerrado. A prova é a classe/nota/literal CONFAZ, com XPath preservado; não houve investigação por linha histórica. Os textos, códigos e hashes não foram reescritos. Referência NBM em cláusula atual não torna seu código elegível para seleção ou conversão em NCM.

O §6 da primeira do 100/97, com prazo literal de dois anos desde 06/08/2003, foi excluído pelo limite temporal interno; não se declarou sua revogação formal nem se abriu pesquisa histórica. A convalidação atual de operações de 1997 permanece com esse alcance literal, sem criar benefício para operações novas.

## Onde conferir

- [Planilha de conferência por blocos](../anat-03-conferencia-blocos.xlsx): aba **Conferência** para os 25 blocos; **Classificação** para as exclusões e rastreabilidade; **Prazos** para atos, ADs, efeitos e prazo final.
- [Índice dos 25 blocos e passo a passo](blocos.md): cada arquivo de bloco contém seu trecho selecionado completo, situação proposta, fundamento e links.
- [Classificação administrativa](classificacao.md) e [dados por ID](classificacao.json).
- [Cadeias mínimas de prazo](prazos/relatorio.md) e [eventos estruturados](prazos/evidencias.json).

52/91: 226/23 + AD 1/24 → 10/26 + AD 4/26; prazo final **31/12/2026**, com efeitos expressos da última prorrogação em **01/05/2026**. 100/97: 26/21 + AD 6/21 → 79/25 + AD 16/25; prazo final **31/12/2027**, com vigor/efeitos derivados da ratificação publicada em **25/07/2025**, sem marco autônomo de diferimento expresso. Os ADs completos foram lidos; prorrogação não restaura revogados ou redações anteriores.

Na issue #116, marque o bloco somente se concordar com seu trecho e fundamento completos. Se houver diferença, mantenha a caixa desmarcada e informe o bloco/trecho. A marcação na issue é o registro primário; não é preciso revisar nem aprovar as 1.706 exclusões uma a uma. A planilha não se sincroniza automaticamente com as caixas da issue.

## Percentual declarado

**ANAT-03: 80% — quatro de cinco marcos concluídos.** Preparação documental: 100%; aprovação positiva: 0/25 blocos.

1. CHECKPOINT-03 publicado: concluído.
2. Exclusão histórica em bloco: concluída.
3. Prova positiva dos prazos atuais: concluída.
4. Blocos, planilha e checklist preparados: concluídos.
5. Conferência do Fábio: pendente.

O percentual mede andamento desses marcos, não percentual de normas juridicamente homologadas. As duas confirmações anteriores dos IDs ANAT03-00342 e ANAT03-00961 continuam restritas à exclusão histórica e não contam como aprovação positiva de blocos.

Os inventários e planilhas anteriores são bases congeladas de rastreabilidade. A conferência operacional vigente é a nova planilha e o checklist de blocos; a antiga fila de aprovação por milhares de linhas foi substituída pela correção do COORD.

Sem código, migration, banco, coleta operacional, merge, deploy ou Railway. Nenhuma mudança de produto foi autorizada. Retorno para CLAUDE-COORD: https://github.com/fabiojuniort-cyber/tribusca-control/issues/116
