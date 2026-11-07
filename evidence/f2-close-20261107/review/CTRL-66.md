# CTRL-66 — DESIGN-01C: fechamento e revisão incremental pendente

Frente 2:12% (6/50), delta zero. Unidade de peso1. Aceite final: COORD; revisão material independente permanece exigida. Nenhum código de produto, merge ou deploy nesta rodada.

## Em linguagem simples

AS IS: as três famílias visuais estão integradas e publicadas, com CI final verde. Os pareceres independentes apontam versões anteriores; parte do código mudou depois e os ZIPs antigos já não podem ser recuperados.
TO BE: entregar novas capturas reproduzíveis e delimitar exatamente a mudança que outro revisor precisa conferir antes do aceite.
Impacto: completa as evidências sem alterar a aparência do site. O crédito só entra após a revisão e o aceite.

## Critério → prova → lacuna

| Critério original | Prova | Lacuna / ação mínima |
| --- | --- | --- |
| Templates próprios ATO_COTEPE_ICMS, PROTOCOLO_ICMS e AJUSTE_SINIEF; variantes por estrutura | PRs web50/51/52; registry/testes existentes; CI final verde. Casos novos de navegador cobrem moderno,anexo,histórico e consolidado nas três famílias. | Revisão incremental dos SHAs abaixo, incluindo seleção exata por família. |
| Sem CSS por publicationId/número/ano; propagação por família | Fonte src/legal-presentation.ts e src/publication-detail-page.css nos commits finais; testes de seleção exata no CI. | Revisor deve verificar invariantes no delta, não inferir apenas pelas capturas. |
| Referências visuais dominantes do PO | Lista original de dez variantes preservada no corpo da #66; capturas novas de fixture são material de comparação. | Captura sintética não demonstra identidade/completude de HTML oficial nem substitui julgamento independente contra a referência do PO. |
| Cores e recuos não inferem vigência; SANITIZED_HTML/PRESERVED_TEXT | Contratos/testes existentes e pareceres anteriores; nenhuma mudança semântica nesta rodada. | Revisor confere delta e contracasos de seleção/metadata. |
| Tabelas preservadas; sem reconstrução ambígua; hash jurídico inalterado | Unitários históricos, browser de anexo/PMPF e asserts de overflow/estilo. Dados de empresa no fixture atual explicitamente sintéticos. | Browser comprova apresentação dos trechos de fixture; não ingestão nem hash jurídico de acervo. |
| Convênio e PMPF sem regressão | CI final existente; PMPF reproduzido em quatro viewports. | Proteção atual dos reservados respeitada: não executado/reutilizado o trecho sintético do100/97 nem conteúdo52/91. Regressão100/97 histórica apenas referenciada, não reaberta. |
| Typecheck/unit/build/Playwright e upload integralmente verdes | Runs37255510652,37256909516,37257475761 SUCCESS nos três heads finais. O bloqueio antigo de quota não é estado atual. | As listagens atuais não disponibilizam os ZIPs históricos. Novo ZIP é uma reprodução local datada. |
| Revisão independente Astra Ultra | Pareceres5974446759,5974446938,5974447136 transcritos nos respectivos PRs. | Cobrem SHAs anteriores. Não presumir aprovação dos heads finais. Responsável pelo encaminhamento: COORD. |
| Merge e publicação | Três merges e deployments SUCCESS abaixo, reconfirmados pelo status GitHub. | Nada a publicar de novo; faltam revisão do delta e aceite da unidade. |

## SHAs e provas fixadas

| PR | SHA revisado originalmente | HEAD final / CI SUCCESS | Merge / deployment SUCCESS |
| --- | --- | --- | --- |
| [web50](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/50) | 715424f9388aaf15327ca4e0cde3b62571780348 | 21635630f47aa666241bcc8b7e78b13f7cbeaccc /37255510652 | 581091ffd0aa890a5b86255caf45e7a42837d54c /2c5525c4-e7e7-40be-acec-d428d1aa0b0c |
| [web51](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/51) | 020cc12ef2de8d2aadc1c182184fcc22fb1a6312 | 120ed2190b8f418810335dcf1bcd6a2eeac190da /37256909516 | 5d2cd9ff23a40bfda430c7fb29f6d1d7d45fe1b2 /f82cce64-5110-43c0-8591-d7ca0939a243 |
| [web52](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/52) | 703c93dbba1f75f0bba32217b2e0f164696808f7 | dca2814543b2bb767a0793ed6c17388b8a47e20d /37257475761 | a04368685e2340135e91d9ff4a51474b23cbf4c2 /472b26ed-1a35-4c1b-b916-0e635a2ad751 |

## Encaminhamento exato para revisão independente

COORD: assumir/encaminhar a revisão incremental exigida pelo gate original, sem transformar esta reconciliação do executor em parecer independente.

1. Comparar715424f...→2163563... e020cc12...→120ed21...: fontes/testes dos respectivos templates inalterados; há atualizações de main e CSS compartilhado, que devem ser inspecionadas proporcionalmente.
2. Comparar [703c93d...→dca2814...](https://github.com/fabiojuniort-cyber/radar-fiscal-web/compare/703c93dbba1f75f0bba32217b2e0f164696808f7...dca2814543b2bb767a0793ed6c17388b8a47e20d): delta material em src/legal-presentation.ts(131linhas alteradas), seus testes(154), e2e/legal-presentation.spec.ts(128), CSScompartilhado(329), documentação(41). O compare contém também atualizações de outras entregas, que não serão alteradas para esta unidade.
3. Conferir seleção exata, variantes estruturais, contracasos/fallback conservador, preservação das tabelas, ausência de inferência jurídica e não regressão. Usar os runs finais para typecheck/unit/build/e2e; manter o requisito de referência visual do PO.
4. A reprodução de novembro usa CSS público atual. Desde o head final do#52 até webmain3489453c5f991d02e053a5e9eaec5717cc21b5e3, src/legal-presentation.ts não mudou; CSScompartilhado mudou38linhas (cabeçalho e regra verde). Este delta está no manifesto de comparação e deve ser considerado ao comparar screenshots novas.
5. Publicar parecer fixando o head final examinado e os limites da evidência. Somente se favorável emitir ACEITE CTRL-66 e fechar/creditar uma unidade.

Ausência de revisão final é o bloqueio material restante; responsável COORD/revisor independente. Não há necessidade de o Fábio executar investigação técnica.
