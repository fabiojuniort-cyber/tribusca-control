# ACT-SCOPE-02 — Filtro de Coleta Configurável (Trifaros)

## Regras de execução

- Nada é implementado sem revisão: entregar por etapas (seção "Ordem de entrega"); cada etapa é revisada e aprovada pelo responsável antes da próxima.

- Branch e PRs em rascunho, conforme o protocolo do repositório. Sem segredos/URLs de banco em Issues/PRs. Railway AI Agent proibido (D-065). DOE-SP segue excluído.

- Não fingir uso de ferramentas/agentes inexistentes. Se uma revisão independente não puder ser feita, avisar antes de substituir o gate.

- Reaproveitar o que já existe no backend, sem criar estruturas paralelas:

- `dou-scope.rules.ts` (dou-scope-v4: IGNORE/KEEP/REVIEW, regras de relevância e sinais ambíguos);

- supressão reversível `publication_scope_state` / `publication_scope_events` (SUPPRESS/RESTORE, migrations 033–035);

- planner/executor histórico do DOU (#155);

- contrato de publicação normalizada (connector.contract / publication spool);

- papéis globais em `platform_user_roles`.

- PR #164 (ACT-SCOPE-01): não mergear. Fechar como superado por esta frente, **portando os testes úteis** (anexo/imagem não examinado, conflito de tipo/proveniência e estrutura incompleta impedem exclusão; EXTRATO DE CONTRATO conforme D-066).

## Objetivo

Um filtro central, versionado e configurável pelo painel, que decide o que é gravado no banco, usado por **todos** os caminhos de entrada: coletores, backfills, importações manuais e a futura importação em massa de arquivos locais. Nenhum caminho grava publicação sem passar por ele.

## Princípio

- Descarta só o que é **conhecidamente irrelevante**. Tipo de ato desconhecido **fica** (KEEP) e vai para revisão.

- **CNPJ, número de processo ou valor, sozinhos, não preservam um ato.** CNPJ só conta junto com contexto tributário material.

## Nível 1 — Tipo de ato

- Chave: **fonte + seção + tipo normalizado**, com mapa de variações de grafia ("EDITAL DE NOTIFICAÇÃO Nº 12" → "EDITAL DE NOTIFICAÇÃO").

- Cada tipo recebe uma de 4 opções:

1. **Manter sempre**: nunca exclui (ex.: Lei, Convênio ICMS).

2. **Manter só se tiver termo tributário**: exclui, a não ser que o Nível 2 encontre sinal (ex.: Portaria, Despacho, Ato).

3. **Excluir, salvo termo forte**: exclui, a não ser que haja termo **forte** em contexto (ex.: Edital de notificação).

4. **Excluir sempre**: exclui sem olhar o texto (ex.: Leilão, Aviso de licitação).

- Fontes tributárias (CONFAZ, RFB, CGIBS, NF-e/ENCAT, SPED) começam com todos os tipos em "Manter sempre", mas usam a mesma tabela e podem ganhar exclusões no futuro.

- Carga inicial: os **1.328 tipos reais** já classificados, carregados como **rascunho**. Nada hardcoded no TypeScript.

## Nível 2 — Termos tributários dentro do ato

- Tabela própria de termos, **independente da Taxonomia** (há termos que só servem para preservar o ato). Opcional: botão "Importar sinônimos da Taxonomia" que copia uma vez, sem vínculo.

- Campos de cada termo:

- **Força**:

- **Forte**: sozinho é sinal ("auto de infração", "crédito presumido").

- **Fraco**: só conta com outro termo a até N palavras ("multa" + "tributária").

- **Negativo**: anula termos próximos ("multa contratual", "valores incluem ICMS").

- **Janela de contexto**: N palavras, configurável.

- **Onde vale**: todas as fontes ou só certa fonte/tipo.

- **Peso do local**: título/ementa vale mais que o fim do corpo.

- Ativo/inativo, categoria, notas.

- Termos são texto simples, **sem regex no painel**. Regras complexas ficam **em código, com testes**, referenciadas por código.

- Ordem de leitura: metadados → título/ementa → corpo. Se os metadados bastam, decide **antes de baixar**; senão decide **depois de baixar e antes de gravar**.

- Toda decisão registra a versão da política, o motivo, o termo decisivo e o trecho.

## Fila "Novos tipos"

Tipo não configurado → ato gravado normalmente e listado em **Filtro de Coleta → Novos tipos**:

- agrupado por fonte/seção/tipo, com quantidade, primeira e última ocorrência e 3 exemplos com link;

- ações: **Manter sempre**, **Excluir** (escolhendo a opção 2, 3 ou 4), **Criar termo** a partir de um trecho do próprio ato, **Juntar com tipo existente**.

- As decisões entram no rascunho da política.

## Rascunho → Simulação → Aprovação (obrigatório)

- Nenhuma mudança vale sem simulação. Fluxo igual ao da Taxonomia: rascunho, diferenças, publicação e auditoria.

- A simulação roda sobre o **acervo atual** e sobre as **coletas recentes**. Lista o que passaria a ser excluído ou mantido, agrupado por tipo e motivo.

- O administrador revisa **todos**, uma **amostra** ou **nenhum**, marca os erros, ajusta e **aprova**. Só então a política é publicada e vale para coletas novas.

- Exclusão no acervo existente é um lote separado, também aprovado.

- **Na entrega**: rodar a primeira simulação completa sobre todo o acervo (~77.497 atos) com os 1.328 tipos carregados e entregar a lista do que seria excluído para o ajuste fino das tabelas, antes de qualquer exclusão.

## Relatório "Desconsiderados"

- Uma linha por ato descartado: **coletor, tipo, nome/título, nº, data, link oficial, motivo (regra/termo e versão da política)**.

- **Sem texto e sem ementa.**

- Guarda de **3 meses**, com **limpeza automática diária** (tabela particionada por mês; remove meses com mais de 3 meses).

- Filtros: período (hoje/ontem/intervalo), coletor, tipo, motivo. Ação "Configurar este tipo" abre o tipo no rascunho.

- Ato descartado por engano volta pelo link ou coletando o período de novo (backfill).

## Administradores da plataforma

- Novo papel global **`PLATFORM_ADMIN`** em `platform_user_roles`, com tela **Administração → Administradores** para conceder/revogar por e-mail, auditada (quem, quando, motivo).

- **Só esse papel acessa**: Taxonomia, Filtro de Coleta, Novos tipos, Desconsiderados e Monitoramento técnico. Hoje o Monitoramento aceita OWNER/ADMIN do cliente; isso muda.

- **Acesso ilimitado e independente de licença**: qualquer verificação de plano/licença, atual ou futura, deixa o `PLATFORM_ADMIN` passar, com teste garantindo.

- Primeiro administrador: **fabio.terasaka@agrex.com.br** (conta já cadastrada; é a única), concedido por comando de ops.

- O sistema impede revogar o **último** administrador.

## Telas

- Taxonomia → Filtro de Coleta: **Tipos de ato**, **Termos**, **Novos tipos**, **Simulações**.

- Monitoramento → **Desconsiderados**.

- Administração → **Administradores**.

- **Toda tela nova tem botões de ajuda "?"** explicando a tela e cada campo/opção (ex.: o que é "Excluir, salvo termo forte", termo fraco, termo negativo, janela, simulação, guarda de 3 meses).

- Interface de edição rápida, não técnica.

## Segurança operacional

- Alerta quando a taxa de descarte de uma fonte salta (ex.: erro de leitura transformando todo tipo em "Leilão").

- Filtro como função pura e rápida (termos compilados), com meta de desempenho para a importação em massa (ex.: ≥ 2 mil documentos/s).

## Acervo histórico

1. Simulação com o mesmo motor → lista aprovada pelo administrador.

2. Remoção do produto via **SUPPRESS reversível** já existente.

3. **Exclusão física (R3) só se o responsável quiser**, após medir onde estão os bytes. Sequência:

- inventário;

- manifesto exato;

- validação de FKs;

- backup Railway;

- restauração do backup em PostgreSQL temporário;

- teste de restore;

- simulação;

- revisão independente;

- exclusão FK-safe;

- pós-validação;

- confirmação de que o filtro impede reentrada.

## Ordem de entrega (cada etapa aprovada antes da próxima)

1. **Levantamento** (só leitura): volume por fonte/seção/tipo, bytes por tabela, descartes atuais do dou-scope.

2. **Administradores**: papel `PLATFORM_ADMIN`, tela, bloqueio das áreas restritas, primeiro administrador.

3. **Motor de 2 níveis**: função pura + testes (dou-scope-v4 e #164 portados). Ainda não exclui nada.

4. **Telas de configuração**: tipos, termos, Novos tipos, rascunho → simulação → aprovação, ajudas "?".

5. **Primeira simulação completa do acervo** + ajuste fino das tabelas pelo responsável.

6. **Ativação nas coletas** (DOU primeiro) + Desconsiderados (3 meses) + alertas.

7. **Limpeza do acervo** aprovado (SUPPRESS); exclusão física só se solicitada.

## Atualizar o repositório de governança (`tribusca-control`) — fazer primeiro

- **Issue nova** "ACT-SCOPE-02 — Filtro de Coleta Configurável", com o escopo acima, as etapas como checklist e a referência à Issue #85 / PR #164 (superados).

- **DECISIONS.md** — registrar (a partir de D-067):

- D-067: Filtro de Coleta em 2 níveis (tipo com 4 opções + termos forte/fraco/negativo com janela). Tipo desconhecido fica e vai para "Novos tipos". CNPJ/processo/valor sozinhos não preservam o ato. **Substitui o trecho da D-057** sobre preservar integralmente publicação com CNPJ exato de empresa cadastrada e **generaliza a D-066** para todos os tipos.

- D-068: Toda mudança do filtro segue rascunho → simulação → aprovação (todos/amostra/nenhum). Primeira simulação completa do acervo antes de qualquer exclusão.

- D-069: Relatório "Desconsiderados" sem texto, guarda de 3 meses com limpeza automática (atualiza a D-057 quanto aos metadados mínimos dos rejeitados).

- D-070: Papel `PLATFORM_ADMIN`, acesso exclusivo às áreas administrativas, ilimitado e independente de licença. Primeiro: fabio.terasaka@agrex.com.br. Proibido revogar o último.

- D-071: Termos do filtro independentes da Taxonomia. Fontes tributárias com padrão "Manter sempre", configuráveis.

- **docs/workstreams/ACT-SCOPE-02.md**: este documento como especificação viva.

- **ROADMAP.md / PROJECT_STATE.md**: incluir a frente, o status por etapa e o encerramento do ACT-SCOPE-01.

- **OPEN_QUESTIONS.md**: registrar pendências que surgirem (ex.: N padrão da janela; meta de desempenho).

- Atualizar o estado no repositório ao fim de cada etapa.

## Estado da execução

- **Etapa 0 — Governança:** preparada na Issue #87 e draft PR #88. D-067 a D-071, ROADMAP, PROJECT_STATE e OPEN_QUESTIONS versionados. ACT-SCOPE-01/#85 e backend #164 encerrados como superados. **Merge continua bloqueado até revisão independente material.**
- **Etapa 1 — Levantamento read-only:** executada em 06/10/2026 BRT. Evidência detalhada em [ACT-SCOPE-02-STAGE-1.md](ACT-SCOPE-02-STAGE-1.md). Resultado: 118.871 publicações, 2.374 grupos brutos fonte/seção/tipo, ~2,57 GiB em relações públicas e dry-run dou-scope-v4 sem escrita.
- **Etapa 2 — PLATFORM_ADMIN:** concluída. Backend #167 e Web #71 mergeados, migration 036 aplicada em produção e primeiro administrador global concedido por ops. Evidência em [ACT-SCOPE-02-STAGE-2.md](ACT-SCOPE-02-STAGE-2.md).
- **Etapa 3 — Motor de 2 níveis:** em execução.
