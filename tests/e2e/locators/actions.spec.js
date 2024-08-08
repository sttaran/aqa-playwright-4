import {expect, test} from "@playwright/test";


test.describe('Actions', ()=>{
    test("actions fill", async ({page}) => {
        const userName = 'Stanislav'

        await page.goto('/');

        const signUpBtn = page.locator('.hero-descriptor_btn')
        await signUpBtn.click()

        const form = page.locator('app-signup-modal form')
        const nameInput = form.locator('#signupName')

        await nameInput.fill(userName)
        await nameInput.fill("Peter")
        await page.pause()
    })

    test("actions pressSequentially", async ({page}) => {
        const userName = 'Stanislav'

        await page.goto('/');

        const signUpBtn = page.locator('.hero-descriptor_btn')
        await signUpBtn.click()

        const form = page.locator('app-signup-modal form')
        const nameInput = form.locator('#signupName')

        await nameInput.pressSequentially(userName, {delay: 120})
        await nameInput.clear()
        await nameInput.pressSequentially(userName, {delay: 120})
        await page.pause()
    })
})