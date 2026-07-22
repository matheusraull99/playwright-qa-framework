import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração central do framework.
 *
 * - baseURL aponta para o ambiente sob teste (saucedemo).
 * - No CI: 1 retry por teste (detecção de flakiness) e execução "fail fast" de código esquecido (forbidOnly).
 * - trace "on-first-retry": quando um teste falha e é reexecutado, o Playwright grava o trace completo
 *   (screenshots, DOM, network) — insumo direto para investigar testes flaky.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-test',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
