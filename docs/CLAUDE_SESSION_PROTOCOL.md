# TriBusca — Governança Flexível v2 baseada em risco

## Status de transição

Este arquivo mantém o nome histórico `CLAUDE_SESSION_PROTOCOL.md` por compatibilidade com links existentes, mas a regra aqui definida vale para qualquer modelo designado.

**Vigência:** **VIGENTE** desde o squash merge do PR #15 na `main`, commit `6f6a7169cfe5b8ddb6c235569d637c2d6f4435ba`, em 28/09/2026. Este documento é a referência canônica de governança por risco.

> **Princípio central:** governança deve impedir dano, não impedir trabalho. Na ausência de risco material, continuidade é o padrão e bloqueio é a exceção.

## Classificação obrigatória R0–R3

Classificar pelo maior risco real da atividade. Se surgirem fatos novos, elevar o nível. Dúvida pequena sem evidência de risco material favorece continuidade; dúvida sobre dados, segurança, tenant ou produção favorece o nível mais seguro.

### R0 — trivial / documental
Exemplos: Markdown, texto, status, datas, links, contexto, handoff, atualização factual, formatação e documentação sem mudança de decisão.

- sem LOCK obrigatório;
- sem conversa nova obrigatória;
- sem revisão independente obrigatória;
- executor pode editar, validar e corrigir na mesma sessão;
- correção factual/status/contexto não cria novo ID por padrão;
- merge pode ocorrer quando houver autorização permanente aplicável e nenhuma mudança material.

### R1 — baixo risco
Exemplos: UI/UX, CSS, frontend visual, testes, lint e refactor pequeno sem banco, auth, segurança, tenant ou produção material.

- mesma sessão pode implementar, testar e corrigir;
- LOCK só se houver possibilidade concreta de concorrência na mesma superfície;
- revisão independente é opcional e definida pelo Gerente conforme impacto;
- pequenos achados permanecem no mesmo ciclo/PR;
- novo ID só quando surgir novo escopo material, decisão ou operação independente.

### R2 — material
Exemplos: backend, persistência, regras fiscais, conectores, API, deduplicação, versionamento, autenticação, RLS e comportamento relevante de negócio.

- Issue + branch + PR + testes obrigatórios;
- revisão independente obrigatória antes do merge quando houver mudança material;
- executor pode implementar e corrigir achados na mesma sessão;
- o revisor independente permanece em sessão diferente da que produziu a mudança material;
- LOCK só quando houver múltiplos executores ou risco concreto de escrita concorrente;
- merge/deploy seguem a autorização aplicável.

### R3 — crítico / produtivo
Exemplos: SQL produtivo, migration relevante, exclusão de dados, rebuild/repair, recaptura destrutiva, secrets, infraestrutura material, operação difícil de reverter, dados privados e mudança produtiva de risco significativo.

- autorização explícita;
- LOCK obrigatório;
- preparação reproduzível;
- revisão independente;
- backup e restore testado quando aplicáveis;
- dry-run;
- rollback/plano de reversão;
- evidência pós-execução;
- separação clara entre preparação, execução e validação quando o risco justificar;
- dados privados e secrets permanecem protegidos.

## Tabela canônica

| Controle | R0 | R1 | R2 | R3 |
| --- | --- | --- | --- | --- |
| Issue obrigatória? | Não, salvo rastreabilidade necessária | Conforme escopo/repositório | Sim | Sim |
| Branch/PR? | Opcional | Conforme mudança versionada/impacto | Obrigatórios | Obrigatórios para artefatos versionáveis |
| LOCK? | Não | Só concorrência concreta | Só concorrência concreta/múltiplos executores | Sim |
| Revisão independente? | Não | Opcional | Sim quando mudança material | Sim |
| Autorização? | Permanente de baixo risco pode bastar | Permanente de baixo risco pode bastar | Conforme merge/deploy/ato material | Explícita para a operação |
| Backup? | Não | Não | Quando dados/risco exigirem | Sim quando aplicável a dados/destruição |
| Execução produtiva? | Não; reclassificar se surgir impacto | Não material; reclassificar se surgir impacto | Possível com gate/autorização | Sim, controlada |
| Novo chat obrigatório? | Não | Não | Não para o executor; revisor independente em outra sessão | Revisor independente; separação adicional quando o risco justificar |
| Recheck incremental permitido? | Sim | Sim | Sim para delta não material; integral se material | Só quando não reduzir prova do artefato crítico; SHA exato continua obrigatório |

