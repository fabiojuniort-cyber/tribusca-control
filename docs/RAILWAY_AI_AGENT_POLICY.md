# TriBusca — Política de proibição do Railway AI Agent

**Vigência:** 29/09/2026  
**Status:** obrigatório  
**Decisão:** D-065

## Regra

O uso do **Railway AI Agent é proibido** em qualquer atividade do TriBusca.

A proibição vale para leitura e escrita, incluindo:

- consulta de estado;
- diagnóstico e troubleshooting;
- recomendações operacionais;
- serviços e configurações;
- variáveis;
- logs;
- banco e SQL;
- migrations;
- deploy/redeploy;
- runs;
- validação produtiva;
- qualquer mudança ou ação administrativa.

## O que continua permitido

Railway continua sendo infraestrutura aprovada do TriBusca. Podem ser usados, conforme o gate e a autorização aplicável:

- Railway Dashboard;
- Railway CLI;
- Railway API;
- conectores oficiais que **não** sejam o Railway AI Agent;
- logs nativos;
- scripts, CLIs e runbooks versionados do próprio TriBusca.

## Evidência e gates

Nenhum gate, review, handoff ou parecer pode depender do Railway AI Agent.

Se uma evidência não estiver acessível por um meio permitido:

1. usar outra fonte oficial não-AI quando disponível;
2. se não houver, registrar o subitem como `NOT_PROVEN`;
3. bloquear somente a etapa que realmente dependa dessa prova, conforme Governança Flexível v2.

Nunca usar o Railway AI Agent para converter `NOT_PROVEN` em `PASS`.

## Prompts e agentes

Nenhum prompt futuro pode instruir um executor, revisor ou gerente a usar o Railway AI Agent.

Se um prompt antigo contiver essa instrução, a parte incompatível deve ser ignorada/substituída por meio permitido, mantendo o restante do escopo.

## Relação com D-064

A autonomia operacional da D-064 permanece vigente para operações autorizadas, **exceto quanto ao Railway AI Agent**.

D-065 tem precedência específica: autonomia para operar Railway não significa autorização para usar o Railway AI Agent.

## Segurança

Esta política não amplia permissões de produção, não dispensa revisão independente, não autoriza migrations, deploys, SQL produtivo ou mudanças de secrets por si só.

Todas as demais regras de [SECURITY.md](SECURITY.md), gates e autorizações continuam válidas.
