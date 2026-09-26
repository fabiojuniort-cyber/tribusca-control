# TriBusca — central de governança

Este repositório organiza as tarefas, decisões e evidências do TriBusca. Código e deploys ficam nos repositórios de implementação. Uma entrega só é produtiva após os gates observados no ambiente real.

## Comece aqui

1. [Contexto de retomada do Gerente Geral](CONTEXT.md): abra este arquivo ao iniciar outro chat.
2. [Backend](contexts/BACKEND.md), [frontend](contexts/WEB.md) e [DOE-SP](contexts/DOE-SP.md): contexto de cada frente; [executor](contexts/EXECUTOR.md) e [revisor](contexts/REVIEWER.md): papel de cada chat.
3. [Protocolo de atualização](docs/CONTEXT_MAINTENANCE.md): quem altera cada arquivo após um marco.
4. [Estado executivo](PROJECT_STATE.md): o que está aberto, comprovado e pendente de revalidação.
5. [Roadmap](ROADMAP.md): prioridade e critérios para avançar.
6. [Decisões](DECISIONS.md), [arquitetura](docs/ARCHITECTURE.md), [produto e UX](docs/PRODUCT_AND_UX.md), [site](docs/SITE_AND_MARKETING.md) e [manual de marca](docs/BRAND_MANUAL_V1.md): regras aprovadas e direção futura.
7. [Papéis](docs/AGENT_ROLES.md), [instruções dos agentes](AGENTS.md) e [segurança](docs/SECURITY.md).
8. [Handoff](docs/HANDOFF.md) e [revisão/gates](docs/REVIEW_AND_GATES.md).
9. [Issues](https://github.com/fabiojuniort-cyber/tribusca-control/issues): tarefas verificáveis.
10. [Quadro TriBusca — Gestão do Projeto](https://github.com/users/fabiojuniort-cyber/projects/1): visão de andamento das Issues.

## Repositórios

- [radar-fiscal-backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend): API, Worker, Scheduler, banco e conectores.
- [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web): frontend definitivo.

## Como trabalhar

Gerente Geral abre/coordena a Issue → executor trabalha no repositório de código → revisor independente examina o PR → Gerente confirma o gate em produção → Issue e estado oficial são atualizados.

No quadro, Todo indica tarefa ainda não iniciada ou bloqueada por dependência; In Progress indica execução, revisão ou validação produtiva ainda aberta; Done só é usado depois do gate e fechamento da Issue. Registre em comentário na Issue a etapa específica e a evidência. O conector GitHub desta sessão não oferece edição das colunas do Projects; movimentos do quadro dependem da interface GitHub até existir integração própria.

Links entre repositórios são registrados na Issue e no PR. Não fechar uma Issue de validação produtiva ao fazer merge do PR. Conversas entre chats não alteram automaticamente o estado oficial; registrar evidências no GitHub.
