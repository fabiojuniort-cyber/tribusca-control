# TriBusca — site público, comercial e direção de layout

> **Precedência WEB-02 (26/09/2026):** em qualquer conflito entre diretrizes históricas deste documento e a seção **WEB-02 — diretrizes públicas que substituem o layout anterior**, prevalece a WEB-02. O texto anterior é mantido apenas como histórico.

Atualizado em 27/09/2026. Decisões de produto/layout comunicadas pelo responsável. **Site público retomado em 26/09/2026 por autorização do responsável pelo produto na WEB-01.** A implementação pública pode avançar em paralelo como camada de comunicação/descoberta, sem afirmar que recursos autenticados ou integrações futuras estejam disponíveis. A estrutura abaixo é direção conceitual; não tratar o protótipo Railway como design aprovado.

## Objetivo e conteúdo

Promessa: encontrar o que importa no meio do ruído, ligar monitoramento tributário à fonte oficial e explicar a relevância. Hero aprovado conceitualmente:

> Saiba o que mudou. Entenda o que importa. Chegue à fonte oficial.

Estrutura planejada: hero → cobertura estadual → cobertura federal → soluções/portfólio → como funciona → relevância → rastreabilidade/confiança → CTA. O site deve mostrar as fontes e capacidades reais, sem afirmar número de publicações, APIs ou consultas antes de conferir dados produtivos. Manter páginas separadas quando necessário para não sobrecarregar a home. Rodapé e textos sucintos.

## Cobertura visual e interação

Direção do carrossel de UFs comunicada anteriormente: São Paulo primeiro; demais UFs em ordem variável, controles discretos e ciclo de 15 segundos. Preferência por imagens reais das capitais na área de cobertura estadual. Brasília foi removida da capa anterior e São Paulo ganhou destaque. Esses detalhes são direção histórica de conteúdo; **a composição visual do site definitivo precisa de nova revisão**, pois o usuário rejeitou a qualidade visual do protótipo. Não usar o protótipo como referência visual final.

Portfólio na home: destacar até cinco recursos e oferecer “e outras ferramentas”, sem anunciar função futura como já disponível. O site público deverá ter também uma **página dedicada ao portfólio**, explicando de forma compreensível o que cada produto faz e como gera valor, sem expor pesos, fórmulas, algoritmo ou detalhe suficiente para reproduzir a inteligência interna. Mostrar saúde das fontes, publicações oficiais, busca, rastreabilidade e inteligência apenas conforme implementação comprovada.

## Conversão e marca

Trial aprovado: **7 dias**. CTA: **“Experimentar grátis”**; microcopy possível: “7 dias para conhecer o TriBusca.” Não reintroduzir como estratégia pública “Ato do Dia” gratuito, tradução pública sem login ou “Jurídico Claro” público sem nova decisão. **Decodifica**, **Sonar** e **Revela** são recursos do TriBusca; não anunciar como disponíveis antes de implementação comprovada. O Sonar deve ser explicado comercialmente como afinidade entre publicação e perfil da empresa/estabelecimentos, sem divulgar fórmula interna. Sua linguagem visual pode usar a ideia de **proximidade do sinal ao centro do sonar** para representar Alta/Média/Baixa afinidade, sempre acompanhada do rótulo textual e dos principais **sinais encontrados**. O Revela deve ser explicado como atualização tributária diária personalizada, baseada em Alta afinidade do Sonar e menções diretas à empresa/estabelecimentos. Não usar “Degustação Free” como item do menu.

Todas as páginas, login, aplicativo e peças devem partir dos arquivos oficiais e regras do [Manual de Marca v1](BRAND_MANUAL_V1.md). Território: descoberta e inteligência; descriptor “Monitoramento e Inteligência Tributária”. Preservar grafia **TriBusca**. A [lista de ativos oficiais](BRAND_ASSETS.md) aponta para o kit original. Não criar sub-marcas nem novo logo para cada recurso.

## Pendências

A API pública D-050 está mergeada/deployada e validada no backend. WEB-11 integrou **`GET /public/v1/sources`** na página Cobertura; **origens CORS reais e rate limit** continuam condicionados às respectivas frentes técnicas. Frontend autenticado e disponibilização produtiva dos recursos seguem condicionados aos seus próprios gates. O protótipo anterior não vira referência visual por esta retomada.


