import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the job-search-view url', async ({ page }) => {
  await page.goto(ROUTES.JOB_SEARCH_VIEW.path)

  const container = page.getByTestId('job-search-view')

  await expect(container).toBeAttached()
})
