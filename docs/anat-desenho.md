# ANAT-00 — Desenho da Anatomia do Ato

**Status: DESENHO ATUALIZADO COM AS DECISÕES DO FÁBIO EM 15/10/2026, 12:58 BRT; revisão do COORD pendente. Não autoriza implementação.**

Documento único, preparado em 15/10/2026. Escopo desta entrega: leitura e PR exclusivamente documental. Nenhum código de produto, migration, carga, reclassificação, merge, deploy ou alteração no Railway foi executado. As decisões explicitamente tomadas pelo Fábio estão registradas na seção 10.2; escolhas ainda não respondidas permanecem identificadas, sem aprovação presumida.

## 1. Resultado pretendido e base observada

A Anatomia deve entregar uma leitura estruturada e rastreável do documento, utilizável tanto para reproduzir seu layout quanto para selecionar os trechos que a taxonomia pode ler. O texto original continua preservado. Estrutura, entidades, situação jurídica e apresentação são informações diferentes.

**Requisito adicional do Fábio: ferramenta dinâmica, simples de ajustar e evoluir.** A proposta é um motor pequeno com perfis declarativos por fonte e família de ato, regras versionadas, exemplos reais e tela administrativa já na Fase 1, conforme decisão do Fábio. Ajustar um marcador, um nome de coluna ou uma exceção deve mudar uma configuração, sem reescrever o motor. Novo algoritmo ou formato de entrada ainda pode exigir desenvolvimento; não prometer que toda evolução será sem código.

### 1.1 Evidências e limites desta leitura

| Referência | Estado efetivamente consultado |
|---|---|
| Backend | `radar-fiscal-backend@fb880354fbbbc90f681290e57dc905bde9ce9c08` |
| Web | `radar-fiscal-web@095b167cbc9dc6681ed29d6f06d5b99bdf203370` |
| Governança | `tribusca-control@2ac84148bac91e4d3e5f6e10b5aeb1f2c4f3de38` |
| Histórico dos destaques | Commit web `1cc186ebc953326b873c1721252e15217db1e1c6`, diff lido diretamente |
| Acervo vivo | GETs públicos `/public/v1/publications?source=confaz&limit=20`, `?source=rfb-normas&limit=20`, `?uf=SP&limit=20` e `/public/v1/sources`, em 15/10/2026, aproximadamente 12:23–12:31 BRT |
| Corpos reais | Dois HTMLs CONFAZ versionados, 12 XMLs DOU correspondentes a 10 matérias, 10 respostas oficiais DOE-SP e 8 respostas oficiais RFB; identificados na seção 7 |
| Banco produtivo | Nenhuma sessão SQL disponível/utilizada. Não foram consultados dados de tenant, executadas funções SQL nem exportado banco |
| Quantidade de publicações | ≈7.900 é a base de dimensionamento fornecida no pedido, não uma contagem SELECT comprovada nesta sessão |
| Produção | Os SHAs acima são snapshots de `main`, não comprovação de quais deployments estão servindo cada serviço |

As consultas públicas comprovam metadados, não o conteúdo exato de `publication_versions` em produção. O conjunto abaixo identifica separadamente atos confirmados no Acervo e amostras oficiais de regressão; não presume que toda amostra histórica continua no Acervo após os filtros de coleta.

A proposta anterior [ARQ-01](../coordenacao/decisoes/ARQ-01-pipeline-normativo.md) já separa estrutura, relações/vigência, taxonomia e layout e registra preferência por regras como dados. ANAT-00 detalha essa direção e **propõe nova divisão de fases**: a Fase 1 não implementa o motor temporal geral previsto naquele piloto. Essa substituição de escopo depende da aprovação deste desenho.

### 1.2 Inventário: arquivo, função e comportamento existente

Os caminhos B/ e W/ abaixo são relativos, respectivamente, aos snapshots de backend e web da seção 1.1. São implementação observada, não funcionalidades novas propostas.

| Área | Arquivo e função | Existe hoje / consequência para o desenho |
|---|---|---|
| Nome do ato | B/`src/modules/collection/collection-filter.act-name.ts` — `collectionFilterActName` | Recorta o início da primeira linha do título antes de número/data/separadores e normaliza a apresentação. Não analisa artigos, ementas ou vigência. Reaproveitar como pista de seleção de perfil, sem torná-lo parser jurídico |
| Decisão do filtro | B/`src/modules/collection/collection-filter.engine.ts` — `collectionFilterTitleType`, `compileCollectionFilterPolicy`, `evaluateCollectionFilter` | Nome/tipo, fonte, seção e regras de coleta têm finalidade de manter/descartar. Anatomia não deve alterar esse resultado nem chamar purge |
| Inventário de nomes | B/`src/modules/collection/collection-filter.act-name-inventory.ts` — `groupCollectionFilterActNames`, `loadCollectionFilterActNameInventory`, `readCollectionFilterActNameInventory` | Projeção de nomes do Acervo com exemplos e cache; não é árvore de dispositivos |
| Detector NCM | B/`src/modules/taxonomy/ncm/publication-ncm.detector.ts` — `extractNcmCandidates`, `selectText`, `catalogMatches`, `processPublicationNcmEnrichmentBatch` | Versão `1.2.0`; 8 dígitos livres ou máscaras `dddd.dd.dd` / `dddd.dddd`; curtos 2/4/6 após contexto. Não há delimitação completa por partes/colunas; agrega ocorrências por código, guardando primeiro intervalo e contagem |
| Catálogo e prefixo | Mesmo detector — `catalogMatches`; B/`src/modules/taxonomy/ncm/ncm-prefix.ts` — `normalizeNcmPrefix`, `ncmMatchesEitherPrefix` | Catálogo CURRENT e descendente de prefixo; comparação nos dois sentidos. Normalizador admite 2/4/6/8, não 5/7. Catálogo não comprova vigência do dispositivo nem equivalência temporal de uma mercadoria |
| Restrição persistida NCM | B/`migrations/065_f2_ncm_short_legal_mentions.sql` | CHECK e trigger também estão limitados a 2/4/6/8. Aceitar 5/7 não é apenas trocar regex: o futuro pacote precisa alinhar banco, detector, catálogo, classificação e API. Nenhuma migration nesta entrega |
| Seleção de redação | B/`src/modules/collection/legal-presentation.ts` — `isPreviousWordingClass`, `currentWordingText` | Exclui classes de redação anterior e linha de tabela marcada. Sem marca, devolve `undefined`; consumidores voltam ao texto. Não demonstra positivamente vigência e não resolve toda a abrangência de anexos históricos |
| Experimento TAX13 | B/`src/modules/collection/tax13-scoped-presentation.ts` — `tax13ScopedPresentationText` | Comentário restringe o helper a diagnóstico/regressão visual; não está integrado ao NCM/classificação/persistência global. Não promover `data-legal-status` remoto a prova jurídica |
| Classificação corrente | B/`src/modules/taxonomy/classification/classification.worker.ts` — `classificationText`, `processPublicationTaxonomyBatch`, `classifySinglePublication` | Usa `currentWordingText(...) ?? content_text`, ou trecho relevante; encaminha também título e NCMs. Ausência de anatomia não bloqueia hoje a leitura do texto geral |
| Motor curado | B/`src/modules/taxonomy/classification/classification.curated.ts` — `planCuratedClassification`, `normalizeWithIndex`, `extractCclasstribCodes` | `2.3.0`: concatena título+conteúdo; labels/sinônimos, NCM por prefixo e cClassTrib. Tem exclusão de enumeração romana para evitar confundir inciso II com Imposto de Importação; não tem contrato completo por dispositivo |
| Motor lexical | B/`src/modules/taxonomy/classification/classification.engine.ts` — `planLexicalClassification` | Também combina título+conteúdo, com fingerprint. Reaproveitar a rastreabilidade, passando uma entrada já selecionada pela Anatomia |
| DOU | B/`src/modules/collection/dou.parser.ts` — `parseDouEntries`, `parseDouZip`, `publication`, `classifyDouAct`, `extractEmbeddedConfazPublications` | Lê INLABS, reúne partes, valida contexto e referências certificadas, produz texto e HTML de `Texto`; `Identifica` e `Ementa` também estão em campos/metadados. Tem indicação `scopeStructureIncomplete`; não é segmentação jurídica completa |
| DOE-SP | B/`src/modules/collection/doe-sp.parser.ts` — `parseDoeSpDetail`, `doeSpHtmlText`, `doeSpEmenta`; B/`src/modules/collection/doe-sp.connector.ts` — `DoeSpConnector` e closure `buildPublication` | API de detalhe entrega HTML; conector envia HTML e texto extraído, além das referências/anexos. Título pode estar fora do corpo HTML. Não inventar epígrafe dentro do corpo para preencher essa diferença |
| CONFAZ | B/`src/modules/collection/confaz.connector.ts` — `parseConfazPublicationHtml`, `extractActBodyHtml`, `extractContentText`, `extractEmenta`, `extractEffectiveDate`, `extractEffectiveUntil`, `extractRelatedLinks` | Extrai corpo HTML, texto, links e informações de datas do ato. Essas datas são globais/extrativas; não substituem vigência por dispositivo. DOU é outro canal com representação diferente |
| Importação dos convênios | B/`src/infrastructure/database/import-confaz-act.ts` | Caminho existente para importar HTML do ato. Os HTMLs de 52/91 e 100/97 estão em `ops/confaz/acts/`. Não executar esse importador na ANAT-00 |
| RFB | B/`src/modules/collection/rfb-normas.parser.ts` — `apiSegments`, `parseRfbApiRepresentation`, `buildRfbApiRepresentationUrl`; B/`src/modules/collection/rfb-normas.connector.ts` — `RfbNormasConnector` | Consulta original/vigente/multivigente/relacional; concatena segmentos e ordena por `ordemSegmentoAto`. O original alimenta o conteúdo; as outras visões geram disponibilidade/hash em metadata, não um corpo consolidado completo persistido por essa rotina |
| Normalização | B/`src/modules/collection/publication.normalizer.ts` — `normalizePublication`; B/`src/modules/collection/legal-presentation.ts` — `sanitizeLegalPresentationHtml` | Guarda texto e HTML sanitizado de apresentação, com limite de 2 MiB. Preserva tabelas, células e spans permitidos; remove estilos arbitrários, vários atributos/classes, scripts, imagens e tags como `del`/`s` não preservam sua semântica. Pode ter perdido sinais necessários à anatomia |
| Persistência | B/`src/modules/collection/publication.persistence.ts` — `persistPublication`, `getOrCreateVersion`, `presentationUpgrade`; B/`src/infrastructure/database/database.types.ts` | `publications`, `publication_versions`, `publication_origins`, `publication_files`; versões têm `content_text`, `relevant_excerpt`, `content_hash`, `source_metadata`, `is_current`. Upgrade de apresentação pode ocorrer sem nova versão textual: hash de texto sozinho não invalida corretamente a Anatomia |
| Layout atual | W/`src/legal-presentation.ts` — `selectLegalPresentationTemplate`, `renderLegalPresentation`, `wrapLegalTables`, `rebuildPmpfTable`; W/`src/confaz-presentation.ts` — `confazDisplayHtml`, `textToParagraphs`, `splitActBlock` | Templates para Convênio, Protocolo, Ajuste SINIEF, Ato COTEPE ICMS/PMPF. O frontend também infere partes e reconstrói apresentação. No destino proposto, interpretações migram para resultado versionado; frontend apenas renderiza |
| Tela real | W/`src/publication-detail-page.tsx` — `PublicationDetailPage` | Na main lida, segue sem destaque positivo de vigência e avisa que ela não foi comprovada por trecho |

