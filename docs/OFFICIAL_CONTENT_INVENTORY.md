# TriBusca — Inventário de conteúdo oficial por fonte

Matriz original: 26/09/2026. Complemento histórico e conferência documental: 04/11/2026. Este documento operacionaliza a D-017; datas e estados de cada bloco são explícitos e não certificam o runtime atual.

## Legenda

- **Integral na página/API:** há evidência no conector de que o texto canônico é obtido diretamente de HTML/JSON/XML oficial.
- **Artefato material:** arquivo pode carregar conteúdo que não existe integralmente na página e, portanto, não pode ser descartado como redundante.
- **Redundante/não solicitar:** arquivo replica conteúdo já integral na página; preservar referência/autenticidade disponível, mas não baixar a cópia por padrão.
- **A confirmar:** exige inspeção específica antes de alterar o conector.

## Matriz inicial — snapshot histórico de 26/09/2026

As afirmações de implementação e contagens deste bloco são históricas. A alternativa “preservar × reconstruir” do DOE-SP foi posteriormente resolvida pela D-052; não é uma decisão a reabrir. O complemento de 04/11 abaixo registra o que continua sem prova, sem converter o snapshot em estado produtivo atual.

| Fonte/conector | Representação observada | Papel atual de arquivos | Impacto D-017 | Próximo passo |
| --- | --- | --- | --- | --- |
| **DOE-SP** | API oficial fornece detalhe com HTML/JSON do ato; 517/517 versões do snapshot tinham `content_text` não vazio | PDF autenticado normalmente replica o corpo e, pela D-036, **não deve ser solicitado quando o HTML estiver disponível**; `attachments[]` podem conter conteúdo próprio; PDF vira material se faltar o corpo oficial | **Primeira aplicação.** PR #73 implementa page-first: HTML → zero download do PDF redundante; página sem corpo → PDF material; attachments continuam materiais. O legado produtivo contém 516 PDFs autenticados e 94 attachments no snapshot, exigindo decisão preservar×reconstruir antes do merge | Issue #1 + PR #73; executar auditor read-only de dependências antes de qualquer decisão destrutiva |
| **DOU / INLABS** | XML oficial extraído de ZIP INLABS | ZIP/XML é o próprio transporte do conteúdo oficial, não PDF redundante | Regra não autoriza remover o artefato de origem; o XML continua necessário para captura | Confirmar apenas classificação/proveniência em inventário futuro |
| **CONFAZ** | Conector extrai texto do HTML oficial e também descobre links de PDF/ZIP/XLS/XML/DOC etc. | Links de arquivo são hoje tratados genericamente como `files` | Necessário classificar arquivo a arquivo: alguns podem ser redundantes, outros podem ser anexos normativos materiais | Abrir Issue específica somente após evidência de quais famílias/arquivos são materiais |
| **Portal NF-e / ENCAT** | Listagem oficial fornece descrição, mas o conector baixa PDF/ZIP/XML técnico | Arquivo é normalmente o próprio conteúdo técnico (NT, schema, pacote, XML), não mera cópia da descrição | **Não tratar como redundante por padrão.** Falha do arquivo pode significar conteúdo incompleto | Inventariar por família/tipo antes de qualquer mudança |
| **SPED** | Portal HTML descreve documentos, mas o conector resolve e baixa múltiplos arquivos | Arquivos fazem parte da representação técnica e o conector só emite documento quando todos os arquivos esperados estão resolvidos | Alta probabilidade de conteúdo material fora da página; D-017 não autoriza relaxar downloads globalmente | Auditar descritores/famílias e separar eventual arquivo redundante de artefato material |
| **CGIBS** | Conector lê páginas HTML de detalhe e pode associar arquivo baixado | Há itens com `content` de página e itens com arquivo associado | **A confirmar por item/família.** Não presumir que arquivo é redundante só porque existe HTML | Inspeção específica antes de alterar comportamento |
| **Receita Federal / Normas** | Conector monta conteúdo canônico da representação oficial e processa attachments | Attachments são baixados e hoje entram em `files`/versionamento | Attachments podem conter anexos normativos materiais; não remover sem classificação. Conteúdo principal da página pode ser suficiente apenas quando comprovadamente integral | Inventariar papel dos attachments e compatibilidade de hash |
| **Demais DOEs** | Ainda não implementados/consolidados | Não aplicável | Incorporar D-017 no desenho inicial de cada novo conector para evitar legado desnecessário | Registrar na Issue #6 à medida que cada DOE for iniciado |

## Achados transversais

O modelo legado do backend inclui SHA-256 de todos os `files` no `contentHash`. Portanto, D-017/D-036 **não pode ser aplicada apenas parando downloads redundantes** quando já houver versões persistidas com esses hashes; é necessário compatibilizar o legado ou reconstruí-lo com gate explícito.

Para cada fonte com legado, a adequação precisa distinguir:

1. conteúdo canônico;
2. artefatos redundantes de proveniência;
3. anexos materiais;
4. compatibilidade de replay com versões existentes.

## DOE-SP — evidência inicial

Logs produtivos somente leitura já emitidos pelo validador registraram, no snapshot consultado:

