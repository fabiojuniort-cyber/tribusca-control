# Frente 2 — pacote de fechamento CTRL-5/60/66

Estado comprovado:12%=6/50 aceitas; delta0. Potencial18%=9/50 condicionado a três aceites do COORD, sem crédito por este pacote.

## Conteúdo e alcance

- review/CTRL-5.md, CTRL-60.md e CTRL-66.md: critérios originais, provas, lacunas e encaminhamento.
- review/evidence.json: SHAs, CI, publicações históricas e diffs de revisão.
- playwright-artifacts/screenshots/:56capturas, quatro viewports (1440x900,1920x1080,390x844,360x800).
- e2e/close60.spec.ts: requests/URL, data única, intervalo, futuro, régua, paginação, detalhe/retorno, limpeza e isolamento de Publicações; uma captura específica de data única/intervalo.
- e2e/close66.spec.ts: três famílias, PMPF e Convênio114 sintético permitido.
- e2e/fixture66.json: trechos sintéticos de apresentação; empresa/CNPJ/IE explicitamente sintéticos. Não contém a seção100/97 ou52/91. Não é uma captura integral oficial e não é corpus/gold.
- mirror/:somente arquivos estáticos públicos usados pelo navegador, com hash, para repetição sem acessar a rede. Respostas de autenticação/API são fixtures locais, não dados reais.

## Resultado offline desta rodada

36testes distintos PASS:9por viewport (4DATE-01/capturas,3famílias,1PMPF,1Convênio permitido). Bateria inicial8/8desktop1440+24/24demais viewports; acréscimo de regressão Convênio4/4.
Após completar as imagens de marca, a atualização de capturas teve3PASS e1falha de ambiente no encerramento do trace(EPERM mkdir). O resultado foi preservado em results-logo-captures-first.json. Somente a captura afetada foi repetida com diretório de saída separado e passou1/1; results-logo-1920.json.
Resultados principais:results-desktop-1440.json,results-other-viewports.json,results-convenio.json.
Nenhuma asserção de produto foi retirada ou enfraquecida.

## Limitações e falhas preservadas

O navegador isolado não acessa a rede externa(ERR_NETWORK_ACCESS_DENIED). As primeiras4execuções por família e4DATE-01 bloquearam em page.goto; o último lote está em blocked-network-results.json. Edge falhou ao iniciar; Chromium153.0.8010.12 instalado isoladamente funcionou. Estes erros são de ambiente e não são apresentados como defeito do produto.
A solução desta rodada é um espelho offline dos arquivos estáticos públicos, não uma prova de consultas produtivas. O roteamento responde501 a qualquer chamada sem fixture e nunca libera chamadas reais.
O primeiro download estático atingiu um teto local de30arquivos por incluir variantes de fontes desnecessárias; não foi uma falha do site. Foram reutilizados bytes já obtidos e baixadas apenas variantes latinas faltantes e as duas marcas. Há36arquivos públicos únicos obtidos;13usados no espelho final. A data at do ledger dos arquivos reutilizados é a conferência local do hash, não comprovação do instante original da resposta HTTP.
Não houve acesso a sessões autenticadas do usuário, chamadas reais à API, SQL, Docker, PG18, merge ou deploy.
Os arquivos públicos atuais são uma versão posterior à entrega de outubro. A fonte do renderer legal está inalterada desde o head final do#52; CSS compartilhado teve38linhas de delta (cabeçalho e regra verde), incluído em evidence.json.
Os testes visuais fixam a data sintética para os contracasos de futuro. Não representam horário/data reais.
Os artefatos antigos de CI não estão disponíveis nas listagens atuais; as novas imagens não são rotuladas como imagens históricas.

## Comandos executados

No diretório f2-close-20261107, usando dependências já existentes em ../onb038-web/node_modules:
```powershell
node ../onb038-web/node_modules/playwright/cli.js test --config playwright.config.cjs close66.spec.ts close60.spec.ts --project desktop-1440 --grep 'DATE-01:|F2 fechamento|DESIGN-01C|PMPF'
node ../onb038-web/node_modules/playwright/cli.js test --config playwright.config.cjs close66.spec.ts close60.spec.ts --project desktop-1920 --project mobile-390 --project mobile-360 --grep 'DATE-01:|F2 fechamento|DESIGN-01C|PMPF'
node ../onb038-web/node_modules/playwright/cli.js test --config playwright.config.cjs close60.spec.ts --grep 'F2 fechamento'
node ../onb038-web/node_modules/playwright/cli.js test --config playwright.config.cjs close60.spec.ts --grep 'F2 fechamento' --project desktop-1920 --output test-results-logo-1920
node ../onb038-web/node_modules/playwright/cli.js test --config playwright.config.cjs close66.spec.ts --grep 'F2 CTRL-66' --output test-results-convenio
```

Chromium headless-shell instalado pelo CLI Playwright apenas para testes. workers=1,retries=0. Pacote não inclui node_modules ou binário do navegador. O diretório irmão é dependência explícita do harness desta sessão, não uma ferramenta requerida no produto.

## Próximo gate

COORD ratifica CTRL-5 e CTRL-60 e assume/encaminha revisão incremental material de CTRL-66. As três permanecem abertas até aceite. Não há decisão de ampliação de escopo nem ação técnica do Fábio exigida por este pacote.