**Por que os destaques foram retirados no commit 1cc186eb:** o diff retirou da tela real a chamada a `buildHighlightRules`/`highlightLegalHtml`, os controles de marcação e a alegação de NCM extraído do texto vigente. Tags existentes, NCM presente no catálogo e atributos HTML não comprovavam a vigência do fragmento, na versão e data de referência corretas. Foi uma retirada de alegação positiva sem prova, não uma constatação de que toda a legislação estava revogada. ANAT não deve religar os destaques apenas porque conseguiu reconhecer artigos.

### 1.3 O que efetivamente sobra do formato original

| Fonte/entrada | Texto pesquisável | HTML/tabelas | Limite de fidelidade |
|---|---|---|---|
| DOU XML/INLABS | Texto derivado do HTML de `Texto`, partes concatenadas | HTML por parte em `section`, separado por `hr`, depois sanitizado; tabelas sobrevivem se existiam como HTML | PDF/página certificada é referência; paginação física, imagens e todos os estilos não são reproduzidos. Parte faltante não equivale a documento completo |
| DOE-SP API | `doeSpHtmlText` mantém separadores de blocos/células | `detail.content` vai para sanitização; anexos separados | Texto isolado não conserva mesclagens e alinhamentos. Algumas tabelas existem apenas em anexo |
| CONFAZ portal/importação | Texto do ato, incluindo histórico | HTML com várias classes conhecidas, tabelas e redações anteriores | Classes `Subtitulo` e várias classes de tabela não integram a lista geral permitida; histórico pode perder contexto. Cor isolada não é situação jurídica |
| RFB API | Segmentos da representação original concatenados | HTML dos segmentos, se fornecido; anexos como arquivos | `ementas` pode conter muito mais que uma ementa visual. Tabelas podem vir em `arquivoBinario`, não no `textoIntegra`. Não assumir que os quatro textos foram guardados |
| Texto puro/legado | Apenas texto e quebras disponíveis | `PRESERVED_TEXT` ou fallback | Não recuperar artificialmente colunas, revogações ou hierarquia que não estejam comprovadas |

**Achado real de anexo:** ADE Corat 79/2026, idAto 153836, apresenta duas tabelas HTML em anexos `Art. 1.htm` e `Art. 2.htm` (ids 86703/86704); reconhecer apenas os parágrafos deixaria de fora o que foi excluído/incluído na agenda. SCs da RFB podem ter apenas ementa, referências e assinatura na API, com inteiro teor em PDF. Resultado precisa declarar cobertura parcial.

## 2. Modelo de estrutura, evolução e layout

### 2.1 Contrato simples: partes, entidades e evidências

Uma anatomia pertence a **uma versão de publicação + uma representação concreta + uma versão de regras**. Contém uma árvore ordenada de partes, entidades com posição, alertas de qualidade e evidências. Não é uma nova cópia do cadastro do ato nem um novo filtro de coleta.

Cada parte terá: identificador local; pai; ordem; tipo; rótulo original; texto literal; posição no texto canônico da anatomia; ponteiro para o bloco/célula original; origem do reconhecimento (explícito, inferido, revisado); regra utilizada; confiança estrutural; cobertura; eventual relação com redação alternativa. Situação jurídica é campo separado, nunca deduzida de `tipo=artigo`.

| Parte | Hierarquia e critério |
|---|---|
| Documento / ato interno | Raiz; uma matéria pode conter mais de um ato. Separar subatos reconhecidos sem criar publicações nem fundir identidades automaticamente |
| Cabeçalho de publicação | Diário, seção, edição, página, órgão, data de publicação; não confundir com início da articulação |
| Epígrafe | Tipo, número, ano e data do ato; preferir campo oficial e preservar diferença entre data do ato e publicação |
| Ementa | Resumo oficial; marcar origem. Não transformar um resumo inferido em ementa oficial |
| Preâmbulo | Autoridade, fundamento, considerandos e fórmula “resolve/decreta/celebram”; considerandos podem ser filhos próprios |
| Agrupadores | Livro, título, capítulo, seção, subseção; opcionais, sem criar níveis inexistentes |
| Articulação | Artigo ou cláusula, inclusive único, 1º, 10, 1-A, terceira-A; caput separado dos filhos |
| Subdivisões | Parágrafo/único, inciso romano, alínea, item/subitem. Incisos podem ser filhos diretamente do artigo/caput ou de parágrafo; não exigir a sequência rígida artigo→parágrafo→inciso em todo ato |
| Anexo/apêndice | Raiz subordinada ao ato, com título e redação própria; itens numerados, texto e tabelas. “Anexo I” citado numa frase não inicia anexo |
| Tabela | Legenda, cabeçalho simples/múltiplo, linhas, células, coordenadas, `rowspan`/`colspan`, notas. Separar coluna ITEM da coluna NCM |
| Assinatura | Nome/cargo, local/data de fecho e assinaturas múltiplas. Não classificar como produto |
| Rodapé | Referência de publicação, certificado, página, assinatura digital; separado de nota explicativa de tabela/dispositivo |
| Nota editorial / histórico | “Redação dada...”, “Vide...”, “Prorrogado...”, fonte da alteração; ligado ao trecho-alvo quando inequívoco, conservado mesmo se excluído da taxonomia |
| Texto transcrito | Bloco entre aspas introduzido por alteração/citação; subárvore própria e referência ao ato-alvo. “Art. 1º” dentro da nova redação não é segundo art. 1º do ato alterador |
| Dispositivo sem articulação | Despachos, comunicados, decisões, pareceres e consultas: assunto, relatório, fundamentos, conclusão ou corpo não articulado. Não inventar artigos |
| Lacuna / não identificado | Texto legível de tipo incerto, imagem não transcrita, anexo ausente, tabela irrecuperável; deve aparecer na cobertura |

**Vigência, alteração e revogação são também funções do trecho.** Um único artigo pode conter início de vigência, efeitos futuros e revogação de outro ato. Registrar essas funções no artigo, sem arrancá-lo da posição original. “Texto legal válido” será uma seleção de partes com evidência positiva, não um tipo estrutural.

### 2.2 Processo por fonte e fallback

1. Escolher a representação e registrar seus hashes antes de interpretar. Preferir estrutura oficial já capturada; não usar o HTML já rearranjado pelo frontend como fonte jurídica.
2. Separar metadados, blocos, tabelas e anexos; manter a ordem e um mapa de posições.
3. Aplicar perfil por fonte + família e marcadores explícitos. Depois, reconhecer fronteiras lexicais em início de bloco/linha, respeitando aspas, tabelas e continuação de página.
4. Associar notas editoriais, redações alternativas e limitações. Sem alvo seguro, marcar pendência, sem propagar vigência.
5. Extrair entidades por intervalo, conforme seção 3. Produzir seleção de consumo separada da árvore exibida.

| Fonte | Regra de adaptação |
|---|---|
| DOU | `Identifica`, `Ementa`, `Texto` e metadados XML têm prioridade. Reunir as partes já identificadas pelo coletor antes de analisar; primeira linha repetida não duplica epígrafe. Falta de parte ou `scopeStructureIncomplete` impede selo de completude |
| DOE-SP | Usar título/órgão/data do envelope e DOM do `content`. Reconhecer “Artigo”, “Art.”, capítulos, tabelas e trechos SEI; remover resíduos de interface/Word somente com regra identificada. Retificações têm estrutura “onde se lê/leia-se”, não corpo consolidado |
| CONFAZ | Reconhecer cláusulas, classes editoriais e títulos de anexos. História de anexo vale até seu limite estrutural, inclusive células sem classe própria; respeitar exceções locais com evidência. Uma nota entre duas linhas não pode revogar toda a tabela automaticamente |
| RFB | Preservar `idSegmento`, ordem, visão efetivamente retornada e anexos. Confrontar a visão solicitada com a declarada; nas oito respostas lidas, a URL `/original` retornou `visao=conjunta`. Não promover esse rótulo a “consolidado vigente” sem interpretar o contrato da fonte |
| Texto puro | Preferir início de linhas, delimitadores e sequência coerente; em bloco único, segmentação conservadora com confiança menor. Guardar trechos não reconhecidos; não forçar 100% em tipos conhecidos |

**Tabela quebrada:** preservar sempre a representação recebida. Só reconstruir a grade quando separadores/cabeçalhos/quantidade de células permitirem uma única interpretação. Registrar que a grade foi reconstruída, a regra e o mapa de origem. Coluna NCM incerta → não aceitar número nu por suposta posição. Ainda é possível reconhecer candidato em célula/trecho individual pela regra contextual do corpo da seção 3.3, mantendo a pendência da tabela; não herdar um domínio NCM de uma coluna cuja posição se perdeu. OCR e reconstrução probabilística ficam fora da Fase 1.

### 2.3 Regras fáceis de ajustar

Um perfil contém somente dados permitidos: fonte, família, marcadores de partes, classes/seletores reconhecidos, rótulos de coluna, abreviações de atos, precedência, limites, condições de parada e exemplos positivos/negativos. Herança curta: padrão geral → fonte → família. Exceção por ato apenas para correção documentada ou validação do piloto, vinculada ao hash; não manter centenas de remendos ocultos.

Fluxo de mudança: rascunho → comparar em amostras → ver diferenças de partes/NCM/citações → aprovar → ativar a versão. Uma versão ativa é imutável. Retorno usa a versão anterior e seus resultados, sem apagar o novo histórico. **A tela administrativa entra na Fase 1**, reutilizando padrões de interação do Filtro de Coleta, sem acoplar suas políticas. O repositório pode fornecer os perfis iniciais; a administração mantém as revisões e sua trilha de auditoria.

A tela deve permitir selecionar fonte/família, editar campos permitidos, salvar rascunho, escolher amostras, simular e comparar antes/depois, ver alertas e impacto, ativar uma revisão aprovada e retornar à anterior. Ativação de regra não inicia carga global automaticamente: mostrar o escopo afetado e executar reprocessamento pela operação autorizada. Acesso de administração segue as permissões existentes, sem disponibilizar edição de regras globais a usuário comum. Conferência de vigência do piloto é uma ação separada, com fundamento, hash, data, revisor e dependências; mudar uma regra de estrutura nunca aprova situação jurídica.

Alterações de fonte/classe/coluna ficam em configuração. Novo formato binário ou nova capacidade de interpretação exige novo adaptador. As regras não executam JavaScript, SQL ou chamadas remotas; campos e padrões têm limites de tamanho, complexidade e tempo. Não criar linguagem de programação própria, workflow engine, microserviço ou editor universal de regex.

**Exemplos de manutenção:** acrescentar “NCM/SH” aos rótulos de coluna; reconhecer nova classe editorial CONFAZ; adicionar abreviação “IN RFB”; mudar a política de confiança de tabela. Cada ajuste identifica quais fontes/famílias/representações precisam reprocessar. Mudança só de cor/layout não refaz extração nem taxonomia.

### 2.4 Layout fiel com significado jurídico explícito

Oferecer “Leitura estruturada” e referência à representação original disponível. Preservar ordem, títulos, negrito/itálico permitidos, recuos, listas, células mescladas, notas e vínculos visíveis. Em tela pequena, tabela larga rola horizontalmente; não converter colunas em texto corrido.

