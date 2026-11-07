# P2-c, M9 e prepara��o P2-d - 7/11/2026

Frente 2: 12%, 6/50 aceitas; delta zero. E9: zero, incompleto. Nenhum aceite independente � presumido.

## P2-c - coleta finita encerrada no or�amento

Antes das consultas foi lido apenas o m�dulo seguro reserved-act-keys.ts no backend @42d93364fbc6d292c44f4322ed67858dcbc1ca10. Nenhum corpus/gold/reserva foi aberto. N�o foi seguido resultado sem identidade que permita o gate de prote��o.

Foram feitas quatro requisi��es compartilhadas de descoberta ao host oficial normasinternet2.receita.fazenda.gov.br (raiz, main.60aa44047ffb2919.js, runtime.fdbb2a6fe41d0fb4.js e 961.fd09e7dba13a79d0.js), seguidas de uma consulta por categoria em normas.receita.fazenda.gov.br/sijut2consulta/consulta.action?termoBusca=... . Todas retornaram HTTP200, sem redirect seguido ou retry. As cinco consultas devolveram os mesmos 45.247 bytes de shell SPA, hash9f9413e20884b24680269927744a2abbf407243127ba5087a1489fd91fc8153a, sem identifica��o de ato.

| Categoria | Pr�prias | Descoberta debitada | Total conservador | Atos identificados/capturados |
|---|---:|---:|---:|---:|
| Portaria | 1 | 4 | 5/5 | 0/0 |
| ADI | 1 | 4 | 5/5 | 0/0 |
| ADE | 1 | 4 | 5/5 | 0/0 |
| Solu��o de Consulta | 1 | 4 | 5/5 | 0/0 |
| Resolu��o | 1 | 4 | 5/5 | 0/0 |

Total desta sess�o:9requisi��es f�sicas, d�bito conservador25/25. A descoberta compartilhada foi debitada integralmente a cada tipo para n�o aumentar o limite por interpreta��o. Zero novos atos nesta sess�o; nenhum porte demonstrado. Shell de consulta n�o comprova inexist�ncia da categoria. Nenhum endpoint de outro host indicado pelo JavaScript foi consultado. URLs, datas e hashes est�o nos ledgers e metadados; respostas preservadas na branch de evid�ncia. Nenhuma promo��o ou escrita produtiva.

**Sobreposi��o detectada depois das consultas:** o executor ativo do #303 informou no coment�rio6702149265 outras19requisi��es j� realizadas (Portaria5,ADI5,Resolu��o5,ADE2,SC2), com tr�s atos pequenos capturados/validados localmente. O total f�sico combinado informado �28/25, excedente3. N�o houve coordena��o suficiente desta sess�o antes da coleta; n�o se declara saldo6 nem se reclassificam requisi��es para ocultar o excedente. O d�bito conservador desta sess�o n�o deve ser confundido com o total f�sico. Suspendidas novas consultas nas duas sess�es, conforme encaminhamento6702168770. Os tr�s atos da outra sess�o n�o foram recapturados aqui. Qualquer retomada exige reconcilia��o e nova decis�o expressa; n�o est� autorizada por este relat�rio.

## M9 - representa��o e continuidade

A captura original � PDF de uma p�gina: Se��o1, edi��o234, 05/12/2024, p�gina57, c�digo de autenticidade05152024120500057. Cont�m conclus�o de pauta anterior e in�cio da IN RFB2.237, de4/12/2024, com ep�grafe, ementa, pre�mbulo e cap�tulos/artigos. O art.8� termina nesta p�gina no incisoXIV, com conectivo de continuidade. A p�gina57 isolada n�o cont�m o ato completo.

Uma requisi��o adicional oficial obteve a p�gina58, c�digo05152024120500058. O in�cio cont�m o incisoXV do art.8�; a sequ�ncia chega ao art.19 e � assinatura Robinson Sakiyama Barreirinhas. N�o foi necess�ria p�gina59. Bytes e cabe�alhos da nova captura permanecem separados dos originais; nenhum manifesto antigo foi sobrescrito.

