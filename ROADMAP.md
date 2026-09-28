# TriBusca — Roadmap

Atualizado em 27/09/2026 (America/Sao_Paulo).

Este documento define a sequência aprovada. O andamento comprovado fica em [PROJECT_STATE.md](PROJECT_STATE.md); cada trabalho executável deve ter Issue com escopo, evidências e critérios de aceite. Não marcar uma frente como concluída apenas porque o código foi mergeado ou o cron foi ativado.

## Prioridade 1 — Concluir DOE São Paulo

Fechar formalmente a fonte DOE-SP antes de iniciar outro estado. O DOE-SP permanece **ABERTO**; a direção vigente está na D-052 e no draft [PR #73 do backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73), ainda sujeito aos gates de procedimento, merge/deploy e validação produtiva.

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

## Após o fechamento formal do DOE-SP — frentes paralelas aprovadas

A D-055 substitui o bloqueio global de “27/27 antes do produto”. **Enquanto DOE-SP não estiver formalmente fechado, nenhum novo DOE pode começar.** Depois desse fechamento, três eixos podem avançar em paralelo, cada um com Issues, dependências e gates próprios.

### Eixo A — demais diários oficiais estaduais

Cobrir os outros 25 estados e o Distrito Federal até alcançar **27/27 UFs**. A ordem de abertura continua definida pelo ranking oficial de PIB estadual do IBGE mais recente disponível no momento da priorização.

Cada UF terá Issue e reconhecimento técnico próprios. Preferência de integração: API oficial → JSON oficial → endpoint estruturado → HTML oficial → PDF → automação de navegador apenas se necessária. A publicação é coletada globalmente uma vez e depois relacionada às empresas.

Para cada DOE, exigir fonte oficial, conector independente, identidade determinística, texto e origem preservados, deduplicação/versionamento, artefato/SHA quando aplicável, checkpoint/lookback/bootstrap, replay idempotente, proteção contra falhas e sobreposição, cron e run `SCHEDULED` real, documentação, CI e limpeza de temporários.

### Eixo B — base de inteligência

Podem avançar em paralelo aos DOEs:
1. **taxonomia e marcadores tributários controlados**;
2. **Perfil Tributário** de empresas e estabelecimentos.

Sonar, Revela, Decodifica e outras capacidades dependentes continuam sujeitas às bases necessárias e a Issues próprias. A D-055 não autoriza implementação automática dessas integrações.

### Eixo C — autenticação e comercial

Podem avançar em paralelo:
- contratos de cadastro/recuperação/nova senha;
- onboarding, trial e administração inicial;
- desenho comercial de três níveis de assinatura;
- pilotos de custo/uso necessários para fechar nomes, preços, franquias e créditos.

A ativação real de cadastro/trial depende da Issue #9 e dos gates técnicos aplicáveis.

## Regra de passagem

O Gerente Geral audita o handoff e as evidências antes de declarar qualquer frente concluída. O **próximo DOE** só começa depois do fechamento formal do DOE-SP. Após esse fechamento, não existe bloqueio que obrigue esperar 27/27 DOEs para trabalhar taxonomia, Perfil Tributário ou autenticação/comercial.

## Exceção WEB-01 — site público em paralelo

Por decisão do responsável pelo produto, a **camada pública informativa do site** pode avançar em paralelo. Depois dos gates de revisão, ela pode ser publicada antes da conclusão da Issue #9, respeitando a D-054: enquanto cadastro real não estiver pronto, **“Criar conta” deve ser substituído por “Em breve”** antes do lançamento. Esta exceção não transforma Sonar, Revela, Decodifica, Acervo autenticado ou Perfil Tributário em recursos disponíveis sem implementação comprovada.
