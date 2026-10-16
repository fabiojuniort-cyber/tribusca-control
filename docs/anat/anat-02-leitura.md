# ANAT-02 — leitura produtiva e sanitização

**Origem:** CLAUDE-COORD. **Executor:** GPT-EXEC. Preparação em 15/10/2026 (BRT), complementada pelo resultado de SELECT executado manualmente pelo Fábio no Railway Dashboard e devolvido neste chat. Escopo R1 somente leitura; atualização documental R0. O executor não acessou o banco diretamente. Sem workflow, coleta, refresh, migration, escrita no banco, merge, deploy ou alteração Railway.

## Resultado e limite

**HTML persistido: comparação concluída por evidência de execução humana.** Fábio executou a consulta de confirmação no Railway Dashboard e devolveu as duas linhas com `IGUAL AO SNAPSHOT SANITIZADO`. A consulta compara SHA-256 dos bytes UTF-8 do HTML armazenado com os hashes da reprodução local abaixo. A igualdade confirma o mesmo HTML e, por consequência, as mesmas classes e contagens. Não houve contagem SQL independente das classes nem exportação dos corpos nesta etapa. Não é evidência de vigência jurídica nem auditoria independente de `content_text`.

O arquivo `anat-02-sql.sql` permanece como diagnóstico ampliado, preparado com transação REPEATABLE READ READ ONLY, timeout e ROLLBACK. Esse arquivo completo não foi executado. Para a confirmação humana foi usada a consulta menor [anat-02-dashboard-confirmacao.sql](anat-02-dashboard-confirmacao.sql), apenas SELECT, restrita aos dois IDs. Não consulta empresas/tenants, não solicita secrets e não utiliza Railway AI Agent. O retorno está em [anat-02-dashboard-resultado.json](anat-02-dashboard-resultado.json).

### Retorno do Fábio no Dashboard

| Convênio | Versão persistida | Nº | Atual | Captura, como retornada | Formato | Bytes HTML | Comparação SHA-256 |
|---|---|---:|---|---|---|---:|---|
| 100/97 | `8f1a2386-30fc-4f11-a88a-e96a65807793` | 1 | true | 2026-10-03 03:18:40 | SANITIZED_HTML | 45548 | IGUAL AO SNAPSHOT SANITIZADO |
| 52/91 | `ec18e755-128c-41ca-8cd3-2bdad7d9d9eb` | 1 | true | 2026-10-05 12:08:03 | SANITIZED_HTML | 394092 | IGUAL AO SNAPSHOT SANITIZADO |

As datas de captura foram transcritas sem atribuir timezone que não apareceu no resultado. O SELECT não filtrava `is_current`: retornou uma versão visível por ato. Não houve diagnóstico separado de grants/RLS nem comprovação de ausência de versões fora da visibilidade da conexão. A evidência é o resultado fornecido pelo Fábio, não uma conexão direta do executor.

Assim, o HTML persistido do 52/91 conserva as 13 classes legais e seis classes de tabelas verdes enumeradas abaixo; as classes comuns de tabela/subtítulo enumeradas como removidas não estão nele. O HTML do 100/97 conserva as 13 classes legais e remove `internal-link`. As tabelas abaixo, originalmente obtidas na reprodução local, descrevem também o HTML persistido correspondente por igualdade exata de hash.

## Runner verificado ao vivo

