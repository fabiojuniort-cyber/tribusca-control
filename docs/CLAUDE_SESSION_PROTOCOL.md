# TriBusca — Protocolo de sessões Claude

**Status: proposta em revisão no [PR #13](https://github.com/fabiojuniort-cyber/tribusca-control/pull/13) (draft).** Passa a valer somente depois do merge em `main`, que depende de decisão do usuário; a data de vigência é a data desse merge. Este protocolo governa sessões Claude designadas pelo Gerente para código, preparação, revisão ou execução produtiva. Ele complementa `AGENTS.md`, `docs/AGENT_ROLES.md`, `docs/REVIEW_AND_GATES.md`, `docs/HANDOFF.md`, `docs/SECURITY.md` e `docs/CONTEXT_MAINTENANCE.md`. Não altera regras técnicas de coleta, produto ou arquitetura.

## Definições e limites de prova

- **Sessão:** uma conversa/instância de agente, identificada pelo identificador que a própria ferramenta fornece (por exemplo, o ID `session_…` do Claude Code ou a URL do chat). Atividades diferentes na mesma conversa pertencem à mesma sessão.
- **Modelo efetivo:** o modelo informado pelos metadados da ferramenta da sessão. Se a ferramenta não expuser esse dado, registrar `modelo declarado, não verificado pela ferramenta`.
- **Participação:** lista das atividades (IDs) em que a sessão já atuou no mesmo PR/Issue, com o tipo de gate de cada uma.
- **Limite de prova:** todos os comentários e commits usam a mesma conta GitHub do responsável; **a conta GitHub não prova qual sessão escreveu**. O identificador e o modelo registrados no LOCK são declarações da sessão, apoiadas nos metadados da ferramenta quando existirem. Quem pode confirmar de forma independente qual chat é qual é o usuário, que abre os chats. Nenhum registro deve alegar prova que a ferramenta não fornece.
- **Modelo não invalida revisão (decisão do usuário em 27/09/2026, GOV-08):** revisão feita por Claude ou por GPT é válida. Divergência entre o modelo designado e o modelo efetivo é registrada no LOCK e no handoff, mas não reprova nem bloqueia a atividade. O que torna uma revisão inválida é a falta de independência (C-06), não o modelo.

## Doze regras obrigatórias

### C-01 — Continuidade entre sessões e Gate 0
**Antes de emitir um novo prompt operacional**, o Gerente deve confirmar que a sessão anterior entregou o handoff esperado e registrou o respectivo `UNLOCK`. Se o handoff ou o UNLOCK anterior estiver ausente, o novo prompt não é emitido como continuação normal: o Gerente aplica o procedimento de LOCK órfão (C-05) e leva a decisão ao usuário.

Todo prompt de sessão Claude começa por um Gate 0, nesta ordem:
1. confirmar capacidade de push nos repositórios necessários, sem alterar `main`;
2. quando a atividade exigir Railway, confirmar acesso ao projeto/ambiente indicado; quando não exigir, registrar `Railway: não aplicável`;
3. registrar identificador da sessão, modelo efetivo (com a fonte do dado) e participação anterior no mesmo PR/Issue; em REVISÃO, confirmar a não participação exigida em C-06;
4. ler a Issue da frente, confirmar o `UNLOCK` da sessão anterior quando houver e verificar se existe LOCK vigente (C-05);
5. somente sem LOCK vigente, registrar a trava da sessão atual no formato de C-05.

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
Uma atividade/gate admite somente uma sessão executora ativa com permissão de escrita ou operação, identificada pelo LOCK vigente (C-05). Outra sessão pode ser revisor independente, mas não pode atuar como segundo executor concorrente. Trabalho paralelo só é permitido quando Issues/gates e superfícies de escrita são independentes.

### C-05 — LOCK/UNLOCK é obrigatório e identificado
A trava é registrada na Issue com:
- `LOCK: <atividade> <data/hora BRT> | sessão <identificador> | modelo <efetivo> | tipo <gate> | participação anterior: <atividades ou nenhuma>`
- `UNLOCK: <atividade> <data/hora BRT> | sessão <identificador>`

**LOCK vigente** é o LOCK mais recente sem `UNLOCK` posterior da mesma atividade e do mesmo identificador de sessão, e sem `UNLOCK-ÓRFÃO` posterior. Registros anteriores a este formato (só atividade e hora) são lidos pela atividade. Se houver LOCK vigente, a nova sessão para. O UNLOCK é obrigatório ao final, inclusive em falha ou bloqueio ocorrido depois da aquisição da trava.

**LOCK órfão** — quando a sessão dona da trava encerrou ou não responde sem registrar UNLOCK:
1. **Detecção:** o Gerente (somente leitura) ou a sessão que encontrou a trava no Gate 0 aponta a suspeita, com evidência: link do LOCK, horário do último comentário/commit/push ligado à atividade e estado da branch/PR.
2. **Decisão:** cabe **somente ao usuário**, que sabe quais chats estão abertos. Preferencialmente, o usuário volta à sessão original e pede o UNLOCK normal. Se não for possível, o usuário decide liberar a trava; o Gerente transcreve essa decisão no próximo prompt com a origem (C-07).
3. **Liberação:** a nova sessão, no Gate 0 e antes do seu LOCK, registra `UNLOCK-ÓRFÃO: <atividade> <data/hora BRT> | liberado por sessão <identificador> | decisão do usuário: <origem> | evidência: <links>`.
4. **Consequências:** o trabalho da sessão órfã não é validado por esse ato; commits dela entram no escopo da próxima REVISÃO. Se a sessão órfã voltar, não escreve mais e só retoma com novo prompt e novo Gate 0.

Sem decisão do usuário, a trava não é liberada e a sessão encerra pelo Gate 0.

**Checklist dos gates na Issue:** fica no **corpo da Issue**, em uma seção `Checklist de gates`; comentários registram eventos, mas não substituem o checklist. Cada item traz atividade, tipo de gate, SHA ou recurso, estado e link da evidência. A sessão executora de cada atividade atualiza o próprio item antes do UNLOCK; o revisor atualiza o item da revisão com o resultado e o SHA revisado; o Gerente lê e aponta divergências, sem editar. LOCK/UNLOCK não substitui esse checklist.

### C-06 — Revisão independente usa sessão própria e referência imutável
A sessão que preparou ou executou uma mudança não pode declarar sua própria revisão independente. O revisor trabalha em **outra sessão** e recebe:
- SHA exato do commit/head a revisar;
- para script/SQL/runbook, o **SHA exato do artefato versionado** ou commit que o contém;
- checklist completo do gate;
- critérios mensuráveis de aprovação;
- **critérios explícitos de reprovação/bloqueio**;
- evidências e valores esperados.

**Não participação:** o identificador do revisor não pode aparecer em LOCK de atividade CÓDIGO, PREPARAÇÃO ou EXECUÇÃO que tenha produzido commits no intervalo revisado. O revisor confere isso nos LOCKs da Issue e declara no parecer seu identificador, modelo efetivo e participação anterior. Quando a Issue tiver LOCKs sem identificador (formato antigo), a não participação é declarada pelo revisor e confirmada pelo usuário. Em conta GitHub compartilhada, o evento do review pode ser apenas `COMMENT`; o resultado vale pelo texto do parecer.

O parecer deve ser registrado no PR/Issue aplicável e **citar expressamente o SHA revisado**. **Qualquer novo commit no head, inclusive merge da `main`, invalida o parecer anterior.** A nova revisão cobre o novo SHA inteiro; pode usar o diff desde o SHA anterior como foco, mas o parecer cita o SHA completo revisado.

### C-07 — Autorizações vigentes são explícitas e persistentes
Todo prompt operacional separa, quando aplicável:
- **AUTORIZADO SEM NOVA CONSULTA**
- **REQUER DECISÃO DO USUÁRIO**

Autorizações **explicitamente concedidas e ainda aplicáveis ao mesmo escopo persistem entre sessões**; o usuário não deve ser solicitado a concedê-las novamente. O Gerente **transcreve no novo prompt** cada autorização persistente com:
- **escopo:** repositórios, serviços, ação e, quando houver, SHA ou artefato;
- **origem verificável:** link de comentário na Issue, de entrada em `DECISIONS.md` ou o próprio prompt enviado pelo usuário, com data;
- **término:** a autorização acaba quando o gate do escopo é concluído ou a Issue é fechada, quando o usuário a revoga, quando vence um prazo explícito ou quando a premissa muda. Autorização ligada a um SHA ou artefato (merge, execução de script) não passa para outro SHA.

A sessão confere a origem no Gate 0. Origem ausente, inacessível ou divergente do escopo = autorização inexistente, e a ação vai para **REQUER DECISÃO DO USUÁRIO**. Não se presume autorização que nunca foi concedida, que expirou, foi revogada ou pertence a outro escopo.

Merge, deploy, migration, alteração de secret, exclusão, repair destrutivo ou outra ação material só ocorre quando coberta explicitamente pela autorização vigente transcrita no prompt.

### C-08 — Prompts são curtos, completos e mensuráveis
Prompts de sessão devem ter como alvo aproximadamente 40 linhas, usando links/IDs para documentos canônicos em vez de repetir contexto extenso. Podem exceder esse alvo somente quando segurança ou ambiguidade material exigir.

Cada prompt operacional explicita, quando aplicável:
- datas de **início e fim** da janela a processar em coleta/recaptura;
- projeto/ambiente Railway e **serviços exatos** envolvidos, ou `Railway: não aplicável`;
- repositório, **branch**, SHA/head e PR;
- autorizações vigentes transcritas com escopo, origem e término;
- pendências herdadas, cada uma com **critério próprio de fechamento**;
- valores/contagens/status **esperados** antes de agir;
- critérios de aceite e de reprovação.

Critérios devem ser observáveis: SHA, arquivo, contagem, status de CI/deploy, resposta HTTP, resultado de teste, ausência/presença de mudança ou outro PASS/FAIL verificável. Se coleta/recaptura não se aplicar, o prompt deve registrar explicitamente `não aplicável`.

### C-09 — Artefatos operacionais futuros vivem em `ops/<frente>/`
Runbooks, SQLs e scripts operacionais futuros do backend devem ser versionados em `radar-fiscal-backend/ops/<frente>/`, vinculados à Issue e revisados antes de execução.

**Dados privados não saem da Railway nem são copiados para Issue, PR, commit, comentário, handoff ou resposta ao usuário/agente.** Dumps, backups, restaurações de teste, manifestos integrais, dados de tenant, credenciais e conteúdo sensível permanecem dentro da Railway ou em armazenamento privado explicitamente autorizado pelo usuário (C-07). Fora dela, registrar somente evidência sanitizada, IDs não sensíveis, hashes e resultados agregados/sintéticos suficientes para o gate.

Este protocolo apenas define o destino futuro; o PR #13 não cria scripts nem diretórios DOE-SP.

### C-10 — Operação destrutiva exige preparação reproduzível e validada
Para operação produtiva material/destrutiva, a PREPARAÇÃO deve provar **antes da EXECUÇÃO** as salvaguardas aplicáveis ao tipo de alvo.

**Sempre:**
- preflight somente leitura;
- artefato exato **commitado e revisado**: script/SQL/runbook, ou runbook com os IDs exatos dos recursos quando a ação for feita por ferramenta;
- queries/comandos de validação pós-execução definidos **antes** da mudança, com valores esperados;
- plano de reversão, ou registro explícito de que a ação é irreversível;
- checklist da Issue marcando cada salvaguarda e sua evidência.

**Quando o alvo contém dados de banco (PostgreSQL):**
- backup criado **dentro da Railway**;
- restauração do backup **testada em Postgres temporário provisionado dentro da Railway** (mesmo projeto ou outro projeto Railway privado do responsável), nunca em máquina local, container de agente ou serviço externo; a remoção desse Postgres temporário depois do teste entra no checklist (se a ferramenta não permitir, vira pendência de handoff, C-11);
- dry-run com **contagem/resultado exatamente igual ao valor esperado definido previamente**;
- fase destrutiva **dentro de transação** com rollback definido, quando o banco/ação suportar.

**Quando o alvo é infraestrutura sem dados de banco** (serviço, deployment, variável, domínio):
- inventário da configuração atual dentro da Railway ou em registro sanitizado (IDs, nomes de variáveis, nunca valores secretos);
- confirmação de que nenhum outro serviço depende do recurso;
- uso das alterações em estágio (*staged changes*) da Railway como dry-run, quando a ferramenta oferecer.
Volume com dados é tratado como dado: exige backup e restauração testada dentro da Railway.

Uma salvaguarda só é `não aplicável` com justificativa no checklist (por exemplo, ação sem suporte a transação). Qualquer divergência no restore, revisão do SHA, dry-run, contagem esperada, transação/rollback ou queries de validação **bloqueia o gate EXECUÇÃO**. **Única exceção:** dispensa explícita do usuário, registrada na Issue antes da execução, citando a salvaguarda dispensada, o motivo e o risco aceito. Gerente, executor e revisor não podem dispensar salvaguardas.

### C-11 — Exclusão de serviços Railway depende da ferramenta da sessão
A capacidade de excluir um serviço Railway depende do conjunto de ferramentas de cada sessão e deve ser verificada ao vivo quando a atividade envolver exclusão. Se a ferramenta expuser a operação, a exclusão continua sendo ação destrutiva e exige autorização (C-07) e salvaguardas (C-10). Se não expuser, Claude não deve alegar que excluiu: a exclusão fica como ação não executada e é encaminhada em handoff ao usuário ou a executor com ferramenta suportada. Não substituir exclusão de serviço por remoção de deployment, variável ou outro recurso diferente.

### C-12 — Handoff separa Preparado, Executado e Validado
Todo handoff operacional distingue explicitamente:
- **Preparado:** plano/artefato existe e está pronto para o próximo gate; não significa execução.
- **Executado:** ação foi aplicada; não significa validação independente.
- **Validado:** critérios pré-definidos e, quando exigido, revisão independente foram concluídos com evidência.

O handoff registra obrigatoriamente:
- identificador da sessão, modelo efetivo e participação anterior;
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
- Railway: projeto, ambiente e serviços exatos, ou `não aplicável`
- Branch, SHA/head e PR
- Coleta/recaptura: datas inicial/final ou `não aplicável`
- Handoff + UNLOCK da sessão anterior confirmados pelo Gerente (ou decisão do usuário sobre LOCK órfão)
- Em REVISÃO: sessões/atividades que não podem revisar (participantes do intervalo revisado)
- GATE 0, incluindo identificação de sessão/modelo e verificação do LOCK vigente
- AUTORIZADO SEM NOVA CONSULTA, com escopo, origem e término de cada autorização persistente
- REQUER DECISÃO DO USUÁRIO
- Pendências herdadas, cada uma com critério próprio
- Valores esperados
- Critérios de aceite e reprovação mensuráveis
- Condição de LOCK/UNLOCK
- Resultado/handoff esperado

## Precedência e escopo

Este protocolo define disciplina de sessão e evidência. Ele não altera regras técnicas de fonte, produto, banco, deduplicação, segurança de tenant ou roadmap. Em conflito com um gate técnico mais restritivo, prevalece o requisito mais seguro e específico. A escolha do modelo (GPT ou Claude) não é gate técnico: menções a GPT-5.6 como executor/revisor em outros documentos descrevem o padrão e não excluem Claude quando o prompt o designar.

Para atividades que não usam Claude, os documentos gerais de governança continuam válidos; o Gerente pode reutilizar estas salvaguardas em outros modelos quando fizer sentido.