Esta tabela é a primeira referência para novos agentes. Regras específicas mais seguras de segurança/dados prevalecem.

## Gate 0 proporcional ao risco

Verificar somente recursos que possam afetar a atividade:
- Markdown não exige Railway;
- revisão somente leitura não exige teste de push se não haverá escrita;
- frontend local não exige PostgreSQL;
- falha em ferramenta não relacionada não bloqueia trabalho seguro independente.

Falha relacionada ao risco bloqueia a parte dependente. Bloqueio total só ocorre quando continuar puder causar perda/corrupção de dados, impacto material em produção, violação de segurança/privacidade, merge/deploy não autorizado, quebra de isolamento tenant, reversão materialmente difícil ou conflito real com outro executor na mesma superfície.

## Continuidade da sessão

Uma mesma sessão executora pode, quando o risco permitir:

`CÓDIGO → TESTES → CORREÇÕES → PREPARAÇÃO → EXECUÇÃO AUTORIZADA`

Mudar de etapa não exige novo chat por si só. O executor não pode declarar a própria **REVISÃO INDEPENDENTE** quando ela for exigida.

## LOCK como lease

LOCK não é universal:
- R0: sem LOCK;
- R1: apenas concorrência concreta;
- R2: quando houver múltiplos executores ou risco de escrita concorrente;
- R3: obrigatório.

LOCK é lease temporário sobre uma superfície de escrita/operação, não bloqueio indefinido. LOCK expirado/órfão pode ser substituído com evidência quando não houver operação produtiva ativa, escrita em andamento ou dúvida material. Registrar `LOCK anterior expirado/substituído`, com evidência. Escalar ao usuário somente se houver dúvida real sobre operação material/produtiva em curso.

## Revisão independente e revisão incremental

A revisão independente, quando exigida, permanece separada do executor.

Correções pequenas diretamente decorrentes de review podem receber **revisão apenas do delta** quando não alterarem arquitetura, segurança, contrato, dados, comportamento material nem artefato produtivo crítico. O revisor registra:
- SHA previamente revisado;
- novo SHA;
- delta revisado;
- se a aprovação anterior continua aplicável.

Revisão integral é obrigatória quando o delta muda matéria relevante ou o risco R2/R3 justificar. Para SQL/script/runbook destrutivo R3, o SHA exato do artefato continua obrigatório.

Fluxo preferencial: `atividade → review → correção → recheck`. Achado pequeno não cria automaticamente novo ID. Novo ID é reservado a novo escopo material, nova decisão ou operação independente.

## Manutenção documental e snapshots

Atualização factual de `CONTEXT.md`, `PROJECT_STATE.md`, índices, status de PR/Issue, datas, SHAs, links e handoffs é R0 por padrão e não exige revisão independente.

Se a documentação alterar arquitetura, segurança, política, decisão de produto, autorização, governança ou regra operacional material, classificar R2 ou R3 conforme o conteúdo.

Usar, quando adequado: `Estado observado em DD/MM/AAAA HH:MM BRT`. Um fato correto no snapshot não se torna erro porque o projeto avançou depois. Diferenciar estado observado, estado atual e histórico.

## Handoff proporcional

- **R0/R1:** resultado; arquivos/SHA/PR quando houver; verificações; pendências; próximo passo.
- **R2:** handoff técnico proporcional ao impacto.
- **R3:** Preparado, Executado, Validado, autorização, evidências, rollback e estado produtivo.

Não repetir campos `não aplicável` mecanicamente em R0/R1.

## Autorizações permanentes de baixo risco

O responsável autoriza, sem nova consulta, correções factuais, manutenção documental, contexto, links/datas/status, formatação, testes, lint, ajustes sem mudança material de comportamento e manutenção necessária para coerência documental.

