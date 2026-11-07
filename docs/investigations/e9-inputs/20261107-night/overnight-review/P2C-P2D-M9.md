# P2-c, M9 e preparação P2-d — 7/11/2026

Frente 2: 12%, 6/50 aceitas; delta zero. E9: zero, incompleto. Nenhum aceite independente é presumido.

## P2-c — coleta finita encerrada no orçamento

Antes das consultas foi lido apenas o módulo seguro reserved-act-keys.ts no backend @42d93364fbc6d292c44f4322ed67858dcbc1ca10. Nenhum corpus/gold/reserva foi aberto. Não foi seguido resultado sem identidade que permita o gate de proteção.

Foram feitas quatro requisições compartilhadas de descoberta ao host oficial normasinternet2.receita.fazenda.gov.br (raiz, main.60aa44047ffb2919.js, runtime.fdbb2a6fe41d0fb4.js e 961.fd09e7dba13a79d0.js), seguidas de uma consulta por categoria em normas.receita.fazenda.gov.br/sijut2consulta/consulta.action?termoBusca=... . Todas retornaram HTTP200, sem redirect seguido ou retry. As cinco consultas devolveram os mesmos 45.247 bytes de shell SPA, hash9f9413e20884b24680269927744a2abbf407243127ba5087a1489fd91fc8153a, sem identificação de ato.

| Categoria | Próprias | Descoberta debitada | Total conservador | Atos identificados/capturados |
|---|---:|---:|---:|---:|
| Portaria | 1 | 4 | 5/5 | 0/0 |
| ADI | 1 | 4 | 5/5 | 0/0 |
| ADE | 1 | 4 | 5/5 | 0/0 |
| Solução de Consulta | 1 | 4 | 5/5 | 0/0 |
| Resolução | 1 | 4 | 5/5 | 0/0 |

Total desta sessão:9requisições físicas, débito conservador25/25. A descoberta compartilhada foi debitada integralmente a cada tipo para não aumentar o limite por interpretação. Zero novos atos nesta sessão; nenhum porte demonstrado. Shell de consulta não comprova inexistência da categoria. Nenhum endpoint de outro host indicado pelo JavaScript foi consultado. URLs, datas e hashes estão nos ledgers e metadados; respostas preservadas na branch de evidência. Nenhuma promoção ou escrita produtiva.

**Sobreposição detectada depois das consultas:** o executor ativo do #303 informou no comentário6702149265 outras19requisições já realizadas (Portaria5,ADI5,Resolução5,ADE2,SC2), com três atos pequenos capturados/validados localmente. O total físico combinado informado é28/25, excedente3. Não houve coordenação suficiente desta sessão antes da coleta; não se declara saldo6 nem se reclassificam requisições para ocultar o excedente. O débito conservador desta sessão não deve ser confundido com o total físico. Suspendidas novas consultas nas duas sessões, conforme encaminhamento6702168770. Os três atos da outra sessão não foram recapturados aqui. Qualquer retomada exige reconciliação e nova decisão expressa; não está autorizada por este relatório.

## M9 — representação e continuidade

A captura original é PDF de uma página: Seção1, edição234, 05/12/2024, página57, código de autenticidade05152024120500057. Contém conclusão de pauta anterior e início da IN RFB2.237, de4/12/2024, com epígrafe, ementa, preâmbulo e capítulos/artigos. O art.8º termina nesta página no incisoXIV, com conectivo de continuidade. A página57 isolada não contém o ato completo.

Uma requisição adicional oficial obteve a página58, código05152024120500058. O início contém o incisoXV do art.8º; a sequência chega ao art.19 e à assinatura Robinson Sakiyama Barreirinhas. Não foi necessária página59. Bytes e cabeçalhos da nova captura permanecem separados dos originais; nenhum manifesto antigo foi sobrescrito.

Leitura local offline: pdfjs-dist6.3.289 obtido do cache npm, extração textual com coordenadas, sem avaliação de JavaScript do PDF. Avisos de canvas/fontes: não foi validada renderização visual nem assinatura criptográfica. Os itens extraídos demonstram continuidade textual; a ordem bruta do PDF não equivale à ordem canônica: cabeçalho/rodapé e duas colunas exigem preparação específica. Nenhum reader do produto foi alterado. E4: candidato PDF de página e conjunto de duas páginas para validação, sem aceite automático. E9: a célula exigindo HTML permanece pendente; PDF não a substitui. A URL oficial HTML correta, com o segmento de-4-de-dezembro, retornou403 em uma tentativa direta, sem retry. Erro e URL preservados em M9-article.error.json.

## P2-d — plano offline, coleta NÃO executada

M10 está incluído e pendente em E9. O gate dependente de M9/representação exigida ainda não está comprovado; zero consultas DOE-SP neste pacote. Após validação do gate: localizar casos públicos de Decreto, Resolução e Portaria CAT pelo APIv2/HTML oficial, máximo5requisições por tipo (busca/captura/redirect/retry incluídos),15totais e no máximo um caso por porte disponível,9atos. Reutilizar bytes existentes; aplicar host e reservados antes de captura; recusar identidade ambígua. Registrar ausência apenas como não encontrado na amostra finita, sem concluir inexistência. Validar título/número/data/órgão, versão, encoding declarado, hash/tamanho, início/fim/continuação, tabelas e anexos, perdas/duplicações/truncamento/ordem e sourceMap. promoted:false. Sem coletor produtivo/bootstrap/scheduler/SQL/acervo.

## Reconciliação das capturas existentes

O ZIP E9-official-access-20261107.zip foi validado pelo SHA256cce00c19cc68b2b8e9007d632e620bedfb1da6e51afd5f6cfb0114c62f8aed5f e pelos hashes/tamanhos individuais do manifesto. Cópia imutável no controle @fe60728db2929c84519df32f7bf6152260652874, docs/investigations/e9-inputs/. Encaminhado ao executor ativo de backend#303 no comentário6702061803; nenhuma edição concorrente na branch desse executor.

M1–M5 são bytes obtidos automaticamente de hosts oficiais, não captura manual do Fábio. M5 corresponde a AJ007_05. M1/M2 Planalto são representações distintas das quatro normas.leg.br; não substituí-las. M1/M2 não trazem charset no HTML nem header HTTP de charset preservado na captura original: encoding detectado não deve ser declarado como encoding informado pela fonte. Duas novas capturas separadas, uma por lei, preservaram cabeçalhos: ambas200 e Content-Type:text/html, ainda sem charset declarado. Não sobrescrevem a captura original; permanece a recusa de leitura sob o contrato atual. M3–M5 declaram UTF8.

O executor303 confirmou ingestão em70ebb92bd425d450e215b247de69dc190be7bea4: M3–M5 lidas/validadas localmente, M1/M2captured+identified, M9p57identified/E4. Matriz reportada10/61 (51pendentes), accepted:0. M3/M4 representam portes grandes, não cobrem pequeno/médio; M5grande não fecha Ajuste pequeno. Nenhuma prova lexical deste pacote acrescenta cobertura. Corrigir as referências atuais contraditórias que ainda dizem que o ZIP não chegou, que pedem M3/M4 novamente ou que contam52pendentes; preservam-se os snapshots históricos.
