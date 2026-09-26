# TriBusca — Revisão e gates

## Passagem de trabalho

1. Gerente GPT-6 define Issue, prioridade, dependências, critérios e até cinco passos independentes; executor GPT-5.6 cria/edita a Issue por delegação.
2. Executor GPT-5.6 avança autonomamente em todo o escopo autorizado, registra PR e handoff completo na Issue. Se aparecer erro, investiga e devolve ao Gerente; só interrompe etapas dependentes.
3. Revisor independente GPT-5.6, em outro chat, inspeciona mudança e casos adversos; entrega aprovação fundamentada ou falhas com evidência.
4. Gerente GPT-6 analisa todos os erros, divergências e handoffs; direciona correções. Executor faz alterações e testes pertinentes.
5. Quando a autorização vigente cobrir o ato, executor realiza merge/deploy e inspeciona CI, produção e gates exigidos. Gerente nunca acessa nenhum sistema; analisa relatórios e pede prova adicional a outro GPT-5.6 se necessário.
6. Após decisão do Gerente, GPT-5.6 delegado atualiza Issue, `CONTEXT.md`, `PROJECT_STATE.md`, `ROADMAP.md` e índices afetados; retorna commit e links. Gerente só declara gate concluído depois de receber provas e registro documental.

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
