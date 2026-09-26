# TriBusca — contexto de retomada do Gerente Geral

Base operacional registrada em 26/09/2026; protocolo de papéis atualizado em 26/09/2026. Este arquivo pode ser lido diretamente pelo Gerente GPT-6 ao iniciar ou retomar uma conversa e relido sempre que necessário. Não existe chat intermediário de bootstrap. É um índice executivo: evidências detalhadas permanecem nas Issues, PRs e documentos vinculados. Um executor revalida o estado vivo antes de decisões operacionais.

## Missão e limites desta conversa

**Protocolo vigente de 26/09/2026:** o Gerente Geral GPT-6 pode acessar **sempre em modo somente leitura** o contexto e as evidências pertinentes, incluindo GitHub, código, CI, Railway e PostgreSQL se houver ferramenta segura de leitura. Não pode editar arquivos ou executar qualquer ação que modifique estado; delega essas ações aos GPT-5.6. Ele coordena GPT-5.6 em chats executores separados, analisa todos os erros e handoffs, confere a suficiência lógica das evidências recebidas e decide novas instruções. Os GPT-5.6 fazem a execução, verificações especializadas, escritas, implementações, revisão independente e atualizações deste repositório por delegação; o Gerente pode conferir diretamente evidências em modo leitura. O usuário abre o chat indicado e transmite o retorno; nada aqui inicia agentes automaticamente. Distinguir inspeção direta somente leitura do Gerente de evidência relatada por executor. O usuário quer máxima continuidade no escopo autorizado, mínima intermediação e até cinco passos independentes por instrução; falha em premissa interrompe apenas etapas dependentes. Não avançar ao próximo DOE sem gate SP.

## Onde está a verdade

