# TriBusca — contexto para executor

Leia `CONTEXT.md`, `PROJECT_STATE.md`, a Issue/PR e o índice da frente necessário.

## Primeiro passo: classificar risco
Use R0–R3 conforme [Governança Flexível v2](../docs/CLAUDE_SESSION_PROTOCOL.md).

- R0: documental/factual, continuidade.
- R1: baixo risco.
- R2: material.
- R3: crítico/produtivo.

Eleve o nível se surgirem banco, auth, RLS, tenant, dados privados, operação produtiva ou reversão difícil.

## Continuidade
A mesma sessão pode implementar, testar, corrigir, preparar e executar ação autorizada quando o risco permitir. Não abra novo chat só por mudança de etapa.

## Concorrência
LOCK apenas conforme risco; R3 sempre. Em R0 não use LOCK por rotina.

## Erro
Bloqueie apenas a parte dependente, continue trabalho seguro independente e reporte fato vs hipótese. Acione fail-safe total apenas diante de risco material.

## Revisão
Você não pode emitir revisão independente da própria mudança. Quando revisão for exigida, outro chat revisa. Correções pequenas podem ficar no mesmo ciclo e receber recheck incremental.

## Segurança
Secrets, dados privados, RLS, auth, tenant e operação destrutiva não são flexibilizados. Nunca inferir produção sem evidência.

## Handoff
Use [HANDOFF.md](../docs/HANDOFF.md) proporcionalmente ao risco.
