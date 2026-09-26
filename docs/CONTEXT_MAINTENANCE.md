# TriBusca — manutenção dos contextos entre chats

## Regra central

GitHub é o contexto durável; memória de chat é apenas apoio. O contexto curto aponta para as evidências vivas, com data e verificação. Um novo chat não recebe automaticamente o histórico de outro chat. Nenhuma mudança em GitHub, Railway ou produção atualiza estes arquivos sozinha.

## Matriz de propriedade

**Gerente Geral GPT-6:** pode ler diretamente e sempre que necessário os contextos e evidências em GitHub, código, CI e ambientes por meios somente leitura; decide conteúdo e solicita edições. Nunca escreve nem realiza ação que altere estado. **Executor GPT-5.6 designado:** faz toda leitura/escrita e entrega link, commit e resumo do diff. O revisor GPT-5.6 verifica alterações relevantes separadamente quando o risco exigir.

| Fonte | Responsável pela decisão | Responsável pela edição | Gatilho |
| --- | --- | --- | --- |
| `CONTEXT.md`, `PROJECT_STATE.md` | Gerente Geral | GPT-5.6 delegado | Handoff analisado, decisão, bloqueio, prioridade ou gate |
| `ROADMAP.md`, `DECISIONS.md` | Gerente Geral | GPT-5.6 delegado | Ordem ou decisão aprovada muda |
| Produto, UX, site, marca e `docs/OPEN_QUESTIONS.md` | Gerente Geral | GPT-5.6 delegado | Decisão/proposta de recurso, layout, design, ferramenta ou negócio |
| `contexts/` e `AGENTS.md` | Gerente Geral | GPT-5.6 delegado | Entrada de nova frente, erro, alteração de protocolo ou fechamento |
| Issue de governança | Gerente Geral (gate) e GPT-5.6 (evidências) | GPT-5.6 delegado | PR, revisão, erro, deploy/run e handoff |
| Documentação no repositório de código | Gerente Geral (escopo) | Executor GPT-5.6 via PR | Contrato, comportamento ou operação muda |

## Autorização de manutenção

O responsável pelo projeto autorizou a manutenção recorrente da documentação de governança. O Gerente decide e delega; o GPT-5.6 executa e comprova a atualização. Não pedir confirmação rotineira para cada edição documental. Essa autorização não libera merge, deploy, migration, alteração de secrets, operação destrutiva ou outra ação produtiva sem escopo e gate autorizado. Se o executor não conseguir escrever, deve devolver o patch/texto exato ao Gerente e manter o marco aberto.

## Cabeçalho obrigatório de delegação

Antes de qualquer lista de passos, o prompt enviado a um novo chat ou a um chat retomado para uma nova Issue deve declarar o vínculo operacional da tarefa. O cabeçalho mínimo é:

- **Especialidade do chat:** Backend, Design/UX, Arquitetura, Governança ou outra especialidade pertinente.
- **Papel:** Executor ou Revisor independente.
- **Modelo:** modelo designado explicitamente, sem deixar implícito pelo ambiente.
- **Frente:** fonte, produto ou trilha de trabalho (por exemplo, DOE-SP).
- **Issue:** número e, preferencialmente, URL completa da Issue de governança.
- **Resultado esperado:** entrega/gate objetivo que encerra a delegação.

Repositório, branch e PR devem ser adicionados quando existirem. Especialidade, papel e modelo não podem ser inferidos apenas pela Issue ou pelo nome do chat. Se o Gerente detectar um prompt antigo sem esses campos, deve corrigi-lo na próxima delegação antes de iniciar nova execução.

## Processo em cada avanço

1. O Gerente envia ao GPT-5.6 o cabeçalho obrigatório de delegação (especialidade, papel, modelo, frente, Issue e resultado esperado), contexto mínimo, autorização vigente, critérios e até cinco passos independentes; pode demandar uma leitura inicial para descobrir o estado.
2. O executor verifica evidências ao vivo, avança autonomamente em todas as etapas autorizadas e registra fatos, erros e limites na Issue/PR. Um erro interrompe somente os passos dependentes: o executor faz o restante seguro e devolve o problema ao Gerente, sem mascará-lo.
3. O Gerente analisa integralmente o retorno, confronta critérios, identifica causa comprovada versus hipótese e dá novo direcionamento. Se o gate depender de comprovação independente, designa outro GPT-5.6 para revisão; não se atribui uma auditoria direta.
4. O Gerente demanda a atualização apenas dos arquivos afetados. O GPT-5.6 edita os arquivos, verifica links e coerência, retorna commit, caminhos alterados, resumo das mudanças e status da Issue. Pode fazer a atualização factual no próprio handoff se o escopo já determinar os fatos; nenhuma conclusão produtiva sem gate do Gerente.
5. O Gerente incorpora a confirmação documental ao seu próximo prompt. Se faltar registro comprovado, o marco permanece aberto e a primeira ação delegada é corrigi-lo.

Não regravar tudo a cada mensagem. A Issue contém detalhes; índices guardam síntese com data e links. Issues e cartões não criam nem sincronizam chats.

## Novo chat / nova frente — leitura direta do Gerente

- Ao receber “Carregue o Gerente Geral do Repositório”, o **GPT-6 acessa diretamente o `tribusca-control` somente para leitura**: `CONTEXT.md` → `PROJECT_STATE.md` → Issue ativa, com decisões e contextos relevantes. Ele pode reler ou consultar evidências em qualquer momento; faz verificações somente leitura se forem úteis à análise. Não exige chat GPT-5.6 de bootstrap. Se faltar ferramenta de leitura, informa a limitação e solicita apenas o dado necessário, sem alegar verificação inexistente.
- Um chat GPT-5.6 especialista novo lê `contexts/EXECUTOR.md` ou `contexts/REVIEWER.md`, o índice `contexts/BACKEND.md`/`WEB.md`, o da frente e a Issue; contexto mínimo uma vez ao início. Na mesma janela, lê apenas o que mudou. Em nova Issue/janela ou mudança de direção, recarrega o índice curto e a Issue.
- Após cada handoff que altere o estado, o Gerente determina a atualização documental; o executor faz a edição, devolve o link/commit e o usuário entrega o retorno ao Gerente. O Gerente pode conferir diretamente em modo somente leitura; todo registro, correção ou atualização é feito por GPT-5.6 delegado. Se duas evidências discordarem, pede uma inspeção independente em chat GPT-5.6.
- Todos os prompts de execução incluem: avanço autônomo no escopo, retorno imediato de bloqueio com evidência, não prosseguir em caminho dependente e atualização dos contextos pertinentes. Automação entre chats não está implícita.
