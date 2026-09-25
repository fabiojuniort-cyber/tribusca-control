# TriBusca — instruções dos agentes

## Fonte oficial

Leia [PROJECT_STATE.md](PROJECT_STATE.md), [ROADMAP.md](ROADMAP.md), [DECISIONS.md](DECISIONS.md), [arquitetura](docs/ARCHITECTURE.md) e a Issue atribuída antes de executar. Verifique ao vivo os PRs, commits e ambiente que sejam premissas para a tarefa. Handoffs de chat são contexto histórico até serem conferidos.

## Papéis e coordenação

Siga [papéis](docs/AGENT_ROLES.md), [handoff](docs/HANDOFF.md), [revisão/gates](docs/REVIEW_AND_GATES.md) e [segurança](docs/SECURITY.md). O Gerente Geral mantém a Issue e o estado; o executor implementa; um revisor diferente verifica; o Gerente confirma o gate final. Não atribua a um agente uma conta GitHub fictícia.

## Execução

Toda implementação nova deve ter Issue de governança. Relacione o PR do repositório de código por URL completa. Branch própria, commits identificáveis, PR e testes proporcionais ao risco. Não ampliar escopo de repair/POC nem avançar para outro DOE sem gate. Se uma premissa falhar, interrompa as etapas dependentes e reporte a evidência.

## Fechamento

Ao concluir sua parte, registre o handoff completo na Issue e indique por comentário se ela está em revisão independente ou validação produtiva. No [quadro de andamento](https://github.com/users/fabiojuniort-cyber/projects/1), mantenha In Progress enquanto o gate não tiver sido concluído; Done só após a evidência exigida. Somente o gerente confirma a conclusão e atualiza PROJECT_STATE.md. O conector GitHub atual não altera as colunas do Projects, então registre o estado detalhado na Issue independentemente do quadro. CI verde e merge não equivalem a conclusão produtiva.

## Escalonamento

Acione o responsável pelo produto somente para decisão de produto/negócio, despesa, credencial/permissão indisponível ou decisão técnica material sem aprovação anterior. Respeite autorização específica para ações produtivas e irreversíveis. Questões técnicas reversíveis dentro do escopo podem ser resolvidas autonomamente.
