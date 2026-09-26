# TriBusca — Produto e Ferramentas

Atualizado em 26/09/2026. Frente contínua **PROD-01**, governada pela [Issue #7](https://github.com/fabiojuniort-cyber/tribusca-control/issues/7).

Este diretório registra definições funcionais de ferramentas do TriBusca. Ele **não é evidência de implementação**. Estado produtivo deve ser comprovado em `PROJECT_STATE.md`, Issues de implementação, repositórios de código e, quando aplicável, produção.

## Estados usados

| Estado | Significado |
| --- | --- |
| **PROPOSTA** | Ideia em avaliação; não aprovada para o produto. |
| **DECISÃO APROVADA** | Definição confirmada pelo responsável pelo produto; ainda pode não estar implementada. |
| **QUESTÃO ABERTA** | Ponto sem decisão suficiente; não preencher por suposição. |
| **IMPLEMENTAÇÃO COMPROVADA** | Só usar quando houver evidência verificável de entrega no código/ambiente correspondente. |

## Índice de ferramentas

| Ferramenta / capacidade | Estado documental | Implementação | Documento |
| --- | --- | --- | --- |
| **Decodifica** | **DECISÃO APROVADA** | **Não comprovada**; planejada para depois da macrofase DOE | [Decodifica](DECODIFICA.md) |
| **Sonar** | **DECISÃO APROVADA** | **Não comprovada**; detalha a relevância/afinidade prevista no roadmap | [Sonar](SONAR.md) |
| **Revela** | **DECISÃO APROVADA** | **Não comprovada**; boletim diário personalizado | [Revela](REVELA.md) |
| **Reforma Tributária** | **DECISÃO APROVADA** como página temática de dados, não produto | **Não comprovada** como experiência final | [Página temática](REFORMA_TRIBUTARIA.md) |
| **Acervo** | **DECISÃO APROVADA** como área estrutural, sem nome comercial próprio; **Busca é função interna** | **Não comprovada** como experiência final | [Produto e UX](../PRODUCT_AND_UX.md#acervo) |

Novas ferramentas entram neste índice somente quando forem discutidas nesta frente ou quando uma decisão vigente precisar ser incorporada explicitamente. Não criar nomes, escopo ou comportamento para preencher lacunas.

## Registro mínimo por ferramenta

Cada documento individual deve registrar, apenas conforme houver evidência ou decisão:

- nome e status;
- problema que resolve;
- público;
- funcionamento;
- entradas e saídas;
- experiência do usuário;
- dependências;
- limites;
- relação com outras ferramentas;
- estágio previsto;
- questões abertas;
- impacto avaliado em arquitetura, dados, API, coleta, IA, UX, site/comercial, custos, segurança, prioridades e roadmap;
- necessidade ou não de ajuste no projeto;
- referências para decisão, Issue e evidência de implementação, quando existirem.

## Método da frente

1. Discutir uma decisão ou pequeno grupo de decisões por rodada com o responsável pelo produto.
2. Separar explicitamente proposta, decisão aprovada, questão aberta e implementação comprovada.
3. Atualizar este índice e o documento da ferramenta à medida que o estado mudar.
4. Atualizar `docs/OPEN_QUESTIONS.md` quando existir questão material ainda não decidida.
5. Atualizar `DECISIONS.md` quando uma decisão material for aprovada ou uma decisão vigente for alterada.
6. Após decisão material, revisar impacto em arquitetura, dados, API, coleta, IA, UX, site/comercial, custos, segurança, prioridades e roadmap.
7. Se houver impacto que exija trabalho técnico, preparar handoff ao Gerente Geral e aguardar delegação por Issue própria.
8. Se não houver ajuste necessário, registrar igualmente essa conclusão.

## Limites atuais

- Esta frente não altera backend, frontend, produção, migrations, deploys ou prioridade do DOE-SP.
- A prioridade executiva permanece a definida no `ROADMAP.md`.
- Conceito aprovado não equivale a recurso disponível.
- Não anunciar capacidade futura como implementada.
- Não criar sub-marcas ou alterar nomes aprovados sem decisão formal. **Decodifica**, **Sonar** e **Revela** são nomes de funcionalidades do TriBusca, não submarcas independentes.
