# L-LEG-01 — contraprovas vinculadas aos quatro HTMLs

Adendo ao desenho existente em backend#303, `docs/anatomy/L-LEG-01-DESIGN.md` @70ebb92bd425d450e215b247de69dc190be7bea4. Não substitui o desenho do executor ativo. Nenhuma classificação do motor foi implementada. Diagnóstico lexical não comprova uma região editorial, estrutura nem situação jurídica.

## AS IS e TO BE

AS IS: o diagnóstico DOU aplicado a outra representação incorpora notas no texto e encontra placeholders revogados como candidatos operativos. O desenho existente já registra21 casos; este adendo não reconta partes com um perfil inadequado.

TO BE proposto: preparação própria de normas.leg.br, vinculada a bytes exatos, SHA256, tamanho, URN/versão, encoding e representationId. Plano de regiões verificado antes de uso, sem confiança em atributos HTML isolados. Nota editorial, redação anterior efetivamente presente, placeholder anotado como revogado e remissão "Vide" são conceitos separados. legalStatus permanece unknown até evidência jurídica apropriada; estilo, cor e nota não provam vigência.

## Prova de identidade e impacto esperado

Os quatro bytes foram reutilizados do backend#303 @42d93364fbc6d292c44f4322ed67858dcbc1ca10, em `ops/anatomy/official-identification/leg-normas/`. Cada hash/tamanho é conferido antes da decodificação. UTF8 foi decodificado em modo fatal; BOM de3bytes é tratado explicitamente no cálculo dos offsets, sem modificar o arquivo. Encoding de leitura deve ser sustentado pela captura/preparação, não pelo sucesso de uma heurística.

| Representação | Bytes | Redação dada / Revogad / Vide (lexemas) | Impacto esperado |
|---|---:|---|---|
| 10.637 original | 102382 | 2 / 0 / 0 | As duas expressões pertencem a remissões normativas no texto; não converter em notas/historical |
| 10.637 atualizada | 180179 | 34 / 20 / 15 | Separar apenas regiões editoriais comprovadas; os totais lexicais não são totais de notas |
| 10.833 original | 308155 | 11 / 1 / 0 | "Ficam revogados" no art.94 é comando do ato; preservar como texto normativo |
| 10.833 atualizada | 388543 | 94 / 37 / 37 | Delimitar notas/placeholder sem propagar revogação ou aumentar elegibilidade |

Hashes completos, URLs, versão, contexto e intervalos UTF16/bytes estão em `lleg-lexical-proof.json`. Os intervalos ali provam somente a ocorrência exata do lexema, **não** delimitam a nota inteira. Antes de uma implementação, um plano deverá fornecer também os spans completos de cada nota e seu nó/ancestral, delimitados nos mesmos bytes. Não aceitar os spans lexicais deste adendo como plano de classificação.

## Contracasos oficiais e fronteiras

| Caso | Região byte [início,fim) | Resultado exigido no desenho |
|---|---|---|
| 10.637 original: expressão redação dada em remissão | [77804,77818), [89335,89349) | Texto permanece normativo; não é nota só pelo vocabulário |
| 10.833 original: mesma expressão em remissões | [92348,92362), [94236,94250) | Não extrair redação anterior inexistente |
| 10.833 original: Art.94, Ficam revogados | [304208,304216) | Não marcar o art.94 como revogado por seu próprio comando |
| 10.637 atualizada: nota de redação do caput | [17089,17103) | Nota editorial apenas após comprovar a região completa; texto do caput preservado |
| 10.637 atualizada: anotação Revogada | [20771,20779) | Delimitar bloco/placeholder; nenhum efeito herdado pelo vizinho |
| 10.637 atualizada: Vide | [17780,17784) | Remissão editorial se estrutura comprovada; nenhum efeito temporal/jurídico |

Além dos12 contracasos do desenho existente: host Câmara enganoso por sufixo (`camara.leg.br.example`); href relativo resolvido contra origem real; entidade HTML dentro da palavra; BOM; caractere Unicode suplementar antes da região; nota entre duas frases operativas; parênteses aninhados/aspas; citação de redação antiga; duas notas consecutivas; texto revogado preservado versus placeholder sem texto; hash/tamanho alterado; mesma URN com representação diferente. Em todos, exigir decisão explícita de escopo da região ou ambiguidade apresentada; não classificar o parágrafo inteiro por aproximação.

## Critérios de aceite e limitações

1. Decodificação sustentada, sem substituição silenciosa. Bytes, texto, ordem, offsets e sourceMap idênticos antes/depois da classificação; nenhuma normalização adicional implícita.
2. Cada região completa liga-se a representationId/hash/intervalo; nenhum span fora dos limites ou sobreposição não declarada. Testar UTF16 versus bytes/BOM e mudança de representação.
3. Redação dada/Vide sozinhos nunca produzem historical. Redação anterior exige o texto anterior presente e uma fronteira demonstrada; nota de alteração não o reconstrói.
4. Revogação anotada não se propaga a vizinhos nem a filhos com texto próprio. Não inferir vigência/efeitos. Ambiguidade explicitada e elegibilidade não aumenta, sem esconder requisito como limitação aceita.
5. Testes futuros verificam conteúdo/sourceMap e conjunto elegível antes/depois, nos quatro documentos e em contracasos. A prova offline deste adendo só confere integridade e localização lexical, não equivalência do reader ou aceite jurídico.

Nenhum novo ato foi consultado para este adendo; bytes existentes reutilizados. promoted:false. Implementação e revisão material permanecem pendentes.
