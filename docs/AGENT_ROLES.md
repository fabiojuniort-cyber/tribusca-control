# TriBusca — Papéis dos agentes

## Gerente Geral — GPT-6

Coordena, prioriza e analisa **todos os erros, bloqueios, divergências e handoffs** dos chats GPT-5.6. Define até cinco passos independentes por instrução, critérios verificáveis, dependências e limites. Confere lógica e suficiência das evidências trazidas por executor e revisor independente, decide o próximo encaminhamento e pede investigação adicional quando não houver prova. Pode ler diretamente, quando necessário e em qualquer momento, os contextos, Issues, PRs, código, CI, logs e evidências de Railway/PostgreSQL por meios seguros somente leitura. Não executa comandos ou consultas que modifiquem estado, nem edita arquivos, faz merge, deploy ou disparo de coleta. Delega a criação/edição de Issues, manutenção documental e todas as ações operacionais aos GPT-5.6. Sua conclusão distingue fatos que conferiu em modo somente leitura daqueles informados nos relatórios; não alega inspeção direta quando só houver handoff. Escala ao responsável somente decisões estratégicas, custos, credenciais/permissões indisponíveis e ação produtiva material sem autorização. Para um novo chat, usar o procedimento de bootstrap em [CONTEXT_MAINTENANCE.md](CONTEXT_MAINTENANCE.md).

## Executor especializado — modelo designado (GPT-5.6 por padrão)

O usuário abre o chat sob instrução do Gerente; arquivos ou Issues não iniciam agentes automaticamente. Lê o contexto mínimo e a Issue; verifica ao vivo main, PR, CI e ambiente necessários. Executa de forma autônoma o máximo do escopo autorizado, inclusive investigação de erro, testes, PR, documentação e atualização de contexto delegada. Não para entre passos independentes para pedir confirmação. Quando uma premissa crítica falhar, interrompe as etapas dependentes, continua apenas trabalho independente seguro e retorna o problema ao Gerente com evidência, causa conhecida ou hipótese rotulada, impacto, ações feitas, não feitas e uma proposta de próximo passo. Se precisar de decisão/ação produtiva além da autorização, retorna para o Gerente obter o gate apropriado. Registra handoff na Issue e mantém os arquivos designados pelo Gerente, trazendo commit e diff resumido.

## Revisor independente — chat/sessão distinto, modelo designado

GPT-5.6 por padrão ou Claude quando o prompt designar; revisão de qualquer desses modelos é válida. Examina diff, contrato, migrações, segurança, provenance, testes e casos de falha. Não considera a própria implementação como revisão independente, nem revisa intervalo de commits em que tenha atuado como executor. Registra aprovação ou achados verificáveis no PR/Issue; devolve todos os erros e gates reprovados ao Gerente para análise e delegação da correção. Não faz merge por mera aprovação de CI.

## Sessões Claude designadas

O Gerente pode designar **Modelo: Claude** para uma atividade específica. Nessa hipótese, Claude ocupa o papel declarado no prompt — Executor ou Revisor independente — e segue integralmente [CLAUDE_SESSION_PROTOCOL.md](CLAUDE_SESSION_PROTOCOL.md), sem ampliar sua autorização pelo simples fato de trocar o modelo.

Uma sessão Claude declara um único tipo de gate. O executor ativo é único e mantém LOCK/UNLOCK identificados por sessão e modelo; o revisor trabalha em sessão sem participação no intervalo revisado e não corrige a própria entrega revisada. Modelo efetivo diferente do designado é registrado, não invalida a atividade. EXECUÇÃO produtiva exige autorização explícita e material previamente preparado/revisado conforme o risco.

A capacidade da ferramenta deve ser verificada ao vivo em cada sessão. A exclusão de serviço Railway depende da ferramenta da sessão: se estiver disponível, continua exigindo autorização e salvaguardas; se não estiver, não alegar exclusão, registrar a ação como não executada e encaminhar o próximo gate (C-11).

## Responsável pelo produto

Decide mudança estratégica de produto/arquitetura, despesa/contratação, credenciais/permissões indisponíveis e ação produtiva material não autorizada previamente. Não precisa executar comandos que os agentes podem executar com permissões válidas.

## Atribuição no GitHub

Assignee do GitHub representa uma conta com acesso, não uma identidade fictícia de agente. O papel (Gerente Geral, Executor ou Revisor) e o nome do chat/ferramenta ficam no corpo da Issue e no handoff. Não registrar Claude como revisor até uma revisão real ser executada e vinculada.
