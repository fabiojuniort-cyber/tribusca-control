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

## Prompt de delegação: identificação, numeração e bloco copiável

Antes de qualquer lista de passos, o prompt enviado a um novo chat ou a um chat retomado para uma nova atividade deve declarar o vínculo operacional da tarefa. O cabeçalho mínimo é:

- **Atividade:** identificador sequencial visível e estável dentro da frente ou namespace, por exemplo `GOV-01`.
- **Título:** nome curto e objetivo da atividade.
- **Especialidade do chat:** Backend, Design/UX, Arquitetura, Governança ou outra especialidade pertinente.
- **Papel:** Executor ou Revisor independente.
- **Modelo:** modelo designado explicitamente, sem deixar implícito pelo ambiente.
- **Frente:** fonte, produto ou trilha de trabalho (por exemplo, DOE-SP ou Governança TriBusca).
- **Issue:** número e, preferencialmente, URL completa da Issue de governança.
- **Resultado esperado:** entrega/gate objetivo que encerra a delegação.

Repositório, branch e PR devem ser adicionados quando existirem. Especialidade, papel e modelo não podem ser inferidos apenas pela Issue ou pelo nome do chat. **Preserve todo identificador já emitido:** cada frente mantém sua própria sequência; uma atividade `GOV-01` não renumera nem reaproveita números de DOE-SP. Os passos executáveis do prompt são sempre numerados.

O Gerente apresenta **todo direcionamento a executor ou revisor em um único bloco isolado e copiável, contendo somente a mensagem que o usuário deve enviar àquele chat**. Dentro do bloco, o Gerente pode escolher a linguagem mais eficiente para execução — inclusive termos técnicos, IDs, links, referências e formato compacto — desde que o comando permaneça inequívoco quanto a papel, escopo, autorização, dependências, critérios de aceite, bloqueios e retorno esperado. Análise do Gerente, status da atividade, percentual, evidências, justificativas e explicações em linguagem clara ao usuário permanecem fora do bloco. Se um prompt antigo não cumprir identificação, numeração ou isolamento, o Gerente corrige o formato na próxima delegação antes de iniciar nova execução.

## Processo em cada avanço

1. O Gerente envia ao GPT-5.6 o prompt no formato obrigatório, com atividade/título, especialidade, papel, modelo, frente, Issue, resultado esperado, contexto mínimo, autorização vigente, critérios e até cinco passos independentes numerados; pode demandar uma leitura inicial para descobrir o estado.
2. O executor verifica evidências ao vivo, avança autonomamente em todas as etapas autorizadas e registra fatos, erros e limites na Issue/PR. Um erro interrompe somente os passos dependentes: o executor faz o restante seguro e devolve o problema ao Gerente, sem mascará-lo.
3. O executor ou revisor devolve ao Gerente **um único bloco copiável contendo somente o handoff destinado ao Gerente**. Esse handoff pode ser técnico e compacto para otimizar análise, desde que preserve fatos, hipóteses rotuladas, IDs, links, resultados, falhas, gates, evidências necessárias e próxima ação; segredos continuam proibidos. Comentários ao usuário permanecem fora do bloco.
4. O Gerente analisa integralmente o retorno, confronta critérios, identifica causa comprovada versus hipótese e dá novo direcionamento. Depois da análise, **traduz o handoff em um resumo claro ao usuário** antes de indicar o próximo passo. Se o gate depender de comprovação independente, designa outro GPT-5.6 para revisão; não se atribui uma auditoria direta.
5. **A cada avanço comunicado ao usuário**, o Gerente informa fora de qualquer bloco destinado a agente: ID/título/frente; resultado do avanço (`sucesso`, `falha`, `bloqueada` ou `em andamento`); evidência breve; próximo passo; percentual estimado de avanço da frente; base de marcos usada no cálculo; e incerteza material da estimativa.
6. O Gerente demanda a atualização apenas dos arquivos afetados. O GPT-5.6 edita os arquivos, verifica links e coerência, retorna commit, caminhos alterados, resumo das mudanças e status da Issue. Pode fazer a atualização factual no próprio handoff se o escopo já determinar os fatos; nenhuma conclusão produtiva sem gate do Gerente.
7. O Gerente incorpora a confirmação documental ao seu próximo prompt. Se faltar registro comprovado, o marco permanece aberto e a primeira ação delegada é corrigi-lo.

