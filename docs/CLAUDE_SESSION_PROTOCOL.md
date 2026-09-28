# TriBusca — Protocolo de sessões Claude

Aprovado em 27/09/2026. Este protocolo governa sessões Claude designadas pelo Gerente para execução, preparação, revisão ou execução produtiva. Ele complementa `AGENTS.md`, `docs/AGENT_ROLES.md`, `docs/REVIEW_AND_GATES.md`, `docs/HANDOFF.md`, `docs/SECURITY.md` e `docs/CONTEXT_MAINTENANCE.md`. Não altera regras técnicas de coleta, produto ou arquitetura.

## Doze regras obrigatórias

### C-01 — Continuidade entre sessões e Gate 0
**Antes de emitir um novo prompt operacional**, o Gerente deve confirmar que a sessão anterior entregou o handoff esperado e registrou o respectivo `UNLOCK`. Se o handoff ou o UNLOCK anterior estiver ausente, o novo prompt não deve ser emitido como continuação normal; o bloqueio deve ser resolvido primeiro.

Todo prompt de sessão Claude começa por um Gate 0, nesta ordem:
1. confirmar capacidade de push nos repositórios necessários, sem alterar `main`;
2. confirmar acesso ao projeto/ambiente Railway exigido pela atividade;
3. ler a Issue da frente, confirmar o `UNLOCK` da sessão anterior quando houver e verificar se existe qualquer `LOCK` vigente;
4. somente sem LOCK concorrente, registrar a trava da sessão atual.

Nenhum trabalho da tarefa começa antes de todos os itens passarem.

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

O Gate 0 deve verificar a sequência de LOCK/UNLOCK vigente na Issue, não apenas procurar a palavra LOCK. Se houver LOCK sem UNLOCK posterior de outra sessão, a nova sessão para. O UNLOCK é obrigatório ao final, inclusive em falha ou bloqueio ocorrido depois da aquisição da trava.

A **Issue deve conter checklist explícito dos gates** aplicáveis à atividade, com estado e critério próprio para cada etapa; LOCK/UNLOCK não substitui esse checklist.

### C-06 — Revisão independente usa sessão própria e referência imutável
A sessão que preparou ou executou uma mudança não pode declarar sua própria revisão independente. O revisor trabalha em **outra sessão** e recebe:
- SHA exato do commit/head a revisar;
- para script/SQL/runbook, o **SHA exato do artefato versionado** ou commit que o contém;
- checklist completo do gate;
- critérios mensuráveis de aprovação;
- **critérios explícitos de reprovação/bloqueio**;
- evidências e valores esperados.

O parecer deve ser registrado no PR/Issue aplicável e **citar expressamente o SHA revisado**. Qualquer novo commit invalida a aprovação para o conteúdo alterado e exige nova revisão do novo SHA.

### C-07 — Autorizações vigentes são explícitas e persistentes
Todo prompt operacional separa, quando aplicável:
- **AUTORIZADO SEM NOVA CONSULTA**
- **REQUER DECISÃO DO USUÁRIO**

Autorizações **explicitamente concedidas e ainda aplicáveis ao mesmo escopo persistem entre sessões**; o usuário não deve ser solicitado a concedê-las novamente. O Gerente deve **transcrever no novo prompt** a autorização vigente, sua origem/escopo e os limites relevantes. Não se presume autorização que nunca foi concedida, que expirou, foi revogada ou pertence a outro escopo.

Merge, deploy, migration, alteração de secret, exclusão, repair destrutivo ou outra ação material só ocorre quando coberta explicitamente pela autorização vigente transcrita no prompt.

### C-08 — Prompts são curtos, completos e mensuráveis
Prompts de sessão devem ter como alvo aproximadamente 40 linhas, usando links/IDs para documentos canônicos em vez de repetir contexto extenso. Podem exceder esse alvo somente quando segurança ou ambiguidade material exigir.

Cada prompt operacional explicita, quando aplicável:
- datas de **início e fim** da janela a processar em coleta/recaptura;
- projeto/ambiente Railway e **serviços exatos** envolvidos;
- repositório, **branch**, SHA/head e PR;
- autorizações vigentes transcritas;
- pendências herdadas, cada uma com **critério próprio de fechamento**;
- valores/contagens/status **esperados** antes de agir;
- critérios de aceite e de reprovação.

Critérios devem ser observáveis: SHA, arquivo, contagem, status de CI/deploy, resposta HTTP, resultado de teste, ausência/presença de mudança ou outro PASS/FAIL verificável. Se coleta/recaptura não se aplicar, o prompt deve registrar explicitamente `não aplicável`.

