# TriBusca — Revisão e gates

## Princípio
Classifique R0–R3 conforme [Governança Flexível v2](CLAUDE_SESSION_PROTOCOL.md). O gate deve ser proporcional ao risco concreto.

## Fluxo preferencial
`atividade → implementação/testes → review quando exigido → correção → recheck → merge/deploy autorizado`

Pequeno achado não gera novo ID automaticamente.

## R0
- atualização documental/factual;
- sem revisão independente obrigatória;
- sem LOCK obrigatório;
- validação pelo próprio executor é suficiente quando não houver mudança de decisão/política.

## R1
- implementação, testes e correções podem ocorrer na mesma sessão;
- revisão independente opcional;
- LOCK apenas se houver concorrência concreta;
- elevar para R2/R3 se aparecer banco, auth, segurança, tenant ou produção material.

## R2
- Issue + branch + PR + testes;
- revisão independente antes de merge quando houver mudança material;
- executor pode corrigir achados na mesma sessão;
- revisor permanece independente do executor;
- merge/deploy conforme autorização aplicável.

## R3
- autorização explícita;
- LOCK obrigatório;
- preparação reproduzível;
- revisão independente;
- preflight e artefato exato;
- backup/restore quando aplicáveis;
- dry-run;
- rollback/plano de reversão;
- validação pós-execução;
- dados privados protegidos.

## Revisão incremental
Delta pequeno decorrente de review pode ser revisado isoladamente quando não muda arquitetura, segurança, contrato, dados, comportamento material ou artefato crítico. Registrar SHA anterior, novo SHA, delta e manutenção ou não da aprovação anterior.

Novo commit material exige revisão integral compatível com o risco. SQL/script/runbook destrutivo R3 continua preso a SHA exato.

## Gate 0
Verificar somente premissas relevantes. Markdown não exige Railway; revisão read-only não exige push; falha de ferramenta irrelevante não bloqueia.

## Gate DOE concluído
- fonte oficial e escopo documentados;
- identidade/dedup/versionamento/proveniência corretos;
- checkpoint/lookback/bootstrap aprovados;
- replay idempotente;
- retry/timeout/overlap/cron observados;
- run SCHEDULED real quando exigido;
- documentação final com evidências;
- CI, revisão, deployment e dados produtivos conforme o gate específico.

Nenhuma regra de governança reduz os critérios técnicos de fechamento DOE.

## Regra de gate — Railway AI Agent

O **Railway AI Agent não é fonte válida de evidência nova** para gates, reviews, rechecks ou validação produtiva. Evidência Railway deve ser obtida por meios não-AI permitidos pela D-065. Se o estado necessário não puder ser comprovado, usar `NOT_PROVEN`; não usar o Agent para completar o gate.
