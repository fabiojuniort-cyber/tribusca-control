# TriBusca — Mapa de arquitetura e responsabilidade

## Repositórios

| Repositório | Conteúdo | Papel |
| --- | --- | --- |
| [tribusca-control](https://github.com/fabiojuniort-cyber/tribusca-control) | Decisões, Issues, estado, roadmap e protocolo de agentes | Fonte oficial de governança |
| [radar-fiscal-backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend) | API, Worker, Scheduler, conectores, SQL migrations e testes | Fonte oficial do código backend |
| [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web) | Frontend definitivo quando implementado | Fonte oficial do código web; em 26/09/2026 contém apenas arquivos de governança, sem aplicação implementada |

GitHub Issues coordenam o trabalho. PRs registram alterações de código. Logs, PostgreSQL e Railway comprovam o comportamento em produção. O arquivo PROJECT_STATE.md resume apenas o estado executivo validado.

## Fluxo do produto

Fontes oficiais → coleta global → normalização → identidade/deduplicação → publicação/versões/origens → taxonomia → perfil da empresa → relevância → compreensão/impacto.

Coletar cada publicação uma vez no catálogo global; relacioná-la aos tenants e companies depois. Não coletar uma cópia da fonte por cliente.

## Backend

Monólito modular em Node.js 24 LTS/TypeScript, Fastify, pg e Kysely; migrations SQL versionadas. Backend, Worker e Scheduler usam o mesmo codebase, com serviços de execução separados no Railway. PostgreSQL é banco, coordenação e fila/locking; sem Redis nesta fase.

Shared DB/shared schema com tenant_id e RLS para dados por tenant. Tenant é a conta SaaS, company é uma empresa monitorada. As publicações oficiais são globais. A autenticação existente usa JWT de curta duração, refresh opaco com cookie HttpOnly e sessões PostgreSQL; o frontend deve consumir esse contrato, sem auth paralela.

## Publicações e fontes

identity_hash identifica o ato; content_hash representa o conteúdo/versionamento; raw_sha256 comprova integridade de arquivo bruto. publication_origins registra URL, fonte e representação. Merge automático entre fontes exige identidade forte. SOURCE_UNAVAILABLE difere de SUCCESS_NO_RESULTS.

Papéis de autoridade: PRIMARY, ENRICHMENT, VALIDATION, LEGACY e BACKFILL. A indisponibilidade de fonte secundária não invalida automaticamente a cobertura da fonte PRIMARY.

## Limites deste documento

Contratos exatos, migrations, APIs e ADRs técnicos pertencem ao repositório backend. Uma mudança de schema/segurança ou de critérios de identidade exige Issue e revisão técnica; não alterar a arquitetura apenas para preencher a governança.
