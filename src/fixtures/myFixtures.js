import {test as base, expect as baseExpect} from "@playwright/test";
import GaragePage from "../pageObjects/garagePage/GaragePage.js";
import {USER1_STORAGE_STATE_PATH} from "../data/constants.js";

export const test = base.extend({
    context: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            //  get from file
            storageState: USER1_STORAGE_STATE_PATH
        })

        await use(ctx)

        await ctx.close()
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