| Informação | Apresentação proposta | Pode alimentar taxonomia de texto vigente? |
|---|---|---|
| Vigência comprovada na data de referência | Preto + identificação de data/evidência | Sim, apenas nas partes elegíveis |
| Revogação comprovada do trecho | Vermelho + rótulo “Revogado” e ato/data de fundamento; tachado opcional | Não |
| Redação anterior/substituída | Histórico distinguível, com rótulo próprio e intervalo, se comprovado | Não; não chamar automaticamente de revogação |
| Vigência não comprovada | Aparência neutra com indicação explícita de situação não verificada | Não |
| Eficácia futura ou suspensa comprovada | Rótulo “Efeitos futuros”/“Suspenso”, com data/condição | Só na data e condições demonstradas |
| Destaque taxonômico | Camada sobre o trecho já elegível, com origem do termo/NCM | Não concede vigência por si só |

Não depender apenas da cor para transmitir status. Preto pode ser cor tipográfica de um título ou texto original; **não deve existir legenda universal “qualquer texto preto está vigente”**. A legenda jurídica se aplica ao modo/data e aos trechos efetivamente comprovados. Se a fonte usa vermelho para acréscimo ou verde para redação anterior, preservar a informação de origem, sem transportar automaticamente sua cor para nosso significado jurídico.

O renderer não calcula vigência, não corrige numeração, não remove parágrafos nem produz tabelas por conta própria. Uma reconstrução não pode ser apresentada como fac-símile. A alternativa de máxima fidelidade é abrir o original oficial, quando disponível.

## 3. Entidades, precedência e regras NCM

### 3.1 Entidades e reconhecimento

Todo achado mantém texto literal, valor normalizado, parte, intervalo, regra, confiança, estado de validação e, quando aplicável, edição do catálogo. Códigos são strings: zeros iniciais não desaparecem. “Reconhecido no texto”, “encontrado em catálogo”, “vigente” e “aplicável ao cliente” são quatro conclusões diferentes.

| Entidade | Padrão contextual e normalização |
|---|---|
| Citação de ato | Família/abreviação + órgão quando presente + número + ano/data: Lei, LC, Decreto/Decreto-Lei, MP, Convênio ICMS, Ajuste SINIEF, Protocolo, Ato COTEPE, IN, Portaria, Resolução, Parecer Normativo, ADI/ADE/ADN, SC/SD. Registrar ato sem número quando assim publicado; não inventar número |
| Dispositivo citado | “art./artigo”, “arts.”, §/§§, inciso, alínea, cláusula, anexo, item; listas e intervalos. Manter qualificador do ato, e referência local quando disser “desta lei”/“deste convênio” |
| NCM / NBM / SH / TIPI | Diferenciar sistema citado. NCM e menção de capítulo conforme seção 3.3; NBM histórico não vira NCM atual pela semelhança dos dígitos. Ex-tarifário/“Ex 01” é qualificador associado, não código NCM independente |
| CNAE | Rótulo/coluna CNAE e máscara/sete dígitos; aceitar variantes oficiais de pontuação, preservando original e versão do catálogo. Exemplo observado: `46.39-7/01` → `4639701` |
| CFOP | Rótulo/coluna CFOP + quatro dígitos, eventualmente `d.ddd`; conferir catálogo. Não confundir `5.102` com NCM ou número de lei |
| CST | Rótulo CST + código e tributo explícito; comprimentos variam por domínio. Sem tributo, guardar CST não desambiguado; nunca aplicar um único catálogo para ICMS/PIS/COFINS/IBS-CBS |
| cClassTrib | Rótulo completo/abreviação/coluna, seis dígitos, zeros preservados e edição identificada. Associação CST↔cClassTrib é validação posterior |
| CEST e códigos de receita | Rótulos específicos e máscara contextual; úteis principalmente como negativos para NCM. “CÓDIGO” sozinho não define NCM |
| Valor monetário | Moeda, símbolo/denominação, agrupamento e decimal: R$, US$, U$, reais; decimal exato, nunca ponto flutuante para cálculo jurídico |
| Percentual / fração / quantidade | % ou “por cento”; fração e fator decimal separados. `0,01` sem % não deve virar 1% automaticamente; preservar unidade e finalidade |
| Datas / períodos | Datas numéricas ou por extenso, intervalos, prazos relativos e condições. Separar assinatura, publicação, vigência, produção de efeitos, prazo e data apenas citada; registrar expressão sem calcular quando faltar referência |
| CNPJ/CPF | Máscara/rótulo; inteiro protegido contra recortes NCM. Validar conforme versão do formato aplicável; suportar evolução de formato por perfil. Não extrapolar CNPJ completo a raiz nem publicar identificadores pessoais em corpus de revisão |
| CEP / endereço / IE | CEP de oito posições com máscara/label; IE por contexto/UF; números de endereço não são NCM. Ex.: CEP `01103-201` ocupa o intervalo inteiro |
| Processo / SEI / CNJ / matrícula | Rótulo+identificador, inclusive formatos locais. “Processo 17944.004579/2026-70” é uma unidade; seus números não voltam à busca de NCM |
| URL / e-mail / referência editorial | Reconhecer inteiro para proteção de spans; preservar o endereço como dado, sem executar nem acessar automaticamente |
| Órgão, território, tributo e produto textual | Dicionários já curados quando disponíveis, com limites de palavra. Nomes de produtos alimentam taxonomia na parte elegível; não fazer uma nova taxonomia paralela dentro da Anatomia |

### 3.2 Ordem e conflitos

Reconhecer não significa apagar caracteres. Manter um mapa de intervalos ocupados no texto imutável, evitando deslocar as posições dos próximos achados.

1. Estrutura, numeração de dispositivos, tabelas, aspas e rótulos de coluna.
2. URLs/e-mails e identificadores fortes: processo, CNPJ/CPF, CEP, IE e semelhantes.
3. Citações completas de atos e dispositivos. `Lei nº 8.433` ocupa a referência inteira e nunca oferece `8433` ao NCM. A data dentro da citação pode ser subentidade da própria citação, não uma ocorrência concorrente de NCM.
4. Códigos com domínio declarado: CNAE, CFOP, CST, cClassTrib, CEST, receita, NBM/SH/TIPI; campos NCM rotulados ficam reservados para o passo NCM. O domínio da coluna tem precedência sobre a aparência do número.
5. Valores, percentuais, quantidades com unidade/contexto e datas restantes. Número puro não é automaticamente quantidade nem ano; usar o contexto. Dentro de campo NCM já delimitado, número puro não deve ser consumido antes como quantidade.
6. NCM nas partes e intervalos ainda elegíveis; catálogo confirma reconhecimento, não cria achado ausente no texto.
7. Relações e conceitos lexicais sobre seus campos permitidos, mantendo referência às entidades já reconhecidas.

Conflito sem vencedor pelo contexto → `AMBÍGUO`, preservado para inspeção e excluído da classificação automática. Entidades compostas admitem filhos legítimos; o mesmo intervalo não recebe simultaneamente dois domínios incompatíveis. Um número bloqueado por citação não é liberado só porque o ato citado não foi localizado no Acervo.

### 3.3 Política NCM da ANAT

**Decisão já recebida:** classificação usa exclusivamente comprimentos **4, 5, 6, 7 e 8**. Dois dígitos podem ser registrados como menção a capítulo para navegação/auditoria, mas não geram produto, segmento, match ou destaque taxonômico. Três e nove dígitos não são NCM elegível. Esta regra específica prevalece sobre o comportamento 2/4/6/8 hoje encontrado no código.

| Parte | Reconhecer NCM? | Consumir para classificar? |
|---|---|---|
| Cabeçalho, epígrafe, ementa, preâmbulo/considerandos, assinatura, rodapé | Nunca como NCM da política de classificação, mesmo com oito dígitos ou rótulo | Nunca |
| Artigo/cláusula, caput e subdivisões | Candidatos de 4–8 dígitos com ou sem pontos, após proteção de outros domínios; validar catálogo/edição e contexto, mantendo ambiguidades fora da classificação | Só com vigência comprovada do trecho |
| Anexo textual | Mesma regra do corpo, sem usar título do anexo como evidência de produto | Só com vigência comprovada |
| Tabela com coluna NCM explicitamente identificada | 4–8 dígitos naquela coluna; pontos normalizados; rótulo pode estar em cabeçalho multinível | Só células/linhas da redação elegível, com vínculo à descrição e ao dispositivo |
| Tabela sem coluna NCM / grade incerta | Sem aproveitar posição inventada: candidatos pontuais seguem a regra do corpo, com validação contextual; cabeçalho genérico ou grade incerta não tornam uma coluna inteira NCM | Somente trecho pontual comprovado; restante pendente |
| Nota editorial, citação de outro ato, redação anterior, trecho revogado | Pode haver registro histórico especializado; não entra na busca de NCM classificável | Nunca na classificação corrente |
| Corpo não articulado/parecer/consulta | Perfil específico futuro pode habilitar contexto rotulado; padrão Fase 1 é conservador | Não usar resumo/ementa como substituto do inteiro teor |
| Parte desconhecida ou arquivo ausente | Não inferir | Não |

**Decisão do Fábio em 15/10/2026:** aceitar grafia pontuada e sem pontos. Os exemplos fornecidos são padrões de entrada, não uma afirmação de que todos esses códigos existam no catálogo. Pontuação é normalizada sem acrescentar ou remover dígitos; zeros iniciais são preservados.

| Exemplo informado | Normalizado | Tratamento |
|---|---|---|
| `10` | `10` | Menção a capítulo, quando o contexto indicar NCM/SH; informativo, nunca classifica |
| `1010` | `1010` | Candidato de 4 dígitos |
| `1010.1` ou `10101` | `10101` | Candidato de 5 dígitos |
| `1010.11` ou `101011` | `101011` | Candidato de 6 dígitos |
| `1010.11.1` ou `1010111` | `1010111` | Candidato de 7 dígitos |
| `1010.11.11` ou `10101111` | `10101111` | Candidato de 8 dígitos |

No corpo elegível, não exigir pontuação nem rótulo como condição absoluta para propor candidato de 4–8 dígitos. A ampliação não autoriza reconhecer NCM dentro de número de lei, data, quantidade, processo, outro código ou zona proibida. Primeiro proteger esses intervalos; depois validar código/prefixo na edição pertinente e avaliar o contexto local. Número sem domínio suficientemente claro permanece ambíguo, mesmo se existir prefixo coincidente no catálogo. Em coluna explicitamente NCM, o cabeçalho fornece esse contexto. Um `10` isolado no texto não se torna automaticamente capítulo fiscal.

A máscara `dddd.dd.d` tem sete dígitos; `dddd.d` tem cinco. Ambas são aceitas. A grafia legada `8417.8020`, observada no Anexo I do Conv. 52/91, é normalizada para `84178020` na coluna NCM. Essa exceção editorial permanece delimitada por perfil; não trata todo decimal com quatro casas como NCM.

Rótulo “posição” só vale como domínio fiscal quando o trecho/tabela identificar NCM/SH/TIPI conforme o perfil; “posição do servidor”, “código de receita” ou “código” genérico não abrem a busca. Para listas como “NCM 1001, 1002 e 1003”, o contexto pode continuar até o fim da lista local; deve parar em ponto final, outro domínio, outra célula ou novo dispositivo. Não se estende ao restante da publicação.

Prefixos 5/7 são tratados como **prefixos textuais de busca**, sem inventar que sejam níveis oficiais denominados posição/subposição. Validar a existência de descendentes na edição pertinente; não vincular um prefixo ao primeiro item de oito dígitos como se fossem a mesma mercadoria. Preservar o catálogo/época citado e a falta de correspondência. Correspondência com catálogo atual não resolve NCM histórico.

