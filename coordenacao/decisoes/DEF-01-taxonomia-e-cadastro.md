# DEF-01 — Definições: taxonomia, tabelas de configuração e cadastro do cliente

**Status:** DEFINIDO pelo Fábio em 11/10/2026. **Nenhuma implementação autorizada** até o Fábio liberar cada entrega.
**Relacionado:** ARQ-01 (pipeline normativo modular).

## 1. Arquitetura (ARQ-01, proposta)
Pipeline modular: Coleta → Filtro → Estrutura → Relações/Vigência → Taxonomia → Cruzamento com empresas → Layout. As regras ficam como dados editáveis (low-code), com perfis por tipo de ato. Piloto: Convênios ICMS (Estrutura + Vigência), com prova nos Convênios 100/97 e 52/91 e no NCM de anexo revogado. Antes de codar: pesquisa P-01 (LexML).

## 2. Tabela Segmento (base: `planilhas/taxonomia-v1_7_3-segmento.xlsx`)
Colunas: Segmento | Sub Segmento | Atuação | CNAE | Descrição do CNAE | Sinônimos | Produtos (sugeridos) | NCMs (sugeridos) | No perfil | Classificar pelo nome | Ordem | Código TriFaros.
- O Sub Segmento segue a lógica dos grupos de produto (bens). Os serviços mantêm o tema.
- Produtos e NCMs são **sugestões**, listas separadas por ";". Na tela, aparecem em chips com "x" para excluir.
- Fontes: IBGE PRODLIST-Indústria 2025, IBGE PRODLIST Agro/Pesca 2003 (NCM de 2003, conferir vigência) e a tabela de produtos (comércio, pelo Sub Segmento).

## 3. Tabela Produto (base: `planilhas/taxonomia-v1_7_0-produto.xlsx`)
Colunas: Segmento | Grupo | Item | NCM | Sinônimos | No perfil | Classificar pelo nome | Ordem | Código TriFaros | Definição.
- 1 produto → 1 ou mais NCMs (";"). Sinônimos por ";".
- Os 3.455 produtos novos (IBGE) entram com "Classificar pelo nome" desligado.

## 4. Tabela Atuação (nova)
Itens: Indústria, Comércio atacadista, Comércio varejista, Produção agropecuária, Extração mineral, Representação comercial, Serviço. Os sinônimos são parametrizados pelo Fábio. Ao achar um sinônimo no texto vigente, a norma é marcada com a Atuação. A coluna Atuação da tabela Segmento aponta para esta tabela.

## 5. Taxonomia e Perfil
Exibem "Segmento – Sub Segmento" em vez de só o Segmento.

## 6. Planilha × banco
A planilha (listas com ";") é o formato de carga e exportação. Internamente, o banco pode guardar de forma relacionada, sem duplicidade.

## 7. Próxima frente prevista: QUALIDADE DO ALERTA
L-16 + PR #185 (NCM correto nos convênios), PR #60 (duplicadas), PR #144 (CNAE no cruzamento), fechar os 7 PRs obsoletos ou burocráticos.

## 8. Regras da taxonomia (TAX-12)
Classificar só texto legal vigente, incluindo os anexos vigentes. Desconsiderar dispositivos revogados, redações anteriores e o histórico de alterações. Não classificar títulos nem a identificação dos atos. Destacar termos com a cor #90D8A5. Evitar classificação incorreta e duplicidade. Validar nos Convênios ICMS 100/97 e 52/91.

## 9. Uso do CONCLA/IBGE
É um dicionário de apoio, separado das regras jurídicas. A correspondência NCM/PRODLIST não quer dizer benefício ou obrigação. O CNAE não prova que o cliente vende todos os produtos ligados a ele. O NCM informado pelo cliente vale mais que a sugestão pelo CNAE. A carga das tabelas oficiais tem controle de versão. A cadeia de relevância é: Legislação → dispositivo vigente → NCM → Produto → Segmento – Sub Segmento → Cliente.

## 10. Sinônimos de produto na legislação
Reconhecer o produto pelo nome ou sinônimo quando a norma não cita o NCM. Quando o nome é ambíguo, não presumir um NCM: fica como candidato, não como alerta.

## 11. Cadastro do cliente
1. Uma tela só para empresa e estabelecimentos.
2. **Perfil tributário por estabelecimento**, com produtos e NCMs separados por filial. A taxonomia indica para qual empresa/estabelecimento a norma é relevante.
3. Fluxo ao adicionar o **CNPJ**:
   1. API da Receita → CNAE e UF;
   2. **IE só por APIs gratuitas por UF** (Goiás já existe), senão manual;
   3. se alguma falhar, abre um popup com o formulário manual;
   4. animação de carregamento com frases engraçadas (estilo The Sims): **30 frases por Sub Segmento**, sorteadas pelo Sub Segmento do CNAE principal;
   5. popups em sequência: CNAE → NCMs sugeridos → Produtos → demais marcadores.
4. Ajuda "?" nas telas de NCM e de Produto, com print: o NCM serve para achar correspondência de NCM; o Produto, para achar o nome do produto.
5. Marcadores dinâmicos: o perfil é montado a partir da configuração da taxonomia, e incluir, tirar ou ajustar um marcador reflete sozinho.
6. Exportar e Importar no perfil, com menu para escolher a configuração. O "?" explica que o layout exportado é o da importação e que importar sobrescreve a tabela inteira. O sistema exporta uma cópia automática antes de sobrescrever.
7. Na configuração da taxonomia, Produtos e NCMs em chips com "x".
8. **Excluir empresa apaga tudo** que está vinculado a ela, com confirmação digitando o CNPJ.

## Em aberto
- Conferir os NCMs de 2003 do agro contra a tabela NCM vigente (Siscomex).
- A carga das planilhas é feita pelo Fábio, depois que o programa aceitar o formato novo.
