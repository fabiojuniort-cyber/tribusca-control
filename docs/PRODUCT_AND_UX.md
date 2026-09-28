# TriBusca — produto, recursos e experiência

> **Precedência WEB-02 (26/09/2026):** para a camada pública, definições conflitantes anteriores são substituídas pela seção **WEB-02 — interface pública aprovada em 26/09/2026**. O restante deste documento continua vigente para produto autenticado.

Atualizado em 27/09/2026. Registro das decisões comunicadas pelo responsável pelo produto. Este documento descreve direção aprovada, não afirma que os recursos estejam implementados. A implementação verificada permanece em [PROJECT_STATE.md](../PROJECT_STATE.md), Issues e repositórios de código.

## Propósito e fluxo

TriBusca — **Monitoramento e Inteligência Tributária**. Coleta global única das fontes oficiais → normalização → deduplicação/versionamento → taxonomia → perfil tributário → relevância → compreensão → análise/impacto. O cliente deve responder o que mudou, por que importa, quando vale, quem pode ser afetado, qual é a fonte, por que o assunto foi priorizado e o que precisa analisar. Tenant é conta SaaS; company é empresa monitorada.

## Navegação e estados do painel

Navegação autenticada planejada:

| Grupo | Áreas |
| --- | --- |
| Visão geral | Início |
| Inteligência | Publicações, Acervo |
| Monitoramento | Central de Monitoramento, Fontes Oficiais |
| Organização | Empresas, Estabelecimentos, Perfil Tributário |
| Administração | Configurações |

Tenant ativo é contexto da conta; empresa ativa é filtro/contexto da análise. Separar na interface **fato oficial**, **inteligência TriBusca** e **conteúdo gerado por IA**. Central de Monitoramento distingue saúde operacional (runs, attempts, última tentativa, indisponibilidade, latência) de cobertura legislativa. Mostrar honestamente SUCCESS_NO_RESULTS, SOURCE_UNAVAILABLE, FETCH_FAILED, PROCESSING_FAILED e PARTIAL_SUCCESS; falha de fonte não é ausência de publicações.

Frontend definitivo: React, TypeScript, Vite, React Router, TanStack Query, Tailwind, Radix UI, shadcn/ui, Lucide, ESLint, Prettier, Vitest, Testing Library, MSW. Sistema de interface v1 proposto/aprovado como base: Inter, tokens e componentes Button, Input, Select, Badge, Tabs, Card, Table, Drawer, Dialog, Sheet, Tooltip, Toast, Pagination, EmptyState e Skeleton; filtros/URLs, responsividade e acessibilidade. A identidade visual final deve usar o [manual de marca](BRAND_MANUAL_V1.md). O protótipo Railway é referência funcional, **não** referência visual final; o usuário avaliou que o site ainda está longe do resultado desejado.

## Inteligência tributária aprovada conceitualmente

