import {expect, test} from "@playwright/test";

test.describe("Locators", () => {
  test("has text", async ({page}) => {
      await page.goto('/');


      const guestLoginBtn = page.locator('.header-link', {
          hasText: 'Guest log in'
      })
      await guestLoginBtn.click()

      const myProfileIcon = page.locator('#userNavDropdown')
      await expect(myProfileIcon).toBeVisible()
  })

    test("has not text", async ({page}) => {
        await page.goto('/');

        const buttons = page.locator('.header-link', {
            hasNotText: 'Guest log in'
        })

        for (const button of await buttons.all()) {
            console.log(await button.innerText())
        }
    })

    test("has", async ({page}) => {
        await page.goto('/');

        const aboutButton = page.locator('.header-link', {hasText: 'About'})

        const navigationBlock = page.locator('.header_nav', {
           has: aboutButton
        })

        await expect(navigationBlock).toBeVisible()
    })


    test("has text vs getByText", async ({page}) => {
        // div > div.header-link > div > div.header-link > div="Guest log in"
        //       1                        2                  3

        await page.goto('/');

        const guestLoginBtn = page.locator('div', {
            hasText: 'Guest log in'
        })


        // div > div.header-link > div > div.header-link > div="Guest log in"
        //                                                  1
        const guestLoginBtn2 = page.getByText('Guest log in')
    })

    test("filter", async ({page}) => {
        await page.goto('/');

        const buttons = page.locator('.header-link')

        for (const button of await buttons.all()) {
            console.log(await button.innerText())
        }

        console.log("-----------------------")
        const navbarButtons = buttons.filter({
            hasNotText : 'Guest log in'
        })

        for (const button of await navbarButtons.all()) {
            console.log(await button.innerText())
        }
    })
})




