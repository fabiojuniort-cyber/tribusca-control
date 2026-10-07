# ACT-SCOPE-02 — Etapa 2 — PLATFORM_ADMIN

**Estado:** concluída em 06/10/2026 BRT / 07/10/2026 UTC.

## Entrega

Backend PR `radar-fiscal-backend#167`:
- migration `036_platform_admin.sql`;
- papel global `PLATFORM_ADMIN` na tabela existente `platform_user_roles`;
- funções controladas de grant/revoke por e-mail;
- advisory lock e proteção do último administrador;
- auditoria em `audit_log`;
- `licenseBypass=true` para o papel global;
- Taxonomia passa a exigir `PLATFORM_ADMIN`;
- `TAXONOMY_CURATOR` permanece apenas para compatibilidade;
- comando ops `platform:grant-admin` para bootstrap.

Web PR `radar-fiscal-web#71`:
- tela `/admin/administradores`;
- concessão/revogação por e-mail;
- confirmação customizada;
- menus administrativos condicionados a `PLATFORM_ADMIN`;
- Taxonomia condicionada ao papel global.

## Gates e evidência

- backend CI run `37557182159`: verde;
- migration 036 aplicada no CI;
- teste de integração de exclusividade, auditoria e last-admin aprovado;
- revisão adversarial registrada no backend PR #167;
- backend merge commit: `0a822ae337bff89dc10f6c6c60114e6cf30b69d4`;
- Railway produção aplicou a migration 036 e iniciou API normalmente;
- dry-run de bootstrap retornou `GRANTED`, sem escrita;
- grant real do primeiro administrador retornou `GRANTED`, RC 0;
- runner operacional temporário removido;
- Web CI run `37557999263`: verde, incluindo Playwright;
- revisão adversarial registrada no Web PR #71;
- Web merge commit: `33d7a4905f65a91641a65589a7e10eeff8902df4`.

## Segurança

O runtime da API não recebeu escrita ampla em `platform_user_roles`.
As mutações são limitadas às funções revisadas e auditadas.
O último administrador ativo não pode ser revogado.
DOE-SP não foi alterado.

## Gate seguinte

Etapa 3 — motor configurável de dois níveis.
