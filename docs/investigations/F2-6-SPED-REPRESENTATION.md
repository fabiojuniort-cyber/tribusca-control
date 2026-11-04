# #6 — conferência documental SPED por representação

Consulta de código04/11/2026, backend fixado1a6419d0d23e9815de90463731e14157e8fc09cf. Escopo R0/documental, sem consulta/coleta oficial em produção, sem abrir corpus/gold ANAT. Nenhum conector alterado.

Esta conferência complementa a matriz; **não comprova conteúdo integral real** nem disponibilidade/histórico do portal. Não confundir descrição, comunicado e documento técnico.

| Critério da #6 | Evidência estática / situação |
|---|---|
| Representação de conteúdo | GOVBR deriva documentText de Volto quando disponível, senão texto visível; LEGACY usa parser da página. Descritor distingue ANNOUNCEMENT do DOCUMENT. Descrição textual é normalizeSpace(documentText).slice(0,12000), depois usada em publicationFor como content, salvo representante canônico do grupo. HTML da página não certifica integridade do documento técnico. |
| HTML/JSON integral ou parcial | **NOT_PROVEN por documento real.** O limite de12000 caracteres é comportamento do código, não evidência de que alguma página concreta tenha ultrapassado o limite. Não declarar captura integral somente porque content_text existe; PDF/ZIP pode ser o documento material. |
| Papel do PDF | Integra o conjunto de arquivos resolvidos e a versão por hash. Não há classificação automática suficiente de PDF redundante versus material nesta leitura. Não remover/relaxar arquivos só pela existência de descrição HTML. |
| Papel de anexos/ZIP/XML | Descritores incluem links de artefatos e consolidação dos filhos. Conjunto de arquivos precisa estar resolvido: novos downloads ou arquivos comprovados por checkpoint anterior. A descoberta incompleta adia o descritor. Cada família ainda precisa de conferência oficial específica. |
| Autenticidade/proveniência | officialUrl/externalId/identityKey; sourcePortal, contentSource, originTitle, módulo/carrier/versão/revisão/status; arquivos com URL,hash,tamanho,MIME,ETag/LastModified quando existentes. Hash comprova identidade dos bytes, não autenticidade jurídica por si. |
| Falha de arquivo | Se existe checkpoint do arquivo, falha de rechecagem pode reutilizar hash/metadata anteriores e registrar partialFailure. Sem arquivo resolvido, descritor é adiado, não emitido com conjunto parcial. Portanto falha de download não implica sempre ausência de documento; depende da prova anterior.304 sem checkpoint é erro. |
| content_hash/versionamento | publicationFor não seleciona HTML_PRIMARY_MATERIAL_FILES nem versionRole específico. O normalizador usa LEGACY_ALL_FILES/V1 por padrão: título,conteúdo normalizado,effectiveOn e hashes de todos os arquivos ordenados. GOVBR/LEGACY participam do mesmo mecanismo; política por item não foi inferida. |
| identity / risco de versões artificiais | spedBaseIdentityKey usa módulo/carrier/tipo/família ou número/versão/revisão e path em identidade fraca. Mirror usa conjunto de hashes/canonical representante; comunicado tem carrier próprio. Alterar texto extraído, conjunto de arquivos ou identidade pode criar versão/correlação diferente; não alterar só para simplificar o inventário. |
| Testes/compatibilidade | GOVBR tem testes sintéticos de hidratação/arquivo/idempotência; isso é teste existente, não execução desta rodada nem prova de portal atual. Adequação futura precisa testes de falha com/sem checkpoint,304,conjunto material completo,comunicado×documento,espelhos,identidade/hash e legado. Migration/backfill não são necessários/autorizados por esta conferência; eventual necessidade depende de desenho aprovado. |
| Issue/PR | #6 e controle#125 seguem documentação, revisão independente pendente. Não abrir implementação automaticamente nem fechar #6 por preencher NOT_PROVEN. Famílias/atos oficiais e versões serão objeto de comprovação própria, fora desta leitura estática. |

## Referências fixadas

- [Parser Volto/documento](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/sped.parser.ts#L315), [descritor e limite textual](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/sped.parser.ts#L700).
- [Proveniência de arquivos](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/sped.connector.ts#L883), [identidade](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/sped.connector.ts#L925), [representação publicada](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/sped.connector.ts#L1199).
- [Download/304/reutilização anterior](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/sped.connector.ts#L1467), [adiamento sem conjunto completo](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/sped.connector.ts#L1539).
- [Normalizador/hash padrão](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/src/modules/collection/publication.normalizer.ts#L358).
- [Testes GOVBR existentes](https://github.com/fabiojuniort-cyber/radar-fiscal-backend/blob/1a6419d0d23e9815de90463731e14157e8fc09cf/test/sped.govbr.unit.test.ts#L171).

Blobs conferidos: connector c0a8e7d68d22c4c69d3d5f7c0432e23e810c899b; parser c615110b9ad921a02d8deca5960cc696b6ad5b02; normalizer b072ebc6be4e1c8eb2122b73d1735e022fa49ab5; teste8d7afc7e6796081f9f8965a3567701bef90ae25b.

Nenhum requisito descartado nem limitação funcional aceita como solução. A observação do limite textual é evidência do AS IS para o inventário, não autorização de correção ou aceitação de perda. Sem merge,deploy,migration,backfill,reprocessamento ou operação produtiva.