1. **Marcadores tributários**: vocabulário controlado, não tags livres. Categorias: tributo, tema, conceito fiscal, operação, segmento, produto, NCM, documento fiscal, obrigação, esfera, geografia e reforma. Exemplos: `TRIB_ICMS`, `TEMA_BENEFICIO_FISCAL`, conceitos como alíquota e base de cálculo, `SEG_AGRO`, `PROD_FERTILIZANTE`, NCM quando citado, `DOC_NFE`, `OBR_EFD`, `REFORMA_IBS`. IA pode selecionar marcadores existentes, não inventar novos. Relações previstas: APLICA, EXCLUI, EXCEÇÃO, CONDIÇÃO, MENÇÃO; guardar evidência/trecho/dispositivo quando possível.
2. **Perfil tributário**: CNPJ, regime, CNAEs, atividades, segmentos, estabelecimentos e UFs; progressivamente produtos, NCMs, operações, CFOPs, tributos, documentos e obrigações. Não exigir tudo no onboarding. Operação não é CFOP: relação futura muitos-para-muitos; CFOP temporal e baseado em fonte oficial.
3. **Sonar — Afinidade Tributária.** Nome comercial aprovado para o motor de afinidade tributária. Funciona automaticamente, sem consumo de créditos, cruzando marcadores da publicação com o Perfil Tributário da empresa e de seus estabelecimentos. O resultado é classificado em **Alta, Média ou Baixa afinidade**, sempre com motivos verificáveis e sem porcentagem artificial. A análise deve considerar empresa e estabelecimento; uma publicação pode ser relevante para uma filial e não para outra, permanecendo visível na consolidação quando ao menos um estabelecimento tiver afinidade. Marcadores têm pesos diferentes e incompatibilidades específicas de segmento/produto podem reduzir a afinidade mesmo com coincidência de UF/tributo. CNPJ serve para detectar citações exatas; CNAE alimenta atividades/segmentos da mesma família sem contagem duplicada artificial; NCM e produto nominal são sinais distintos e complementares. Nova versão da publicação exige novo cálculo de afinidade. O usuário poderá navegar pelos marcadores e fornecer feedback para relatórios de melhoria do motor. A linguagem visual do Sonar usa a metáfora de **proximidade ao centro**: Alta afinidade = sinal próximo; Média = distância intermediária; Baixa = sinal distante. Os fatores explicativos podem ser apresentados como **sinais encontrados**. Essa metáfora não substitui os rótulos Alta/Média/Baixa e não pode depender apenas de cor ou posição. Ver [Sonar](product-tools/SONAR.md).
4. **Revela**: boletim tributário personalizado **diário**. Reúne as publicações classificadas como **Alta afinidade** pelo Sonar desde o boletim anterior e também publicações com **menção direta** à empresa/estabelecimento, mesmo quando não houver Alta afinidade. Menção direta é um gatilho próprio, distinto do score/nível do Sonar; citação exata de CNPJ é o sinal mínimo já aprovado. Cada item deve indicar por que entrou no boletim e levar à publicação no TriBusca. Ver [Revela](product-tools/REVELA.md).
5. **Decodifica**: nome comercial aprovado para a funcionalidade anteriormente chamada Norma Clara. Fica dentro da publicação autenticada e é acionada **sob demanda** por botão no início da base legal. A integração futura com a OpenAI API gera uma explicação/tradução em linguagem clara; o resultado é persistido. Ao retornar, o usuário que já acionou a função encontra o conteúdo disponível. Outro usuário não o vê automaticamente antes de clicar; ao clicar, se já existir resultado reutilizável para o mesmo conteúdo aplicável, o TriBusca deve reaproveitá-lo em vez de consumir nova chamada à API. O acionamento cobre o dispositivo/base legal completa e a apresentação ocorre em blocos de artigo em artigo. O consumo comercial usa créditos vinculados à assinatura: **1 crédito = até 25.000 caracteres**, com mínimo de 1 crédito e arredondamento para cima por faixa adicional de 25.000 caracteres. O custo deve ficar visível antes do acionamento no próprio botão, no padrão **`Decodificar (N créditos)`**; por exemplo, **`Decodificar (4 créditos)`**. Próximo ao custo deve existir um **controle de ajuda discreto** explicando a regra de cálculo dos créditos, acessível sem sair da página. Mesmo quando o resultado global já existir e for reaproveitado sem nova chamada à OpenAI, o uso continua consumindo os créditos correspondentes da assinatura. A quantidade de créditos de cada plano ainda **não foi definida**. Se a norma for alterada ou retificada, a tradução anterior deve permanecer disponível, vinculada à versão que a originou e claramente marcada como **desatualizada** em relação ao texto oficial vigente. Nessa situação, o botão volta a mostrar o custo para traduzir novamente e a nova cobrança/processamento comercial considera **o conteúdo completo da versão vigente**, não apenas os trechos alterados. Na versão vigente já traduzida para aquele usuário, o botão mostra **“Traduzido”**; quando ainda não traduzida, mostra **`Decodificar (N créditos)`**. A granularidade técnica da chamada/persistência, a base exata de contagem e a política para mudanças apenas de engine/prompt/modelo continuam **em aberto**. Ver [Decodifica](product-tools/DECODIFICA.md).
6. **IA futura**: pode resumir, extrair assunto/vigência/operações/produtos/obrigações e apontar possíveis áreas afetadas (SAP, J1BTAX, pricing, cadastro fiscal, NF-e, DRC etc.) com evidência e grau de certeza. Não inventar impacto quando faltarem provas.

## Status e fronteiras

Esses itens são decisões de produto, não componentes produtivos. API do produto com `/publications`, `/sources`, `/monitoring/overview` e `/companies` foi proposta, **não** incorporada à main na última verificação comunicada; revalidar antes de implementar. A prioridade atual é fechar DOE-SP e os 27 DOEs. Antes de construir taxonomia, Sonar, Decodifica ou frontend, abrir Issue própria com desenho físico/contrato e critérios. Não converter o modelo conceitual em schema gigante prematuramente.


## Acervo

**Acervo** é uma área estrutural do TriBusca, não um produto com nome comercial próprio.

Seu papel é permitir consulta organizada ao conteúdo oficial já coletado e preservado pelo TriBusca, incluindo publicações, versões, origem oficial, marcadores e demais metadados disponíveis. O Acervo deve funcionar como base de consulta e navegação, inclusive servindo de ponto de acesso para funcionalidades como Sonar e Decodifica.

