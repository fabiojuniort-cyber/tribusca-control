import {mkdir} from 'node:fs/promises'
import {readFileSync} from 'node:fs'
import path from 'node:path'
import {expect,test} from '../../onb038-web/node_modules/@playwright/test'
import {installOfflineMirror} from './offline-mirror'
const fixture=JSON.parse(readFileSync(path.join(process.cwd(),'e2e/fixture66.json'),'utf8'))
test.beforeEach(async ({page})=>{
 await installOfflineMirror(page)
});

test('DESIGN-01C — ATO COTEPE/ICMS preserva moderno, anexo e histórico', async ({
  page,
}, testInfo) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.evaluate((html) => {
    document.body.innerHTML = html
  }, fixture)

  const standard = page.getByTestId('ato-cotepe-standard')
  await expect(standard.locator('.TituloAcordo')).toHaveCSS('text-align', 'center')
  await expect(standard.locator('.DataPublicao')).toHaveCSS('color', 'rgb(255, 0, 0)')
  expect(
    await standard.locator('.Ementa').evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).marginLeft),
    ),
  ).toBeGreaterThan(0)
  expect(
    await standard.locator('.TextoAcordo').first().evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).textIndent),
    ),
  ).toBeGreaterThan(0)

  const annex = page.getByTestId('ato-cotepe-annex')
  await expect(annex.locator('.AtoCotepeUfHeader')).toHaveCSS('text-align', 'center')
  await expect(annex.locator('tr').nth(1).locator('td').nth(1)).toHaveCSS('text-align', 'left')
  await expect(annex.locator('.legal-table-scroll')).toHaveCSS('overflow-x', 'auto')

  const historical = page.getByTestId('ato-cotepe-historical')
  await expect(historical.locator('.TituloAcordo')).toHaveCSS('font-size', '14px')
  await expect(historical.locator('.AtoCotepeDouHistorico')).toHaveCSS('color', 'rgb(0, 0, 0)')
  await expect(historical.locator('.Ementa')).toHaveCSS('font-weight', '400')
  await expect(historical.locator('.AtoCotepeDeclara')).toHaveCSS('text-align', 'center')
  await expect(historical.locator('.AtoCotepeDeclara')).toHaveCSS('text-indent', '0px')

  const ato105Table = page.getByTestId('ato-cotepe-105').locator('table')
  await expect(ato105Table.locator('.TabelaTitulo')).toHaveCSS('text-align', 'left')
  await expect(ato105Table).toHaveCSS('max-width', '100%')
  await expect(ato105Table).toHaveCSS('margin-left', '0px')

  const viewportOverflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(viewportOverflow.scrollWidth).toBeLessThanOrEqual(viewportOverflow.clientWidth + 1)

  const evidenceDir = path.join('playwright-artifacts', 'screenshots')
  await mkdir(evidenceDir, { recursive: true })
  for (const variant of ['ato-cotepe-standard', 'ato-cotepe-annex', 'ato-cotepe-historical'] as const) {
    await page.getByTestId(variant).screenshot({
      path: path.join(evidenceDir, testInfo.project.name + '-' + variant + '.png'),
    })
  }
})


test('DESIGN-01C — Protocolo ICMS preserva atual, legado e consolidado', async ({
  page,
}, testInfo) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.evaluate((html) => {
    document.body.innerHTML = html
  }, fixture)

  const current = page.getByTestId('protocolo-119')
  await expect(current.locator('.TituloAcordo')).toHaveCSS('text-align', 'center')
  await expect(current.locator('.DataPublicao')).toHaveCSS('color', 'rgb(255, 0, 0)')
  await expect(current.locator('.AcordoTipo')).toHaveCSS('text-align', 'center')
  expect(
    await current.locator('.Ementa').evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).marginLeft),
    ),
  ).toBeGreaterThan(0)

  const current50 = page.getByTestId('protocolo-50')
  await expect(current50.locator('.DataPublicao')).toHaveCount(2)
  await expect(current50).toContainText('Ficam revogados os Protocolos ICMS')

  const legacy = page.getByTestId('protocolo-53')
  await expect(legacy.locator('.ProtocoloEmentaLegacy')).toHaveCSS('margin-left', '0px')
  await expect(legacy.locator('.ProtocoloTipoLegacy')).toHaveCSS('letter-spacing', 'normal')
  await expect(legacy.locator('.ProtocoloTextoLegacy').first()).toHaveCSS('text-indent', '0px')
  await expect(legacy.locator('.ProtocoloRubricaLegacy')).toHaveCSS('text-indent', '0px')
  await expect(legacy.locator('.ProtocoloRubricaLegacy')).toHaveCSS('font-weight', '700')
  await expect(legacy.locator('.ProtocoloTextoLegacy').last()).toHaveCSS('text-indent', '0px')
  await expect(legacy).toContainText('Natal, RN, 13 de dezembro de 2002.')

  const consolidated = page.getByTestId('protocolo-22')
  const currentEmentaLeft = await current.locator('.Ementa').evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).marginLeft),
  )
  const consolidatedEmentaLeft = await consolidated.locator('.Ementa').evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).marginLeft),
  )
  expect(Math.abs(currentEmentaLeft - consolidatedEmentaLeft)).toBeLessThanOrEqual(1)
  await expect(consolidated.locator('.Remisso')).toHaveCSS('color', 'rgb(255, 0, 0)')
  await expect(consolidated.locator('.RedaoAnt')).toHaveCSS('color', 'rgb(0, 128, 0)')
  await expect(consolidated).toContainText('REVOGADO')

  const viewportOverflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(viewportOverflow.scrollWidth).toBeLessThanOrEqual(viewportOverflow.clientWidth + 1)

  const evidenceDir = path.join('playwright-artifacts', 'screenshots')
  await mkdir(evidenceDir, { recursive: true })
  for (const reference of ['protocolo-119', 'protocolo-50', 'protocolo-53', 'protocolo-22'] as const) {
    await page.getByTestId(reference).screenshot({
      path: path.join(evidenceDir, testInfo.project.name + '-' + reference + '.png'),
    })
  }
})


