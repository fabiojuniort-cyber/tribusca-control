# TriBusca — entrada de qualquer chat de frontend

Atualizado em 26/09/2026. O repositório [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web) agora possui uma primeira implementação do **site público** em branch própria, ainda não mergeada nem publicada. O trabalho está na **WEB-01 / Issue #8** e no draft [PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1), branch `feat/web-01-site-publico`, head verificado `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d`.

Leia [CONTEXT.md](../CONTEXT.md), [AGENTS.md](../AGENTS.md), [decisões](../DECISIONS.md), [produto/UX](../docs/PRODUCT_AND_UX.md), [site/comercial](../docs/SITE_AND_MARKETING.md), [Manual de Marca v1](../docs/BRAND_MANUAL_V1.md) e a Issue específica. Os [ativos oficiais](../docs/BRAND_ASSETS.md) devem ser usados sem recriação.

## Estado comprovado da WEB-01

O draft PR #1 implementa:
- Home pública;
- Portfólio;
- página temática Reforma Tributária;
- Sonar com Alta/Média/Baixa representadas por proximidade e animação discreta em CSS;
- Revela com Alta afinidade e Menção direta como gatilhos distintos;
- Decodifica com estados Decodificar/Traduzido/Desatualizado e ajuda conceitual de créditos;
- representação conceitual do Acervo;
- ícone oficial do Brand Kit;
- responsividade e `prefers-reduced-motion`;
- Vitest/Testing Library;
- CI.

GitHub Actions run **36361749038**: **SUCCESS** em 26/09/2026. Passaram instalação, typecheck, testes e build.

**Não comprovado / não autorizado:** merge na main, deploy, site produtivo, API, autenticação, matching real do Sonar, envio real do Revela, consumo real do Decodifica ou Acervo dinâmico.

## Stack e limites

Stack aprovada: React, TypeScript, Vite, React Router, TanStack Query, Tailwind, Radix UI, shadcn/ui, Lucide, ESLint, Prettier, Vitest, Testing Library e MSW. A WEB-01 usa apenas o necessário para a camada pública inicial; não inventar endpoints nem autenticação paralela.

A camada pública foi autorizada em paralelo pela **D-035**. Isso não altera a ordem técnica das integrações autenticadas/inteligência.

Retomada: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/WEB.md e a Issue #8; confira o PR #1 antes de alterar o frontend.”


## API-01 — dados reais para Cobertura/Acervo

Em 26/09/2026 o usuário definiu o contrato backend D-050 / Issue #11 para substituir os placeholders “—” de WEB-02 quando a API estiver publicada.

Rotas previstas:
- `GET /public/v1/sources`;
- `GET /public/v1/publications?uf=SP&limit=3`;
- `GET /public/v1/stats`.

Backend preparado no draft [PR #74](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/74), head `7e5ba9718ccb0f2c6bcf806e5471dff4dc2db8d6`, CI #433 SUCCESS. O site **ainda não deve consumir** até o backend ser mergeado/deployado em gate separado e existir `apiBase` público validado; WEB-02 continua exibindo placeholders em vez de inventar dados.

CORS está implementado por `PUBLIC_API_ALLOWED_ORIGINS`, sem credentials e com preflight GET-only. Os domínios reais do protótipo Railway e do site definitivo ainda não estão comprovados/configurados porque não houve deploy; entram no próximo gate. A Issue #11 executa Cobertura/Acervo; Issue #9 continua responsável pelos demais contratos públicos de cadastro/reset.


## WEB-02 — design aprovado e estado verificado

Em 26/09/2026, a WEB-02 substituiu as definições públicas conflitantes da WEB-01 conforme D-037–D-049 e [registro detalhado](../docs/WEB_02_DESIGN_ALIGNMENT.md). **Origem: usuário/responsável pelo produto.**

No head `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d`, o draft PR #1 contém:
- rotas `/cobertura`, `/portfolio`, `/como-funciona`, `/reforma-tributaria`;
- assinatura horizontal oficial no header e ações Entrar/Criar conta;
- modais de Entrar/Criar conta/Recuperar senha/Nova senha;
- login real pelo contrato `POST /auth/login`, sem autenticação paralela;
- cadastro/reset apenas como UX, sem endpoint fictício;
- carrossel estadual de 5 UFs com SP fixo e 4 sorteadas, fotos Wikimedia e créditos;
- portfólio com seis recursos;
- Sonar com proximidade e cores semânticas de draft;
- Revela com boletim Alta afinidade/Menção direta;
- Decodifica com cinco exemplos Texto oficial × Leitura auxiliar;
- Cobertura federal + 27 UFs, com status e métricas `—` sem API;
- timeline da Reforma separando Publicação/Vigência/Marco previsto em lei;
- responsividade e `prefers-reduced-motion`.

CI run `36361749038` = **SUCCESS** (install, typecheck, testes e build).

**WEB-03/D-051 resolveu o antigo gate de disponibilidade:** Acervo, Central de Monitoramento, Sonar, Revela, Decodifica e Perfil Tributário ficam todos como **Em desenvolvimento** no site público. **Gates ainda pendentes:** Branding / Issue #10 para cores do Sonar e revisão visual/funcional. PR permanece draft, sem merge/deploy. Contratos dependentes: Issue #9 (cadastro/reset) e Issue #11 (Cobertura/Acervo público).


## WEB-03 — correção de claims

Em 26/09/2026, por decisão do Gerente, o claim da D-043 não foi confirmado para publicação. O draft deve apresentar os seis recursos do portfólio — Acervo, Central de Monitoramento, Sonar, Revela, Decodifica e Perfil Tributário — como **Em desenvolvimento**.

A existência de rotas, placeholders, mocks, demonstrações ou contratos em PR não autoriza o rótulo “Disponível”.

**Impacto:** frontend público + documentação. Head WEB-03 verificado `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d`; CI run `36361749038` = **SUCCESS** (install, typecheck, testes e build). Cores do Sonar continuam apenas em avaliação no draft e dependem da Issue #10. Revisão visual/funcional permanece gate separado. Sem merge/deploy.


## WEB-05 — pronto para nova revisão independente

Head do draft PR #1: `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d`.  
CI #38 / run `36361749038`: **SUCCESS**, com 13/13 testes, typecheck, checksum do ativo e build.

Correções WEB-04 implementadas:
- A11Y-01/02/03;
- BRAND-01/02;
- Sonar ajustado e ratificado conceitualmente pela D-053;
- footer com assinatura escura oficial;
- Inter local via `@fontsource/inter@5.3.0`.

Preview temporário de revisão:
- URL: https://web05-preview-production.up.railway.app
- deployment: `1cf730d6-741a-4187-904c-3da2e231100b` = SUCCESS;
- projeto/serviço Railway: `tribusca-web-preview-web05 / web05-preview`;
- sem dados produtivos ou secrets.

**Gates ainda abertos:** revisão independente visual/funcional e Issue #9 para cadastro/reset. A Issue #10 permanece aberta apenas até a verificação independente final da ratificação cromática. Pela D-054, se houver lançamento antes de cadastro funcional, “Criar conta” deve virar “Em breve” no gate de publicação; essa mudança **não está implementada** neste head.

PR continua draft. Sem merge e sem publicação definitiva. Após a revisão e preservação das evidências, remover o preview temporário Railway.
