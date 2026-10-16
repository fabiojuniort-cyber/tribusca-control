# ANAT-02 — 30 fichas de expectativas para revisão humana

Origem da frente: CLAUDE-COORD → GPT-EXEC. Documento R0 de preparação da ANAT-02, elaborado em 15/10/2026 (America/Sao_Paulo). Base escolhida pelo Fábio: desenho existente do repositório, atribuído por ele ao GPT 6 Astra; não depende de anexo substitutivo.

Base documental consultada ao vivo: [docs/anat-desenho.md](https://github.com/fabiojuniort-cyber/tribusca-control/blob/docs/anat-00-anatomia-do-ato/docs/anat-desenho.md), blob `3d94e8bec9857165b0bee734a86d970a4848c4ce`, §§7.1–7.5. As informações de corpos e hashes abaixo são transcritas do desenho; esta elaboração não refez GETs oficiais, leitura integral dos 30 corpos, consulta ao banco ou execução de parser. Não constitui anotação completa de spans nem relatório de precisão/recall.

## Como revisar

Cada ficha conserva a identificação da matriz §7.2 e torna explícitos os caminhos estruturais a conferir. Os caminhos abaixo são expectativas lógicas, não seletores DOM nem IDs de partes já produzidos. Exemplos de citação/NCM/percentual e falsos positivos são afirmações do contrato de referência, não achados de execução nesta ANAT-02.

Vigência em todas as fichas: **pendente de conferência**, data de referência proposta de 15/10/2026, ainda sujeita à aprovação do recorte pelo Fábio; a elaboração da ficha não comprova situação jurídica nessa data. Não há trecho aprovado para taxonomia corrente por esta entrega. Ausência de NCM enumerado na matriz não significa prova de ausência em corpo ainda não anotado. Citações são reconhecíveis sem resolver links internos (F1). Faixas e exceções só serão anotadas onde efetivamente presentes: não foram inventadas para completar campos.

Para fechar cada ficha, o revisor deve registrar: representação/hash efetivamente conferidos; texto canônico e método de offsets; todos os intervalos [início,fim); pai e tipo de parte; célula/linha e descrição literal; citação e alvo; candidato NCM/negação/contexto; faixa/limites e exceção/alvo; cobertura/lacunas; evidência jurídica, data de referência e intervalo de validade. Aprovação visual dos convênios cabe ao Fábio; spans exaustivos continuam requisito próprio de benchmark.

Reservadas para avaliação final sem ajuste de regras sobre resultados: 04, 06, 08, 09, 12, 14, 16, 18, 24 e 28. Este documento não executa regras nem usa resultados para ajustá-las.

## Ficha 01 — Convênio ICMS 52/91 — `ops/confaz/acts/CV052_91.html`; Acervo `07d24640-61a0-45db-8f69-3b064320b2b2`

- **Fonte e representação:** CONFAZ, snapshot versionado no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; não prova conteúdo persistido nem vigência atual.
- **Partes esperadas (§7.2):** Epígrafe, ementa, preâmbulo, cláusulas 1ª–6ª, fecho, notas e seis tabelas em múltiplas redações dos anexos I/II.
- **Caminhos a conferir:** ato → cláusulas primeira a sexta; ato → anexo I/II → redação → tabela → linha → célula ITEM/NCM/descrição. A abrangência histórica deve acompanhar a subárvore inteira, mesmo se a célula perder classe.
- **Citações, entidades e controles negativos (§7.2):** Citações 89/09, 154/15; candidatos `7307.19.20`, `8417.8020`, `8201.10.00` em suas células; ambas as ocorrências históricas `8450.11.00` excluídas da elegibilidade corrente; ano 1992 não é fim atual inferido.
- **Associação NCM/célula/descrição:** Preservar a linha, a coluna NCM e a descrição literal correspondente a cada candidato; as descrições e coordenadas não foram transcritas na matriz e permanecem pendentes de anotação integral. ITEM não é NCM. As duas ocorrências históricas de `8450.11.00` devem permanecer históricas e fora da elegibilidade corrente.
- **Faixas/exceções:** Alcance de redação/anexo, condições e exceções devem ser conferidos integralmente. A matriz não individualiza faixas NCM; não presumir ausência nem fabricar limites.
- **Limitações e teste crítico de revisão:** Seis tabelas em múltiplas redações: registrar redação e associação literal por célula antes de decidir elegibilidade. Os três candidatos não recebem aprovação jurídica nesta ficha. Não converter 1992 em prazo atual nem ignorar prorrogações.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 02 — Convênio ICMS 100/97 — `ops/confaz/acts/CV100_97.html`; Acervo `4c92f7ce-2e3d-4a61-9524-d4beca0c2af7`

- **Fonte e representação:** CONFAZ, snapshot versionado no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; não prova conteúdo persistido nem vigência atual.
- **Partes esperadas (§7.2):** Epígrafe, ementa, notas editoriais, cláusulas com versões, incisos/alíneas/parágrafos; sem tabela HTML neste arquivo.
- **Caminhos a conferir:** ato → cláusula → redação → inciso/alínea/parágrafo; ato → nota editorial → alvo, quando inequívoco. Não há tabela no snapshot.
- **Citações, entidades e controles negativos (§7.2):** Citações Conv. 99/04, 26/21 e Ato COTEPE 17/97; 60%, 30%, 4% em contextos diferentes; produtos textuais inseticidas/fungicidas/fertilizantes/sementes somente nos trechos aprovados; nota não gera tag.
- **Associação NCM/célula/descrição:** A descrição textual de produto independe de NCM. Não fabricar código; vincular inseticidas/fungicidas/fertilizantes/sementes ao trecho literal e sua redação, com consumo corrente pendente de aprovação.
- **Faixas/exceções:** Alcance de redação/anexo, condições e exceções devem ser conferidos integralmente. A matriz não individualiza faixas NCM; não presumir ausência nem fabricar limites.
- **Limitações e teste crítico de revisão:** Percentuais têm naturezas diferentes: preservar contexto/condição, sem somá-los nem associá-los a todos os produtos. Redações alternativas não geram classificação corrente.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 03 — DOU Retificação MDHC — matéria `24377394`, arquivo `515_20260918_24377394.xml`

- **Fonte e representação:** DOU, XML no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; SHA-256/ZIP no manifesto §7.3.
- **Partes esperadas (§7.2):** Epígrafe, retificação com “onde se lê/leia-se”, sem artigos próprios.
- **Caminhos a conferir:** ato → retificação → par onde se lê/leia-se; citação da Portaria é alvo externo, não articulação própria.
- **Citações, entidades e controles negativos (§7.2):** Portaria 340/2026; processo `2003.01.26732`; referência DOU 26/08/2026; não reconhecer fragmentos do processo como NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Preservar diferença entre versão corrigida e texto-alvo; não consolidar automaticamente.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 04 — SC Disit 2.004, 17/08/2026 — `24382389`, `515_20260918_24382389.xml`

- **Fonte e representação:** DOU, XML no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; SHA-256/ZIP no manifesto §7.3.
- **Partes esperadas (§7.2):** Epígrafe, dois assuntos, texto interpretativo, dispositivos legais, assinatura; sem criar artigos com base nos citados.
- **Caminhos a conferir:** ato → assunto/ementa (duas unidades) → texto interpretativo → dispositivos legais; ato → assinatura.
- **Citações, entidades e controles negativos (§7.2):** LC 214/2025 arts. 537/540, Lei 9.718/1998 art. 5º e SC Cosit 252/2025; 0%; datas de efeitos citadas não são vigência automática de toda a SC.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Assuntos, citações e efeitos não comprovam vigência de todo o documento; amostra reservada à avaliação final.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 05 — ADE Coana 119/2026 — `24382400`, `515_20260918_24382400.xml`

- **Fonte e representação:** DOU, XML no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; SHA-256/ZIP no manifesto §7.3.
- **Partes esperadas (§7.2):** Epígrafe, ementa, preâmbulo, arts. 1º–3º, assinatura; art. 3º com início de vigência.
- **Caminhos a conferir:** ato → art. 1º/2º/3º; art. 3º → função início de vigência; assinatura.
- **Citações, entidades e controles negativos (§7.2):** IN RFB 2.318/2026 art. 22, Portaria Coana 189/2026, CNPJ empresarial e requerimento OEA; zero NCM esperado.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Não copiar CNPJ/nomes para relatório público; conferir início de vigência sem presumir publicação.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 06 — ADE Coana 120/2026 — `24382401`, `515_20260918_24382401.xml`

- **Fonte e representação:** DOU, XML no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; SHA-256/ZIP no manifesto §7.3.
- **Partes esperadas (§7.2):** Mesma família, arts. 1º–3º, sem confundir com o ADE 119 da mesma página.
- **Caminhos a conferir:** ato → art. 1º/2º/3º; identidade separada da amostra 05; assinatura.
- **Citações, entidades e controles negativos (§7.2):** IN 2.318/2026, Portaria Coana 189/2026; CNPJ com zero inicial preservado e requerimento distinto; zero NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Zero inicial do CNPJ preservado apenas na amostra controlada; amostra reservada à avaliação final.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 07 — Despacho MF — processo `17944.003839/2025-17`, matéria `24382325`, `600_20260918_24382325.xml`

- **Fonte e representação:** DOU, XML no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; SHA-256/ZIP no manifesto §7.3.
- **Partes esperadas (§7.2):** Cabeçalho, processo/interessado/assunto, decisão e assinatura, sem artigos próprios.
- **Caminhos a conferir:** ato → processo/interessado/assunto → decisão; ato → assinatura; referências ficam sob o bloco que as contém.
- **Citações, entidades e controles negativos (§7.2):** US$ 67 milhões e 33,5 milhões; LC 101/2000 art. 40, Res. Senado 48/2007 e 26/2026; moeda/processo protegidos contra NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Moeda, processo e artigos citados não viram NCM; não copiar interessado.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 08 — Despacho MF — processo `17944.003906/2025-95`, matéria `24382380`, `600_20260918_24382380.xml`

- **Fonte e representação:** DOU, XML no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; SHA-256/ZIP no manifesto §7.3.
- **Partes esperadas (§7.2):** Corpo não articulado, autorização e assinatura.
- **Caminhos a conferir:** ato → corpo não articulado → autorização; ato → assinatura; processo indivisível.
- **Citações, entidades e controles negativos (§7.2):** US$ 1 bilhão; processo como unidade; referências jurídicas completas; não fundir com outro despacho da mesma data/página.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Identidade da matéria não pode ser substituída por data/página comum; amostra reservada à avaliação final.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 09 — Despacho MF — processo `17944.004579/2026-70`, matéria `24382412`, `600_20260918_24382412.xml`

- **Fonte e representação:** DOU, XML no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; SHA-256/ZIP no manifesto §7.3.
- **Partes esperadas (§7.2):** Processo, interessado, assunto, autorização e assinatura.
- **Caminhos a conferir:** ato → processo/interessado/assunto → autorização; ato → assinatura.
- **Citações, entidades e controles negativos (§7.2):** MP 1.373/2026 art. 14; R$ 200 milhões; Fies; zero NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Fies é contexto temático, não produto nem NCM; amostra reservada à avaliação final.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 10 — Portaria SAES/MS 4.940/2026 — `24378456`, arquivos `602_20260918_24378456-1.xml` a `-3.xml`

- **Fonte e representação:** DOU, XML no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; SHA-256/ZIP no manifesto §7.3.
- **Partes esperadas (§7.2):** Uma matéria, arts. 1º–8º, anexos I–III, cinco tabelas distribuídas nas três partes; continuação não reinicia ato.
- **Caminhos a conferir:** ato único → arts. 1º a 8º e anexos I a III → cinco tabelas. As três partes XML são representações sequenciais da mesma matéria.
- **Citações, entidades e controles negativos (§7.2):** Decreto 11.798/2023 art. 68, códigos SUS/CBO/CID e valores; `09.09.01.005-6`, `2251-09`, `0009` não são NCM; separar vigência de efeitos operacionais do art. 8º.
- **Associação NCM/célula/descrição:** Tabelas conservam códigos de saúde e suas descrições/valores como domínios próprios. Não convertê-los em NCM.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Falta de uma parte implica cobertura parcial. Separar códigos SUS/CBO/CID e valores de NCM. Art. 8º pode distinguir vigência e efeitos.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 11 — IN RFB 2.342/2026 — `24380292`, `602_20260918_24380292.xml`

- **Fonte e representação:** DOU, XML no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; SHA-256/ZIP no manifesto §7.3.
- **Partes esperadas (§7.2):** Epígrafe/ementa/preâmbulo, arts. 1º–6º próprios e blocos de nova redação com artigos citados dentro de aspas.
- **Caminhos a conferir:** ato → arts. 1º a 6º; artigo alterador → texto transcrito → dispositivos do ato-alvo, inclusive arts. 143-A a 143-L.
- **Citações, entidades e controles negativos (§7.2):** IN 2.228/2024, Lei 15.079/2024, Portaria ME 284/2020; arts. 143-A a 143-L citados não são renumeração dos seis artigos próprios.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Preservar aspas e vínculo da nova redação; não duplicar epígrafes/dispositivos nem promover texto transcrito a ato independente.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 12 — Portaria GM/MS 12.157/2026 — `24359694`, `603_20260918_24359694.xml`

- **Fonte e representação:** DOU, XML no backend `fb880354fbbbc90f681290e57dc905bde9ce9c08`; SHA-256/ZIP no manifesto §7.3.
- **Partes esperadas (§7.2):** Cinco capítulos, arts. 1º–21, parágrafos/incisos, assinatura; art. 21 contém vigência.
- **Caminhos a conferir:** ato → cinco capítulos → arts. 1º a 21 → parágrafos/incisos; art. 21 → função início de vigência.
- **Citações, entidades e controles negativos (§7.2):** CF art. 87, Decreto 11.798/2023; II de enumeração não vira tributo; zero NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** II é numeral de enumeração. Amostra reservada à avaliação final.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 13 — DOE-SP Decreto 70.843/2026 — `b768399b-6638-460d-bce0-08df049590c6`

- **Fonte e representação:** DOE-SP, API de publicação identificada acima; hash da resposta da leitura original consta no quadro ao fim.
- **Partes esperadas (§7.2):** Ementa, preâmbulo, arts. 1º–7º, incisos; art. 6º, II, alíneas a/b; três assinaturas.
- **Caminhos a conferir:** ato → arts. 1º a 7º; art. 6º → inciso II → alíneas a/b; art. 7º → função revogação → atos-alvo; três assinaturas.
- **Citações, entidades e controles negativos (§7.2):** DL 233/1970 arts. 6º/13/14; Decretos 67.483/2023 e 67.559/2023 como alvos expressos de revogação no art. 7º; não revogar o ato emissor.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Revogação do art. 7º aponta aos decretos citados; não atribuir revogação ao emissor.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 14 — DOE-SP Decreto sem número de 03/09/2026 — `1445d0d3-e469-4d7f-ed0b-08df081b20d4`

- **Fonte e representação:** DOE-SP, API de publicação identificada acima; hash da resposta da leitura original consta no quadro ao fim.
- **Partes esperadas (§7.2):** Autoridade, fundamentos, designação e assinatura; não inventar artigos/número de decreto.
- **Caminhos a conferir:** ato sem numeração → autoridade/fundamentos → designação; ato → assinatura. Não fabricar caminho de artigo.
- **Citações, entidades e controles negativos (§7.2):** Leis 185/1973 e 15.050/2013, processo SEI e identificador pessoal protegido; prazo de mandato não é NCM nem vigência global.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Dados pessoais devem ser suprimidos no relatório. Prazo do mandato é específico. Amostra reservada à avaliação final.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 15 — DOE-SP Despacho do Governador de 03/09/2026 — `a2e9bf6e-6d2f-430e-23cc-08df09ae1af9`

- **Fonte e representação:** DOE-SP, API de publicação identificada acima; hash da resposta da leitura original consta no quadro ao fim.
- **Partes esperadas (§7.2):** Processo/interessado/assunto, decisão, assinatura.
- **Caminhos a conferir:** ato → processo/interessado/assunto → decisão; citação externa → Anexo III → item 11 sem incorporá-lo à árvore própria.
- **Citações, entidades e controles negativos (§7.2):** Lei 17.293/2020 art. 10, II e Anexo III item 11; Lei federal 14.133/2021; matrícula imobiliária e SGI não são NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Matrícula e SGI são identificadores protegidos; referência a anexo não significa presença do anexo no corpo.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 16 — DOE-SP Pauta da 35ª Sessão PGE, biênio 2025/2026 — `b8fb1bba-1e31-407d-ab7f-08df0495b84e`

- **Fonte e representação:** DOE-SP, API de publicação identificada acima; hash da resposta da leitura original consta no quadro ao fim.
- **Partes esperadas (§7.2):** Cabeçalho, data/hora, instruções, ordem do dia e itens; sem articulação normativa inventada.
- **Caminhos a conferir:** matéria → cabeçalho/data-hora/instruções → ordem do dia → itens I a VII. Não chamar itens de pauta de incisos normativos.
- **Citações, entidades e controles negativos (§7.2):** Dois processos SEI, e-mail institucional, Decreto 62.218/2016 art. 3º; numerais I–VII são itens de pauta; zero NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Processos e e-mail não são entidades NCM; dados pessoais omitidos. Amostra reservada à avaliação final.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 17 — DOE-SP Resolução Seduc 86/2026 — `9716c5c2-7f22-46eb-a80d-08df0495b6f6`

- **Fonte e representação:** DOE-SP, API de publicação identificada acima; hash da resposta da leitura original consta no quadro ao fim.
- **Partes esperadas (§7.2):** Ementa, preâmbulo, capítulos, arts. 1º–35; resíduos Word fora do conteúdo jurídico.
- **Caminhos a conferir:** ato → capítulos → arts. 1º a 35; art. 34 → revogação com ressalva ao art. 30; art. 35 → vigência.
- **Citações, entidades e controles negativos (§7.2):** Lei 11.947/2009, Decreto 70.655/2026; art. 34 revoga Res. SE 63/2016 com ressalva do art. 30; art. 35 vigência. Não aplicar revogação sem ressalva.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Conferir ressalva do art. 30 ao alcance revogatório do art. 34, mantendo vínculo explícito. Nenhuma faixa NCM foi individualizada para esta ficha no desenho.
- **Limitações e teste crítico de revisão:** Resíduos Word devem ter regra e origem, sem eliminar texto jurídico. Ressalva do art. 30 limita a função de revogação.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 18 — DOE-SP Portaria URE 66/2026 — `91174000-076a-4029-bc7f-08df049590c6`

- **Fonte e representação:** DOE-SP, API de publicação identificada acima; hash da resposta da leitura original consta no quadro ao fim.
- **Partes esperadas (§7.2):** Preâmbulo, arts. 1º–5º; sem ementa oficial fabricada.
- **Caminhos a conferir:** ato → preâmbulo → arts. 1º a 5º; ementa oficial ausente permanece ausente.
- **Citações, entidades e controles negativos (§7.2):** Decreto 69.665/2025, Lei 9.394/1996, CNPJ, dois CEPs e processo; `01103-201` e código CIE não viram NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** CEPs/CNPJ/CIE não são NCM; não fabricar ementa. Amostra reservada à avaliação final.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 19 — DOE-SP Cassação de IE — `ffe36bfd-ee7d-487b-d449-08df09ac2b13`

- **Fonte e representação:** DOE-SP, API de publicação identificada acima; hash da resposta da leitura original consta no quadro ao fim.
- **Partes esperadas (§7.2):** Cabeçalho do posto, notificação, bloco cadastral; corpo não articulado.
- **Caminhos a conferir:** matéria → cabeçalho do posto → notificação → bloco cadastral; referências a arts. 11 a 13 são externas.
- **Citações, entidades e controles negativos (§7.2):** Portaria CAT 95/2006 arts. 11–13, CNAE `46.39-7/01`, CEP `04.121-002`, IE, CNPJ e OSF; prazo de 30 dias; zero NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** IE/CNAE/CEP/CNPJ/OSF identificam cadastro e não mercadorias; prazo de 30 dias não comprova vigência global.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 20 — DOE-SP Portaria SRE 43/2026 — `70413500-3dd4-4b9b-a88a-08df0495b6f6`

- **Fonte e representação:** DOE-SP, API de publicação identificada acima; hash da resposta da leitura original consta no quadro ao fim.
- **Partes esperadas (§7.2):** Ementa/preâmbulo, arts. 1º–2º, tabela citada de duas colunas dentro da alteração.
- **Caminhos a conferir:** ato → arts. 1º e 2º; artigo alterador → trecho transcrito → tabela de duas colunas.
- **Citações, entidades e controles negativos (§7.2):** Portaria CAT 125/11 e Res. SFP 43/20 art. 7º; `630-0` é código de receita; cabeçalho “CÓDIGO” não autoriza NCM.
- **Associação NCM/célula/descrição:** Associar `630-0` à coluna de código de receita e sua descrição, sem candidato NCM pela mera palavra CÓDIGO.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Tabela tem código de receita, não NCM; manter duas colunas e contexto da alteração.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 21 — DOE-SP Comunicado Dicar 59/2026 — `d7eb71ec-9daf-4804-7eae-08df0817934e`

- **Fonte e representação:** DOE-SP, API de publicação identificada acima; hash da resposta da leitura original consta no quadro ao fim.
- **Partes esperadas (§7.2):** Ementa/corpo e referência a anexo PDF; não há tabela embutida no HTML lido.
- **Caminhos a conferir:** ato → ementa/corpo → referência a anexo PDF; não criar linhas/células no HTML sem elas.
- **Citações, entidades e controles negativos (§7.2):** Lei 10.175/1998 art. 1º; data-limite 30/09/2026; registrar anexo presente como arquivo, conteúdo tabular pendente até leitura do PDF.
- **Associação NCM/célula/descrição:** Não disponível no HTML lido segundo o desenho; células/descrições do PDF ainda pendentes.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Conteúdo tabular do PDF permanece pendente; prazo do comunicado não é vigência de cada item ausente.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 22 — DOE-SP Retificação do DOESP 26/08/2026 — `a1f3e33f-e962-4ae9-ed58-08df04981eb4`

- **Fonte e representação:** DOE-SP, API de publicação identificada acima; hash da resposta da leitura original consta no quadro ao fim.
- **Partes esperadas (§7.2):** Retificação, título espaçado “A N E X O I”, uma tabela com cabeçalho composto.
- **Caminhos a conferir:** matéria → retificação → Anexo I → tabela → cabeçalho composto/linhas/células; não criar artigo próprio.
- **Citações, entidades e controles negativos (§7.2):** Decreto 70.818/2026, Anexo I; identificadores de pessoal protegidos; texto novo não vira artigo próprio nem consolidação automática.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Título espaçado continua anexo; identificadores pessoais omitidos; não reconstruir consolidação.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 23 — RFB ADE Corat 79/2026 — idAto `153836`; Acervo `b12a440e-a51a-46f6-bfd0-64e99973dd7a`

- **Fonte e representação:** RFB, API por idAto/visao/original; hash da resposta original consta no quadro ao fim. A URL solicitada não garante visão jurídica vigente.
- **Partes esperadas (§7.2):** Ementa/preâmbulo, arts. 1º–3º, assinatura; tabelas em anexos HTML 86703/86704.
- **Caminhos a conferir:** ato → arts. 1º a 3º; arts. 1º/2º → anexos HTML 86703/86704 → tabelas; assinatura.
- **Citações, entidades e controles negativos (§7.2):** ADEs Corat 63/2026 e 78/2026, Res. CGSN 194/2026 e 140/2018; exclusão/inclusão de disposição; números 30/15 em prazo de agenda não são NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Não omitir tabelas em arquivoBinario/anexos. Dias de agenda não são NCM; visão /original pode declarar conjunta.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 24 — RFB SC Cosit 188/2026 — `153828`; Acervo `c1d34508-127b-44f7-acba-ef9855a6b635`

- **Fonte e representação:** RFB, API por idAto/visao/original; hash da resposta original consta no quadro ao fim. A URL solicitada não garante visão jurídica vigente.
- **Partes esperadas (§7.2):** Dois assuntos/ementas, dispositivos legais, assinatura e PDF 86695.
- **Caminhos a conferir:** ato → dois assuntos/ementas → dispositivos legais → assinatura; PDF 86695 como representação complementar ainda não anotada.
- **Citações, entidades e controles negativos (§7.2):** Leis 4.090/1962, 5.172/1966 art. 111, 7.713/1988, 8.134/1990, Decretos 70.235/1972 e 7.574/2011, IN 2.058/2021; não confundir art. citado com corpo próprio.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Inteiro teor PDF não lido nesta entrega; cobertura do corpo API é parcial. Amostra reservada à avaliação final.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 25 — RFB SC Cosit 193/2026 — `153829`; Acervo `a1adee50-e233-4790-9ac0-561529ae08d7`

- **Fonte e representação:** RFB, API por idAto/visao/original; hash da resposta original consta no quadro ao fim. A URL solicitada não garante visão jurídica vigente.
- **Partes esperadas (§7.2):** Dois assuntos/ementas, fundamentos citados, assinatura e PDF 86696.
- **Caminhos a conferir:** ato → dois assuntos/ementas → fundamentos citados → assinatura; PDF 86696 separado.
- **Citações, entidades e controles negativos (§7.2):** Lei 11.196/2005 arts. 17/18 §2º; Decreto 5.798/2006; INs 1.187/2011 e 2.058/2021; inovação citada na ementa não autoriza classificação de texto vigente sem inteiro teor.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Tema de inovação na ementa é referência histórica; inteiro teor PDF pendente impede aprovação de consumo corrente.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 26 — RFB SC Cosit 187/2026 — `153819`; Acervo `d533b82e-7df1-4a1a-a171-cb8e8e00cb1e`

- **Fonte e representação:** RFB, API por idAto/visao/original; hash da resposta original consta no quadro ao fim. A URL solicitada não garante visão jurídica vigente.
- **Partes esperadas (§7.2):** Assunto/ementa, dispositivos, assinatura e PDF 86693.
- **Caminhos a conferir:** ato → assunto/ementa → dispositivos → assinatura; PDF 86693 separado; Anexo Único item 29 é referência externa.
- **Citações, entidades e controles negativos (§7.2):** Leis 12.973/2014 e 14.789/2023; IN 2.198/2024, Anexo Único item 29; 1º/01/2024 é data referida, não vigência da SC.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Data referida não é data de vigência da SC; texto do PDF pendente.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 27 — RFB SC Cosit 189/2026 — `153820`; Acervo `aab9e05f-19ae-4663-a0a8-8982562955fe`

- **Fonte e representação:** RFB, API por idAto/visao/original; hash da resposta original consta no quadro ao fim. A URL solicitada não garante visão jurídica vigente.
- **Partes esperadas (§7.2):** Assuntos PIS/Cofins, referências e assinatura; PDF 86692.
- **Caminhos a conferir:** ato → assuntos PIS/Cofins → referências → assinatura; PDF 86692 separado. Relação de revogação tem como emissor a Lei 14.967/2024.
- **Citações, entidades e controles negativos (§7.2):** Lei 14.967/2024 relata revogação da Lei 7.102/1983; SD Cosit 1/2025; IN 2.121/2022 art. 123. A SC não é o ato revogador.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** SC relata revogação por outra lei; não atribuir à SC autoria desse evento. PDF pendente.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 28 — RFB SC Cosit 191/2026 — `153821`; Acervo `9a1e1e9c-5fac-4b40-b7f9-59a883f3c0ef`

- **Fonte e representação:** RFB, API por idAto/visao/original; hash da resposta original consta no quadro ao fim. A URL solicitada não garante visão jurídica vigente.
- **Partes esperadas (§7.2):** Assunto/ementa, dispositivos legais, assinatura e PDF 86691.
- **Caminhos a conferir:** ato → assunto/ementa → dispositivos legais → assinatura; PDF 86691 separado; dispositivos da Res. CGSN são citações.
- **Citações, entidades e controles negativos (§7.2):** Res. CGSN 140/2018 art. 26 §7º IV e art. 100 §5º; fator `0,01` é decimal sem símbolo de percentual; zero NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Fator decimal 0,01 não vira percentual sem sinal/contexto; PDF pendente. Amostra reservada à avaliação final.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 29 — RFB SC Cosit 192/2026 — `153822`; Acervo `9f4546ba-288e-431f-b573-c28208eac046`

- **Fonte e representação:** RFB, API por idAto/visao/original; hash da resposta original consta no quadro ao fim. A URL solicitada não garante visão jurídica vigente.
- **Partes esperadas (§7.2):** Assunto/ementa, referências, assinatura e PDF 86690.
- **Caminhos a conferir:** ato → assunto/ementa → referências → assinatura; PDF 86690 separado.
- **Citações, entidades e controles negativos (§7.2):** CTN/Lei 5.172/1966 art. 138; SCI Cosit 7/2024; Portarias RFB 1.936/2018 e 20/2021; IN 2.058/2021; todas as numerações protegidas.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Todas as numerações citadas ficam protegidas contra falso NCM; PDF pendente.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Ficha 30 — RFB Retificação da Portaria 725/2026 — `153743`; Acervo `0ee13c61-d0c4-462e-a8e8-c1a56315ada3`

- **Fonte e representação:** RFB, API por idAto/visao/original; hash da resposta original consta no quadro ao fim. A URL solicitada não garante visão jurídica vigente.
- **Partes esperadas (§7.2):** Marcador Retificação e três pares de correção: preâmbulo, artigo e assinatura.
- **Caminhos a conferir:** ato → retificação → três pares de correção (preâmbulo, artigo, assinatura); artigo citado não é artigo próprio novo.
- **Citações, entidades e controles negativos (§7.2):** Portaria RFB 725/2026 e referências ao art. 2º; preservar aspas incompletas e redação do original sem “consertar” a lei; nenhuma inferência NCM.
- **Associação NCM/célula/descrição:** Nenhuma associação positiva de NCM/célula/descrição é enumerada para esta amostra no §7.2. Não criar candidata pela aparência numérica; confirmar presença/ausência na futura anotação integral.
- **Faixas/exceções:** Faixa NCM/exceção de mercadoria não individualizada no §7.2; eventual presença depende da leitura integral. Não presumir faixa por prefixo comum.
- **Limitações e teste crítico de revisão:** Não reparar aspas incompletas ou redação original; conservar três pares e a natureza retificadora.
- **Estado:** expectativa documental pronta para revisão; spans, contagens reais, cobertura medida e homologação pendentes. Vigência e elegibilidade corrente pendentes, sem aprovação jurídica nesta ficha.

## Proveniência das respostas DOE-SP/RFB

Os hashes abaixo identificam as respostas lidas durante o desenho, segundo seu §7.3. Não foram recalculados nesta entrega, não identificam automaticamente a versão produtiva e não devem ser usados como hash de amostra sanitizada.

| Amostra | SHA-256 da resposta oficial |
|---|---|
| DOE Decreto 70.843 | `6a695d3e2ab156572c9c852175255905a5c891a5f05561da3f1b648250083d1f` |
| DOE Decreto sem número | `f56381e7076e0e4f26f70e4a4dc0b1c657871c6218037e2d9f4b50e728cd1527` |
| DOE Despacho Governador | `b2e012ede2228d65c41b9e387410a1c1d0a69f28477e0fe635c4e5d541a85d8a` |
| DOE Pauta PGE | `19585b9ab7edbbcf527c0fc4966c54a86fcf677351d23dbdce96bddd3fe9bfb8` |
| DOE Seduc 86 | `043449c800d2c72e6f7f9ae472c943784d3340786179bf8724cb3bf089c875b1` |
| DOE URE 66 | `05d941844a919981864ea7e57d271fa95feaa401953c35344503c6c89de856a6` |
| DOE Cassação IE | `f95802e72f55bf77f7e8357d8858ec02e8ef7453f3f643403495c096d6166866` |
| DOE SRE 43 | `c9de38fdb4b5d254bcb755d4205c448a984c8169013671f9c55009c69bf48469` |
| DOE Dicar 59 | `1cc461fc6b77eaa6546cb150d5d1ac0baaf1c3e257acc50fcda7bbdee1d85c62` |
| DOE Retificação | `79c4267ed711f30da6e54e4c9a46132996ba65ece3988d9343de7c9d2e41eb27` |
| RFB 153836 | `84d788bb314510166cb70aade948f49c1606915056bf452c1619c15727a135ac` |
| RFB 153828 | `5397923095b1eb29669eb68a2a22aac5f9a066cc9f73ef582030d3b010f31a03` |
| RFB 153829 | `b9c737dc353c52c9ae5e32f5180e86f45c2f8d419e5de64cee165ad0a4b240bd` |
| RFB 153819 | `e9c21d1e289cdffe1a37a9db5c62f82e96512c012dd403721f134dd92b132b56` |
| RFB 153820 | `254d91ef371696d0367d33ebe066eabcd1d3773d77ba232986a6c835f7f5b6f2` |
| RFB 153821 | `7dbe7bce751bed280e1bf8cbf9e4857ce3050e679a39915b0e41bc49c61d3263` |
| RFB 153822 | `0fd21cff718b2c15e0839257c913c8252f3c61c3193ae89669d9cc6aa43ad424` |
| RFB 153743 | `2ac5537168fff4dcda5ce5bbae1861b38c890a5c42941c3442687530373100a3` |


## Critério de fechamento documental

As 30 fichas correspondem às 30 publicações reais do §7.2, sem contar continuações DOU ou casos sintéticos como novas publicações. Não incluem nomes/CPF de atos de pessoal. Não habilitam classificação, destaque de vigência, implementação ou execução produtiva. O desenho e esta expectativa podem existir antes da comparação read-only de produção; a comparação deve reportar separadamente o que foi efetivamente observado.
