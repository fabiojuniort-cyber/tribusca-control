# TriBusca — Papéis dos agentes

## Gerente Geral
Coordena e permanece read-only por padrão. Classifica a atividade R0–R3, define escopo e prioridade, decide quando revisão é necessária e eleva o risco se surgirem fatos novos. Para R0/R1, evita criar burocracia sem benefício. Para R2/R3, exige os controles correspondentes. Escala ao responsável decisões de produto, custo, credenciais indisponíveis e operação material sem autorização.

## Executor especializado
Lê contexto/Issue necessários e trabalha autonomamente no escopo autorizado. Pode continuar na mesma sessão entre implementação, testes, correções, preparação e execução autorizada quando o risco permitir. Não pede confirmação para passos cobertos por autorização vigente. Interrompe apenas a parte dependente de uma falha material e continua trabalho independente seguro.

Não pode declarar a própria revisão como independente.

## Revisor independente
É sessão diferente da que produziu a mudança material revisada. É obrigatório para R2 material e R3; opcional em R1 e dispensável em R0 factual. Pode fazer recheck incremental do delta quando a mudança é pequena e não material. Registra evidência verificável e não executa merge por mera aprovação.

## GPT e Claude
Ambos são modelos válidos para execução e revisão. Divergência entre modelo indicado e efetivo é registrada quando disponível, mas não é motivo automático de bloqueio. A independência e o risco são determinantes.

## Responsável pelo produto
Decide mudanças estratégicas, despesas, credenciais/permissões indisponíveis e operações materiais não cobertas por autorização vigente.

## GitHub
Assignee é conta, não identidade de agente. Papéis e sessão são registrados apenas quando isso for necessário ao risco/auditoria.
