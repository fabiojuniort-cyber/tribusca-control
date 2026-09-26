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
O usuário abre a mesma base legal sem o Decodifica previamente revelado para ele → aciona o botão → o sistema verifica resultado reutilizável → apresenta o resultado existente sem nova geração desnecessária.

## Dependências

Planejadas, não implementadas por esta decisão:
- conteúdo oficial confiável e versionado;
- API do produto;
- persistência do resultado;
- mecanismo de identificação do conteúdo/versão aplicável;
- estado de acionamento/visibilidade para que conteúdo global reutilizável não apareça automaticamente a outro usuário;
- integração com OpenAI API;
- frontend definitivo para a experiência de leitura.

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

1. Política de retenção/obsolescência quando o conteúdo oficial mudar ou a engine/prompt/modelo do Decodifica for atualizado.
2. Unidade técnica de geração e persistência: ato completo, artigo ou outra composição interna, preservando a experiência aprovada de cobertura completa e apresentação artigo a artigo.
3. Regra física de associação entre resultado global reutilizável e o acionamento/visibilidade por usuário.
4. Contrato da OpenAI API, modelo, prompt, limites, observabilidade, custos e controles de falha.
5. Comportamento para conteúdo extenso que exceda limites técnicos da integração.

## Avaliação de impacto desta decisão

| Área | Impacto |
| --- | --- |
| Arquitetura | **Sim, futuro** — resultado global reutilizável + estado de acionamento/visibilidade por usuário. |
| Dados | **Sim, futuro** — persistência, versionamento e associação do resultado. |
| API | **Sim, futuro** — consulta/acionamento e retorno do Decodifica. |
| Coleta | **Não agora** — a coleta continua responsável pelo conteúdo oficial. |
| IA | **Sim, futuro** — integração sob demanda com OpenAI API e reaproveitamento de resultado. |
| UX | **Sim, futuro** — botão no início da base legal e blocos por artigo. |
| Site/comercial | **Sim, documental** — nome comercial passa a ser Decodifica; não anunciar como disponível antes da implementação. |
| Custos | **Sim, futuro** — chamadas à API; reutilização global foi decidida para reduzir consumo redundante. |
| Segurança | **Sim, futuro** — definir fronteira de dados, autorização e telemetria da integração. |
| Prioridades | **Não** — não altera DOE-SP nem a macrofase dos DOEs. |
| Roadmap | **Sem mudança de ordem** — apenas substitui o nome Norma Clara por Decodifica. |

## Necessidade de ajuste no projeto

**Sim, em desenho futuro**, nas frentes de arquitetura/dados/API/IA/UX, quando o Gerente Geral autorizar a implementação por Issue própria.

**Nenhuma alteração técnica é autorizada por este documento.**
