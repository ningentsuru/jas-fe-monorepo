import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the home-view url', async ({ page }) => {
  await page.goto(ROUTES.HOME_VIEW.path)

  const container = page.getByTestId('home-view')

  await expect(container).toBeAttached()
})