## 4. Citações e links entre atos

### 4.1 Separar reconhecer de resolver

Fase 1 identifica “Convênio ICMS 52/91” e “art. 5º do Decreto X” no texto, com atributos e posição. Não cria hyperlink novo nem consulta o ato citado automaticamente. Links oficiais já existentes no texto continuam sujeitos à sanitização atual.

Na fase de links, a chave candidata usa família do ato, órgão emissor, jurisdição/UF/município, número e ano; data do ato, URL e identificador oficial ajudam a desambiguar. Nome do ato do F3 é apenas uma pista. Não usar só número/ano, só texto do título ou URL de página do diário, pois uma página contém várias matérias.

Para 52/91: normalizar a família para Convênio ICMS, emissor CONFAZ e número 52; resolver ano 1991 pela identidade oficial, sem regra universal de século por número de dois dígitos. O GET público confirmou a publicação `07d24640-61a0-45db-8f69-3b064320b2b2`, `actNumber=52/1991`, URL oficial CONFAZ. Esta é evidência de identidade para o piloto, não de vigência dos seus itens. O mesmo vale para 100/97, publicação `4c92f7ce-2e3d-4a61-9524-d4beca0c2af7`.

Resultados possíveis: resolvido único; não encontrado; ambíguo; referência incompleta; alvo sem anatomia; dispositivo não localizado; alvo sem permissão de acesso. Manter texto legível em todos os estados. A resposta ao cliente não revela que existe ato privado de outra conta.

| Opção para resolver | Vantagem | Custo/risco | Recomendação |
|---|---|---|---|
| A. Somente identidade exata no Acervo | Simples, explicável e baixo risco de link errado | Mais referências sem link | Começar aqui |
| B. Exata + tabela pequena de aliases aprovados/IDs oficiais | Melhora abreviações e identidades já conhecidas | Requer revisão e histórico dos aliases | Evolução recomendada após medir A |
| C. Busca aproximada/IA escolhendo automaticamente | Maior cobertura aparente | Link convincente para norma errada; difícil auditar | Não adotar como resolução automática; no máximo sugestão futura |

| Ato não presente no Acervo | Prós | Contras | Recomendação |
|---|---|---|---|
| Mostrar citação sem link + “não localizado” | Sem coleta extra nem destino inventado | Usuário pesquisa fora | Padrão |
| Link externo já informado pela fonte e validado | Usuário chega ao original | URL pode mudar; precisa exibir destino externo | Oferecer quando houver URL real; não fabricar URL por padrão de numeração |
| Solicitar inclusão do ato na coleta | Enriquece a base | Outra operação, custo e revisão de fonte | Futuro pedido explícito; resolver link não deve acionar crawler |

### 4.2 Dispositivo citado e alterações

Resolver primeiro o ato e depois um caminho de dispositivo na versão/data relevante: artigo → parágrafo → inciso → alínea; ou cláusula/anexo/item. “Art. 5º do Decreto X”, sem número/órgão suficiente e sem antecedente inequívoco, permanece incompleto. “Deste decreto” pode apontar para o próprio ato; “do referido decreto” exige antecedente inequívoco no escopo local.

Lista “arts. 5º e 7º” gera dois alvos relacionados. Intervalo “arts. 143-A a 143-L” preserva a expressão e só se expande contra dispositivos existentes. Se houver renumeração, redações alternativas ou artigo inexistente na versão, abrir o ato com aviso; não saltar para um artigo de mesmo número escolhido arbitrariamente.

Para “altera”, “revoga”, “acrescenta”, “prorroga”, “suspende”, “restabelece”, “ratifica”, “retifica” e “produz efeitos”: extrair intenção, sujeito/objeto, escopo e expressão de data. Uma SC que **relata** revogação por outra lei não é a norma revogadora. Uma norma que revoga o art. 5º de outra não está revogando o seu próprio art. 5º. Relações na Fase 1 são achados; aplicação temporal automática fica para Fase 3.

## 5. Vigência, taxonomia do piloto e benefício

### 5.1 Três perguntas independentes

1. Qual é a redação apresentada pela fonte nesta captura?
2. Essa redação/dispositivo estava vigente e produzindo efeitos na data de referência?
3. O benefício/regra se aplica à operação, UF, período e contribuinte?

Anatomia resolve principalmente a primeira e prepara evidência para a segunda. A terceira não pode ser respondida por cor, NCM ou tag isolada. `is_current` significa versão de conteúdo selecionada, não vigência jurídica.

Situações propostas: não verificado; vigente comprovado; redação anterior; revogado comprovado; efeitos futuros; suspenso; parcialmente vigente. Guardar a base da conclusão e a data de referência. Um pai parcialmente revogado não força todos os filhos a revogados nem mantém todos vigentes. Nota genérica “revogam-se disposições em contrário” não autoriza descobrir e marcar alvos por similaridade.

### 5.2 Como a Fase 1 consegue servir aos dois convênios

Há uma dependência real: **não é possível prometer taxonomia somente de texto vigente e, ao mesmo tempo, adiar toda forma de comprovação de vigência.** A solução mínima escolhida pelo Fábio é um recorte de redações revisado por pessoa habilitada para os dois convênios, com data de referência, fonte, hash e trechos exatos. A conferência inclui os atos posteriores que alteram seus prazos, efeitos ou dispositivos. Não é um motor geral de vigência nem uma consolidação automática.

Fase 1 entrega estrutura, citações sem link, NCM 4–8 e seleções por parte. Para 52/91 e 100/97, o recorte do piloto só libera trechos positivamente conferidos. Omissão, conflito ou anexo sem evidência deixam a classificação pendente. Se não houver essa conferência, a saída é uma **simulação estrutural/candidatos**, sem alegação de taxonomia vigente. D01 foi aprovada no chat; a designação do revisor e a aprovação concreta dos trechos ainda precisam ocorrer no pacote do piloto.

| Ato | Entrada correta para o piloto | Prova mínima |
|---|---|---|
| Conv. 52/91 | Cláusulas e células/descrições dos anexos elegíveis; coluna NCM identificada; redações alternativas separadas | O NCM `8450.11.00` aparece em dois contextos históricos no HTML inspecionado. Nenhum deles pode classificar como vigente. Anexo I, item 39.1 tem nota de revogação dos subitens 39.1–39.3 pelo Conv. 154/15; um segundo achado pertence a anexo antigo. Não basta filtrar somente a primeira ocorrência |
| Conv. 52/91 — positivo | Anexo I, item 1: `7307.19.20`; item 13.6: grafia `8417.8020`; Anexo II, item 5.1: `8201.10.00` | Reconhecer coluna, código e descrição como candidatos nos blocos observados. Elegibilidade corrente depende da conferência temporal; não declarar aqui que esses benefícios estão vigentes em 15/10/2026 |
| Conv. 100/97 | Cláusulas, incisos e alíneas elegíveis, com produtos descritos; nenhuma exigência de NCM para classificar termos | Inciso I da cláusula primeira traz inseticidas/fungicidas e outros produtos; há redação anterior próxima. A mesma palavra na nota/histórico não gera uma segunda prova corrente |
| Conv. 100/97 — contexto | Separar os percentuais 60%, 30% e carga de 4% nos respectivos dispositivos observados | Não reduzir tudo a “benefício 4%” nem confundir redução de base com alíquota. Cláusula terceira distingue autorização estadual; não inferir aplicação em todas as UFs |

O filtro lexical do consumidor trabalha nos blocos elegíveis separadamente, sem colar o final de um bloco ao começo de outro e criar termos inexistentes. Descrição e NCM da mesma linha ficam associados. Classificação retorna motivo e parte; produtos descritos do 100/97 continuam classificáveis sem NCM. Um resultado incompleto aparece como pendente/parcial, nunca como “nenhum assunto encontrado” definitivo.

### 5.3 Atos posteriores alteram o resultado de vigência

**Requisito confirmado pelo Fábio:** a vigência não pode ser determinada apenas pelo texto ou prazo original do ato. O exemplo indicado é o Convênio 100/97, cuja conferência deve considerar os convênios posteriores que prorrogaram sua vigência. Este desenho não fixa a data final atual nem lista prorrogações como já verificadas; isso integra a conferência documental do piloto.

Cada alteração deve ligar o dispositivo que produz o efeito ao ato/dispositivo afetado, registrando: tipo de efeito, alcance, redação anterior/nova quando aplicável, data de publicação, início de vigência, início/fim dos efeitos, condições, fonte, versão/hash e evidência da conclusão. Uma prorrogação pode trocar o fim de um intervalo sem alterar o texto dos artigos beneficiados. Alteração parcial afeta somente o alcance demonstrado; não prorroga todos os dispositivos por associação.

| Momento | Comportamento obrigatório |
|---|---|
| Fase 1: conferir os dois convênios | Revisor identifica a cadeia relevante de prorrogações/alterações e suas fontes; aprovação do trecho referencia também essas dependências, mesmo que o HTML do ato-base não tenha mudado |
| Fase 1: dependência conhecida mudou ou prazo aprovado terminou | Tornar a seleção pendente de reconferência; a aprovação antiga não continua sustentando uma classificação vigente. Histórico permanece consultável |
| Fase 1: chega novo ato potencialmente modificador dos dois convênios | Citação e termos de alteração/prorrogação geram pendência de revisão para o alvo reconhecido ou possível. Isso é triagem conservadora; não calcula nem aprova automaticamente novo prazo |
| Fase 3: aplicar relações confirmadas | Recalcular os períodos dos dispositivos alcançados e a seleção de consumo na data consultada; atualizar status visual e reprocessar classificação afetada, preservando o histórico |
| Fonte/ato modificador ausente, conflito ou identidade ambígua | Não inventar continuidade de vigência. Indicar a lacuna; obter evidência/revisão antes de nova afirmação positiva |

A aprovação do piloto registra data de referência, data da última conferência e prazo/condição de revisão. Uma consulta em data diferente precisa de cobertura temporal demonstrada; não reutilizar eternamente a etiqueta “vigente”. A triagem depende dos atos capturados e dos vínculos conhecidos: não prometer descobrir automaticamente norma ainda fora do Acervo. Referência oficial externa conferida pode fundamentar a análise, sem exigir coleta automática.

**Exemplo conceitual, sem datas jurídicas afirmadas:** ato A terminaria em D1; dispositivo do ato B prorroga o alcance especificado até D2; ato C modifica apenas parte desse alcance. A consulta deve aplicar B e C aos respectivos alvos e datas, preservando o histórico anterior a cada evento. Não vale escolher a maior data encontrada ou o último ato publicado como regra universal. Ato alterador posteriormente revogado também não restaura automaticamente redação anterior sem fundamento específico.

Dependências são direcionadas e versionadas. Ao receber atualização relevante, identificar os alvos afetados sem percorrer ciclos indefinidamente. Fase 1 registra dependências revisadas e pendências; a inferência e consolidação temporal geral continuam na Fase 3. Uma pendência de evidência não é resolvida mudando cores ou executando novamente a mesma regex.

### 5.4 Evolução temporal e benefício estruturado

Fase 3 acrescenta períodos e eventos por dispositivo: publicação, vigência, efeitos, alteração, revogação, prorrogação, condição ainda não satisfeita e origem oficial. Intervalos devem ter convenção única de limites e preservar a expressão literal. Data civil usa calendário e fuso de referência declarado, não conversão acidental de meia-noite UTC. Guardar também quando a conclusão foi conhecida pelo sistema, para não reescrever retroativamente a auditoria.

