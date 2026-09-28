# TriBusca — Protocolo de sessões Claude

Aprovado em 27/09/2026. Este protocolo governa sessões Claude designadas pelo Gerente para execução, preparação, revisão ou execução produtiva. Ele complementa `AGENTS.md`, `docs/AGENT_ROLES.md`, `docs/REVIEW_AND_GATES.md`, `docs/HANDOFF.md`, `docs/SECURITY.md` e `docs/CONTEXT_MAINTENANCE.md`. Não altera regras técnicas de coleta, produto ou arquitetura.

## Doze regras obrigatórias

### C-01 — Gate 0 é sempre o primeiro passo
Todo prompt de sessão Claude começa por um Gate 0, nesta ordem:
1. confirmar capacidade de push nos repositórios necessários, sem alterar `main`;
2. confirmar acesso ao projeto/ambiente Railway exigido pela atividade;
3. ler a Issue da frente e adquirir a trava de executor.

Nenhum trabalho da tarefa começa antes dos três itens passarem.

### C-02 — Gate 0 falha rápido e sem trabalho parcial
Se qualquer item do Gate 0 falhar, a sessão deve identificar o bloqueio exato e encerrar o caminho em até aproximadamente 10 minutos, sem branch funcional, código, script, preparação ou operação parcial. Se o LOCK já tiver sido adquirido antes de uma falha posterior, liberar o LOCK antes de encerrar.

### C-03 — Uma sessão executa um único tipo de gate
Cada sessão declara exatamente um dos quatro tipos abaixo e não mistura responsabilidades:
- **CÓDIGO:** altera código/documentação da entrega em branch própria, executa testes e busca CI verde; não atua em produção.
- **PREPARAÇÃO:** realiza preflight somente leitura e prepara artefatos operacionais exatos; não executa a mudança produtiva.
- **REVISÃO:** sessão separada que apenas audita e aprova/reprova o material ou resultado; não corrige a própria mudança revisada.
- **EXECUÇÃO:** aplica somente o procedimento previamente preparado/aprovado e autorizado; não cria correção de código ad hoc na mesma sessão.

### C-04 — Executor único por gate
Uma atividade/gate admite somente uma sessão executora ativa com permissão de escrita ou operação. Outra sessão pode ser revisor independente, mas não pode atuar como segundo executor concorrente. Trabalho paralelo só é permitido quando Issues/gates e superfícies de escrita são independentes.

### C-05 — LOCK/UNLOCK é obrigatório
A trava é registrada na Issue com:
- `LOCK: <atividade> <data/hora BRT>`
- `UNLOCK: <atividade> <data/hora BRT>`

Se houver LOCK aberto de outra sessão, a nova sessão para no Gate 0. O UNLOCK é obrigatório ao final, inclusive em falha ou bloqueio ocorrido depois da aquisição da trava.

### C-06 — Revisão independente usa sessão própria
A sessão que preparou ou executou uma mudança não pode declarar sua própria revisão independente. O revisor recebe o head/artefato exato, critérios mensuráveis e evidências, trabalha em sessão distinta e retorna parecer aprovado/reprovado com achados verificáveis.

### C-07 — Autorizações ficam explícitas no prompt
Todo prompt operacional separa, quando aplicável:
- **AUTORIZADO SEM NOVA CONSULTA**
- **REQUER DECISÃO DO USUÁRIO**

Permissões não são inferidas de tarefas anteriores. Merge, deploy, migration, alteração de secret, exclusão, repair destrutivo ou outra ação material só ocorre quando coberta explicitamente pela autorização vigente.

### C-08 — Prompts são curtos e critérios são mensuráveis
Prompts de sessão devem ter como alvo aproximadamente 40 linhas, usando links/IDs para documentos canônicos em vez de repetir contexto extenso. Podem exceder esse alvo somente quando segurança ou ambiguidade material exigir. Critérios de aceite devem ser observáveis: SHA, arquivo, contagem, status de CI/deploy, resposta HTTP, resultado de teste, ausência/presença de mudança ou outro PASS/FAIL verificável.

### C-09 — Artefatos operacionais futuros vivem em `ops/<frente>/`
Runbooks, SQLs e scripts operacionais futuros do backend devem ser versionados em `radar-fiscal-backend/ops/<frente>/`, vinculados à Issue e revisados antes de execução. Dados privados, dumps, manifestos integrais, credenciais e conteúdo sensível permanecem na Railway ou outro armazenamento autorizado; GitHub recebe apenas evidência sanitizada, IDs, hashes e resultados sintéticos.

Este protocolo apenas define o destino futuro; GOV-04 não cria scripts nem diretórios DOE-SP.

### C-10 — Preparação de operação de risco exige salvaguardas completas
Quando houver futura PREPARAÇÃO para operação produtiva material ou destrutiva, exigir antes da EXECUÇÃO:
- preflight somente leitura;
- backup adequado;
- **teste de restauração**, não apenas existência do backup;
- dry-run quando tecnicamente possível;
- transação/rollback quando suportado;
- script/SQL/runbook exato versionado;
- critérios de validação pós-execução definidos antes da mudança.

Ausência de qualquer salvaguarda obrigatória reprova a preparação ou deve ser registrada como exceção que requer decisão explícita.

### C-11 — Limitação de exclusão de serviços Railway pelo Claude
Claude não deve alegar que excluiu um serviço Railway quando a ferramenta disponível não expõe operação de exclusão de serviço. Nesse caso, a exclusão fica como ação não executada e deve ser encaminhada em handoff para o usuário ou executor que possua ferramenta suportada. Não substituir exclusão de serviço por remoção de deployment, variável ou outro recurso diferente. Revalidar a capacidade se o conjunto de ferramentas mudar.

### C-12 — Handoff separa Preparado, Executado e Validado
Todo handoff operacional distingue explicitamente:
- **Preparado:** plano/artefato existe e está pronto para o próximo gate; não significa execução.
- **Executado:** ação foi aplicada; não significa validação independente.
- **Validado:** critérios pré-definidos e, quando exigido, revisão independente foram concluídos com evidência.

O handoff registra bloqueios, ações não executadas e o próximo gate. Nunca usar um desses estados como sinônimo dos demais.

## Modelo mínimo para prompts de sessão

Além dos campos de identificação já exigidos pela governança, incluir:

- Tipo de gate: CÓDIGO | PREPARAÇÃO | REVISÃO | EXECUÇÃO
- Repositório(s) necessário(s) para push
- Railway: projeto e ambiente a verificar
- GATE 0
- AUTORIZADO SEM NOVA CONSULTA
- REQUER DECISÃO DO USUÁRIO
- Critérios de aceite mensuráveis
- Condição de LOCK/UNLOCK
- Resultado/handoff esperado

## Precedência e escopo

Este protocolo define disciplina de sessão e evidência. Ele não altera regras técnicas de fonte, produto, banco, deduplicação, segurança de tenant ou roadmap. Em conflito com um gate técnico mais restritivo, prevalece o requisito mais seguro e específico.

Para atividades que não usam Claude, os documentos gerais de governança continuam válidos; o Gerente pode reutilizar estas salvaguardas em outros modelos quando fizer sentido.
