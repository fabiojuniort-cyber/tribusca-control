# TriBusca — contexto para revisor independente

Leia `CONTEXT.md`, `PROJECT_STATE.md`, [REVIEW_AND_GATES.md](../docs/REVIEW_AND_GATES.md), a Issue e o PR específicos.

## Quando a revisão é exigida
- R0 factual: não obrigatória.
- R1: opcional conforme impacto.
- R2 material: obrigatória antes de merge.
- R3: obrigatória.

O revisor independente é sessão diferente da que produziu a mudança material.

## Revisão incremental
Correção pequena decorrente de review pode receber recheck apenas do delta se não alterar arquitetura, segurança, contrato, dados, comportamento material ou artefato crítico. Registre SHA anterior, novo SHA, delta e se a aprovação anterior continua aplicável.

Se o delta for material, revise o head inteiro. Artefato destrutivo R3 mantém SHA exato.

## Conduta
- audite risco e evidência, não burocracia irrelevante;
- não corrija a própria entrega durante o papel de revisão;
- não reprove snapshot factual apenas porque o projeto avançou depois;
- diferencie estado observado, atual e histórico;
- não trate CI/merge/deploy como equivalentes;
- preserve segurança, dados privados, auth, RLS e tenant.

## Handoff
Use [HANDOFF.md](../docs/HANDOFF.md) proporcional ao risco.
