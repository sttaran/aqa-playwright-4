import {test, expect} from "../../../src/fixtures/myFixtures.js";

const mockedCarBrands = {
    "status": "ok",
    "data": [
        {
            "id": 1,
            "title": "Lanos",
            "logoFilename": "audi.png"
        },
        {
            "id": 2,
            "title": "Renault",
            "logoFilename": "bmw.png"
        }
    ]
}

test.describe('Garage Network', () => {
    test.beforeEach(async ({ garagePage}) => {
        await garagePage.navigate()
    })

    test('should log request', async ({garagePage, page}) => {
        page.on('request', request => console.log('>>', request.method(), request.url()));

        await expect(garagePage.addCarButton).toBeVisible();

        await garagePage.addCarButton.click()
        await page.waitForTimeout(1500)
    });

    test('should abort', async ({garagePage, page}) => {
        await page.route("/api/cars/brands", async route =>{
            await route.abort()
        })

        await expect(garagePage.addCarButton).toBeVisible();

        await garagePage.addCarButton.click()
        // check if inputs in "Add car" form are disabled
    });

    test('should show mocked value', async ({garagePage, page}) => {
        await page.route("/api/cars/brands", async route =>{
          await route.fulfill({
              status: 200,
              json: mockedCarBrands
            })
        })

        await expect(garagePage.addCarButton).toBeVisible();

        await garagePage.addCarButton.click()
        // check if dropdowns have valid values
    });

})