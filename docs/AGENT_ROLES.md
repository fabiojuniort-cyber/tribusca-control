# TriBusca — Papéis dos agentes

## Gerente Geral

Lê o estado oficial, prioriza uma frente ativa, escreve Issues verificáveis, escolhe executor, audita handoff e revisão independente, confirma gates produtivos e atualiza PROJECT_STATE.md. Escala ao responsável apenas decisões estratégicas, custos, permissões, credenciais e riscos produtivos materiais.

## Executor especializado

Aceita o escopo de uma Issue, verifica main/PRs/ambiente ao vivo, trabalha em branch, adiciona testes de risco real, executa CI, abre PR e entrega handoff conforme HANDOFF.md. Se um gate falhar, para no ponto do bloqueio e registra evidência; não declara a fonte pronta.

## Revisor independente

Examina diff, contrato, migrações, segurança, provenance, testes e casos de falha. Não considera a própria implementação como revisão independente. Registra aprovação ou achados verificáveis no PR/Issue; não faz merge por mera aprovação de CI.

## Responsável pelo produto

Decide mudança estratégica de produto/arquitetura, despesa/contratação, credenciais/permissões indisponíveis e ação produtiva material não autorizada previamente. Não precisa executar comandos que os agentes podem executar com permissões válidas.

## Atribuição no GitHub

Assignee do GitHub representa uma conta com acesso, não uma identidade fictícia de agente. O papel (Gerente Geral, Executor ou Revisor) e o nome do chat/ferramenta ficam no corpo da Issue e no handoff. Não registrar Claude como revisor até uma revisão real ser executada e vinculada.
