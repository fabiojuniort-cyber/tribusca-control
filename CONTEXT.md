# TriBusca — contexto de retomada do Gerente Geral

Base operacional registrada em 27/09/2026; protocolo de papéis atualizado em 26/09/2026. Este arquivo pode ser lido diretamente pelo Gerente GPT-6 ao iniciar ou retomar uma conversa e relido sempre que necessário. Não existe chat intermediário de bootstrap. É um índice executivo: evidências detalhadas permanecem nas Issues, PRs e documentos vinculados. Um executor revalida o estado vivo antes de decisões operacionais.

## Missão e limites desta conversa

**Protocolo vigente de 26/09/2026:** o Gerente Geral GPT-6 pode acessar **sempre em modo somente leitura** o contexto e as evidências pertinentes, incluindo GitHub, código, CI, Railway e PostgreSQL se houver ferramenta segura de leitura. Não pode editar arquivos ou executar qualquer ação que modifique estado; delega essas ações aos GPT-5.6. Ele coordena GPT-5.6 em chats executores separados, analisa todos os erros e handoffs, confere a suficiência lógica das evidências recebidas e decide novas instruções. Os GPT-5.6 fazem a execução, verificações especializadas, escritas, implementações, revisão independente e atualizações deste repositório por delegação; o Gerente pode conferir diretamente evidências em modo leitura. O usuário abre o chat indicado e transmite o retorno; nada aqui inicia agentes automaticamente. Distinguir inspeção direta somente leitura do Gerente de evidência relatada por executor. O usuário quer máxima continuidade no escopo autorizado, mínima intermediação e até cinco passos independentes por instrução; falha em premissa interrompe apenas etapas dependentes. Não avançar ao próximo DOE sem gate SP.

## Onde está a verdade

