import {loggedInAsUser, expect} from "../../src/fixtures/loggedInAsUser.js";

loggedInAsUser.describe.only('Garage', () => {
    loggedInAsUser.beforeEach(async ({ garagePage}) => {
        await garagePage.navigate()
    })

    loggedInAsUser('should be able to open the garage', async ({garagePage}) => {
          await expect(garagePage.addCarButton).toBeVisible();
      });

    loggedInAsUser('should be able to open the garage 2', async ({garagePage}) => {
        await expect(garagePage.addCarButton).toBeEnabled();
    });
})