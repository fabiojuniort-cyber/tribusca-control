# TriBusca — Inventário de conteúdo oficial por fonte

Atualizado em 26/09/2026. Este documento operacionaliza a decisão global D-017 sem declarar nenhum conector adequado apenas pela existência da regra.

## Legenda

- **Integral na página/API:** há evidência no conector de que o texto canônico é obtido diretamente de HTML/JSON/XML oficial.
- **Artefato material:** arquivo pode carregar conteúdo que não existe integralmente na página e, portanto, não pode ser descartado como redundante.
- **Redundante/não solicitar:** arquivo replica conteúdo já integral na página; preservar referência/autenticidade disponível, mas não baixar a cópia por padrão.
- **A confirmar:** exige inspeção específica antes de alterar o conector.

## Matriz inicial

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
