# ARQ-01 — Pipeline normativo modular (proposta)

**Status:** PROPOSTA, aguardando aprovação do Fábio. Nenhum código antes da aprovação.
**Origem:** conversa Fábio + CLAUDE-COORD, 11/10/2026.

## Problema
Hoje a interpretação do texto (estrutura, histórico editorial, revogações) e a classificação por assunto estão misturadas. Por isso os testes do TAX13 falham (L-16): os Convênios ICMS 100/97 e 52/91 mostram histórico editorial como texto vigente, e um NCM de anexo revogado (8450.11.00) é tratado como vigente.

## Princípios
1. **Modular:** cada etapa faz uma coisa, tem entrada e saída definidas e salva o resultado. Pode ser rodada e testada sozinha, sem refazer as outras.
2. **Low-code:** as regras são **dados editáveis** (tabelas no admin, como o Filtro de Coleta), não código. Há um motor por etapa e perfis por tipo de ato.
3. **Teste por exemplos:** documento real + resultado esperado ("exemplo-ouro"). Quando algo sair errado, vira exemplo novo e passa a ser testado sempre.
4. **Simples primeiro:** piloto pequeno, depois expansão um tipo de ato por vez.

## Etapas

| # | Módulo | Faz | Entrega |
|---|---|---|---|
| 0 | Coleta + Filtro | já existe | publicação bruta aceita |
| 1 | **Estrutura** | olha **um documento**: cabeçalho, epígrafe, ementa, preâmbulo, artigos/cláusulas, parágrafos, incisos, anexos, notas editoriais, texto revogado/acrescido e data de publicação | documento estruturado (árvore de dispositivos) |
| 2 | **Relações e Vigência** | olha **vários documentos**: "altera", "revoga", "acrescenta", "prorroga", "produz efeitos a partir de"; calcula o **texto vigente em cada data** | grafo de relações + versões vigentes por data |
| 3 | **Taxonomia** | classifica o assunto, os tributos, os NCMs e os CNAEs **sobre o texto vigente** (não sobre o histórico) | marcadores por dispositivo |
| 4 | **Cruzamento com empresas** | liga os marcadores ao cadastro (NCM, CNAE, UF, regime) | alertas por empresa |
| 5 | **Layout** | **só desenha** o que as etapas 1–4 entregaram (cores, posições, destaques). Não decide nada | tela |

**Perfis por tipo de ato** (configuração, não programa): Lei, Decreto, Convênio ICMS, Ajuste SINIEF, IN, Portaria, Resolução etc. Cada perfil diz como reconhecer os dispositivos (ex.: Convênio usa "Cláusula", Lei usa "Art."), as notas editoriais típicas e as frases de relação. Um tipo novo se adapta preenchendo um perfil, sem programar.

## Reaproveitar antes de criar (pesquisa P-01)
- **LexML Brasil** (padrão do governo federal): usar o vocabulário da estrutura (ParteInicial/Epígrafe/Ementa/Preâmbulo/Articulação) como modelo da etapa 1, em vez de inventar um.
- **lexml-linker** (open source): parser de remissões entre normas, candidato para a etapa 2.
- **lexml-parser-projeto-lei** (open source, Java): avaliar como referência ou serviço auxiliar. Não acoplar ao monólito sem decisão.
- **jsonix-lexml** (npm): conversão XML↔JSON no formato LexML.
- **P-01:** avaliação curta, só leitura, de no máximo 1 dia: o que serve, o que não serve, o custo de usar. Sem integrar nada.

## Piloto (primeira entrega)
- **Escopo:** só **Convênios ICMS**, só as etapas **1 (Estrutura)** e **2 (Relações e Vigência)**.
- **Exemplos-ouro iniciais:** Convênio ICMS 100/97, Convênio ICMS 52/91 e o anexo revogado com o NCM 8450.11.00.
- **Pronto quando:** os testes da L-16 voltam ao CI e passam; o texto vigente dos 2 convênios sai sem histórico editorial; o NCM de anexo revogado não gera alerta.
- **Fora do piloto:** os outros tipos de ato, a etapa 3 em diante e qualquer mudança de layout.

## Decisões registradas (Fábio, 11/10/2026)
- O pipeline será modular, com regras como dados (low-code), fácil de manter, rodar e testar.
- A estrutura (texto) fica separada da taxonomia (assunto). A personalização por tipo de ato é feita por perfis de configuração.
- Antes de codar, pesquisar o que já existe (P-01).