Essa autorização **não** cobre merge de mudança material sem gate, deploy material, migration, secrets, exclusões, SQL produtivo, mudança arquitetural, decisão de produto ou operação destrutiva.

## Melhoria contínua da governança

O Gerente Geral tem autorização permanente para **identificar, propor e corrigir** gargalos, contradições, loops e burocracias desnecessárias de governança quando a correção não reduzir controles materiais de segurança, dados, tenant ou produção.

Princípios:
- cada bloqueio procedural recorrente deve gerar aprendizado e, quando aplicável, correção permanente da regra ou do fluxo;
- não repetir indefinidamente uma orientação que já falhou pelo mesmo motivo formal;
- antes de emitir um prompt de execução, fazer **pré-checagem de bloqueios previsíveis**, incluindo sessão/tipo de gate, autorizações vigentes, SHA/estado do PR, dependências e condições que possam impedir a próxima etapa;
- preferir a menor intervenção segura: R0/R1 podem ser corrigidos no fluxo contínuo quando cobertos por autorização permanente; mudança material de governança continua R2/R3;
- não criar nova GOV, Issue, chat, LOCK ou revisão apenas para sincronização factual ou ajuste procedural R0 quando a própria v2 não exigir;
- registrar a lição aprendida na diretriz canônica quando a falha revelar deficiência sistêmica do processo.

A autorização de melhoria contínua **não é carta branca para reduzir controle material**. Mudanças que afetem arquitetura, segurança, auth, RLS, isolamento tenant, dados privados, SQL produtivo, migrations, exclusões, infraestrutura material ou operação destrutiva seguem a classificação R2/R3 e seus gates.

## Controles que não são flexibilizados

Permanecem obrigatórios:
- proteção de secrets e dados privados;
- RLS, auth e integridade tenant;
- autorização para operações materiais;
- backup/restore quando aplicável à destruição de dados;
- revisão independente real para R2/R3 quando exigida;
- proibição de alegar evidência inexistente;
- artefatos operacionais R3 versionáveis em `radar-fiscal-backend/ops/<frente>/`;
- capacidade de ferramenta validada ao vivo para operações destrutivas, inclusive exclusão de serviço Railway.

## Compatibilidade C-01…C-12

| Regra anterior | Situação v2 | Regra vigente após o merge da v2 |
| --- | --- | --- |
| C-01 continuidade/Gate 0 | Flexibilizada | Gate 0 proporcional; handoff/UNLOCK só quando aplicáveis ao risco |
| C-02 fail-fast total | Substituída | Bloquear somente parte dependente; fail-safe total apenas para risco material |
| C-03 um tipo de gate por sessão | Substituída | Executor pode atravessar etapas; revisão independente continua separada |
| C-04 executor único universal | Flexibilizada | Exclusividade apenas quando houver conflito real/LOCK ou R3 |
| C-05 LOCK/UNLOCK universal e órfão só pelo usuário | Substituída | LOCK por risco, lease temporário e substituição segura com evidência |
| C-06 revisão por sessão/SHA | Mantida com ajuste | Independência preservada; revisão incremental permitida; R3 mantém SHA exato |
| C-07 autorizações explícitas | Mantida com ajuste | Material exige autorização; baixo risco pode usar autorização permanente |
| C-08 prompts completos/mensuráveis | Mantida proporcionalmente | Detalhe acompanha risco; sem burocracia irrelevante |
| C-09 `ops/<frente>/` e dados privados | Mantida | Continua obrigatória para artefatos operacionais/dados |
| C-10 salvaguardas destrutivas | Mantida para R3 | Backup/restore/dry-run/rollback quando aplicáveis |
| C-11 exclusão Railway depende da ferramenta | Mantida para R3 | Capacidade verificada ao vivo e autorização/salvaguardas preservadas |
| C-12 handoff Preparado/Executado/Validado | Flexibilizada | Completo em R3; proporcional em R2; simples em R0/R1 |

## Precedência

Após o merge autorizado da GOV-16, esta v2 substitui formulações incompatíveis nos documentos antigos. Segurança, privacidade, integridade tenant e regras técnicas mais restritivas continuam prevalecendo. Até o merge, a versão anterior existente em `main` continua vigente.
