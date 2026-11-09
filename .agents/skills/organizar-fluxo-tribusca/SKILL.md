---
name: organizar-fluxo-tribusca
description: Coordenar, executar, revisar ou retomar entregas do TriBusca no GitHub. Use para priorizar frentes, descobrir por que uma tarefa travou, preparar ou revisar um PR, reconciliar aceite e progresso, ou reorganizar o fluxo entre Gerente Geral, Executor e Revisor.
---

# Organizar o fluxo do TriBusca

## Retomar pelo GitHub

1. Identificar o resultado esperado, a frente e o papel da sessão. Consultar o `AGENTS.md` do repositório e a [Governança Flexível v2](https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/docs/CLAUDE_SESSION_PROTOCOL.md) no `tribusca-control`. Se a fonte canônica mudar, seguir a versão vigente. Aplicar também os controles específicos da entrega.
2. Abrir a issue existente e os PRs relevantes. Usar o contexto geral e os handoffs como índice. Para determinar o estado, confrontar o último registro de decisão com fatos do GitHub e com a evidência do ambiente apenas quando a etapa depender dela. Preservar snapshots anteriores como histórico.
3. Antes de criar código, carga ou coletor, procurar capacidade e dados já existentes. Para o Acervo, distinguir ingestão do histórico disponível, atualização futura e lacunas de cobertura. Verificar formato, origem, identidade, cobertura e atualização no recorte da tarefa. Reaproveitar o que satisfizer o critério. Justificar um coletor novo pela lacuna concreta e dimensionar apenas o trabalho necessário para cobri-la.
4. Classificar o risco e identificar a menor ação que entrega valor ou remove o bloqueio. Priorizar uma entrega iniciada com caminho de fechamento disponível. Se parte da frente estiver bloqueada, executar o trabalho independente já autorizado.

## Aplicar a governança por risco

| Risco | Caminho |
| --- | --- |
| R0 | Validar atualização factual na mesma sessão. Registrar no item existente quando houver. |
| R1 | Implementar, testar e corrigir na mesma sessão. Usar revisão ou LOCK conforme a regra vigente e o impacto concreto. |
| R2 | Trabalhar com issue, branch, PR e testes. Obter revisão independente para mudanças materiais antes do merge. |
| R3 | Verificar autorização explícita, LOCK, revisão independente, artefato exato e salvaguardas aplicáveis. Separar preparação, execução e prova pós-execução conforme o protocolo. |

- Confirmar a autorização aplicável antes de merge, deploy ou ação material. Reavaliar o risco quando surgirem efeitos sobre dados, auth, RLS, tenants, infraestrutura ou produção. O Railway AI Agent é proibido pela D-065. Obter evidência por meio permitido ou registrar `NOT_PROVEN`.
- Usar a issue de controle para concentrar critérios, decisões e próximos passos. Vincular os PRs de backend e web à mesma entrega quando houver dependência. Abrir novo ID apenas conforme o protocolo. Se uma issue exigir aceite após merge, usar vínculo que preserve sua abertura até esse aceite.
- Antecipar o próximo bloqueio antes de encaminhar. Conferir dependências, autorização, recursos de teste, HEAD, CI exigida e quem pode executar a próxima ação. Quando faltar uma decisão, registrar a decisão exata e seu responsável. Quando faltar evidência, registrar a ação que a produz e quem pode executá-la.
- Manter a revisão independente separada da execução quando exigida. Se houver novo commit, examinar o delta antes de decidir entre recheck incremental e revisão integral. Registrar a conclusão para o SHA aplicável. Usar scripts e testes já disponíveis e respeitar a matriz exigida para a mudança.

## Fechar com evidência

- Registrar, na issue, os fatos aplicáveis separadamente. Implementação, CI no HEAD, revisão, merge, deploy observado, validação no ambiente e aceite são eventos diferentes.
- Vincular a menor evidência suficiente para cada critério. Reutilizar provas válidas para o escopo e SHA aplicáveis. Se a validação usar fixtures ou dados sintéticos, delimitar o que ela prova. Se uma captura ou um ZIP for indispensável, disponibilizar um caminho que o revisor possa abrir e conferir.
- Informar progresso pelo critério oficial da frente. Na Frente 2, reconciliar os aceites na baseline canônica e contar cada unidade uma vez. Relatar trabalho implementado, validado ou bloqueado separadamente do percentual aceito.
- Em status e handoff, responder com estado verificado, evidência, ação executada e próxima ação com responsável. Se houver bloqueio, registrar desde quando, qual critério falta e como satisfazê-lo. Se o Gerente Geral delegar formalmente, entregar um bloco copiável com issue, objetivo, risco, escopo autorizado, prova esperada e condição de parada. Usar [o handoff proporcional](https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/docs/HANDOFF.md).

## Melhorar o fluxo sem criar outra fonte de status

Quando o mesmo impedimento se repetir, comparar os ciclos recentes e propor a menor correção na origem. Usar o GitHub Projects como visão das issues. Automatizar eventos verificáveis, como vínculo ou andamento do PR, preservando os aceites específicos. Testar mudanças de processo em uma entrega e comparar tempo até o aceite, tempo parado e quantidade de repasses. Usar os resultados para decidir se há um problema de estrutura entre repositórios. Tratar uma migração de repositório como decisão própria, com impacto, dependências e reversão avaliados.