- [Estado oficial](PROJECT_STATE.md) e [roadmap](ROADMAP.md): síntese gerencial.
- [Decisões](DECISIONS.md), [arquitetura](docs/ARCHITECTURE.md) e [segurança](docs/SECURITY.md): limites aprovados.
- [Produto e UX](docs/PRODUCT_AND_UX.md), [site/comercial](docs/SITE_AND_MARKETING.md), [Manual de Marca v1](docs/BRAND_MANUAL_V1.md), [ativos oficiais](docs/BRAND_ASSETS.md) e [questões abertas](docs/OPEN_QUESTIONS.md): recursos, layout, design, identidade e pontos ainda não decididos. O site definitivo segue pausado; conceitos planejados não significam implementação.
- [Papéis](docs/AGENT_ROLES.md), [handoff](docs/HANDOFF.md), [gates](docs/REVIEW_AND_GATES.md) e [protocolo de contexto](docs/CONTEXT_MAINTENANCE.md): contrato de execução e atualização.
- [Backend](contexts/BACKEND.md), [frontend](contexts/WEB.md) e [DOE-SP](contexts/DOE-SP.md): entradas curtas para novos chats especializados.
- [Issues da central](https://github.com/fabiojuniort-cyber/tribusca-control/issues) e [quadro](https://github.com/users/fabiojuniort-cyber/projects/1): trabalho, dependências e progresso.
- [Backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend) e [frontend](https://github.com/fabiojuniort-cyber/radar-fiscal-web): código; o frontend ainda não tem implementação definitiva.
- Se houver divergência, conferir Issue/PR, commit, Railway e PostgreSQL ao vivo. A data acima é a data da última atualização do arquivo, não garantia de produção atual.

## Ponto de retomada verificado

- DOE-SP segue **ABERTO**; o bootstrap completo 2025-01-01 → data atual e os gates produtivos ainda não foram comprovados.
- [Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1), P0, segue aberta/In Progress. A Atividade DOE-SP-20 realizou a terceira revisão independente do [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) no head `7f594c5b563ed9cb66c63e1f93b367150573c651`. A reserva de `artifactEquivalence`, `artifactReconciliation` e `artifactReconciliationHistory` contra metadata genérico foi aprovada, assim como replay/versionamento/identidade/proveniência. O gate, porém, foi **REPROVADO** porque `safeAuditIdentifier()` ainda usa blacklist finita e permite credenciais/segredos opacos em campos allowlisted do history, por exemplo padrões sintéticos como `rk_live_...`, `AIzaSy...` e `AKIA...`. Parecer: https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71#pullrequestreview-5324781362.
- [PR #71 do backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) permanece OPEN e unmerged no head `7f594c5b563ed9cb66c63e1f93b367150573c651`, baseado na main `f25a596edce592e6e365e87ed4cbf16ba0922de8` e 0 commits atrás. O CI #390 / run `36220906841` continua SUCCESS, mas **não supera a revisão bloqueante**. Merge, deploy, migration, coleta e repair produtivo continuam não autorizados.
- O último bloqueio histórico transmitido foi 29/07/2025 com 399 dias pendentes. Não interpretar como leitura produtiva atual.
- [Issue #2](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2): bootstrap e replay, depende da #1.
- [Issue #3](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3): artefatos e política de `publication_files`, depende da #1.
- [Issue #4](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4): fechamento formal DOE-SP, depende de #1–#3.
- [Issue #5](https://github.com/fabiojuniort-cyber/tribusca-control/issues/5): validar o ciclo de governança com uma entrega real; permanece aberta.
- [Backend PR #72 de governança](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/72) foi incorporado com autorização, commit `f25a596edce592e6e365e87ed4cbf16ba0922de8`; `AGENTS.md` e template estão na main. CI #382 e deploys automáticos Backend `d0e39486-cdff-4ff1-9531-04a4f3b4dedd`, Worker `cfcb6909-ce88-4694-b493-daf7aa302bc7`, Scheduler `c34c8850-6c48-4d16-a0a4-14f817184d5d`: SUCCESS. Esse marco de governança não fecha DOE-SP. O frontend tem apenas arquivos de governança e nenhuma implementação da aplicação. Leia [protocolo de atualização](docs/CONTEXT_MAINTENANCE.md) ao iniciar nova frente.
- Seis labels já criadas (`P0`–`P3`, `doe-sp`, `governanca`); cinco Issues importadas no Projects. O conector GitHub usado nesta conversa edita Issues e arquivos, mas não move cartões no Projects.

## Próxima passagem

Devolver o PR #71 a executor GPT-5.6 para corrigir o bloqueio restante da terceira revisão: substituir a blacklist de credenciais/segredos em `safeAuditIdentifier()` por validação positiva dos IDs auditáveis ou omitir esses IDs do `artifactReconciliationHistory` quando não houver formato seguro comprovável. Adicionar contraexemplos para credenciais opacas sintéticas como `rk_live_...`, `AIzaSy...` e `AKIA...`, sem alterar a prova corrente nem o resultado da reconciliação. Depois gerar novo head sobre a main vigente, reexecutar CI completo e devolver para nova revisão independente. Merge, deploy, migration, coleta manual e repair produtivo continuam fora do escopo.

## Atualização obrigatória a cada marco

**Objetivo permanente:** abrir nova janela do Gerente a qualquer momento com pouco contexto no chat e sem perder decisões. Depois de cada avanço, erro, decisão ou bloqueio, o Gerente GPT-6 analisa o relato e delega ao executor GPT-5.6 a edição de `CONTEXT.md`, `PROJECT_STATE.md`, Issue e índices afetados, incluindo data, evidência, dependências e próximo passo. O GPT-5.6 retorna links/commit e resumo do diff. Se o registro não for comprovado, o marco não está documentalmente fechado. Nunca tratar handoff isolado como prova de produção. A manutenção documental está autorizada; ações produtivas exigem seu próprio gate.

**Regra GOV-01 vigente desde 26/09/2026:** a comunicação operacional é bilateralmente separada em blocos copiáveis. Todo direcionamento do Gerente a executor/revisor usa bloco contendo somente a mensagem para o agente; todo retorno de executor/revisor usa bloco contendo somente o handoff para o Gerente. Ambos podem usar linguagem técnica compacta, preservando escopo, autorização, dependências, critérios, evidências, falhas, gates e próxima ação. O Gerente traduz o retorno em resumo claro ao usuário fora do bloco. Delegações usam ID sequencial por frente, título e passos numerados; em cada avanço, o Gerente informa resultado, evidência, próximo passo, percentual da frente calculado sobre marcos verificáveis e incerteza. Percentuais não substituem gates. Ao trocar de frente, registra também passos restantes e estimativa fundamentada do projeto total. A definição canônica está em [docs/CONTEXT_MAINTENANCE.md](docs/CONTEXT_MAINTENANCE.md).

## Retomada em novo chat

Comando do usuário: **“Carregue o Gerente Geral do Repositório”**. O GPT-6 abre diretamente, em modo somente leitura, `fabiojuniort-cyber/tribusca-control` e lê `CONTEXT.md`, `PROJECT_STATE.md` e a Issue ativa; consulta decisões e contextos adicionais conforme necessário. Pode voltar a ler em qualquer momento da conversa. Não pedir ao usuário que abra um chat GPT-5.6 apenas para carregar o contexto. Para mudanças, abre uma tarefa executora. Ver [procedimento](docs/CONTEXT_MAINTENANCE.md). Em outras janelas especialistas, o prompt inclui contexto curto e Issue; na mesma janela, não recarregar tudo a cada mensagem.
