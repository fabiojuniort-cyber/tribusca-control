# Quadro de tarefas

Status: `AGUARDANDO OK` → `PRONTA` → `EM ANDAMENTO (<chat>)` → `REVISAR` → `CONCLUÍDA` | `BLOQUEADA` | `CANCELADA`.
Só o Fábio muda de `AGUARDANDO OK` para `PRONTA`. O EXEC atualiza só o status da própria linha. Só o COORD marca `CONCLUÍDA`.

COORD e revisões: Claude Opus 5.5 (chat) / GPT 6.1 Sol Work. Respostas curtas.
Codex: usar modelo econômico e raciocínio médio; subir só se não resolver. GPT 6 Astra Work só com justificativa.

## Frente LIMPEZA: 16/18 (89%)
Objetivo: deixar o projeto simples e leve. Nenhuma feature nova até concluir.

| ID | Tarefa | Critério de pronto | Rodar em (Claude / GPT) | Status |
|---|---|---|---|---|
| L-01 | Instalar este protocolo no `tribusca-control` e o bloco de regras no `AGENTS.md` do backend | Commit com os arquivos | — | CONCLUÍDA |
| L-02 | Railway: medir uso de disco por serviço e volume (só leitura) | Tabela serviço → GB → origem provável | Sonnet 5.5 (chat, conector Railway) / GPT 6 chat, se tiver o conector Railway | CONCLUÍDA |
| L-03 | Railway (manual, Fábio): remover 12 serviços parados sem volume e o volume órfão act-scope-02; dou-clean-02 só se a limpeza DOU estiver concluída. Manter doe-sp-validation, tribusca-site-prototype e doe-sp-31 | Serviços e volumes removidos confirmados pelo Fábio | Manual do Fábio no Railway | CONCLUÍDA |
| L-04 | Coleta só do dia corrente; reprocessar ontem apenas se o run de ontem falhou. DOE-SP hoje olha 3 dias; RFB, 7 | Run de hoje não busca datas anteriores; teste cobre a exceção "ontem falhou" | Sonnet 5.5 (Claude Code) / Codex | CONCLUÍDA |
| L-05 | DOE-SP: parar de baixar o PDF autenticado por publicação (HTML basta; preflight: 0 publicações dependem de PDF) | Run sem chamadas a `downloadAuthenticatedPdf` | Sonnet 5.5 (Claude Code) / Codex | CONCLUÍDA |
| L-06 | Localizar e remover a validação de certificado digital do PDF (não achada no backend `main`; checar web e branches) | Código removido ou confirmado inexistente | Haiku 5.5 (Claude Code) para localizar; Sonnet 5.5 se houver remoção / Codex + subagentes | CONCLUÍDA |
| L-07 | DOE-SP legado: desativar e remover o conector se não for usado em produção | Fora do registry e sem source ativa | Sonnet 5.5 (Claude Code) / Codex | CONCLUÍDA |
| L-08 | Testes órfãos (nunca rodam): `onboarding-identity.unit`, `publication.presentation.integration`, `tax13.scoped-presentation.unit` | Incluídos no CI ou apagados | Haiku 5.5 (Claude Code) / Codex | CONCLUÍDA (2 testes incluídos; TAX13 reservado à L-16) |
| L-09 | Inventário de `ops/`, scripts npm (83) e docs: marcar o que é histórico para arquivar | Lista com "manter / arquivar" aprovada | Sonnet 5.5 (Claude Code) + subagentes Haiku 5.5 / Codex + subagentes | AGUARDANDO OK |
| L-10 | Retenção de `collection_items` (1 GB, 528 mil linhas): manter só os últimos 7 dias | Padrão de 7 dias em código; dry-run é padrão; exclusão real somente com OK específico do Fábio | Sonnet 5.5 (Claude Code) / Codex | CONCLUÍDA (COORD confirmou logs: retenção, EXCLUDE_ALWAYS e ocultas executadas em 12/10/2026 às 03:30 BRT) |
| L-11 | Classificação imediata de novos tipos e edição de Modo, com exclusão das publicações descartadas e remoção de rascunhos/simulações/aprovação | Popup Classificar com Fonte/Seção/Tipo/Modo; confirmação indica X publicações; aplicação imediata, exclusão segura em lotes, audit log com IDs; PLATFORM_ADMIN; preservar motor existente, termo tributário e termo forte | Sonnet 5.5 (Claude Code) / Codex | REVISAR (aguardando primeira classificação em produção) |
| L-12 | Analisar o filtro: 124 mil publicações parecem demais para conteúdo tributário (só análise) | Relatório curto: volume por fonte e % fora de escopo | Sonnet 5.5 (Claude Code) / Codex | CONCLUÍDA |

| L-13 | Triar PRs backend/web: fechar #187/#188 backend e #80/#87 web com comentário; analisar 10 condicionais sem fechar; inventariar migrations e colisões | 4 fechamentos comprovados, 10 recomendações fundamentadas e inventário de migrations | Claude Sonnet 5.5 (Claude Code) / Codex para PRs; GPT 6 chat para análise | CONCLUÍDA |
| L-15 | Apagar as ~23 mil publicações DOU OUT_OF_SCOPE, com backup antes | Proposta aprovada pelo Fábio | Sonnet 5.5 / Codex | PRONTA (só proposta) |

Nota L-15: proposta atual autorizada pelo Fábio — backup MANUAL pelo Railway na aba Backups antes da execução; contagem via dry-run; exclusão em lotes reutilizando o purge da L-11; OK explícito do Fábio antes de executar. Sem restore isolado e sem revisão independente específica nesta proposta. Nenhuma exclusão autorizada nesta etapa.


