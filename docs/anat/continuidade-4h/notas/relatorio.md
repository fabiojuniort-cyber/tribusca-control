# ANAT — triagem das 105 notas remanescentes

Origem CLAUDE-COORD → GPT-EXEC. Continuidade de quatro horas autorizada por Fábio; 16/10/2026. R0, análise offline.

As 105 notas foram classificadas individualmente. Novas ligações são candidatas e ficam neste complemento: inventário anterior, dossiê e planilha permanecem intactos. Nenhuma conclusão de vigência ou aprovação foi acrescentada.

## Contagens

```json
{
  "notasTriadas": 105,
  "notasComCandidatoAdicional": 44,
  "notasSemCandidatoIndividual": 61,
  "relacoesNotaId": 92,
  "idsCandidatosUnicos": 89,
  "porCategoria": {
    "metadado_global": 3,
    "remissao_geral": 7,
    "prorrogacao_geral": 32,
    "candidato_sucessor_delimitado": 33,
    "inconsistencia_editorial": 7,
    "escopo_anexo_inteiro": 5,
    "candidato_coletivo_explicito": 7,
    "ambiguidade_celula_variante_codigo": 7,
    "candidato_mesma_linha": 4
  },
  "reconciliacaoComMapaAnterior": {
    "notasComCandidatoAnterior": 71,
    "notasComCandidatoSomandoComplemento": 115,
    "idsAlvoUnicosAnteriores": 77,
    "idsComunsEntreMapas": 0,
    "idsUnicosSomandoComplemento": 166,
    "notasInventariadas": 176,
    "verificacao176": 176
  }
}
```

## Critério

Cada literal e XPath foi resolvido contra o HTML local, idêntico em LF ao snapshot frozen. Nos grupos coletivos, cada número da sequência expressa foi conferido célula por célula; nenhuma nota é herdada por linhas fora do grupo. Notas em uma linha com duas variantes permanecem sem ligação. Caput não se estende a subitens. Códigos NBM de dez dígitos e NCM de oito dígitos permanecem literais, sem conversão.

As notas globais e de anexos foram triadas, mas não receberam IDs individuais: sua aplicação por trecho depende de regras e revisão específicas. Os dois IDs aprovados foram excluídos de todos os candidatos. As notas N52-089/090 apontam apenas aos outros dois subitens de seu grupo; 00342 conserva a aprovação previamente registrada.

O critério é ligação editorial documental. N52-075 contém atribuição histórica ao 129/19 e N52-102 contém a data 31;08;10: a ligação não valida esses conteúdos. N52-126/130/134/135 ficam sem candidato por divergência de número; N52-060/064/068 também aguardam confronto dos atos ou solução do conflito. A correção jurídica pode usar o relatório de atos em separado, nunca a proximidade DOM.

## Inventário completo da triagem

