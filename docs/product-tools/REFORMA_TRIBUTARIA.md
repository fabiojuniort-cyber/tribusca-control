# Página temática — Reforma Tributária

**Frente:** PROD-01 / WEB-01  
**Issues:** [#7 Produto](https://github.com/fabiojuniort-cyber/tribusca-control/issues/7) · [#8 Site](https://github.com/fabiojuniort-cyber/tribusca-control/issues/8)  
**Estado:** **DECISÃO APROVADA**  
**Implementação:** pendente de comprovação no frontend.

## Natureza

**Reforma Tributária** é uma **página temática de dados do TriBusca**, não um produto comercial, ferramenta com nome próprio ou submarca.

A página organiza o recorte do Acervo relacionado à Reforma Tributária e oferece uma leitura estruturada e cronológica do tema.

## Conteúdo

A página deve concentrar, conforme disponibilidade e fonte oficial:

- legislação constitucional e complementar relacionada à Reforma Tributária;
- atos e publicações do **CGIBS**;
- atos e publicações da **Receita Federal**;
- atos **CONFAZ** relacionados;
- notas técnicas de **NF-e, CT-e, NFS-e e SPED**;
- publicações marcadas com **IBS, CBS, Imposto Seletivo ou Reforma Tributária**;
- versões e histórico quando aplicável;
- links e referências para a fonte oficial.

## Timeline

A página terá uma **timeline da Reforma Tributária**, preparada para representar:

- datas de publicação;
- inícios de vigência;
- marcos de implementação;
- fases/faseamento;
- regulamentações, alterações e notas técnicas relevantes.

**Publicação** e **vigência** são dimensões distintas e não devem ser confundidas.

Eventos futuros só podem ser exibidos como previstos/programados quando existir base normativa ou oficial correspondente.

## Relação com o Acervo

A página não mantém acervo paralelo.

O conteúdo deve ser derivado do **Acervo global do TriBusca**, por marcadores, relações e metadados.

- **Acervo** = base geral.
- **Reforma Tributária** = visão temática estruturada.
- **Sonar** = afinidade da publicação com a empresa/estabelecimento.
- **Decodifica** = explicação da publicação sob demanda.
- **Revela** = entrega diária dos itens prioritários.

## Experiência

Direções funcionais:

- página pública dedicada no site;
- acesso ao conteúdo oficial;
- filtros por tipo de ato, tema, tributo e período quando os dados existirem;
- timeline navegável;
- acesso das entradas da timeline às publicações;
- histórico/versionamento e rastreabilidade;
- separação clara entre **fato oficial**, **inteligência TriBusca** e eventual **IA**.

## Fronteiras

A página não deve:

- ser tratada como produto separado;
- criar marca/logo próprios;
- duplicar fisicamente publicações do Acervo;
- apresentar cronograma especulativo como fato;
- confundir publicação com vigência;
- inventar eventos ou datas para preencher a timeline.

## Questões abertas

1. Política futura de curadoria/destaques editoriais e responsáveis por essa seleção.
2. Detalhes visuais finais para diferenciar publicação, vigência e marco futuro programado, preservando a semântica já aprovada.

## Impacto

| Área | Impacto |
| --- | --- |
| Arquitetura | Baixo/futuro — visão temática sobre o Acervo. |
| Dados | Sim — depende de marcadores e datas estruturadas. |
| API | Sim/futuro — consulta temática/timeline. |
| Coleta | Indireto — depende das fontes oficiais capturadas. |
| IA | Não obrigatória para a página base. |
| UX | Sim — timeline, filtros e navegação temática. |
| Site | Sim — página pública dedicada. |
| Comercial | Indireto — reforça autoridade e descoberta. |
| Prioridade DOE | Não altera. |


## GOV-03 — navegação e inclusão

A navegação temática aprovada é:
1. **Últimas publicações**;
2. **Legislação**;
3. **Regulamentação**;
4. **Notas técnicas**;
5. **Timeline**.

A inclusão na página deve derivar de **marcadores do Acervo**, e não de um acervo duplicado. Destaques editoriais podem existir futuramente, mas **não estão implementados nem são necessários para a inclusão base**.
