# TriBusca — entrada de qualquer chat de frontend

Atualizado em 26/09/2026. O repositório [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web) agora possui uma primeira implementação do **site público** em branch própria, ainda não mergeada nem publicada. O trabalho está na **WEB-01 / Issue #8** e no draft [PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1), branch `feat/web-01-site-publico`, head verificado `29a6c06a1395944c97b185b5fbf3d643b9a3a40c`.

Leia [CONTEXT.md](../CONTEXT.md), [AGENTS.md](../AGENTS.md), [decisões](../DECISIONS.md), [produto/UX](../docs/PRODUCT_AND_UX.md), [site/comercial](../docs/SITE_AND_MARKETING.md), [Manual de Marca v1](../docs/BRAND_MANUAL_V1.md) e a Issue específica. Os [ativos oficiais](../docs/BRAND_ASSETS.md) devem ser usados sem recriação.

## Estado comprovado da WEB-01

O draft PR #1 implementa:
- Home pública;
- Portfólio;
- página temática Reforma Tributária;
- Sonar com metáfora de proximidade e animação discreta em CSS;
- representação conceitual de Revela, Decodifica e Acervo;
- ícone oficial do Brand Kit;
- responsividade e `prefers-reduced-motion`;
- Vitest/Testing Library;
- CI.

GitHub Actions run **36228862164**: **SUCCESS** em 26/09/2026. Passaram instalação, typecheck, testes e build.

**Não comprovado / não autorizado:** merge na main, deploy, site produtivo, API, autenticação, matching real do Sonar, envio real do Revela, consumo real do Decodifica ou Acervo dinâmico.

## Stack e limites

Stack aprovada: React, TypeScript, Vite, React Router, TanStack Query, Tailwind, Radix UI, shadcn/ui, Lucide, ESLint, Prettier, Vitest, Testing Library e MSW. A WEB-01 usa apenas o necessário para a camada pública inicial; não inventar endpoints nem autenticação paralela.

A camada pública foi autorizada em paralelo pela **D-035**. Isso não altera a ordem técnica das integrações autenticadas/inteligência.

Retomada: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/WEB.md e a Issue #8; confira o PR #1 antes de alterar o frontend.”
