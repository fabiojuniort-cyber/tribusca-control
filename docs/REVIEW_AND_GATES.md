# TriBusca — Revisão e gates

## Passagem de trabalho

1. Gerente cria Issue com prioridade, dependências, critérios e limites.
2. Executor implementa e entrega PR e HANDOFF.md preenchido na Issue.
3. Revisor independente inspeciona mudança e casos adversos; aponta falhas com evidências.
4. Executor corrige e repete testes relevantes.
5. Gerente confere revisão, CI, deploy e evidências produtivas exigidas; fecha a Issue somente após o gate.
6. Atualizar PROJECT_STATE.md e ROADMAP.md quando o estado executivo mudar.

Uma Issue que exige bootstrap ou validação produtiva permanece aberta após merge. Ao relacionar PR entre repositórios, usar referência textual/URL; não usar fechamento automático antes do gate.

## Revisão de PR

- Escopo bate com a Issue e não inclui migrations ou serviços fora do combinado.
- Alteração de identidade/dedup/versionamento preserva replay e proveniência por origem.
- Falha de fonte não vira SUCCESS_NO_RESULTS.
- RLS, auth, contexto tenant e dados sensíveis continuam protegidos.
- CI cobre mudança e risco concreto; revisar contraexemplos, não apenas happy path.
- Migrações são seguras e têm estratégia de deploy/reversão quando cabível.
- Nenhum segredo ou artefato foi atribuído a uma origem diferente.

## Gate DOE concluído

- Fonte oficial e escopo documentados; conector independente.
- Identidade determinística, dedup, versionamento, texto/URL/origem e arquivo/SHA quando aplicável.
- Checkpoint, lookback, bootstrap aprovado e pendingRanges vazio.
- Replay idempotente: zero duplicidades e versões artificiais.
- Retry, timeout, overlap e cron observados.
- Run SCHEDULED real, sem falha parcial não resolvida.
- Documentação final com IDs, contagens e limites; temporários auditados/neutralizados.
- CI verde, PR revisado, deployment observado e dados produtivos verificados.

Para DOE-SP, a janela inicial é 01/01/2025 até a data de fechamento. A seção de fechamento de docs/phase-doe-sp.md no backend registra as evidências. O próximo DOE depende desse gate.
