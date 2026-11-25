# TAX-01 — Arquitetura funcional da Taxonomia Tributária TriBusca v1

**Estado:** proposta funcional para aprovação · **data de referência:** 28/09/2026 · **classe:** R1, sem código, migration, carga de catálogos ou alteração de produção.

## 1. Decisão de desenho

A taxonomia é um vocabulário governado de conceitos estáveis, com ligações explícitas a catálogos oficiais versionados e um fluxo separado para termos ainda não mapeados. Sua abrangência conceitual independe da cobertura dos conectores: `tax.iss` deve poder existir mesmo sem coleta municipal ativa. A mera existência de um conceito tampouco prova que o classificador o reconhece ou que uma fonte é monitorada.

Esta proposta respeita a coleta global e o relacionamento posterior com empresas/tenants do [mapa de arquitetura TriBusca](https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/docs/ARCHITECTURE.md), a [política de conteúdo oficial](https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/docs/OFFICIAL_CONTENT_POLICY.md) e a D-057: conteúdo não fiscal retido apenas por CNPJ exato exige isolamento comprovado antes de entrar em qualquer consulta pública. O nome `tenant_publications` do enunciado expressa uma **relação conceitual**; TAX-01 não fixa tabela física nem substitui os vínculos existentes no backend.

### Princípios verificáveis

1. **Conceito, menção, classificação e cobertura são objetos distintos.** Uma expressão no texto não vira conceito nem classificação certa por aparecer muitas vezes.
2. **Catálogo oficial é referência com autoridade delimitada.** Guardar código, órgão mantenedor, edição e vigência; não convertê-lo automaticamente em tag amigável nem inferir equivalência jurídica de palavras parecidas.
3. **Eixos independentes.** Tributo, tema, operação, mercadoria, atividade, segmento, documento e obrigação permanecem classificações distintas.
4. **Abstenção explícita.** `UNMAPPED`, ambíguo e “não foi possível determinar com confiança” são resultados válidos e mensuráveis.
5. **Evidência e tempo.** Toda afirmação classificada deve apontar para a versão da publicação, trecho/artefato de origem, regra ou modelo e versão da taxonomia usados; vigência do ato e validade do conceito oficial são relógios diferentes.
6. **Semântica estável.** Rótulo pode mudar; código e identidade de um conceito não podem passar a significar outra coisa. Mudança de significado cria conceito novo e relação de substituição.
7. **Escopo global separado do cliente.** A publicação pode ser classificada globalmente como ICMS, Goiás, soja e crédito presumido. Afinidade, alerta e impacto efetivo para uma empresa só são calculados no contexto privado dessa empresa.

## 2. Arquitetura conceitual

| Camada | Responsabilidade | Exemplo | Autoridade |
| --- | --- | --- | --- |
| Referência oficial | Edições de códigos e definições emitidos por órgão competente; histórico e vigência | código CNAE-Subclasses, NCM, município IBGE | mantenedor oficial |
| Vocabulário TriBusca | Conceitos canônicos, definições, relações e aliases revisados | `tax.icms`, `theme.tax_deferral`, `sector.meat_processing` | governança TriBusca |
| Correspondência | Relação tipada e temporal entre conceito TriBusca e código oficial | segmento associado a várias subclasses CNAE | revisão humana, ancorada no catálogo |
| Observação | Termo ou fato extraído de uma versão de norma, com trecho e incerteza | “entreposto frigorífico avícola” | norma/artefato oficial |
| Classificação global | Afirmação de que uma publicação trata de um conceito canônico existente | ato → `tax.icms` | regras/revisor ou modelo validado |
| Candidato | Lacuna ainda não aprovada, com evidências acumuladas | possível especialização de atividade | fila de curadoria |
| Afinidade privada | Relevância e efeito para tenant, empresa ou estabelecimento | filial em GO + operação com soja | perfil do cliente, sob isolamento |
| Cobertura operacional | Fontes e períodos efetivamente monitorados e sua saúde | DOE-SP ativo; município planejado | operação dos conectores |