## Página Reforma Tributária

O site público terá uma página dedicada à **Reforma Tributária**, tratada como página temática de dados e não como produto. Ela deverá reunir o recorte do Acervo relacionado à reforma — legislação, regulamentação, notas técnicas e outras publicações oficiais — e apresentar uma timeline que diferencie publicação, vigência, marcos e faseamento. Não criar submarca própria nem apresentar cronograma especulativo como fato.

## WEB-02 — diretrizes públicas que substituem o layout anterior

**Data/origem:** 26/09/2026, responsável pelo produto (usuário). Registro detalhado de definição anterior → nova definição, impacto e próximo passo em [WEB-02](WEB_02_DESIGN_ALIGNMENT.md).

1. Menu: **Cobertura · Portfólio · Como funciona · Reforma Tributária**, cada um com página própria.
2. Header: logo horizontal oficial + **Entrar**. Enquanto a Issue #9 estiver aberta, D-054 substitui cadastro público acionável por **Em breve**. O trial futuro continua regido pela D-058, mas não é anunciado como ativo.
3. Entrar funciona em modal e usa somente **POST `/auth/login`**. Enquanto #9 estiver aberta, cadastro e recuperação aparecem como **Em breve** e não abrem fluxos públicos funcionais.
4. Home: carrossel visual de 5 UFs, SP sempre primeiro/Ponte Estaiada, 4 UFs sorteadas e fotos reais/licenciadas; publicações estaduais ficam como **“—”** enquanto não houver API.
5. Home/Portfólio: seis recursos — Acervo, Central de Monitoramento, Sonar, Revela, Decodifica e Perfil Tributário. **WEB-03: todos = Em desenvolvimento** até comprovação operacional e autorização específica de publicação.
6. Sonar: a WEB-05 / D-053 ratificou conceitualmente a exceção semântica restrita ao Sonar — Alta `#C92A2A`, Média `#9A6900`, Baixa texto `#237032` e ping `#2B8A3E` — sempre com rótulos textuais e proximidade; revisão independente final ainda pendente.
7. Decodifica: cinco exemplos legais aprovados em carrossel; Revela: boletim diário com Alta afinidade e Menção direta.
8. Cobertura: federais primeiro, depois 27 UFs/SP primeiro; cards full-width integrados a `GET /public/v1/sources`. Loading/refetch/erro = **“—”**; fonte prevista ausente de resposta válida = **Em implantação**.
9. Reforma Tributária: timeline separa **Publicação, Vigência e Marco previsto em lei**; sem datas sem evidência oficial.

**Próximo passo:** revisão independente final do head WEB-05. Sem merge/publicação definitiva. O gate de status foi resolvido pela WEB-03/D-051; a exceção do Sonar foi ratificada conceitualmente pela D-053, aguardando verificação final.


## WEB-03 — claims de disponibilidade

**Data/origem:** 26/09/2026, decisão do Gerente.

A D-043 registrou historicamente uma tentativa de apresentar **Acervo** e **Central de Monitoramento** como “Disponível” no draft WEB-02, condicionada a confirmação antes do merge. A confirmação não ocorreu.

**Definição vigente para o site público:** Acervo, Central de Monitoramento, Sonar, Revela, Decodifica e Perfil Tributário = **Em desenvolvimento**.

Não tratar existência de rota, mock, exemplo, placeholder, PR ou contrato em draft como evidência de funcionalidade acessível ao cliente.

**Impacto:** comunicação pública e badges/status. **Próximo passo:** CI + revisão visual/funcional; cores do Sonar seguem em avaliação na Issue #10. Sem merge/deploy.


## WEB-05 — lançamento e preview de revisão

**Data:** 27/09/2026.

O head `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d` está disponível somente em **preview temporário de revisão**, sem dados produtivos/secrets e sem equivaler a publicação definitiva.

**Regra de CTA — D-054:** WEB-11 implementou no release candidate a substituição de cadastro/trial público por **Em breve** enquanto a Issue #9 estiver aberta.