Leitura local offline: pdfjs-dist6.3.289 obtido do cache npm, extra��o textual com coordenadas, sem avalia��o de JavaScript do PDF. Avisos de canvas/fontes: n�o foi validada renderiza��o visual nem assinatura criptogr�fica. Os itens extra�dos demonstram continuidade textual; a ordem bruta do PDF n�o equivale � ordem can�nica: cabe�alho/rodap� e duas colunas exigem prepara��o espec�fica. Nenhum reader do produto foi alterado. E4: candidato PDF de p�gina e conjunto de duas p�ginas para valida��o, sem aceite autom�tico. E9: a c�lula exigindo HTML permanece pendente; PDF n�o a substitui. A URL oficial HTML correta, com o segmento de-4-de-dezembro, retornou403 em uma tentativa direta, sem retry. Erro e URL preservados em M9-article.error.json.

## P2-d - plano offline, coleta N�O executada

M10 est� inclu�do e pendente em E9. O gate dependente de M9/representa��o exigida ainda n�o est� comprovado; zero consultas DOE-SP neste pacote. Ap�s valida��o do gate: localizar casos p�blicos de Decreto, Resolu��o e Portaria CAT pelo APIv2/HTML oficial, m�ximo5requisi��es por tipo (busca/captura/redirect/retry inclu�dos),15totais e no m�ximo um caso por porte dispon�vel,9atos. Reutilizar bytes existentes; aplicar host e reservados antes de captura; recusar identidade amb�gua. Registrar aus�ncia apenas como n�o encontrado na amostra finita, sem concluir inexist�ncia. Validar t�tulo/n�mero/data/�rg�o, vers�o, encoding declarado, hash/tamanho, in�cio/fim/continua��o, tabelas e anexos, perdas/duplica��es/truncamento/ordem e sourceMap. promoted:false. Sem coletor produtivo/bootstrap/scheduler/SQL/acervo.

## Reconcilia��o das capturas existentes

O ZIP E9-official-access-20261107.zip foi validado pelo SHA256cce00c19cc68b2b8e9007d632e620bedfb1da6e51afd5f6cfb0114c62f8aed5f e pelos hashes/tamanhos individuais do manifesto. C�pia imut�vel no controle @fe60728db2929c84519df32f7bf6152260652874, docs/investigations/e9-inputs/. Encaminhado ao executor ativo de backend#303 no coment�rio6702061803; nenhuma edi��o concorrente na branch desse executor.

M1-M5 s�o bytes obtidos automaticamente de hosts oficiais, n�o captura manual do F�bio. M5 corresponde a AJ007_05. M1/M2 Planalto s�o representa��es distintas das quatro normas.leg.br; n�o substitu�-las. M1/M2 n�o trazem charset no HTML nem header HTTP de charset preservado na captura original: encoding detectado n�o deve ser declarado como encoding informado pela fonte. Duas novas capturas separadas, uma por lei, preservaram cabe�alhos: ambas200 e Content-Type:text/html, ainda sem charset declarado. N�o sobrescrevem a captura original; permanece a recusa de leitura sob o contrato atual. M3-M5 declaram UTF8.

O executor303 confirmou ingest�o em70ebb92bd425d450e215b247de69dc190be7bea4: M3-M5 lidas/validadas localmente, M1/M2captured+identified, M9p57identified/E4. Matriz reportada10/61 (51pendentes), accepted:0. M3/M4 representam portes grandes, n�o cobrem pequeno/m�dio; M5grande n�o fecha Ajuste pequeno. Nenhuma prova lexical deste pacote acrescenta cobertura. Corrigir as refer�ncias atuais contradit�rias que ainda dizem que o ZIP n�o chegou, que pedem M3/M4 novamente ou que contam52pendentes; preservam-se os snapshots hist�ricos.

