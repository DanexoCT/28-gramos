import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('contenido, recursos, fechas y composición responsive', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const failedRequests: string[] = []
  page.on('response', response => { if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`) })
  await page.clock.install({ time: new Date('2026-11-04T18:00:00Z') })
  await page.goto('./')
  await expect(page).toHaveURL(/\/28-gramos\/$/)
  await expect(page.locator('script[type="module"][src]')).toHaveAttribute('src', /^\/28-gramos\/assets\/.+\.js$/)
  await page.evaluate(() => document.fonts.ready)
  await expect(page).toHaveTitle(/28 Gramos Records/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.locator('.wanted-hud .stars svg')).toHaveCount(5)
  await expect(page.locator('.zone-radar')).toBeVisible()
  await expect(page.getByRole('heading', { name: /La próxima fecha/ })).toBeVisible()
  await expect(page.getByText('REALIZADO', { exact: true })).toHaveCount(1)
  await expect(page.getByRole('link', { name: /Apple Music/ })).toHaveAttribute('href', 'https://music.apple.com/us/album/5-estrellas/6810184416')
  await expect(page.getByRole('link', { name: /^Spotify/ })).toHaveAttribute('href', 'https://open.spotify.com/album/4CTfRPq2XHiAT4AgysxKav')
  await expect(page.getByRole('link', { name: /Apple Music/ }).locator('svg.platform-brand-icon')).toHaveCount(1)
  await expect(page.getByRole('link', { name: /Amazon Music/ }).locator('svg.platform-brand-icon')).toHaveCount(1)

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
  expect(await page.locator('img').evaluateAll(images => images.every(image => new URL(image.currentSrc).pathname.startsWith('/28-gramos/images/')))).toBe(true)
  const missingTargets = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.getElementById(link.getAttribute('href')!.slice(1))).map(link => link.getAttribute('href')))
  expect(missingTargets).toEqual([])
  expect(errors).toEqual([])
  expect(failedRequests).toEqual([])
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(accessibility.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => node.target) }))).toEqual([])
  await page.locator('#inicio').scrollIntoViewIfNeeded()
  await page.screenshot({ path: testInfo.outputPath('landing.png'), fullPage: true, animations: 'disabled' })
})

test('movimiento automático, cursor nativo y brillo suave respetan las preferencias', async ({ page, isMobile }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('./')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('.site-experience')).toHaveAttribute('data-motion', 'on')
  const photograph = page.locator('.hero-photo img')
  await expect(photograph).toHaveCSS('animation-name', 'photograph-drift')
  const initialTransform = await photograph.evaluate(element => getComputedStyle(element).transform)
  await expect.poll(() => photograph.evaluate(element => getComputedStyle(element).transform)).not.toBe(initialTransform)
  await expect(page.locator('.identity-strip-track')).toHaveCSS('animation-name', 'identity-travel')

  await page.mouse.move(500, 280)
  await page.mouse.move(650, 330)
  await expect(page.locator('.cursor-accent')).toHaveCount(0)
  await expect(page.locator('body')).toHaveCSS('cursor', 'auto')
  if (isMobile) {
    await expect(page.locator('.cursor-glow')).toHaveCount(0)
  } else {
    const light = page.locator('.cursor-glow')
    await expect(light).toHaveCSS('opacity', '1')
    await expect.poll(async () => {
      const bounds = await light.boundingBox()
      return bounds ? Math.abs(bounds.x + bounds.width / 2 - 650) + Math.abs(bounds.y + bounds.height / 2 - 330) : Infinity
    }).toBeLessThan(1)
  }
  await expect(page.locator('.radar-sweep')).toHaveCSS('animation-name', 'radar-scan')

  await expect(page.locator('.hero-line-text').first()).toHaveCSS('opacity', '1')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: testInfo.outputPath('motion-hero.png'), animations: 'allow' })
  const pause = page.getByRole('button', { name: 'Pausar animaciones' })
  await pause.click()
  await expect(pause).toHaveAttribute('aria-pressed', 'true')
  await expect(photograph).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.identity-strip-track')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.radar-sweep')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.cursor-accent')).toHaveCount(0)
  await expect(page.locator('.cursor-glow')).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await pause.click()
  await expect(photograph).toHaveCSS('animation-name', 'photograph-drift')

  await page.locator('#eventos').scrollIntoViewIfNeeded()
  await expect(page.locator('.stage-beam-one')).toHaveCSS('animation-play-state', 'running')
  await expect(photograph).toHaveCSS('animation-play-state', 'paused')
  await expect(page.locator('.event-copy')).toHaveCSS('opacity', '1')
  await expect(page.locator('.event-archive')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: testInfo.outputPath('motion-events.png'), animations: 'allow' })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.site-experience')).toHaveAttribute('data-motion', 'off')
  await expect(page.locator('.stage-beam-one')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.cursor-accent')).toHaveCount(0)
  await expect(page.locator('.cursor-glow')).toHaveCount(0)
  expect(errors).toEqual([])
})

test('menú, tracklist y ampliación de imágenes funcionan con teclado', async ({ page }, testInfo) => {
  await page.goto('./')
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