- Backend `main` observado em `ef292f1792f46f93269b2b01efdfcbc4791f5969`: árvore recursiva não possui `.github/workflows/ops-runner.yml`; leitura direta retornou 404.
- A issue [OPS-01 #109](https://github.com/fabiojuniort-cyber/tribusca-control/issues/109) descreve o plano histórico; comentários estavam vazios. Ela não comprova capacidade atual.
- O workflow efetivo [ops02-runner.yml](https://github.com/fabiojuniort-cyber/tribusca-control/blob/2ac84148bac91e4d3e5f6e10b5aeb1f2c4f3de38/.github/workflows/ops02-runner.yml) admite somente `inspect_f3_offline`, `inspect_f2_xlsx` e `simulate_f3_production_readonly`; backend pinado em `ce553f92b883ba2b69731e28726c4ba40cbf1514`. Não oferece entrada SQL arbitrária/ANAT.
- Não reutilizar runner F2, não expandir allowlist e não disparar simulação F3 para contornar escopo. A indisponibilidade é específica para ANAT, sem alegar que todo o runner está inativo.
- Governança lida: AGENTS dos repositórios, SECURITY e [Protocolo Operacional v2](https://github.com/fabiojuniort-cyber/tribusca-control/blob/2ac84148bac91e4d3e5f6e10b5aeb1f2c4f3de38/docs/protocolos/PROTOCOLO_OPERACIONAL_V2_20261014.md).

## Onde o conteúdo está

`publications` fornece identidade/título/URL; `publication_versions` fornece `content_text`, `content_hash`, `version_no`, `is_current`, `captured_at` e `source_metadata`. O HTML fica em `source_metadata.presentation.html`; o formato em `source_metadata.presentation.format`. Não existe coluna `content_html` neste contrato.

O normalizador sanitiza `presentationHtml` e grava `SANITIZED_HTML`. O hash canônico de versão inclui título, texto normalizado, vigência inicial e hashes de arquivos conforme sua política; **não é o SHA do HTML**. A apresentação pode ter sido enriquecida sem criar nova versão (`presentationUpgrade` / `--refresh-presentation`), portanto igualdade de `content_hash` não prova igualdade de HTML. O importador foi apenas lido, nunca executado.

## Reprodução estática

Entrada: `ops/confaz/acts/CV052_91.html` e `CV100_97.html` no backend main `ef292f1792f46f93269b2b01efdfcbc4791f5969`. `extractActBodyHtml` delimita `parent-fieldname-text`; o script reproduz esse recorte e executa a função real `sanitizeLegalPresentationHtml` do mesmo SHA, usando htmlparser2 local. As contagens são de elementos com classe; um elemento pode ter mais de uma classe. Não são contagens de dispositivos jurídicos.

As 13 classes legais explicitamente permitidas sobrevivem quando presentes: `TituloAcordo`, `AcordoTipo`, `Ementa`, `DataPublicao`, `A2DataPublicacao`, `TextoAcordo`, `A5-1TextoAcordo`, `RedaoAnt`, `A8-3RedacaoAnt`, `Remisso`, `A8-1Remissao`, `RemissoAnt`, `A8-2RemissaoAnt`. Sobrevivem também classes que satisfazem `^(?:A\d+-\d+)?Tabela[A-Za-z]*verde$`. Classes genéricas de subtítulo/tabela não estão na allowlist; `style`, `id`, `data-*` e links relativos não são preservados. Isso é comportamento do código lido, não conclusão jurídica.

### CV052_91

| Campo | Valor |
|---|---|
| SHA-256 snapshot completo | `8ed4895e05655e674b1bdcca300a573a0cc3e2994f1a03709fc16692c8b5a9f3` |
| SHA-256 corpo recortado | `2b471811a5f00bd50d8b5a14a9310c420e1c063a01939106988528f3155d6dfe` |
| SHA-256 HTML sanitizado local | `bd035220215bf691ce6dd1c6f8c9d8b8e8c3180f9df43f97f0debd3a3ac1dd83` |
| Bytes corpo / HTML sanitizado | 469860 / 394092 |

| Classe no corpo original | Original | Após sanitização local |
|---|---:|---:|
| `TituloAcordo` | 1 | 1 |
| `DataPublicao` | 35 | 35 |
| `internal-link` | 86 | 0 |
| `A2DataPublicacao` | 8 | 8 |
| `Ementa` | 2 | 2 |
| `TextoAcordo` | 17 | 17 |
| `AcordoTipo` | 1 | 1 |
| `Remisso` | 33 | 33 |
| `RemissoAnt` | 68 | 68 |
| `RedaoAnt` | 35 | 35 |
| `A8-1Remissao` | 16 | 16 |
| `A5-1TextoAcordo` | 4 | 4 |
| `A8-2RemissaoAnt` | 19 | 19 |
| `A8-3RedacaoAnt` | 5 | 5 |
| `Subtitulo` | 3 | 0 |
| `plain` | 6 | 0 |
| `TabelaSubtitulo` | 994 | 0 |
| `Tabelajustificado` | 555 | 0 |
| `TabelaSubtituloverde` | 1156 | 1156 |
| `Tabelajustificadoverde` | 626 | 626 |
| `Tabelaesquerdaverde` | 748 | 748 |
| `A6-1Subtitulo` | 3 | 0 |
| `A7-1TabelaSubtitulo` | 181 | 0 |
| `A7-2Tabelajustificado` | 107 | 0 |
| `A9-1TabelaSubtituloverde` | 11 | 11 |
| `A9-2Tabelajustificadoverde` | 26 | 26 |
| `A9-3Tabelaesquerdaverde` | 3 | 3 |
| `A7-3Tabelaesquerda` | 1 | 0 |
| `Tabelaesquerda` | 1 | 0 |

Classes removidas: `internal-link`, `Subtitulo`, `plain`, `TabelaSubtitulo`, `Tabelajustificado`, `A6-1Subtitulo`, `A7-1TabelaSubtitulo`, `A7-2Tabelajustificado`, `A7-3Tabelaesquerda`, `Tabelaesquerda`.

### CV100_97

| Campo | Valor |
|---|---|
| SHA-256 snapshot completo | `07ac5eefcf0afb119f043bad0dfde217945301150f135fbcdbb7fbd7bbf0c679` |
| SHA-256 corpo recortado | `e121f23404e399ae24c3cd9fb51c149e6dc023a7d4fb4a4f7bf7ed90c4c82b5f` |
| SHA-256 HTML sanitizado local | `fe90af8fb89645b2bf40e8e3f8f6cd2cb4c6c15ef044ce58f1683482de5999f7` |
| Bytes corpo / HTML sanitizado | 47873 / 45548 |

| Classe no corpo original | Original | Após sanitização local |
|---|---:|---:|
| `TituloAcordo` | 1 | 1 |
| `DataPublicao` | 32 | 32 |
| `internal-link` | 65 | 0 |
| `A2DataPublicacao` | 7 | 7 |
| `Ementa` | 1 | 1 |
| `TextoAcordo` | 54 | 54 |
| `AcordoTipo` | 1 | 1 |
| `A8-1Remissao` | 9 | 9 |
| `A5-1TextoAcordo` | 17 | 17 |
| `A8-2RemissaoAnt` | 6 | 6 |
| `A8-3RedacaoAnt` | 12 | 12 |
| `Remisso` | 22 | 22 |
| `RemissoAnt` | 25 | 25 |
| `RedaoAnt` | 30 | 30 |

Classes removidas: `internal-link`.

## Consequências para Anatomia

No 52/91, a execução local preservou 6 tabelas, 2.088 linhas e 4.682 células; removeu classes de tabela sem `verde` e subtítulos. Os estilos de redação histórica em tabela permaneceram no snapshot simulado. No 100/97, não havia tabela no corpo recortado; as 13 classes legais sobreviveram, e `internal-link` foi removida. Conteúdo textual e organização de parágrafos persistem na reprodução, mas ausência de classe não autoriza reconstrução sem evidência.

`currentWordingText` exclui classes históricas e, em tabela, a linha que as contém. Isso não comprova situação jurídica positiva, prorrogação ou alcance de anexos. Uma classe verde é pista editorial; seu alcance e fundamento dependem da anotação e dos atos posteriores. Não usar esta reprodução para alimentar taxonomia de trechos ainda pendentes.

## Fechamento da comparação do HTML persistido

A pendência de igualdade do HTML/classes foi resolvida pelo SELECT humano e registrada na issue ANAT #116. Não é necessário exportar novamente o HTML para repetir a comparação já conclusiva por SHA-256. Se uma versão ou apresentação mudar, a evidência deste checkpoint não se estende automaticamente à nova representação.

O diagnóstico ampliado continua disponível para divergências futuras, incluindo classes, `content_text`, visibilidade e fatias paginadas. Não foi apresentado como integralmente executado. A conferência jurídica por trecho, dependências e condições da ANAT-03 permanece pendente do Fábio. Nenhum resultado de igualdade de HTML é veredito de vigência.
