# ANAT-00 a ANAT-03 — resumo conceitual (registro histórico sanitizado)

Governança: #116, decisões 2 do comentário 6542971547 e 5 do comentário 6543169799. Documento **escrito do zero** para preservar a identificação histórica do trabalho de ANAT-00 a 03 sem integrar nenhum arquivo do #115. Não contém trecho de ato, tabela, código NCM, classificação por linha nem dado derivado do corpus. A fonte histórica completa continua no PR #115 (`c83f3c69958827ef69ecef9b54417693a6bd398d`), fora da `main`.

## O que foi feito (ANAT-00 a 03)

- **ANAT-00/01:** desenho da Anatomia do Ato. O ato é separado em estrutura, natureza e vigência, e cada trecho fica ligado à sua origem.
- **ANAT-02:** fichas e anotação de leitura de duas representações HTML, com conferência humana de igualdade das classes. Essa conferência não prova vigência.
- **ANAT-03:** preparação documental de dois convênios ICMS, com:
  - exclusão em bloco do histórico por classe, nota e literal (1.706 registros não elegíveis);
  - proposta de 728 trechos atuais, organizados em **25 blocos**;
  - cadeias de prazo documentadas.

## Situação

- **25 blocos = proposta; 0 homologados.** Nenhum bloco tem aceite jurídico.
- O critério antigo de conferência pelo Product Owner foi substituído pelo direcionamento de 30/10/2026 (#116 c.6514510003): a IA faz a preparação e as conferências técnicas, e a revisão independente é obrigatória.
- Os dois convênios usados no ANAT-03 são as entradas 01 e 02 do corpus (`corpus-manifest.json`). Por BLOCK_CORPUS_INPUTS_AND_GOLD, nenhum conteúdo derivado deles entra na `main` nem em amostras, fixtures ou testes.

## Onde a frente continua

O backend tem matriz de situação, leitor estrutural, gate de procedência oficial e desenho de relações. A cobertura oficial depende da liberação de rede (OFFICIAL-01).
