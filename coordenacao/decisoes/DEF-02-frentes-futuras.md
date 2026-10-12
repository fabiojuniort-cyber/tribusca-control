# DEF-02 — Frentes futuras: Assistente Tributário e Notificações + WhatsApp

**Status:** ESCOPO REGISTRADO pelo Fábio em 12/10/2026. **Nenhuma implementação autorizada.**
**Relacionado:** DEF-01 (taxonomia e cadastro), ARQ-01 (pipeline normativo).

## Mapa das frentes
| Frente | Situação |
|---|---|
| F1 LIMPEZA | finalizando |
| F2 TAXONOMIA + CADASTRO | definida (DEF-01) |
| F3 QUALIDADE DO ALERTA | definida (DEF-01, item 7) |
| F4 ASSISTENTE TRIBUTÁRIO | escopo registrado (abaixo) |
| F5 NOTIFICAÇÕES + WHATSAPP | escopo registrado (abaixo) |

Ordem prevista: F2 → F3 → F5 fase 1 → F4 → F5 fases 2 e 3.

## F4 — Assistente Tributário
IA que responde dúvidas tributárias do cliente **usando só o acervo relevante para ele** (o que a taxonomia classificou e cruzou com o perfil do estabelecimento: UF, CNAE, NCM, Atuação).
- Exemplos: "Quanto de ICMS pago para sorgo no Acre?"; "Tenho IBS/CBS numa venda de fertilizantes para produtores rurais?".
- Toda resposta traz: resposta curta, dispositivos citados (artigo ou cláusula, com link oficial), premissas assumidas e o que não foi encontrado no acervo.
- **Nunca responde sem citar norma.** Na dúvida, diz que não sabe. Nunca inventa alíquota.
- Aviso claro de que não é consultoria. Cada cliente só acessa a própria base (isolamento por tenant). Controle de custo por cliente. Registro de perguntas e respostas para auditoria e melhoria.
- **Pré-requisitos:** taxonomia rodando e acervo classificado (F2/F3); etapas Estrutura e Vigência da ARQ-01 (ler só o dispositivo vigente); cobertura das UFs dos clientes; conjunto de 50 a 100 perguntas com resposta conferida pelo Fábio.
- **MVP "Pergunte ao acervo":** responde com citação, sem cálculo. **Fase 2:** cálculos (alíquota efetiva, base reduzida, ST/MVA), que exigem extração estruturada dos números das normas.

## F5 — Notificações + WhatsApp
1. **Fase 1 — Alerta:** mensagem curta quando a taxonomia classifica uma norma como **relevância "Alta"** (o cálculo de relevância da própria taxonomia) **para um estabelecimento**: título, estabelecimento, motivo (ex.: "cita o NCM 1201 que você comercializa") e link para a norma.
2. **Fase 2 — Decodifica pelo WhatsApp:** o cliente responde "1" e recebe a norma traduzida em linguagem simples. **Decodifica é o nome comercial da Norma Clara.**
3. **Fase 3 — Assistente pelo WhatsApp:** perguntas e respostas com citação (depende da F4).

**Regras:**
- WhatsApp Business Platform (API oficial da Meta). Mensagens iniciadas pela empresa só com modelo aprovado e pagas por mensagem; respostas dentro de 24h da mensagem do cliente.
- Opt-in no cadastro e opt-out respondendo "SAIR" (LGPD).
- Telefone verificado por código e ligado ao usuário: cada um só acessa a base da própria empresa.
- Sem spam: WhatsApp só para relevância "Alta"; o restante, opcionalmente, num resumo diário. Preferências por usuário (canal, horário, nível).
- Respostas longas viram link para o TriFaros.
