# Sonar

**Frente:** PROD-01  
**Issue:** [#7](https://github.com/fabiojuniort-cyber/tribusca-control/issues/7)  
**Estado:** **DECISÃO APROVADA**  
**Implementação:** **NÃO COMPROVADA / NÃO AUTORIZADA NESTA FRENTE**

## Nome e promessa

**Sonar — Afinidade Tributária**

Sonar é a ferramenta de afinidade tributária do TriBusca. Seu papel é comparar os marcadores da publicação com o Perfil Tributário da empresa e de seus estabelecimentos para classificar a afinidade e explicar os motivos.

Sonar **não é análise de impacto** e não deve afirmar que uma norma necessariamente afeta a empresa apenas porque existe afinidade.

## Funcionamento aprovado

1. O Sonar funciona **automaticamente** e não consome créditos.
2. A publicação disponibilizada no produto deve estar acompanhada dos marcadores necessários ao Sonar.
3. O cadastro/perfil da empresa e de seus estabelecimentos também deve ser associado aos atributos/marcadores aplicáveis.
4. O Sonar cruza publicação × perfil tributário e classifica o resultado em **Alta**, **Média** ou **Baixa** afinidade; quando o perfil não tiver dados suficientes para uma classificação legítima, usar o estado separado **Dados insuficientes**, nunca Baixa por ausência de informação.
5. O resultado deve ser **explicável**, apresentando os fatores que contribuíram para a classificação.
6. Marcadores não possuem necessariamente o mesmo peso.
7. Divergências relevantes de segmento, produto ou outros sinais específicos devem reduzir a afinidade, mesmo quando existirem coincidências amplas como UF e tributo.
8. Não usar porcentagem de relevância como se houvesse precisão matemática objetiva.
9. Quando uma nova versão da publicação surgir, a afinidade deve ser **recalculada para a nova versão**; o resultado anterior permanece associado ao histórico da versão correspondente.
10. O usuário deve conseguir acessar a legislação a partir da visão de afinidade e também navegar pelo acervo por marcadores.

## Escopo por empresa e estabelecimento

A afinidade deve ser calculada no nível do estabelecimento quando os dados permitirem.

Exemplo conceitual:
- norma de ICMS-GO pode ter afinidade alta para uma filial em Goiânia/GO;
- a mesma norma pode ter afinidade baixa ou nenhuma identificação material para estabelecimentos em Cuiabá/MT ou Luís Eduardo Magalhães/BA;
- na visão consolidada da empresa, a publicação continua aparecendo quando ao menos um estabelecimento possuir afinidade.

A interface consolidada deve permitir identificar **qual estabelecimento** motivou a associação.

## Perfil Tributário e sinais

### CNPJ

O CNPJ possui finalidade específica de **detecção de citação exata** da empresa ou estabelecimento em publicações/diários oficiais. Essa identificação é diferente de inferências por segmento ou atividade.

O peso final dessa citação exata ainda será definido no desenho do motor.

### CNAE, atividade e segmento

- CNAE é dado de entrada do perfil.
- CNAEs devem ser convertidos/classificados em **atividades** e **segmentos** úteis à inteligência tributária.
- CNAE, atividade derivada e segmento derivado pertencem à mesma família semântica e **não devem gerar múltipla contagem artificial apenas por derivarem do mesmo dado**.
- A fonte e a regra de transformação CNAE → atividade/segmento permanecem para desenho específico.

### UF e estabelecimentos

UF e estabelecimento integram o perfil e suportam a análise geográfica e a identificação de qual unidade pode estar relacionada à publicação.

### Produto e NCM

Produto e NCM são dimensões distintas e complementares:

- quando a legislação trouxer **NCM**, o Sonar deve usar essa informação como marcador/sinal específico e compará-la com os NCMs do perfil;
- quando a legislação mencionar o **produto nominalmente**, sem depender de NCM, deve existir marcador de produto correspondente;
- a publicação precisa preservar evidência suficiente para saber que aquele NCM ou produto foi efetivamente citado.

Exemplos conceituais informados pelo responsável pelo produto:
- Convênio ICMS 100: produtos podem aparecer nominalmente por extenso;
- Convênio ICMS 52/91: há listas de NCMs.

Produtos e NCMs também serão **dimensões de diferenciação entre assinaturas**. Os planos, limites e combinações ainda não foram definidos.

## Marcadores da publicação

Categorias já aprovadas/consolidadas para o Sonar:

- **Geografia** — ex.: GO;
- **Tributo** — ex.: ICMS;
- **Tema** — ex.: benefício fiscal;
- **Operação** — ex.: venda interestadual;
- **Produto** — ex.: fertilizantes;
- **NCM** — código/classificação quando a norma o trouxer;
- **Segmento** — ex.: agronegócio;
- **Documento fiscal** — ex.: NF-e;
- **Obrigação** — ex.: EFD ICMS/IPI;
- **Reforma tributária** — ex.: IBS;
- **Conceito fiscal** — pelo menos benefício fiscal, alíquota e base de cálculo.

O vocabulário deve ser controlado. IA pode atribuir marcadores existentes com evidência; não deve inventar livremente novas categorias em produção.

Relações previstas continuam compatíveis com:
- APLICA;
- EXCLUI;
- EXCEÇÃO;
- CONDIÇÃO;
- MENÇÃO.

## Peso e afinidade

A regra aprovada é qualitativa:
- nem todo marcador tem o mesmo peso;
- sinais específicos podem valer mais que sinais amplos;
- incompatibilidades específicas podem reduzir a afinidade mesmo com coincidência de UF/tributo;
- o usuário deve entender **por que** a publicação recebeu Alta, Média ou Baixa afinidade.

**Ainda não estão definidos:** pesos numéricos, limiares, fórmula, regras exatas de combinação ou algoritmo.

Esses detalhes internos não devem ser expostos publicamente em nível que permita reproduzir o motor, mas a lógica geral precisa ser explicada ao cliente.

## Linguagem visual — proximidade do Sonar

A classificação funcional continua sendo **Alta**, **Média** ou **Baixa afinidade**. A metáfora visual aprovada para o Sonar é a **proximidade do sinal em relação ao centro**:

- **Alta afinidade** → sinal **próximo ao centro**;
- **Média afinidade** → sinal em **distância intermediária**;
- **Baixa afinidade** → sinal **distante**, em anel externo.

A proximidade é uma linguagem visual do produto e **não substitui os rótulos Alta/Média/Baixa**. O usuário sempre deve conseguir ler explicitamente o nível de afinidade.

O centro do sonar representa o **Perfil Tributário da empresa/estabelecimento** e a publicação é representada como um sinal posicionado conforme a classe de afinidade.

Os fatores que explicam o resultado podem ser apresentados ao usuário como **“sinais encontrados”**. Exemplos: UF coincidente, tributo, produto, NCM, operação, segmento, obrigação ou outro marcador relevante.

A interface deve preservar acessibilidade: cor, distância, posição ou animação nunca podem ser o único meio de comunicar o nível. O texto **Alta afinidade**, **Média afinidade** ou **Baixa afinidade** deve permanecer disponível.

A semântica de cor foi ratificada em 27/09/2026: **Alta = vermelho, Média = amarelo, Baixa = verde**. Cor nunca é o único meio de comunicação. Ícone, quantidade de anéis, animação, tamanho e comportamento responsivo continuam para desenho de UX/UI.

## Experiência do usuário

Na listagem ou área do Sonar, a publicação deve poder exibir:
- nível de afinidade: **Alta**, **Média** ou **Baixa**;
- principais motivos, apresentados quando adequado como **sinais encontrados**;
- estabelecimento(s) relacionado(s), quando aplicável;
- acesso à publicação;
- acesso aos marcadores envolvidos.

Exemplo conceitual:

> **Alta afinidade**  
> ICMS · Goiás · Fertilizantes · Produtor Rural  
> Estabelecimento relacionado: Goiânia/GO

O produto também deve permitir **navegação pelo acervo por marcadores**.

## Feedback do usuário e melhoria do motor

O usuário deve poder informar se o resultado foi ou não útil/relevante.

O TriBusca deve manter dados de feedback suficientes para permitir um **relatório de avaliação do Sonar**, que possa ser analisado com apoio de IA para identificar padrões, falsos positivos/falsos negativos e oportunidades de ajuste nas regras de afinidade.

A ideia aprovada é usar esse relatório para **revisar e aperfeiçoar** o motor. O modo exato de governança das alterações, papéis autorizados e processo de aprovação ainda precisa ser definido; não assumir autoajuste silencioso do algoritmo.

## Transparência para o cliente

Deve existir explicação acessível sobre:
- o que é o Sonar;
- quais tipos de informações entram na análise;
- por que resultados podem ser Alta/Média/Baixa afinidade;
- por que uma publicação pode ter afinidade diferente entre estabelecimentos;
- limitações do resultado.

Não é necessário divulgar pesos, fórmula ou detalhes suficientes para reproduzir o algoritmo.

Além da explicação dentro do produto, o site público deverá ter uma **página dedicada ao portfólio**, explicando cada produto em nível suficiente para o usuário entender seu valor e funcionamento, sem revelar propriedade intelectual desnecessária.

## Relação com assinaturas

### Decisões/direções confirmadas
- Produtos e NCMs serão diferenciais possíveis de profundidade entre assinaturas.
- A profundidade do Perfil Tributário pode ser usada para diferenciar planos.

### Proposta comercial ainda aberta
O número de **empresas e/ou estabelecimentos/filiais cadastrados** pode compor o preço da assinatura. A fórmula, franquias e nomes dos planos ainda não foram definidos.

Uma estrutura conceitual discutida, ainda não fechada como grade comercial:
- perfil básico: UF + CNAE/atividade/segmento + regime;
- perfil intermediário: acrescenta produtos, tributos, documentos e operações;
- perfil avançado: acrescenta NCM, CFOP, obrigações e características operacionais específicas.

## Dependências futuras

- taxonomia controlada de marcadores;
- perfil tributário de empresa/estabelecimentos;
- ligação empresa ↔ estabelecimento ↔ atributos;
- versionamento de publicação e marcadores;
- mecanismo de matching/afinidade explicável;
- API do produto;
- UX de listagem, detalhe e exploração por marcadores;
- telemetria/feedback;
- governança para ajustes do motor.

## Questões abertas

1. Pesos, limiares e fórmula de Alta/Média/Baixa.
3. Fonte e transformação CNAE → atividade/segmento.
4. Vocabulário inicial completo de conceitos fiscais e suas relações.
5. Tratamento de famílias de produto, NCM pai/filho e correspondências parciais.
6. Estrutura detalhada do feedback/relatório, papéis autorizados e rito de aprovação de mudanças; permanece vedado autoajuste silencioso.
7. Planos, franquias e preço por profundidade de perfil, empresa e estabelecimento.
8. Quais recursos de exploração por marcadores estarão disponíveis em cada plano.
9. Momento técnico de classificação dos marcadores antes da publicação ficar visível.

## Avaliação de impacto

| Área | Impacto |
| --- | --- |
| Arquitetura | **Sim, futuro** — matching por versão, empresa e estabelecimento. |
| Dados | **Sim, futuro** — taxonomia, marcadores, perfis, associações, afinidade e feedback. |
| API | **Sim, futuro** — resultados, motivos, filtros, marcadores e navegação. |
| Coleta | **Sim, futuro** — publicação precisa chegar ao produto com marcadores disponíveis; o ponto exato do pipeline será desenhado em Issue técnica. |
| IA | **Sim, futuro** — atribuição assistida de marcadores e análise de feedback, sempre com governança. |
| UX | **Sim, futuro** — níveis de afinidade, motivos, estabelecimentos, filtros e navegação por marcadores. |
| Site/comercial | **Sim** — Sonar entra no portfólio; página dedicada ao portfólio deve explicar os produtos sem expor algoritmo. |
| Custos | **Sim, futuro** — volume de matching cresce por empresas/estabelecimentos; Sonar não consome créditos do usuário. |
| Segurança | **Sim, futuro** — perfil tributário e dados de empresas/estabelecimentos são dados tenant-specific e devem respeitar isolamento. |
| Prioridades | **Não** — não altera DOE-SP nem a macrofase dos DOEs. |
| Roadmap | **Sem mudança de ordem** — detalha a frente de relevância já prevista. |

## Limite desta decisão

Nenhuma destas definições autoriza implementação de backend, frontend, migração, deploy ou mudança de prioridade. A implementação requer Issue própria e direcionamento do Gerente Geral.


## GOV-03 — interpretação qualitativa aprovada

- **Alta / vermelho:** sinal específico forte.
- **Média / amarelo:** relação relevante mais geral ou incompleta.
- **Baixa / verde:** coincidência ampla.
- **Dados insuficientes:** falta de informação suficiente para classificar; não é Baixa.
- sempre exibir **sinais encontrados** e rótulo textual;
- não apresentar porcentagens nem pesos numéricos como precisão aprovada;
- feedback pode motivar mudanças, mas somente por processo governado e rastreável.