Uma classificação global não é um atributo eterno da identidade do ato: ela tem **estado** (`CONFIRMED`, `SUGGESTED`, `AMBIGUOUS`, `UNMAPPED` ou `NOT_APPLICABLE`), evidência, data, versão do conteúdo, versão da taxonomia e método. Afirmações negadas ou corrigidas permanecem no histórico auditável. O texto integral da norma continua na camada de publicação; a taxonomia guarda referências e trechos mínimos necessários, respeitando a política de acesso do conteúdo.

### Distinções obrigatórias

“ICMS sobre venda interestadual de soja com diferimento” produz, se comprovado pelo texto, `tax.icms` (tributo), `operation.interstate_sale` (operação), `product.soy` (produto) e `theme.tax_deferral` (tema). UF de origem/destino, sujeito e período são afirmações adicionais quando a norma os explicitar. A frase inteira nunca vira uma tag única. NF-e é **documento fiscal**; EFD ICMS/IPI é **escrituração/obrigação**, embora possa mencionar NF-e. CNAE descreve **atividade econômica**; “frigorífico” é **segmento/linguagem de mercado**, que pode relacionar-se a mais de uma atividade. NCM classifica **mercadoria** segundo suas regras; “soja” pode ser produto/família comercial e corresponder a mais de um código conforme forma e condição. Não inferir NCM individual de uma palavra genérica.

## 3. Dimensões propostas

**Classes de fonte:** O = catálogo oficial; T = vocabulário TriBusca; H = híbrida. **Classes de inferência:** Obj = dado explícito/normalizável; Int = interpretação da norma; Cli = depende de cliente. Uma mesma dimensão pode aceitar mais de uma classe conforme a afirmação: o rótulo não dispensa prova.

| Dimensão | Fonte | Inferência | Estrutura e cuidado principal |
| --- | --- | --- | --- |
| Esfera/federação | O | Obj | federal, estadual, distrital, municipal; separar poder/âmbito quando necessário |
| Jurisdição territorial | O/H | Obj/Int | UF e município IBGE; distinguir ente emissor de território onde a regra se aplica |
| Órgão emissor e competente | H | Obj | SIORG como referência federal dentro do seu escopo; cadastros estaduais/municipais exigem fonte própria; sucessões temporais |
| Tipo de ato | H | Obj | espécie oficial quando padronizada; ato publicado não equivale a evento normativo |
| Tributo/espécie tributária | H | Obj/Int | fundamento constitucional/legal; manter imposto, taxa, contribuição e demais espécies separados |
| Tema tributário | T | Int | benefício, crédito presumido, diferimento, substituição, isenção, fiscalização etc. |
| Regime/tratamento tributário | H | Int | enquadramento e condições; não usar “benefício” como sinônimo de regime |
| Documento fiscal | H | Obj/Int | NF-e, CT-e, NFS-e etc.; modelo e leiaute oficiais com versão |
| Obrigação/escrituração fiscal | H | Obj/Int | EFD ICMS/IPI, EFD-Contribuições e outras; distinta do documento que alimenta a obrigação |
| Operação econômica/fiscal | T/H | Int | venda, importação, exportação, transferência, prestação, devolução; atributos de origem/destino separados |
| Produto/família de produto | H | Int | conceito de negócio e relações tipadas com NCM; descrição livre não prova classificação NCM |
| Código NCM | O | Obj/Int | código explícito é objetivo; determinar NCM de mercadoria sem código exige análise especializada |
| Atividade econômica/CNAE | O/H | Obj/Int/Cli | CNAE expresso em ato/cadastro é objetivo; inferência a partir de descrição exige revisão; perfil da empresa é privado |
| Segmento de mercado | T/H | Int/Cli | frigorífico, transportadora, SaaS etc.; muitos-para-muitos com CNAE, sem equivalência automática |
| Sujeito afetado | T/H | Int/Cli | contribuinte, substituto, produtor rural, importador; ocorrência geral separada da empresa concreta |
| Evento normativo | T | Int | institui, altera, revoga, prorroga, suspende, regulamenta; deve apontar para alvo quando conhecido |
| Marco temporal/vigência | H | Obj/Int | publicação, eficácia, início/fim e transição são **atributos temporais**, com precisão/incerteza; não tags soltas |
| Local de operação/destino | O/H | Obj/Int/Cli | pode diferir do ente emissor; estabelecimentos reais pertencem ao perfil privado |
| Cadeia/processo de negócio | T | Int/Cli | compras, faturamento, importação, apuração; impacto efetivo depende do processo do cliente |
| Impacto operacional potencial | T | Int/Cli | ação ou processo possivelmente afetado; não afirmar obrigação concreta sem condições da norma e cliente |
| Impacto sistêmico potencial | T | Int/Cli | NF-e, ERP, cadastro fiscal, pricing, SPED; sistema efetivamente usado é dado do cliente |
| Situação normativa/validade | H | Obj/Int | alteração, revogação, suspensão e eficácia não se inferem apenas de data ou título |
| Base legal/relação entre atos | H | Obj/Int | cita, altera, regulamenta, revoga; identidade e direção do vínculo devem ser comprovadas |
| Tributo em fase de transição | H | Int | manter conceitos de tributos coexistentes e períodos de aplicação; sem sobrescrever passado |

