# TriBusca — entrada de qualquer chat de frontend

Atualizado em 26/09/2026. O repositório [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web) agora possui uma primeira implementação do **site público** em branch própria, ainda não mergeada nem publicada. O trabalho está na **WEB-01 / Issue #8** e no draft [PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1), branch `feat/web-01-site-publico`, head verificado `eb930e97e925fce63d8ff6bad4682ae64ce90897`.

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

GitHub Actions run **36259839790**: **SUCCESS** em 26/09/2026. Passaram instalação, typecheck, testes e build.

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

O site deve consumir apenas após o backend ser mergeado/deployado em gate separado. Até existir URL base produtiva autorizada, WEB-02 não deve inventar dados.

CORS será restrito às origens configuradas em `PUBLIC_API_ALLOWED_ORIGINS`; sem credentials nessas rotas. A Issue #11 executa Cobertura/Acervo; Issue #9 continua responsável pelos demais contratos públicos de cadastro/reset.


## WEB-02 — design aprovado e estado verificado

Em 26/09/2026, a WEB-02 substituiu as definições públicas conflitantes da WEB-01 conforme D-037–D-049 e [registro detalhado](../docs/WEB_02_DESIGN_ALIGNMENT.md). **Origem: usuário/responsável pelo produto.**

No head `eb930e97e925fce63d8ff6bad4682ae64ce90897`, o draft PR #1 contém:
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
- Cobertura federal + 27 UFs e métricas `—` sem API;
- timeline da Reforma separando Publicação/Vigência/Marco previsto em lei;
- responsividade e `prefers-reduced-motion`.

CI run `36259839790` = **SUCCESS** (install, typecheck, testes e build).

**Gates pendentes:** confirmação do Gerente para claims Acervo/Central = Disponível; Branding / Issue #10 para cores do Sonar; revisão visual/funcional. PR permanece draft, sem merge/deploy. Contratos dependentes: Issue #9 (cadastro/reset) e Issue #11 (Cobertura/Acervo público).
