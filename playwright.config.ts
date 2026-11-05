import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'

const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const deployedURL = process.env.PLAYWRIGHT_BASE_URL

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: deployedURL ?? 'http://127.0.0.1:5189/28-gramos/',
    reducedMotion: 'reduce',
    launchOptions: existsSync(edge) ? { executablePath: edge } : {},
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 960 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'small-mobile', use: { viewport: { width: 320, height: 780 }, isMobile: true, hasTouch: true } },
  ],
  webServer: deployedURL ? undefined : {
    command: 'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 5189 --strictPort',
    url: 'http://127.0.0.1:5189/28-gramos/',
    reuseExistingServer: false,
  },
})
