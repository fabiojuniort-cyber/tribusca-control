# L-11 — Checkpoint de gate de merge/release de 10/10/2026

**Status: BLOCK apenas para merge/deploy; aprovação visual de Fábio registrada.**
**Avanço da verificação de pré-release: 100%; publicação desta frente: 0%.**

## Decisões do proprietário (10/10/2026 BRT)
- Capturas de cinco abas aprovadas.
- Não disponibilizar importação CSV em Tipos **nem em Termos** (exportação permanece).
- Descarte/exclusão de publicações **somente no DOU**.
- Ordem solicitada: backend #205 → confirmar Railway SUCCESS; depois web #94 → confirmar Railway SUCCESS.
- **Nenhuma exclusão de dados autorizada.**

## Gate observado nos HEADs congelados

| Componente | HEAD PR | Base `main` | CI | Estado |
| --- | --- | --- | --- | --- |
| Backend [#205](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/pull/205) | `2054d6bb7a31e61013f4716fefcb00a7df15515b` | `db7514f02fdfefdb1d5e35458d1f4c60eb6cd162` | [full CI SUCCESS](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38101727822) e [PG18 isolado SUCCESS](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/actions/runs/38101727830) | OPEN, mergeable, não draft, **não mergeado** |
| Web [#94](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/94) | `b9fc9e5cd0cd49d0724396318d9d194ecce693b3` | `c870d92a1b98678119a4d16c59f0ffe3d2e81dba` | [full CI SUCCESS](https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/38102432946) | OPEN, mergeable, não draft, **não mergeado** |

- PR #205 introduz a migration `052_collection_filter_direct_admin_edits.sql`, função SECURITY DEFINER e mudança direta da política ativa. Risco de persistência/segurança exige revisão independente anterior ao merge, nos termos de `docs/CLAUDE_SESSION_PROTOCOL.md`.
- **Não há revisão formal/submission GitHub nem comentário de revisão independente nos PRs #205/#94 na observação.** CI e prints não substituem o parecer independente.
- Não foram comprovados no escopo desta verificação LOCK R3, backup + restore pertinentes à migration 052 nem pré-validação dos efeitos sobre dados reais. O bucket PITR existe, mas sua existência não comprova teste de restauração.
- Branch protection de `main` retornou HTTP 403 para a integração; não presumir que aprovações exigidas possam ser dispensadas.
- A API Railway usa `npm run db:prepare` antes de implantar e migrações podem ser aplicadas no merge/deploy.
- O frontend que atende `trifaros.com.br` está **pinned** no commit `c870d92a1b98678119a4d16c59f0ffe3d2e81dba`; merge na `main` sozinho não prova publicação no domínio. A mudança de pin requer plano de atualização/rollback.
- Conferência estática do PR #94: botão de **Exportar CSV**; sem importação visível em Tipos/Termos. Salvamento com descarte de fonte diferente de DOU bloqueado na interface. Nenhuma operação de descarte/exclusão foi executada.

## Railway — status que NÃO pertencem aos PRs novos

- Backend produção: deployment `cf397b43-165a-4b2e-8177-56c739dd0f3e` = SUCCESS no **commit anterior** `db7514f02fdfefdb1d5e35458d1f4c60eb6cd162`.
- Web produção: deployment `452c68f9-a561-490c-ae1f-a9559f4db1ed` = SUCCESS no **commit anterior** `c870d92a1b98678119a4d16c59f0ffe3d2e81dba`.
- **SHA de merge #205:** não existe; **SHA de merge #94:** não existe.
- **Deploy SUCCESS de #205/#94: NÃO EXECUTADO/NÃO COMPROVADO.**
- Nenhum merge, deploy ou exclusão realizados nesta verificação.

## Encaminhamento para CLAUDE-COORD

1. Solicitar parecer técnico **independente** no HEAD SQL/API #205 e no contrato web #94, focando ACL/SECURITY DEFINER, transação/concorrência, vazamento multi-tenant, garantias de não descarte fora do DOU e de não exclusão acidental.
2. Com parecer APPROVED, satisfazer o protocolo R3 (LOCK, pré-validação, backup e restore quando aplicável, plano de rollback compatível com a 052); verificar ajustes de source/pin do frontend sem reativar auto-deploy indiscriminadamente.
3. Com os gates cumpridos e autorização já dada pelo proprietário, mergear #205 com SHA esperado, confirmar migration 052 e deployment SUCCESS + saúde dos serviços; **somente depois** mergear #94, atualizar pin por procedimento controlado e confirmar SUCCESS no domínio público.
4. Proibir execução de descarte/purge nessa entrega.

**L-09:** inventário documental em [checkpoints/L-09.md](L-09.md), 165 MANTER, 21 ARQUIVAR, solicitado REVISAR; nenhum arquivo movido ou excluído.
