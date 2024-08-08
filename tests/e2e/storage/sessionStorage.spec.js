import {expect, test} from "@playwright/test";


test.describe("Session Storage", ()=>{
  test("guest cars should be stored in local storage", async({page})=>{
    const sessionStorageKey = "guestData"

    await page.goto('/')
    await page.locator('button', {hasText: 'Guest log in'}).click()

    await page.locator('button', {hasText: 'Add car'}).click()

    const popup = page.locator('.modal-content')
    const mileageInput = page.locator('#addCarMileage')
    await mileageInput.fill("123")

    await popup.locator('button', {hasText: "Add"}).click()

      await expect(page.locator('.car-heading')).toBeVisible()

   const userData =  await page.evaluate(
        (key)=> window.sessionStorage.getItem(key),
        sessionStorageKey,
    )
    const parsed = JSON.parse(userData)
      parsed.cars.push({
          "id": 2,
          "brand": "BMW",
          "model": "X6",
          "logo": "bmw.png",
          "initialMileage": 123,
          "updatedMileageAt": "2024-08-05T16:38:43.108Z",
          "carCreatedAt": "2024-08-05T16:38:43.108Z",
          "carBrandId": 2,
          "carModelId": 9,
          "mileage": 123
      })

      const stringified = JSON.stringify(parsed)

      await page.evaluate(
          ({key, data})=> window.sessionStorage.setItem(key, data),
          {
              key:  sessionStorageKey,
              data: stringified
          }
      )

    await page.pause()
  })
})