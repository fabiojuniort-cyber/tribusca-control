# Revela

**Frente:** PROD-01  
**Issue:** [#7](https://github.com/fabiojuniort-cyber/tribusca-control/issues/7)  
**Estado:** **DECISÃO APROVADA**  
**Implementação:** **NÃO COMPROVADA / NÃO AUTORIZADA NESTA FRENTE**

## Nome e proposta

**Revela** é o boletim tributário personalizado do TriBusca.

Sua proposta é manter o cliente atualizado diariamente sobre publicações que merecem atenção para sua empresa, usando os resultados do **Sonar — Afinidade Tributária** e sinais de **menção direta**.

## Regra de inclusão aprovada

O boletim diário deve reunir, desde o boletim anterior:

1. publicações classificadas pelo **Sonar** como **Alta afinidade** para a empresa ou qualquer de seus estabelecimentos;
2. publicações com **menção direta** à empresa ou estabelecimento, mesmo que não estejam classificadas como Alta afinidade.

Menção direta é um gatilho próprio de inclusão e não deve ser apresentada ao usuário apenas como “mais um peso” do Sonar.

### Menção direta

No desenho já aprovado do Perfil/Sonar, o **CNPJ** possui finalidade específica de detectar citação exata da empresa ou estabelecimento em publicações e diários oficiais. Portanto, citação exata de CNPJ é um sinal mínimo aprovado para o Revela.

Outros identificadores capazes de caracterizar menção direta com segurança, como razão social/nome empresarial, ainda exigem regra específica para evitar falsos positivos.

## Relação com o Sonar

- **Sonar** calcula afinidade entre publicação e Perfil Tributário.
- **Revela** entrega diariamente os resultados prioritários ao usuário.
- Revela não recalcula afinidade e não substitui o Sonar.
- Uma publicação pode entrar no Revela por **Alta afinidade** ou por **menção direta**.

## Conteúdo funcional do boletim

Cada item deve permitir ao usuário entender rapidamente por que foi incluído e acessar a publicação no TriBusca.

Informações conceitualmente úteis:
- identificação da publicação;
- motivo de inclusão: Alta afinidade e/ou Menção direta;
- principais marcadores/motivos quando vier do Sonar;
- estabelecimento relacionado, quando aplicável;
- acesso à publicação no TriBusca.

A publicação completa continua no **Acervo**. O boletim funciona como canal de descoberta/entrega e pode levar o usuário ao **Decodifica** dentro da plataforma.

## Frequência

A frequência inicial aprovada é **diária**.

Horário, fuso, tratamento de dias sem itens, fins de semana/feriados e possibilidade futura de outras frequências permanecem em aberto.

## Transparência

O Revela deve distinguir claramente:
- item incluído por **Alta afinidade**;
- item incluído por **Menção direta**;
- item que tenha os dois motivos.

Essa separação evita confundir uma citação objetiva da empresa com uma inferência de afinidade do Sonar.

## Questões abertas

1. Horário padrão e possibilidade de personalização do envio.
2. Envio ou não de boletim quando não houver itens.
3. Tratamento de fins de semana e feriados.
4. Critérios seguros adicionais para menção direta além de CNPJ.
5. Regras para destinatários, múltiplos usuários e empresas/estabelecimentos.
6. Se Média afinidade poderá ser opcional em algum plano/configuração futura.
7. Assunto, identidade visual e microcopy final do e-mail.
8. Relação do Revela com planos/assinaturas.

## Avaliação de impacto

| Área | Impacto |
| --- | --- |
| Arquitetura | **Sim, futuro** — geração de boletim por tenant/usuário e período. |
| Dados | **Sim, futuro** — registrar itens elegíveis, envios e motivos de inclusão. |
| API | **Sim, futuro** — preferências e consulta do boletim/histórico. |
| Coleta | **Indireto** — depende das publicações e marcadores já processados. |
| IA | **Não obrigatória para a regra base**; pode apoiar resumo futuro se aprovado. |
| UX | **Sim, futuro** — preferências, histórico e ligação com Acervo/Sonar. |
| Site/comercial | **Sim** — produto/capacidade comunicável como atualização tributária personalizada diária. |
| Custos | **Sim, futuro** — serviço de e-mail e volume de envios. |
| Segurança | **Sim, futuro** — conteúdo é personalizado por tenant/empresa/estabelecimento. |
| Prioridades | **Não** — não altera DOE-SP nem macrofase DOE. |
| Roadmap | **Sem mudança de ordem nesta decisão** — implementação depende das bases de Sonar/Perfil e de serviço de e-mail futuro. |

## Limite desta decisão

Esta definição não autoriza implementação de backend, frontend, e-mail, migrations, deploy ou contratação de serviço de envio. A implementação futura exige Issue própria.