Fase 4 pode extrair benefício com: espécie (isenção/redução de base/crédito presumido/diferimento etc.), tributo, dispositivo, produto/descrição/NCM e edição, operação, origem/destino/UF, beneficiário, percentual e sua natureza, condições, exceções, manutenção/estorno de crédito, período, necessidade de norma estadual e fontes. Valor ausente permanece desconhecido. Não calcular carga efetiva ou afirmar direito do contribuinte se faltarem condições.

## 6. Armazenamento proposto e reprocessamento

### 6.1 Modelo lógico, sem SQL ou migration

Reaproveitar identidades, versões, origens, arquivos e evidências de classificação existentes. **Fábio escolheu o armazenamento mais estruturado, com tabelas separadas, em lugar de concentrar a árvore e as entidades em um JSONB único.** Como a alternativa escolhida também mencionava “outro banco especializado” sem indicar tecnologia ou necessidade, o detalhamento abaixo usa PostgreSQL relacional existente. Introduzir outro banco permanece sem decisão e não é pressuposto para a Fase 1.

| Tabela proposta | Campos principais | Responsabilidade / fase |
|---|---|---|
| `anatomy_rule_sets` | id, versão ordenável, status, perfis/configuração, hash, versão do contrato, autor/revisor, datas | F1: regras editadas pela tela, imutáveis depois de ativadas; JSONB restrito à configuração variável |
| `publication_anatomies` | id, publication_version_id, origem/representação, input_text_hash, input_presentation_hash, attachment_manifest_hash, engine_version, rule_set_id/hash, status, cobertura, output_hash, created_at | F1: cabeçalho da análise e vínculo ao snapshot; não contém toda a árvore como único registro opaco |
| `anatomy_parts` | id, anatomy_id, parent_id, ordem, tipo, rótulo, início/fim, ponteiro de origem, confiança, cobertura, atributos de tabela | F1: árvore ordenada. Tabela/linha/célula são tipos de parte; atributos incluem linha/coluna e spans. Não criar tabela diferente para cada artigo/inciso/alínea |
| `anatomy_entities` | id, anatomy_id, part_id, domínio, texto literal, valor normalizado, início/fim, regra, confiança, catálogo/edição, validação | F1: ocorrências, inclusive citações reconhecidas sem link e capítulos de dois dígitos não classificáveis |
| `anatomy_evidence` | id, anatomy_id/part_id, tipo, fundamento, fonte/snapshot, data de referência, intervalo conferido, conclusão, revisor, data e validade da conferência | F1: evidência e aprovação restrita do piloto; separada da confiança de extração |
| `anatomy_dependencies` | id, evidence_id, ato/dispositivo dependente, ato/dispositivo de fundamento quando identificado, referência externa, hash/versionamento, efeito relatado, estado de revisão | F1: dependências conferidas e pendências dos dois convênios; suporta invalidação sem implementar consolidação temporal geral |
| `anatomy_runs` | id, manifesto/escopo, regras/engine alvo, iniciador, início/fim, cursor, contadores, custo/tempo medido | F1: execução de lotes e auditoria |
| `anatomy_run_items` | run_id, versão/hash de entrada, status, tentativa, duração, erro, anatomy_id de saída | F1: retomada e erro isolado; reaproveitar estrutura existente equivalente se confirmada na implementação |
| `act_citation_resolutions` | entity_id, ato/dispositivo alvo, método, identidade, versão do resolvedor, estado e evidência | F2: resolver links, sem duplicar o texto da citação |
| `provision_effects` | origem/alvo, natureza, alcance, início/fim de vigência e efeitos, condição, evidência, data de conhecimento | F3: relações e períodos por dispositivo; usa as dependências existentes |
| `provision_benefits` | dispositivo, espécie, tributo, operação, território, produto/NCM, percentual/natureza, condições, exceções, período, evidências | F4: benefício estruturado; condições variáveis podem usar campos JSONB delimitados |

Oito tabelas são o ponto de partida lógico da Fase 1, não DDL autorizado. Chaves de pai/filho e de entidade/parte devem impedir ligação entre análises incompatíveis. Cada análise nova grava cabeçalho, partes e entidades de forma atômica; resultado parcial fica explicitamente marcado, nunca promovido como completo. Índices iniciais seguem versão/anatomia, pai+ordem, domínio+valor normalizado e dependências por alvo/fundamento; índices extras dependem das consultas medidas.

A tela de regras e a tela de evidências usam permissões e trilha de auditoria existentes. Revisor, fundamento e hash são obrigatórios para afirmar vigência no piloto. Não reutilizar atributos HTML externos como aprovação. Se outra frente já tiver disponibilizado ledger jurídico no momento da implementação, adaptar a ele após conferir o schema vivo; a main lida não contém as migrations TAX13 044–050, portanto este desenho não presume aquele ledger implantado.

A escolha de tabelas separadas não exige duplicar textos/anexos nem manter dois bancos sincronizados. Guardar o snapshot imutável uma vez e referenciar suas posições. Um banco especializado adicional só entrará no desenho depois de definidas sua finalidade e a necessidade que PostgreSQL não atenda; não escolher uma tecnologia arbitrariamente.

### 6.2 Posições, imutabilidade e invalidação

- Texto canônico de análise é imutável, separado do texto normalizado para comparação lexical. Especificar offsets de início inclusivo/fim exclusivo em unidades UTF-16, compatíveis com as strings do runtime, com mapa de volta ao bloco/DOM original; testar acentos, caracteres combinantes, emojis e entidades HTML. Não misturar índices UTF-8, code points e UTF-16 entre consumidores.
- Identidade de uma ocorrência inclui versão, representação, parte e intervalo; códigos repetidos em partes históricas e vigentes são ocorrências distintas. Agregação por código é apenas uma visão derivada.
- Mudou texto, HTML relevante, anexo, extrator ou regra → resultado novo. Mudou ato que fundamenta a vigência, prazo ou condição conferida → invalidar a elegibilidade dependente e revisar/recalcular; isso vale mesmo com conteúdo do ato-base idêntico. Alteração só de CSS do nosso renderer não invalida a análise.
- `content_hash`/`publication_version_id` sozinhos são insuficientes: apresentação pode melhorar na mesma versão. Incluir hashes de cada entrada efetivamente consumida e conservar o snapshot ou referência imutável correspondente.
- RFB: acompanhar representação e anexo, mesmo quando a mudança não cria versão canônica. Observar mudança de hash sem corpo preservado não permite reconstruir a redação antiga.
- Correção manual referencia hash exato; nova entrada a torna pendente de revisão, sem reaplicação cega.
- Não comparar versões por ordem lexicográfica como substituto de precedência (`1.10` versus `1.9`). Usar versão ordenável/identificador ativo explícito.
- Taxonomia registra anatomy_id/hash, conjunto de regras, release taxonômica, evidência jurídica/data e engine. Sem isso, não se consegue explicar qual texto gerou a tag. Dependências jurídicas também integram a identidade da seleção elegível; alteração de fundamento pode invalidar tags mesmo sem nova anatomia estrutural.
- Publicação que mudou durante o lote: guardar resultado histórico, mas não promovê-lo como análise da entrada atual. Revalidar hashes antes de tornar o resultado elegível.
- RLS/visibilidade herdados da publicação; documentos globais podem compartilhar extração, mas resultados/links de material privado não vazam entre tenants. Nenhuma função nova deve ampliar acesso.

### 6.3 Reprocessar ≈7.900 publicações

Plano futuro, **não executado nesta frente**:

1. Contagem read-only por fonte, formato, tamanho e anexos; distinguir publicações de versões. Primeira carga processa apenas versões selecionadas do Acervo autorizado, não todo o histórico oculto.
2. Medir 30 referências; depois piloto de 100–200 itens representativos, incluindo os maiores e incompletos. Fixar p50/p95, memória, custo de I/O e taxa de parcial/falha.
3. Manifesto estável de versão+hash; lotes de 50 publicações, também limitados por bytes (ponto inicial: 10 MiB de entrada), concorrência inicial 1 e no máximo 2 após medição. Para 7.900 itens, 158 lotes se o limite de bytes não reduzir o tamanho.
4. Processar uma publicação por unidade atômica, com timeout e checkpoint; erro isolado não reinicia tudo. Parar/pause em falha sistêmica, aumento relevante de carga ou perda de consistência.
5. Escrita de resultados novos, comparação com o anterior e promoção controlada por lote. Anatomia não escreve na redação original, não apaga evidência e não reexecuta coleta.
6. Executar taxonomia somente para itens cujo conjunto de partes elegíveis mudou, com liberação própria. Nova regra de NCM exige invalidar consumidores NCM/curado correspondentes, não todo o cadastro de empresas.
7. Retomar pela chave idempotente da entrada/regras; manter relatório de itens completos, parciais, sem texto e falhos. “Já processado” não pode ignorar mudança de HTML/anexo.

**Estimativa de execução, não benchmark:** a 0,1–1 segundo de CPU por publicação, 7.900 itens custam 790–7.900 segundos, aproximadamente 13–132 minutos em um núcleo. Dois workers podem reduzir a parcela paralelizável, mas não pela metade garantida. Com leitura/gravação, limitação de carga e retomadas, reservar **1–4 horas operacionais**, desde que os textos já estejam disponíveis e não seja preciso OCR ou recaptura. Publicações grandes devem ser medidas separadamente; se a amostra exceder essa hipótese, recalcular antes da carga.

**Custo:** caminho determinístico sem chamada a LLM: zero tokens de IA na extração. Reserva ilustrativa de 2 vCPU e 2 GB durante 1–4 h corresponde a até 2–8 vCPU-h e 2–8 GB-h, além de banco/I/O/armazenamento. O valor monetário depende da tarifa/uso incremental do ambiente e não foi consultado; não é honesto prometer uma quantia fechada. Fórmula de orçamento: vCPU-h × tarifa CPU + GB-h × tarifa memória + armazenamento adicional × tarifa + I/O/egress aplicável. Se couber na capacidade já contratada, impacto marginal pode ser pequeno, mas não presumido zero.

Hipótese de armazenamento: média de 30 KB de texto representa ~237 MB de entrada; 50 KB de resultado por ato, ~395 MB por rodada, antes de índices/overhead e sem duplicar anexos. Com partes e entidades em linhas separadas, o overhead de tuplas/índices deve ser medido explicitamente. Reservar inicialmente **2–5 GB de folga como hipótese**, não garantia de suficiência, medindo amostra. Várias versões de análise multiplicam esse volume; política de retenção não deve apagar originais ou evidências aprovadas.

Reprocessamento seletivo: mudança do perfil CONFAZ afeta esse perfil; mudança de precedência de números afeta as fontes em que ela é usada; mudança de link não refaz estrutura/NCM; mudança de vigência refaz elegibilidade e classificação, sem refazer extração se o texto não mudou. Dependências simples por etapa e hashes bastam.

## 7. Qualidade: 30 publicações reais e aceite

### 7.1 Natureza do conjunto

São **30 atos/matérias reais**, não 30 casos sintéticos. Os 12 XMLs DOU representam 10 matérias porque a Portaria SAES/MS 4.940 ocupa três partes; não contar as continuações como três publicações. As expectativas abaixo são o contrato inicial de referência por amostra, derivado de leitura do conteúdo. **Não são resultados de parser executado nem anotação exaustiva já homologada.** Antes de medir precisão/recall, congelar e revisar todos os spans dessas mesmas entradas; documento de desenho não implementa fixtures/testes.

