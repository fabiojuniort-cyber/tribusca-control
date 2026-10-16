# ANAT — checkpoint de execução

Origem: **CLAUDE-COORD → GPT-EXEC**, encaminhado pelo Fábio em 15/10/2026. Coordenação e checkpoints: [issue #116](https://github.com/fabiojuniort-cyber/tribusca-control/issues/116). Branch `docs/anat-00-anatomia-do-ato`, [PR #115](https://github.com/fabiojuniort-cyber/tribusca-control/pull/115).

## Base e andamento

O bloqueio inicial por anexo ausente foi superado pela confirmação direta do Fábio: seguir o desenho do repositório gerado pelo GPT-6 Astra. As seções 1–10 foram preservadas. A seção 11 formaliza a mensagem encaminhada por CLAUDE-COORD, a confirmação da base e os gates, sem atribuir parecer não recebido ao COORD.

ANAT-01 registrada no commit `12dd5549e3b5770bbbee62220b6df41f14f24fe6`, mensagem `docs(anat): revisão COORD + decisões do Fábio`.

Pacote de entregas: [docs/anat/README.md](anat/README.md). Inclui relatório ANAT-02, SQL para execução humana no Dashboard, 30 fichas, anotação dos dois convênios e planilha ANAT-03 com 2.434 linhas e 10 eventos de atos posteriores. Verificações e limitações constam no pacote.

## Dependências para fechar

- **Leitura persistida pendente:** runner existente não aceita consultas ANAT; nenhum SELECT produtivo foi executado. O SQL foi preparado conforme a alternativa autorizada. Classes do banco não foram presumidas a partir da reprodução local.
- **Conferência visual pendente:** todas as situações propostas da planilha aguardam Fábio. A pesquisa temporal não é exaustiva; dependências não lidas permanecem pendentes. Prazos gerais não homologam cada trecho.
- **Implementação não autorizada:** sem código de produto, migrations, escrita no banco, coleta, merge, deploy ou alteração Railway. Railway AI Agent não foi usado.

Retorno a CLAUDE-COORD registrado na issue #116 e entregue ao Fábio neste chat. Não presumir sincronização automática entre chats.
