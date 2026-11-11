# Orquestração de modelos e sub-agentes (Claude e GPT)

Referência canônica para o uso de um modelo principal que delega trabalho mecânico a sub-agentes mais baratos, reduzindo tokens sem reduzir segurança. Vale para **Claude** e **GPT**; os repositórios `radar-fiscal-backend`, `radar-fiscal-web` e `tribusca-control` trazem um resumo no `AGENTS.md` (e `CLAUDE.md`, que o importa).

Esta política **complementa** a Governança Flexível v2 ([CLAUDE_SESSION_PROTOCOL.md](CLAUDE_SESSION_PROTOCOL.md)); não a substitui nem a flexibiliza.

## 1. Papel do modelo principal (orquestrador)

Planeja, decide, delega e revisa. Fluxo por tarefa:
1. Entender o pedido e classificar o risco (R0–R3). Perguntar só o que muda a decisão.
2. Plano curto (3 a 7 passos), indicando o que faz diretamente e o que delega.
3. Delegar passos independentes em paralelo.
4. Revisar o retorno; nunca confiar cegamente em sub-agente.
5. Resumir: feito, verificado, pendente/riscos, delegações usadas.

## 2. Camadas de modelo

| Camada | Claude | GPT | Usar para |
|---|---|---|---|
| **Leve** | Haiku | modelo mini/leve disponível | Buscar arquivos e trechos, mapear usos, listar rotas/endpoints, ler e resumir logs, checagens simples, formatação. **Somente leitura.** |
| **Intermediária** | Sonnet | modelo intermediário disponível | Implementar funções bem especificadas, escrever testes, refactors repetitivos, corrigir bug localizado, documentação técnica |
| **Principal** | Opus | modelo principal/de raciocínio | Arquitetura, regras fiscais e de negócio, migrations/banco, segurança/RLS/tenant, bug sem causa clara, revisão final, trade-offs |

Os nomes de modelo mudam com o tempo: o que vale é a camada. Na dúvida entre duas camadas, **suba** se o erro for caro (fiscal, dados, produção) e **desça** se for leitura/busca.

## 3. Relação com risco (R0–R3)

- **R0/R1:** delegação livre conforme a tabela acima.
- **R2:** código e testes podem ser delegados à camada intermediária; a revisão material continua sendo da camada principal.
- **R3 (crítico/produtivo):** planejamento, preparação, execução e verificação ficam com a camada principal. Sub-agentes só leem/buscam. Nenhuma escrita produtiva, destrutiva ou de migration é delegada.

## 4. Como delegar (o sub-agente começa sem contexto)

Todo prompt de delegação contém:
- objetivo em uma frase;
- repositório e arquivos/pastas relevantes;
- restrições (o que não alterar, padrões do projeto, Issue de referência);
- critério de pronto (ex.: "teste X passa", "lista de arquivo:linha");
- formato de resposta curto: só o resultado, sem despejar código desnecessário.

## 5. Quando NÃO delegar

- Tarefa pequena (1–2 arquivos conhecidos): fazer direto; delegar custa mais.
- Decisão de regra fiscal/de negócio, segurança, tenant, auditoria.
- Qualquer coisa que dependa de muito contexto da conversa.

## 6. Limites inegociáveis

- **Sub-agente não é revisor independente.** A revisão independente exigida pela governança continua sendo uma sessão diferente da que produziu a mudança; delegar a um sub-agente da mesma sessão não a substitui.
- **Railway AI Agent é proibido**, inclusive para sub-agentes ([RAILWAY_AI_AGENT_POLICY.md](RAILWAY_AI_AGENT_POLICY.md), D-065). Não delegar nada que o use.
- Secrets, dados privados, RLS, auth, tenant e operações destrutivas seguem [SECURITY.md](SECURITY.md); a delegação não relaxa nenhum gate.
- Sub-agentes de busca/leitura não editam arquivos; só a camada intermediária/principal edita.
- Sub-agentes não fazem commit, push, merge, deploy nem comentam em Issue/PR; isso é do orquestrador, na branch designada.
- CI draft `DRAFT_FAST_ONLY`: não rerodar nem criar commit só para limpar o aviso.
- Não inventar dados fiscais, publicações ou estados de produto; status continuam factuais.

## 7. Economia de tokens

- Respostas resumidas dos sub-agentes; não reler arquivos já lidos.
- Agrupar buscas independentes numa única rodada paralela.
- Registrar no fechamento quais sub-agentes foram usados e para quê (uma linha cada).

## 8. Implementação por ferramenta

- **Claude Code:** o orquestrador dispara sub-agentes com a ferramenta `Agent`, escolhendo o modelo (`haiku`, `sonnet`, `opus`) por chamada; sem escolha, herda o modelo da sessão. Um *fork* sempre usa o modelo da sessão, então não gera economia. Esta política é a autorização permanente do projeto para criar sub-agentes.
- **GPT (Codex/ChatGPT/Agents):** usar o mecanismo de sub-tarefa/sub-agente da ferramenta, selecionando o modelo da camada correspondente. Se a ferramenta não permitir escolher o modelo ou criar sub-agentes, trabalhar em sessão única e aplicar apenas as seções 1, 4, 5 e 6.