Composição: 2 CONFAZ + 10 DOU + 10 DOE-SP + 8 RFB. Incluir deliberadamente atos sem artigos, pessoal, processo e tabelas não NCM como controles negativos. Estarem no corpus não autoriza incluí-los na coleta nem alterar o F3.

Fontes de corpos: CONFAZ e DOU em arquivos versionados no SHA B; DOE-SP obtido por GET `https://do-api-web-search.doe.sp.gov.br/v2/publications/{id}`; RFB por GET `https://normasinternet2.receita.fazenda.gov.br/api/consulta-externa/ato/{id}/visao/original`, em 15/10/2026. Para RFB, os oito ids do Acervo foram conferidos na API pública; corpos foram lidos diretamente da fonte. Anexos PDF não lidos não recebem conteúdo esperado inventado.

### 7.2 Matriz de referência

| # | Publicação real / identificador da amostra | Estrutura esperada | Entidades/resultado esperado e principal negativo |
|---|---|---|---|
| 01 | Convênio ICMS 52/91 — `ops/confaz/acts/CV052_91.html`; Acervo `07d24640-61a0-45db-8f69-3b064320b2b2` | Epígrafe, ementa, preâmbulo, cláusulas 1ª–6ª, fecho, notas e seis tabelas em múltiplas redações dos anexos I/II | Citações 89/09, 154/15; candidatos `7307.19.20`, `8417.8020`, `8201.10.00` em suas células; ambas as ocorrências históricas `8450.11.00` excluídas da elegibilidade corrente; ano 1992 não é fim atual inferido |
| 02 | Convênio ICMS 100/97 — `ops/confaz/acts/CV100_97.html`; Acervo `4c92f7ce-2e3d-4a61-9524-d4beca0c2af7` | Epígrafe, ementa, notas editoriais, cláusulas com versões, incisos/alíneas/parágrafos; sem tabela HTML neste arquivo | Citações Conv. 99/04, 26/21 e Ato COTEPE 17/97; 60%, 30%, 4% em contextos diferentes; produtos textuais inseticidas/fungicidas/fertilizantes/sementes somente nos trechos aprovados; nota não gera tag |
| 03 | DOU Retificação MDHC — matéria `24377394`, arquivo `515_20260918_24377394.xml` | Epígrafe, retificação com “onde se lê/leia-se”, sem artigos próprios | Portaria 340/2026; processo `2003.01.26732`; referência DOU 26/08/2026; não reconhecer fragmentos do processo como NCM |
| 04 | SC Disit 2.004, 17/08/2026 — `24382389`, `515_20260918_24382389.xml` | Epígrafe, dois assuntos, texto interpretativo, dispositivos legais, assinatura; sem criar artigos com base nos citados | LC 214/2025 arts. 537/540, Lei 9.718/1998 art. 5º e SC Cosit 252/2025; 0%; datas de efeitos citadas não são vigência automática de toda a SC |
| 05 | ADE Coana 119/2026 — `24382400`, `515_20260918_24382400.xml` | Epígrafe, ementa, preâmbulo, arts. 1º–3º, assinatura; art. 3º com início de vigência | IN RFB 2.318/2026 art. 22, Portaria Coana 189/2026, CNPJ empresarial e requerimento OEA; zero NCM esperado |
| 06 | ADE Coana 120/2026 — `24382401`, `515_20260918_24382401.xml` | Mesma família, arts. 1º–3º, sem confundir com o ADE 119 da mesma página | IN 2.318/2026, Portaria Coana 189/2026; CNPJ com zero inicial preservado e requerimento distinto; zero NCM |
| 07 | Despacho MF — processo `17944.003839/2025-17`, matéria `24382325`, `600_20260918_24382325.xml` | Cabeçalho, processo/interessado/assunto, decisão e assinatura, sem artigos próprios | US$ 67 milhões e 33,5 milhões; LC 101/2000 art. 40, Res. Senado 48/2007 e 26/2026; moeda/processo protegidos contra NCM |
| 08 | Despacho MF — processo `17944.003906/2025-95`, matéria `24382380`, `600_20260918_24382380.xml` | Corpo não articulado, autorização e assinatura | US$ 1 bilhão; processo como unidade; referências jurídicas completas; não fundir com outro despacho da mesma data/página |
| 09 | Despacho MF — processo `17944.004579/2026-70`, matéria `24382412`, `600_20260918_24382412.xml` | Processo, interessado, assunto, autorização e assinatura | MP 1.373/2026 art. 14; R$ 200 milhões; Fies; zero NCM |
| 10 | Portaria SAES/MS 4.940/2026 — `24378456`, arquivos `602_20260918_24378456-1.xml` a `-3.xml` | Uma matéria, arts. 1º–8º, anexos I–III, cinco tabelas distribuídas nas três partes; continuação não reinicia ato | Decreto 11.798/2023 art. 68, códigos SUS/CBO/CID e valores; `09.09.01.005-6`, `2251-09`, `0009` não são NCM; separar vigência de efeitos operacionais do art. 8º |
| 11 | IN RFB 2.342/2026 — `24380292`, `602_20260918_24380292.xml` | Epígrafe/ementa/preâmbulo, arts. 1º–6º próprios e blocos de nova redação com artigos citados dentro de aspas | IN 2.228/2024, Lei 15.079/2024, Portaria ME 284/2020; arts. 143-A a 143-L citados não são renumeração dos seis artigos próprios |
| 12 | Portaria GM/MS 12.157/2026 — `24359694`, `603_20260918_24359694.xml` | Cinco capítulos, arts. 1º–21, parágrafos/incisos, assinatura; art. 21 contém vigência | CF art. 87, Decreto 11.798/2023; II de enumeração não vira tributo; zero NCM |
| 13 | DOE-SP Decreto 70.843/2026 — `b768399b-6638-460d-bce0-08df049590c6` | Ementa, preâmbulo, arts. 1º–7º, incisos; art. 6º, II, alíneas a/b; três assinaturas | DL 233/1970 arts. 6º/13/14; Decretos 67.483/2023 e 67.559/2023 como alvos expressos de revogação no art. 7º; não revogar o ato emissor |
| 14 | DOE-SP Decreto sem número de 03/09/2026 — `1445d0d3-e469-4d7f-ed0b-08df081b20d4` | Autoridade, fundamentos, designação e assinatura; não inventar artigos/número de decreto | Leis 185/1973 e 15.050/2013, processo SEI e identificador pessoal protegido; prazo de mandato não é NCM nem vigência global |
| 15 | DOE-SP Despacho do Governador de 03/09/2026 — `a2e9bf6e-6d2f-430e-23cc-08df09ae1af9` | Processo/interessado/assunto, decisão, assinatura | Lei 17.293/2020 art. 10, II e Anexo III item 11; Lei federal 14.133/2021; matrícula imobiliária e SGI não são NCM |
| 16 | DOE-SP Pauta da 35ª Sessão PGE, biênio 2025/2026 — `b8fb1bba-1e31-407d-ab7f-08df0495b84e` | Cabeçalho, data/hora, instruções, ordem do dia e itens; sem articulação normativa inventada | Dois processos SEI, e-mail institucional, Decreto 62.218/2016 art. 3º; numerais I–VII são itens de pauta; zero NCM |
| 17 | DOE-SP Resolução Seduc 86/2026 — `9716c5c2-7f22-46eb-a80d-08df0495b6f6` | Ementa, preâmbulo, capítulos, arts. 1º–35; resíduos Word fora do conteúdo jurídico | Lei 11.947/2009, Decreto 70.655/2026; art. 34 revoga Res. SE 63/2016 com ressalva do art. 30; art. 35 vigência. Não aplicar revogação sem ressalva |
| 18 | DOE-SP Portaria URE 66/2026 — `91174000-076a-4029-bc7f-08df049590c6` | Preâmbulo, arts. 1º–5º; sem ementa oficial fabricada | Decreto 69.665/2025, Lei 9.394/1996, CNPJ, dois CEPs e processo; `01103-201` e código CIE não viram NCM |
| 19 | DOE-SP Cassação de IE — `ffe36bfd-ee7d-487b-d449-08df09ac2b13` | Cabeçalho do posto, notificação, bloco cadastral; corpo não articulado | Portaria CAT 95/2006 arts. 11–13, CNAE `46.39-7/01`, CEP `04.121-002`, IE, CNPJ e OSF; prazo de 30 dias; zero NCM |
| 20 | DOE-SP Portaria SRE 43/2026 — `70413500-3dd4-4b9b-a88a-08df0495b6f6` | Ementa/preâmbulo, arts. 1º–2º, tabela citada de duas colunas dentro da alteração | Portaria CAT 125/11 e Res. SFP 43/20 art. 7º; `630-0` é código de receita; cabeçalho “CÓDIGO” não autoriza NCM |
| 21 | DOE-SP Comunicado Dicar 59/2026 — `d7eb71ec-9daf-4804-7eae-08df0817934e` | Ementa/corpo e referência a anexo PDF; não há tabela embutida no HTML lido | Lei 10.175/1998 art. 1º; data-limite 30/09/2026; registrar anexo presente como arquivo, conteúdo tabular pendente até leitura do PDF |
| 22 | DOE-SP Retificação do DOESP 26/08/2026 — `a1f3e33f-e962-4ae9-ed58-08df04981eb4` | Retificação, título espaçado “A N E X O I”, uma tabela com cabeçalho composto | Decreto 70.818/2026, Anexo I; identificadores de pessoal protegidos; texto novo não vira artigo próprio nem consolidação automática |
| 23 | RFB ADE Corat 79/2026 — idAto `153836`; Acervo `b12a440e-a51a-46f6-bfd0-64e99973dd7a` | Ementa/preâmbulo, arts. 1º–3º, assinatura; tabelas em anexos HTML 86703/86704 | ADEs Corat 63/2026 e 78/2026, Res. CGSN 194/2026 e 140/2018; exclusão/inclusão de disposição; números 30/15 em prazo de agenda não são NCM |
| 24 | RFB SC Cosit 188/2026 — `153828`; Acervo `c1d34508-127b-44f7-acba-ef9855a6b635` | Dois assuntos/ementas, dispositivos legais, assinatura e PDF 86695 | Leis 4.090/1962, 5.172/1966 art. 111, 7.713/1988, 8.134/1990, Decretos 70.235/1972 e 7.574/2011, IN 2.058/2021; não confundir art. citado com corpo próprio |
| 25 | RFB SC Cosit 193/2026 — `153829`; Acervo `a1adee50-e233-4790-9ac0-561529ae08d7` | Dois assuntos/ementas, fundamentos citados, assinatura e PDF 86696 | Lei 11.196/2005 arts. 17/18 §2º; Decreto 5.798/2006; INs 1.187/2011 e 2.058/2021; inovação citada na ementa não autoriza classificação de texto vigente sem inteiro teor |
| 26 | RFB SC Cosit 187/2026 — `153819`; Acervo `d533b82e-7df1-4a1a-a171-cb8e8e00cb1e` | Assunto/ementa, dispositivos, assinatura e PDF 86693 | Leis 12.973/2014 e 14.789/2023; IN 2.198/2024, Anexo Único item 29; 1º/01/2024 é data referida, não vigência da SC |
| 27 | RFB SC Cosit 189/2026 — `153820`; Acervo `aab9e05f-19ae-4663-a0a8-8982562955fe` | Assuntos PIS/Cofins, referências e assinatura; PDF 86692 | Lei 14.967/2024 relata revogação da Lei 7.102/1983; SD Cosit 1/2025; IN 2.121/2022 art. 123. A SC não é o ato revogador |
| 28 | RFB SC Cosit 191/2026 — `153821`; Acervo `9a1e1e9c-5fac-4b40-b7f9-59a883f3c0ef` | Assunto/ementa, dispositivos legais, assinatura e PDF 86691 | Res. CGSN 140/2018 art. 26 §7º IV e art. 100 §5º; fator `0,01` é decimal sem símbolo de percentual; zero NCM |
| 29 | RFB SC Cosit 192/2026 — `153822`; Acervo `9f4546ba-288e-431f-b573-c28208eac046` | Assunto/ementa, referências, assinatura e PDF 86690 | CTN/Lei 5.172/1966 art. 138; SCI Cosit 7/2024; Portarias RFB 1.936/2018 e 20/2021; IN 2.058/2021; todas as numerações protegidas |
| 30 | RFB Retificação da Portaria 725/2026 — `153743`; Acervo `0ee13c61-d0c4-462e-a8e8-c1a56315ada3` | Marcador Retificação e três pares de correção: preâmbulo, artigo e assinatura | Portaria RFB 725/2026 e referências ao art. 2º; preservar aspas incompletas e redação do original sem “consertar” a lei; nenhuma inferência NCM |