- 517 publicações;
- 517 versões;
- 610 arquivos;
- 516 PDFs autenticados;
- 94 anexos;
- 0 versões históricas naquele momento.

O caso Portaria SRE 42/2025 demonstrou duas representações oficiais com mesma identidade e mesmo HTML normalizado, mas disponibilidade diferente do PDF autenticado. Sob D-036, nenhuma representação deve solicitar esse PDF quando o HTML estiver integral. O caso continua comprovando o risco do legado: hashes antigos incluem PDF e não podem simplesmente ser comparados ao novo conteúdo page-first sem compatibilidade ou reconstrução controlada.

## Regra de governança

Nenhum conector deve ser alterado por este inventário. Cada adequação precisa de Issue/PR próprio, testes de identidade/replay/versionamento e, quando houver legado, prova de compatibilidade antes de merge/deploy.


## Cobertura histórica — reconciliação documental de 04/11/2026

Complemento solicitado na [Issue #6, decisão de 29/09](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6#issuecomment-5882081133), sem alteração dos conectores. A matriz inicial acima é um snapshot de 26/09/2026, **não um retrato produtivo atual**. A D-052 já escolheu reconstrução restrita DOE-SP; a menção antiga a “preservar × reconstruir” não representa decisão ainda aberta. A execução e o fechamento continuam nos controles #1–#4. Este complemento não autoriza execução.

### Significado e limites dos campos

- `earliestOfficialAvailable`: menor data efetivamente acessível na representação oficial indicada, com evidência. Marco de uma plataforma não prova limite de todo o acervo do órgão.
- `currentBootstrapStart`: corte configurado no runtime/checkpoint observado. Quando só há default no código, ele é identificado como **default**, e o valor produtivo permanece `NOT_PROVEN`.
- `historicalGap`: conjunto de intervalos sem cobertura efetivamente comprovada, incluindo lacunas internas, entre o limite oficial conhecido e a janela de referência. Nunca calculado só a partir de um default ou de listagem recente. `NOT_PROVEN` não significa zero lacuna.
- Estratégia de legado: representação/conector separado quando necessário; sondagem, migração, backfill e reprocessamento não estão autorizados por esta documentação.

Consulta nesta data: inspeção dos arquivos versionados no backend `1a6419d0d23e9815de90463731e14157e8fc09cf` e checkpoints vinculados. **Não foi feita nova sondagem dos limites nas fontes oficiais nem consulta ao banco produtivo.** As URLs oficiais abaixo identificam as representações, sem alegar que foram consultadas nesta data.

### Matriz histórica e evidências

| Fonte / representação oficial | `earliestOfficialAvailable` | `currentBootstrapStart` | `historicalGap` | Estratégia de legado / evidência / próxima prova |
| --- | --- | --- | --- | --- |
| DOE-SP — plataforma atual ([portal](https://doe.sp.gov.br/)) | **NOT_PROVEN como mínimo acessível atual**. Referência histórica: **2023-07-01**, marco registrado na decisão de 29/09 e na constante `DOE_SP_PLATFORM_START`. A constante e a observação antiga não provam disponibilidade atual nem o limite de todo o acervo paulista. | Runtime **NOT_PROVEN**. Código aceita `DOE_SP_BOOTSTRAP_START_DATE`; sem valor, usa início da janela de lookback (default 3 dias). | **NOT_PROVEN**: target/coverageFrom de planejamento não comprova documentos coletados nem replay integral. | Plataforma anterior em frente separada #20/backend #128. [Código fixado](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/doe-sp.connector.ts). Fechamento bootstrap/replay continua #2–#4; não iniciar outro DOE. |
| DOU / INLABS — [XML/ZIP oficial](https://inlabs.in.gov.br/) | **NOT_PROVEN** para INLABS e para representações alternativas do DOU. | **NOT_PROVEN** no runtime; janela de execução não é bootstrap histórico completo. | **NOT_PROVEN**; conflitos de identidade de três atos são pendência própria #86. | Identificar limite por representação e preservar XML/ZIP/proveniência. [Conector](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/dou.connector.ts). Não iniciar repair/backfill. |
| CONFAZ — [portal oficial](https://www.confaz.fazenda.gov.br/) | **NOT_PROVEN por família**. A existência de atos antigos não demonstra varredura completa. | Data produtiva **NOT_PROVEN**. Código usa janela inicial limitada por família, default `bootstrapWindowPerFamily=3`, não corte temporal global. | **NOT_PROVEN**; janela de três links não equivale a cobertura histórica. | Evidenciar por família/ano e representação antes de propor ampliação. [Conector](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/confaz.connector.ts). Nenhum conteúdo protegido 52/91 ou 100/97 foi aberto/reutilizado. |
| Portal NF-e / ENCAT — [listagens oficiais](https://www.nfe.fazenda.gov.br/portal/) | **NOT_PROVEN por família** (NT, informes, schemas, manuais). | **NOT_PROVEN** no runtime; listagem/limite de itens não demonstra data inicial. | **NOT_PROVEN** por família/arquivo. | Separar conteúdo material e versões por família; não confundir arquivo técnico com PDF redundante. [Rotas/famílias do conector](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/nfe-encat.connector.ts). |
| SPED — [gov.br primário](https://www.gov.br/sped/pt-br/) | **NOT_PROVEN** nesta representação. | **NOT_PROVEN** no runtime; crawl/cursor não são marco temporal comprovado. | **NOT_PROVEN**, incluindo lacunas internas e materiais ausentes. | Evidenciar o portal primário separadamente. [Documentação](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/docs/phase-7-sped.md) e [conector](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/sped.connector.ts). Sem mudar conector/crawl. |
| SPED — [portal legado](https://sped.rfb.gov.br/) | **NOT_PROVEN** nesta representação; não herdar o limite do gov.br. | **NOT_PROVEN** no runtime. | **NOT_PROVEN**; não somar cobertura de portais sem deduplicação/proveniência comprovadas. | Representação de enriquecimento/backfill conforme documentação acima; não é duplicata presumida nem autorização de backfill. |
| CGIBS — [portal oficial](https://www.cgibs.gov.br/) | **NOT_PROVEN**. | **NOT_PROVEN** no runtime. | **NOT_PROVEN**; correção de identidade/conteúdo backend #173 é dependência distinta. | Evidenciar limites por família/listagem e corrigir saúde apenas no pacote autorizado #106. [Conector](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/cgibs.connector.ts). |
| Receita Federal / Normas — [consulta oficial](https://normas.receita.fazenda.gov.br/sijut2consulta/consulta.action) | **NOT_PROVEN**; não inferir limite oficial a partir de janeiro/2025. | Runtime **NOT_PROVEN**. Default de código `BOOTSTRAP_START_MONTH='2025-01'`, substituível por opção; checkpoint existente pode prevalecer. | **NOT_PROVEN**; default não comprova mínimo persistido nem intervalo integral. | Identificar disponibilidade anterior, páginas e anexos sem alterar identidades. [Conector](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/rfb-normas.connector.ts) e [estado](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/rfb-normas-source-state.repository.ts). Repair backend #60 não está autorizado a executar. |
| Receita Federal / Notícias — [últimas notícias](https://www.gov.br/receitafederal/pt-br/assuntos/noticias/ultimas-noticias) | **NOT_PROVEN** para o arquivo histórico. | **NOT_PROVEN** como corte histórico. Conector consulta listagem corrente, máximo default 30 artigos/run; não prova bootstrap do arquivo. | **NOT_PROVEN**. Gate NEWS-03/#62 pede prova real após virada do mês. | Separar notícias de Normas; não interpretar troca de mês como fim do acervo. [Client](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/rfb-news.client.ts), [conector](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/rfb-news.connector.ts). Não disparar execução. |
| Demais fontes previstas (outros DOEs e municipais; NFS-e Nacional quando houver frente própria) | **NOT_PROVEN por fonte**. | **NOT_PROVEN**; existência no roadmap não é conector implementado. | **NOT_PROVEN**. | Abrir inventário individual quando a fonte for autorizada. Próximo DOE depende do fechamento formal SP; sem inclusão silenciosa de implementação. |

### Fontes previstas — decomposição documental

Estas linhas detalham a linha agregada “Demais fontes previstas” da matriz e a lista inicial aprovada do projeto. Não iniciam conectores, não declaram implementação ausente/presente sem reconciliação e não acrescentam entregas ao denominador da Frente 2. URL/representação oficial ainda precisam ser identificadas e comprovadas individualmente; não inventar limite temporal.

| Fonte prevista | Esfera / família | `earliestOfficialAvailable` | `currentBootstrapStart` | `historicalGap` | Estratégia / evidência pendente |
| --- | --- | --- | --- | --- | --- |
| BA | Estadual | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| MS | Estadual | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| MT | Estadual | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| GO | Estadual | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| MG | Estadual | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| PI | Estadual | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| PA | Estadual | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| TO | Estadual | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| MA | Estadual | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| Goiânia/GO | Municipal | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| Goiatuba/GO | Municipal | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| Rio Verde/GO | Municipal | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| Balsas/MA | Municipal | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| Porto Nacional/TO | Municipal | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |
| NFS-e Nacional | Nacional | NOT_PROVEN | NOT_PROVEN | NOT_PROVEN | Identificar representação oficial e estado real do conector; fonte legada separada quando houver. Nenhuma execução autorizada por esta linha. |

### Critério para completar esta pendência

Os quatro campos estão agora explícitos por fonte. O preenchimento estrutural **não encerra a Issue #6**: limites oficiais ainda desconhecidos, estado produtivo não observado, anexos/famílias não auditados e provas de completude continuam identificados. Não aceitar `NOT_PROVEN` como limitação final nem reduzir o requisito aprovado.

Próxima etapa documental: reunir evidência oficial datada do menor marco por representação, evidência read-only do corte/checkpoint e da cobertura real, e só então descrever lacunas com intervalos. Cada adaptação de conector conserva issue/PR/testes/gates próprios. [Controle Frente 2 #124](https://github.com/fabiojuniort-cyber/tribusca-control/issues/124).
