# F2-T00 — Reconciliação de Taxonomia + Cadastro

**Status:** 12/10/2026 — reconciliação documental executada; **DEF-01 substituta criada, pendente de OK expresso do Fábio**.  
**Classificação:** R0 documental. **Sem código, migration, carga, merge ou deploy.**

## Resultado da busca DEF-01 anterior

Busca por arquivo/nome/texto `DEF-01` em `tribusca-control` (`main`, Issues e PRs), bem como `main` de `radar-fiscal-backend` e `radar-fiscal-web`: **DEF-01 anterior não localizada**. O PR de reconciliação #105 é o único PR do controle retornado pela busca `DEF-01`. Assim, não é possível afirmar lacunas/sobras/divergências contra um texto original não localizado.

**Substituta proposta:** [DEF-01 — F2 Taxonomia + Cadastro](DEF-01-TAXONOMIA-CADASTRO-SUBSTITUTA.md). Essa é a lista consolidada oficial **proposta**, **não homologada** enquanto faltar OK do Product Owner.

## IDs e reconciliação com o complemento CLAUDE-COORD

| ID | Disposição consolidada |
| --- | --- |
| **F2-T00** | Conciliação documental e fonte DEF-01 substituta; execução atual. |
| **F2-T01** | Ajustar **Segmento/Subsegmento existentes**, com subsegmento no estilo “Grupo” de produtos e exibição “segmento – subsegmento”. **Não criar estrutura nova.** |
| **F2-T02** | **Tabela independente de Atuação**, sinônimos editáveis pelo Fábio, marcação da norma com evidência. **Sem reintroduzir sinônimos removidos do Segmento**. |
| **F2-T03** | Duas planilhas anexadas indicadas como fonte de referência interna; versionamento de seus binários pendente; ver [índice/hashes](../reference-data/f2/README.md). |
| **F2-T04** | Aplicar **regras do Sonar já aprovadas**, por estabelecimento; **não inventar pesos/limiares ou novo critério**. |
| **F2-T05** | **RESERVADA** — busca por CNPJ já existe e não pode ser alterada. |
| **F2-T06** | IE por API gratuita/UF, começando por GO, com fallback manual; não refazer busca por CNPJ. |
| **F2-T07** | Página única empresa + estabelecimentos + perfil, preservando ONB-01. |
| **F2-T08** | Janela CNAE a CNAE com NCM/produtos sugeridos, persistência do perfil por estabelecimento. |
| **F2-T09** | Testes e validação com 1 empresa real autorizada e gates aplicáveis. |

**Ordem:** T00 → (T01, T02, T03) → T06 → (T07, T08) → T04 → T09. **T05 reservada**.

## T03 — candidatos prévios encontrados no GitHub

| Local | Artefato | Colunas/conteúdo | É o anexo fornecido? |
| --- | --- | --- | --- |
| `radar-fiscal-web/ops/segments/` | `trifaros-cnae-2.3.json` | Segmento, Subsegmento, CNAE e descrição; derivado de `TriFaros_Segmentos_CNAE_Empresas_Brasil.xlsx` | **Não** — sem relação completa de produto/NCM |
| `radar-fiscal-web/docs/` | `SEGMENTOS_CNAE.md` | Documentação do mapeamento Segmento/CNAE e colunas da curadoria | **Não** — é documentação |
| `radar-fiscal-backend/ops/taxonomy/loads/` | `classificacao-produtos-agro.csv` | `Segmento;Grupo;Item` | **Não** — não relaciona CNAE/NCM |

**Anexos T03 fornecidos pelo PO (novos nas árvores `main` pesquisadas):**
- `taxonomia-v1_7_3-segmento(1).xlsx`: aba **Segmento**, A1:L1333 (1.332 registros). CNAE, atuação, produtos e NCMs sugeridos, entre outras colunas.
- `taxonomia-v1_7_0-produto(1).xlsx`: aba **Produto**, A1:J3794 (3.793 registros). Segmento, Grupo, Item, NCM, Sinônimos, Definição etc.

Os arquivos originais ainda **não foram commitados como .xlsx**. Seus SHA-256, tamanhos e caminhos-alvo estão registrados em [`docs/reference-data/f2/README.md`](../reference-data/f2/README.md). **O manifesto não substitui as planilhas**.

## Fora da F2

Busca por CNPJ (já existente), WhatsApp, Assistente Tributário, estrutura de texto legal e conflitos de tipo (os dois últimos são da F3).

## Decisões finais pendentes

1. **OK do Fábio** para aprovação da DEF-01 substituta.
2. **Commit efetivo dos dois XLSX** na pasta de referência e verificação de SHA. A escrita binária dos anexos ainda não foi possível por este conector; a pasta contém somente o índice de referência.
3. Para T09, empresa real/ambiente de validação e aceite específicos — sem exigir essa seleção para concluir a reconciliação documental.

**Gate:** manter PR #105 **DRAFT**; não tratar T00 como autorização da implementação subsequente.
