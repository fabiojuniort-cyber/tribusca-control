# TriBusca — central de governança

Este repositório organiza as tarefas, decisões e evidências do TriBusca. Código e deploys ficam nos repositórios de implementação. Uma entrega só é produtiva após os gates observados no ambiente real.

## Comece aqui

1. [Estado executivo](PROJECT_STATE.md): o que está aberto, comprovado e pendente de revalidação.
2. [Roadmap](ROADMAP.md): prioridade e critérios para avançar.
3. [Decisões](DECISIONS.md) e [arquitetura](docs/ARCHITECTURE.md): regras aprovadas.
4. [Papéis](docs/AGENT_ROLES.md), [instruções dos agentes](AGENTS.md) e [segurança](docs/SECURITY.md).
5. [Handoff](docs/HANDOFF.md) e [revisão/gates](docs/REVIEW_AND_GATES.md).
6. [Issues](https://github.com/fabiojuniort-cyber/tribusca-control/issues): tarefas verificáveis.

## Repositórios

- [radar-fiscal-backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend): API, Worker, Scheduler, banco e conectores.
- [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web): frontend definitivo.

## Como trabalhar

Gerente Geral abre/coordena a Issue → executor trabalha no repositório de código → revisor independente examina o PR → Gerente confirma o gate em produção → Issue e estado oficial são atualizados.

Links entre repositórios são registrados na Issue e no PR. Não fechar uma Issue de validação produtiva ao fazer merge do PR. Conversas entre chats não alteram automaticamente o estado oficial; registrar evidências no GitHub.
