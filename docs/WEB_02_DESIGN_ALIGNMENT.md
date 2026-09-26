# WEB-02 — alinhamento do site público ao design aprovado

**Data:** 26/09/2026  
**Origem:** responsável pelo produto (usuário)  
**Frente:** WEB  
**Issue:** [#8](https://github.com/fabiojuniort-cyber/tribusca-control/issues/8)  
**Frontend:** [radar-fiscal-web PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1)

## Regra permanente da frente

Toda diretriz, decisão ou contexto definido pelo responsável pelo produto que divergir do que estiver gravado em `tribusca-control` ou `radar-fiscal-web` deve ser registrado **no mesmo marco**. O registro deve preservar histórico e conter data, definição anterior, nova definição, origem, impacto e próximo passo. Não apagar decisões antigas: marcar explicitamente o que foi substituído, refinado ou excepcionado.

Arquivos mínimos de governança quando afetados: `DECISIONS.md`, `docs/PRODUCT_AND_UX.md`, `docs/SITE_AND_MARKETING.md`, `docs/BRAND_MANUAL_V1.md` quando houver marca, `contexts/WEB.md`, `PROJECT_STATE.md`, `CONTEXT.md` e Issue #8. No frontend, manter `README.md` e documentação técnica coerentes com o comportamento do PR.

## Referência visual

O responsável definiu como referência visual aprovada os componentes/protótipos **TriBusca Home v2**, **TriBusca Portfolio**, **TriBusca Cobertura**, **TriBusca Como Funciona** e **TriBusca Reforma Tributaria**. A implementação deve seguir a especificação de layout, textos e estados comunicada pelo usuário nesta atividade. Esses artefatos de Design Components não substituem o Brand Kit oficial; quando houver conflito explícito, a divergência deve ser registrada e tratada pelo gate indicado.

## Registro de divergências

| # | Definição anterior | Nova definição — 26/09/2026 | Origem | Impacto | Próximo passo |
| --- | --- | --- | --- | --- | --- |
| 1 | PR #1 tinha navegação pública `Início · Portfólio · Reforma Tributária`, sem páginas Cobertura/Como funciona. | Menu superior: **Cobertura · Portfólio · Como funciona · Reforma Tributária**, com rotas `/cobertura`, `/portfolio`, `/como-funciona`, `/reforma-tributaria`. | Usuário | UX, Router, testes. | Implementar no draft PR; sem merge/deploy. |
| 2 | Header do PR #1 usava `tribusca-icon.png` isolado. | Header deve usar a assinatura horizontal oficial **`tribusca-logo-horizontal-light.png`**. | Usuário | Marca, assets, header. | Incluir o binário oficial no PR sem recriação. |
| 3 | D-011/PR #1 usavam CTA de header **Experimentar grátis**. | Canto superior direito: **Entrar** (secundário) + **Criar conta** (primário). O trial de 7 dias continua como diretriz comercial, mas deixa de ser o CTA principal do header. | Usuário | Site/comercial, header, auth UX. | Implementar no draft; preservar D-011 apenas fora do header. |
| 4 | PR #1 não implementava autenticação no site público. | Entrar, Criar conta, Recuperar senha e Nova senha devem abrir em **modal sobre a página**. Entrar consome apenas o endpoint existente **POST `/auth/login`** do backend. Não criar endpoints/autenticação paralelos. | Usuário | Frontend↔backend, segurança, UX. | Integrar login configurável por API base; cadastro/reset ficam estruturados sem endpoint fictício. |
| 5 | Não havia regra pública para confirmação/requisitos de senha. | Criar conta e Nova senha: **Confirmar senha** + requisitos visíveis e validação em tempo real: tamanho mínimo, maiúscula, minúscula, número e caractere especial. | Usuário | UX, validação, testes. | Implementar client-side; contrato definitivo de cadastro/reset permanece dependente do backend. |
| 6 | PR #1 não continha o carrossel estadual aprovado no design. | Home: carrossel com **5 UFs**, SP sempre primeiro com Ponte Estaiada; outras 4 sorteadas por carregamento; fotos reais Wikimedia Commons com autoria/licença; imagem cobre o card; cada card reserva área para últimas/principais publicações estaduais. | Usuário | Home, acessibilidade, conteúdo/licenças. | Implementar com dados editoriais e placeholders `—` quando não houver contrato de API. |
| 7 | Portfólio do PR #1 tinha 4 itens: Sonar, Revela, Decodifica e Acervo. | Home deve apresentar **6 recursos**: Acervo, Central de Monitoramento, Sonar, Revela, Decodifica e Perfil Tributário + link **Ver portfólio completo**. | Usuário | Produto/site, conteúdo. | Implementar home e portfólio coerentes. |
| 8 | PR #1 marcava todos os recursos como **Em desenvolvimento**. | WEB-02 levou ao draft **Acervo** e **Central de Monitoramento = Disponível**, condicionado a confirmação. **WEB-03/D-051 resolveu o gate: a confirmação não foi concedida e todos os seis recursos permanecem Em desenvolvimento.** | Usuário na WEB-02; decisão posterior do Gerente na WEB-03 | Claim comercial/status. | Histórico preservado; remover claim Disponível do draft/documentação. |
| 9 | Manual v1 restringia paleta central a azul/ciano/teal; D-033 não fixava cores do Sonar. | Sonar: **Alta = vermelho, Média = amarelo, Baixa = verde**, mantendo rótulo textual. | Usuário | Marca/UX/acessibilidade. | Implementar semanticamente no draft; **exceção de marca pendente de aprovação da frente Branding** antes do merge. |
| 10 | PR #1 mostrava estados/créditos do Decodifica, sem carrossel legal de 5 exemplos. | Decodifica: carrossel **Texto oficial × Leitura auxiliar** com 5 exemplos aprovados: Split payment (LC 214/2025 art. 31), Fato gerador (CTN art. 116), Crédito tributário (CTN art. 142), Cofins insumos (Lei 10.833/2003 art. 3º II), Compensação (Lei 9.430/1996 art. 74). Todos exibem **“Gerada por IA. Não substitui o texto oficial.”** | Usuário | Portfólio, conteúdo, IA labeling. | Implementar textos aprovados sem substituir o oficial. |
| 11 | Revela já era descrito como Alta afinidade + menções diretas, mas sem apresentação de boletim conforme design novo. | Revela deve mostrar **exemplo de boletim diário** com itens explicitamente marcados **Alta afinidade** e **Menção direta**. | Usuário | Produto/UX/site. | Implementar no portfólio sem simular envio real. |
| 12 | PR #1 não tinha rota Cobertura nem matriz federal + 27 UFs. | Página **Cobertura**: cards de largura total, primeiro serviços federais (DOU/INLABS, CONFAZ, NF-e/ENCAT, SPED, CGIBS, RFB), depois 27 UFs com SP primeiro. Campos: status da coleta (Online/Em validação/Em implantação), última atualização, importadas no dia, total no Acervo. Métricas reais somente com contrato de API; até lá **“—”**. | Usuário | Nova rota, dados/API futura, UX. | Implementar placeholders; não inventar endpoint. Abrir contrato backend quando houver autorização. |
| 13 | D-034/PR #1 tratavam timeline genericamente como publicação/vigência/marco/faseamento. | Reforma Tributária: timeline deve distinguir **Publicação / Vigência / Marco previsto em lei**; datas somente quando sustentadas por fonte oficial do Acervo. | Usuário | Reforma, dados, rastreabilidade. | Implementar estrutura sem cronograma especulativo. |

## Decodifica — textos aprovados para o carrossel

### 1. Split payment — IBS e CBS
**Texto oficial:** “Nas transações de pagamento relativas a operações com bens ou com serviços, os prestadores de serviços de pagamento eletrônico e as instituições operadoras de sistemas de pagamentos deverão segregar e recolher [...] os valores do IBS e da CBS.” — **LC 214/2025, art. 31.**

**Leitura auxiliar:** “No pagamento de uma compra, o valor do IBS e da CBS poderá ser separado automaticamente e enviado diretamente ao Fisco.”

### 2. Fato gerador
**Texto oficial:** “Salvo disposição de lei em contrário, considera-se ocorrido o fato gerador e existentes os seus efeitos [...] tratando-se de situação de fato, desde o momento em que se verifiquem as circunstâncias materiais necessárias [...].” — **CTN, art. 116.**

**Leitura auxiliar:** “Em regra, o imposto passa a ser devido quando acontece, na prática, a situação que a lei definiu como tributável.”

### 3. Crédito tributário
**Texto oficial:** “Compete privativamente à autoridade administrativa constituir o crédito tributário pelo lançamento, assim entendido o procedimento administrativo tendente a verificar a ocorrência do fato gerador [...] determinar a matéria tributável, calcular o montante do tributo devido [e] identificar o sujeito passivo [...].” — **CTN, art. 142.**

**Leitura auxiliar:** “Cabe ao Fisco formalizar a cobrança: ele verifica o fato tributável, calcula o imposto e identifica quem deve pagá-lo.”

### 4. Cofins — insumos
**Texto oficial:** “Do valor apurado [...] a pessoa jurídica poderá descontar créditos calculados em relação a [...] bens e serviços, utilizados como insumo na prestação de serviços e na produção ou fabricação de bens ou produtos destinados à venda [...].” — **Lei 10.833/2003, art. 3º, II.**

**Leitura auxiliar:** “A empresa pode descontar créditos de Cofins sobre determinados bens e serviços usados como insumos na sua atividade.”

### 5. Compensação
**Texto oficial:** “O sujeito passivo que apurar crédito [...] relativo a tributo ou contribuição administrado pela Secretaria da Receita Federal, passível de restituição ou de ressarcimento, poderá utilizá-lo na compensação de débitos próprios [...].” — **Lei 9.430/1996, art. 74.**

**Leitura auxiliar:** “Quem possui um crédito tributário reconhecido perante a Receita pode, observadas as regras legais, usá-lo para compensar débitos próprios.”

**Aviso em todos:** “Gerada por IA. Não substitui o texto oficial.”

## Gates

- Sem merge e sem deploy nesta atividade.
- Item 8 exige confirmação do Gerente antes do merge.
- Item 9 exige ratificação de Branding antes do merge ou remoção da exceção.
- Cadastro, recuperação e nova senha não devem inventar endpoint; somente o login usa o contrato comprovado `POST /auth/login`.
- Dados dinâmicos de Cobertura dependem de contrato explícito de API.


## Evidência de implementação — 26/09/2026

Frontend: [radar-fiscal-web PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1)  
Branch: `feat/web-01-site-publico`  
Head verificado: `8167fff49cf2ba254b8d64075724df1f0331e40e`  
GitHub Actions: run `36260136076` — **SUCCESS**.

Passaram:
- instalação;
- typecheck;
- testes Vitest/Testing Library;
- build Vite.

A implementação inclui as definições 1–13, com os seguintes limites deliberados:
- cadastro, recuperação e nova senha não chamam endpoints inexistentes;
- status operacional e métricas de Cobertura permanecem `—` até consumo do contrato D-050 / Issue #11;
- WEB-03/D-051 resolveu o antigo gate: Acervo/Central e os demais quatro recursos ficam todos como `Em desenvolvimento`;
- vermelho/amarelo/verde do Sonar permanece gate Branding / Issue #10;
- nenhum merge ou deploy foi executado.

Dependências abertas:
- [Issue #9](https://github.com/fabiojuniort-cyber/tribusca-control/issues/9) — cadastro/recuperação/nova senha;
- [Issue #10](https://github.com/fabiojuniort-cyber/tribusca-control/issues/10) — ratificação cromática do Sonar;
- [Issue #11](https://github.com/fabiojuniort-cyber/tribusca-control/issues/11) — API pública read-only para Cobertura/Acervo.

**Próximo gate:** Gerente revisar os claims do item 8 e a aprovação Branding do item 9; depois revisão visual/funcional independente. O PR continua draft.


## WEB-03 — resolução do item 8

**Data:** 26/09/2026  
**Origem:** decisão do Gerente.

A proposta da D-043 foi aplicada somente ao draft e dependia de confirmação. O Gerente decidiu **não confirmar o claim “Disponível”**.

Estado público vigente:
- Acervo — **Em desenvolvimento**;
- Central de Monitoramento — **Em desenvolvimento**;
- Sonar — **Em desenvolvimento**;
- Revela — **Em desenvolvimento**;
- Decodifica — **Em desenvolvimento**;
- Perfil Tributário — **Em desenvolvimento**.

Páginas com placeholders, conteúdo conceitual ou integrações ainda em PR não devem ser apresentadas como funcionalidades acessíveis.

**Impacto:** badges/claims e documentação. **Próximo passo:** CI e revisão visual/funcional; Issue #10 continua como gate independente das cores do Sonar. Sem merge/deploy.


## Evidência WEB-03

Frontend: [radar-fiscal-web PR #1](https://github.com/fabiojuniort-cyber/radar-fiscal-web/pull/1)  
Branch: `feat/web-01-site-publico`  
Head verificado: `b9c39fab1530187f4ed034679dea1ef26888d3b3`  
CI: run `36260946535` — **SUCCESS**.

Verificações:
- instalação — SUCCESS;
- typecheck — SUCCESS;
- Vitest/Testing Library — SUCCESS;
- build Vite — SUCCESS;
- Home: 6 badges **Em desenvolvimento**;
- Portfólio: 6 badges **Em desenvolvimento**;
- nenhuma ocorrência de “Disponível” permanece no código visível de `src/App.tsx`.

**Gate:** PR continua draft. Cores do Sonar permanecem somente para avaliação, sujeitas à Issue #10 e revisão visual/funcional independente. Sem merge/deploy.
