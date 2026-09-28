# TriBusca — questões abertas e propostas

Atualizado em 27/09/2026. Itens abaixo **não são decisões aprovadas nem recursos implementados**. A Issue da frente ou uma Issue de decisão registra investigação e aprovação; depois atualizar o documento temático, [DECISIONS.md](../DECISIONS.md) e [CONTEXT.md](../CONTEXT.md) quando mudar o ponto de retomada.

| Tema | Ponto a resolver | Próxima condição |
| --- | --- | --- |
| Coleta / novos CNPJs | Estratégia para **reexaminar itens antigos** quando uma nova empresa/CNPJ for cadastrada, preservando custo, auditoria e isolamento. | Desenho técnico futuro da classificação/matching; D-057 já define escopo, retenção e CNPJ exato. |
| Sonar | Pesos/limiares/fórmula; CNAE→atividade/segmento; taxonomia fiscal completa; famílias de produto/NCM; papéis e rito detalhado para mudanças após feedback; diferenciação comercial por profundidade. **Dados insuficientes ≠ Baixa** já está resolvido na D-059. | Produto pode amadurecer regras; algoritmo físico somente em Issue própria. |
| Revela | Outros identificadores seguros além de CNPJ exato em versões futuras; assunto/microcopy/identidade do e-mail; planos; eventual frequência futura configurável; detalhes de UX/permissões para organizações complexas. | V1 já definida na D-060: 08h BRT, somente com itens, histórico, destinatários, CNPJ exato, sem Média. |
| Decodifica | Unidade técnica de geração/persistência; associação do resultado reutilizável por usuário; contrato/modelo/prompt/observabilidade; estratégia para conteúdo muito extenso; créditos por plano; **validade e ordem de consumo dos créditos extras**. | Regras comerciais de contagem, entrega, obsolescência, renovação mensal e compra extra já resolvidas na D-061. |
| Reforma Tributária | Política futura de **destaques editoriais/curadoria** e responsáveis; detalhes visuais finais da timeline. | Escopo, marcadores e navegação já definidos na D-062. |
| Marcadores | Vocabulário inicial, evidências e modelo físico exatos. | Desenho técnico em Issue própria. |
| Cadastro sem CNPJ | Definir se e como uma empresa sem CNPJ pode ser cadastrada e quais limitações terá. O CNPJ é opcional no formulário inicial, mas o trial só começa após verificação do e-mail + primeiro cadastro de empresa. | Issue #9 / desenho funcional e contratual. |
| Segundo login | Credenciais da mesma pessoa não podem manter acessos simultâneos; falta decidir se o segundo login derruba a sessão anterior, é bloqueado ou exige outro fluxo. | Desenho de autenticação/sessões em Issue própria. |
| Comercial | Nomes dos três níveis, preços, franquias, empresas/estabelecimentos por plano, profundidade exata do Perfil, Produto/NCM, usuários e quantidade de créditos. | Piloto de custos e uso antes de fechar grade comercial. |
| CFOP | Fonte oficial, temporalidade e relacionamento muitos-para-muitos com operações. | Perfil Tributário em frente especializada. |
| API do produto | Login existe em `POST /auth/login`; faltam contratos de Criar conta, Recuperar senha e Nova senha. **Cobertura pública já foi separada e aprovada na D-050 / Issue #11**. | [Issue #9](https://github.com/fabiojuniort-cyber/tribusca-control/issues/9) para auth; [Issue #11](https://github.com/fabiojuniort-cyber/tribusca-control/issues/11) para API pública Cobertura/Acervo. |
| WEB-02/WEB-03/WEB-05 | Revisão independente final do preview WEB-05 e decisão futura de merge/publicação. Claims de disponibilidade resolvidos pela D-051; bloqueios A11Y/Branding corrigidos no head `f92fbea8...`. | Revisor validar desktop/mobile, teclado/foco, contrastes, logo, Inter, overflow e reduced-motion; sem merge/publicação definitiva até parecer. |
| Branding / Sonar | Ratificação conceitual concluída pela D-053 com valores `#C92A2A` / `#9A6900` / `#237032` (+ ping `#2B8A3E`); falta **verificação independente final** no preview. | [Issue #10](https://github.com/fabiojuniort-cyber/tribusca-control/issues/10) permanece aberta até o parecer final. |
| DOE-SP arquivos | Política da tabela `publication_files` versus `source_metadata.files`. | Issue #3, sem migration produtiva presumida. |
| Próximo DOE | Ordem por ranking oficial de PIB estadual vigente. | **Somente após fechamento formal de SP**; depois disso aplica-se o paralelismo da D-055. |

Novas propostas discutidas em qualquer chat entram aqui com status e evidência se ainda não houver decisão. O Gerente remove ou transforma o item em decisão documentada após aprovação; não acumular dúvidas resolvidas indefinidamente.
