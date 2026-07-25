import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the aboute-me-view url', async ({ page }) => {
  await page.goto(ROUTES.ABOUTE_ME_VIEW.path)

  const container = page.getByTestId('aboute-me-view')

  await expect(container).toBeAttached()
})
