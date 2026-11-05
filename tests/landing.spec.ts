import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('contenido, recursos, fechas y composición responsive', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const failedRequests: string[] = []
  page.on('response', response => { if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`) })
  await page.clock.install({ time: new Date('2026-11-04T18:00:00Z') })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page).toHaveTitle(/28 Gramos Records/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.getByRole('heading', { name: /La próxima fecha/ })).toBeVisible()
  await expect(page.getByText('REALIZADO', { exact: true })).toHaveCount(1)
  await expect(page.getByRole('link', { name: /Apple Music/ })).toHaveAttribute('href', 'https://music.apple.com/us/album/5-estrellas/6810184416')

  for (const id of ['inicio', 'musica', 'eventos', 'colectivo', 'contacto']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
  const clippedContent = await page.locator('.event-wordmark, .archive-caption, .release-info h3, .footer-headline h2').evaluateAll(elements => elements.filter(element => {
    const bounds = element.getBoundingClientRect()
    return bounds.right > window.innerWidth || bounds.left < 0
  }).map(element => element.className || element.tagName))
  expect(clippedContent).toEqual([])
  await page.locator('footer').scrollIntoViewIfNeeded()
  await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true)
  const missingTargets = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.getElementById(link.getAttribute('href')!.slice(1))).map(link => link.getAttribute('href')))
  expect(missingTargets).toEqual([])
  expect(errors).toEqual([])
  expect(failedRequests).toEqual([])
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(accessibility.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => node.target) }))).toEqual([])
  await page.locator('#inicio').scrollIntoViewIfNeeded()
  await page.screenshot({ path: testInfo.outputPath('landing.png'), fullPage: true, animations: 'disabled' })
})

test('menú, tracklist y ampliación de imágenes funcionan con teclado', async ({ page }, testInfo) => {
  await page.goto('/')
  const menu = page.getByRole('button', { name: /^(Abrir|Cerrar) menú$/ })
  if ((page.viewportSize()?.width ?? 1440) < 768) {
    await menu.click()
    await expect(menu).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(menu).toHaveAttribute('aria-expanded', 'false')
    await expect(menu).toBeFocused()
    await menu.click()
    await page.getByRole('navigation').getByRole('link', { name: 'Música', exact: true }).click()
    await expect(page).toHaveURL(/#musica$/)
    await expect(menu).toHaveAttribute('aria-expanded', 'false')
  }

  const summary = page.locator('summary')
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details')).toHaveAttribute('open', '')
  await expect(page.locator('.tracklist li')).toHaveCount(15)
  await page.keyboard.press('Enter')
  await expect(page.locator('details')).not.toHaveAttribute('open')

  const flyer = page.getByRole('button', { name: /Ver flyer de 28Fest/ })
  await flyer.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog').getByText(/EVENTO REALIZADO/)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Cerrar imagen' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(flyer).toBeFocused()

  const photograph = page.getByRole('button', { name: /Ampliar: El colectivo/ })
  await photograph.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Cerrar imagen' }).click()
  await expect(photograph).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  await page.locator('#eventos').scrollIntoViewIfNeeded()
  await page.screenshot({ path: testInfo.outputPath('events.png'), animations: 'disabled' })
})
