import { test, expect } from '@playwright/test'

test.describe('Portfolio Home Landing Page E2E Suite', () => {
  test('should render semantic layouts, meta branding headers, and JSON-LD schema perfectly', async ({
    page,
  }) => {
    // 1. Visit your local Nuxt application landing track
    await page.goto('/')

    // 2. Validate metadata header information matches expectations
    await expect(page).toHaveTitle('Joshua Alexis Sardido | Frontend Engineer')

    // 3. Verify HTML5 landmarks and custom test elements load smoothly
    const mainWrapper = page.locator('[data-testid="landing-bio"]')

    // CRITICAL FOR UI MODE: Force Playwright to visually wait until the DOM node is fully painted and stable
    await expect(mainWrapper).toBeVisible()

    // 4. Await client-side hydration macro sequences (isClientReady shifts to true)
    const profileHero = page.locator('[data-testid="organism-profile-hero"]')
    await expect(profileHero).toBeVisible()
    await expect(profileHero).not.toHaveAttribute('aria-busy', 'true')

    // 5. Extract and validate the embedded JSON-LD metadata schema object
    const schemaScript = page.locator('script[type="application/ld+json"]')
    await expect(schemaScript).toBeAttached()

    const schemaText = await schemaScript.textContent()
    const schemaData = JSON.parse(schemaText || '{}')

    expect(schemaData.mainEntity.name).toBe('Joshua Alexis Natividad Sardido')
    expect(schemaData.mainEntity.jobTitle).toBe('Frontend Engineer')

    // OPTIONAL PLAYWRIGHT TRICK: Uncomment the line below to freeze the browser panel open indefinitely in UI mode
    // await page.pause()
  })
})
