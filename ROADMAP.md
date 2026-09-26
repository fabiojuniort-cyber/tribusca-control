# TriBusca — Roadmap

Atualizado em 26/09/2026 (America/Sao_Paulo).

Este documento define a sequência aprovada. O andamento comprovado fica em [PROJECT_STATE.md](PROJECT_STATE.md); cada trabalho executável deve ter Issue com escopo, evidências e critérios de aceite. Não marcar uma frente como concluída apenas porque o código foi mergeado ou o cron foi ativado.

## Prioridade 1 — Concluir DOE São Paulo

Fechar a fonte DOE-SP antes de iniciar outro estado. O [PR #71 do backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71) ainda requer revisão final, merge condicionado ao gate e validação produtiva.

Critérios de conclusão:

1. Conector e deploys produtivos saudáveis.
2. Bootstrap aprovado de 01/01/2025 até a data atual, com `pendingRanges` vazio.
3. Runs sem erros de item ou falhas parciais não resolvidas; run real `SCHEDULED` com resultado legítimo.
4. Replay idempotente: zero publicações, versões e origens artificiais.
5. Identidade, deduplicação, versionamento, proveniência, texto oficial e URLs verificados.
6. Arquivos oficiais e SHA íntegros quando aplicável; política de persistência dos artefatos examinada.
7. Checkpoint, lookback, retry, timeout e proteção contra sobreposição verificados.
8. Seção de fechamento de `docs/phase-doe-sp.md` preenchida com IDs e resultados observados.
9. Serviços temporários DOE-SP auditados e neutralizados ou removidos quando seguro.

Até esses critérios estarem comprovados, DOE-SP permanece **ABERTO**.

## Prioridade 2 — Demais diários oficiais estaduais

Cobrir os outros 25 estados e o Distrito Federal, até alcançar **27/27 UFs**. Definir a ordem de abertura por ranking oficial de PIB estadual do IBGE mais recente disponível no momento de priorizar a próxima UF. Não assumir agora uma ordenação que possa mudar.

Cada UF terá Issue e reconhecimento técnico próprios. Preferência de integração: API oficial → JSON oficial → endpoint estruturado → HTML oficial → PDF → automação de navegador apenas se necessária. A publicação é coletada globalmente uma vez e depois relacionada às empresas.

Para cada DOE, exigir fonte oficial, conector independente, identidade determinística, texto e origem preservados, deduplicação/versionamento, arquivo/SHA quando aplicável, checkpoint/lookback/bootstrap, replay idempotente, proteção contra falhas e sobreposição, cron e run `SCHEDULED` real, documentação, CI e limpeza de temporários.

## Prioridade 3 — Inteligência do produto

Depois da cobertura estadual, retomar as frentes nesta ordem de referência:

1. API do produto.
2. Taxonomia e marcadores tributários controlados.
3. Perfil tributário de empresas e estabelecimentos.
4. Motor de relevância com motivos explicáveis.
5. Decodifica, com cobertura do conteúdo aplicável, apresentação por artigo, evidência e versionamento.
6. Frontend definitivo em `radar-fiscal-web`.
7. Site definitivo.

Detalhar cada frente em Issue própria antes de começar. Ajustes de paralelismo ou de ordem exigem decisão registrada, sem reabrir fontes concluídas sem evidência de problema.

## Regra de passagem

O Gerente Geral audita o handoff e as evidências em produção antes de declarar uma frente concluída. O próximo DOE só começa depois do fechamento formal do DOE-SP. Trabalhos que dependam de mudança arquitetural material, custo novo ou decisão de produto são escalados ao usuário.
