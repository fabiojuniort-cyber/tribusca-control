# Protocolo de trabalho TriBusca (v1, 10/10/2026)

Vale para qualquer modelo (GPT, Claude, Codex, Claude Code). Os papéis são fixos; quem os ocupa muda conforme o limite de uso do Fábio. A continuidade vem destes arquivos, não do modelo.

## Papéis
- **COORD:** quebra o pedido do Fábio em tarefas, mantém `TAREFAS.md`, revisa entregas. Não implementa.
- **EXEC:** executa uma tarefa por vez, grava o checkpoint e reporta.
- **Fábio:** aprova escopo e leva os prompts entre janelas. Nenhum chat age sozinho no tempo.

## Nome do chat
Todo chat se identifica na primeira linha de cada resposta: `<MODELO>-<PAPEL>` (ex.: `CLAUDE-COORD`, `GPT-EXEC`). Ao receber um prompt, o chat registra o campo `DE:` e devolve a resposta final para ele.

## Regra de simplicidade (prioridade máxima)
1. Implementar só o que a tarefa pede. Nada de validação, hardening, backfill, retroativo ou "robustez extra" sem pedido.
2. Antes de codar, propor em até 5 linhas o que muda e por que é o mínimo. Aguardar o OK do Fábio.
3. Coleta: somente o dia corrente, salvo instrução contrária.
4. Preferir remover a adicionar. Nenhum script, migration, dependência ou serviço Railway novo sem aprovação.
5. Na dúvida entre simples e completo, escolher o simples e perguntar.

## Execução
- Tarefa vem numerada, com critério de pronto. Executar **todos** os itens e **somente** eles.
- Item sem evidência (arquivo, teste, run, commit) conta como não feito.
- Não trocar a solução pedida por outra sem aprovação. Ideias extras vão em "Sugestões", sem implementar.

## Subagentes
- Usar quando pertinente: partes **independentes** que podem rodar em paralelo (ex.: ler código e consultar Railway), ou leitura/varredura grande que poluiria o contexto principal (ex.: inventários).
- Não usar em tarefa pequena ou sequencial: custa mais tokens do que economiza.
- Cada subagente recebe escopo fechado e devolve só o resumo com evidências. As regras deste protocolo valem para ele.
- Ao propor o mínimo (regra 2), dizer se vai usar subagentes e para quê.
- Disponível em Codex e Claude Code; em chat comum, ignorar.

## Checkpoint
- Arquivo: `checkpoints/<ID-TAREFA>.md`, no formato de `checkpoints/_MODELO.md`.
- Gravar **ao fim de cada passo** (não a cada X minutos: chat não age no relógio).
- Ao iniciar ou ao travar: **ler o checkpoint primeiro** e continuar do "Próximo passo". Nunca recomeçar do zero.
- Chat sem GitHub: o Fábio cola o checkpoint na conversa.

## Economia de tokens
- Ler só: este protocolo, a linha da tarefa em `TAREFAS.md` e o checkpoint dela. Abrir outros arquivos só se a tarefa exigir.
- Respostas curtas. Não repetir contexto já gravado.

## % de avanço (calculado, nunca estimado)
- Tarefa = passos concluídos ÷ passos planejados.
- Frente = tarefas concluídas ÷ tarefas da frente.

## Formato obrigatório de retorno
```
DE: <chat> | TAREFA: <ID> | Tarefa: x/y (z%) | Frente <NOME>: x/y (z%)
Feito: <item → evidência>
Falta: <itens>
Bloqueio: <ou "nenhum">
Sugestões (não implementadas): <ou "nenhuma">
Próxima ação: <uma frase>
Prompt pronto (PARA: <chat>):
<texto pronto para colar>
```