Diretrizes aprovadas:
- manter o nome simples **Acervo**;
- não criar submarca ou nome comercial específico;
- preservar rastreabilidade até a fonte oficial;
- incluir **Busca** como função interna do Acervo, e não como área ou produto separado;
- permitir pesquisa, navegação e filtros compatíveis com os marcadores e metadados existentes;
- exibir histórico/versionamento quando aplicável;
- não confundir Acervo com Sonar: o Acervo organiza e disponibiliza o conteúdo; o Sonar calcula afinidade com a empresa.


## Reforma Tributária — página temática

**Reforma Tributária** é uma página temática pública de dados, não um produto ou submarca. Ela organiza um recorte do Acervo reunindo legislação, regulamentação, notas técnicas e demais publicações oficiais relacionadas, com **timeline** capaz de distinguir datas de publicação, início de vigência, marcos de implementação e faseamento. O conteúdo deve preservar fonte oficial, histórico/versionamento e não duplicar fisicamente o Acervo. Ver [Página Reforma Tributária](product-tools/REFORMA_TRIBUTARIA.md).

## WEB-02 — interface pública aprovada em 26/09/2026

**Origem:** responsável pelo produto (usuário). **Registro completo:** [WEB-02](WEB_02_DESIGN_ALIGNMENT.md). Esta seção substitui as partes conflitantes da experiência pública anterior; o histórico permanece em `DECISIONS.md`.

- Navegação pública: **Cobertura · Portfólio · Como funciona · Reforma Tributária**, em rotas dedicadas.
- Header: assinatura horizontal oficial + botões **Entrar** e **Criar conta**. O CTA “Experimentar grátis” deixa de ser o CTA primário do header, sem extinguir o trial de 7 dias da D-011.
- Autenticação pública: Entrar/Criar conta/Recuperar senha/Nova senha em modal. Apenas Entrar possui contrato backend comprovado nesta frente: **POST `/auth/login`**. Não inventar cadastro/reset.
- Criar conta/Nova senha: confirmar senha e requisitos em tempo real; a D-058 ratificou mínimo de 8 caracteres, maiúscula, minúscula, número e caractere especial. A ativação continua dependente da Issue #9.
- Home estadual: 5 UFs, SP fixo em primeiro e 4 sorteadas; fotos licenciadas do Wikimedia Commons; área de publicações usa **“—”** enquanto a API pública ainda não estiver integrada ao frontend.
- Portfólio público: **Acervo, Central de Monitoramento, Sonar, Revela, Decodifica, Perfil Tributário**. **WEB-03 substitui o claim do draft:** todos os seis recursos ficam como **Em desenvolvimento** até comprovação operacional e autorização específica de publicação.
- Sonar mantém Alta/Média/Baixa + proximidade. A WEB-05 / D-053 ratificou conceitualmente a exceção semântica restrita ao Sonar: Alta `#C92A2A`, Média `#9A6900`, Baixa texto `#237032` e ping `#2B8A3E`; rótulo textual e proximidade permanecem obrigatórios. A verificação independente final ainda está pendente.
- Decodifica: carrossel de cinco exemplos Texto oficial × Leitura auxiliar definidos no registro WEB-02, sempre com aviso de IA.
- Revela: exemplo de boletim diário com Alta afinidade e Menção direta.
- Cobertura: serviços federais e 27 UFs em cards de largura total; métricas reais somente quando houver contrato de API, caso contrário **“—”**.
- Reforma Tributária: timeline em **Publicação / Vigência / Marco previsto em lei**, com datas apenas de fonte oficial do Acervo.

**Impacto:** Router, header, modais, conteúdo, estados, acessibilidade e futuras integrações de API. A D-043 foi substituída pela D-051 quanto aos claims de disponibilidade; a D-044 foi ratificada conceitualmente pela D-053 com ajustes. **Próximo passo:** revisão independente final do head WEB-05; sem merge/publicação definitiva.


### WEB-03 — status público dos recursos

**Data/origem:** 26/09/2026, decisão do Gerente.  
**Definição anterior:** D-043 levou ao draft o status **Disponível** para Acervo e Central de Monitoramento, sujeito a confirmação antes do merge.  
**Nova definição:** a confirmação não foi concedida. **Acervo, Central de Monitoramento, Sonar, Revela, Decodifica e Perfil Tributário** permanecem todos como **Em desenvolvimento** no site público. Uma página, demonstração, placeholder ou contrato em draft não é prova de funcionalidade acessível.

**Impacto:** somente claim/status público; não reduz o escopo conceitual dos produtos. **Próximo passo:** manter o PR #1 em draft, com Issue #10 e revisão visual/funcional como gates separados. Ver D-051.


