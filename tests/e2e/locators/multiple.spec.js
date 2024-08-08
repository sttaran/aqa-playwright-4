import {expect, test} from "@playwright/test";

test.describe("Locators", () => {
  test("Multiple for i", async ({page}) => {
      await page.goto('/');

      const buttons = page.locator('.header-link')

      const buttonsCount = await buttons.count()

      for (let i = 0; i < buttonsCount; i++) {
          if( i % 2 === 0){
              const button = buttons.nth(i)
              await expect(button).toBeVisible()
          }
      }
  })

    test("Multiple for of", async ({page}) => {
        await page.goto('/');

        const buttons = page.locator('.header-link')

        for (const btn of await buttons.all()) {
            await expect(btn).toBeVisible()
        }
    })
})

