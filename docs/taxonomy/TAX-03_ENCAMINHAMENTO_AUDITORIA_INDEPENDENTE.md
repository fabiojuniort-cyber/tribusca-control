# TAX-03 — Encaminhamento para auditoria independente da Taxonomia TriBusca v1

**Estado:** pronto para encaminhar; auditoria ainda não executada.  
**Contrato aprovado:** `TAX-01_ARQUITETURA_TAXONOMIA_TRIBUSCA_V1.md`.  
**Objeto da auditoria:** `TAX-02_DICIONARIO_FUNCIONAL_TAXONOMIA_TRIBUSCA_V1_R4.md`.  
**Histórico de comparação:** R3 de Claude e §§20–23 da R4.  
**Escopo:** R1 documental/funcional; nenhum código, migration, banco, classificador, matching privado ou mudança em conectores.

## Pedido ao revisor independente

Audite a TAX-02 R4 contra a arquitetura TAX-01 aprovada e fontes oficiais primárias. Não presuma que os 630 códigos `proposed` estão corretos só porque o arquivo passa em uma checagem estrutural. Registre cada achado com código, linha, afirmação contestada, fonte e dispositivo/edição, contraexemplo, gravidade e correção proposta. Não altere a R4 antes de emitir o parecer; uma revisão seguinte pode incorporar as correções aceitas com rastreabilidade.

### 1. Integridade do contrato e fontes

- Confira as dimensões, os campos obrigatórios, o estado `proposed`, `UNMAPPED`, a ausência de propagação automática e a separação global versus privado.
- Valide se cada âncora oficial suporta a **definição concreta da linha**, e não apenas a existência do assunto. Verifique edição, dispositivo, vigência e jurisdição. Trate `lei específica` e `ato oficial` como pendência explícita, nunca citação normativa suficiente.
- Revise as chaves de fontes ainda pendentes em §§3.1 e 3.3 e a extensão exata das verificações pontuais em §3.4. Não retroaplique catálogos atuais a normas históricas.
- Audite aliases e hierarquias: sinônimo lexical, relação contextual, subtipo e simples associação não são equivalentes.

### 2. Prioridades jurídicas e semânticas

- **P0:** tributos/espécies, IBS/CBS/IS e transição; competências; ISS e legislação municipal; sujeitos e responsabilidade; imunidade; obrigação versus pedido/procedimento; documento versus escrituração/plataforma; vigência e relações entre atos.
- **Correções R4:** PIS/Pasep-Importação versus Cofins-Importação; MEI versus Simei; PER/DCOMP; NFA-e modelo 55; nota fiscal de produtor modelo 04 por UF/período; DIRF para anos-calendário anteriores a 2025; ente público versus órgão. Teste cada uma em atos reais e com contraexemplos.
- **Fronteiras G01–G25:** dê atenção a G05 (operações), G08–G10 (frigorífico, CNAE, segmentos, produtos/NCM/NBS), G17–G19 (tributos, reforma e obrigações), G21 (sobreposições) e G24–G25 (tipagem jurídica pendente).

### 3. Cobertura, especialmente operações e produtos

- Faça amostra estratificada de atos oficiais por esfera, período, tributo e setores distintos: agro, carnes, indústria, combustíveis, energia, telecom, saúde, educação, finanças, software, comércio, transporte, construção e comércio exterior.
- Compare operações ausentes, redundantes ou que são facetas, etapas ou finalidades; teste composição como operação + âmbito + finalidade + canal, sem gerar combinação artificial nem equiparar operação a CFOP.
- Compare produtos por famílias e seções oficiais de NCM, além de serviços/intangíveis com NBS. Não converta termo genérico em NCM/NBS exato. Identifique lacunas como candidatos com evidência, frequência e risco; mantenha `UNMAPPED` quando necessário.
- Para frigorífico, prove fronteiras com abatedouro, processamento, armazenagem refrigerada e distribuição; CNAEs candidatos não viram aliases nem mapeamentos aprovados sem notas da edição correspondente.

### 4. Testes e decisão

- Reexecute conceitualmente os oito casos obrigatórios do §17 e os casos adicionais, agora com pelo menos uma amostra de atos oficiais reais por fronteira crítica. Para cada caso, registre a classificação sustentada, a abstenção necessária e qualquer falso positivo/negativo.
- Separe três medidas: cobertura do catálogo externo, capacidade do vocabulário de representar atos e cobertura efetiva dos conectores. Não invente porcentagem para universo aberto nem declare dimensão completa por tamanho da lista.
- Entregue matriz por dimensão com `APPROVE`, `REVISE` ou `REJECT`, achados bloqueantes e não bloqueantes, lacunas novas, propostas de fusão/renome/retirada e decisão sobre prontidão para TAX-04. O parecer global deve ser **FAVORÁVEL** ou **REPROVADO/BLOQUEANTE**, com justificativa. `APPROVE` não significa autorização automática para modelar banco sem a governança e o manifesto de edições definidos na TAX-01.

## Limites operacionais

Esta etapa é auditoria independente e documental. Não criar migration, tabela, importação integral de CNAE/NCM, IA/classificador, matching de clientes, score, integração, merge ou deploy. Dados de cliente não entram no vocabulário global. Se encontrar erro, registre correção proposta e evidência; preserve a R4 como entrada auditada.