A Issue #10 está CLOSED/COMPLETED; WEB-11 preserva D-053 sem alteração.


## GOV-03 — autenticação, Acervo público e comercial

**Decisões aprovadas em 27/09/2026.** A WEB-05/D-054 já definiu o gate do CTA; esta seção completa as regras de acesso, trial e comercial sem alterar o frontend nesta atividade.

### Site antes da Issue #9

O **site informativo** pode ser publicado antes de a Issue #9 estar pronta, desde que tenha passado pelos gates de revisão aplicáveis. A D-054 exige que, enquanto cadastro real não estiver disponível, **“Criar conta” seja substituído temporariamente por “Em breve”** antes da publicação definitiva.

Isso não declara o site atual publicado: o preview/PR continua sujeito aos gates e nenhuma rota, mock, placeholder, demonstração ou PR transforma recurso em produto disponível.

### Acervo público x autenticado

Sem autenticação, o Acervo pode expor:
- título;
- data;
- órgão;
- link oficial.

**Texto integral** e **busca avançada** exigem autenticação.

### Cadastro e trial

Cadastro/trial só são ativados quando o contrato da Issue #9 estiver pronto.

- trial: **7 dias, sem cartão**;
- início: depois de **verificação do e-mail** e **primeiro cadastro de empresa**;
- formulário inicial: nome, e-mail profissional, senha e CNPJ opcional;
- senha: mínimo **8 caracteres**, com maiúscula, minúscula, número e caractere especial;
- primeiro usuário da conta: **administrador**;
- ao adicionar CNPJ de matriz ou filial, tentar obter **CNAE e endereço** automaticamente de fonte disponível.

CNPJ opcional no formulário não significa trial iniciado sem empresa. A regra de cadastro de empresa **sem CNPJ** permanece questão aberta.

### Público prioritário e planos

Cliente inicial prioritário: **departamentos fiscais/tributários de empresas**. A arquitetura deve permanecer compatível com atendimento a escritórios no futuro.

A grade comercial deverá ter **três níveis**, diferenciáveis por:
- empresas;
- estabelecimentos;
- profundidade do Perfil Tributário;
- Produto/NCM;
- créditos;
- usuários.

Credenciais da mesma pessoa não podem manter uso simultâneo; a ação exata ao ocorrer um segundo login ainda será definida.

A apresentação de preços deverá favorecer a escolha do nível intermediário ou superior, sem fixar valores nesta fase. **Nomes, preços, franquias e quantidade de créditos por plano dependem do piloto de custos e uso.**


### Gate de privacidade e campos do Acervo público

A D-057 permite preservar publicação não fiscal por menção exata a CNPJ, porém esse item é privado da conta correspondente. O contrato público D-050 atual trabalha com metadados globais e não possui filtro fiscal/tenant para essa nova categoria. Antes de tais registros poderem alimentar o Acervo público, deve existir **Issue técnica e gate que impeçam exposição pública de metadados**.

A D-058 aprovou no Acervo público apenas **título, data, órgão e link oficial**. O endpoint `GET /public/v1/publications` já retorna também `id`, `actType`, `actNumber`, `uf` e `effectiveOn`. Esses campos adicionais não devem aparecer publicamente por simples disponibilidade técnica; a ampliação da exibição depende de decisão de produto posterior.


## WEB-11 — release candidate

O draft do site passou a integrar dados operacionais públicos exclusivamente por `GET /public/v1/sources`. O status exibido é uma tradução de apresentação, sem alterar o backend. Dados ficam em `—` quando não existe resposta válida atual.

Enquanto Issue #9 estiver OPEN, cadastro, trial e recuperação não são anunciados como disponíveis. O site usa **Cadastro em breve** / **Recuperação de senha em breve**.

Preview: `https://web05-preview-production.up.railway.app`. O backend ainda não possui `PUBLIC_API_ALLOWED_ORIGINS` configurada; portanto dados live no preview dependem de liberar exatamente essa origin em gate separado. Não inventar domínio definitivo.

Head WEB-11: `a7303d14fc725adf4d590fc1e2f475405fd38bc1`. Próximo gate: revisão independente; sem merge/publicação definitiva.