### 7.3 Evidências reproduzíveis das entradas

DOU: arquivo e SHA-256 completo estão no [manifesto versionado](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/fb880354fbbbc90f681290e57dc905bde9ce9c08/test/fixtures/dou/manifest.json), incluindo archive, seção e hash do ZIP; `pdfPage` de cada XML fornece a página certificada. O conjunto está em `test/fixtures/dou/` no mesmo SHA.

CONFAZ: os arquivos do repositório são snapshots de fonte, não consulta atual de vigência. Blobs Git identificados no apêndice de referências; identidade e URL dos dois atos foram reconfirmadas no Acervo público. A anotação jurídica do piloto precisará conferir a representação oficial atual/data escolhida.

Para as respostas oficiais lidas nesta sessão, estes são os hashes SHA-256 dos bytes JSON recebidos (mudança posterior de resposta exige nova revisão; id da fonte não é id de versão produtiva):

| Amostra | SHA-256 da resposta oficial |
|---|---|
| DOE Decreto 70.843 | `6a695d3e2ab156572c9c852175255905a5c891a5f05561da3f1b648250083d1f` |
| DOE Decreto sem número | `f56381e7076e0e4f26f70e4a4dc0b1c657871c6218037e2d9f4b50e728cd1527` |
| DOE Despacho Governador | `b2e012ede2228d65c41b9e387410a1c1d0a69f28477e0fe635c4e5d541a85d8a` |
| DOE Pauta PGE | `19585b9ab7edbbcf527c0fc4966c54a86fcf677351d23dbdce96bddd3fe9bfb8` |
| DOE Seduc 86 | `043449c800d2c72e6f7f9ae472c943784d3340786179bf8724cb3bf089c875b1` |
| DOE URE 66 | `05d941844a919981864ea7e57d271fa95feaa401953c35344503c6c89de856a6` |
| DOE Cassação IE | `f95802e72f55bf77f7e8357d8858ec02e8ef7453f3f643403495c096d6166866` |
| DOE SRE 43 | `c9de38fdb4b5d254bcb755d4205c448a984c8169013671f9c55009c69bf48469` |
| DOE Dicar 59 | `1cc461fc6b77eaa6546cb150d5d1ac0baaf1c3e257acc50fcda7bbdee1d85c62` |
| DOE Retificação | `79c4267ed711f30da6e54e4c9a46132996ba65ece3988d9343de7c9d2e41eb27` |
| RFB 153836 | `84d788bb314510166cb70aade948f49c1606915056bf452c1619c15727a135ac` |
| RFB 153828 | `5397923095b1eb29669eb68a2a22aac5f9a066cc9f73ef582030d3b010f31a03` |
| RFB 153829 | `b9c737dc353c52c9ae5e32f5180e86f45c2f8d419e5de64cee165ad0a4b240bd` |
| RFB 153819 | `e9c21d1e289cdffe1a37a9db5c62f82e96512c012dd403721f134dd92b132b56` |
| RFB 153820 | `254d91ef371696d0367d33ebe066eabcd1d3773d77ba232986a6c835f7f5b6f2` |
| RFB 153821 | `7dbe7bce751bed280e1bf8cbf9e4857ce3050e679a39915b0e41bc49c61d3263` |
| RFB 153822 | `0fd21cff718b2c15e0839257c913c8252f3c61c3193ae89669d9cc6aa43ad424` |
| RFB 153743 | `2ac5537168fff4dcda5ce5bbae1861b38c890a5c42941c3442687530373100a3` |

Não incluir nomes/CPF de atos de pessoal nos relatórios de teste. Guardar amostra sanitizada para revisão, com hash próprio e registro da redação, sem fingir que o hash sanitizado é o hash do corpo oficial. Dados de empresas/clientes do SaaS não participam deste corpus.

### 7.4 Métricas e gates por fase

Medir por ocorrência/parte, não só por código distinto. Precisão = acertos entre achados; recall = achados corretos entre ocorrências anotadas. Reportar por fonte/família, média macro e menor resultado; um convênio enorme não pode esconder falha em DOE-SP. Cobertura = proporção de conteúdo legível com parte atribuída, discriminando explícito/inferido/desconhecido; não contar “desconhecido” como sucesso de identificação.

| Fase | Aceite proposto, após anotação humana de referência |
|---|---|
| F1 Estrutura | 100% do texto de entrada contabilizado como parte ou lacuna, sem desaparecimento/duplicação; F1 de fronteira+tipo ≥0,95; acerto de pai ≥0,98 nos perfis suportados; 100% das linhas/células das tabelas críticas preservadas com associação correta |
| F1 Citações | Precisão ≥0,99 e recall ≥0,95 para citações explícitas no corpus; todos os exemplos de citação como falso NCM devem produzir zero falso positivo. Referências incompletas podem ficar não resolvidas |
| F1 NCM | Precisão ≥0,995 e recall ≥0,95 nos spans elegíveis anotados; **zero** NCM em zonas proibidas, de 2 dígitos classificando, ou derivado de lei/CNAE/CFOP/CEP/CNPJ/processo. Se amostra pequena não sustentar percentual, publicar contagem absoluta e exigir zero erro crítico |
| F1 Convênios | 100% dos casos críticos dos dois convênios corretos; zero tag/evidência corrente derivada de histórico/revogação/ementa; zero `8450.11.00` histórico classificando; descrições do 100/97 elegíveis sem depender de NCM. Seleção positiva depende da execução da conferência aprovada em D01 |
| F1 Administração | Rascunho não altera resultados ativos; simulação mostra diferenças; ativação auditada gera versão imutável; retorno restaura a versão selecionada; usuário sem permissão não edita regras globais; nenhuma ativação inicia carga global silenciosa |
| F1 Dependências jurídicas | Mudança de fundamento/prazo invalida a aprovação dependente mesmo sem mudança do texto-base; pendência retira a alegação corrente e preserva histórico; ato novo potencialmente modificador dos dois convênios gera revisão, sem aprovação automática |
| F1 Reprodutibilidade | Mesmo snapshot + mesmas regras = mesmo output_hash; nova entrada invalida corretamente; falha/arquivo ausente aparece como parcial; nenhuma regressão de visibilidade/tenant |
| F2 Links | Zero resolução errada nos casos de referência e ambiguidades; precisão ≥0,995 no conjunto ampliado; cobertura de resolução reportada separadamente, sem meta que force adivinhação; links respeitam permissões |
| F2 Layout | Zero omissão/troca de texto/célula; conferência visual de todos os templates suportados em desktop e mobile; estados desconhecido/histórico/revogado distinguíveis sem depender de cor; limites da fidelidade documentados |
| F3 Vigência | 100% dos casos críticos de limites temporais, revogação parcial, efeitos futuros e ressalvas aprovados; zero alegação positiva sem fundamento. Metas percentuais não compensam um erro jurídico crítico |
| F4 Benefício | Precisão ≥0,99 nos campos preenchidos do conjunto anotado; nenhum percentual sem natureza, nenhum escopo/condição inventado; cobertura separada para dados não disponíveis |

Reservar dez das 30 amostras para avaliação final sem ajuste de regras sobre seus resultados: 04, 06, 08, 09, 12, 14, 16, 18, 24 e 28. Dois convênios permanecem casos críticos de desenvolvimento e aceite; antes de expansão, adicionar atos de fontes/famílias novas que não foram usados para escrever regras.

Além dos 30 reais, criar posteriormente casos derivados adversariais, explicitamente rotulados como sintéticos: prorrogação por outro ato sem alteração do texto-base, cadeia de duas prorrogações, revogação parcial após prorrogação, fim do intervalo conferido, referência modificadora ausente, `Lei nº 8.433`; NCM de 2/3/4/5/6/7/8/9 dígitos; zero inicial; CFOP `5.102`; NCM em ementa; valor/CEP com oito dígitos; tabela NCM com `rowspan`; anexo histórico cujas células perderam classe; HTML sem marca, imagem sem OCR, mudança de hash, duas leis homônimas de UFs diferentes e instruções maliciosas dentro de texto coletado. Esses casos não contam como publicações reais adicionais.

## 8. Consumidores: o que muda e o que permanece

| Consumidor | Mudança proposta | Permanece |
|---|---|---|
| Detector NCM | Recebe partes/colunas e intervalos elegíveis; persiste ocorrências, domínio e evidência; 4/5/6/7/8 na classificação; 2 apenas informativo | Catálogo oficial, rastreabilidade e preservação dos códigos; sem significado automático de benefício |
| Classificação lexical/curada | Deixa de concatenar título+corpo indiscriminadamente; usa seleção vigente por parte e data; retorna anatomy_id/parte/trecho | Release publicada, conceitos, sinônimos e curadoria; não altera planilhas F2 nem publica nova release |
| Matching empresarial | Recebe tags/NCM originados da seleção elegível e estado de completude | Tenant, empresa, filtros e significado de relevância potencial. Prefixo não prova incidência |
| Acervo | Sumário, navegação por dispositivo, tabelas e indicação de cobertura/status; links entram na F2 | Busca e URL do ato, acesso ao texto original, origens, permissões e histórico |
| Convênios 52/91 e 100/97 | Mesmo contrato estrutural, com adaptações pequenas de perfil; NCM em tabela e descrição textual convivem | Conteúdo oficial preservado; regras/condições não são resumidas em mera lista de produtos |
| Coleta/Filtro Nome do ato | Pode fornecer metadados para selecionar perfil | Nenhuma mudança de KEEP/DISCARD, purge, fonte, cron, download ou identidade normativa |
| Layout | Consome árvore/grade e situação jurídica comprovada; remove gradualmente duplicação de inferência do browser | Sanitização, segurança de links, acessibilidade e original como referência |

Não habilitar fallback silencioso para classificação geral quando a Anatomia falhar. Transição futura por fonte/lote: comparar antigo e novo, registrar diferenças e promover apenas o resultado autorizado. O resultado antigo pode continuar disponível como histórico, mas não como classificação “vigente comprovada”. Se houver só identificação histórica, mostrar isso como tal.

## 9. Fases e estimativa honesta

Dias úteis estimados para um executor familiarizado com o projeto, com acesso às amostras e revisor disponível. São faixas de planejamento, não compromisso de data; não incluem espera por decisão, fonte indisponível, OCR ou ampliação de escopo. Implementações futuras terão seus próprios pacotes e autorização.