### WEB-05 — gate de lançamento e revisão

**Head implementado:** `f92fbea8a8b748d9a7e4093ed8a19560f4ef152d` · CI #38 `36361749038` = SUCCESS.

A11Y/Branding corrigidos no draft: carrossel com alvos ≥24px e foco visível; estados de senha e bordas de input com contraste adequado; footer com assinatura escura oficial; Inter empacotada localmente; Sonar com valores ratificados pela D-053.

**Cadastro público:** a Issue #9 continua sendo gate. Pela D-054, se houver lançamento do site antes de cadastro funcional e validado, **“Criar conta” deve ser substituído temporariamente por “Em breve” antes da publicação definitiva**. Essa troca é uma regra condicional de lançamento e **não está implementada no head WEB-05**.

**Próximo passo:** revisão independente no preview temporário. Não declarar a WEB concluída antes desse parecer.


## GOV-03 — refinamentos aprovados em 27/09/2026

Esta seção prevalece sobre passagens anteriores que mantinham estes pontos como provisórios ou abertos.

### Sonar

- existe um estado separado **Dados insuficientes**; ele não equivale a Baixa afinidade;
- preservadas as cores ratificadas na D-053, **Alta** representa sinal específico forte;
- **Média** representa relação relevante mais geral ou incompleta;
- **Baixa** representa coincidência ampla;
- o resultado sempre mostra rótulo textual e **sinais encontrados**;
- porcentagens e pesos numéricos não são apresentação aprovada ao cliente;
- feedback serve para avaliação e mudanças governadas; não existe autoajuste silencioso.

A D-059 não fecha pesos, limiares ou fórmula. A revisão independente visual/acessível da D-053 continua pendente na Issue #10.

### Revela

- envio padrão às **08h de Brasília**;
- funciona em qualquer dia em que existam itens;
- não envia boletim vazio;
- mantém histórico;
- administrador seleciona destinatários e cada usuário controla o próprio recebimento;
- cada item informa empresa/estabelecimento relacionado e o motivo;
- na v1, menção direta exige **CNPJ exato**;
- **Média afinidade não entra** no boletim inicial.

### Decodifica

A base comercial de caracteres é o **texto oficial normalizado completo**, incluindo título, artigos e anexos materiais integrantes; HTML, metadados, URLs e espaços repetidos não entram. Divisão técnica de atos extensos não muda o custo integral.

Créditos só são debitados quando o resultado é entregue. Falha, timeout e cancelamento não consomem; reutilização global efetivamente entregue continua consumindo. Mudança apenas de modelo/prompt não torna o resultado obsoleto; mudança do conteúdo oficial torna. Invalidação excepcional por erro, segurança ou qualidade registra a causa.

Créditos da assinatura renovam mensalmente sem acumular. Créditos extras podem ser comprados; validade e ordem de consumo dos extras permanecem abertas.

### Reforma Tributária

Escopo inicial: legislação constitucional/complementar, CGIBS, Receita Federal, CONFAZ relacionado, notas técnicas NF-e/CT-e/NFS-e/SPED e publicações marcadas IBS/CBS/IS/Reforma. Navegação: **Últimas publicações · Legislação · Regulamentação · Notas técnicas · Timeline**. A inclusão é baseada em marcadores; destaque editorial é evolução futura, não implementação atual.

### Acervo público, autenticação e trial

O Acervo público expõe título, data, órgão e link oficial; **texto integral e busca avançada exigem autenticação**. O trial de 7 dias sem cartão começa após verificação do e-mail + primeiro cadastro de empresa. O formulário inicial usa nome, e-mail profissional, senha e CNPJ opcional; primeiro usuário = administrador. Ao adicionar CNPJ matriz/filial, tentar obter CNAE/endereço automaticamente de fonte disponível. Empresa sem CNPJ permanece questão aberta.

A D-054 continua sendo o gate de lançamento: se o site for publicado antes de cadastro funcional da Issue #9, **Criar conta → Em breve**. Preview, página, PR ou contrato em draft não equivale a disponibilidade.


### Dependências do Acervo público após D-057/D-058

- publicação **não fiscal** preservada somente por CNPJ exato é privada da respectiva conta; a API pública atual não possui filtro fiscal/tenant para essa nova categoria;
- antes de esse tipo de registro poder alimentar o Acervo público, é necessária **Issue técnica + gate de isolamento**;
- a D-058 aprovou para exibição pública somente **título, data, órgão e link oficial**;
- o contrato atual de `GET /public/v1/publications` também retorna `id`, `actType`, `actNumber`, `uf` e `effectiveOn`;
- a existência desses campos adicionais na API não amplia automaticamente a regra de exibição da D-058; a decisão de produto permanece aberta.
