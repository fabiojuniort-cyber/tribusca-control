# ANAT — auditoria documental independente do lote autônomo

Origem: CLAUDE-COORD → GPT-EXEC. Auditor: subagente documental separado. Data: 16/10/2026, America/Sao_Paulo. Base auditada: `cb4d066702763f3a763af9df33caaf9111f548ab`, repositório local `output/anat/repo`. R0: conferência offline de artefatos. Nenhum acesso ao banco, produto, Railway, coleta, migration, merge ou deploy. Não houve nova pesquisa jurídica oficial nesta auditoria; as referências e conclusões jurídicas abaixo são consistência interna do pacote, não nova homologação.

## Resultado

O pacote é consistente quanto a contagens, IDs e aplicação dos 77 patches. Há um erro material de referência no resumo da anotação: atribuição conjunta ao 26/21 inclui indevidamente o §1 da primeira do 100/97, cuja nota literal aponta 104/21. A correção documental é necessária antes de reutilizar esse resumo. Isso não bloqueia os demais trabalhos R0. As pendências de fonte já conhecidas continuam abertas e não recebem aprovação automática.

| Artefato/checagem | Estado | Evidência e limite |
|---|---|---|
| JSON principal, quantidade e identidade | PASS | 2.434 registros/IDs únicos; 2.323 do 52/91 e 111 do 100/97; nenhuma duplicação de ID. |
| Preservação entre `99caac3` e `cb4d066` | PASS | Comparação por ID: `textoLiteral`, `caminho`, `ncm`, `hashTrecho`, `sha256Fonte` e `xpath` sem divergências. |
| 77 associações aplicadas | PASS | 77 IDs únicos no registro aplicado; todos existem no JSON e `notaRevista` coincide exatamente com `notaConfaz`. Distribuição: 6 primeira parte52 + 44 segunda parte52 + 27 do100. |
| Contextos do 52/91 | PASS com limite | 2.273 registros explicitamente marcados “Contexto agregado do HTML; associação individual não conferida”; somados aos 50 patches do52 = 2.323. Contexto não equivale a nota individual validada. |
| 100/97, associação revista | PASS com limite | 27 alterados + 84 examinados sem troca = 111; revisão estrutural/documental não é homologação de vigência. |
| 30 fichas | PASS documental | 30 cabeçalhos de ficha. São expectativas do desenho, não benchmark executado, spans exaustivos, precisão ou recall. |
| 2.444 unidades anotadas | PASS documental | Markdown contém 356 blocos B e 2.088 linhas DOM de tabela: 1.990 linhas de dados/cabeçalho e 98 notas de tabela; total 2.444. Não confundir com 2.434 linhas de trechos/código do dossiê. |
| NCM/NBM | PASS documental | 1.876 linhas com código. Exatamente duas ocorrências `8450.11.00`; `8450.11.9900` histórico permanece separado. Não prova validade comercial/tributária do código. |
| Duas aprovações humanas recém-recebidas | PENDING propagação pelo principal | No HEAD auditado todas as 2.434 linhas têm `aprovado=false` e situação pendente. O principal registrará somente `ANAT03-00342` e `ANAT03-00961`, aprovados pelo Fábio no chat. Esta auditoria não modifica estados. |
| Resumo crítico da anotação 100/97 | BLOCK para reutilizar a frase incorreta | `anat-02-anotacao.md`, tópico “Achados críticos e expectativas”: “Cláusula primeira II, §1 e cláusula segunda III têm revogações ligadas26/21”. O JSON `ANAT03-02364`, a síntese e revisão PDF p4 dizem 104/21 para §1. Corrigir separadamente; manter leitura individual do 104/21 como pendência até evidência nova. |
| Impropriedades literais da fonte | PENDING | 52/91:13.5/13.4,14.19/14.9,19.2/13.3 e datas; 100/97: `ANAT03-02405` termina21.07.15 e `ANAT03-02430` menciona primeira sob quinta. Preservação literal correta; solução depende do modificador oficial. |
| Igualdade do HTML persistido | PASS no limite declarado | Evidência humana de SELECT/hash, não nova execução do auditor. Confirma as duas apresentações/versionamentos registrados; não comprova `content_text`, grants/RLS, versões invisíveis ou vigência. |
| XLSX | PENDING verificação independente binária | Existe validação anterior com PASS e aprovações pendentes. Esta auditoria não recalculou nem renderizou o binário; não transformar validação herdada em teste independente atual. Principal deve conferir sincronização após as duas aprovações. |
| Uso por produto/taxonomia corrente | BLOCK | Não autorizado pelo escopo e sem homologação das demais linhas. O pacote é documental. |

## Achados e tratamento recomendado

1. Corrigir a referência ao §1 do100/97 somente no resumo crítico; não alterar o literal. Formulação: “PrimeiraII e segundaIII têm revogações ligadas26/21; primeira§1 tem nota de revogação pelo104/21. Atos, condições e homologação individual pendentes.” O mesmo cuidado vale para quintaI, também26/21, que já consta corretamente em `ANAT03-02429`.
2. Não aprovar em lote os 2.273 contextos. As 77 revisões comprovam que o mecanismo anterior transportava notas entre alvos; apenas os vínculos individualmente conferidos podem deixar essa categoria.
3. A distinção entre “associação documental revista” e “situação jurídica aprovada” está explícita no pacote. Preservá-la na comunicação futura. Nenhuma revisão de CSS, posição ou PDF vira vigência positiva.
4. `ANAT03-00961` usa caminho literal “item sem número”; a apresentação humana pode identificá-lo como25.01(a) pela hierarquia do PDF, mas deve manter XPath/ID/célula como âncora sem reescrever silenciosamente o literal.
5. A atualização posterior deve evitar frases globais desatualizadas “todas pendentes/nenhuma aprovação” como estado atual. Podem permanecer somente quando qualificadas como histórico do checkpoint anterior. Depois de propagada a decisão, o esperado é duas aprovações documentais estritamente delimitadas e 2.432 linhas restantes pendentes; as situações finais e intervalos devem conservar o sentido exato aprovado.

## Registro reproduzível

Leituras offline: AGENTS; README e relatórios ANAT; JSON principal; registro aplicado e três propostas de patch; inventário estrutural; resultado SQL fornecido pelo Fábio; comparação `git show 99caac3:docs/anat/anat-03-trechos.json` contra o JSON em `cb4d066`. Contagens e igualdade verificadas com PowerShell `ConvertFrom-Json`, índice por ID e comparação textual ordinal dos campos preservados. Não houve edição de JSON principal, planilha, branch ou GitHub por este auditor.
