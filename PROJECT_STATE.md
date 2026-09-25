# TriBusca — Estado oficial do projeto

Atualizado em 25/09/2026 (America/Sao_Paulo).

Este arquivo resume o estado executivo. Issues e PRs registram execução, evidências e decisões de cada frente. Uma declaração de conclusão produtiva exige os respectivos gates e evidências.

## Repositórios

- [radar-fiscal-backend](https://github.com/fabiojuniort-cyber/radar-fiscal-backend): backend, Worker, Scheduler e conectores.
- [radar-fiscal-web](https://github.com/fabiojuniort-cyber/radar-fiscal-web): frontend definitivo; repositório criado, ainda sem código.
- [tribusca-control](https://github.com/fabiojuniort-cyber/tribusca-control): governança, estado, decisões e tarefas.

## Prioridade atual

Concluir DOE São Paulo, incluindo o bootstrap desde 01/01/2025, replay idempotente, run real agendado, integridade e proveniência dos artefatos, documentação e retirada segura dos serviços temporários. Só depois iniciar o próximo DOE. A meta da macrofase é cobrir os 26 estados e o Distrito Federal.

## DOE São Paulo

**Aberto; não declarado concluído.**

O [PR #71](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/71), relativo à reconciliação de duas representações oficiais da Portaria SRE 42, estava aberto e sem merge na consulta de 25/09/2026. Head observado: `091868c053d9d6f035030f866afd438f2c9fe3bd`. Seu código ainda não passou por validação produtiva.

O último diagnóstico produtivo comunicado antes do PR #71 indicava bootstrap bloqueado em 29/07/2025, com 399 dias pendentes. Esses números são históricos e precisam de nova consulta antes de serem tratados como estado atual.

## Demais frentes

- Motor, autenticação/RLS, infraestrutura e fontes federais: entregas anteriormente reportadas; nenhuma revalidação produtiva completa foi feita nesta atualização.
- DOU/INLABS: operacional, com gate produtivo final ainda a confirmar.
- CONFAZ: DOU como fonte primária dos atos formalmente publicados; portal direto indisponível no ambiente Railway segundo diagnósticos anteriores.
- Outros 26 DOEs: pendentes, sem presumir conectores criados.
- API do produto, taxonomia, perfil tributário, relevância, Norma Clara e frontend definitivo: pendentes de implementação e validação na sequência aprovada.
- Site definitivo: prioridade suspensa durante a macrofase DOE.

## Governança em preparação

Este repositório já contém `README.md`, `AGENTS.md` e este `PROJECT_STATE.md`. Na inspeção de 25/09/2026, `ROADMAP.md`, `DECISIONS.md` e os templates de Issues consultados ainda não existiam, e não havia Issues no repositório. O registro das tarefas atuais como Issues está pendente; não interpretar a ausência de Issues como ausência de trabalho.
