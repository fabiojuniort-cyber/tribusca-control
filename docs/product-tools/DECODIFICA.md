# Decodifica

**Frente:** PROD-01  
**Issue:** [#7](https://github.com/fabiojuniort-cyber/tribusca-control/issues/7)  
**Estado:** **DECISÃO APROVADA**  
**Implementação:** **NÃO COMPROVADA / NÃO AUTORIZADA NESTA FRENTE**

## Nome

**Decodifica** é o nome comercial aprovado para a ferramenta anteriormente chamada **Norma Clara**.

É uma funcionalidade do TriBusca, não uma submarca independente. Não criar logo, identidade visual ou marca paralela sem nova decisão.

## Problema que resolve

Permitir que o usuário compreenda texto legal ou normativo complexo em linguagem mais clara, preservando a referência ao conteúdo oficial.

A ferramenta explica o conteúdo; não deve apresentar como certeza um impacto empresarial que não esteja sustentado pelo texto.

## Público

Usuários autenticados do TriBusca que estejam consultando uma publicação/base legal no produto.

## Funcionamento aprovado

1. O conteúdo oficial continua sendo a referência primária.
2. No início da base legal haverá um botão para acionar o **Decodifica**.
3. A tradução/explicação é gerada **sob demanda**, e não automaticamente ao abrir a publicação.
4. A geração será realizada por integração futura com a **OpenAI API**.
5. Depois de gerado, o resultado é persistido.
6. Quando o mesmo usuário sair e voltar à mesma base legal correspondente, o resultado já deverá estar disponível.
7. Outro usuário que abrir a mesma base legal **não verá automaticamente** o conteúdo do Decodifica antes de acioná-lo.
8. Se esse outro usuário acionar o Decodifica e já existir resultado reutilizável para o mesmo conteúdo aplicável, o TriBusca deve servir o resultado persistido em vez de realizar nova chamada à API.
9. O acionamento deve abranger o **dispositivo/base legal completa** disponibilizada para tradução.
10. Na interface, o resultado deve ser apresentado em **blocos de artigo em artigo**.
11. O Decodifica utilizará **créditos vinculados à assinatura**.
12. **1 crédito Decodifica = até 25.000 caracteres** de conteúdo processado.
13. O consumo tem mínimo de **1 crédito**: mesmo um dispositivo muito curto, por exemplo com 100 caracteres, consome 1 crédito.
14. Conteúdos acima de 25.000 caracteres consomem créditos adicionais proporcionalmente por faixas de 25.000 caracteres. Regra conceitual: `créditos = ceil(caracteres / 25.000)`, com mínimo de 1.
15. Antes do acionamento, o usuário deve visualizar o custo em créditos; a direção aprovada é exibir esse custo no próprio botão do Decodifica.
16. O consumo de créditos é pelo uso do recurso na assinatura, independentemente de o TriBusca precisar fazer uma nova chamada à OpenAI API ou conseguir reutilizar um resultado global já existente.
17. Se o conteúdo oficial for posteriormente alterado, retificado ou substituído por nova versão, a tradução/explicação já existente **não deve ser apagada**.
18. Nesse caso, o resultado anterior deve permanecer acessível, porém com uma marcação visual clara de que está **desatualizado em relação à versão oficial vigente**.

## Entradas

Aprovado conceitualmente:
- conteúdo oficial da publicação/base legal correspondente;
- ação explícita do usuário no botão do Decodifica.

Não definido nesta rodada:
- payload físico enviado à API;
- se a chamada à IA será única para o ato completo ou particionada internamente;
- prompt, modelo, parâmetros e contrato de resposta;
- limites de tamanho e estratégia para atos muito extensos.

## Saídas

- explicação/tradução em linguagem clara do conteúdo acionado;
- apresentação organizada por artigo na tela;
- resultado persistido e potencialmente reutilizável sem nova chamada à IA.

## Experiência do usuário

### Primeiro usuário / resultado inexistente
O usuário abre a base legal sem tradução visível → aciona o Decodifica → o sistema obtém o resultado pela integração de IA → apresenta o conteúdo por artigo → o resultado fica disponível em acessos posteriores aplicáveis.

### Outro usuário / resultado já existente
O usuário abre a mesma base legal sem o Decodifica previamente revelado para ele → visualiza previamente o custo em créditos → aciona o botão → o sistema verifica resultado reutilizável → apresenta o resultado existente sem nova geração desnecessária. O reaproveitamento reduz custo interno de IA, mas **não elimina o consumo comercial de créditos da assinatura**.

## Dependências

Planejadas, não implementadas por esta decisão:
- conteúdo oficial confiável e versionado;
- API do produto;
- persistência do resultado;
- mecanismo de identificação do conteúdo/versão aplicável;
- estado de acionamento/visibilidade para que conteúdo global reutilizável não apareça automaticamente a outro usuário;
- integração com OpenAI API;
- frontend definitivo para a experiência de leitura.

## Créditos e mensuração comercial

- **Unidade aprovada:** 1 crédito = até 25.000 caracteres.
- **Mínimo aprovado:** 1 crédito por acionamento/conteúdo elegível, ainda que o texto tenha menos de 25.000 caracteres.
- **Escalonamento aprovado:** cada faixa adicional, ainda que parcial, de até 25.000 caracteres consome mais 1 crédito.
- Exemplos conceituais: 100 caracteres = 1 crédito; 25.000 = 1; 25.001 = 2; 100.000 = 4.
- O custo deve ser conhecido **antes** da confirmação/acionamento.
- A quantidade de créditos incluída em cada plano de assinatura **não foi definida** nesta rodada.
- A base exata de contagem de caracteres (por exemplo, tratamento de espaços, marcação, cabeçalhos e texto normalizado) permanece aberta para desenho funcional/técnico posterior.

## Versionamento e desatualização

- Uma tradução existente permanece vinculada à versão do conteúdo oficial que lhe deu origem.
- Se a norma sofrer alteração, retificação ou nova versão, a tradução anterior permanece disponível.
- A interface deve destacar de forma inequívoca que essa tradução está **desatualizada** frente ao texto oficial vigente.
- O texto oficial vigente continua sendo a referência primária.
- **Ainda não foi definido** se uma tradução atualizada será gerada automaticamente, mediante novo clique, ou por outro fluxo; essa decisão permanece aberta.
- Também permanece aberta a política para obsolescência causada apenas por mudança de engine, prompt ou modelo, sem mudança no conteúdo oficial.

## Limites

- Não substituir ou ocultar o texto oficial.
- Não gerar automaticamente apenas porque a publicação foi coletada ou aberta.
- Não fazer nova chamada à IA quando existir resultado reutilizável aplicável.
- Não apresentar o recurso como implementado antes de evidência técnica/produtiva.
- Esta decisão não define schema, endpoint, tabela, modelo da OpenAI, prompt ou estratégia física de cache.

## Relação com outras ferramentas

- Usa a publicação oficial como fonte de entrada.
- Pode futuramente coexistir com relevância explicável, marcadores e análise de impacto, mas **Decodifica não é análise de impacto**.
- Deve permanecer visualmente distinguível entre **fato oficial** e **conteúdo gerado por IA**.

## Estágio previsto

Conforme o roadmap vigente, a implementação permanece na macrofase de Inteligência do Produto, depois da cobertura estadual, salvo nova decisão formal de prioridade.

## Questões abertas

1. Fluxo para gerar uma nova tradução quando a versão oficial mudar: automático, novo acionamento ou outra regra; e eventual consumo de créditos nessa atualização.
2. Política de obsolescência causada apenas por mudança de engine/prompt/modelo, sem alteração no conteúdo oficial.
3. Unidade técnica de geração e persistência: ato completo, artigo ou outra composição interna, preservando a experiência aprovada de cobertura completa e apresentação artigo a artigo.
4. Regra física de associação entre resultado global reutilizável e o acionamento/visibilidade por usuário.
5. Contrato da OpenAI API, modelo, prompt, limites, observabilidade, custos e controles de falha.
6. Comportamento para conteúdo extenso que exceda limites técnicos da integração.
7. Quantidade de créditos incluída em cada plano, periodicidade de renovação, eventual rollover e regras de compra adicional.
8. Definição exata de quais caracteres entram na medição comercial e em qual representação do texto a contagem é feita.

## Avaliação de impacto desta decisão

| Área | Impacto |
| --- | --- |
| Arquitetura | **Sim, futuro** — resultado global reutilizável + estado de acionamento/visibilidade por usuário. |
| Dados | **Sim, futuro** — persistência, vínculo com a versão oficial, versionamento e associação do resultado. |
| API | **Sim, futuro** — consulta/acionamento, cálculo/exposição do custo, consumo de créditos e retorno do Decodifica. |
| Coleta | **Não agora** — a coleta continua responsável pelo conteúdo oficial. |
| IA | **Sim, futuro** — integração sob demanda com OpenAI API e reaproveitamento de resultado. |
| UX | **Sim, futuro** — botão no início da base legal com custo em créditos visível antes do clique, blocos por artigo e indicação inequívoca quando uma tradução estiver desatualizada. |
| Site/comercial | **Sim, futuro** — Decodifica será limitado por créditos da assinatura; franquias por plano ainda não foram definidas. Não anunciar como disponível antes da implementação. |
| Custos | **Sim, futuro** — créditos comerciais são separados do custo interno de API; reutilização global reduz consumo redundante da OpenAI sem alterar o débito comercial do uso. |
| Segurança | **Sim, futuro** — definir fronteira de dados, autorização e telemetria da integração. |
| Prioridades | **Não** — não altera DOE-SP nem a macrofase dos DOEs. |
| Roadmap | **Sem mudança de ordem** — apenas substitui o nome Norma Clara por Decodifica. |

## Necessidade de ajuste no projeto

**Sim, em desenho futuro**, nas frentes de arquitetura/dados/API/IA/UX, quando o Gerente Geral autorizar a implementação por Issue própria.

**Nenhuma alteração técnica é autorizada por este documento.**
