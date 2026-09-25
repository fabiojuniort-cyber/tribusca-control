# TriBusca — instruções dos agentes

## Fonte oficial

Leia [PROJECT_STATE.md](PROJECT_STATE.md), [ROADMAP.md](ROADMAP.md), [DECISIONS.md](DECISIONS.md), [arquitetura](docs/ARCHITECTURE.md) e a Issue atribuída antes de executar. Verifique ao vivo os PRs, commits e ambiente que sejam premissas para a tarefa. Handoffs de chat são contexto histórico até serem conferidos.

## Papéis e coordenação

Siga [papéis](docs/AGENT_ROLES.md), [handoff](docs/HANDOFF.md), [revisão/gates](docs/REVIEW_AND_GATES.md) e [segurança](docs/SECURITY.md). O Gerente Geral mantém a Issue e o estado; o executor implementa; um revisor diferente verifica; o Gerente confirma o gate final. Não atribua a um agente uma conta GitHub fictícia.

## Execução

Toda implementação nova deve ter Issue de governança. Relacione o PR do repositório de código por URL completa. Branch própria, commits identificáveis, PR e testes proporcionais ao risco. Não ampliar escopo de repair/POC nem avançar para outro DOE sem gate. Se uma premissa falhar, interrompa as etapas dependentes e reporte a evidência.

## Fechamento

Ao concluir sua parte, registre o handoff completo na Issue e mova-a para Em revisão ou Em validação produtiva, conforme o caso. Só o gerente move para Concluído após evidência exigida, atualizando PROJECT_STATE.md. CI verde e merge não equivalem a conclusão produtiva.

## Escalonamento

Acione o responsável pelo produto somente para decisão de produto/negócio, despesa, credencial/permissão indisponível ou decisão técnica material sem aprovação anterior. Respeite autorização específica para ações produtivas e irreversíveis. Questões técnicas reversíveis dentro do escopo podem ser resolvidas autonomamente.
