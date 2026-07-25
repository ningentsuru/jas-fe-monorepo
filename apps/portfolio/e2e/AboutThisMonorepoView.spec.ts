import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the about-this-monorepo-view url', async ({ page }) => {
  await page.goto(ROUTES.ABOUT_THIS_MONOREPO_VIEW.path)

  const container = page.getByTestId('about-this-monorepo-view')

  await expect(container).toBeAttached()
})
