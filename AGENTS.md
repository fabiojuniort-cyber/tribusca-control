# TriBusca — instruções dos agentes

## Fonte oficial
GitHub é o estado durável. Leia `CONTEXT.md`, `PROJECT_STATE.md`, a Issue/PR pertinente e os índices da frente. Verifique ao vivo apenas premissas que possam ter mudado. Handoff é contexto histórico até ser conferido.

## Governança por risco
A referência canônica é [docs/CLAUDE_SESSION_PROTOCOL.md](docs/CLAUDE_SESSION_PROTOCOL.md), que após o merge da GOV-16 passa a representar a **Governança Flexível v2** para GPT e Claude.

Classifique a atividade em R0, R1, R2 ou R3 antes de impor gates. A governança deve impedir dano, não impedir trabalho.

- **R0:** documental/factual; continuidade por padrão, sem LOCK/revisão/chat novo obrigatórios.
- **R1:** baixo risco; mesma sessão implementa, testa e corrige; revisão/LOCK apenas se o impacto pedir.
- **R2:** material; Issue + branch + PR + testes; revisão independente para mudança material antes de merge.
- **R3:** crítico/produtivo; autorização explícita, LOCK, preparação, revisão, salvaguardas e evidência pós-execução.

Se a atividade ganhar risco, eleve a classificação.

## Papéis
**Gerente Geral:** coordenador/read-only por padrão. Classifica risco, define escopo, prioridades e gates. Pode encaminhar R0/R1 de forma simplificada e exigir nível maior quando surgirem fatos novos. Não faz escrita produtiva nem usa “baixo risco” para contornar segurança.

**Executor:** pode permanecer na mesma sessão entre código, testes, correções, preparação e execução autorizada quando o risco permitir. Não autoaprova revisão independente.

**Revisor independente:** obrigatório quando a classificação/regra exigir; deve ser sessão diferente da que produziu a mudança material. Pode revisar apenas delta pequeno quando os critérios de revisão incremental forem satisfeitos.

GPT e Claude são modelos válidos. Divergência do modelo indicado é metadado, não bloqueio por si só.

## IDs e delegação
Novo ID é necessário quando houver novo escopo material, nova decisão ou operação independente. Correção de status/contexto R0 e pequeno achado de review permanecem no mesmo ciclo por padrão.

Prompts devem conter o necessário para executar com segurança, sem campos irrelevantes. O bloco copiável Gerente → executor/revisor continua recomendado para delegações formais; handoff proporcional ao risco segue [docs/HANDOFF.md](docs/HANDOFF.md).

## Gate 0
Gate 0 é proporcional:
- verifique somente recursos relevantes;
- falha não relacionada não bloqueia trabalho seguro;
- falha relacionada ao risco bloqueia a parte dependente;
- bloqueio total só quando continuar puder causar dano material, operação não autorizada, risco de segurança/dados/tenant ou conflito real de escrita.

## LOCK
LOCK é lease de concorrência:
- R0: não;
- R1: somente concorrência concreta;
- R2: quando houver múltiplos executores/risco de escrita concorrente;
- R3: obrigatório.

LOCK expirado/órfão pode ser substituído com evidência de estado seguro. Escalar ao usuário somente se houver dúvida real sobre operação material/produtiva ativa.

## Revisão
Novo commit não invalida automaticamente toda revisão. Delta não material pode receber recheck incremental, registrando SHA anterior, novo SHA e escopo do delta. Alteração material exige revisão compatível; artefato destrutivo R3 mantém SHA exato.

## Execução e segurança
Toda atividade respeita [docs/SECURITY.md](docs/SECURITY.md). Secrets, dados privados, RLS, auth, tenant e operações destrutivas não são flexibilizados. Merge/deploy/materialidade seguem autorização aplicável.

## Manutenção documental
Atualização factual de contexto/estado/links/datas/SHAs/handoffs é R0 por padrão e pode ser feita continuamente pelo executor sem criar nova atividade. Mudança de política, arquitetura, governança, autorização ou regra operacional material não é R0.

Use snapshots temporais quando necessário: `Estado observado em DD/MM/AAAA HH:MM BRT`.

## Fechamento
Registre evidência proporcional ao risco. CI, merge, deploy e run são fatos diferentes; não inferir produção a partir de evidência ausente.

## Railway AI Agent — uso proibido

É **proibido** usar o Railway AI Agent em qualquer frente do TriBusca, para leitura ou escrita. Isso inclui diagnóstico, consulta, troubleshooting, configuração, variáveis, serviços, logs, banco, migrations, deploy/redeploy, runs e validação produtiva.

Railway continua permitida como infraestrutura somente por meios não-AI: Dashboard, CLI/API, conectores oficiais que não sejam o Railway AI Agent, logs nativos e scripts/runbooks versionados do projeto.

Nenhum prompt, gate, review ou handoff pode instruir ou depender do Railway AI Agent. Se uma evidência não puder ser obtida por canal permitido, registrar `NOT_PROVEN` ou bloquear apenas a etapa dependente. Ver [docs/RAILWAY_AI_AGENT_POLICY.md](docs/RAILWAY_AI_AGENT_POLICY.md) e D-065.
