# TriBusca — manutenção dos contextos entre chats

## Regra central

GitHub é o contexto durável; memória de chat é apenas apoio. O contexto curto aponta para as evidências vivas, com data e verificação. Um novo chat não recebe automaticamente o histórico de outro chat. Nenhuma mudança em GitHub, Railway ou produção atualiza estes arquivos sozinha.

## Matriz de propriedade

**Gerente Geral GPT-6:** decide o conteúdo, aponta evidências e solicita edições; não lê nem escreve nenhum local. **Executor GPT-5.6 designado:** faz toda leitura/escrita e entrega link, commit e resumo do diff. O revisor GPT-5.6 verifica alterações relevantes separadamente quando o risco exigir.

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

## Processo em cada avanço

1. O Gerente envia ao GPT-5.6 a Issue, contexto mínimo, autorização vigente, critérios e até cinco passos independentes; pode demandar uma leitura inicial para descobrir o estado.
2. O executor verifica evidências ao vivo, avança autonomamente em todas as etapas autorizadas e registra fatos, erros e limites na Issue/PR. Um erro interrompe somente os passos dependentes: o executor faz o restante seguro e devolve o problema ao Gerente, sem mascará-lo.
3. O Gerente analisa integralmente o retorno, confronta critérios, identifica causa comprovada versus hipótese e dá novo direcionamento. Se o gate depender de comprovação independente, designa outro GPT-5.6 para revisão; não se atribui uma auditoria direta.
4. O Gerente demanda a atualização apenas dos arquivos afetados. O GPT-5.6 edita os arquivos, verifica links e coerência, retorna commit, caminhos alterados, resumo das mudanças e status da Issue. Pode fazer a atualização factual no próprio handoff se o escopo já determinar os fatos; nenhuma conclusão produtiva sem gate do Gerente.
5. O Gerente incorpora a confirmação documental ao seu próximo prompt. Se faltar registro comprovado, o marco permanece aberto e a primeira ação delegada é corrigi-lo.

Não regravar tudo a cada mensagem. A Issue contém detalhes; índices guardam síntese com data e links. Issues e cartões não criam nem sincronizam chats.

## Novo chat / nova frente — bootstrap sem acesso do Gerente

- Ao receber “Carregue o Gerente Geral do Repositório”, o **GPT-6 não acessa GitHub, arquivos ou qualquer local**. Ele dá ao usuário um único prompt curto para abrir um chat GPT-5.6 de bootstrap. Esse executor lê `CONTEXT.md` → `PROJECT_STATE.md` → Issue ativa, revalida apenas premissas atuais necessárias e devolve um resumo autocontido: frente, decisões vigentes, evidências e datas, erros/bloqueios, permissões, próxima ação, links e arquivos que exigem atualização. O usuário transmite o retorno ao Gerente. Sem esse retorno, o Gerente não afirma conhecer o estado vivo.
- Um chat GPT-5.6 especialista novo lê `contexts/EXECUTOR.md` ou `contexts/REVIEWER.md`, o índice `contexts/BACKEND.md`/`WEB.md`, o da frente e a Issue; contexto mínimo uma vez ao início. Na mesma janela, lê apenas o que mudou. Em nova Issue/janela ou mudança de direção, recarrega o índice curto e a Issue.
- Após cada handoff que altere o estado, o Gerente determina a atualização documental; o executor faz a edição, devolve o link/commit e o usuário entrega o retorno ao Gerente. O Gerente jamais acessa diretamente para confirmar. Se duas evidências discordarem, pede uma inspeção independente em chat GPT-5.6.
- Todos os prompts de execução incluem: avanço autônomo no escopo, retorno imediato de bloqueio com evidência, não prosseguir em caminho dependente e atualização dos contextos pertinentes. Automação entre chats não está implícita.
