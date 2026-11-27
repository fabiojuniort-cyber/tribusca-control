# #6 — Receita Federal / Normas: representação, anexos e versionamento

Conferência estática em 07/11/2026, backend fixado em `bb6c61798aed34993a52e398795551ed2ca46393`. Frente 2, pacote documental da #6/#125; não é Anatomia do Ato nem coleta de amostras. Nenhuma requisição à Receita, execução de conector ou leitura do acervo foi feita.

Em linguagem simples: o conector usa o texto da versão original fornecida pela API da Receita. Também procura anexos e outras visualizações. Um anexo pode conter informação que falta no texto; deixar de baixá-lo pode perder conteúdo e mudar o identificador da versão. Esta conferência explica o código existente, sem afirmar que todo ato real está completo.

## Dez critérios da #6

| Critério | AS IS comprovado no código | Limite / próximo passo |
| --- | --- | --- |
| 1. Representação principal | São consultadas original, vigente, multivigente e relacional. A publicação usa `original.normalizedText`, além de apresentação HTML quando disponível. O ID retornado precisa corresponder ao ID solicitado. | Ter texto não comprova integridade/completude do ato real. Não substituir original por outra visualização nesta tarefa. |
| 2. HTML/JSON integral ou parcial | O parser percorre `ementas` e `outrosSegmentos`, ordena por `ordemSegmentoAto`, ignora texto com `omitir:true` e junta os segmentos textuais. | A completude depende do que a API fornece nesses campos e dos anexos; está NOT_PROVEN por família/ato. Não há validação jurídica ou de cobertura nesta leitura. |
| 3. Função dos PDFs | Não há download de PDF universal como requisito do corpo. Um PDF indicado como arquivo binário é processado como anexo, não presumido redundante. | Classificar o papel material/redundante exige evidência específica; nenhum arquivo foi aberto ou dispensado. |
| 4. Função dos anexos | Segmentos com `arquivoBinario.idArquivoBinario` geram URL oficial e externalId; anexos são deduplicados por esse ID e baixados/reutilizados separadamente. | O conector conserva hash/tamanho/MIME/validadores no estado e no retorno. Esta leitura não comprova retenção dos bytes originais em armazenamento durável. |
| 5. Autenticidade/proveniência | URL da visualização original, idAto, título, órgão, tipo/número, data e referência de publicação disponível são guardados; as quatro visualizações têm URL/API/hash/status de consulta em metadata. | Referência oficial não equivale a verificação criptográfica. Não atestar assinatura ou integridade remota byte a byte sem prova. |
| 6. Falha de PDF/anexo/representação | Original ausente/vazio ou com ID divergente impede emissão do item. Falha de visualização auxiliar é registrada em partialFailures. Anexo anterior pode ser reutilizado após falha de rechecagem, também com falha parcial; anexo novo que falha lança erro e não emite o item nesse processamento. | Reuso não comprova que o anexo antigo é a versão atual. Diferenciar indisponível, falha parcial e resultado vazio; não aceitar perda como solução final. |
| 7. content_hash/versionamento | Sem opt-in do conector para política nova, o normalizador usa LEGACY_ALL_FILES/V1: título, texto canônico, effectiveOn e lista ordenada dos rawSha256 de todos os arquivos. Metadata das visualizações não entra diretamente nesse hash. | Hash de uma visualização auxiliar é diagnóstico distinto do contentHash. Mudança apenas de metadata não prova nova versão canônica. |
| 8. Versões artificiais | Remover um anexo do conjunto de arquivos altera o material usado no hash V1, mesmo se o texto for idêntico. | Não remover downloads ou migrar política de hash neste PR. Adequação futura exige replay/compatibilidade e análise do legado. |
| 9. Testes/migration/legado | Há estado separado dos arquivos, rechecagem, reutilização de 304 e política padrão legada. O client rejeita resposta que excede os limites configurados, em vez de publicar somente seu prefixo. | Antes de mudança funcional: testes original/auxiliar ausente, ID divergente, 304, anexo novo/anterior indisponível, mudança de bytes, ordenação, replay e identidade. Necessidade de migration depende do desenho futuro, não está autorizada aqui. |
| 10. Issue/PR da adequação | Este inventário e a preparação documental ficam na #6/controle #125. | Não abrir nem implementar automaticamente uma correção de conector. Se uma adaptação se tornar necessária, delimitar seu escopo/issue/PR e obter autorização aplicável. |

## Evidências fixadas

- [Seleção das quatro representações e exigência da original](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/rfb-normas.connector.ts#L304), [ID, falha auxiliar e original vazia](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/rfb-normas.connector.ts#L344).
- [Anexos, 304, rechecagem e falha com/sem estado anterior](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/rfb-normas.connector.ts#L412).
- [Conteúdo e proveniência emitidos](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/rfb-normas.connector.ts#L480).
- [Segmentos de texto/arquivo e ordenação](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/rfb-normas.parser.ts#L417), [texto/HTML, anexos e hash próprio da representação](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/rfb-normas.parser.ts#L489).
- [Limite de resposta — rejeição, não truncamento silencioso](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/rfb-normas.client.ts#L243), [bytes/hash/tamanho do download](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/rfb-normas.client.ts#L399).
- [Política padrão e escolha dos arquivos](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/publication.normalizer.ts#L351), [hash canônico V1/V2](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/bb6c61798aed34993a52e398795551ed2ca46393/src/modules/collection/publication.normalizer.ts#L425).

## Validação e pendências

Os quatro arquivos de implementação referenciados foram lidos no SHA fixado. Links/linhas e blobs foram conferidos; nenhuma suíte de produto foi executada para este delta Markdown. Isso não é CI PASS nem revisão independente.

A integridade real do conteúdo, o mínimo histórico disponível, o bootstrap/checkpoint produtivo e intervalos de cobertura continuam NOT_PROVEN. A #6 permanece aberta. Notícias da Receita são outro conector, fora desta conferência de Normas.

Sem mudança de conector, timeout, hash, dados, permissões, configuração, migration, backfill, coleta ou produção. Não há decisão de escopo nova neste complemento.