- [Estado oficial](PROJECT_STATE.md) e [roadmap](ROADMAP.md): síntese gerencial.
- [Decisões](DECISIONS.md), [arquitetura](docs/ARCHITECTURE.md) e [segurança](docs/SECURITY.md): limites aprovados.
- [Produto e UX](docs/PRODUCT_AND_UX.md), [site/comercial](docs/SITE_AND_MARKETING.md), [Manual de Marca v1](docs/BRAND_MANUAL_V1.md), [ativos oficiais](docs/BRAND_ASSETS.md) e [questões abertas](docs/OPEN_QUESTIONS.md): recursos, layout, design, identidade e pontos ainda não decididos. A camada pública do site foi retomada pela D-035 / WEB-01; conceitos autenticados continuam sem equivaler a implementação produtiva.
- [Papéis](docs/AGENT_ROLES.md), [handoff](docs/HANDOFF.md), [gates](docs/REVIEW_AND_GATES.md) e [protocolo de contexto](docs/CONTEXT_MAINTENANCE.md): contrato de execução e atualização.
- [Backend](contexts/BACKEND.md), [frontend](contexts/WEB.md) e [DOE-SP](contexts/DOE-SP.md): entradas curtas para novos chats especializados.
- [Issues da central](https://github.com/fabiojuniort-cyber/tribusca-control/issues) e [quadro](https://github.com/users/fabiojuniort-cyber/projects/1): trabalho, dependências e progresso.
- [Backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend) e [frontend](https://github.com/fabiojuniort-cyber/radar-fiscal-web): código; o frontend público está em draft PR #1, ainda sem merge/deploy.
- Se houver divergência, conferir Issue/PR, commit, Railway e PostgreSQL ao vivo. A data acima é a data da última atualização do arquivo, não garantia de produção atual.

## Ponto de retomada verificado

- DOE-SP segue **ABERTO**; o bootstrap completo 2025-01-01 → data atual e os gates produtivos ainda não foram comprovados.
- **D-017/D-036 — regra global vigente:** página/representação oficial completa tem prioridade; quando ela fornecer o conteúdo fiel, coletar diretamente e **não baixar PDF que apenas o reproduza**. PDF só é solicitado quando necessário para conteúdo ausente/incompleto. Anexos próprios continuam materiais. Preservar URL, identificadores, autenticidade e proveniência disponíveis. Política: [docs/OFFICIAL_CONTENT_POLICY.md](docs/OFFICIAL_CONTENT_POLICY.md); inventário: [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6).
- [Issue #1](https://github.com/fabiojuniort-cyber/tribusca-control/issues/1), P0, segue aberta/In Progress. Em 26/09/2026 o usuário **redirecionou a DOE-SP-21**: o HTML oficial passa a ser o conteúdo principal e o PDF certificado deixa de ser requisito para capturar um ato. A correção de `artifactReconciliationHistory` foi suspensa como caminho de produto.
- A reavaliação da `main` mostrou que o conector já usa o HTML oficial como `content`, mas o SHA dos arquivos em `files` participa do `contentHash`. Evidência produtiva somente leitura nos logs Railway: `DOE_SP_AUDIT` registrou **517 publicações / 517 versões**, **610 arquivos**, sendo **516 PDFs autenticados** e **94 anexos**, sem versões históricas naquele snapshot. Para a Portaria SRE 42 de 28/07/2025, o detalhe oficial do ID com PDF 404 retorna HTML válido (6.775 caracteres normalizados) idêntico ao da representação já persistida; a representação válida está persistida com uma versão cujo hash inclui o PDF. Portanto, capturar a origem 404 sem PDF pela semântica atual ou retirar o PDF do hash globalmente criaria versões artificiais no replay/acervo existente.
- **DOE-SP-26:** o draft [backend PR #73](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/73) está no head `82f189c84a7b70e1985ed424c1549ae20184df46`, base `f25a596edce592e6e365e87ed4cbf16ba0922de8`, 0 commits atrás da main. CI #432 / run `36252974888` = **SUCCESS** e a reexecução independente do job `108437300694` também foi SUCCESS. Revisão técnica favorável: page-first D-017/D-036, fallback PDF material, attachments materiais, preservação same-origin do PDF autenticado DOE-SP, compatibilidade v1→v2, SRE 42 e imutabilidade histórica foram aprovados. O preflight produtivo DOE-SP-27b foi executado em modo somente leitura após essa revisão: 518 publicações/versões, 569 `collection_items`, 569 vínculos run-publication, 3 checkpoints, 94 attachments, sem vínculos tenant/company/matches/cross-source, runs ativas ou referências diretas no audit log no snapshot; manifesto de 518 registros com SHA-256 `54fcdb05eb5f362e0be87a77457861d5a4c22f9674e8f7fae59005632ab16c71`. O manifesto individual permanece privado nos logs Railway.
- O último bloqueio histórico transmitido foi 29/07/2025 com 399 dias pendentes. Não interpretar como leitura produtiva atual.
- [Issue #2](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2): bootstrap e replay, depende da #1.
- [Issue #3](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3): artefatos e política de `publication_files`, depende da #1.
- [Issue #4](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4): fechamento formal DOE-SP, depende de #1–#3.
- [Issue #5](https://github.com/fabiojuniort-cyber/tribusca-control/issues/5): validar o ciclo de governança com uma entrega real; permanece aberta.
- [Backend PR #72 de governança](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/72) foi incorporado com autorização, commit `f25a596edce592e6e365e87ed4cbf16ba0922de8`; `AGENTS.md` e template estão na main. CI #382 e deploys automáticos Backend `d0e39486-cdff-4ff1-9531-04a4f3b4dedd`, Worker `cfcb6909-ce88-4694-b493-daf7aa302bc7`, Scheduler `c34c8850-6c48-4d16-a0a4-14f817184d5d`: SUCCESS. Esse marco de governança não fecha DOE-SP. O frontend público permanece no draft PR #1, branch `feat/web-01-site-publico`. WEB-06 revisou o head `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d` e concluiu **REPROVADO/BLOQUEANTE** por uso da cor Sonar `#237032` também nas regras de senha e ausência de validação real em navegador. WEB-07 concluiu a execução no head `74bb3efffc4b720aa157475ce6a9c73c206fa028`. Frontend CI #47 / run `36368975036` = **SUCCESS**, incluindo 13/13 testes unitários e 40/40 testes Playwright/Chromium nos viewports 1440×900, 1920×1080, 390×844 e 360×800. Artifact browser `10948592313`, digest `sha256:4365b95d68c69233aef493f99a22082917abe0e08d0f111220ba1a04279a33a6`. O preview temporário Railway foi atualizado para o mesmo head: deployment `2d130a93-7651-47e2-b90c-478c1e3088ea` SUCCESS em https://web05-preview-production.up.railway.app. BRAND-SONAR-01 e retorno de foco dos modais foram corrigidos. **Isso ainda não equivale a parecer independente favorável.** Issue #10 segue aberta; PR #1 continua draft/unmerged e sem publicação definitiva. Leia [protocolo de atualização](docs/CONTEXT_MAINTENANCE.md) ao iniciar nova frente.
- Seis labels já criadas (`P0`–`P3`, `doe-sp`, `governanca`); cinco Issues importadas no Projects. O conector GitHub usado nesta conversa edita Issues e arquivos, mas não move cartões no Projects.

- **WEB-01→WEB-07 / Issue #8:** [frontend PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1) permanece **OPEN/DRAFT/unmerged**. WEB-06 reprovou `f92fbea8...`; WEB-07 corrigiu BRAND-SONAR-01 e o retorno de foco e adicionou validação browser reproduzível. Head atual `74bb3efffc4b720aa157475ce6a9c73c206fa028`; CI #47 / run `36368975036` SUCCESS; 40/40 testes Chromium; artifact `10948592313`; preview deployment `2d130a93-7651-47e2-b90c-478c1e3088ea` SUCCESS no mesmo head. **Próximo gate: nova revisão independente**; Issue #10 continua OPEN. Todos os seis recursos seguem `Em desenvolvimento`; D-054 e Issue #9 continuam gates de lançamento/cadastro.

## GOV-03 — consolidação de 27/09/2026

As respostas Q1–Q22 foram formalizadas sem implementação técnica nas D-055 a D-063.

- **DOE-SP continua ABERTO/P0.** D-055 só libera o paralelismo ampliado **depois do fechamento formal**; não autoriza próximo DOE agora.
- Coleta corrente aprovada em 06h/10h/14h/18h BRT quando aplicável; backfill separado em uma consulta/hora, um dia por consulta/fonte, até o acervo oficial disponível (D-056).
- Escopo fiscal/retenção/CNPJ exato definidos na D-057; publicação não fiscal retida só por CNPJ é privada da conta e **não pode ser introduzida em tabelas globais consultadas pela API pública nem ficar alcançável por ela antes de filtro/proteção implementado e validado em Issue técnica própria**; restrição apenas visual não atende ao gate; reexame de acervo antigo ao cadastrar novo CNPJ permanece aberto.
- A D-054 segue como gate para lançamento antes da #9; D-058 fecha Acervo público, senha, onboarding e trial. Coerência: CNPJ é opcional no formulário inicial, mas o trial só inicia após verificação de e-mail + primeiro cadastro de empresa; empresa sem CNPJ permanece aberta.
- Sonar, Revela, Decodifica e Reforma foram refinados nas D-059 a D-062; D-053 continua a decisão cromática do Sonar e Issue #10 continua aberta para o parecer independente do preview.
- Comercial: três níveis futuros, público inicial empresarial e dimensões de diferenciação aprovadas; nomes/preços/franquias/créditos aguardam piloto (D-063).
- Nenhuma página demonstrativa, preview, PR, mock ou contrato em draft equivale a disponibilidade produtiva.

## Próxima passagem

A D-017/D-036 está aprovada globalmente. A autorização vigente do responsável para DOE-SP é **A — reconstruir integralmente o acervo DOE-SP**, substituindo a escolha anterior B; ver D-052. A revisão DOE-SP-26 foi favorável ao PR #73 no head `82f189c...`, que ainda está draft/unmerged. O preflight DOE-SP-27b confirmou um snapshot sem vínculos tenant/company/matches/cross-source; antes de qualquer exclusão é necessário novo preflight após pausa, backup recuperável, revisão independente do procedimento restrito, merge/deploy verde e validação da recaptura. Um backup sob demanda de 1,4 GB foi criado no volume Postgres em 26/09/2026 15:08 BRT; referência individual mantida fora do GitHub. A restauração foi inspecionada na UI, mas não ensaiada. Nenhuma exclusão, merge, deploy ou recaptura ocorreu neste marco.

## Atualização contínua do estado — proposta GOV-16

**Estado observado em 28/09/2026 02:10 BRT.** A Governança Flexível v2 está sendo proposta na GOV-16 e **ainda não está vigente** até revisão independente, autorização aplicável e merge do PR próprio.

Após a incorporação, atualizações factuais de contexto/status/SHAs/links/handoffs passam a ser R0 por padrão: sem nova atividade, chat, LOCK ou revisão independente obrigatórios. Mudança de política, arquitetura, governança, autorização ou regra operacional material continua exigindo classificação superior.

A autorização do usuário de 28/09/2026 02:10 BRT (`“QUero que siga mesmo assim”`) dispensou somente a pré-condição de encerramento prévio do PR #14 para iniciar a GOV-16. Não autorizou merge do PR #14, merge da GOV-16, deploy, SQL/migration, Railway write ou operação DOE-SP.

## GOV-16 — Governança Flexível v2 baseada em risco

Princípio: **governança deve impedir dano, não impedir trabalho**.

A proposta cria R0–R3, Gate 0 proporcional, LOCK como lease baseado em risco, continuidade de sessão entre etapas, revisão incremental, manutenção documental R0 e fail-safe apenas para risco material. R3 preserva autorização explícita, revisão independente, backup/restore quando aplicável, dry-run, rollback e proteção de secrets/dados/tenant/auth.

Referência proposta: [docs/CLAUDE_SESSION_PROTOCOL.md](docs/CLAUDE_SESSION_PROTOCOL.md). Até o merge da GOV-16, continua valendo a versão de governança atualmente existente na `main`.

## Retomada em novo chat

Comando do usuário: **“Carregue o Gerente Geral do Repositório”**. O GPT-6 abre diretamente, em modo somente leitura, `fabiojuniort-cyber/tribusca-control` e lê `CONTEXT.md`, `PROJECT_STATE.md` e a Issue ativa; consulta decisões e contextos adicionais conforme necessário. Pode voltar a ler em qualquer momento da conversa. Não pedir ao usuário que abra um chat GPT-5.6 apenas para carregar o contexto. Para mudanças, abre uma tarefa executora. Ver [procedimento](docs/CONTEXT_MAINTENANCE.md). Em outras janelas especialistas, o prompt inclui contexto curto e Issue; na mesma janela, não recarregar tudo a cada mensagem.


- **API-01 / Issue #11:** D-050 está **mergeada e validada em produção**. O [backend PR #74](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/74) foi incorporado por squash em `4688ff87a0b039eb426b80f5e279c95214fb87d2`; a Issue #11 registra deploys Backend/Worker/Scheduler = SUCCESS e HTTP 200 para `GET /public/v1/sources`, `/public/v1/publications?uf=SP&limit=3` e `/public/v1/stats`, com cache/CORS conforme contrato e sem conteúdo integral ou dados tenant/company/user nos payloads inspecionados. **Ainda abertos:** integração WEB, configuração/validação das origens CORS reais e rate limit por IP. A D-057 cria dependência adicional: publicações não fiscais retidas apenas por CNPJ são privadas da conta e não podem alcançar a API pública sem Issue técnica + gate de isolamento. A D-058 aprovou exibição pública de título/data/órgão/link; campos adicionais já retornados pela API aguardam decisão de produto antes de exibição.
