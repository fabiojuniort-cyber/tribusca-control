# TriBusca — Protocolo de handoff

Toda entrega de executor ou revisor GPT-5.6 usa o modelo abaixo no comentário da Issue de governança e, para encaminhamento ao Gerente GPT-6, deve ser apresentada **em um único bloco copiável contendo somente o handoff destinado ao Gerente**. Comentários e explicações ao usuário ficam fora desse bloco. O handoff pode usar linguagem técnica compacta e estrutura otimizada para análise, mesmo que não seja imediatamente compreensível ao usuário, desde que preserve fatos, hipóteses identificadas, IDs, links, resultados, falhas, gates, próxima ação e evidência necessária; segredos continuam proibidos. O Gerente pode conferir diretamente sistemas e documentos por acesso seguro somente leitura; analisa evidências, traduz o handoff em resumo claro ao usuário, pede revisão independente ou nova inspeção GPT-5.6 quando faltar prova, e delega todas as atualizações documentais. Erro ou bloqueio sempre retorna ao Gerente com causa comprovada ou hipótese rotulada; nunca se declara sucesso por ausência de dados.

## Modelo

### Identificação

- Atividade:
- Título:
- Especialidade do chat:
- Papel: Executor ou Revisor independente
- Modelo:
- Frente:
- Issue de governança:
- Resultado esperado da delegação:
- Repositório e branch:
- PR, commit head e base:
- Executor/revisor (chat/ferramenta):
- Escopo autorizado:
- Tipo de gate: CÓDIGO | PREPARAÇÃO | REVISÃO | EXECUÇÃO, quando aplicável
- Gate 0: push / Railway / LOCK, com evidências sintéticas
- Handoff + UNLOCK da sessão anterior confirmados antes deste prompt, quando aplicável:
- LOCK/UNLOCK da sessão atual, quando aplicável:
- Serviços, janela de coleta/recaptura ou `não aplicável`:
- Autorizações vigentes transcritas e origem/escopo:
- Pendências herdadas com critério próprio:
- Valores esperados usados no gate:

### Estado do gate

- Preparado: sim/não/não aplicável — evidência:
- Executado: sim/não/não aplicável — evidência:
- Validado: sim/não/não aplicável — evidência:
- Ações que exigem decisão do usuário e não foram executadas:

### Resultado

- O que foi feito:
- O que permanece pendente:
- Arquivos/migrations alterados:
- Contexto da frente consultado (link) e documentação técnica alterada neste PR:
- Arquivos centrais de contexto/estado que o executor atualizou por delegação, com commit/link, ou que ainda precisa atualizar após decisão do Gerente:
- Contratos e comportamento afetados:
- Ações efetivas em GitHub/Railway/PostgreSQL:
- Ações explicitamente não executadas:

### Evidências

- Commits/head: SHAs e mensagens relevantes:
- PR: URL, estado draft/ready/merged e SHA revisado:
- CI: link, run ID, conclusão e jobs:
- Testes: nomes, resultados e risco coberto:
- Deploys: commit, IDs, horários e status por serviço, se aplicável:
- Run produtivo: ID, tipo de trigger, status, métricas, erros e checkpoint, se aplicável:
- Banco: consulta READ ONLY, contagens e amostras de identidade/proveniência sem expor dados sensíveis, se aplicável:
- Arquivos: URLs oficiais, SHA e tamanho, se aplicável:

### Gate, progresso e próxima ação

- Resultado deste avanço: sucesso, falha, bloqueada ou em andamento
- Evidência breve do avanço:
- Percentual estimado de avanço da frente:
- Base de marcos verificáveis e pesos usada no cálculo:
- Incerteza da estimativa e motivo:
- Critérios de aceite comprovados:
- Critérios sem evidência ou reprovados:
- Riscos/limitações:
- Erro/bloqueio: evidência, causa comprovada ou hipótese, impacto, passos dependentes interrompidos e passos independentes realizados:
- Ponto exato de retomada da próxima sessão:
- Próximo gate:
- UNLOCK: comentário/link e horário BRT:
- Uma próxima ação recomendada ao Gerente:
- Se a frente foi encerrada e outra será aberta: passos restantes até a conclusão do projeto, percentual estimado do projeto total, base de marcos e incertezas:
- Registro documental: Issue, caminhos alterados, commit e links; se pendente, motivo e patch pronto:

## Sessões Claude

Quando o modelo designado for Claude, usar também [CLAUDE_SESSION_PROTOCOL.md](CLAUDE_SESSION_PROTOCOL.md). **Preparado, Executado e Validado são estados distintos**: nenhum deles pode ser inferido do outro. O handoff deve registrar commits/PR/CI/deploys aplicáveis, bloqueios, ponto exato de retomada, próximo gate e o UNLOCK da Issue. Dados privados não entram no handoff nem na resposta; permanecem na Railway.

## Regra

CI verde, merge, deploy e run agendado são evidências diferentes. Informação não consultada deve ser marcada “não verificada”; nunca inferir sucesso produtivo a partir de teste local. O Gerente indica se conferiu algo em modo leitura ou se depende apenas do relato; o executor permanece na tarefa até concluir todas as etapas independentes autorizadas ou encontrar barreira real. **O bloco do handoff contém somente a mensagem operacional para o Gerente; o resumo claro ao usuário é responsabilidade do Gerente após a análise.** Segredos, cookies, tokens e corpo integral de publicação não entram na Issue.
