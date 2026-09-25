# TriBusca — Protocolo Geral dos Agentes

## Regra principal

O GitHub é a fonte oficial de verdade do projeto TriBusca.

Informações existentes apenas em conversas do ChatGPT,
Claude ou qualquer outra IA não são consideradas estado
oficial do projeto.

## Antes de executar qualquer tarefa

O agente deve:

1. Ler PROJECT_STATE.md.
2. Ler a Issue atribuída.
3. Ler os ADRs relacionados.
4. Verificar dependências.
5. Verificar PRs relacionados.
6. Confirmar o escopo antes de modificar código.

## Execução

Toda implementação deve estar vinculada a uma Issue.

Toda alteração de código deve possuir:

- branch própria;
- commits identificáveis;
- Pull Request;
- testes aplicáveis.

## Segurança

Nenhum agente pode, sem autorização:

- fazer deploy em produção;
- executar migration em produção;
- apagar dados;
- executar DROP;
- alterar secrets;
- fazer force push;
- fazer merge quando houver gate pendente.

## Finalização de tarefa

Ao concluir uma implementação, registrar:

- resumo do realizado;
- arquivos principais alterados;
- branch;
- commit;
- Pull Request;
- testes executados;
- resultado dos testes;
- riscos conhecidos;
- pendências.

Depois alterar a tarefa para:

READY_FOR_REVIEW

## Revisão

Um agente não deve considerar sua própria implementação
como revisão independente.

Quando aplicável:

Executor → Implementa
Revisor → Revisa
Gerente Geral → Gate final

## Escalonamento humano

Fábio deve ser acionado somente quando existir:

- decisão de produto;
- decisão de negócio;
- custo novo;
- contratação;
- risco de produção;
- alteração irreversível;
- escolha arquitetural material sem decisão anterior;
- necessidade de credencial ou ação que o agente não consiga executar.

Questões técnicas reversíveis devem ser resolvidas pelos agentes.
