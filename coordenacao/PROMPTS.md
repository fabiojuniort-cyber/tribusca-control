# Prompts padrão (substituir <...>)

## Iniciar execução
DE: <chat> | PARA: <chat> | TAREFA: <ID>
Leia `coordenacao/PROTOCOLO.md`, a linha <ID> de `coordenacao/TAREFAS.md` e `coordenacao/checkpoints/<ID>.md` (crie a partir de `_MODELO.md` se não existir). Siga o protocolo: use subagentes quando pertinente; proponha o mínimo em até 5 linhas e aguarde meu OK antes de codar. Grave o checkpoint ao fim de cada passo. Responda no formato de retorno do protocolo, devolvendo para <chat DE>.

## Retomar após travar ou trocar de modelo
DE: <chat> | PARA: <chat> | TAREFA: <ID>
Retome a tarefa <ID>. Leia só `coordenacao/PROTOCOLO.md` e `coordenacao/checkpoints/<ID>.md`. Continue do "Próximo passo", sem refazer o que está marcado. Responda no formato de retorno.

## Pedir revisão ao COORD
DE: <chat> | PARA: <COORD> | TAREFA: <ID>
Revise a entrega de <ID>: confira item a item contra o critério de pronto em `TAREFAS.md`, aponte o que faltou e o que veio sem ser pedido. Atualize o status e devolva o próximo prompt.
