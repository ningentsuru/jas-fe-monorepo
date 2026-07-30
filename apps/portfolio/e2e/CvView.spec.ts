import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the cv-view url', async ({ page }) => {
  await page.goto(ROUTES.CV_VIEW.path)

  const container = page.getByTestId('cv-view')

  await expect(container).toBeAttached()
})
