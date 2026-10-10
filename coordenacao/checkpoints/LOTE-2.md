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

## Checkpoint 1 — preflight e L-08
- L-08: inclusão confirmada dos três arquivos previstos nos scripts npm `test` e `test:integration`; commit backend `c7fe52f4c904b7b552023c10c8649392470466eb`. Aguardando CI para provar execução.
- L-07: **BLOQUEADA pelo preflight**; o código do seeder cria DOE-SP legado INACTIVE por padrão, e logs do scheduler consultados não exibem execuções, mas nenhum desses indícios prova `sources.is_active=false` hoje em produção. Sem consulta SQL somente leitura ao registro real, é proibido remover do registry / script / arquivos. Conector ainda inalterado.
- L-05: verificado fallback atual chama `downloadAuthenticatedPdf` se HTML vazio; contém testes antigos que exigem fallback e que deverão ser atualizados para falha explícita sem PDF.
- L-10: `collection_items` contém created_at e ligação aos runs; rotina nova será dry-run por padrão, em lotes, preservando runs, attempts e checkpoints.
