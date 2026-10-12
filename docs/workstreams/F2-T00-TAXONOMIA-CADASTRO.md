# F2 — Taxonomia + Cadastro | F2-T00 — Lista consolidada e reconciliação documental

**Data do registro:** 12/10/2026 (BRT)  
**Origem da lista:** complemento recebido do Product Owner, encaminhado por CLAUDE-COORD, nesta tarefa F2-T00.  
**Classificação:** R0 documental; nenhum código, migration, carga, merge ou deploy.  
**Estado:** **LISTA RECEBIDA E REGISTRADA — RECONCILIAÇÃO COM DEF-01 PENDENTE**. Este documento **não** declara validação contra DEF-01 nem autoriza alterações produtivas.

## 1. Busca pela DEF-01 e inventário

Consulta em 12/10/2026 aos caminhos da branch `main` de:
- `fabiojuniort-cyber/tribusca-control` (árvore commit `d6d37a8d23078328b1a3a017e503b99a5c514abd`);
- `fabiojuniort-cyber/radar-fiscal-backend` (árvore commit `d9618aebec32326de90478ea7a20face02ce1920`);
- `fabiojuniort-cyber/radar-fiscal-web` (árvore commit `053a7b73a038d570a4aa8c4c7cead12edb4a1cf4`).

Não foi localizado arquivo nomeado `DEF-01` nessas árvores; busca de código e Issues pelas expressões `DEF-01` e `F2-T00` também não retornou fonte identificável desses repositórios. Pode existir em branch, anexo ou referência não indexada; **não é possível comparar item a item com uma DEF-01 ainda não acessível**.

**T03 — localização de arquivos verificáveis:**
- `radar-fiscal-web/ops/segments/trifaros-cnae-2.3.json`, derivado de `TriFaros_Segmentos_CNAE_Empresas_Brasil.xlsx` segundo `radar-fiscal-web/docs/SEGMENTOS_CNAE.md`: mapeamento **Segmento ↔ Subsegmento ↔ CNAE**, não demonstrado como **CNAE × NCM × Produto**.
- `radar-fiscal-backend/ops/taxonomy/loads/classificacao-produtos-agro.csv`: colunas **Segmento;Grupo;Item**, sem CNAE ou NCM, portanto **não equivale** à planilha solicitada.
- Nenhum `.xls`, `.xlsx` ou `.ods` consta nas três árvores `main` consultadas. **Caminho da planilha CNAE × NCM × produtos permanece NÃO LOCALIZADO**; não declarar que inexiste fora das árvores examinadas.

## 2. Lista F2 consolidada por ID (fiel ao complemento do PO)

| ID | Tarefa / critério de escopo | Ordem e dependência | Estado deste registro |
| --- | --- | --- | --- |
| **F2-T00** | Comparar DEF-01 × lista F2, registrar lacunas, sobras/divergências e lista de IDs; sem código. | Precede as demais. | Registro realizado; cotejo DEF-01 pendente. |
| **F2-T01** | Subsegmento no estilo **Grupo de produtos**; exibição textual **“segmento – subsegmento”**. | Primeira leva T01–T03. | Definição recebida; distinguir da curadoria `sector` já existente. |
| **F2-T02** | Tabela própria de **Atuação**, com sinônimos configuráveis pelo Product Owner Fábio, apta a marcar norma legal com evidência. | Primeira leva T01–T03. | Definição recebida; limites/evidência/curadoria a detalhar. |
| **F2-T03** | Localizar e carregar a planilha **CNAE × NCM × produtos** já existente no repositório; informar caminho exato e conferir conteúdo/qualidade antes de qualquer carga. | Primeira leva T01–T03; insumo para T08. | **BLOQUEIO PARCIAL**: arquivo exato não encontrado na `main`; nenhuma carga realizada. |
| **F2-T04** | Relevância **por estabelecimento**; “alta relevância” calculada por taxonomia, a partir do vínculo entre marcadores/evidência e perfil, com critérios explicáveis. | Após T07 e T08. | Definição recebida; pesos/limiares e casos insuficientes não presumidos. |
| **F2-T05** | **SEM DEFINIÇÃO RECEBIDA**. Número deliberadamente reservado; não criar conteúdo por suposição. | Sem posição de execução. | **DECISÃO PENDENTE:** existe tarefa T05 omitida ou o ID ficará reservado? |
| **F2-T06** | IE por API gratuita **específica de UF**, iniciar por GO (informado como existente), com preenchimento manual se falha/indisponibilidade. | Após T01–T03, antes de T07/T08. | Definição recebida; existência, licenças e cobertura da integração GO devem ser verificadas na execução. |
| **F2-T07** | Página unificada com **empresa, estabelecimentos e Perfil Tributário**. | Após T06; paralela a T08. | Definição recebida; preservar fluxo ONB-01 já entregue. |
| **F2-T08** | Janela **CNAE por CNAE** com NCMs/produtos sugeridos; Perfil Tributário **persistido por estabelecimento** (com escopo de tenant). | Após T06; paralela a T07; depende de T03 para sugestão confiável. | Definição recebida; sugestões não são confirmação automática nem fato jurídico. |
| **F2-T09** | Testes e validação com **uma empresa real**; definir aceite e tratamento seguro de dados. | Última, após T04. | Definição recebida; sem teste real realizado nesta T00. |

