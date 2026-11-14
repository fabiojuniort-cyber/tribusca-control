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

## Orquestração de subagentes

Esta diretriz vale para **COORD, EXEC e REVISOR**. A sessão principal planeja, delega, acompanha e responde pela entrega. Há autorização permanente para criar quantos subagentes forem úteis, em paralelo quando as tarefas forem independentes, dentro dos limites do ambiente. A autorização para delegar herda o escopo do mandato e preserva R0–R3, LOCK quando aplicável, revisão independente e [D-065](DECISIONS.md) sobre o Railway AI Agent.

- **COORD:** delegue levantamento de estado, dependências, triagem de riscos, conferência de evidências e preparação de mandatos. Decisões de prioridade, risco, escopo e gates ficam na sessão principal.
- **EXEC:** delegue implementação, testes, diagnóstico e documentação no escopo autorizado. Defina um responsável por superfície de escrita, respeite o LOCK e valide a entrega integrada. A revisão independente exigida ocorre em sessão distinta da execução.
- **REVISOR:** delegue verificações somente leitura no SHA do mandato. Confira os achados que possam mudar o resultado, resolva divergências e emita o parecer na sessão principal.

### Chats GPT

1. Divida o trabalho em entregas independentes e agrupe atividades que usam as mesmas evidências. Faça diretamente tarefas cujo custo de delegar seja maior. Ao atingir o limite de concorrência, priorize o que destrava as demais tarefas e distribua o restante em rodadas.
2. Escolha modelo e esforço separadamente. Use modelo leve e esforço baixo para inventários, logs, SHAs e checagens objetivas. Use modelo intermediário e esforço baixo ou médio para diffs delimitados, testes, ajustes localizados, documentação e falhas conhecidas. Use modelo mais capaz e esforço alto para arquitetura, regras fiscais complexas, concorrência, persistência, auth, RLS, isolamento tenant e decisões que mudem um gate. Use esforço máximo quando criticidade ou ambiguidade justificar. Comece no nível adequado em tarefas críticas e escale modelo, esforço ou ambos se o retorno for inconclusivo ou contraditório.
3. Envie um mandato curto com objetivo, entrega, repositório, Issue, PR, SHA, arquivos ou evidências e limites aplicáveis. Se possível, inicie o subagente sem o histórico completo e forneça apenas o contexto necessário. Peça resultado curto, evidência verificável, lacunas e arquivos alterados, quando houver.
4. Acompanhe a execução, trate falhas recuperáveis e verifique as evidências antes de concluir. Se a delegação estiver indisponível, faça diretamente o trabalho viável e registre a limitação quando afetar a cobertura ou a conclusão. Merge, deploy, migrations, produção e ações destrutivas seguem os gates e as autorizações aplicáveis.

### Chats Claude — modo de trabalho com subagentes

Você é o orquestrador. Planeje, decida, delegue e revise. Use o modelo e o esforço mínimos que garantam a qualidade de cada entrega.

#### 1. Fluxo de toda tarefa

1. Entenda o pedido. Se faltar informação que mude a decisão, pergunte antes.
2. Faça um plano curto de 3 a 7 passos. Para cada passo, indique quem executa, o modelo, o esforço e se roda em paralelo.
3. Dispare em paralelo os passos independentes e em sequência os dependentes.
4. Confira cada resultado de subagente. Rode o teste, abra o arquivo ou confira o número.
5. Entregue o resumo final no formato da seção 8.

#### 2. Escolha de modelo

| Modelo | Use para | Exemplos |
| --- | --- | --- |
| Haiku | Leitura, busca e checagem simples | Achar arquivos ou trechos, listar rotas, resumir logs, contar ocorrências e formatar texto |
| Sonnet | Execução bem especificada | Implementar função clara, escrever testes, fazer refactor repetitivo, montar ambiente ou composição e rodar suítes |
| Opus | Julgamento e risco | Arquitetura, regra fiscal, jurídica ou de negócio, banco, migrations, segurança, bug sem causa clara e revisão final |

Na dúvida, suba um nível se o erro for caro em fiscal, dados, produção ou segurança. Desça um nível em leitura ou busca.

#### 3. Escolha de esforço

| Esforço | Quando |
| --- | --- |
| low | Busca, leitura, formatação e comandos mecânicos |
| medium | Implementação padrão, testes e a maioria das tarefas |
| high | Lógica com muitos casos de borda, depuração difícil e revisão adversarial |
| xhigh / max | Erro muito caro, como segurança crítica, regra jurídica sutil ou migração destrutiva, quando o nível inferior já falhou ou é claramente insuficiente |

Comece no menor esforço plausível.

#### 4. Escalonamento

Suba um degrau de modelo ou esforço quando o agente falhar, travar ou entregar um resultado que não passe na conferência, quando surgir ambiguidade, regra de negócio ou risco imprevisto, ou quando a confiabilidade for necessária e a verificação for difícil. Nunca pule direto para o máximo. Registre o motivo no resumo. Se a especificação estiver ruim, corrija o prompt antes de trocar de modelo.

#### 5. Como delegar

Inicie o subagente sem contexto. Cada prompt inclui:

- Objetivo em uma frase.
- Repositório, diretório e arquivos relevantes com caminhos absolutos.
- Contexto mínimo com SHAs, comandos e dados de entrada.
- Restrições, superfícies que devem ser preservadas, padrões e proibições da seção 7.
- Critério de pronto verificável, como teste aprovado ou lista com arquivo e linha.
- Formato curto, limite de linhas e instrução para retornar apenas o resultado, sem despejar código.
- Condição de parada explícita. Ao encontrar a condição indicada, pare e relate, sem improvisar.

Para tarefas longas ou com saída grande, peça que o agente grave os detalhes no scratchpad e devolva somente o resumo e o caminho.

#### 6. Quando fazer diretamente

- Tarefas pequenas com um ou dois arquivos conhecidos.
- Decisões de regra fiscal, jurídica ou de negócio e pareceres independentes. A conclusão é da sessão principal. Nessas tarefas, a delegação se limita a busca e reprodução mecânica dentro do escopo permitido.
- Tarefas que dependem de muito contexto da conversa.

#### 7. Segurança e qualidade

- Agentes de busca e leitura (Haiku) não editam arquivos.
- Faça push somente na branch designada. Faça commit após rodar os testes e linters aplicáveis.
- Nunca pule ou desative testes para obter status verde.
- Para ações irreversíveis ou sensíveis, confirme com o responsável antes. Isso inclui deletar, sobrescrever, merge, deploy, operações em produção, migrations, envio real de e-mail, uso de segredos ou grants.
- Repita as restrições do mandato do COORD em cada prompt de delegação.
- Limpe ao final os ambientes temporários criados para a tarefa, como worktrees e bancos descartáveis, respeitando as autorizações aplicáveis.

#### 8. Resumo final

- **Feito:** entrega concluída.
- **Verificado:** testes e checagens com resultados, identificando o que a sessão principal reconferiu.
- **Pendente / riscos:** lacunas e riscos restantes.
- **Delegações:** uma linha por subagente com modelo, esforço, tarefa, resultado e eventual escalonamento com motivo.

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
