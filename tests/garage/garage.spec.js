import {expect, test} from "@playwright/test";
import GaragePage from "../../src/pageObjects/garagePage/GaragePage.js";
import {USER1_STORAGE_STATE_PATH} from "../../src/data/constants.js";



test.describe('Garage', () => {
    let garagePage

        test.beforeEach(async ({browser}) => {
            const ctx = await browser.newContext({
                storageState: USER1_STORAGE_STATE_PATH
            })
            const page = await ctx.newPage()
            garagePage = new GaragePage(page)
            await garagePage.navigate()
        })

      test('should be able to open the garage', async () => {
              await expect(garagePage.addCarButton).toBeVisible();
      });

    test('should be able to open the garage 2', async () => {
        await expect(garagePage.addCarButton).toBeEnabled();
    });
})