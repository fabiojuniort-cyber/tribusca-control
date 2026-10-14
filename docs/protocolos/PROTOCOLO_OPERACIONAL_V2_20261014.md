# TriFaros / TriBusca — Protocolo Operacional v2 (14/10/2026)

**Status:** decisão do Fábio, em vigor a partir de 14/10/2026.  
**Sucede:** instruções operacionais v1 para handoffs e execução; não revoga controles técnicos de proteção de dados nem [Governança Flexível R0–R3](../CLAUDE_SESSION_PROTOCOL.md).  
**Fonte de checkpoints:** issues no `tribusca-control`.

## Papéis e autorizações

- **Fábio:** decisão de produto e autorização explícita para qualquer ação que escreva ou apague dados de produção (carga, exclusão, restauração).
- **CLAUDE-COORD:** define e autoriza pacotes de etapas, seus gates e os merges/deploys abrangidos.
- **Executor:** lê a issue da frente antes de agir; segue autonomamente as etapas de um pacote autorizado enquanto os gates forem PASS; registra checkpoints e evidências na issue.
- **Revisor independente:** não é o executor quando houver controle R2/R3 aplicável.

## 1. Autorização por pacote

O COORD define um pacote com passos e gates explícitos. Dentro dele, continuidade autônoma é o padrão; **parar SOMENTE** quando ocorrer:
1. **BLOCK técnico ou de segurança**, com evidências e impacto;
2. decisão de produto ou ambiguidade material que altere o contrato;
3. **qualquer ação de escrita/exclusão/restauração de dados de produção**, mesmo prevista no pacote, até **OK explícito do Fábio**.

**Merge e deploy** só ocorrem se autorizados pelo COORD dentro de um pacote e após gates aplicáveis. Falta de prova em gate de segurança não é PASS.

## 2. Comunicação e fonte de verdade

- Checkpoints, decisões, links, SHAs, logs e pareceres na **issue de governança correspondente**:
  - F2: [#105](https://github.com/fabiojuniort-cyber/tribusca-control/pull/105) (thread de PR usada como issue);
  - F3: [#108](https://github.com/fabiojuniort-cyber/tribusca-control/issues/108);
  - OPS-02 (runner e auditoria Railway): [#79](https://github.com/fabiojuniort-cyber/tribusca-control/issues/79); histórico preliminar do runner: [#109](https://github.com/fabiojuniort-cyber/tribusca-control/issues/109);
  - Demais frentes: issue indicada pelo COORD.
- Ler a issue (incluindo comentários recentes) antes de atuar. Mensagem curta do Fábio indicando um comentário significa ler sua instrução completa na issue.
- Resposta no chat: **até 5 linhas**, com parecer, percentual, link do comentário e decisão pendente.
- Histórico não substitui estado verificado dos repositórios, ambientes e evidências.

## 3. Gates e erros

Somente **erro NOVO** em relação à baseline aprovada pode bloquear saúde operacional. Alertas existentes de **CONFAZ e CGIBS** não são novos e não bloqueiam por si sós. Divergência pequena, demonstravelmente sem risco a dados/segurança, deve ser registrada e não exige pausa.

A exceção de erros antigos **não** permite ignorar falha de integridade, segredo exposto, perda/corrupção, isolamento de ambiente, gate de aprovação ou alteração destrutiva.

## 4. Incidente F3

**Proibido** editar ou salvar regras de exclusão no painel enquanto o incidente F3 estiver aberto. Inspeções e simulações estritamente read-only continuam permitidas se autorizadas no pacote. Não alterar política efetiva, nem promover resultado de simulação a exclusão.

## 5. OPS-01 — runner GitHub Actions

O runner operacional `radar-fiscal-backend/.github/workflows/ops-runner.yml` é **somente de lista fechada**. Proibida no runner toda gravação/remoção/restauração em produção, independentemente de quem dispare o workflow.

- Operação sobre produção: apenas `SELECT`/simulação read-only ou `pg_dump` com `default_transaction_read_only=on`, usando conta restrita de leitura; nada de migrations, publicação, RESTORE, DML/DDL, purge ou scripts de coletor.
- Escritas de ensaio permitidas apenas no **PostgreSQL 18 de serviço efêmero do próprio job do GitHub Actions**, com `radar_fiscal_test`, sob os gates do writer já existente.
- Segredos configurados pelo Fábio **somente em GitHub Environment `ops`**: regras de revisão e restrição à branch `main`; nunca em comentário, código, log ou artifact.
- Entradas fixas/pinadas por commit + SHA-256, sem executar shell derivado do texto de entrada. Artifact contém somente resumo sanitizado, com retenção de 7 dias; cópias de produção, planilhas integrais e segredos jamais viram artifact.
- Ativação operacional: PR → CI PASS → inspeção read-only demonstrada → revisão independente/gate COORD → merge autorizado. Uma execução não equivale à autorização de produção.
- Se o `workflow_dispatch` só estiver disponível após o workflow ingressar na branch default, comprovar o teste de inspeção read-only pelo gatilho `pull_request` **sem segredos**, documentando a limitação; não antecipar merge.

## 6. Compatibilidade e precedência

Esta revisão atualiza **o protocolo operacional de coordenação a partir de 14/10/2026**. A [governança R0–R3 vigente](../CLAUDE_SESSION_PROTOCOL.md), os princípios de segurança, LOCKs R3, revisões independentes e autorizações explícitas de produção permanecem íntegros. Em caso de conflito aparente, prevalece a barreira mais protetiva para dados/credenciais/ambientes.
