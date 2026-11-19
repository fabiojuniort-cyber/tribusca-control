# F2 — Lote único de planejamento e execução futura | F2-T01, F2-T02 e F2-T03

**Data:** 12/10/2026 (BRT) · **Fonte funcional:** [DEF-01 substituta aprovada](DEF-01-TAXONOMIA-CADASTRO-SUBSTITUTA.md) · **Classe desta atividade:** R0 documental, sem código, migrations, carga ou produção.  
**Escopo do lote:** T01 e T02 podem especificar contratos em paralelo; T03 prepara/valida dados antes da futura carga; integrar num só par coordenado de PRs backend/frontend, sob gates de risco R2 (ou R3 para publicações/classificação/carga produtiva). Não criar nova dimensão em T01; não alterar a consulta por CNPJ.

## F2-T01 — Alinhamento de Segmento/Subsegmento existentes

**O que muda:** ajuste da apresentação e edição da **tabela existente Segmento (`sector`)**. Fazer **Subsegmento** ter ergonomia e ordenação como o campo **Grupo** de Produtos e exibir `Segmento – Subsegmento` nas vistas apropriadas, sem gravar texto concatenado como identidade do subsegmento. Preservar CNAE, vínculo pai/filho, rascunhos, versões publicadas, códigos, grupos de Produtos e sinônimos removidos da dimensão Segmento.

**Arquivos/tabelas de provável intervenção:**
- `radar-fiscal-web/src/taxonomy-grid.tsx` (grade, coluna Grupo/Subsegmento, seleção e exibição), `src/taxonomy-admin.tsx` e `src/taxonomy-admin.css` (apresentação e operação de curadoria); `src/segment-grid.test.tsx`, `e2e/segmentos-cnae.spec.ts`.
- Estrutura já disponível no backend, **sem tabela física nova**: `taxonomy_release_groups` e `taxonomy_release_group_segments` (migration histórica 031), `taxonomy_release_concepts`, `taxonomy_dimensions.code='sector'`; contrato em `src/modules/taxonomy/curation/curation.read.ts`. `src/segment-import.ts` se houver necessidade comprovada de ajustar importação idempotente.

**Risco:** **R1 se exclusivamente UI**; elevar a **R2** se mudar contratos, vínculos ou persistência. Regredir grupo de Produtos, subsegmentos/CNAE já importados, releases históricas e nomes de exibição. **Aceite:** mesma identidade canônica antes/depois; T01 não gera conceitos/dimensões duplicados nem ativa classificação.

## F2-T02 — Tabela independente de Atuação

**O que muda:** expor uma **dimensão lógica/tabela de curadoria Atuação própria** (distinta da dimensão `sector` e de seu campo `Subsegmento`), com conceitos, sinônimos editáveis pelo Fábio, toggles de classificação, auditoria, versões de rascunho/publicação e evidência na norma. **Não reintroduzir aliases removidos na tabela Segmento.**

**Carga inicial proposta — coluna `Atuação` da aba `Segmento` da planilha v1.7.3:** **1.332** linhas preenchidas / **7** valores distintos, preservando o texto original da planilha: `Serviço` (583), `Indústria` (380), `Comércio atacadista` (116), `Produção agropecuária` (108), `Comércio varejista` (89), `Extração mineral` (41), `Representação comercial` (15). Planejar **7 conceitos canônicos iniciais**, mais relações desses conceitos com as atividades CNAE de origem (códigos de 7 dígitos normalizados). **Não interpretar os 1.332 registros como 1.332 conceitos de Atuação.** Na ausência de coluna dedicada de sinônimos de Atuação, **sinônimos começam vazios** para curadoria manual; não reaproveitar automaticamente os sinônimos de Segmento/CNAE/Produto.

**Arquivos/tabelas de provável intervenção:**
- Catálogo de dimensões existente: `taxonomy_dimensions`, `taxonomy_dimension_revisions`, `taxonomy_release_dimensions`, `taxonomy_concepts`, `taxonomy_release_concepts` (`migrations/015_taxonomy_core.sql`); `taxonomy_aliases` e `taxonomy_release_alias_bindings` (`migrations/016_taxonomy_aliases_relations.sql`), preservando contratos de curadoria e histórico. Criar nova migration **somente se R2 e necessário**; **nunca alterar migrations antigas**.
- Backend: `src/modules/taxonomy/curation/curation.constants.ts`, `curation.read.ts`, `curation.draft.ts`, `src/api/routes/taxonomy-admin.route.ts`, `src/modules/taxonomy/classification/classification.curated.ts` e pipeline de evidências, protegidos pelo estado de classificação OFF e gates TAX13.
- Frontend: `radar-fiscal-web/src/taxonomy-admin.tsx`, `src/taxonomy-grid.tsx`, `src/taxonomy-api.ts`, `src/publication-taxonomy.tsx` e testes.

