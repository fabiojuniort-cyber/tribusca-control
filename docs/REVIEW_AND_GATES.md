# TriBusca — Revisão e gates

## Passagem de trabalho

1. Gerente GPT-6 define Issue, prioridade, dependências, critérios e até cinco passos independentes; executor GPT-5.6 cria/edita a Issue por delegação.
2. Executor GPT-5.6 avança autonomamente em todo o escopo autorizado, registra PR e handoff completo na Issue. Se aparecer erro, investiga e devolve ao Gerente; só interrompe etapas dependentes.
3. Revisor independente, em outro chat/sessão sem participação no intervalo revisado, inspeciona mudança e casos adversos; GPT-5.6 e Claude são ambos válidos mesmo se o modelo efetivo divergir do indicado no prompt, desde que a divergência seja registrada; entrega aprovação fundamentada ou falhas com evidência.
4. Gerente GPT-6 analisa todos os erros, divergências e handoffs; direciona correções. Executor faz alterações e testes pertinentes.
5. Quando a autorização vigente cobrir o ato, executor realiza merge/deploy e inspeciona CI, produção e gates exigidos. Gerente pode conferir evidências diretamente em modo somente leitura, analisa relatórios e pede prova adicional a outro GPT-5.6 se necessário.
6. Após decisão do Gerente, GPT-5.6 delegado atualiza Issue, `CONTEXT.md`, `PROJECT_STATE.md`, `ROADMAP.md` e índices afetados; retorna commit e links. Gerente só declara gate concluído depois de receber provas e registro documental.

Uma Issue que exige bootstrap ou validação produtiva permanece aberta após merge. Ao relacionar PR entre repositórios, usar referência textual/URL; não usar fechamento automático antes do gate.

## Gate de sessão Claude

Sessões Claude seguem [CLAUDE_SESSION_PROTOCOL.md](CLAUDE_SESSION_PROTOCOL.md) e são exclusivas por tipo:

- **CÓDIGO:** branch, testes e CI; zero produção.
- **PREPARAÇÃO:** preflight read-only e artefato operacional exato versionado; zero execução produtiva.
- **REVISÃO:** sessão independente, somente auditoria e parecer; não corrige a entrega revisada.
- **EXECUÇÃO:** aplica apenas o material preparado/aprovado e a autorização vigente; não cria correção de código ad hoc.

Antes de qualquer um deles, o Gerente confirma handoff + UNLOCK anterior e o Gate 0 confirma push, acesso Railway quando a atividade exigir, identificação de sessão/modelo e LOCK vigente antes de registrar a nova trava. LOCK órfão só é liberado por decisão do usuário (C-05). Uma falha de Gate 0 encerra a sessão sem trabalho parcial. Aprovação de um gate não implica aprovação dos seguintes.

### REVISÃO Claude

O revisor recebe **SHA exato** do head e, para script/SQL/runbook, SHA exato do artefato/commit, além de checklist e critérios explícitos de reprovação. O revisor declara identificador de sessão, modelo efetivo e não participação no intervalo revisado. O parecer é registrado no PR/Issue citando o SHA revisado. **Qualquer novo commit no head, inclusive merge da `main`, invalida o parecer anterior**; a nova revisão cita o novo SHA completo.

### Operação destrutiva

PREPARAÇÃO só pode liberar EXECUÇÃO quando o checklist no corpo da Issue comprovar as salvaguardas de [C-10](CLAUDE_SESSION_PROTOCOL.md) aplicáveis ao alvo:
- sempre: preflight read-only; artefato/runbook exato **commitado e revisado**; queries de validação e valores esperados definidos **antes**; plano de reversão ou irreversibilidade registrada;
- dados de banco: backup **dentro da Railway**; restauração testada em **Postgres temporário dentro da Railway**; dry-run com resultado **igual ao esperado previamente**; fase destrutiva em **transação** quando suportada, com rollback definido;
- infraestrutura sem banco: inventário sanitizado da configuração, ausência de dependentes e *staged changes* como dry-run quando disponíveis; volume com dados é tratado como dado.

Falha ou divergência em qualquer salvaguarda aplicável bloqueia EXECUÇÃO. A única exceção é dispensa explícita do usuário registrada na Issue antes da execução, citando salvaguarda, motivo e risco aceito (C-10).

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
