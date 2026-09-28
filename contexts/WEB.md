# TriBusca — entrada de qualquer chat de frontend

Atualizado em 27/09/2026. O repositório [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web) agora possui uma primeira implementação do **site público** em branch própria, ainda não mergeada nem publicada. O trabalho está na **WEB-01 / Issue #8** e no draft [PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1), branch `feat/web-01-site-publico`, head verificado `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d`.

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

**Não comprovado / não autorizado no frontend:** merge na main, publicação definitiva do site, **integração/consumo da API pública**, autenticação de cadastro/reset, matching real do Sonar, envio real do Revela, consumo real do Decodifica ou Acervo dinâmico. A API pública backend D-050 já está mergeada/deployada; isso não significa que o frontend a esteja consumindo.

## Stack e limites

Stack aprovada: React, TypeScript, Vite, React Router, TanStack Query, Tailwind, Radix UI, shadcn/ui, Lucide, ESLint, Prettier, Vitest, Testing Library e MSW. A WEB-01 usa apenas o necessário para a camada pública inicial; não inventar endpoints nem autenticação paralela.

A camada pública foi autorizada em paralelo pela **D-035**. Isso não altera a ordem técnica das integrações autenticadas/inteligência.

Retomada: “Leia https://github.com/fabiojuniort-cyber/tribusca-control/blob/main/contexts/WEB.md e a Issue #8; confira o PR #1 antes de alterar o frontend.”


## API-01 — dados reais para Cobertura/Acervo

A D-050 / Issue #11 definiu a API pública read-only:

- `GET /public/v1/sources`;
- `GET /public/v1/publications`;
- `GET /public/v1/stats`.

### Backend verificado

O [backend PR #74](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/74) foi mergeado por squash em `4688ff87a0b039eb426b80f5e279c95214fb87d2`. A Issue #11 registra deploy produtivo verde e validação HTTP 200 dos três GETs, com cache/CORS conforme D-050 e sem conteúdo integral ou dados tenant/company/user nos payloads inspecionados.

### WEB ainda aberto

O frontend **ainda não está integrado** a essa API. Permanecem abertos:
- configurar o `apiBase`/consumo no frontend;
- confirmar/configurar as origens CORS reais;
- revisão do rate limit no backend.

Até a integração WEB ser implementada e validada, o frontend não deve substituir placeholders por dados reais apenas porque a API backend existe.

### Gate adicional criado pela D-057

Publicações **não fiscais** preservadas somente por menção exata a CNPJ são privadas da respectiva conta. A API pública atual não possui filtro fiscal/tenant para essa nova categoria. Antes de qualquer integração que possa incluir tais registros no Acervo público, é necessária **Issue técnica + gate de isolamento**.

### Campos de exibição ainda não alinhados

A D-058 aprovou para exibição no Acervo público somente **título, data, órgão e link oficial**. O endpoint `GET /public/v1/publications` também retorna `id`, `actType`, `actNumber`, `uf` e `effectiveOn`.

Esses campos adicionais podem existir na API por D-050, mas **não devem ser presumidos como aprovados para exibição** no Acervo público. A decisão de produto permanece aberta e esta GOV-03 não altera a API nem o frontend.

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
- Cobertura federal + 27 UFs, com status e métricas `—` **sem integração WEB da API pública**;
- timeline da Reforma separando Publicação/Vigência/Marco previsto em lei;
- responsividade e `prefers-reduced-motion`.

CI run `36361749038` = **SUCCESS** (install, typecheck, testes e build).

**WEB-03/D-051 resolveu o antigo gate de disponibilidade:** Acervo, Central de Monitoramento, Sonar, Revela, Decodifica e Perfil Tributário ficam todos como **Em desenvolvimento** no site público. A D-053 ratificou conceitualmente as cores do Sonar; Issue #10 continua aberta para a verificação independente do preview. PR permanece draft, sem merge/deploy. Contratos dependentes: Issue #9 (cadastro/reset) e Issue #11 (Cobertura/Acervo público).


## WEB-03 — correção de claims

Em 26/09/2026, por decisão do Gerente, o claim da D-043 não foi confirmado para publicação. O draft deve apresentar os seis recursos do portfólio — Acervo, Central de Monitoramento, Sonar, Revela, Decodifica e Perfil Tributário — como **Em desenvolvimento**.

A existência de rotas, placeholders, mocks, demonstrações ou contratos em PR não autoriza o rótulo “Disponível”.

**Impacto:** frontend público + documentação. Head WEB-03 verificado `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d`; CI run `36361749038` = **SUCCESS** (install, typecheck, testes e build). As cores foram ratificadas conceitualmente pela D-053; Issue #10 permanece aberta para a revisão independente visual/acessível do preview. Sem merge/deploy.


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


## GOV-03 — regras públicas e autenticação

- site informativo pode ser publicado antes da Issue #9 **somente após os gates de revisão**, preservando a D-054;
- enquanto #9 não estiver pronta, **Criar conta → Em breve** no gate de publicação; cadastro e trial ficam inativos;
- Acervo público: título, data, órgão e link oficial; texto integral e busca avançada exigem autenticação;
- trial: 7 dias sem cartão, iniciado após verificação de e-mail + primeiro cadastro de empresa;
- formulário inicial: nome, e-mail profissional, senha e CNPJ opcional;
- senha aprovada: mínimo 8 caracteres + maiúscula + minúscula + número + especial;
- primeiro usuário = administrador;
- ao informar CNPJ, tentar obter CNAE/endereço automaticamente de fonte disponível;
- regra de empresa sem CNPJ permanece aberta;
- D-053 permanece a decisão das cores; D-059 acrescenta Dados insuficientes e a semântica qualitativa do Sonar, sem fechar a Issue #10;
- página/preview/PR/demo não equivale a produto disponível;
- nenhuma mudança de frontend foi executada na GOV-03.
