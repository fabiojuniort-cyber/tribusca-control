# ANAT — checkpoint de execução

Origem: **CLAUDE-COORD → GPT-EXEC**, encaminhado pelo Fábio em 15/10/2026. Coordenação e checkpoints: [issue #116](https://github.com/fabiojuniort-cyber/tribusca-control/issues/116). Branch `docs/anat-00-anatomia-do-ato`, [PR #115](https://github.com/fabiojuniort-cyber/tribusca-control/pull/115).

## Base e andamento

O bloqueio inicial por anexo ausente foi superado pela confirmação direta do Fábio: seguir o desenho do repositório gerado pelo GPT-6 Astra. As seções 1–10 foram preservadas. A seção 11 formaliza a mensagem encaminhada por CLAUDE-COORD, a confirmação da base e os gates, sem atribuir parecer não recebido ao COORD.

ANAT-01 registrada no commit `12dd5549e3b5770bbbee62220b6df41f14f24fe6`, mensagem `docs(anat): revisão COORD + decisões do Fábio`.

Pacote de entregas: [docs/anat/README.md](anat/README.md). Inclui relatório ANAT-02, SQL para execução humana no Dashboard, 30 fichas, anotação dos dois convênios e planilha ANAT-03 com 2.434 linhas e 10 eventos de atos posteriores. Verificações e limitações constam no pacote.

## Dependências para fechar

**Continuidade de quatro horas — primeiro checkpoint, 16/10/2026:** [complemento documental](anat/continuidade-4h/README.md). As 105 notas remanescentes foram triadas: 44 receberam relações candidatas para 89 IDs adicionais; 61 permanecem sem candidato individual justificado. União dos mapas: 115 notas com candidatos para 166 IDs únicos. Ratificação 104/21 confirmada no CONFAZ e AD 16/21 completo: ato de 26/07/2021, publicação em 27/07/2021; efeitos expressos em 01/01/2022. DOU integral não conferido. Controle de oito atos: 49 pares/47 IDs, incluindo três âncoras indiretas. Dataset e planilha intactos; duas aprovações restritas preservadas. A janela segue até 05:36:51 BRT, com fila remanescente no complemento.

**Lote autônomo de 16/10/2026:** Fábio confirmou somente `ANAT03-00342` e `ANAT03-00961`, ambas ocorrências de `8450.11.00`, para marcação histórica/revogação e exclusão do texto corrente do piloto. Registro em JSON e planilha; duas aprovações, 2.432 demais linhas pendentes. Inventário de notas, oito atos modificadores, auditoria e cinco blocos de conferência: [fechamento do lote](anat/lote-autonomo/FECHAMENTO.md). Não há aprovação de uso vigente.

Os PDFs enviados pelo Fábio foram inspecionados visualmente: 100/97, oito páginas; 52/91, 62 páginas. [Relatório e páginas de referência](anat/pdf-conferencia/README.md). A revisão encontrou erros de associação de notas no dossiê e aplicou 77 revisões pontuais; os demais vínculos agregados do 52/91 ficaram marcados como contexto pendente. Textos, códigos, IDs e situações pendentes preservados. Nenhuma aprovação jurídica foi inferida do envio dos arquivos.

- **HTML persistido confirmado:** Fábio executou manualmente o SELECT de confirmação no Dashboard. As versões `8f1a2386-30fc-4f11-a88a-e96a65807793` (100/97) e `ec18e755-128c-41ca-8cd3-2bdad7d9d9eb` (52/91) retornaram `IGUAL AO SNAPSHOT SANITIZADO`, com 45548 e 394092 bytes. As classes/contagens da reprodução local estão confirmadas para esses HTMLs por igualdade SHA-256. Consulta e retorno humano versionados no pacote. Não representa auditoria de `content_text`/RLS nem execução integral do diagnóstico ampliado.
- **Conferência individual parcial:** duas marcações históricas/revogação confirmadas pelo Fábio; 2.432 demais linhas pendentes. A pesquisa temporal não é exaustiva; dependências não lidas permanecem pendentes. Prazos gerais não homologam cada trecho.
- **Implementação não autorizada:** sem código de produto, migrations, escrita no banco, coleta, merge, deploy ou alteração Railway. Railway AI Agent não foi usado.

Retorno a CLAUDE-COORD registrado na issue #116 e entregue ao Fábio neste chat. Não presumir sincronização automática entre chats.
