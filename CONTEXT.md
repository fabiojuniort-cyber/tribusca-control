# TriBusca — contexto de retomada do Gerente Geral

Atualizado em 26/09/2026, 00:14 BRT. Leia este arquivo ao iniciar uma nova conversa. É um índice executivo: evidências detalhadas permanecem nas Issues, PRs e documentos vinculados. Revalide o estado vivo antes de tomar decisões operacionais.

## Missão e limites desta conversa

Este chat do Gerente Geral trata da governança e coordenação dos agentes. Implementações de backend/frontend, merges, deploys e intervenções produtivas pertencem às frentes executoras autorizadas. O usuário quer uma tarefa por vez, mínima intermediação e apenas etapas dependentes após a premissa. Nunca presumir que uma Issue, um cartão ou um arquivo inicia automaticamente um chat.

## Onde está a verdade

- [Estado oficial](PROJECT_STATE.md) e [roadmap](ROADMAP.md): síntese gerencial.
- [Decisões](DECISIONS.md), [arquitetura](docs/ARCHITECTURE.md) e [segurança](docs/SECURITY.md): limites aprovados.
- [Papéis](docs/AGENT_ROLES.md), [handoff](docs/HANDOFF.md), [gates](docs/REVIEW_AND_GATES.md) e [protocolo de contexto](docs/CONTEXT_MAINTENANCE.md): contrato de execução e atualização.
- [Backend](contexts/BACKEND.md), [frontend](contexts/WEB.md) e [DOE-SP](contexts/DOE-SP.md): entradas curtas para novos chats especializados.
- [Issues da central](https://github.com/fabiojuniort-cyber/tribusca-control/issues) e [quadro](https://github.com/users/fabiojuniort-cyber/projects/1): trabalho, dependências e progresso.
- [Backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend) e [frontend](https://github.com/fabiojuniort-cyber/radar-fiscal-web): código; o frontend ainda não tem implementação definitiva.
- Se houver divergência, conferir Issue/PR, commit, Railway e PostgreSQL ao vivo. A data acima é a data da última atualização do arquivo, não garantia de produção atual.

## Ponto de retomada verificado

- DOE-SP segue **ABERTO**; o bootstrap completo 2025-01-01 → data atual e os gates produtivos ainda não foram comprovados.
- [Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1), P0, foi colocada em In Progress no quadro conforme confirmação do usuário. Na consulta de 26/09/2026 ainda estava aberta, com **0 comentários** e sem handoff; o estado do cartão não prova que um chat executor está trabalhando.
- [PR #71 do backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) ainda estava OPEN, unmerged, head `091868c053d9d6f035030f866afd438f2c9fe3bd`. O CI #381 foi informado como verde anteriormente; conferir novamente antes de usar como gate.
- O último bloqueio histórico transmitido foi 29/07/2025 com 399 dias pendentes. Não interpretar como leitura produtiva atual.
- [Issue #2](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2): bootstrap e replay, depende da #1.
- [Issue #3](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3): artefatos e política de `publication_files`, depende da #1.
- [Issue #4](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4): fechamento formal DOE-SP, depende de #1–#3.
- [Issue #5](https://github.com/fabiojuniort-cyber/tribusca-control/issues/5): validar o ciclo de governança com uma entrega real; permanece aberta.
- [Backend PR #72 de governança](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/72) está em draft, auditado com apenas `AGENTS.md` e template de PR; CI #382 SUCCESS. Continua sem merge/deploy porque a main pode acionar deploy automático. O frontend tem apenas arquivos de governança e nenhuma implementação da aplicação. Leia [protocolo de atualização](docs/CONTEXT_MAINTENANCE.md) ao iniciar nova frente.
- Seis labels já criadas (`P0`–`P3`, `doe-sp`, `governanca`); cinco Issues importadas no Projects. O conector GitHub usado nesta conversa edita Issues e arquivos, mas não move cartões no Projects.

## Próxima passagem

Receber o resultado da Tarefa 18 / Issue #1 do executor. Exigir handoff registrado na Issue; auditar PR, revisão independente e evidências produtivas antes de fechar #1. Se houver bloqueio, registrar a causa e delegar apenas o menor passo necessário. Não abrir o segundo DOE enquanto SP estiver aberto.

## Atualização obrigatória a cada marco

Gerente Geral: após handoff auditado, decisão, novo PR/gate ou alteração da prioridade, atualize este arquivo e PROJECT_STATE.md na mesma sessão. Corrija/remova números antigos e registre data, evidência e próximo passo. Executor/revisor: registre seu handoff na Issue; não altere o contexto gerencial com conclusão não auditada. Arquivos não são atualizados por outros chats automaticamente. Se a ferramenta de escrita estiver indisponível, deixe instrução explícita de atualização no retorno.

## Retomada em novo chat

Cole: “Assuma como Gerente Geral do TriBusca. Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/CONTEXT.md e os links indicados. Revalide a Issue ativa e o PR antes de agir. Continue apenas a governança, uma tarefa por vez, preservando os gates.”
