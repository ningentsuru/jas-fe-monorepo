import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the not-found-view url', async ({ page }) => {
  await page.goto(ROUTES.NOT_FOUND_VIEW.path)

  const container = page.getByTestId('not-found-view')

  await expect(container).toBeAttached()
})
