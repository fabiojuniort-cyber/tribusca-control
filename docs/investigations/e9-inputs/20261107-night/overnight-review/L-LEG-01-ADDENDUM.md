# L-LEG-01 - contraprovas vinculadas aos quatro HTMLs

Adendo ao desenho existente em backend#303, `docs/anatomy/L-LEG-01-DESIGN.md` @70ebb92bd425d450e215b247de69dc190be7bea4. N�o substitui o desenho do executor ativo. Nenhuma classifica��o do motor foi implementada. Diagn�stico lexical n�o comprova uma regi�o editorial, estrutura nem situa��o jur�dica.

## AS IS e TO BE

AS IS: o diagn�stico DOU aplicado a outra representa��o incorpora notas no texto e encontra placeholders revogados como candidatos operativos. O desenho existente j� registra21 casos; este adendo n�o reconta partes com um perfil inadequado.

TO BE proposto: prepara��o pr�pria de normas.leg.br, vinculada a bytes exatos, SHA256, tamanho, URN/vers�o, encoding e representationId. Plano de regi�es verificado antes de uso, sem confian�a em atributos HTML isolados. Nota editorial, reda��o anterior efetivamente presente, placeholder anotado como revogado e remiss�o "Vide" s�o conceitos separados. legalStatus permanece unknown at� evid�ncia jur�dica apropriada; estilo, cor e nota n�o provam vig�ncia.

## Prova de identidade e impacto esperado

Os quatro bytes foram reutilizados do backend#303 @42d93364fbc6d292c44f4322ed67858dcbc1ca10, em `ops/anatomy/official-identification/leg-normas/`. Cada hash/tamanho � conferido antes da decodifica��o. UTF8 foi decodificado em modo fatal; BOM de3bytes � tratado explicitamente no c�lculo dos offsets, sem modificar o arquivo. Encoding de leitura deve ser sustentado pela captura/prepara��o, n�o pelo sucesso de uma heur�stica.

| Representa��o | Bytes | Reda��o dada / Revogad / Vide (lexemas) | Impacto esperado |
|---|---:|---|---|
| 10.637 original | 102382 | 2 / 0 / 0 | As duas express�es pertencem a remiss�es normativas no texto; n�o converter em notas/historical |
| 10.637 atualizada | 180179 | 34 / 20 / 15 | Separar apenas regi�es editoriais comprovadas; os totais lexicais n�o s�o totais de notas |
| 10.833 original | 308155 | 11 / 1 / 0 | "Ficam revogados" no art.94 � comando do ato; preservar como texto normativo |
| 10.833 atualizada | 388543 | 94 / 37 / 37 | Delimitar notas/placeholder sem propagar revoga��o ou aumentar elegibilidade |

Hashes completos, URLs, vers�o, contexto e intervalos UTF16/bytes est�o em `lleg-lexical-proof.json`. Os intervalos ali provam somente a ocorr�ncia exata do lexema, **n�o** delimitam a nota inteira. Antes de uma implementa��o, um plano dever� fornecer tamb�m os spans completos de cada nota e seu n�/ancestral, delimitados nos mesmos bytes. N�o aceitar os spans lexicais deste adendo como plano de classifica��o.

## Contracasos oficiais e fronteiras

| Caso | Regi�o byte [in�cio,fim) | Resultado exigido no desenho |
|---|---|---|
| 10.637 original: express�o reda��o dada em remiss�o | [77804,77818), [89335,89349) | Texto permanece normativo; n�o � nota s� pelo vocabul�rio |
| 10.833 original: mesma express�o em remiss�es | [92348,92362), [94236,94250) | N�o extrair reda��o anterior inexistente |
| 10.833 original: Art.94, Ficam revogados | [304208,304216) | N�o marcar o art.94 como revogado por seu pr�prio comando |
| 10.637 atualizada: nota de reda��o do caput | [17089,17103) | Nota editorial apenas ap�s comprovar a regi�o completa; texto do caput preservado |
| 10.637 atualizada: anota��o Revogada | [20771,20779) | Delimitar bloco/placeholder; nenhum efeito herdado pelo vizinho |
| 10.637 atualizada: Vide | [17780,17784) | Remiss�o editorial se estrutura comprovada; nenhum efeito temporal/jur�dico |

Al�m dos12 contracasos do desenho existente: host C�mara enganoso por sufixo (`camara.leg.br.example`); href relativo resolvido contra origem real; entidade HTML dentro da palavra; BOM; caractere Unicode suplementar antes da regi�o; nota entre duas frases operativas; par�nteses aninhados/aspas; cita��o de reda��o antiga; duas notas consecutivas; texto revogado preservado versus placeholder sem texto; hash/tamanho alterado; mesma URN com representa��o diferente. Em todos, exigir decis�o expl�cita de escopo da regi�o ou ambiguidade apresentada; n�o classificar o par�grafo inteiro por aproxima��o.

## Crit�rios de aceite e limita��es

1. Decodifica��o sustentada, sem substitui��o silenciosa. Bytes, texto, ordem, offsets e sourceMap id�nticos antes/depois da classifica��o; nenhuma normaliza��o adicional impl�cita.
2. Cada regi�o completa liga-se a representationId/hash/intervalo; nenhum span fora dos limites ou sobreposi��o n�o declarada. Testar UTF16 versus bytes/BOM e mudan�a de representa��o.
3. Reda��o dada/Vide sozinhos nunca produzem historical. Reda��o anterior exige o texto anterior presente e uma fronteira demonstrada; nota de altera��o n�o o reconstr�i.
4. Revoga��o anotada n�o se propaga a vizinhos nem a filhos com texto pr�prio. N�o inferir vig�ncia/efeitos. Ambiguidade explicitada e elegibilidade n�o aumenta, sem esconder requisito como limita��o aceita.
5. Testes futuros verificam conte�do/sourceMap e conjunto eleg�vel antes/depois, nos quatro documentos e em contracasos. A prova offline deste adendo s� confere integridade e localiza��o lexical, n�o equival�ncia do reader ou aceite jur�dico.

Nenhum novo ato foi consultado para este adendo; bytes existentes reutilizados. promoted:false. Implementa��o e revis�o material permanecem pendentes.

