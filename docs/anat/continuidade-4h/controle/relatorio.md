# ANAT — controle documental de atos e IDs

Origem: CLAUDE-COORD. Executor: GPT-EXEC / controle_cadeias. R0 offline.

**Nenhuma aprovação nova ou alteração de vigência.** Base principal e planilha permanecem intactas. Cruzamento usa o registro anterior dos oito atos, sem nova pesquisa oficial. Datas herdadas devem ser conferidas antes de qualquer uso jurídico.

Foram organizados 46 pares diretos ato/ID (incluindo variantes históricas) e três âncoras indiretas, totalizando 49 pares e 47 IDs únicos. Os 2.432 trechos continuam pendentes; ANAT03-00342 e ANAT03-00961 ficaram excluídos.

| Ato | IDs/âncoras | Limite |
| --- | --- | --- |
| Convênio ICMS 104/21 | ANAT03-02364, ANAT03-02423, ANAT03-02424, ANAT03-02425, ANAT03-02365, ANAT03-02366, ANAT03-02367 | §1º da primeira revogado e parágrafo único da terceira-A acrescido. São dispositivos diferentes; nota do 26/21 não é prova da revogação. |
| Convênio ICMS 223/21 | ANAT03-02416 | Alvo direto é a terceira do 26/21. ID02416 é somente âncora de contexto para a terceira-A do 100/97; BA/RS/SC/SE são conjunto histórico, condicionado à cadeia 228/21. |
| Convênio ICMS 228/21 | ANAT03-02416 | Alteração do 26/21, exclui RS/SC do parágrafo da transição, sem excluir esses Estados de todo 100/97. ID02416 é âncora indireta. |
| Convênio ICMS 26/22 | ANAT03-02416 | Alteração/renumeração da terceira do 26/21 e autorização AM. Não é o parágrafo único da terceira-A do 100/97 e não prova implementação estadual. |
| Convênio ICMS 63/05 | ANAT03-02397, ANAT03-02398, ANAT03-02399, ANAT03-02400, ANAT03-02401, ANAT03-02402, ANAT03-02410, ANAT03-02403, ANAT03-02404, ANAT03-02405, ANAT03-02407, ANAT03-02408, ANAT03-02409, ANAT03-02411 | §§1º/2º da terceira; variantes anteriores próximas são candidatas ao encerramento, sem corrigir 21.07.15 literal. ID02406 é redação ainda mais antiga, substituída por 16/05, excluída do vínculo de predecessor imediato. |
| Convênio ICMS 146/20 | ANAT03-01413, ANAT03-01417, ANAT03-01449, ANAT03-01450, ANAT03-01415, ANAT03-01419, ANAT03-01452 | Somente tabela 3 Anexo II 10.1,10.2,13.5. Nota literal 13.4/28.12.20 permanece; ato registrado aponta 13.5/ratificação 29.12.20. Não alterar 13.4. |
| Convênio ICMS 199/23 | ANAT03-01478, ANAT03-01479, ANAT03-01491, ANAT03-01481, ANAT03-01493 | Somente tabela 3 Anexo II 14.19 e17. Nota 14.9 não desloca o alvo; vigência registrada 29.12.2023 difere de efeitos 01.07.2024. Código 8467.89.00 igual em 14.18 não autoriza vínculo. |
| Convênio ICMS 129/19 | ANAT03-00161, ANAT03-01421, ANAT03-01440, ANAT03-01441, ANAT03-01498, ANAT03-01499, ANAT03-01500, ANAT03-01501, ANAT03-01502, ANAT03-00163, ANAT03-01423, ANAT03-01443, ANAT03-01504 | Anexo I  tabela 1 item20.2 e Anexo II  tabela 3 itens10.3,13.3,19.2; alvos separados apesar da nota13.3 junto 19.2. Efeitos registrados de 20.2 são01.10.2019; demais29.07.2019. Não atribuir autoria da redação anterior ao ato substituidor. |

## Critérios de conferência

O JSON separa a redação apresentada como nova no snapshot, a variante anterior candidata a encerramento e a âncora indireta. O rótulo “nova” descreve o documento e não prova vigência atual. Cópias de literais, XPath, código, domínio e hash permitem verificar cada decisão.

13.4/13.5 e 14.9/14.19 são alvos diferentes. A 129/19 trata 13.3 e 19.2 separadamente, com datas de efeitos diferentes para 20.2. Mesmo NCM não basta:8467.89.00 aparece em 14.18 e 14.19, assim como variantes históricas compartilham códigos.

O dossiê tem 735 linhas no domínio NBM/SH, 587 com código. Nenhuma entrou no mapa. O exemplo ANAT03-01591 preserva 8481.80.9910 (10 dígitos), sem converter para NCM. Campos vazios não são códigos. Não se faz equivalência histórica automática.

A cadeia 223/21→228/21→26/22 altera dispositivos do 26/21. Usou-se apenas ANAT03-02416 como âncora da terceira-A do 100/97; isso não atribui nova redação direta ao 100/97 nem comprova implantação estadual. O parágrafo único da terceira-A do 100/97 pertence à 104/21.

A data 21.07.15 do trecho ANAT03-02405 permanece literal; a proposta documental herdada 63/05 é 21.07.2005, ainda pendente. A ratificação 104/21 era nula na base herdada; a atualização paralela oficial confirma publicação em 27/07/2021 (AD 16/21, datado 26/07/2021). Ver [relatório de fontes](../atos/relatorio.md) e [texto do AD 16/21](../atos/AD016_21-texto.txt). O mapa conserva datas herdadas para rastreabilidade, sem manter essa pendência como estado atual do pacote.

## Exclusões verificáveis

- ANAT03-01445: 146/20 não altera13.4; nota conflita com dispositivo formal13.5.
- ANAT03-01447: Variante anterior13.4 também não corresponde a13.5.
- ANAT03-01466: 199/23 aponta14.19;14.9 é falso amigo literal.
- ANAT03-01476: Mesmo NCM8467.89.00 que 14.19, mas item 14.18 distinto.
- ANAT03-00146: Contexto agregado129/19 em item 19 do Anexo I não prova alvo 20.2.
- ANAT03-01425: Outra redação mais antiga 10.3, não predecessor imediato da 129/19 identificado neste mapa.
- ANAT03-02406: Versão99/04 do incisoII substituída antes por 16/05; não predecessor imediato para 63/05.
- ANAT03-01591: NBM/SH8481.80.9910 literal de10dígitos; sem conversão automática para NCM/SH.

## Validação

Todos os IDs existem, são únicos por ato e estão pendentes. Não houve alteração no JSON principal, planilha ou registro de atos; hashes antes/depois conferidos. Nenhum commit/push, acesso produtivo, coleta operacional ou escrita em banco foi executado por esta subtarefa.
