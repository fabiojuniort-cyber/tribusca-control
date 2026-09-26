# TriBusca — produto, recursos e experiência

Atualizado em 26/09/2026. Registro das decisões comunicadas pelo responsável pelo produto. Este documento descreve direção aprovada, não afirma que os recursos estejam implementados. A implementação verificada permanece em [PROJECT_STATE.md](../PROJECT_STATE.md), Issues e repositórios de código.

## Propósito e fluxo

TriBusca — **Monitoramento e Inteligência Tributária**. Coleta global única das fontes oficiais → normalização → deduplicação/versionamento → taxonomia → perfil tributário → relevância → compreensão → análise/impacto. O cliente deve responder o que mudou, por que importa, quando vale, quem pode ser afetado, qual é a fonte, por que o assunto foi priorizado e o que precisa analisar. Tenant é conta SaaS; company é empresa monitorada.

## Navegação e estados do painel

Navegação autenticada planejada:

| Grupo | Áreas |
| --- | --- |
| Visão geral | Início |
| Inteligência | Publicações, Busca, Arquivo |
| Monitoramento | Central de Monitoramento, Fontes Oficiais |
| Organização | Empresas, Estabelecimentos, Perfil Tributário |
| Administração | Configurações |

Tenant ativo é contexto da conta; empresa ativa é filtro/contexto da análise. Separar na interface **fato oficial**, **inteligência TriBusca** e **conteúdo gerado por IA**. Central de Monitoramento distingue saúde operacional (runs, attempts, última tentativa, indisponibilidade, latência) de cobertura legislativa. Mostrar honestamente SUCCESS_NO_RESULTS, SOURCE_UNAVAILABLE, FETCH_FAILED, PROCESSING_FAILED e PARTIAL_SUCCESS; falha de fonte não é ausência de publicações.

Frontend definitivo: React, TypeScript, Vite, React Router, TanStack Query, Tailwind, Radix UI, shadcn/ui, Lucide, ESLint, Prettier, Vitest, Testing Library, MSW. Sistema de interface v1 proposto/aprovado como base: Inter, tokens e componentes Button, Input, Select, Badge, Tabs, Card, Table, Drawer, Dialog, Sheet, Tooltip, Toast, Pagination, EmptyState e Skeleton; filtros/URLs, responsividade e acessibilidade. A identidade visual final deve usar o [manual de marca](BRAND_MANUAL_V1.md). O protótipo Railway é referência funcional, **não** referência visual final; o usuário avaliou que o site ainda está longe do resultado desejado.

## Inteligência tributária aprovada conceitualmente

1. **Marcadores tributários**: vocabulário controlado, não tags livres. Categorias: tributo, tema, operação, segmento, produto, documento fiscal, obrigação, esfera, geografia e reforma. Exemplos: `TRIB_ICMS`, `TEMA_BENEFICIO_FISCAL`, `SEG_AGRO`, `PROD_FERTILIZANTE`, `DOC_NFE`, `OBR_EFD`, `REFORMA_IBS`. IA pode selecionar marcadores existentes, não inventar novos. Relações previstas: APLICA, EXCLUI, EXCEÇÃO, CONDIÇÃO, MENÇÃO; guardar evidência/trecho/dispositivo quando possível.
2. **Perfil tributário**: CNPJ, regime, CNAEs, atividades, segmentos, estabelecimentos e UFs; progressivamente produtos, NCMs, operações, CFOPs, tributos, documentos e obrigações. Não exigir tudo no onboarding. Operação não é CFOP: relação futura muitos-para-muitos; CFOP temporal e baseado em fonte oficial.
3. **Relevância explicável**: apresentar “Possivelmente relevante” e motivos verificáveis (tributo, UF, filial, produto, operação). Distinguir correspondência exata de família relacionada; não apresentar porcentagem de relevância sem justificativa.
4. **Norma Clara**: nome aprovado, dentro da publicação. Explica em português claro o que um dispositivo diz; não prescreve o que a empresa deve fazer nem impacto definitivo. Modelo conceitual: Publication → Version → Legal Segment → Norma Clara; segmentos por artigo/caput/parágrafo/inciso/alínea/item, cada um com hash; engine versionada e resultado potencialmente reutilizável globalmente entre tenants. Política de retenção de traduções antigas ainda **em aberto**.
5. **IA futura**: pode resumir, extrair assunto/vigência/operações/produtos/obrigações e apontar possíveis áreas afetadas (SAP, J1BTAX, pricing, cadastro fiscal, NF-e, DRC etc.) com evidência e grau de certeza. Não inventar impacto quando faltarem provas.

## Status e fronteiras

Esses itens são decisões de produto, não componentes produtivos. API do produto com `/publications`, `/sources`, `/monitoring/overview` e `/companies` foi proposta, **não** incorporada à main na última verificação comunicada; revalidar antes de implementar. A prioridade atual é fechar DOE-SP e os 27 DOEs. Antes de construir taxonomia, relevância, Norma Clara ou frontend, abrir Issue própria com desenho físico/contrato e critérios. Não converter o modelo conceitual em schema gigante prematuramente.
