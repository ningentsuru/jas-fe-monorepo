import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the simulation-view url', async ({ page }) => {
  await page.goto(ROUTES.SIMULATION_VIEW.path)

  const container = page.getByTestId('simulation-view')

  await expect(container).toBeAttached()
})
