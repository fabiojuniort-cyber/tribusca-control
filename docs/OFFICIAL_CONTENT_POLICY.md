# TriBusca — Política global de conteúdo oficial

Aprovada em 26/09/2026; refinamentos de coleta/classificação consolidados em 27/09/2026. Decisões canônicas: D-017/D-036 e D-054/D-055 em `DECISIONS.md`.

## Regra — prioridade da página oficial

Quando uma página/representação oficial publicar o **conteúdo completo e fiel** de um ato, o TriBusca deve coletar esse conteúdo diretamente da página.

Se um PDF apenas reproduzir o mesmo conteúdo, ele é **redundante** e **não deve ser baixado por padrão**.

Nesse caso:
- não chamar o download do PDF redundante;
- não condicionar a captura à existência/disponibilidade do PDF;
- preservar URL oficial, identificador oficial e referência/código de autenticidade disponíveis na página/API;
- registrar qual representação efetivamente forneceu o conteúdo;
- não interpretar ausência do PDF redundante como falha ou ausência de publicação.

## Quando o PDF é necessário

Se a página oficial não fornecer o conteúdo necessário — por exemplo, trouxer somente ementa, resumo, metadados ou corpo incompleto — o PDF oficial deixa de ser redundante e passa a ser **fonte material necessária**.

Nesse caso:
- o conector deve obter o PDF oficial quando ele for a representação que contém o conteúdo;
- falha do PDF pode manter a captura parcial/incompleta;
- o arquivo deve participar da proveniência e do versionamento conforme sua materialidade;
- não declarar captura integral enquanto o conteúdo necessário estiver ausente.

## Anexos com conteúdo próprio

PDF, planilha, tabela, imagem ou outro anexo continua sendo **fonte de conteúdo necessária** quando contém informação material ausente do corpo principal da página.

Exemplos:
- anexos normativos;
- tabelas de alíquotas;
- listas de produtos/códigos;
- anexos de benefícios fiscais;
- quadros, fórmulas ou dados não reproduzidos integralmente no HTML/JSON.

A existência de HTML completo para o corpo principal **não dispensa** esses anexos.

## Classificação mínima

O conector deve distinguir semanticamente:
- `FULL_OFFICIAL_CONTENT`: página oficial suficiente para o corpo integral e sem material adicional obrigatório;
- `PARTIAL_OFFICIAL_CONTENT`: página oficial sozinha não representa toda a captura necessária;
- PDF redundante: não solicitado quando a página integral já fornece o mesmo corpo;
- PDF material: solicitado quando necessário para obter conteúdo ausente/incompleto;
- anexo material: solicitado independentemente do PDF redundante do corpo principal.

Os nomes técnicos exatos podem variar por conector até existir contrato comum; a semântica é obrigatória.

## Proveniência e autenticidade

Sempre preservar, quando disponíveis sem download redundante:
- URL oficial;
- identificador oficial;
- referência/código de autenticidade;
- órgão, data, tipo, número e demais metadados oficiais;
- representação efetivamente usada como conteúdo;
- vínculos com anexos materiais.

Proveniência não significa baixar toda representação possível. O TriBusca deve evitar transferir, armazenar ou versionar uma cópia redundante apenas para provar que ela existia quando a página oficial já fornece o conteúdo integral e sua referência de autenticidade.

## Identidade, replay e versionamento

A D-017/D-036 não autoriza alterar hashes históricos de forma silenciosa.

Antes de retirar um PDF/artefato redundante do material de `content_hash` em fonte com legado, cada conector deve provar:
1. identidade lógica preservada;
2. replay idempotente;
3. ausência de versões artificiais;
4. proveniência por origem preservada conforme a representação efetivamente usada;
5. nenhum artefato de uma origem atribuído a outra;
6. anexos/PDFs materiais continuam influenciando conteúdo/versionamento quando necessário.

Se a adequação exigir reconstrução, migration, repair ou mudança material da semântica de versões, executar somente após gate separado com backup, dependências, validação e reversão.

## Aplicação por fonte

A decisão é global; a implementação é incremental.

A [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6) acompanha o inventário em [OFFICIAL_CONTENT_INVENTORY.md](OFFICIAL_CONTENT_INVENTORY.md).

Para cada conector, registrar:
- representação integral;
- se a página é integral ou parcial;
- quando PDF é redundante e portanto não deve ser solicitado;
- quando PDF é material;
- papel dos anexos;
- autenticidade disponível sem download;
- comportamento de falhas;
- impacto no versionamento;
- compatibilidade com dados existentes;
- Issue/PR específico da adequação.

Nenhum conector é considerado adequado apenas porque a regra global foi aprovada.

## Primeira aplicação: DOE-SP

No DOE-SP, a API oficial de detalhe fornece o texto HTML/JSON do ato e `attachments[]` pode transportar conteúdo próprio.

A implementação preparada no PR #73 segue:
- corpo HTML oficial presente → conteúdo canônico e **zero tentativa de download do PDF autenticado redundante**;
- corpo HTML ausente → PDF autenticado oficial torna-se fallback material necessário;
- attachments próprios → material obrigatório separado;
- URL, `externalId` e `authCode` permanecem preservados.

O acervo produtivo atual ainda contém hashes/metadata legados calculados com PDFs autenticados. A decisão sobre preservar ou reconstruir esse acervo é um gate separado na Issue #1; esta política não autoriza operação destrutiva.


## GOV-03 — cadência, backfill, classificação e retenção

As regras abaixo foram aprovadas em 27/09/2026 e complementam a política de representação oficial sem substituir D-017/D-036.

### Monitoramento corrente

Quando aplicável a motores já finalizados, os quatro ciclos diários de monitoramento são **06h, 10h, 14h e 18h no horário de Brasília**.

### Backfill histórico

Backfill é um fluxo separado do monitoramento corrente:
- uma consulta por hora;
- recuar um dia por consulta e por fonte;
- continuar até alcançar todo o acervo que a fonte oficial efetivamente disponibilizar, inclusive anos ou décadas quando houver;
- registrar indisponibilidade/falha sem tratá-la como ausência de publicações.

### Escopo fiscal/tributário exibido

Inclui:
- tributos e contribuições;
- benefícios fiscais e regimes;
- obrigações e documentos fiscais;
- escriturações;
- fiscalização, cobrança e contencioso tributário;
- matéria aduaneira tributária;
- Reforma Tributária;
- mudanças de prazo, leiaute, sistema ou obrigação empresarial.

Para matéria fiscal/tributária, preservar conteúdo integral conforme a representação oficial aplicável. Publicação com **CNPJ exato** de empresa/estabelecimento cadastrado também preserva conteúdo integral e pode ser exibida somente à respectiva conta, mesmo quando o assunto geral esteja fora do escopo fiscal.

Uma **raiz isolada de oito dígitos** não caracteriza menção exata.

Itens rejeitados pela classificação preservam metadados mínimos e **motivo da exclusão**, de modo a distinguir descarte consciente de falha de coleta.

**Questão aberta:** como reexaminar itens antigos quando uma nova empresa/CNPJ for cadastrada, sem transformar esta decisão em autorização de implementação.
