import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the multi-zones-view url', async ({ page }) => {
  await page.goto(ROUTES.MULTI_ZONES_VIEW.path)

  const container = page.getByTestId('multi-zones-view')

  await expect(container).toBeAttached()
})
