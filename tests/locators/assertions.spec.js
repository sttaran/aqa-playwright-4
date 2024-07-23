import {expect, test} from "@playwright/test";


test.describe('Assertions', ()=>{
    test("sync assertions", async ({page}) => {
        const expectedResult = 4
        expect(2 + 2).toBe(expectedResult)
        expect("1").toBe("1")

        expect({a: 1}, "Should be equal").toEqual({a: 1})
        expect([{a: 1}], "Should be equal").toEqual([{a: 1}])

        expect({name: "Peter", age: 55}, "Should match").toMatchObject({
            name: "Peter"
        })
    })

    test("Web first assertions", async ({page}) => {
        const userName = 'Stanislav'

        await page.goto('/');

        const signUpBtn = page.locator('.hero-descriptor_btn')
        await expect(signUpBtn, 'Sign up button should be visible').toBeVisible({
            timeout: 10_000
        })
        await signUpBtn.click()

        const form = page.locator('app-signup-modal form')
        const nameInput = form.locator('#signupName')

        await nameInput.fill(userName)
        await expect(nameInput).toHaveValue(userName)
        await nameInput.fill("Peter")
        await expect(nameInput).toHaveValue("Peter")
        await page.pause()
    })

    test.only("Screenshots", async ({page}) => {
        const userName = 'Stanislav'

        await page.goto('/');

        const signUpBtn = page.locator('.hero-descriptor_btn')
        await expect(signUpBtn, 'Sign up button should be visible').toBeVisible({
            timeout: 10_000
        })
        await signUpBtn.click()

        const form = page.locator('app-signup-modal form')
        const nameInput = form.locator('#signupName')

        await nameInput.focus()
        await nameInput.blur()
        await expect(form).toHaveScreenshot('name-validation.png', {
            maxDiffPixelRatio: 0.018
        })

    })
})