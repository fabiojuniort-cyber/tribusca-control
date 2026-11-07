# CTRL-60 — DATE-01: reconciliação para aceite

Frente 2: 12% (6/50), delta zero. Unidade de peso 1 da baseline fixa. Aceite final do pacote: COORD. Implementação e publicação já ocorreram; nenhuma nova operação nesta rodada.

## Em linguagem simples

AS IS: o filtro já foi colocado no site, mas o controle ainda descreve uma publicação em andamento e a evidência visual antiga não está mais disponível para download.
TO BE: documentar o que foi efetivamente revisado, integrado e publicado e anexar uma reprodução visual atual, permitindo ao COORD decidir o fechamento com provas.
Impacto: atualização de evidências e do controle. Sem mudança do filtro ou nova publicação.

## Critério → prova → lacuna

| Critério original | Prova | Lacuna / limite |
| --- | --- | --- |
| Data única e intervalo inclusivo | Backend #127 no head c28bfdee6df1e147bb09b0f68a0aef11e80cc9ca; CI36965642646 e pós-merge37054444448 SUCCESS; parecer R2 no corpo da #60. | Reprodução atual de navegador usa respostas sintéticas; não prova filtragem SQL produtiva. Essa garantia vem dos testes backend existentes. |
| Futuro não selecionável; régua clicável/recentralizada; granularidade e preenchimento | Web #32 head8429f1fac36a1ab857edcf339037537ff4260861, CI37020116072 SUCCESS: 81 unitários,100 Playwright,12 DATE-01. Nova regressão local em quatro viewports e capturas única/intervalo. | Capturas novas não são o artefato de outubro e não substituem a revisão R2 original. |
| URL/query, paginação, detalhe/retorno, limpeza e demais filtros independentes | Parecer [R2](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/32#issuecomment-5959893194) e e2e/date-01.spec.ts; reprodução atual verifica request/URL/paginação/detalhe e isolamento de Publicações. | Sem usuário real ou escrita produtiva. |
| Combinação com filtros, contagem, semântica publishedOn e CAT/PERF | Backend #127, revisão e CI completos; sem migration; preservação do caminho source+actType registrada. | Não foi reexecutado banco nesta rodada; não se abre gate R7. |
| Testes, typecheck, build e CI verdes | [Web](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/37020116072); [backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/36965642646); [pós-merge backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/37054444448). | Não se declara que estes runs testam a main de novembro; são provas dos SHAs da entrega. |
| Revisão independente R2 anterior ao merge | date01_independent_review: APPROVED, sem bloqueios; SHAs finais de backend127 e web32 explicitamente fixados. | P3 não bloqueante original: rótulo de rodapé em intervalo aberto. Mantido registrado, sem alterar interface por presunção. |
| Integração e publicação autorizadas | Autorização de02/10 na #60. Backend merge b51d0e8194d418c7197601dbead2d6156681ef96; web merge948cc4aa67a9bb82ecf645d61fb58cff7ec4465a. Status GitHub/Railway SUCCESS nos dois commits. | Não repetir merge/deploy. |
| Ajustes visuais pós-publicação | #33/#34/#36/#37, somente R1 visual; último head5a74472d840ee9caa9127c101d8a193eb25fc962, mergea5cc083e747bbf63d71afa054fc1672dd327a85d, CI37096185721 SUCCESS. #37 altera só src/archive-date-layout-fix.css; [checkpoint](https://github.com/fabiojuniort-cyber/tribusca-control/issues/60#issuecomment-5965498659). | Política R1 do registro não exigia revisão independente nova; COORD verifica fechamento factual da unidade. |

## Publicação reconfirmada por leitura

| Commit | Serviço/deployment no status GitHub | Resultado |
| --- | --- | --- |
| Backend b51d0e8194d418c7197601dbead2d6156681ef96 | backend /24e073e5-6b16-43cb-9931-78c7c1b079a3 | SUCCESS |
| Web948cc4aa67a9bb82ecf645d61fb58cff7ec4465a | web05-preview /6eae0892-e581-40db-94b5-d833408d70f3 | SUCCESS |
| Weba5cc083e747bbf63d71afa054fc1672dd327a85d | web05-preview /1c69181f-066c-4da0-b44c-c85018d28f95 | SUCCESS |

São registros históricos de publicação, não uma nova operação nem alegação de configuração atual de autodeploy. O antigo bloco “Execução em andamento” da #60 fica superado por esta reconciliação, sem apagar seu histórico.

## Aceite solicitado

COORD: conferir os critérios acima, a revisão R2 nos SHAs exatos e a prova visual local com seus limites. Emitir ACEITE CTRL-60 ou apontar critério e prova faltante. Só depois encerrar a #60 e creditar uma unidade em #124. Sem aceite novo, permanece12% e a #60 aberta.
