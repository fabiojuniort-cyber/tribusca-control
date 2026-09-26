# TriBusca — site público, comercial e direção de layout

> **Precedência WEB-02 (26/09/2026):** em qualquer conflito entre diretrizes históricas deste documento e a seção **WEB-02 — diretrizes públicas que substituem o layout anterior**, prevalece a WEB-02. O texto anterior é mantido apenas como histórico.

Atualizado em 26/09/2026. Decisões de produto/layout comunicadas pelo responsável. **Site público retomado em 26/09/2026 por autorização do responsável pelo produto na WEB-01.** A implementação pública pode avançar em paralelo como camada de comunicação/descoberta, sem afirmar que recursos autenticados ou integrações futuras estejam disponíveis. A estrutura abaixo é direção conceitual; não tratar o protótipo Railway como design aprovado.

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

A WEB-01 inicia a camada pública em paralelo à macrofase DOE. Frontend autenticado, dados dinâmicos, API real e disponibilização produtiva dos recursos continuam condicionados às respectivas frentes técnicas. O protótipo anterior não vira referência visual por esta retomada.


## Página Reforma Tributária

O site público terá uma página dedicada à **Reforma Tributária**, tratada como página temática de dados e não como produto. Ela deverá reunir o recorte do Acervo relacionado à reforma — legislação, regulamentação, notas técnicas e outras publicações oficiais — e apresentar uma timeline que diferencie publicação, vigência, marcos e faseamento. Não criar submarca própria nem apresentar cronograma especulativo como fato.

## WEB-02 — diretrizes públicas que substituem o layout anterior

**Data/origem:** 26/09/2026, responsável pelo produto (usuário). Registro detalhado de definição anterior → nova definição, impacto e próximo passo em [WEB-02](WEB_02_DESIGN_ALIGNMENT.md).

1. Menu: **Cobertura · Portfólio · Como funciona · Reforma Tributária**, cada um com página própria.
2. Header: logo horizontal oficial; **Entrar** e **Criar conta** substituem “Experimentar grátis” como ações de topo. O trial de 7 dias continua válido fora do header.
3. Entrar/Criar conta/Recuperar senha/Nova senha funcionam em modal sobre a página; somente login usa **POST `/auth/login`** comprovado.
4. Home: carrossel visual de 5 UFs, SP sempre primeiro/Ponte Estaiada, 4 UFs sorteadas e fotos reais/licenciadas; publicações estaduais ficam como **“—”** enquanto não houver API.
5. Home/Portfólio: seis recursos — Acervo, Central de Monitoramento, Sonar, Revela, Decodifica e Perfil Tributário. **Acervo/Central = Disponível** no draft, sujeito a confirmação do Gerente antes de merge; demais = Em desenvolvimento.
6. Sonar: vermelho/amararelo/verde para Alta/Média/Baixa como exceção semântica do draft, pendente de Branding; rótulos textuais continuam obrigatórios.
7. Decodifica: cinco exemplos legais aprovados em carrossel; Revela: boletim diário com Alta afinidade e Menção direta.
8. Cobertura: federais primeiro, depois 27 UFs/SP primeiro; cards full-width com status e métricas. Sem contrato de API, métricas = **“—”**.
9. Reforma Tributária: timeline separa **Publicação, Vigência e Marco previsto em lei**; sem datas sem evidência oficial.

**Próximo passo:** revisão visual/funcional do PR #1. Sem merge/deploy. Itens de status e paleta permanecem com gate explícito.
