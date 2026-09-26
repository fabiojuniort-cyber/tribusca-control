# TriBusca — Política global de conteúdo oficial

Aprovada em 26/09/2026. Decisão canônica: D-017 em `DECISIONS.md`.

## Regra

Quando uma página oficial publicar o **conteúdo completo e fiel** de um ato, o TriBusca pode coletar esse conteúdo diretamente da página oficial.

Um PDF que apenas reproduza o mesmo conteúdo é **redundante para captura**:
- não é requisito para reconhecer a publicação;
- sua indisponibilidade isolada não pode bloquear a publicação;
- sua falha não pode ser interpretada como “nenhuma publicação encontrada”;
- quando disponível, pode ser preservado como evidência/proveniência/autenticidade.

Sempre preservar, quando disponíveis:
- URL oficial;
- identificador oficial;
- referência/código de autenticidade;
- órgão, data, tipo, número e demais metadados oficiais;
- informação sobre a representação efetivamente capturada.

## Exceção: conteúdo material fora da página

PDF, planilha, tabela, imagem ou outro anexo continua sendo **fonte de conteúdo necessária** quando contém informação material ausente da página oficial.

Exemplos:
- anexos normativos;
- tabelas de alíquotas;
- listas de produtos/códigos;
- anexos de benefícios fiscais;
- quadros, fórmulas ou dados não reproduzidos integralmente no HTML/JSON.

Nesses casos, falha do artefato pode significar captura parcial. O conector deve registrar esse estado e não declarar captura integral.

## Página incompleta

Uma página que contenha apenas ementa, resumo, metadados ou trecho não é “conteúdo integral” apenas por ser oficial.

O conector deve distinguir:
- `FULL_OFFICIAL_CONTENT`: página oficial suficiente para o conteúdo integral;
- `PARTIAL_OFFICIAL_CONTENT`: página oficial incompleta;
- artefato redundante;
- artefato/anexo material obrigatório.

Os nomes técnicos exatos podem variar por conector até existir contrato comum; a semântica é obrigatória.

## Identidade, replay e versionamento

A decisão D-017 não autoriza alterar hashes históricos de forma silenciosa.

Antes de retirar um PDF/artefato de `files` ou do material de `content_hash`, cada conector deve provar:
1. identidade lógica preservada;
2. replay idempotente;
3. ausência de versões artificiais em dados já persistidos;
4. proveniência por origem preservada;
5. nenhum artefato de uma origem atribuído a outra;
6. anexos materiais continuam influenciando conteúdo/versionamento quando necessário.

Se a adequação exigir migration ou mudança material da semântica de versões, a implementação deve parar no gate de decisão antes dessa alteração.

## Aplicação por fonte

A decisão é global; a implementação é incremental.

A [Issue #6](https://github.com/fabiojuniort-cyber/tribusca-control/issues/6) acompanha o inventário, cuja matriz canônica está em [OFFICIAL_CONTENT_INVENTORY.md](OFFICIAL_CONTENT_INVENTORY.md), e deve registrar, por conector:
- representação integral;
- papel de PDFs;
- papel de anexos;
- autenticidade;
- comportamento de falhas;
- impacto no versionamento;
- compatibilidade com dados existentes;
- Issue/PR específico para adequação.

Nenhum conector é considerado adequado apenas porque esta política foi aprovada.

## Primeira aplicação: DOE-SP

No DOE-SP, a API oficial entrega o texto integral no detalhe da publicação em HTML/JSON. O PDF autenticado normalmente reproduz esse ato, enquanto `attachments[]` podem transportar conteúdo próprio.

A adequação do DOE-SP é tratada na Issue #1. A investigação mostrou que o modelo legado inclui hashes dos PDFs autenticados no `content_hash`, portanto a separação entre PDF redundante e anexo material precisa de compatibilidade com as versões já persistidas antes de qualquer merge/deploy.