**Risco:** **R2 material** (nova dimensão, importação, auditoria, API e classificação); **R3 se publicação/reclassificação/carga produtiva**. Guardas: somente PO/curador autorizado; isolamento de tenant/perfil; idempotência; proveniência por linha, revisão e associação ao CNAE; sinônimos amplos de Atuação podem produzir falsos positivos em normas, portanto publicar/classificar só após aprovação e revisão independente. Não tratar toda ocorrência comum de “serviço” ou “indústria” como evidência suficiente para um efeito jurídico.

**Aceite:** sete conceitos no rascunho (quando executado), 1.332 vínculos de origem válidos (não necessariamente únicos), zero sinônimos gerados por inferência, nenhum alias em `sector` reintroduzido e nenhuma marcação sem evidência/teste.

## F2-T03 — Consolidação e carga governada das duas planilhas

**O que muda:** estabelecer as planilhas como **fonte de referência funcional vigente para novas cargas da F2**:
1. `docs/reference-data/f2/taxonomia-v1_7_3-segmento.xlsx` — aba Segmento, **1.332 registros**, CNAE, Segmento, Sub Segmento, Atuação, sugestões de Produto e NCM.
2. `docs/reference-data/f2/taxonomia-v1_7_0-produto.xlsx` — aba Produto, **3.793 registros**, Segmento, Grupo, Item, NCM, Sinônimos, definição e regras de perfil.

**Arquivo anterior substituído funcionalmente, mas não apagado:** `radar-fiscal-backend/ops/taxonomy/loads/classificacao-produtos-agro.csv` (colunas `Segmento;Grupo;Item`). Esse CSV permanece como **legado/histórico** e seu importador ativo atual **não passa a ler XLSX automaticamente**; nenhuma remoção/reprocessamento/hot swap nesta documentação.

**Arquivos/tabelas de provável intervenção futura:**
- Manifesto de entrada e hashes: `docs/reference-data/f2/README.md` (governança).
- Backend `src/modules/taxonomy/curation/curation.product-load.ts`, `src/infrastructure/database/taxonomy-load-products.ts`: importador hoje restrito ao CSV com colunas `Segmento;Grupo;Item`; requer planejamento explícito para os novos campos XLSX (NCM/prefixos, sinônimos, códigos, definição) sem truncar nem sobrescrever semântica inadvertidamente.
- Frontend `src/segment-import.ts` (atual pacote JSON Segmento ↔ Subsegmento ↔ CNAE), `src/taxonomy-admin.tsx`, `src/taxonomy-api.ts` se a ingestão for feita pela curadoria.
- Metamodelo existente `taxonomy_release_concepts`, `taxonomy_release_groups`, `taxonomy_release_group_segments`, `taxonomy_release_alias_bindings`, associações CNAE/NCM/Produto e catálogos oficiais já existentes; manter snapshots da release publicada.

**Plano de validação pré-carga:** SHA-256 original × blob no GitHub, cabeçalhos/abas/1.332+3.793 linhas, presença de códigos, CNAE com zeros à esquerda e formatos `0111-3/01` → 7 dígitos, NCM com pontos e vários códigos em célula, prefixos NCM versus NCM completo, separadores `;` de produtos/NCM, duplicidades, códigos TriFaros, correspondências sem relação presumida de 1:1, listas de inconsistências, dry-run sem escrita, idempotência, rollback e isolamento do rascunho. A planilha não substitui fonte oficial IBGE/NCM/legislação nem atesta incidência tributária por mera sugestão.

**Risco:** **R2** para importador/contratos e mudança governada de dados do rascunho, potencial **R3** para volume, publicação e reclassificação produtiva. **Aceite:** dry-run auditável e contagens conciliadas antes de qualquer escrita; publicações/classificações intactas até gate e autorização.

## Sequência do lote e gates

1. **Pré-gate documental T00:** os binários .xlsx precisam realmente constar no PR e bater com os hashes do [índice](../reference-data/f2/README.md); isto não foi comprovado em 12/10/2026.
2. T01 UX + compatibilidade de grupo existente; T02 modelo Atuação/rastreabilidade e fonte inicial; T03 estratégia de importação e validação.
3. Antes de qualquer PR de implementação: Issue(s) executáveis por escopo e risco, contrato de dados, decisão sobre tabela lógica versus mudança física quando necessário, testes PG18, regressões curadoria/segmento/taxonomia e CI.
4. **Classificação OFF**, revisão independente para mudanças materiais e publicação do rascunho somente sob autorização/gates. Riscos TAX13 de proveniência legal e vigência **não devem ser contornados**.
5. **Nada de busca por CNPJ, WhatsApp, Assistente, estrutura de texto jurídico ou conflitos de tipo** — fora deste lote/F2.

**Plano pronto para coordenação; nenhuma implementação iniciada.**