# TriBusca — manutenção dos contextos entre chats

## Regra central
GitHub é o contexto durável; memória de chat é apoio. Nenhum chat sincroniza automaticamente.

## Manutenção factual = R0
Atualizações verificáveis de `CONTEXT.md`, `PROJECT_STATE.md`, índices, status de PR/Issue, datas, SHAs, links e handoffs são R0 por padrão:
- sem nova atividade obrigatória;
- sem conversa nova obrigatória;
- sem LOCK/revisão independente obrigatórios;
- executor pode corrigir e validar na mesma sessão;
- autorização permanente de manutenção documental se aplica.

Se a edição mudar arquitetura, segurança, política, governança, decisão de produto, autorização ou regra operacional material, reclassificar para R2/R3.

## Snapshots temporais
Use, quando adequado:
`Estado observado em DD/MM/AAAA HH:MM BRT`

Diferencie:
- estado observado naquele momento;
- estado atual revalidado;
- histórico.

Um snapshot correto não vira erro só porque a Issue avançou depois.

## Propriedade
- **Gerente Geral:** responsável editorial/read-only; classifica risco e pede atualização quando necessária.
- **Executor:** responsável operacional pela edição e evidência.
- **Revisor independente:** usado conforme risco, não por rotina documental.

## Prompt e IDs
Novo ID só quando houver novo escopo material, decisão ou operação independente. Pequena correção de review e sincronização factual ficam no mesmo ciclo.

Prompts contêm apenas dados relevantes ao risco. Ferramenta/ambiente não relacionados não são Gate 0 artificial.

## Progresso
Percentuais são estimativas, não gates. Evidência objetiva prevalece.

## Novo chat
Novo chat é necessário quando a independência de revisão exigir ou quando a separação de risco R3 justificar. Não abrir chat novo apenas porque o executor mudou de etapa.

## Melhoria contínua e prevenção de loops
Quando um bloqueio, retrabalho ou contradição revelar deficiência do próprio processo, o Gerente deve tratar a causa, não apenas reenviar a mesma instrução.

Antes de emitir novo prompt, verificar bloqueios previsíveis relevantes ao próximo passo: sessão/tipo de gate, autorização vigente, SHA/PR, dependências e estado necessário.

- correção factual/procedural R0: atualizar diretamente no ciclo contínuo;
- ajuste de baixo risco R1: manter no mesmo ciclo quando seguro;
- mudança material de governança: R2;
- impacto crítico/produtivo: R3.

Não criar nova GOV/chat/LOCK/revisão apenas para registrar fato já comprovado ou resolver formalidade R0. Toda melhoria deve preservar os controles não flexibilizados de segurança/dados/tenant.

## Autorização permanente
O responsável autoriza correções factuais, manutenção documental, contexto, links/datas/status, formatação, testes, lint e ajustes sem mudança material de comportamento. Não cobre merge/deploy material, migration, secret, exclusão, SQL produtivo, arquitetura, decisão de produto ou operação destrutiva.
