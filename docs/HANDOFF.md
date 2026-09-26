# TriBusca — Protocolo de handoff

Toda entrega de executor GPT-5.6 usa o modelo abaixo no comentário da Issue de governança e em retorno autocontido para o usuário encaminhar ao Gerente GPT-6. O Gerente pode conferir diretamente sistemas e documentos por acesso seguro somente leitura; analisa evidências, pede revisão independente ou nova inspeção GPT-5.6 quando faltar prova, e delega todas as atualizações documentais. Erro ou bloqueio sempre retorna ao Gerente com causa comprovada ou hipótese rotulada; nunca se declara sucesso por ausência de dados.

## Modelo

### Identificação

- Issue de governança:
- Repositório e branch:
- PR, commit head e base:
- Executor (chat/ferramenta):
- Escopo autorizado:

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

- CI: link, run ID, conclusão e jobs:
- Testes: nomes, resultados e risco coberto:
- Deploys: commit, IDs, horários e status por serviço, se aplicável:
- Run produtivo: ID, tipo de trigger, status, métricas, erros e checkpoint, se aplicável:
- Banco: consulta READ ONLY, contagens e amostras de identidade/proveniência sem expor dados sensíveis, se aplicável:
- Arquivos: URLs oficiais, SHA e tamanho, se aplicável:

### Gate e próxima ação

- Critérios de aceite comprovados:
- Critérios sem evidência ou reprovados:
- Riscos/limitações:
- Erro/bloqueio: evidência, causa comprovada ou hipótese, impacto, passos dependentes interrompidos e passos independentes realizados:
- Uma próxima ação recomendada ao Gerente:
- Registro documental: Issue, caminhos alterados, commit e links; se pendente, motivo e patch pronto:

## Regra

CI verde, merge, deploy e run agendado são evidências diferentes. Informação não consultada deve ser marcada “não verificada”; nunca inferir sucesso produtivo a partir de teste local. O Gerente indica se conferiu algo em modo leitura ou se depende apenas do relato; o executor permanece na tarefa até concluir todas as etapas independentes autorizadas ou encontrar barreira real. Segredos, cookies, tokens e corpo integral de publicação não entram na Issue.
