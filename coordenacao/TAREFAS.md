# Quadro de tarefas

Status: `AGUARDANDO OK` → `PRONTA` → `EM ANDAMENTO (<chat>)` → `REVISAR` → `CONCLUÍDA` | `BLOQUEADA` | `CANCELADA`.
Só o Fábio muda de `AGUARDANDO OK` para `PRONTA`. O EXEC atualiza só o status da própria linha. Só o COORD marca `CONCLUÍDA`.

COORD e revisões: Claude Opus 5.5 (chat) / GPT 6.1 Sol Work. Respostas curtas.
Codex: usar modelo econômico e raciocínio médio; subir só se não resolver. GPT 6 Astra Work só com justificativa.

## Frente LIMPEZA: 2/12 (17%)
Objetivo: deixar o projeto simples e leve. Nenhuma feature nova até concluir.

| ID | Tarefa | Critério de pronto | Rodar em (Claude / GPT) | Status |
|---|---|---|---|---|
| L-01 | Instalar este protocolo no `tribusca-control` e o bloco de regras no `AGENTS.md` do backend | Commit com os arquivos | — | CONCLUÍDA |
| L-02 | Railway: medir uso de disco por serviço e volume (só leitura) | Tabela serviço → GB → origem provável | Sonnet 5.5 (chat, conector Railway) / GPT 6 chat, se tiver o conector Railway | CONCLUÍDA |
| L-03 | Railway (manual, Fábio): remover 12 serviços parados sem volume e o volume órfão act-scope-02; dou-clean-02 só se a limpeza DOU estiver concluída. Manter doe-sp-validation, tribusca-site-prototype e doe-sp-31 | Serviços e volumes removidos confirmados pelo Fábio | Manual do Fábio no Railway | PRONTA |
| L-04 | Coleta só do dia corrente; reprocessar ontem apenas se o run de ontem falhou. DOE-SP hoje olha 3 dias; RFB, 7 | Run de hoje não busca datas anteriores; teste cobre a exceção "ontem falhou" | Sonnet 5.5 (Claude Code) / Codex | AGUARDANDO DECISÃO (A: lookback=1 / B: lookback=2, só variável no worker, sem código) |
| L-05 | DOE-SP: parar de baixar o PDF autenticado por publicação (HTML basta; preflight: 0 publicações dependem de PDF) | Run sem chamadas a `downloadAuthenticatedPdf` | Sonnet 5.5 (Claude Code) / Codex | AGUARDANDO OK |
| L-06 | Localizar e remover a validação de certificado digital do PDF (não achada no backend `main`; checar web e branches) | Código removido ou confirmado inexistente | Haiku 5.5 (Claude Code) para localizar; Sonnet 5.5 se houver remoção / Codex + subagentes | EM ANDAMENTO (GPT-EXEC-1, só leitura) |
| L-07 | DOE-SP legado: desativar e remover o conector se não for usado em produção | Fora do registry e sem source ativa | Sonnet 5.5 (Claude Code) / Codex | AGUARDANDO OK |
| L-08 | Testes órfãos (nunca rodam): `onboarding-identity.unit`, `publication.presentation.integration`, `tax13.scoped-presentation.unit` | Incluídos no CI ou apagados | Haiku 5.5 (Claude Code) / Codex | AGUARDANDO OK |
| L-09 | Inventário de `ops/`, scripts npm (83) e docs: marcar o que é histórico para arquivar | Lista com "manter / arquivar" aprovada | Sonnet 5.5 (Claude Code) + subagentes Haiku 5.5 / Codex + subagentes | AGUARDANDO OK |
| L-10 | Retenção de `collection_items` (1 GB, 528 mil linhas): manter só os últimos 30 dias | Tabela só com 30 dias; rotina simples de limpeza aprovada | Sonnet 5.5 (Claude Code) / Codex | PRONTA (só proposta) |
| L-11 | Remover as simulações do filtro de coleta (`collection_filter_simulation_items`, 471 MB, e o código) | Tabela e código removidos; filtro de produção intacto | Sonnet 5.5 (Claude Code) / Codex | PRONTA (só proposta) |
| L-12 | Analisar o filtro: 124 mil publicações parecem demais para conteúdo tributário (só análise) | Relatório curto: volume por fonte e % fora de escopo | Sonnet 5.5 (Claude Code) / Codex | EM ANDAMENTO (CLAUDE-EXEC, aguardando prints) |

Nota: as duas migrations `033_*` já aplicadas **não** devem ser renomeadas. Regra daqui pra frente: numeração única.


## Achados L-02 (10/10/2026)
Banco 3,3 GB (≈1,6 GB log operacional, ≈1,5 GB produto), WAL 192 MB, arquivamento PITR sem falhas. Volume do Postgres 9,75 GB: ≈6 GB fora do banco ainda sem explicação. Backups temporários ≈18,5 GB e volume órfão de 30 GB.
