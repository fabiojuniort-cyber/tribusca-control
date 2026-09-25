# TriBusca — Segurança da governança

- Não publicar secrets, DATABASE_URL, cookies, tokens, conteúdo sensível de tenant ou logs completos com credenciais em Issues/PRs.
- Usar acesso mínimo necessário aos repositórios e serviços. Credenciais permanecem nos serviços apropriados; não copiar para tribusca-control.
- Leituras em produção devem ser READ ONLY quando a tarefa for diagnóstica; registrar SQL/resultado sintético sem expor dados pessoais.
- Merges, deploys, migrations, alterações de secrets, exclusão de dados/serviços e scripts de repair exigem autorização vigente e gate explícito na Issue. Autorização já dada para uma tarefa específica não se estende a outra.
- Não dar a um agente não supervisionado permissão de produção apenas para facilitar o handoff.
- PRs de POC, histórico/repair e fontes não priorizadas não são incorporados pela existência no GitHub.
- Evidências publicadas em GitHub privado ainda devem ser sanitizadas.
