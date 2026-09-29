# TriBusca — Segurança da governança

- Não publicar secrets, DATABASE_URL, cookies, tokens, conteúdo sensível de tenant ou logs completos com credenciais em Issues/PRs.
- Usar acesso mínimo necessário aos repositórios e serviços. Credenciais permanecem nos serviços apropriados; não copiar para tribusca-control.
- Leituras em produção devem ser READ ONLY quando a tarefa for diagnóstica; registrar SQL/resultado sintético sem expor dados pessoais.
- Merges, deploys, migrations, alterações de secrets, exclusão de dados/serviços e scripts de repair exigem autorização vigente e gate explícito na Issue. Autorização já dada para uma tarefa específica não se estende a outra.
- Não dar a um agente não supervisionado permissão de produção apenas para facilitar o handoff.
- PRs de POC, histórico/repair e fontes não priorizadas não são incorporados pela existência no GitHub.
- Evidências publicadas em GitHub privado ainda devem ser sanitizadas.

- Para futuras operações preparadas por sessões Claude, runbooks, SQLs e scripts versionáveis ficam em `radar-fiscal-backend/ops/<frente>/`; **dados privados não saem da Railway** e não entram em Issue, PR, commit, comentário, handoff ou resposta. Dumps, backups, restaurações de teste, manifestos integrais, dados de tenant, credenciais e conteúdo sensível permanecem dentro da Railway ou em armazenamento privado explicitamente autorizado pelo usuário.
- Operação produtiva material/destrutiva exige, antes da execução, as salvaguardas de C-10 aplicáveis ao alvo: sempre preflight read-only, artefato/runbook exato commitado e revisado, validação pós-execução definida previamente e plano de reversão; para dados de banco, backup dentro da Railway, restauração testada em Postgres temporário **dentro da Railway**, dry-run com resultado igual ao esperado e transação/rollback quando suportado; para infraestrutura sem banco, inventário sanitizado, ausência de dependentes e *staged changes* quando disponíveis. Divergência em qualquer salvaguarda aplicável bloqueia EXECUÇÃO; a única exceção é dispensa explícita do usuário registrada na Issue antes da execução.
- A capacidade de excluir serviço Railway depende da ferramenta de cada sessão e é verificada ao vivo: se existir, a exclusão continua exigindo autorização e salvaguardas; se não existir, registrar como não executado e encaminhar o handoff; nunca simular exclusão removendo outro recurso.

## Railway AI Agent

- O **Railway AI Agent é proibido** para qualquer consulta, diagnóstico, troubleshooting ou operação do TriBusca, inclusive serviços, variáveis, logs, banco, SQL, migrations, deploys, redeploys, runs e validação produtiva.
- Railway continua permitida por meios não-AI: Dashboard, CLI/API, conectores oficiais que não sejam o Railway AI Agent, logs nativos e scripts/runbooks versionados.
- Nenhuma evidência de segurança ou gate produtivo pode depender do Railway AI Agent.
- Se um estado não puder ser comprovado por meio permitido, registrar `NOT_PROVEN`; não usar o Agent como atalho.
- Instrução anterior que autorize operações Railway não autoriza o Railway AI Agent. D-065 tem precedência específica sobre esse ponto.