| Nota | Categoria | IDs candidatos (pendentes) | Fundamento / limite |
|---|---|---|---|
| N52-001 | metadado_global | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-002 | metadado_global | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-003 | metadado_global | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-004 | remissao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-005 | remissao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-006 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-007 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-008 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-009 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-010 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-011 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-012 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-013 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-014 | remissao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-015 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-016 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-017 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-018 | remissao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-019 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-020 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-021 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-022 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-023 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-024 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-025 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-026 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-027 | remissao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-028 | remissao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-029 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-030 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-031 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-032 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-033 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-034 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-035 | remissao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-036 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-037 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-038 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-039 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-040 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-041 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-042 | prorrogacao_geral | — | Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91. |
| N52-048 | candidato_sucessor_delimitado | ANAT03-00012 | Variante original do inciso II; nota anterior N52-047 explicita inciso II e o sucessor começa II -. |
| N52-060 | inconsistencia_editorial | — | Nota diz cláusula segunda; contexto DOM pertence à quarta. Exige confronto do modificador; nenhuma correção literal inferida. |
| N52-064 | inconsistencia_editorial | — | Nota literal quarta-feira é anômala; vínculo aguarda confronto do modificador 10/26. |
| N52-068 | inconsistencia_editorial | — | Conflito entre efeitos até 31.12.16 e revogação indicada por N52-067 a partir de 01.01.16. Não harmonizar datas. |
| N52-070 | escopo_anexo_inteiro | — | Nota de anexo inteiro/variante histórica. Pode ancorar a variante, mas a identificação da tabela não homologa cada linha nem substitui as notas locais. Sem vínculo individual em massa. |
| N52-075 | candidato_sucessor_delimitado | ANAT03-00163 | Número explícito 20.2 igual ao ITEM sucessor; a atribuição do modificador e efeitos continuam pendentes. |
| N52-089 | candidato_coletivo_explicito | ANAT03-00343, ANAT03-00344 | Revogação coletiva explícita; pula exatamente a nota histórica N52-090, exige sequência 39.1/39.2/39.3. Controle aprovado 00342 excluído. |
| N52-090 | candidato_coletivo_explicito | ANAT03-00343, ANAT03-00344 | Histórico coletivo explícito e sequência 39.1/39.2/39.3. Controle aprovado 00342 excluído. |
| N52-093 | candidato_coletivo_explicito | ANAT03-00354 | Revogação 40.2 explícita; pula exatamente nota histórica N52-094 e limita-se a 40.2. |
| N52-094 | candidato_sucessor_delimitado | ANAT03-00354 | Número 40.2 expresso, apesar da grafia literal subite, igual à célula ITEM sucessora. |
| N52-101 | candidato_coletivo_explicito | ANAT03-00524, ANAT03-00525, ANAT03-00526, ANAT03-00527, ANAT03-00528, ANAT03-00529, ANAT03-00530, ANAT03-00531, ANAT03-00532, ANAT03-00533, ANAT03-00534, ANAT03-00535, ANAT03-00536, ANAT03-00537, ANAT03-00538 | Escopo expresso item 55 e subitens 55.1 a 55.14; sequência completa até a próxima nota N52-102. |
| N52-102 | candidato_coletivo_explicito | ANAT03-00540, ANAT03-00541, ANAT03-00542, ANAT03-00543, ANAT03-00544, ANAT03-00545, ANAT03-00546, ANAT03-00547, ANAT03-00548, ANAT03-00549, ANAT03-00550, ANAT03-00551, ANAT03-00552, ANAT03-00553, ANAT03-00554 | Escopo expresso item 55 e subitens 55.1 a 55.14, variante histórica separada; data literal 31;08;10 preservada. |
| N52-105 | candidato_coletivo_explicito | ANAT03-00652, ANAT03-00653, ANAT03-00654 | Escopo expresso 72, 72.1 e 72.2; são as três últimas linhas da tabela desta variante. |
| N52-106 | escopo_anexo_inteiro | — | Nota de anexo inteiro/variante histórica. Pode ancorar a variante, mas a identificação da tabela não homologa cada linha nem substitui as notas locais. Sem vínculo individual em massa. |
| N52-107 | escopo_anexo_inteiro | — | Nota de anexo inteiro/variante histórica. Pode ancorar a variante, mas a identificação da tabela não homologa cada linha nem substitui as notas locais. Sem vínculo individual em massa. |
| N52-111 | candidato_sucessor_delimitado | ANAT03-01384 | Variante original imediatamente após N52-110/linha 2.1; sucessor 2.1, sem nota intermediária. |
| N52-126 | inconsistencia_editorial | — | Nota declara 13.4 e 28.12.20; linha sucessora é 13.5. Não vincular por proximidade. |
| N52-127 | candidato_sucessor_delimitado | ANAT03-01452 | Número 13.5 explícito igual ao ITEM sucessor; a nota conflitante N52-126 não é herdada. |
| N52-130 | inconsistencia_editorial | — | Nota declara 14.9; linha sucessora é 14.19. Não trocar número silenciosamente. |
| N52-133 | candidato_sucessor_delimitado | ANAT03-01493 | Variante original entre a redação de 17/N52-132 e o próximo item 18; apenas a linha 17. |
| N52-134 | inconsistencia_editorial | — | Nota declara 13.3; linha sucessora é 19.2. Não usar o alvo 13.3 de outra posição. |
| N52-135 | inconsistencia_editorial | — | Nota original declara 13.3; linha sucessora é 19.2. Exige confronto de modificador e variante. |
| N52-136 | escopo_anexo_inteiro | — | Nota de anexo inteiro/variante histórica. Pode ancorar a variante, mas a identificação da tabela não homologa cada linha nem substitui as notas locais. Sem vínculo individual em massa. |
| N52-137 | escopo_anexo_inteiro | — | Nota de anexo inteiro/variante histórica. Pode ancorar a variante, mas a identificação da tabela não homologa cada linha nem substitui as notas locais. Sem vínculo individual em massa. |
| N52-138 | candidato_sucessor_delimitado | ANAT03-01591 | Expressão item abaixo e linha sucessora Válvula; sem alcance para a nota N52-139. |
| N52-139 | ambiguidade_celula_variante_codigo | — | Código 7307.19.0300 na própria linha da nota e sucessor Válvula sem código; geometria das células requer revisão visual antes de apontar ID. |
| N52-140 | candidato_sucessor_delimitado | ANAT03-01596 | Expressão item abaixo e linha sucessora Brocas, na mesma tabela histórica. |
| N52-141 | candidato_sucessor_delimitado | ANAT03-01598 | Expressão item abaixo e linha sucessora Ferramentas de embutir, de estampar ou de puncionar. |
| N52-142 | candidato_sucessor_delimitado | ANAT03-01617 | Expressão item abaixo e linha sucessora Outras bombas centrífugas. |
| N52-143 | candidato_sucessor_delimitado | ANAT03-01688 | Expressão item abaixo e linha sucessora Aparelhos para filtrar ou depurar gases. |
| N52-144 | candidato_sucessor_delimitado | ANAT03-01723 | Número 15.8 explícito igual ao ITEM sucessor; não inclui a linha com duas variantes históricas. |
| N52-145 | ambiguidade_celula_variante_codigo | — | Duas variantes 15.08 e dois códigos iguais na mesma linha; XPath de linha não separa os efeitos desta nota. |
| N52-146 | ambiguidade_celula_variante_codigo | — | Mesma linha contém a variante de N52-145 e a original; não atribuir a nota aos dois registros NCM. |
| N52-147 | candidato_sucessor_delimitado | ANAT03-02061 | Caput 33.03 explícito igual ao ITEM sucessor; não inclui alíneas e códigos subsequentes. |
| N52-148 | candidato_mesma_linha | ANAT03-02062 | Nota e único caput histórico 33.03 na mesma linha; vínculo à linha, sem propagar às alíneas. |
| N52-149 | candidato_sucessor_delimitado | ANAT03-02163 | Expressão item abaixo e linha sucessora Packer (obturador). |
| N52-150 | candidato_sucessor_delimitado | ANAT03-02165 | Número 40.07 explícito igual ao ITEM sucessor; a variante original fica separada. |
| N52-151 | candidato_mesma_linha | ANAT03-02166 | Nota e única variante original 40.07 na mesma linha; não confundir com a redação da linha anterior. |
| N52-152 | candidato_sucessor_delimitado | ANAT03-02191 | Nota de acréscimo de item seguida exclusivamente de Árvore de natal antes da próxima nota. |
| N52-153 | candidato_sucessor_delimitado | ANAT03-02193 | Nota de acréscimo de item seguida exclusivamente de Manifold e válvula tipo gaveta antes da próxima nota. |
| N52-154 | candidato_sucessor_delimitado | ANAT03-02195 | Nota de acréscimo de item seguida exclusivamente de Válvula tipo esfera antes da próxima nota. |
| N52-155 | candidato_sucessor_delimitado | ANAT03-02197 | Nota de acréscimo de item seguida exclusivamente de Válvula tipo borboleta antes da próxima nota. |
| N52-156 | candidato_sucessor_delimitado | ANAT03-02199 | Nota explicita item 41-A; apenas seu cabeçalho sucessor, sem propagação ao 41-A-01. |
| N52-157 | candidato_sucessor_delimitado | ANAT03-02202 | Nota explicita item 41-B; apenas seu cabeçalho sucessor, sem propagação ao 41-B-01. |
| N52-158 | candidato_sucessor_delimitado | ANAT03-02218 | Número 43.05 explícito igual ao ITEM sucessor. |
| N52-159 | candidato_sucessor_delimitado | ANAT03-02220 | Expressão item abaixo e linha sucessora Mancal de bronze para locomotiva, variante 8607.19.0400. |
| N52-160 | candidato_mesma_linha | ANAT03-02221 | Expressão item abaixo e única variante histórica do Mancal na mesma linha; NCM 8607.19.9900. |
| N52-161 | candidato_coletivo_explicito | ANAT03-02223, ANAT03-02224, ANAT03-02225, ANAT03-02226, ANAT03-02227, ANAT03-02228, ANAT03-02229, ANAT03-02230, ANAT03-02231, ANAT03-02232, ANAT03-02233, ANAT03-02234, ANAT03-02235, ANAT03-02236, ANAT03-02237, ANAT03-02238 | Escopo expresso I a XVI; sequência romana completa nas últimas 16 linhas da tabela histórica do Anexo I. |
| N52-162 | candidato_sucessor_delimitado | ANAT03-02260 | Nota singular de acréscimo imediatamente seguida de Arado de disco, antes do item 10. |
| N52-163 | ambiguidade_celula_variante_codigo | — | Nota contém dois NBM explícitos; associação com linhas/variantes e alcance da alteração de carga requer confirmação, sem expandir posições. |
| N52-164 | candidato_sucessor_delimitado | ANAT03-02278 | Nome microtrator explícito na nota e sucessor Microtrator; sem estender ao item 21. |
| N52-165 | candidato_sucessor_delimitado | ANAT03-02281 | Número 22 explícito igual ao ITEM sucessor; variante 8701.90.90. |
| N52-166 | candidato_sucessor_delimitado | ANAT03-02283 | Número 22 explícito igual ao ITEM sucessor; variante 8701.90.00. |
| N52-167 | candidato_mesma_linha | ANAT03-02284 | Nota original do item 22 e único texto 22 na mesma linha; NBM literal 8701.90.0200. |
| N52-168 | candidato_sucessor_delimitado | ANAT03-02286 | Nome bombas explícito na nota e sucessor Bombas; não alcança o item 23. |
| N52-169 | ambiguidade_celula_variante_codigo | — | Nota na linha com redação histórica b, enquanto b) Excluída está na linha anterior; relação temporal/revogação exige dupla anotação conferida. |
| N52-170 | ambiguidade_celula_variante_codigo | — | Códigos de oito dígitos de exclusão versus faixa NBM de dez dígitos na linha posterior; não equiparar ou expandir faixa. |
| N52-171 | ambiguidade_celula_variante_codigo | — | Posições NBM específicas versus faixa ampla em outra linha; não atribuir a todos os códigos da faixa. |
| N52-172 | candidato_sucessor_delimitado | ANAT03-02314 | Nota singular de acréscimo imediatamente seguida de Ovascan, antes da nota do item 31. |
| N52-173 | candidato_sucessor_delimitado | ANAT03-02316 | Número 31 explícito; ITEM sucessor 31; hífen separador mantido fora do número. |
| N52-174 | candidato_sucessor_delimitado | ANAT03-02318 | Número 32 explícito; ITEM sucessor 32; hífen separador mantido fora do número. |
| N52-175 | candidato_sucessor_delimitado | ANAT03-02320 | Número 33 explícito; ITEM sucessor 33; hífen separador mantido fora do número. |
| N52-176 | candidato_sucessor_delimitado | ANAT03-02322, ANAT03-02323 | Número 34 explícito; ITEM sucessor 34 com dois códigos NCM, preservados separadamente. |

## Controle verificável

- 105/105 notas remanescentes cobertas, sem duplicidade ou alteração de literal.
- XPath dos candidatos corresponde ao registro do dossiê e resolve uma única linha/bloco na fonte.
- Hashes SHA-256 do inventário anterior, JSON principal e XLSX antes/depois iguais (ver JSON).
- Nenhum candidato aponta para ANAT03-00342 ou ANAT03-00961; nenhum aprovado=true foi criado.
- Resultado não integrado automaticamente ao inventário anterior, JSON principal ou XLSX. Conferência humana dos 2.432 trechos pendentes continua necessária.
- A leitura é do snapshot histórico informado; não é prova de que a página oficial continua igual nesta data.
