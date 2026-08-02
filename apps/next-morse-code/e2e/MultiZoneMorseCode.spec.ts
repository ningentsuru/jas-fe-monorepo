import { test, expect } from '@playwright/test'

test.describe('Next Morse Code Multi-Zone App Routing', () => {
  test('should load app layout correctly on the multi-zone base path', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveURL(/.*\/multi-zones-morse-code\//)
  })
})
