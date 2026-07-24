import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the his-cv-view url', async ({ page }) => {
  await page.goto(ROUTES.HIS_CV_VIEW.path)

  const container = page.getByTestId('his-cv-view')

  await expect(container).toBeAttached()
})