**Dimensões a avaliar em TAX-02:** competência tributária, hipótese de incidência, base de cálculo, alíquota, crédito, local de incidência, exceção/condição, prazo de cumprimento, penalidade, procedimento de fiscalização/contencioso e modalidade de estabelecimento. Parte desses itens pode ser propriedade estruturada de uma regra ou evento, em vez de conceito hierárquico; a escolha requer exemplos reais.

## 4. Fontes de referência e limites de autoridade

| Domínio | Referência primária | Uso proposto e limite |
| --- | --- | --- |
| Atividades | [IBGE/CONCLA: CNAE-Subclasses 2.3](https://www.ibge.gov.br/estatisticas/metodos-e-classificacoes/classificacoes-e-listas-estatisticas/9078-classificacao-nacional-de-atividades-economicas.html/) e [tabelas/correspondências](https://cnae.ibge.gov.br/classificacoes/download-concla/8265-download) | referência completa para códigos de atividade; guardar edição e correspondências, sem tratar segmento comercial como CNAE. A CNAE estatística 2.0 e as subclasses 2.3 têm escopos/versões distintos. |
| Mercadorias | [Receita Federal: NCM](https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias/ncm) e [Sistema Classif](https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias/classif) | código de oito dígitos e histórico oficial; não classificar uma mercadoria específica só pela categoria de negócio. |
| Geografia | [IBGE: códigos de municípios](https://www.ibge.gov.br/explica/codigos-dos-municipios.php) e [27 UFs](https://www.ibge.gov.br/geociencias/cartas-e-mapas/mapas-de-referencia/15816-politico.html?lang=pt-BR) | universo de 27 UFs; municípios e nomes podem mudar, exigindo edição e vigência. Código municipal de sete dígitos não deve ser substituído por texto livre. |
| Órgãos | [SIORG](https://www.gov.br/gestao/pt-br/assuntos/gestaoeinovacao/modelos-organizacionais/estruturas-organizacionais/Sistema-informatizado-siorg/sistema-informatizado-siorg/) para o Poder Executivo federal; portais/atos de cada ente para demais órgãos | SIORG não é cadastro nacional completo de órgãos estaduais, municipais, Legislativo ou Judiciário. |
| Espécies/tributos | [Constituição Federal compilada](https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm), [CTN compilado](https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm), [LC 214/2025 compilada](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214compilado.htm) | autoridade jurídica e temporal; catálogo TriBusca expressa conceitos, não substitui análise de incidência/vigência. |
| ISS/serviços | [LC 116/2003 e lista anexa](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm) e legislação municipal competente | lista legal de serviços não é sinônimo de CNAE, NCM, segmento ou cobertura municipal ativa. |
| Documentos fiscais | [Portal NF-e: manuais](https://www.nfe.fazenda.gov.br/portal/listaConteudo.aspx?AspxAutoDetectCookieSupport=1&tipoConteudo=ndIjl+iEFdE%3D) e [notas técnicas](https://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx/listaConteudo.aspx?AspxAutoDetectCookieSupport=1&tipoConteudo=04BIflQt1aY%3D); [Portal NFS-e: documentação técnica](https://www.gov.br/nfse/pt-br/nfs-e-via/documentacao-tecnica/) | modelos, leiautes, eventos e versões oficiais; cada família documental mantém mantenedor e histórico próprios. |
| Escriturações | [SPED: EFD ICMS/IPI](https://www.gov.br/sped/pt-br/assuntos/escrituracoes-digitais/efd-icms-ipi), [Receita: EFD-Contribuições](https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/download/sped/efdc) | obrigações e leiautes, separados de documento fiscal e tributo. |

Toda referência deve ter registro de **mantenedor, URL oficial, edição/data de consulta, identificador do artefato, período de validade, forma de atualização, licença/condição de uso e verificação de integridade quando houver arquivo**. A versão consultada hoje não substitui a versão válida na data da publicação. Se a referência não oferece descarga estável, a taxonomia pode manter apenas a ligação oficial e a correspondência curada; TAX-01 não exige copiar o catálogo.

### Tributos estruturais a contemplar

O inventário de TAX-02 deve partir das competências e espécies da Constituição e das leis aplicáveis, não dos conectores presentes. Incluir, no mínimo, ICMS, ISS, IPI, PIS/Pasep, Cofins, IBS, CBS e Imposto Seletivo; avaliar IR, II, IE, IOF, ITR, IPVA, ITCMD, IPTU, ITBI, CSLL, contribuições previdenciárias, CIDE, taxas, contribuição de melhoria, empréstimos compulsórios e contribuição de iluminação pública, além de espécies ou competências constitucionais ainda não instituídas. **“Previsto”, “instituído”, “em transição”, “vigente” e “aplicável ao caso” não são o mesmo estado.** A Constituição e a LC 214/2025 dão a base para IBS, CBS e IS; datas e hipóteses concretas exigem leitura da legislação vigente no momento da classificação. Esta é uma lista de investigação, não o dicionário aprovado. [Constituição](https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm), [LC 214/2025](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm).

## 5. Identidade, códigos e relações

### Conceito canônico

Cada conceito terá identidade interna imutável e código público estável, ambos independentes do rótulo. Padrão proposto: `dimensao.termo_semantico` em ASCII minúsculo, com pontos para namespace e sublinhado dentro do segmento, por exemplo `tax.icms`, `tax.iss`, `theme.presumed_credit`, `document.nfe`, `sector.meat_processing`. O ponto **não cria hierarquia por si**: `theme.benefit.presumed_credit` só pode ser usado se “crédito presumido é subtipo de benefício” estiver aprovado explicitamente. Proibir reutilizar código descontinuado; renomear rótulo sem trocar identidade; reservar namespace e verificar colisões/ambiguidade antes de publicar. Códigos oficiais ficam em campos de correspondência como `authority + catalog + edition + official_code`, nunca embutidos como identidade canônica. Os códigos acima são exemplos de padrão, não cadastro aprovado.

### Tipos de relação

| Relação | Semântica | Regra |
| --- | --- | --- |
| `narrower_than` / `broader_than` | verdadeiro subtipo conceitual dentro de dimensão compatível | exigir definição de inclusão, impedir ciclos; herança só para propriedade explicitamente declarada |
| `part_of` | componente de processo/documento/estrutura | não tratar como `is_a` |
| `related_to` | associação útil, sem equivalência | não propagar classificação automaticamente |
| `maps_to_official` | relação com código oficial, qualificada por `exact`, `broader`, `narrower` ou `overlap` | exigir edição, vigência, justificativa e revisor; relação muitos-para-muitos |
| `replaced_by` / `supersedes` | continuidade governada entre conceitos ou códigos | preservar histórico; substituição não implica equivalência automática para atos antigos |
| `applies_to` | vínculo de regra com produto, operação, sujeito ou território | registrar condições e evidência; não confundir com pai/filho |

Exemplos a testar: `theme.presumed_credit` pode ser subtipo de `theme.tax_benefit` **somente** se a definição funcional adotada sustentar inclusão em todos os casos; caso contrário, usar relação tipada mais fraca. “Frigorífico” não é filho automático de uma única subclasse CNAE: pode ser segmento associado a diversas atividades de abate, processamento ou armazenagem, com limites definidos na TAX-02. “Abatedouro” pode ser especialização ou termo relacionado e não deve virar alias exato sem análise.

### Aliases

Alias é relação lexical dirigida para um conceito, com idioma, grafia, contexto, jurisdição, intervalo de uso, fonte e decisão. Distinguir `EXACT_LEXICAL`, `ABBREVIATION`, `HISTORICAL_LABEL`, `SEARCH_RELATED` e `AMBIGUOUS`. Somente os três primeiros podem apoiar mapeamento automático, e apenas quando o contexto evita homônimos. Um termo que nomeia parte, categoria mais ampla ou atividade vizinha **não** é sinônimo exato. Revisão testa colisão com conceitos existentes, uso jurídico e exemplos positivos/negativos de normas. Alias rejeitado também fica registrado para impedir reabertura automática da mesma proposta.

## 6. Conceitos não mapeados e ciclo de candidatos

Fluxo: **versão de norma → extração com evidência → busca de conceito/código oficial vigente → classificação confirmada ou sugestão → candidato `UNMAPPED`/ambíguo → agrupamento de ocorrências → revisão → decisão → release da taxonomia → eventual reclassificação versionada**. Nenhuma norma ou IA escreve diretamente no vocabulário canônico.

O candidato registra, conceitualmente: termo original e forma normalizada; idioma; dimensão provável; contexto e trecho mínimo; ID/versão da publicação e origem oficial; data da norma e da extração; pai e conceitos relacionados propostos; frequência por ocorrência e por publicação; primeira/última ocorrência; fontes/jurisdições; confiança **calibrada** e versão do extrator; riscos de homonímia; status; responsável, decisão e justificativa. Evidência privada não sai do escopo autorizado; agregados publicados não revelam tenant, CNPJ ou texto restrito. Não definir tabela nesta fase.

| Estado | Significado | Saída permitida |
| --- | --- | --- |
| `NEW` | candidato recebido, ainda sem triagem | normalização e agrupamento |
| `NEEDS_EVIDENCE` | contexto insuficiente ou fonte/trecho não verificável | solicitar ou acumular evidência; manter `UNMAPPED` |
| `UNDER_REVIEW` | análise humana iniciada | decisão documentada |
| `MAPPED_TO_EXISTING` | conceito canônico já cobre o sentido | ligação ao conceito, sem criar alias automaticamente |
| `APPROVED_ALIAS` | expressão lexical aprovada para conceito existente | nova versão de vocabulário/alias |
| `APPROVED_NEW_CONCEPT` | lacuna semântica comprovada | conceito e relações em release aprovado |
| `REJECTED` | fora do escopo, erro ou equivalência indevida | motivo e evidência retidos |
| `SPLIT_REQUIRED` | ocorrências homônimas exigem mais de um sentido | candidatos separados, sem mapeamento automático |

`MAPPED_TO_EXISTING`, `APPROVED_ALIAS` e `APPROVED_NEW_CONCEPT` são resultados distintos. Estados aprovados só são efetivados após revisão e publicação da versão; candidato pendente nunca aparece como conceito canônico. Agrupar por termo normalizado **e** contexto/dimensão/jurisdição, sem fundir homônimos por frequência. Ocorrências novas reabrem evidência, não alteram sozinhas uma decisão anterior.

## 7. Governança e versionamento

1. **Proposição:** curador registra definição, dimensão, necessidade, exemplos positivos/negativos, fontes oficiais e impacto em classificações existentes.
2. **Revisão funcional:** especialista tributário decide sentido jurídico e distinção de conceitos próximos; curador de dados avalia código, hierarquia, aliases e correspondências oficiais. Mudança de alto risco — tributo, vigência, obrigação, equivalência oficial ou regra de propagação — requer segunda revisão independente.
3. **Aprovação:** responsável designado aprova ou rejeita com justificativa e data. IA auxilia a triagem, sem aprovar, excluir, alterar hierarquia ou substituir fonte oficial.
4. **Release:** publicar manifesto de diferenças, versão da taxonomia, edições oficiais usadas, testes de integridade (códigos únicos, sem ciclos, relações válidas), amostras de regressão e instrução de reclassificação. Não publicar candidato pendente como classificação confirmada.
5. **Correção/retirada:** conservar ID, datas, rótulos e relações anteriores; marcar conceito descontinuado e `replaced_by` quando houver sucessor. Reclassificar histórico em tarefa separada com comparação antes/depois; nunca sobrescrever silenciosamente afirmações antigas.

Esquema de release proposto: `vMAJOR.MINOR.PATCH`. **MAJOR** para alteração incompatível de significado, relação ou regra de inferência; **MINOR** para conceitos/aliases novos compatíveis; **PATCH** para metadados e grafia sem mudança semântica. A versão do **catálogo oficial** é independente da versão da **taxonomia TriBusca**. Cada classificação mantém ambas, além da versão do conteúdo e do método/modelo. Em caso de alteração de código oficial, preservar a correspondência válida no passado e criar a da nova edição; não editar retroativamente o código histórico.

## 8. Cobertura: três métricas independentes

| Cobertura | Pergunta | Medida e limite |
| --- | --- | --- |
| **Estrutural de referência** | Conhecemos o universo oficial da dimensão/edição? | `entradas oficiais indexadas e verificadas / entradas oficiais da edição`. Para UF o universo é 27; 100% é **meta após verificação**, não estado atual afirmado. Para CNAE e NCM, só declarar completo com edição, fonte, contagem e integridade conferidas. Não é necessário exibir cada entrada como tag TriBusca. |
| **Semântica/classificação** | Os conceitos encontrados nas normas podem ser representados corretamente? | Taxa de menções extraídas mapeadas com evidência, e taxa por **conceitos distintos**; reportar `UNMAPPED`, ambíguos, erros e abstenções por dimensão, fonte, período e jurisdição. Denominador “extraído” não prova que o extrator encontrou tudo. |
| **Operacional de fonte** | As publicações relevantes são coletadas no período? | fontes/intervalos previstos × consultados com sucesso, falhas, pendências e integralidade do conteúdo; não herdar percentual do vocabulário. |

Dimensões abertas, como tema, operação e impacto, não têm denominador total conhecido. Exemplo de indicador futuro: “98,7% das **menções extraídas** das publicações amostradas nos últimos 90 dias foram mapeadas; 1,3% estão em candidatos”. Só publicar com população, método, tamanho da amostra, taxa de extração manualmente auditada e intervalo de confiança. Um extrator que omite conceitos difíceis pode produzir 100% de mapeamento e ainda ter baixa cobertura real. Distinguir cobertura de **ocorrências** (termos frequentes), de **tipos** (conceitos distintos) e de **casos críticos** (erros de grande impacto). Não usar métrica agregada para esconder falha em ISS ou em um setor raro.

### Prova de cobertura prevista para TAX-03

Construir um conjunto de casos com normas oficiais reais e exemplos controlados, congelado por versão, incluindo positivos, negativos e ambíguos. Amostrar estratificadamente por esfera, tributo, fonte, período, anexo, setor e frequência; dupla anotação humana com arbitragem nos desacordos. Medir ao menos: capacidade de **representar** cada caso, precisão/recall de extração, precisão por dimensão, abstenção, aliases indevidos, candidatos descobertos, taxa de falsos negativos críticos e estabilidade de replay histórico. Os limiares numéricos e o tamanho mínimo da amostra precisam de aprovação antes da execução, conforme custo do erro; TAX-01 não inventa percentuais de aceite.

| Grupo de cenários obrigatório | Demonstração exigida no teste |
| --- | --- |
| Agronegócio, produtor rural, frigorífico, indústria alimentícia | CNAE quando explícito, segmento TriBusca e papel do sujeito separados; NCM apenas com prova adequada |
| Indústria, varejo, atacado, transportadora, combustíveis, energia | atividades/segmentos distintos, operações e documentos fiscais aplicáveis sem equivalências automáticas |
| Telecomunicações, construção civil, software/SaaS, serviços | tratar serviço, produto digital, atividade e eventual ISS/ICMS/IBS segundo norma e período, com abstenção onde necessário |
| Bancos, importadores, exportadores, e-commerce | operações, tributos, sujeitos, origem/destino e regimes sem virar uma única tag |
| Saúde e educação | segmentos, atividades, sujeitos e tratamentos específicos separados; não inferir benefício a partir do setor |
| Norma municipal de ISS sem conector ativo | conceito e exemplo representáveis; cobertura operacional continua “planejada” |
| Texto com “frigorífico” ambíguo ou “soja” genérica | candidato ou classificação ampla; não inventar CNAE/NCM exato |
| Ato alterador, revogador ou de vigência futura | evento, alvo e datas distintos; preservar interpretação sob versões antigas |

Passagem de um cenário exige **definições e relações corretas, evidência rastreável, decisão de abstenção quando cabível e ausência de inferência tenant no catálogo global**. Uma lista manual de setores não satisfaz o teste: o caso deve ser construído a partir de CNAE, correspondências justificadas e normas. A TAX-03 deve testar catálogos oficiais completos nas edições escolhidas e revisar também setores ausentes da lista acima.

## 9. Riscos e limites conhecidos

- **Mudança de catálogo e de lei:** CNAE, NCM, órgãos, modelos fiscais e vigências mudam; usar edição e data, nunca o valor “atual” para reescrever o passado.
- **Equivalência indevida:** segmento ≠ CNAE, produto ≠ NCM, lista ISS ≠ CNAE, documento ≠ obrigação. Relação ampla/estreita/overlap não autoriza inferência exata.
- **Falsa completude:** importação integral de um catálogo finito não cobre temas abertos nem prova recall da IA ou das fontes.
- **Ambiguidade lexical:** abreviações e nomes comerciais variam por contexto; alias automático pode elevar falso positivo jurídico.
- **Privacidade:** afinidade, CNPJ e características da empresa não pertencem à classificação global; respeitar a dependência D-057 antes de publicar qualquer item retido só por CNPJ.
- **Mudança temporal:** ato pode vigorar parcialmente, ter exceções ou depender de outro ato; uma tag “vigente” sem intervalo e fundamento é enganosa.
- **Dependência operacional:** a taxonomia preparada pode representar ISS e municípios sem que a coleta municipal, o matching ou a interface estejam prontos. Esses estados devem aparecer separadamente.
- **IA:** confiança não calibrada e respostas sem evidência podem parecer certas; manter abstenção e revisão humana, sobretudo para tributo, vigência e obrigação.

## 10. Perguntas abertas para aprovação antes de TAX-02/TAX-04

1. Quem são os aprovadores nomeados e quem arbitra desacordo jurídico entre especialista e curador? Quais decisões exigem segunda revisão?
2. Qual edição oficial será a linha de base de CNAE, NCM, IBGE e documentos fiscais, e qual periodicidade de atualização/crosswalk?
3. Quais relações podem propagar classificação automaticamente? A proposta inicial é **nenhuma** sem regra validada por dimensão.
4. Quais conceitos serão públicos no Acervo e quais permanecem internos, dado o gate de privacidade da D-057?
5. Como representar categorias de serviço municipal e órgãos sem catálogo nacional único, mantendo fonte por jurisdição?
6. Qual recorte temporal define o primeiro conjunto de normas de treinamento/prova e quais limiares de erro crítico serão aprovados para TAX-03?
7. Como registrar uma norma com múltiplos sentidos, partes eficazes em datas diferentes ou anexos não extraíveis sem afirmar integralidade indevida?
8. Qual procedimento de reclassificação histórica e comunicação ao cliente é exigido quando conceito/alias ou catálogo oficial muda?
9. Quais propriedades de regra tributária merecem dimensão taxonômica e quais devem ser modeladas como fatos condicionais em fase posterior?
10. Como a futura interface mostrará “conceito conhecido, fonte ainda não monitorada” e “monitorado, mas classificação incerta” sem confundi-los?

## 11. Entregas seguintes e critério desta proposta

- **TAX-02 — dicionário funcional:** definições, exemplos positivos/negativos, fontes e relações dos primeiros conceitos; escolher edições oficiais e mapear CNAE/NCM sem cópia cega; registrar candidatos iniciais.
- **TAX-03 — auditoria independente:** prova de cobertura com casos reais e amostra humana; identificar lacunas, falsos positivos e dimensões mal definidas.
- **TAX-04 — PostgreSQL:** modelar apenas após a semântica e as regras de histórico serem aprovadas; validar isolamento tenant, integridade temporal, versionamento e migração. Classificação automática, integração com coleta, matching e IA vêm depois dos gates respectivos.

**Aceite da TAX-01:** aprovação desta arquitetura conceitual, das dimensões e do método de medição, com decisões explícitas sobre perguntas abertas que bloqueiem a TAX-02. Este documento não afirma que o dicionário, os catálogos, a classificação, o monitoramento ou a cobertura já foram implementados.
