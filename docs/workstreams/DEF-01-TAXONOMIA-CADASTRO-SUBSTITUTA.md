# DEF-01 — F2 Taxonomia + Cadastro (DEFINIÇÃO SUBSTITUTA)

**Situação:** **DEF-01 SUBSTITUTA APROVADA PELO FÁBIO em 12/10/2026, aprovação transmitida pelo CLAUDE-COORD**  
**Origem:** CLAUDE-COORD → GPT-EXEC-3, F2-T00, complemento de 12/10/2026.  
**Governança:** documentação R0; definição funcional aprovada **somente como escopo da F2**, sem autorização implícita para desenvolvimento, carga, migrations, merge ou produção.

## Motivo da substituição

A referência anterior `DEF-01` não foi encontrada em `tribusca-control/main` (árvore de arquivos, Issues, PRs e busca por nome/texto; a própria PR #105 é o único PR correspondente a DEF-01) nem nas árvores `main` de backend e frontend. Portanto, esta é a **DEF-01 substituta homologada pelo Product Owner (aprovação informada via CLAUDE-COORD em 12/10/2026)**. Se a DEF-01 original surgir, fazer cotejo de divergências sem sobrescrever decisões silenciosamente.

## Escopo de execução por ID

| ID | Entrega | Critério de aceite e limite |
| --- | --- | --- |
| **F2-T00** | Reconciliação de definição | Consolidar IDs/ordem, decisões e fontes de referência; aprovação da definição recebida em 12/10/2026. Sem código. |
| **F2-T01** | Ajustar **Segmento / Subsegmento existente** | Subsegmento com UX/estilo de “Grupo” da tabela Produtos; apresentar **“segmento – subsegmento”**. **Não criar dimensão ou estrutura nova**, nem confundir com Grupo do produto. |
| **F2-T02** | Tabela própria de **Atuação** | Dimensão/tabela distinta, com sinônimos parametrizados pelo Fábio; pode marcar publicação legal mediante evidência. **Não restaurar os sinônimos removidos da dimensão Segmento**; respeitar curadoria/publicação/auditoria TAX-11. |
| **F2-T03** | Fontes de referência **CNAE × NCM × produto** | Usar os **dois anexos aprovados pelo Product Owner**: `taxonomia-v1_7_3-segmento(1).xlsx` (Segmento, Sub Segmento, Atuação, CNAE, Descrição CNAE, Produtos e NCMs sugeridos), `taxonomia-v1_7_0-produto(1).xlsx` (Segmento, Grupo, Item, NCM, Sinônimos, Definição). Localizar/versionar arquivos de referência; depois especificar importação e validações sem pressupor que sugestões são fatos jurídicos. |
| **F2-T04** | Afinidade/relevância **por estabelecimento** | **Aplicar exclusivamente as regras já aprovadas do Sonar** (D-024–D-026 e D-059): Alta/Média/Baixa, Dados insuficientes distinto, sinais/motivos e versão. **Não criar limiares, pesos ou novo critério de “Alta”.** |
| **F2-T05** | **RESERVADA** | A busca por CNPJ já existe e **não deve ser alterada** nesta F2. Não alocar tarefa nova para este ID. |
| **F2-T06** | Inscrição Estadual (IE) por UF | Consultar API gratuita disponível para cada UF, começar por GO (integração indicada como já existente; conferir na implementação), e oferecer formulário manual quando consulta falhar. **Preservar busca e cadastro por CNPJ existentes**. |
| **F2-T07** | Página única | Reunir empresa, estabelecimentos e Perfil Tributário; preservar fluxo já implementado em ONB-01, autenticação e isolamento tenant. |
| **F2-T08** | Janela CNAE a CNAE | Exibir sugestões de NCM e produtos para cada CNAE; perfil efetivamente persistido **por estabelecimento**. Sugestões editáveis e identificáveis como sugestões, sem afirmação automática de enquadramento fiscal; exigir proteção multi-tenant. |
| **F2-T09** | Testes/validação | Executar testes automatizados e validação com **1 empresa real** escolhida/autorizada, segundo gates de privacidade, consentimento, RLS, aceite e risco; não realizar a validação produtiva em T00. |

## Ordem de dependências

`F2-T00 → (F2-T01, F2-T02, F2-T03) → F2-T06 → (F2-T07, F2-T08) → F2-T04 → F2-T09`.

**F2-T05** permanece reservada e fora da execução.

## Explicitamente fora da F2

- **Busca por CNPJ existente**: não mexer (incluindo não reimplementar consulta na T06).
- **WhatsApp** e **Assistente Tributário**.
- **Estrutura do texto legal** e **conflitos de tipo**: escopo da **F3**.
- Não reabrir remediações TAX13 / validade legal nem modificar classificação de normas fora das regras já aprovadas.

## Fonte interna oficial de T03 (aprovada pelo PO para referência)

| Arquivo anexo | Aba / dados | Linhas de dados | SHA-256 do anexo |
| --- | --- | ---: | --- |
| `taxonomia-v1_7_3-segmento(1).xlsx` | Aba **Segmento**, 12 colunas: segmento, subsegmento, atuação, CNAE, descrição, sinônimos, produtos e NCMs sugeridos, perfil, marcação, ordem, código | 1.332 | `588a89871044a1ca67036fb5c17cdba3ba70f447bd1412fc476f14bb1d6440cd` |
| `taxonomia-v1_7_0-produto(1).xlsx` | Aba **Produto**, 10 colunas: segmento, grupo, item, NCM, sinônimos, perfil, marcação, ordem, código, definição | 3.793 | `35e886e711f0c1c793daaa6a5e61c5500f3ab235913b9bc8e026ea8d8fc0db49` |

As planilhas são a **referência funcional interna autorizada pelo PO** para F2-T03, não substituem catálogos/atos legais oficiais. Não inferir carga operacional já feita. A versão binária integral dos anexos **ainda requer commit** na pasta proposta `docs/reference-data/f2/`; registrar no manifesto o estado efetivo, sem alegar upload ocorrido.

### Arquivos relacionados anteriormente existentes (não equivalentes a esses XLSX)

- `radar-fiscal-web/ops/segments/trifaros-cnae-2.3.json` — dimensões Segmento/Subsegmento/CNAE e descrição; derivado de `TriFaros_Segmentos_CNAE_Empresas_Brasil.xlsx`.
- `radar-fiscal-web/docs/SEGMENTOS_CNAE.md` — contrato descritivo do mapeamento e cabeçalhos.
- `radar-fiscal-backend/ops/taxonomy/loads/classificacao-produtos-agro.csv` — colunas `Segmento;Grupo;Item`, não contém vínculos CNAE ↔ NCM.
- Nenhum arquivo `.xlsx` dos anexos identificado na `main` dos três repositórios, nem seus nomes exatos em buscas de código.

## Dependências técnicas já estabelecidas

- `tribusca-control#61` / TAX-11: curadoria publicada/versionada, evidência e auditoria.
- `tribusca-control#70` e `#71`: Segmento/Subsegmento atual e remoção de aliases em Segmento.
- `tribusca-control#96` / ONB-01: cadastro assistido de empresa/filial e fallback existentes.
- `DECISIONS.md` D-024–D-026, D-059 e `docs/product-tools/SONAR.md`: semântica do Sonar.

## Decisões tomadas e gates de conclusão

1. **APROVADA:** DEF-01 substituta, aprovação do Fábio transmitida pelo CLAUDE-COORD em 12/10/2026. Fonte anterior não localizada; substituição documentada.
2. **AINDA NÃO COMPROVADO:** inclusão dos 2 XLSX no repositório. Os SHA-256 calculados sobre os anexos **locais** coincidem com o manifesto; na revisão do PR #105 em 12/10/2026, a pasta remota continha somente README.md. **Sem hashes dos blobs remotos, não fechar o gate de integridade.**
3. **T09 (futura):** selecionar/autorizar a empresa real e ambiente/cenários de aceite quando essa tarefa iniciar.

**Estado F2-T00:** definição funcional aprovada, checklist documental atualizado e lote T01–T03 planejado; **fechamento técnico da T00 e PR ready/merge aguardam binários remotos e SHA-256 confirmados**. Ver [plano do lote](F2-T01-T03-PLANO-LOTE.md).