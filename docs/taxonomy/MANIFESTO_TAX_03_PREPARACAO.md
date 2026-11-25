# TAX-03 — manifesto dos originais para preparação documental

**Issue:** [tribusca-control #18](https://github.com/fabiojuniort-cyber/tribusca-control/issues/18)  
**Escopo:** arquivamento dos quatro arquivos recuperados, sem revisão semântica ou aprovação da R4.  
**Estado:** preparado para a revisão independente TAX-03; nenhum merge autorizado por este manifesto.

## Arquivos e integridade

Os quatro arquivos abaixo foram copiados byte a byte dos locais indicados. Os caminhos de origem são os observados no computador do responsável em 29/09/2026; caminhos iniciados por `../` são relativos à raiz do repositório `tribusca-control`. A cópia neste diretório é a referência estável do PR. `sources/` não foi alterado.

| Arquivo neste diretório | Origem observada | Estado | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `TAX-01_ARQUITETURA_TAXONOMIA_TRIBUSCA_V1.md` | Raiz local do projeto ChatGPT TriBusca, `../TAX-01_ARQUITETURA_TAXONOMIA_TRIBUSCA_V1.md`; criado na sessão TAX-01 descrita abaixo | Contrato funcional **aprovado pelo responsável após a criação do arquivo** | 30.408 | `67c0323336728e5c4a8beee123562ef3c6a257dd6551818f6f1d88e149dae995` |
| `TAX-02_DICIONARIO_FUNCIONAL_TAXONOMIA_TRIBUSCA_V1_R3.md` | `C:\Users\fabio\Downloads\TAX-02_DICIONARIO_FUNCIONAL_TAXONOMIA_TRIBUSCA_V1_R3.md`; arquivo apresentado pelo responsável na sessão TAX-02 antes da R4 | R3 histórica, `proposed` | 226.050 | `5602bc8fa1707ceb3d242d5a768381ab0b260f4d69ef28cd2555322dfee2eba9` |
| `TAX-02_DICIONARIO_FUNCIONAL_TAXONOMIA_TRIBUSCA_V1_R4.md` | Raiz local do projeto ChatGPT TriBusca, `../TAX-02_DICIONARIO_FUNCIONAL_TAXONOMIA_TRIBUSCA_V1_R4.md`; hash esperado na tarefa e na Issue #18 | R4 `proposed`; objeto da futura auditoria | 234.246 | `d302aeeef657c13a268197dfa82c1cf8751b7d24cc42594e757690574f37686e` |
| `TAX-03_ENCAMINHAMENTO_AUDITORIA_INDEPENDENTE.md` | Raiz local do projeto ChatGPT TriBusca, `../TAX-03_ENCAMINHAMENTO_AUDITORIA_INDEPENDENTE.md`; hash esperado na tarefa e na Issue #18 | Roteiro de revisão; auditoria não executada | 5.000 | `d92cfd88338e1b7c4fd9a8f3bb7a831e50dd3645a3e0d1c170244ac340715e35` |

## Prova da aprovação da TAX-01 e da ordem das versões

O arquivo TAX-01 foi **criado e ajustado** na sessão local `Backend - Local` (`threadId` `01a0dc74-6f99-70f2-8abe-a78d053af5dc`), turno TAX-01 `01a0e964-d04c-7912-a82a-1714406209af`, iniciado em **28/09/2026 19:01:33 UTC**. O registro desse turno inclui a criação e o ajuste de `TAX-01_ARQUITETURA_TAXONOMIA_TRIBUSCA_V1.md` e a entrega do arquivo como proposta para aprovação. A última modificação local do arquivo é **19:06:31 UTC**, antes da aprovação; tinha 30.408 bytes na verificação da própria sessão e tem o mesmo tamanho nesta cópia.

No turno seguinte de TAX-02, `01a0e970-4b61-7563-8782-3f934db53e61`, iniciado em **28/09/2026 19:14:05 UTC**, o **responsável**, em mensagem própria, nomeou esse arquivo como contrato e declarou: “A TAX-01 está APROVADA.” Esta é a evidência primária de aprovação da versão identificada acima. O cabeçalho do arquivo ainda diz “proposta funcional para aprovação” porque seu conteúdo original foi preservado; o estado aprovado decorre da decisão posterior do responsável, registrada aqui sem reescrever o original. O identificador do turno permite conferir a mensagem na sessão original sem compartilhar toda a conversa.

A R3 foi apresentada pelo responsável na mesma sessão, turno `01a0e9fb-25e8-79a1-a731-e38b2d07b73d`, iniciado em **28/09/2026 21:45:45 UTC**, com referência explícita ao arquivo em `Downloads`. A cópia local da R3 foi criada às **21:45:17 UTC**. A R4 local foi criada às **21:49:30 UTC** e modificada por último às **21:54:45 UTC**. Assim, a R3 aqui arquivada é o arquivo original apresentado antes da R4, não uma reconstrução derivada dela.

## Verificação reproduzível

Em PowerShell, na raiz do repositório:

```powershell
Get-ChildItem -LiteralPath docs/taxonomy -File |
  Where-Object { $_.Name -ne 'MANIFESTO_TAX_03_PREPARACAO.md' } |
  ForEach-Object { "{0}  {1}" -f (Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName).Hash.ToLowerInvariant(), $_.Name }
```

Os hashes devem coincidir com a tabela. TAX-01 é o contrato aprovado; R3 permanece registro histórico; R4 continua `proposed`. Relações, conceitos, fontes e lacunas só serão auditados no gate separado **TAX-03 REVISÃO**, sobre o head exato do PR draft.
