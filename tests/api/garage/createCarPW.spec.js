import {expect, test} from "../../../src/fixtures/myFixtures.js";
import {CAR_BRANDS} from "../../../src/data/cars.js";
import {CAR_MODELS} from "../../../src/data/carModels.js";
import moment from "moment";
import { faker } from '@faker-js/faker';


test.describe("Create car", ()=>{
    const carBrand = CAR_BRANDS.Audi

    test.afterEach(async ({request})=>{
        const carsList = await request.get('/api/cars')
        const {data: cars} = await carsList.json()

        await Promise.all(
            cars.map((car)=>(async ()=>{
                const res = await request.delete(`/api/cars/${car.id}`)
                await expect(res).toBeOK()
            })())
        )
    })

    for (const carModel of Object.values(CAR_MODELS.AUDI)) {
        test(`Create car with brand ${carBrand.title} and model ${carModel.title}`, async({request})=>{
            // Arrange
            const requestBody = {
                "carBrandId": carBrand.id,
                "carModelId": carModel.id,
                // "mileage": Math.floor(Math.random() * 100)
                "mileage": faker.number.int({min: 1, max: 100})
            }
            // ACT
            const requestTime = new Date()
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

            expect(actualBody.data.id, "Id should be positive number").toBeGreaterThan(0)
            expect(moment(actualBody.data.updatedMileageAt).isValid(), "Date should be valid").toBeTruthy()
            expect(moment(actualBody.data.carCreatedAt).isValid(), "Date should be valid").toBeTruthy()

            // expect(moment(actualBody.data.updatedMileageAt).isAfter(requestTime), "'updatedMileageAt' should be valid").toBe(true)
            // expect(moment(actualBody.data.carCreatedAt).isAfter(requestTime), "'carCreatedAt' should be valid").toBe(true)

            expect(moment(actualBody.data.carCreatedAt).diff(requestTime, 'second'), "'carCreatedAt' should be valid").toBeLessThan(3)
            expect(moment(actualBody.data.updatedMileageAt).diff(requestTime, 'second'), "'carCreatedAt' should be valid").toBeLessThan(3)
        })
    }
})

test.describe("Create car 2", ()=>{
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
