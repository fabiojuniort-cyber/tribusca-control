# TriBusca — contexto de retomada do Gerente Geral

Base operacional sincronizada em 28/09/2026; protocolo de papéis atualizado em 26/09/2026 e protocolo de sessões vigente desde 28/09/2026. Este arquivo pode ser lido diretamente pelo Gerente GPT-6 ao iniciar ou retomar uma conversa e relido sempre que necessário. Não existe chat intermediário de bootstrap. É um índice executivo: evidências detalhadas permanecem nas Issues, PRs e documentos vinculados. Um executor revalida o estado vivo antes de decisões operacionais.

## Missão e limites desta conversa

**Governança vigente desde 28/09/2026:** o Gerente Geral coordena por R0–R3 e permanece read-only por padrão para superfícies de produto/produção, mas possui autorização permanente para manutenção factual e melhoria contínua das diretrizes de governança dentro dos limites da v2. Antes de emitir prompts, pré-checa bloqueios previsíveis (sessão/tipo de gate, autorizações, SHA/PR, dependências) e corrige loops procedurais quando a causa estiver na própria regra. Mudança material continua R2/R3 e segurança, secrets, dados privados, auth, RLS, tenant, SQL produtivo, migrations, exclusões e operações destrutivas preservam controles fortes. O usuário quer máxima continuidade no escopo autorizado, mínima intermediação e avanço autônomo; falha em premissa interrompe apenas etapas dependentes. Não avançar ao próximo DOE sem gate SP.

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
- **DOE-SP-35/36/37:** a preparação final foi concluída no head `4917cdc2265fa87b35d555b98698f42a75d6c223`, com CI #443 SUCCESS e runner Railway 31/31 PASS; a revisão independente DOE-SP-36 aprovou o mesmo SHA e a preparação. Em 28/09/2026, o PR #73 foi squash-merged como `e2c4f9a58fe43cb56ca36a1925eb80cf612423ae`. A Issue #1 permanece OPEN e, na última leitura desta GOV-12, havia LOCK DOE-SP-37 ativo para EXECUÇÃO-A; nenhum handoff/UNLOCK final dessa execução tinha sido registrado. Não inferir deploy, run SCHEDULED, pausa, SQL, exclusão ou recaptura como concluídos sem evidência posterior na Issue.
- O último bloqueio histórico transmitido foi 29/07/2025 com 399 dias pendentes. Não interpretar como leitura produtiva atual.
- [Issue #2](https://github.com/fabiojuniort-cyber/tribusca-control/issues/2): bootstrap e replay, depende da #1.
- [Issue #3](https://github.com/fabiojuniort-cyber/tribusca-control/issues/3): artefatos e política de `publication_files`, depende da #1.
- [Issue #4](https://github.com/fabiojuniort-cyber/tribusca-control/issues/4): fechamento formal DOE-SP, depende de #1–#3.
- [Issue #5](https://github.com/fabiojuniort-cyber/tribusca-control/issues/5): validar o ciclo de governança com uma entrega real; permanece aberta.
- [Backend PR #72 de governança](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/72) foi incorporado com autorização, commit `f25a596edce592e6e365e87ed4cbf16ba0922de8`; `AGENTS.md` e template estão na main. CI #382 e deploys automáticos Backend `d0e39486-cdff-4ff1-9531-04a4f3b4dedd`, Worker `cfcb6909-ce88-4694-b493-daf7aa302bc7`, Scheduler `c34c8850-6c48-4d16-a0a4-14f817184d5d`: SUCCESS. Esse marco de governança não fecha DOE-SP. O frontend público permanece no draft PR #1, branch `feat/web-01-site-publico`. WEB-06 revisou o head `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d` e concluiu **REPROVADO/BLOQUEANTE** por uso da cor Sonar `#237032` também nas regras de senha e ausência de validação real em navegador. WEB-07 concluiu a execução no head `74bb3efffc4b720aa157475ce6a9c73c206fa028`. Frontend CI #47 / run `36368975036` = **SUCCESS**, incluindo 13/13 testes unitários e 40/40 testes Playwright/Chromium nos viewports 1440×900, 1920×1080, 390×844 e 360×800. Artifact browser `10948592313`, digest `sha256:4365b95d68c69233aef493f99a22082917abe0e08d0f111220ba1a04279a33a6`. O preview temporário Railway foi atualizado para o mesmo head: deployment `2d130a93-7651-47e2-b90c-478c1e3088ea` SUCCESS em https://web05-preview-production.up.railway.app. BRAND-SONAR-01 e retorno de foco dos modais foram corrigidos. **Isso ainda não equivale a parecer independente favorável.** Issue #10 segue aberta; PR #1 continua draft/unmerged e sem publicação definitiva. Leia [protocolo de atualização](docs/CONTEXT_MAINTENANCE.md) ao iniciar nova frente.
- Seis labels já criadas (`P0`–`P3`, `doe-sp`, `governanca`); cinco Issues importadas no Projects. O conector GitHub usado nesta conversa edita Issues e arquivos, mas não move cartões no Projects.

- **WEB-01→WEB-11 / Issue #8:** [frontend PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1) permanece **OPEN/DRAFT/unmerged**. WEB-10 aprovou independentemente `5230071...`; WEB-11 gerou release candidate `a7303d14fc725adf4d590fc1e2f475405fd38bc1`, CI #65 / run `36444458147` SUCCESS, 24/24 Vitest, 48/48 Chromium, artifact `10980146266`. D-054 está aplicada enquanto #9 segue OPEN e Cobertura consome somente `GET /public/v1/sources`. Preview `eff05426-969c-4481-8e70-9ed41583b454` SUCCESS no mesmo SHA. **CORS backend ainda bloqueia dados live no preview**, pois `PUBLIC_API_ALLOWED_ORIGINS` não está configurada. Issue #10 permanece CLOSED/COMPLETED. Próximo gate: revisão independente única do release candidate.

## GOV-03 — consolidação de 27/09/2026

As respostas Q1–Q22 foram formalizadas sem implementação técnica nas D-055 a D-063.

- **DOE-SP continua ABERTO/P0.** D-055 só libera o paralelismo ampliado **depois do fechamento formal**; não autoriza próximo DOE agora.
- Coleta corrente aprovada em 06h/10h/14h/18h BRT quando aplicável; backfill separado em uma consulta/hora, um dia por consulta/fonte, até o acervo oficial disponível (D-056).
- Escopo fiscal/retenção/CNPJ exato definidos na D-057; publicação não fiscal retida só por CNPJ é privada da conta e **não pode ser introduzida em tabelas globais consultadas pela API pública nem ficar alcançável por ela antes de filtro/proteção implementado e validado em Issue técnica própria**; restrição apenas visual não atende ao gate; reexame de acervo antigo ao cadastrar novo CNPJ permanece aberto.
- A D-054 segue como gate para lançamento antes da #9; D-058 fecha Acervo público, senha, onboarding e trial. Coerência: CNPJ é opcional no formulário inicial, mas o trial só inicia após verificação de e-mail + primeiro cadastro de empresa; empresa sem CNPJ permanece aberta.
- Sonar, Revela, Decodifica e Reforma foram refinados nas D-059 a D-062; D-053 continua a decisão cromática do Sonar e Issue #10 está CLOSED/COMPLETED.
- Comercial: três níveis futuros, público inicial empresarial e dimensões de diferenciação aprovadas; nomes/preços/franquias/créditos aguardam piloto (D-063).
- Nenhuma página demonstrativa, preview, PR, mock ou contrato em draft equivale a disponibilidade produtiva.

## Próxima passagem

A D-017/D-036 está aprovada globalmente. A autorização vigente do responsável para DOE-SP é **A — reconstruir integralmente o acervo DOE-SP**, substituindo a escolha anterior B; ver D-052. No snapshot sincronizado pela GOV-12, a DOE-SP-35 concluiu a PREPARAÇÃO no SHA `4917cdc2265fa87b35d555b98698f42a75d6c223`, a DOE-SP-36 aprovou esse SHA e o PR #73 foi incorporado por squash em `e2c4f9a58fe43cb56ca36a1925eb80cf612423ae`. Nesse mesmo snapshot, a DOE-SP-37 tinha LOCK ativo e ainda não havia handoff/UNLOCK final. Não inferir desse marco deploy de Backend/Worker/Scheduler, run SCHEDULED, pausa da fonte, SQL produtivo, exclusão, reconstrução/recaptura ou fechamento DOE-SP sem evidência posterior registrada na Issue #1.

## Governança Flexível v2 — vigente

**Estado atual em 28/09/2026 após GOV-20.** GOV-19 aprovou o head `d4f294e0daa4856df37337fa74ef964cc3e92e38`. GOV-20 incorporou o PR #15 por squash na `main` em `6f6a7169cfe5b8ddb6c235569d637c2d6f4435ba`. O PR #14 foi fechado sem merge como `superseded`.

A v2 está **VIGENTE**. Atualizações factuais de contexto/status/SHAs/links/handoffs são R0 por padrão. O Gerente possui autorização permanente para identificar/corrigir gargalos e loops de governança, com pré-checagem de bloqueios previsíveis antes de delegar. Mudança material de política/governança continua R2/R3.

A exceção pontual à C-03 usada na GOV-20 foi transitória e específica para superar o último bloqueio do protocolo antigo; não cria dispensa geral de controles R3.

Referência vigente: [docs/CLAUDE_SESSION_PROTOCOL.md](docs/CLAUDE_SESSION_PROTOCOL.md).

## Retomada em novo chat

Comando do usuário: **“Carregue o Gerente Geral do Repositório”**. O GPT-6 abre diretamente, em modo somente leitura, `fabiojuniort-cyber/tribusca-control` e lê `CONTEXT.md`, `PROJECT_STATE.md` e a Issue ativa; consulta decisões e contextos adicionais conforme necessário. Pode voltar a ler em qualquer momento da conversa. Não pedir ao usuário que abra um chat GPT-5.6 apenas para carregar o contexto. Para mudanças, abre uma tarefa executora. Ver [procedimento](docs/CONTEXT_MAINTENANCE.md). Em outras janelas especialistas, o prompt inclui contexto curto e Issue; na mesma janela, não recarregar tudo a cada mensagem.


- **API-01 / Issue #11:** D-050 está **mergeada e validada em produção**. O [backend PR #74](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/74) foi incorporado por squash em `4688ff87a0b039eb426b80f5e279c95214fb87d2`; a Issue #11 registra deploys Backend/Worker/Scheduler = SUCCESS e HTTP 200 para `GET /public/v1/sources`, `/public/v1/publications?uf=SP&limit=3` e `/public/v1/stats`, com cache/CORS conforme contrato e sem conteúdo integral ou dados tenant/company/user nos payloads inspecionados. **Ainda abertos:** configuração/validação das origens CORS reais e rate limit por IP. WEB-11 integrou `/public/v1/sources` no draft da Cobertura. A D-057 cria dependência adicional: publicações não fiscais retidas apenas por CNPJ são privadas da conta e não podem alcançar a API pública sem Issue técnica + gate de isolamento. A D-058 aprovou exibição pública de título/data/órgão/link; campos adicionais já retornados pela API aguardam decisão de produto antes de exibição.


**CORS WEB-11:** inspeção read-only do serviço backend produtivo confirmou ausência de `PUBLIC_API_ALLOWED_ORIGINS`. O preview frontend usa `VITE_API_BASE=https://radar-fiscal-backend-production.up.railway.app`; portanto a origem `https://web05-preview-production.up.railway.app` precisa ser incluída em gate backend separado para que dados reais da Cobertura sejam aceitos pelo browser. WEB-11 não alterou backend.
