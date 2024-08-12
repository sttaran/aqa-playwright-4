import {expect, test} from "../../../src/fixtures/myFixtures.js";
import {CAR_BRANDS} from "../../../src/data/cars.js";
import {CAR_MODELS} from "../../../src/data/carModels.js";


test.describe("Create car", ()=>{
    const carBrand = CAR_BRANDS.Audi

    for (const carModel of Object.values(CAR_MODELS.AUDI)) {
        test(`Create car with brand ${carBrand.title} and model ${carModel.title}`, async({request})=>{
            // Arrange
            const requestBody = {
                "carBrandId": carBrand.id,
                "carModelId": carModel.id,
                "mileage": Math.floor(Math.random() * 100)
            }
            // ACT
            const response = await request.post('/api/cars', {
                data: requestBody
            })

            // Assert
            expect(response.status(), "Status code should be valid").toBe(201)
            const actualBody = await response.json()
            expect(actualBody).toEqual({
                "status": "ok",
                "data": {
                    "id": expect.any(Number),
                    "carBrandId": requestBody.carBrandId,
                    "carModelId": requestBody.carModelId,
                    "initialMileage": requestBody.mileage,
                    "updatedMileageAt": expect.any(String),
                    "carCreatedAt": expect.any(String),
                    "mileage": requestBody.mileage,
                    "brand": carBrand.title,
                    "model": carModel.title,
                    "logo": carBrand.logoFilename
                }
            })
        })
    }
})

test.describe.only("Create car", ()=>{
    const carBrand = CAR_BRANDS.Audi

    for (const carModel of Object.values(CAR_MODELS.AUDI)) {
        test(`Create car with brand ${carBrand.title} and model ${carModel.title}`, async({request})=>{
            // Arrange
            const requestBody = {
                "carBrandId": carBrand.id,
                "carModelId": carModel.id,
                "mileage": Math.floor(Math.random() * 100)
            }
            // ACT
            const response = await request.post('/api/cars', {
                data: requestBody
            })

            // Assert
            expect(response.status(), "Status code should be valid").toBe(201)
            const actualBody = await response.json()
            expect(actualBody).toEqual({
                "status": "ok",
                "data": {
                    "id": expect.any(Number),
                    "carBrandId": requestBody.carBrandId,
                    "carModelId": requestBody.carModelId,
                    "initialMileage": requestBody.mileage,
                    "updatedMileageAt": expect.any(String),
                    "carCreatedAt": expect.any(String),
                    "mileage": requestBody.mileage,
                    "brand": carBrand.title,
                    "model": carModel.title,
                    "logo": carBrand.logoFilename
                }
            })
        })
    }
})
