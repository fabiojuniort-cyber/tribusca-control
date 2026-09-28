# TriBusca — Segurança da governança

- Não publicar secrets, DATABASE_URL, cookies, tokens, conteúdo sensível de tenant ou logs completos com credenciais em Issues/PRs.
- Usar acesso mínimo necessário aos repositórios e serviços. Credenciais permanecem nos serviços apropriados; não copiar para tribusca-control.
- Leituras em produção devem ser READ ONLY quando a tarefa for diagnóstica; registrar SQL/resultado sintético sem expor dados pessoais.
- Merges, deploys, migrations, alterações de secrets, exclusão de dados/serviços e scripts de repair exigem autorização vigente e gate explícito na Issue. Autorização já dada para uma tarefa específica não se estende a outra.
- Não dar a um agente não supervisionado permissão de produção apenas para facilitar o handoff.
- PRs de POC, histórico/repair e fontes não priorizadas não são incorporados pela existência no GitHub.
- Evidências publicadas em GitHub privado ainda devem ser sanitizadas.

- Para futuras operações preparadas por sessões Claude, runbooks, SQLs e scripts versionáveis ficam em `radar-fiscal-backend/ops/<frente>/`; **dados privados não saem da Railway** e não entram em Issue, PR, commit, comentário, handoff ou resposta. Dumps, manifestos integrais, dados de tenant, credenciais e conteúdo sensível permanecem dentro da Railway ou armazenamento privado explicitamente autorizado.
- Operação produtiva material/destrutiva exige salvaguardas definidas antes da execução: preflight read-only; backup dentro da Railway; restauração testada em Postgres temporário; artefato exato commitado e revisado; dry-run com resultado igual ao esperado; transação/rollback quando suportado; e queries de validação pós-execução definidas previamente. Divergência em qualquer salvaguarda bloqueia EXECUÇÃO.
- Limitação de ferramenta é um gate: se a sessão Claude não possuir operação suportada para excluir serviço Railway, registrar como não executado e encaminhar o handoff; não simular exclusão removendo outro recurso.