Não regravar tudo a cada mensagem. A Issue contém detalhes; índices guardam síntese com data e links. Issues e cartões não criam nem sincronizam chats.

## Comunicação bilateral em blocos copiáveis

A separação entre comunicação operacional e explicação ao usuário vale nos dois sentidos:

- **Gerente → executor/revisor:** um único bloco copiável contém somente o direcionamento destinado ao agente. A linguagem pode ser técnica e compacta, desde que preserve comando inequívoco e todos os limites operacionais.
- **Executor/revisor → Gerente:** um único bloco copiável contém somente o handoff destinado ao Gerente. Pode priorizar densidade técnica e estrutura para análise, sem omitir evidências necessárias nem expor segredos.
- **Gerente → usuário:** fora desses blocos, o Gerente apresenta em linguagem clara o resultado do avanço, a evidência essencial, o percentual estimado da frente, a incerteza e o próximo passo.

O bloco operacional não precisa ser imediatamente compreensível ao usuário; a responsabilidade de tradução para linguagem clara é do Gerente ao analisar o retorno.

## Progresso por marcos verificáveis

O percentual é uma **estimativa operacional**, não um gate e não uma declaração de conclusão. Cada frente deve ter uma base explícita de marcos verificáveis derivada da Issue, roadmap e gates aplicáveis. No início da frente, ou no primeiro avanço após esta regra, o Gerente lista os marcos e seus pesos; os pesos somam 100%. Se não houver justificativa para pesos diferentes, use pesos iguais. Um marco só recebe crédito na proporção comprovada por subetapas objetivas; sem evidência, permanece em 0%. O percentual da frente é a soma dos pesos comprovados.

A cada atualização, identifique também a incerteza que possa alterar a estimativa (por exemplo, `baixa`, `média` ou `alta`) e o motivo. CI verde, merge, deploy ou porcentagem alta **não substituem revisão independente, gate produtivo ou outro critério formal**.

Ao **encerrar uma frente e iniciar outra**, o Gerente acrescenta ao status:
- resumo dos passos restantes até a conclusão do projeto;
- estimativa fundamentada do percentual do projeto total;
- base de marcos usada no cálculo do projeto total e incertezas relevantes.

O percentual do projeto total segue a mesma lógica: marcos verificáveis do roadmap, com pesos explícitos e sem tratar trabalho ainda não validado como concluído.

## Novo chat / nova frente — leitura direta do Gerente

- Ao receber “Carregue o Gerente Geral do Repositório”, o **GPT-6 acessa diretamente o `tribusca-control` somente para leitura**: `CONTEXT.md` → `PROJECT_STATE.md` → Issue ativa, com decisões e contextos relevantes. Ele pode reler ou consultar evidências em qualquer momento; faz verificações somente leitura se forem úteis à análise. Não exige chat GPT-5.6 de bootstrap. Se faltar ferramenta de leitura, informa a limitação e solicita apenas o dado necessário, sem alegar verificação inexistente.
- Um chat GPT-5.6 especialista novo lê `contexts/EXECUTOR.md` ou `contexts/REVIEWER.md`, o índice `contexts/BACKEND.md`/`WEB.md`, o da frente e a Issue; contexto mínimo uma vez ao início. Na mesma janela, lê apenas o que mudou. Em nova Issue/janela ou mudança de direção, recarrega o índice curto e a Issue.
- Após cada handoff que altere o estado, o Gerente determina a atualização documental; o executor faz a edição, devolve o link/commit e o usuário entrega o retorno ao Gerente. O Gerente pode conferir diretamente em modo somente leitura; todo registro, correção ou atualização é feito por GPT-5.6 delegado. Se duas evidências discordarem, pede uma inspeção independente em chat GPT-5.6.
- Todos os prompts de execução incluem: avanço autônomo no escopo, retorno imediato de bloqueio com evidência, não prosseguir em caminho dependente e atualização dos contextos pertinentes. Automação entre chats não está implícita.
