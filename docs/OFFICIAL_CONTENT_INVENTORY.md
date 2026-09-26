# TriBusca — Inventário de conteúdo oficial por fonte

Atualizado em 26/09/2026. Este documento operacionaliza a decisão global D-017 sem declarar nenhum conector adequado apenas pela existência da regra.

## Legenda

- **Integral na página/API:** há evidência no conector de que o texto canônico é obtido diretamente de HTML/JSON/XML oficial.
- **Artefato material:** arquivo pode carregar conteúdo que não existe integralmente na página e, portanto, não pode ser descartado como redundante.
- **Redundante/proveniência:** arquivo replica conteúdo já integral na página e pode ser evidência sem ser requisito de captura.
- **A confirmar:** exige inspeção específica antes de alterar o conector.

## Matriz inicial

| Fonte/conector | Representação observada | Papel atual de arquivos | Impacto D-017 | Próximo passo |
| --- | --- | --- | --- | --- |
| **DOE-SP** | API oficial fornece detalhe com HTML/JSON integral; conector normaliza HTML como `content` | PDF autenticado normalmente replica o ato; `attachments[]` podem conter conteúdo próprio | **Primeira aplicação.** PDF autenticado é candidato a proveniência redundante; anexos permanecem materiais. Legado inclui PDF no `contentHash`, exigindo compatibilidade antes da mudança | Issue #1 + draft PR backend #73; decidir estratégia de hash/versionamento |
| **DOU / INLABS** | XML oficial extraído de ZIP INLABS | ZIP/XML é o próprio transporte do conteúdo oficial, não PDF redundante | Regra não autoriza remover o artefato de origem; o XML continua necessário para captura | Confirmar apenas classificação/proveniência em inventário futuro |
| **CONFAZ** | Conector extrai texto do HTML oficial e também descobre links de PDF/ZIP/XLS/XML/DOC etc. | Links de arquivo são hoje tratados genericamente como `files` | Necessário classificar arquivo a arquivo: alguns podem ser redundantes, outros podem ser anexos normativos materiais | Abrir Issue específica somente após evidência de quais famílias/arquivos são materiais |
| **Portal NF-e / ENCAT** | Listagem oficial fornece descrição, mas o conector baixa PDF/ZIP/XML técnico | Arquivo é normalmente o próprio conteúdo técnico (NT, schema, pacote, XML), não mera cópia da descrição | **Não tratar como redundante por padrão.** Falha do arquivo pode significar conteúdo incompleto | Inventariar por família/tipo antes de qualquer mudança |
| **SPED** | Portal HTML descreve documentos, mas o conector resolve e baixa múltiplos arquivos | Arquivos fazem parte da representação técnica e o conector só emite documento quando todos os arquivos esperados estão resolvidos | Alta probabilidade de conteúdo material fora da página; D-017 não autoriza relaxar downloads globalmente | Auditar descritores/famílias e separar eventual arquivo redundante de artefato material |
| **CGIBS** | Conector lê páginas HTML de detalhe e pode associar arquivo baixado | Há itens com `content` de página e itens com arquivo associado | **A confirmar por item/família.** Não presumir que arquivo é redundante só porque existe HTML | Inspeção específica antes de alterar comportamento |
| **Receita Federal / Normas** | Conector monta conteúdo canônico da representação oficial e processa attachments | Attachments são baixados e hoje entram em `files`/versionamento | Attachments podem conter anexos normativos materiais; não remover sem classificação. Conteúdo principal da página pode ser suficiente apenas quando comprovadamente integral | Inventariar papel dos attachments e compatibilidade de hash |
| **Demais DOEs** | Ainda não implementados/consolidados | Não aplicável | Incorporar D-017 no desenho inicial de cada novo conector para evitar legado desnecessário | Registrar na Issue #6 à medida que cada DOE for iniciado |

## Achados transversais

O normalizador atual do backend inclui o SHA-256 de todos os `files` no `contentHash`. Portanto, a política D-017 **não pode ser aplicada apenas removendo arquivos redundantes dos conectores** quando já houver versões persistidas com esses hashes.

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

O caso Portaria SRE 42/2025 demonstrou duas representações oficiais com mesma identidade e mesmo HTML normalizado, mas somente uma com PDF autenticado disponível. Isso comprova o risco de versão artificial no modelo legado quando o PDF deixa de participar de `files`/hash.

## Regra de governança

Nenhum conector deve ser alterado por este inventário. Cada adequação precisa de Issue/PR próprio, testes de identidade/replay/versionamento e, quando houver legado, prova de compatibilidade antes de merge/deploy.
