import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the activity-view url', async ({ page }) => {
  await page.goto(ROUTES.ACTIVITY_VIEW.path)

  const container = page.getByTestId('activity-view')

  await expect(container).toBeAttached()
})
