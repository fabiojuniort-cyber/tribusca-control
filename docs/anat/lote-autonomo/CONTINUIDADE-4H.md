# Continuidade ANAT por quatro horas

Origem: CLAUDE-COORD → GPT-EXEC. Autorização de Fábio nesta conversa em 16/10/2026: continuar as atividades pelas próximas quatro horas.

Janela: 01:36:51–05:36:51 BRT de 16/10/2026 (04:36:51–08:36:51 UTC). Classificação R0 documental e R1 somente leitura. Base verificada: `99e21168f31b79c95d4f2099afb49acf12ba422c`, checkout limpo.

Continuidade criada no próprio chat pelo agendador do app, identificador `anat-lote-documental-por-4-horas`, ativa no momento da criação, com limite temporal e verificação do horário antes de novos trabalhos. O agendamento registra intenção de execução; resultados dependem das execuções e devem ter evidência própria.

## Fila em ordem

1. Triar as 105 notas ainda sem vínculo no inventário `notas/notas-alvos.json`. Separar escopo explícito, ambiguidade e ausência de alvo; só propor associação documental sustentada.
2. Verificar dependências em fontes oficiais, em especial a ratificação do Convênio 104/21. Registrar tentativas limitadas e pendências quando não houver prova.
3. Conferir IDs, caminhos, literais, códigos e datas das propostas novas. Não propagar notas por proximidade nem misturar redações históricas.
4. Atualizar relatórios e pequenos blocos para conferência visual de Fábio; salvar evidências no repositório e checkpoints na issue #116.
5. Ao terminar a fila ou atingir o limite, encerrar novos trabalhos e registrar SHA, arquivos, contagens, limites e pendências.

## Limites preservados

Somente ANAT03-00342 e ANAT03-00961 têm aprovação humana restrita, sem elegibilidade para texto corrente. Os outros 2.432 trechos permanecem pendentes de aprovação; novas evidências não autorizam aprovação automática. Candidatos documentais devem permanecer distintos de decisões jurídicas.

Proibidos código de produto, migrations, escrita no banco, coleta operacional, merge, deploy, Railway AI Agent e alterações Railway. `sources/` permanece somente leitura. Decisão de produto, BLOCK ou necessidade de escrita em produção interrompem a parte dependente. Preservar trabalhos concorrentes e não usar force push.

Checkpoints: https://github.com/fabiojuniort-cyber/tribusca-control/issues/116

PR documental: https://github.com/fabiojuniort-cyber/tribusca-control/pull/115

Este documento registra a fila autorizada e a configuração da continuidade. Não afirma que o lote de quatro horas já foi executado.
