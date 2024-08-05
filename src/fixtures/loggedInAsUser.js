import {test as base, expect as baseExpect} from "@playwright/test";
import GaragePage from "../pageObjects/garagePage/GaragePage.js";
import {USER1_STORAGE_STATE_PATH} from "../data/constants.js";

export const loggedInAsUser = base.extend({
    page: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            //  get from file
            storageState: USER1_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()

        await use(page)

        await page.close()
    },
    garagePage: async ({page}, use)=>{
        // before test
        const gp = new GaragePage(page)

        // pass to test
        use(gp)

        // after test
    },
})

export const expect = baseExpect