test('DESIGN-01C — Ajuste SINIEF preserva padrão e histórico consolidado', async ({
  page,
}, testInfo) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.evaluate((html) => {
    document.body.innerHTML = html
  }, fixture)

  for (const reference of ['ajuste-33', 'ajuste-28'] as const) {
    const current = page.getByTestId(reference)
    await expect(current.locator('.TituloAcordo')).toHaveCSS('text-align', 'center')
    await expect(current.locator('.DataPublicao')).toHaveCSS('color', 'rgb(255, 0, 0)')
    await expect(current.locator('.AcordoTipo')).toHaveCSS('text-align', 'center')
    await expect(current.locator('.AcordoTipo')).toHaveCSS('text-indent', '0px')
    await expect(current.locator('.DataPublicao').first()).toHaveCSS('font-weight', '400')
    expect(
      await current.locator('.TituloAcordo').evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).fontSize),
      ),
    ).toBeGreaterThan(18)
    expect(
      await current.locator('.Ementa').evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).marginLeft),
      ),
    ).toBeGreaterThan(0)
  }

  const consolidated = page.getByTestId('ajuste-01')
  await expect(consolidated.locator('.AjusteNotaEditorial')).toHaveCSS('color', 'rgb(255, 0, 0)')
  await expect(consolidated.locator('.Remisso')).toHaveCSS('color', 'rgb(255, 0, 0)')
  await expect(consolidated.locator('.RedaoAnt')).toHaveCSS('color', 'rgb(0, 128, 0)')
  await expect(consolidated.locator('a')).toHaveCSS('color', 'rgb(0, 0, 238)')

  const plainMarker = page.getByTestId('ajuste-28').locator('.AjusteTipoPlain')
  expect(
    await plainMarker.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).letterSpacing),
    ),
  ).toBeGreaterThan(0)
  const quoted = page.getByTestId('ajuste-28').locator('.AjusteCitacao')
  await expect(quoted).toHaveCSS('text-indent', '0px')
  expect(
    await quoted.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).marginLeft),
    ),
  ).toBeGreaterThan(0)

  const viewportOverflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(viewportOverflow.scrollWidth).toBeLessThanOrEqual(viewportOverflow.clientWidth + 1)

  const evidenceDir = path.join('playwright-artifacts', 'screenshots')
  await mkdir(evidenceDir, { recursive: true })
  for (const reference of ['ajuste-33', 'ajuste-01', 'ajuste-28'] as const) {
    await page.getByTestId(reference).screenshot({
      path: path.join(evidenceDir, testInfo.project.name + '-' + reference + '.png'),
    })
  }
})


test('ATO COTEPE/PMPF — grade oficial permanece legível sem overflow da página', async ({
  page,
}, testInfo) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.evaluate((html) => {
    document.body.innerHTML = html
  }, fixture)

  const pmpf = page.getByTestId('pmpf')
  await expect(pmpf.locator('.TituloAcordo')).toHaveCSS('text-align', 'center')
  await expect(pmpf.locator('.DataPublicao')).toHaveCSS('color', 'rgb(255, 0, 0)')
  await expect(pmpf.locator('tbody tr')).toHaveCount(27)
  await expect(pmpf.locator('thead tr').first().locator('th').first()).toHaveAttribute('rowspan', '2')
  await expect(pmpf.locator('thead tr').first().locator('th').last()).toHaveAttribute('colspan', '2')

  const tableScroll = pmpf.locator('.legal-table-scroll')
  await expect(tableScroll).toHaveCSS('overflow-x', 'auto')
  const viewportOverflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(viewportOverflow.scrollWidth).toBeLessThanOrEqual(viewportOverflow.clientWidth + 1)

  const evidenceDir = path.join('playwright-artifacts', 'screenshots')
  await mkdir(evidenceDir, { recursive: true })
  await pmpf.screenshot({
    path: path.join(evidenceDir, `${testInfo.project.name}-ato-cotepe-pmpf-table.png`),
  })
})


 
test('F2 CTRL-66 — regressão Convênio sintético permitido',async({page},testInfo)=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await page.evaluate(html=>{document.body.innerHTML=html},fixture);
 const section=page.getByTestId('standard');
 await expect(section).toHaveAttribute('data-legal-template','CONVENIO_ICMS');
 await expect(section.locator('.TituloAcordo')).toHaveCSS('text-align','center');
 await expect(section.locator('.DataPublicao')).toHaveCSS('color','rgb(255, 0, 0)');
 await expect(section).toContainText('114');
 await section.screenshot({path:'playwright-artifacts/screenshots/'+testInfo.project.name+'-convenio-sintetico-permitido.png'});
});

