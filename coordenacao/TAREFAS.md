# Quadro de tarefas

Status: `AGUARDANDO OK` → `PRONTA` → `EM ANDAMENTO (<chat>)` → `REVISAR` → `CONCLUÍDA` | `BLOQUEADA` | `CANCELADA`.
Só o Fábio muda de `AGUARDANDO OK` para `PRONTA`. Só o COORD marca `CONCLUÍDA`.

COORD e revisões: Claude Opus 5.5 (chat) / GPT 6.1 Sol Work. Respostas curtas.
Codex: usar modelo econômico e raciocínio médio; subir só se não resolver. GPT 6 Astra Work só com justificativa.

## Frente LIMPEZA: 1/9 (11%)
Objetivo: deixar o projeto simples e leve. Nenhuma feature nova até concluir.

| ID | Tarefa | Critério de pronto | Rodar em (Claude / GPT) | Status |
|---|---|---|---|---|
| L-01 | Instalar este protocolo no `tribusca-control` e o bloco de regras no `AGENTS.md` do backend | Commit com os arquivos | — | CONCLUÍDA |
| L-02 | Railway: medir uso de disco por serviço e volume (só leitura) | Tabela serviço → GB → origem provável | Sonnet 5.5 (chat, conector Railway) / GPT 6 chat, se tiver o conector Railway | AGUARDANDO OK |
| L-03 | Railway: remover serviços temporários (sped-*, tmp-doe-sp-probe, doe-sp-preflight-27b, temporários RFB, sped-db-query) | Lista removida confirmada pelo Fábio | Manual do Fábio no Railway; lista com Haiku 5.5 / GPT 6 chat | AGUARDANDO OK |
| L-04 | Coleta só do dia corrente; reprocessar ontem apenas se o run de ontem falhou. DOE-SP hoje olha 3 dias; RFB, 7 | Run de hoje não busca datas anteriores; teste cobre a exceção "ontem falhou" | Sonnet 5.5 (Claude Code) / Codex | AGUARDANDO OK |
| L-05 | DOE-SP: parar de baixar o PDF autenticado por publicação (HTML basta; preflight: 0 publicações dependem de PDF) | Run sem chamadas a `downloadAuthenticatedPdf` | Sonnet 5.5 (Claude Code) / Codex | AGUARDANDO OK |
| L-06 | Localizar e remover a validação de certificado digital do PDF (não achada no backend `main`; checar web e branches) | Código removido ou confirmado inexistente | Haiku 5.5 (Claude Code) para localizar; Sonnet 5.5 se houver remoção / Codex + subagentes | AGUARDANDO OK |
| L-07 | DOE-SP legado: desativar e remover o conector se não for usado em produção | Fora do registry e sem source ativa | Sonnet 5.5 (Claude Code) / Codex | AGUARDANDO OK |
| L-08 | Testes órfãos (nunca rodam): `onboarding-identity.unit`, `publication.presentation.integration`, `tax13.scoped-presentation.unit` | Incluídos no CI ou apagados | Haiku 5.5 (Claude Code) / Codex | AGUARDANDO OK |
| L-09 | Inventário de `ops/`, scripts npm (83) e docs: marcar o que é histórico para arquivar | Lista com "manter / arquivar" aprovada | Sonnet 5.5 (Claude Code) + subagentes Haiku 5.5 / Codex + subagentes | AGUARDANDO OK |

Nota: as duas migrations `033_*` já aplicadas **não** devem ser renomeadas. Regra daqui pra frente: numeração única.