| Fase | Entrega | Estimativa e gate |
|---|---|---|
| 0 — Consolidar revisão | Registrar escolhas recebidas; confirmar tratamento de ato ausente e detalhamento de armazenamento; conferir entrada produtiva e responsáveis pelo recorte do piloto | 0,5–1 dia de revisão/decisão; nenhuma implementação neste PR |
| **1 — Anatomia e administração inicial** | Perfis CONFAZ prioritários, fallback conservador DOU/DOE-SP/RFB; partes, tabelas existentes, citações **sem link**, NCM 4–8 com/sem pontos e capítulo informativo; tabelas relacionais; tela administrativa de regras com simulação/versionamento; entrada da taxonomia e seleção revisada dos dois convênios com dependências e pendências | **9–14 dias de implementação + 2–4 dias de revisão/ajustes**. Faixa ampliada pelas escolhas de tela na F1, armazenamento separado e conferência das dependências. Anotação e revisão jurídica podem ocorrer em paralelo, mas são gate do aceite |
| 2 — Links e leitura estruturada | Resolução exata/aliases aprovados, âncoras por dispositivo, sumário e layout fiel; ampliar suporte a anexos já disponíveis. Administração de regras já entregue na F1 | 4–7 dias + 1–2 de revisão; expansões do editor além do contrato da F1 serão estimadas separadamente |
| 3 — Vigência por dispositivo | Eventos, intervalos, relações entre atos, efeitos e ressalvas; consultas em data; substituir gradualmente recortes manuais | 7–12 dias + 2–4 de revisão jurídica/técnica para famílias delimitadas. Não promete consolidar toda legislação brasileira |
| 4 — Benefício estruturado | Piloto 52/91 e 100/97 com operações, UFs, condições, percentuais e vínculo ao dispositivo | 4–7 dias + 1–2 de revisão; aplicação completa por UF depende de atos estaduais disponíveis |
| Operação de expansão | Rodada controlada sobre ≈7.900 entradas e relatório; sem recaptura global | Após benchmark, 1–4 h de execução técnica estimada e 0,5–1 dia de acompanhamento/análise; autorização própria |

**Fase 1 ampliada por decisão do Fábio:** inclui tela administrativa de regras, armazenamento relacional separado e dependências jurídicas conferidas do piloto. Continua delimitada: sem editor universal, banco de grafos pressuposto, OCR, IA generativa, consolidação automática de vigência geral, decisão de benefício, recuperação de todos os anexos ausentes ou reformulação completa da tela do Acervo. Inclui contrato de layout e preservação de tabelas. A estimativa anterior de 4–6 dias deixou de representar esse escopo.

Se o recorte temporal dos convênios exigir investigação não concluída no prazo, entregar estrutura e simulação com pendência explícita; não substituir a conferência por suposição. O COORD decide se ajusta prazo ou aceita esse marco intermediário. O aceite de “taxonomia somente vigente” exige a prova positiva prevista em D01.

## 10. Riscos e decisões do Fábio

### 10.1 Riscos e o que não fazer

| Risco concreto | Conduta simples |
|---|---|
| Texto/HTML já perdeu semântica na sanitização | Declarar limitação; reaproveitar original disponível; recaptura pontual é outro pacote. Não inventar a marcação perdida |
| Anexo histórico contém NCM com aparência atual | Delimitar contexto de anexo e redação; manter ocorrência histórica excluída do conjunto elegível |
| “Vigente” confundido com última versão ou estilo | Separar evidência jurídica de estrutura e de CSS; ausência de revogação não prova vigência |
| Prazo original vencido mas prorrogado por outros atos | Conferir atos posteriores, modelar relação/fundamento e invalidar seleções dependentes quando mudarem; sem evidência, deixar pendente |
| Regra dinâmica afeta milhares de atos | Simular diferenças, versionar e reprocessar apenas escopo dependente; promoção e retorno simples |
| Citações homônimas / texto não articulado | Exigir contexto de identidade; permitir resultado não resolvido/desconhecido |
| Catálogo atual perde código antigo | Preservar menção original e edição; nunca apagar evidência porque não achou no catálogo corrente |
| Tabela/nota contraditória | Conservar conteúdo e marcar conflito; não escolher coluna/alcance por aproximação |
| HTML hostil ou excesso de tamanho/regex | Sanitização separada de extração, limites e interrupção por item; texto coletado é dado, nunca instrução |
| Dados pessoais / tenant | Relatórios com evidência mínima; não copiar dados privados para governança; permissões herdadas |
| Complexidade excessiva | Tabelas com responsabilidades definidas e módulos existentes; sem tabela por tipo de inciso, duplicação de snapshots, DSL ou LLM obrigatório. Banco adicional depende de finalidade aprovada |

Não reabrir F3 para “melhorar” o filtro, não apagar publicações, não publicar taxonomia, não aplicar migrations, não alterar Railway, não reutilizar o runner F2, não misturar branches de código nesta frente. Não religar o verde retirado por TAX13 sem evidência e aceite específicos.

### 10.2 Decisões do Fábio e pontos ainda abertos

**Origem:** decisões recebidas diretamente do Fábio neste chat em 15/10/2026, 12:58 BRT, em resposta à proposta ANAT-00 de GPT-EXEC. O pedido original veio de CLAUDE-COORD. Esta revisão documental registra escolhas de desenho; não é autorização de implementação, migration, carga, merge ou deploy.

| ID | Decisão | Escolha registrada / proposta atual | Estado e alternativas |
|---|---|---|---|
| D01 | Vigência na primeira entrega | Conferência de trechos dos Conv. 52/91 e 100/97, com fonte, versão, data e atos posteriores que alteram/prorrogam vigência; taxonomia somente sobre trechos aprovados | **Escolhida pelo Fábio.** Sem conferência, resultado permanece candidato/pendente. Consolidação temporal geral fica na F3; responsável pela conferência ainda será indicado |
| D02 | Grafias NCM | Aceitar pontuadas e sem pontos, incluindo os exemplos `10`, `1010`, `1010.1`, `1010.11`, `1010.11.1`, `1010.11.11` | **Escolhida pelo Fábio.** Dois dígitos são capítulo informativo e não classificam, preservando decisão anterior; 4–8 são candidatos sujeitos a contexto/catálogo. Zonas proibidas e proteção contra outros domínios permanecem |
| D03 | Ajuste de regras | Tela administrativa já na Fase 1, com rascunho, simulação, comparação, ativação versionada e retorno | **Escolhida pelo Fábio**, aceitando aumento de prazo. Configuração apenas em arquivo deixa de ser a entrega suficiente da F1 |
| D04 | Links | Resolução automática apenas por identidade inequívoca; equivalências de nomes aprovadas depois | **Escolhida pelo Fábio.** Links permanecem na F2; aproximação automática não foi aprovada |
| D05 | Ato citado ausente | Proposta mantida: citação sem link interno; link oficial externo se conhecido/validado; inclusão na coleta por ação separada | **Não respondida nesta rodada.** Alternativa: coletar automaticamente. Não presumir autorização de coleta; recomendação continua sem coleta automática |
| D06 | Tabela quebrada | Reconstruir somente quando células/colunas forem identificáveis com segurança; caso contrário, original e limitação explícita | **Escolhida pelo Fábio.** OCR/IA geral fora do começo |
| D07 | Cores e layout | Organização original; vigente comprovado preto, revogado comprovado vermelho, redação anterior identificada e situação desconhecida sinalizada | **Escolhida pelo Fábio.** Status depende de evidência e data, incluindo alterações por outros atos |
| D08 | Armazenamento | Fábio escolheu a alternativa de mais tabelas ou banco especializado. Desenho detalhado passa a separar análise, partes, entidades, evidências, dependências, regras e execuções | **Direção escolhida; tecnologia adicional não definida.** Recomendação técnica: tabelas separadas no PostgreSQL existente. Se a intenção for um segundo banco, definir sua finalidade antes de escolher tecnologia; não houve autorização para provisioná-lo |
| D09 | Expansão | Dois convênios → 100–200 publicações → restante do Acervo em lotes | **Escolhida pelo Fábio.** Execução e carga dependem de pacote autorizado e critérios de aceite |
| D10 | IA e ferramentas externas | Regras determinísticas e adaptadores por fonte; avaliar ferramentas externas somente com ganho demonstrado | **Escolhida pelo Fábio.** LLM obrigatório e integração externa grande na F1 não aprovados |

**Requisitos mantidos:** somente desenho; documento único em PR de documentação; NCM de dois dígitos não classifica; zonas proibidas para NCM; F1 com citações sem link; links/vigência geral/benefício em fases posteriores; ferramenta ajustável; nenhuma implementação antes da revisão COORD+Fábio.

**Pendências para fechar a revisão:** resposta D05; confirmação de que D08 será atendida com tabelas separadas no PostgreSQL ou explicitação da necessidade de outro banco; indicação do responsável pela conferência jurídica do piloto. As recomendações já estão concretas no desenho para decisão, sem impedir sua revisão.

### 10.3 Referências de reutilização e conclusão do desenho

Pesquisa de leitura para evitar inventar vocabulário: [documentação LexML](https://projeto.lexml.gov.br/), [XML Schema](https://github.com/lexml/lexml-xml-schemas), [parser de documentos normativos](https://github.com/lexml/lexml-parser-projeto-lei), [lexml-linker](https://github.com/lexml/lexml-linker) e [jsonix-lexml](https://github.com/lexml/jsonix-lexml). O parser documenta execução JVM/Maven e o projeto usa Scala; linker é de outro runtime, Haskell; Jsonix converte XML↔JSON e não reconstrói sozinho estrutura ausente de HTML. Adotar conceitos de epígrafe/ementa/articulação não exige integrar essas ferramentas. A recomendação de mantê-las fora da F1 é uma avaliação de simplicidade desta proposta, não benchmark comparativo. Dependências/licenças devem ser avaliadas antes de eventual incorporação.

Referências duráveis do projeto:

- [Backend no SHA inspecionado](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/tree/fb880354fbbbc90f681290e57dc905bde9ce9c08).
- [Web no SHA inspecionado](https://github.com/fabiojuniort-cyber/radar-fiscal-web/tree/095b167cbc9dc6681ed29d6f06d5b99bdf203370).
- [Retirada de destaques 1cc186eb](https://github.com/fabiojuniort-cyber/radar-fiscal-web/commit/1cc186ebc953326b873c1721252e15217db1e1c6).
- [Snapshot HTML do Conv. 52/91](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/fb880354fbbbc90f681290e57dc905bde9ce9c08/ops/confaz/acts/CV052_91.html) e [snapshot HTML do Conv. 100/97](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/fb880354fbbbc90f681290e57dc905bde9ce9c08/ops/confaz/acts/CV100_97.html).
- [Contrato atual RFB](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/fb880354fbbbc90f681290e57dc905bde9ce9c08/docs/phase-rfb-normas.md) e [templates atuais](https://github.com/fabiojuniort-cyber/radar-fiscal-web/blob/095b167cbc9dc6681ed29d6f06d5b99bdf203370/docs/LEGAL_DOCUMENT_TEMPLATES.md).

**Próximo passo autorizado:** COORD revisar o desenho atualizado com as decisões recebidas e Fábio fechar os pontos explicitamente pendentes. O executor para na atualização do PR documental. Nenhuma fase de desenvolvimento ou operação começa por decorrência automática deste documento.
