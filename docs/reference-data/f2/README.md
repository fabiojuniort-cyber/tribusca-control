# F2-T03 — Fontes de dados de referência

**Registro:** 12/10/2026 · **proprietário funcional:** Fábio (Product Owner) · **estado de aprovação:** **DEF-01 substituta e uso das duas planilhas aprovados pelo Fábio**, conforme CLAUDE-COORD de 12/10/2026.  
**Importante:** somente este **índice de metadados** está versionado nesta pasta. Os arquivos **.xlsx originais ainda NÃO foram incorporados ao GitHub**. Não interpretar os caminhos-alvo abaixo como arquivos disponíveis ou criar pipeline de carga até que seu blob e SHA de origem sejam verificados.

| Arquivo recebido | Caminho-alvo quando binário for versionado | SHA-256 original | Tamanho | Aba/linhas úteis |
| --- | --- | --- | ---: | --- |
| `taxonomia-v1_7_3-segmento(1).xlsx` | `docs/reference-data/f2/taxonomia-v1_7_3-segmento.xlsx` | `588a89871044a1ca67036fb5c17cdba3ba70f447bd1412fc476f14bb1d6440cd` | 202.635 bytes | `Segmento`, 1.332 linhas úteis |
| `taxonomia-v1_7_0-produto(1).xlsx` | `docs/reference-data/f2/taxonomia-v1_7_0-produto.xlsx` | `35e886e711f0c1c793daaa6a5e61c5500f3ab235913b9bc8e026ea8d8fc0db49` | 279.705 bytes | `Produto`, 3.793 linhas úteis |

## Esquemas inspecionados

### Segmento — aba `Segmento`, A1:L1333
`Segmento | Sub Segmento | Atuação | CNAE | Descrição do CNAE | Sinônimos | Produtos (sugeridos) | NCMs (sugeridos) | No perfil | Classificar pelo nome | Ordem | Código TriFaros`.

### Produto — aba `Produto`, A1:J3794
`Segmento | Grupo | Item | NCM | Sinônimos | No perfil | Classificar pelo nome | Ordem | Código TriFaros | Definição`.

## Artefatos relacionados em `main` (não são cópias dos anexos)

- `radar-fiscal-web/ops/segments/trifaros-cnae-2.3.json` — dimensões de Segmento, Subsegmento e CNAE; não contém como contrato primário NCM+produto.
- `radar-fiscal-web/docs/SEGMENTOS_CNAE.md` — metadados, regras e origem da base Segmentos/CNAEs.
- `radar-fiscal-backend/ops/taxonomy/loads/classificacao-produtos-agro.csv` — cabeçalho `Segmento;Grupo;Item`; não contém CNAE nem NCM.

Nenhum dos `.xlsx` recebidos foi identificado nas árvores `main` de `tribusca-control`, `radar-fiscal-backend` e `radar-fiscal-web` ou na busca pelos nomes exatos. **Os arquivos locais enviados pelo Fábio foram conferidos novamente em 12/10/2026; ambos os SHA-256 são idênticos aos valores do manifesto.** Entretanto, a árvore e o diretório remoto de `docs/reference-data/f2/` na branch do PR #105 continham somente `README.md`, e a lista de arquivos do PR ainda não incluía os XLSX. **SHA local correto não substitui conferência de SHA remoto.**

## Substituição do arquivo legado de produtos — decisão documental

Para **novas cargas F2**, as planilhas **Segmento v1.7.3 + Produto v1.7.0** são as **fontes funcionais aprovadas que substituem** `radar-fiscal-backend/ops/taxonomy/loads/classificacao-produtos-agro.csv` (antigo CSV `Segmento;Grupo;Item`). O CSV deve ser considerado **LEGADO / SUBSTITUÍDO PARA F2** e preservado para auditoria/reprodutibilidade histórica; **não excluir, regravar ou redirecionar o carregador por esta decisão documental**. O código existente ainda aceita CSV e não ganha suporte XLSX automaticamente. A aprovação funcional só produz efeito em dados após lote de implementação com validação, governança de rascunho e gates.

## Condições de incorporação

1. Incluir **bytes originais** dos dois anexos sob os caminhos-alvo de referência; registrar o commit.
2. Conferir SHA-256 de cada arquivo obtido de volta do GitHub contra a coluna acima antes de assinalar **VERSIONADO**.
3. **Não** renomear ou mesclar colunas, nem carregar catálogo ativo, atualizar classificação, alterar esquema ou publicar versão taxonômica nesta F2-T00.
4. Dados aceitos pelo PO como referência interna não representam automaticamente fontes legislativas oficiais; manter catálogos oficiais quando exigidos.

**Bloqueio documental específico:** a ferramenta GitHub disponível nesta execução suporta escrita UTF-8 e criação de blob base64 mediante envio do conteúdo, mas não oferece entrada direta para arquivos locais anexados. Não afirmar versionamento binário enquanto esse passo não for efetivamente executado.

## Preflight da entrega 12/10/2026

| Item | Estado |
| --- | --- |
| Identidade dos dois anexos locais SHA-256 × manifesto | **PASS** |
| Manifesto e plano T01–T03 documentados no PR #105 | **PASS** |
| XLSX presentes no repositório / blob SHA-256 remoto | **NOT_PROVEN — BLOQUEIO** |
| DEF-01 substituta aprovada pelo Fábio | **APROVADA** |
| PR #105 apto a merge | **BLOQUEADO até upload dos XLSX e verificação** |

Plano futuro sem código: [F2-T01–T03](../../workstreams/F2-T01-T03-PLANO-LOTE.md).