**Sequência solicitada:** `T00 → (T01, T02, T03) → T06 → (T07, T08) → T04 → T09`. T05 ausente da sequência.

## 3. Limites expressos — fora da F2

- **Busca por CNPJ:** já existe; **não alterar**.
- **WhatsApp** e **Assistente Tributário:** fora da F2.
- **Estrutura do texto legal** e **conflitos de tipo:** remeter à **F3**, sem absorver implementação na F2.
- **Não antecipar merge, deploy, SQL/migrations ou operação produtiva nesta F2-T00.**

## 4. Lacunas, potenciais duplicidades e divergências de documentação existente

1. **DEF-01 inacessível:** faltantes/sobras/divergências **em relação à DEF-01** permanecem **NÃO VERIFICÁVEIS**; não inventar cotejo.
2. **ID F2-T05 não fornecido:** há 8 tarefas de execução nominalmente descritas (T01–T04 e T06–T09), além de T00; não completar artificialmente a numeração.
3. **T01 versus curadoria existente:** `tribusca-control#70` e `radar-fiscal-web/docs/SEGMENTOS_CNAE.md` já usam **Segmento, Subsegmento, CNAE** na dimensão `sector`; confirmar se T01 fala da **taxonomia de produtos** em vez de refazer o `sector`. Na TAX-11 a estrutura de produtos é “Segmento → Grupo → Produto”.
4. **T02 versus remoção de aliases:** `tribusca-control#71` ordenou retirar sinônimos da **tabela Segmento** (rascunho). T02 pede sinônimos em **tabela distinta Atuação**. Aparentemente compatíveis se não reintroduzir sinônimos em `sector` por efeito colateral.
5. **T03 versus artefatos conhecidos:** planilha CNAE × NCM × produtos **não localizada**; o JSON de CNAEs/setores e o CSV de produtos não suprem a relação tripla. Localizar fonte correta e comprovar proveniência antes da carga.
6. **T04 versus Sonar já aprovado:** D-024–D-026, D-059 e `docs/product-tools/SONAR.md` preveem afinidade por estabelecimento, motivos e **Alta/Média/Baixa** com **Dados insuficientes** separado. A F2 não pode redefinir uma “Alta relevância” como sentença jurídica nem criar porcentagens/pesos sem decisão.
7. **T06 versus ONB-01:** `tribusca-control#96` e `radar-fiscal-backend/docs/onboarding-bloco1.md` já estabelecem fluxo automático CNPJ e fallback manual. A tarefa IE deve ser **aditiva**, não reimplementar CNPJ/empresa, e verificar a premissa “GO já existe” antes de integrar outras UFs.
8. **T07/T08 versus ONB-01 e TAX-11:** manter cadastro sem CNPJ no signup, fallback de empresa/CNAE e curadoria de perfil. A persistência por estabelecimento deve respeitar tenant/RLS e não apagar vínculo legado com empresa.
9. **T09 e dados reais:** obter cenário autorizado, ambiente e critério de aceite; não executar escrita em produção na etapa de planejamento.

**Não caracterizados como “sobras da DEF-01”**: nenhum item pode ser considerado excedente sem leitura da fonte canônica. A exclusão explícita de CNPJ/WhatsApp/Assistente/estrutura do texto/conflitos de tipo é um limite do complemento, não prova de divergência com DEF-01.

## 5. Decisões pendentes para CLAUDE-COORD (fechamento)

1. **DEF-01:** informar repositório + caminho + branch/SHA ou Issue/PR exato, para concluir cotejo e homologar esta lista.
2. **F2-T05:** confirmar reserva intencional ou descrever a tarefa omitida.
3. **F2-T03:** apontar branch/anexo e caminho da planilha **CNAE × NCM × produtos** que permita validar e planejar carga.
4. **F2-T01:** confirmar que a alteração se refere ao **Grupo de produtos**, sem duplicar/renomear inadvertidamente o `Subsegmento` de CNAEs já existente.
5. **F2-T04/T06:** confirmar semântica de “Alta relevância” alinhada ao Sonar e fonte/cobertura de IE por UF; fórmula, limiares e fallback permanecem para desenho técnico.

**Gate de encerramento de F2-T00:** atualizar a matriz com a DEF-01, obter decisão sobre T05 e comprovar o arquivo de T03; somente então carimbar “LISTA FINAL VALIDADA”. Sem aprovação implícita para próximas frentes.
