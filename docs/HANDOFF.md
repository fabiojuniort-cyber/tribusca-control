# TriBusca — Protocolo de handoff

Toda entrega de executor usa o modelo abaixo, no comentário da Issue de governança. O gerente confere evidências nos sistemas oficiais antes de atualizar o estado.

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
- Arquivos centrais de contexto/estado que o Gerente precisa atualizar após auditar este marco:
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
- Uma próxima ação recomendada:

## Regra

CI verde, merge, deploy e run agendado são evidências diferentes. Informação não consultada deve ser marcada “não verificada”; nunca inferir sucesso produtivo a partir de teste local. Segredos, cookies, tokens e corpo integral de publicação não entram na Issue.
