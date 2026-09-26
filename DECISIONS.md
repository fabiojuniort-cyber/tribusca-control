# TriBusca — Decisões vigentes

Atualizado em 26/09/2026. Este registro consolida decisões transmitidas pelo responsável pelo produto. Antes de alterar uma decisão, abrir Issue de decisão e registrar a evidência e a aprovação. Quando houver ADR técnico no backend, vinculá-lo aqui em vez de copiá-lo.

| ID | Decisão | Consequência |
| --- | --- | --- |
| D-001 | Nome público TriBusca; nomes técnicos legados podem continuar. | Não fazer renomeação técnica em massa nem criar sub-marcas. |
| D-002 | Railway, PostgreSQL, Node.js 24 LTS, TypeScript, Fastify, pg, Kysely e migrations SQL. API, Worker e Scheduler no mesmo codebase e em serviços separados; monólito modular. | Não redesenhar a stack sem evidência e decisão nova; sem Redis nesta fase. |
| D-003 | Shared DB e schema com tenant_id e RLS. Tenant é conta SaaS; company é empresa monitorada. | Autenticação e isolamento já aprovados; não criar autenticação paralela no frontend. |
| D-004 | Uma publicação é coletada uma vez globalmente; identity_hash é identidade lógica, content_hash é conteúdo/versionamento, raw_sha256 é integridade do arquivo. | Origem em publication_origins; merge entre fontes apenas com identidade forte; não usar fuzzy merge automático. |
| D-005 | SOURCE_UNAVAILABLE ou falha não significam ausência de resultados. | SUCCESS_NO_RESULTS só quando a fonte foi efetivamente consultada. |
| D-006 | DOU é PRIMARY dos atos CONFAZ formalmente publicados; portal CONFAZ atua como ENRICHMENT/VALIDATION conforme disponibilidade. | POCs de relay/proxy não têm aprovação para merge. |
| D-007 | Finalizar os 27 DOEs com conectores independentes, iniciando por São Paulo; ordem dos seguintes pelo ranking oficial de PIB estadual mais recente do IBGE no momento da escolha. | Não abrir próximo estado antes dos gates finais do DOE-SP. |
| D-008 | DOE-SP: Executivo → Atos Normativos; bootstrap inicial desde 01/01/2025 até a data atual. | Não iniciar acervo legado anterior à API sem frente específica. |
| D-009 | API do produto, taxonomia, perfil, relevância explicável e Decodifica vêm após a macrofase DOE, conforme ROADMAP.md. | Marcadores são vocabulário controlado; Decodifica explica/traduz o conteúdo normativo em linguagem clara e não prescreve ação empresarial. |
| D-010 | Frontend definitivo em radar-fiscal-web: React, TypeScript, Vite, React Router, TanStack Query, Tailwind, Radix UI, shadcn/ui e ferramentas de teste aprovadas. | Site definitivo permanece sem prioridade na macrofase DOE. |
| D-011 | Trial comercial de 7 dias com CTA “Experimentar grátis”. | Não reintroduzir funcionalidades gratuitas públicas descartadas sem decisão nova. |
| D-012 | tribusca-control é fonte de governança; repositórios de código são fonte da implementação; produção confirma resultado operacional. | Não declarar entrega produtiva só por PR mergeado ou CI verde. |
| D-013 | O [Manual de Marca TriBusca v1](docs/BRAND_MANUAL_V1.md) é referência visual oficial para site, aplicativo e materiais. | Usar os ativos aprovados do [manifesto](docs/BRAND_ASSETS.md); não criar novo logo nem sub-marcas. |
| D-014 | A direção de navegação, estados, marcadores, relevância e Decodifica é a descrita em [produto e UX](docs/PRODUCT_AND_UX.md). | Conceitos aprovados não equivalem a API/schema implementados; exigir Issue e evidência. |
| D-015 | O [site definitivo](docs/SITE_AND_MARKETING.md) fica pausado até a consolidação das fontes e do produto; o protótipo é apenas referência funcional. | Reavaliar design visual antes da implementação final; não anunciar recursos não entregues. |
| D-016 | O Gerente registra cada decisão nova ou alteração de direção no tema próprio e neste índice, após confirmação do responsável. | Uma nova janela deve recuperar decisões de arquitetura, produto, UX, marca, comercial e site via GitHub, sem depender do histórico de chat. |
| D-017 | **Conteúdo oficial completo publicado em página oficial pode ser coletado diretamente dessa página. PDF redundante não é requisito de captura e falha isolada desse PDF não pode bloquear a publicação.** URL oficial e referência de autenticidade disponível devem ser preservadas. PDF/anexo com texto, tabela ou informação material ausente da página continua sendo conteúdo necessário; página incompleta não pode ser classificada como captura integral. Ver [Política de Conteúdo Oficial](docs/OFFICIAL_CONTENT_POLICY.md). | Aplicar por conector somente após inventário/testes. Separar artefato redundante de conteúdo material; não declarar adequação de uma fonte apenas pela decisão global. Acompanhamento: [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6). |

| D-018 | **Decodifica** é o nome comercial aprovado para a funcionalidade antes chamada Norma Clara. O recurso é acionado sob demanda por botão no início da base legal; a geração futura usa OpenAI API, o resultado é persistido e reutilizável para o mesmo conteúdo aplicável. O usuário que já acionou encontra a tradução ao retornar; outro usuário não a vê automaticamente antes de clicar e, ao clicar, consome o resultado já existente em vez de nova geração. O acionamento cobre a base legal/dispositivo completo e a apresentação é em blocos de artigo em artigo. | Exige desenho futuro de persistência/versionamento, cache global reutilizável, estado de ativação/visibilidade por usuário, API, integração IA e UX. A granularidade técnica da chamada e a política de obsolescência permanecem abertas. Não altera a prioridade DOE-SP nem autoriza implementação nesta frente. Ver [Decodifica](docs/product-tools/DECODIFICA.md) e [Issue #7](https://github.com/fabiojuniort-cyber/tribusca-control/issues/7). |

## Como mudar uma decisão

1. Abrir Issue de decisão com contexto, opções, custos, riscos e impacto nas frentes atuais.
2. Registrar a decisão do responsável e links para evidências, PR ou ADR.
3. Atualizar este arquivo e os documentos afetados.
4. Revalidar a produção quando a decisão mudar comportamento operacional.

Nota: os nomes e IDs de serviços, datas de runs, inventários e contagens não são decisões arquiteturais; verificar estado ao vivo antes de usá-los como evidência.
