import {expect, test} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";

test.describe("Login @login", ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('/')
        const signInButton = page.locator('.header_signin')

        await signInButton.click()
    })

    test('empty email', async({page})=>{
        const emailInput = page.locator('#signinEmail')
        await emailInput.focus()
        await emailInput.blur()

        const validationMessage = page.locator('#signinEmail + .invalid-feedback')
        await expect(validationMessage).toHaveText('Email required');
        await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('empty password', async({page})=>{
        const passwordInput = page.locator('#signinPassword')
        await passwordInput.focus()
        await passwordInput.blur()

        const validationMessage = page.locator('#signinPassword + .invalid-feedback')
        await expect(validationMessage).toHaveText('Password required');
        await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })
})


test.describe("Login POM", ()=>{
    let signInPopup

    test.beforeEach(async ({page})=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        signInPopup = await welcomePage.header.clickSignInButton()
    })

    test.only('empty email @login', async({page})=>{
        await signInPopup.emailInput.focus()
        await signInPopup.emailInput.blur()
        // await page.pause()

        await expect(signInPopup.emailValidationMessage).toHaveText('Email required');
        await expect(signInPopup.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('wrong format email', async({page})=>{
        await signInPopup.fill({
            email: 'wrong#kkkk',
            password: '123'
        })

        await expect(signInPopup.emailValidationMessage).toHaveText('Email is incorrect' );
        await expect(signInPopup.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('empty password', async({page})=>{
        await signInPopup.passwordInput.focus()
        await signInPopup.passwordInput.blur()

        await expect(signInPopup.passwordValidationMessage).toHaveText('Password required');
        await expect(signInPopup.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })
})