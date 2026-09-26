# TriBusca — questões abertas e propostas

Atualizado em 26/09/2026. Itens abaixo **não são decisões aprovadas nem recursos implementados**. A Issue da frente ou uma Issue de decisão registra investigação e aprovação; depois atualizar o documento temático, [DECISIONS.md](../DECISIONS.md) e [CONTEXT.md](../CONTEXT.md) quando mudar o ponto de retomada.

| Tema | Ponto a resolver | Próxima condição |
| --- | --- | --- |
| Reforma Tributária | Escopo inicial de atos/fontes; filtros/tabs; curadoria; visões por IBS/CBS/IS; diferenciação visual publicação×vigência×marcos | Definir conteúdo/UX na WEB-01 sem inventar dados não suportados |
| Revela | Horário/fuso; dias sem itens; fins de semana/feriados; critérios de menção direta além de CNPJ; destinatários; configuração futura de frequência; relação com planos | Definição funcional/comercial nesta frente; desenho técnico após dependências de Sonar/Perfil/e-mail |
| Sonar | Pesos/limiares de Alta-Média-Baixa; ausência de dados versus baixa afinidade; CNAE→atividade/segmento; taxonomia fiscal completa; famílias de produto/NCM; governança do feedback; planos/preço por profundidade, empresa e estabelecimento | Produto pode amadurecer regras nesta frente; desenho físico e algoritmo em Issue própria após a macrofase DOE |
| Decodifica | Política para mudança só de engine/prompt/modelo; desenho físico do reaproveitamento global e ativação; definição exata da contagem de caracteres; franquias, renovação/rollover e créditos adicionais por plano | Produto pode definir regras comerciais/funcionais nesta frente; desenho técnico após a macrofase DOE |
| Marcadores | Vocabulário inicial, evidências e modelo físico exatos | Desenho técnico em Issue própria |
| CFOP | Fonte oficial, temporalidade e relacionamento muitos-para-muitos com operações | Perfil tributário em frente especializada |
| API do produto | Login existe em `POST /auth/login`; faltam contratos de Criar conta, Recuperar senha e Nova senha. **Cobertura pública já foi separada e aprovada na D-050 / Issue #11**. | [Issue #9](https://github.com/fabiojuniort-cyber/tribusca-control/issues/9) para auth; [Issue #11](https://github.com/fabiojuniort-cyber/tribusca-control/issues/11) para API pública Cobertura/Acervo |
| WEB-02 | Revisão visual final do design aprovado; confirmação do Gerente para `Acervo/Central = Disponível`; decisão de merge/deploy | Validar draft PR #1 e gates WEB-02; sem merge/deploy até aprovação |
| Branding / Sonar | Ratificar exceção semântica `Alta=vermelho, Média=amarelo, Baixa=verde`; não ampliar paleta institucional geral | [Issue #10](https://github.com/fabiojuniort-cyber/tribusca-control/issues/10) antes do merge WEB-02 |
| DOE-SP arquivos | Política da tabela `publication_files` versus `source_metadata.files` | Issue #3, sem migration produtiva presumida |
| Próximo DOE | Ordem por ranking oficial de PIB estadual vigente | Apenas após fechamento formal de SP |

Novas propostas discutidas em qualquer chat entram aqui com status e evidência se ainda não houver decisão. O Gerente remove ou transforma o item em decisão documentada após aprovação; não acumular dúvidas resolvidas indefinidamente.