### C-09 — Artefatos operacionais futuros vivem em `ops/<frente>/`
Runbooks, SQLs e scripts operacionais futuros do backend devem ser versionados em `radar-fiscal-backend/ops/<frente>/`, vinculados à Issue e revisados antes de execução.

**Dados privados não saem da Railway nem são copiados para Issue, PR, commit, comentário, handoff ou resposta ao usuário/agente.** Dumps, manifestos integrais, dados de tenant, credenciais e conteúdo sensível permanecem dentro da Railway ou armazenamento privado explicitamente autorizado. Fora dela, registrar somente evidência sanitizada, IDs não sensíveis, hashes e resultados agregados/sintéticos suficientes para o gate.

Este protocolo apenas define o destino futuro; GOV-04/GOV-05 não criam scripts nem diretórios DOE-SP.

### C-10 — Operação destrutiva exige preparação reproduzível e validada
Para operação produtiva material/destrutiva, a PREPARAÇÃO deve provar **antes da EXECUÇÃO**:
- preflight somente leitura;
- backup criado **dentro da Railway**;
- restauração do backup **testada em Postgres temporário**, não apenas inspeção da existência do backup;
- script/SQL/runbook **exato, commitado e revisado**;
- dry-run executado quando aplicável, com **contagem/resultado exatamente igual ao valor esperado definido previamente**;
- fase destrutiva executável **dentro de transação** quando o banco/ação suportar transação, com rollback definido;
- queries/comandos de validação pós-execução definidos **antes** da mudança, com valores esperados;
- checklist da Issue marcando cada salvaguarda e sua evidência.

Qualquer divergência no restore, revisão do SHA, dry-run, contagem esperada, transação/rollback ou queries de validação **bloqueia o gate EXECUÇÃO**. Exceção a salvaguarda obrigatória só pode prosseguir após decisão explícita do usuário registrada no prompt.

### C-11 — Limitação de exclusão de serviços Railway pelo Claude
Claude não deve alegar que excluiu um serviço Railway quando a ferramenta disponível não expõe operação de exclusão de serviço. Nesse caso, a exclusão fica como ação não executada e deve ser encaminhada em handoff para o usuário ou executor que possua ferramenta suportada. Não substituir exclusão de serviço por remoção de deployment, variável ou outro recurso diferente. Revalidar a capacidade se o conjunto de ferramentas mudar.

### C-12 — Handoff separa Preparado, Executado e Validado
Todo handoff operacional distingue explicitamente:
- **Preparado:** plano/artefato existe e está pronto para o próximo gate; não significa execução.
- **Executado:** ação foi aplicada; não significa validação independente.
- **Validado:** critérios pré-definidos e, quando exigido, revisão independente foram concluídos com evidência.

O handoff registra obrigatoriamente:
- commits e SHA/head;
- PR e estado draft/ready/merged;
- CI/testes e respectivos IDs/status, quando aplicável;
- deploys e respectivos IDs/status, quando aplicável;
- bloqueios e pendências herdadas;
- **ponto exato de retomada** para a próxima sessão;
- próximo gate;
- ações não executadas;
- comentário/registro do **UNLOCK** da sessão.

Nunca usar Preparado, Executado e Validado como sinônimos, nem omitir um campo aplicável por não haver mudança naquele item.

## Modelo mínimo para prompts de sessão

Além dos campos de identificação já exigidos pela governança, incluir:

- Tipo de gate: CÓDIGO | PREPARAÇÃO | REVISÃO | EXECUÇÃO
- Repositório(s) necessário(s) para push
- Railway: projeto, ambiente e serviços exatos, quando aplicável
- Branch, SHA/head e PR
- Coleta/recaptura: datas inicial/final ou `não aplicável`
- Handoff + UNLOCK da sessão anterior confirmados pelo Gerente
- GATE 0, incluindo verificação do LOCK vigente
- AUTORIZADO SEM NOVA CONSULTA, transcrevendo autorizações persistentes aplicáveis
- REQUER DECISÃO DO USUÁRIO
- Pendências herdadas, cada uma com critério próprio
- Valores esperados
- Critérios de aceite e reprovação mensuráveis
- Condição de LOCK/UNLOCK
- Resultado/handoff esperado

## Precedência e escopo

Este protocolo define disciplina de sessão e evidência. Ele não altera regras técnicas de fonte, produto, banco, deduplicação, segurança de tenant ou roadmap. Em conflito com um gate técnico mais restritivo, prevalece o requisito mais seguro e específico.

Para atividades que não usam Claude, os documentos gerais de governança continuam válidos; o Gerente pode reutilizar estas salvaguardas em outros modelos quando fizer sentido.
