# Checkpoint LOTE-2 — 2026-10-10
DE: CLAUDE-COORD | EXEC: GPT-EXEC-2
Frente LIMPEZA: 7/14 (50%) — por decisão do COORD
L-04: CONCLUÍDA; L-13: CONCLUÍDA; L-15: PRONTA (só proposta).
Quadro commit: `45010e84aaca070e7edd887932198c2d108a809a`
Backend base main: `8a4d28bbf95ecdb182438d08ff1c6e475d78af96`
Branch: `feat/lote2-doesp-tests-retention-20261010`; um PR DRAFT, sem merge/deploy.

## Protocolo e escopo
- Implementar somente L-05, L-07 se preflight fonte inativa, L-08, L-10 conforme propostas por extenso no checkpoint LOTE-1.
- L-09 e L-15: exclusivamente proposta até cinco linhas, sem código nem SQL produtivo.
- Sem subagentes executáveis neste chat; separação por commits/tarefas e leituras paralelas.
- Nenhum acesso destrutivo a Railway/produção. L-07 BLOQUEAR se inatividade não for comprovada no banco, sem inferir pelos logs.

## Etapas
- [x] Quadro atualizado conforme determinação do COORD, commit `45010e84aaca070e7edd887932198c2d108a809a`.
- [x] Branch do backend criada.
- [ ] Confirmar preflight DOE-SP legado inativo por evidência direta.
- [ ] L-05 código + testes.
- [ ] L-07 código + testes (condicional ao preflight).
- [ ] L-08 suíte de testes (sem alterar escopo dos próprios testes).
- [ ] L-10 rotina de retenção dry-run + testes.
- [ ] CI, PR draft e revisão de escopo; sem merge/deploy.
