# TriBusca — manutenção dos contextos entre chats

## Regra central

GitHub é o contexto durável; memória de chat é apenas apoio. O contexto curto aponta para as evidências vivas, com data e verificação. Um novo chat não recebe automaticamente o histórico de outro chat. Nenhuma mudança em GitHub, Railway ou produção atualiza estes arquivos sozinha.

## Matriz de propriedade

| Fonte | Quem mantém | Quando atualizar |
| --- | --- | --- |
| `CONTEXT.md` e `PROJECT_STATE.md` | Gerente Geral | Após auditar handoff, decisão, bloqueio, mudança da prioridade ou gate produtivo |
| `ROADMAP.md` e `DECISIONS.md` | Gerente Geral | Quando a ordem ou uma decisão aprovada muda |
| `contexts/BACKEND.md`, `WEB.md`, `DOE-SP.md` e novos índices de frente | Gerente Geral | Ao abrir, trocar bloqueio/Issue ativa, encerrar ou alterar direção |
| Issue de governança | Executor, revisor e Gerente | A cada PR/head relevante, revisão, falha, deploy/run e handoff; o Gerente confere |
| Documentação técnica no repositório de código | Executor via PR | Quando contrato, comportamento, runbook ou operação mudam; revisão e gate seguem a Issue |
| `AGENTS.md` e templates | Gerente Geral | Quando o protocolo de agentes muda; atualizar links sem copiar estado operacional |

## Autorização de manutenção

O responsável pelo projeto autorizou o Gerente Geral a atualizar autonomamente os arquivos de governança e contextos no `tribusca-control` quando houver mudança verificada. Não solicitar confirmação rotineira para cada edição documental. A autorização não se estende a merge/deploy/migration ou ações produtivas sem escopo autorizado. O gerente registra a evidência e deixa o próximo chat capaz de retomar o trabalho.

## Processo em cada avanço

1. Agente lê `AGENTS.md` do repositório de código, o contexto da frente e a Issue atual.
2. Durante trabalho, coloca evidências no PR/Issue; dados sensíveis são omitidos.
3. Antes de declarar concluída sua tarefa, preenche [HANDOFF.md](HANDOFF.md) na Issue e explicita quais arquivos de contexto/documentação devem mudar. Se houver alteração técnica, entrega a documentação técnica no próprio PR.
4. Gerente audita evidências. Na mesma sessão, atualiza os índices e o estado executivo afetados, remove snapshot obsoleto e registra a próxima Issue; verifica os links.
5. Quando a escrita falhar ou não houver permissão, o retorno inclui um patch/texto exato pendente; o marco permanece aberto até a atualização registrada.

Não regravar todos os arquivos em toda conversa: alterar apenas os afetados. O contexto do backend e o do frontend compartilham links para decisões e estado, sem duplicar contagens mutáveis. A Issue é a fonte dos detalhes de execução; um cartão no Projects não inicia agentes nem prova conclusão.

## Novo chat / nova frente

- Gerente: `CONTEXT.md` → `PROJECT_STATE.md` → Issue ativa.
- Executor backend: `contexts/BACKEND.md` → contexto da frente → Issue → código.
- Executor frontend: `contexts/WEB.md` → Issue → código.
- Revisor: `contexts/REVIEWER.md` → Issue → PR/diff.
- Nova frente: criar Issue e um índice curto `contexts/<FRENTE>.md` quando precisar de mais contexto do que a Issue comporta; usar links e critérios, sem copiar logs extensos.

Ao usar outro chat/ferramenta, forneça o link do contexto e da Issue. Atualizações recorrentes em background exigiriam automação própria e permissões; este protocolo opera por marcos auditados.