## Próxima frente

| ID | Tarefa | Critério de pronto | Rodar em (Claude / GPT) | Status |
|---|---|---|---|---|
| L-16 | Corrigir as 2 falhas TAX13 (Convênios 100/97 e 52/91; anexo revogado NCM 8450.11.00) | `tax13.scoped-presentation.unit.test.ts` volta ao CI e passa | Sonnet 5.5 / Codex | AGUARDANDO OK |
| L-19 | Corrigir configuração `DB_VOLUME_CAPACITY_BYTES` de 5 GB para 100 GB, eliminando alerta falso de capacidade | Proposta, OK do Fábio e validação dos alertas antes de qualquer alteração em ambiente | Claude Sonnet 5.5 (Claude Code) / Codex (modelo econômico) | AGUARDANDO OK |
| L-18 | Fechamento LIMPEZA — somente purge (SEM recoleta): (2) ampliar APENAS o grupo `ocultas pela regra antiga (029)` para qualquer fonte; (2b) acrescentar APENAS no DOE-SP o grupo separado `tipo provavelmente errado`, quando `act_type = 'EMENDA CONSTITUCIONAL'` e título NÃO começa com `Emenda Constitucional` (21 visíveis informadas, ex. `PDs Pagas`). Demais grupos continuam só DOU; preservar proteções e Desconsiderados. Item 1: OK do Fábio recebido em 12/10; preparação da recoleta das 81/26 datas em PR #214, ainda não aplicada nem executada. | Proposta revisada em até 5 linhas e novo OK do Fábio antes de codar; prévia separada por grupo; CI verde e print antes do merge; migrations/deploy só após gates, na janela :20–:40. | Claude Sonnet 5.5 (Claude Code) / Codex (modelo econômico) | EM ANDAMENTO (item 1: PR backend #214 com prévia somente leitura, PG18 verde; CI integral em andamento; nenhuma recoleta gravada) |

L-11 ampliada por CLAUDE-COORD (autorizado por Fábio): aplicar regras de Fonte/Seção/Tipo/Modo imediatamente, recadastrar novos tipos e editar Modo em Tipos; prévia de exclusão X, remover fisicamente publicações elegíveis conforme a regra com audit log (tipo, modo, contagem e IDs), exclusivamente PLATFORM_ADMIN; remover rascunho/simulação/aprovação via migration NOVA 051; preservar motor atual, termos tributários e termos fortes. Proposta apenas; implementação depende do OK do Fábio. Restrições técnicas: publicação com scope events/state append-only/RESTRICT e outras referências não pode ser apagada sem resolução legal de dependências; não contornar constraints.

Nota: as duas migrations `033_*` já aplicadas **não** devem ser renomeadas. Regra daqui pra frente: numeração única.


## Achados L-02 (10/10/2026)
Banco 3,3 GB (≈1,6 GB log operacional, ≈1,5 GB produto), WAL 192 MB, arquivamento PITR sem falhas. Volume do Postgres 9,75 GB: ≈6 GB fora do banco ainda sem explicação. Backups temporários ≈18,5 GB e volume órfão de 30 GB.

**L-17 — REVISAR:** aguardando a conferência SQL do Fábio.

## Próximas frentes
- **F2 TAXONOMIA + CADASTRO (DEF-01)** — AGUARDANDO OK.
- **F3 QUALIDADE DO ALERTA** — AGUARDANDO OK.
- **F4 ASSISTENTE TRIBUTÁRIO (DEF-02)** — AGUARDANDO OK. MVP Pergunte ao acervo: somente base relevante por tenant e dispositivos vigentes, respostas com citações oficiais, sem cálculo; pré-requisitos F2/F3 e ARQ-01.
- **F5 NOTIFICAÇÕES + WHATSAPP (DEF-02)** — AGUARDANDO OK. Fase 1: alerta de relevância Alta por estabelecimento; Fase 2: Decodifica pelo WhatsApp; Fase 3: assistente com citação dependente da F4. Opt-in/SAIR, verificação do telefone, API oficial e LGPD.

**Ordem prevista na DEF-02:** F2 → F3 → F5 fase 1 → F4 → F5 fases 2 e 3. **Escopo registrado; nenhuma implementação autorizada.**

| ID | Tarefa | Critério de pronto | Rodar em (Claude / GPT) | Status |
|---|---|---|---|---|
| MON-01 | Central de Monitoramento: exibir Encontradas, Descartadas pelo filtro de coleta, Mantidas (novas ou já existentes), Processadas (= Descartadas + Mantidas) e Importadas (novas) na tabela de execuções de cada fonte e nos cards de 24h, reutilizando `collection_items` e `collection_filter_discard_run_stats`. Sem alterar o restante da tela. | Métricas exibidas corretamente nos dois locais; print antes do merge. Implementação somente após OK do Fábio. | Claude — / GPT 6 chat | EM ANDAMENTO (GPT-EXEC-2; aprovado pelo Fábio em 11/10/2026; PR backend #212, web #101; aguardando CI, print e revisão antes do merge) |
| DOE-SP-TIPO-01 | Próxima frente: corrigir coletor DOE-SP para determinar `act_type` pelo título do ato, NÃO pelo tipo atribuído pelo portal (ex. `PDs Pagas` não é `EMENDA CONSTITUCIONAL`). | Apresentar proposta e aguardar OK do Fábio antes de codar; testes de classificação por título; não executar na L-18. | Claude Sonnet 5.5 (Claude Code) / Codex (modelo econômico) | AGUARDANDO OK |
