import {expect, test} from "../../../src/fixtures/myFixtures.js";
import {CAR_BRANDS} from "../../../src/data/cars.js";
import {CAR_MODELS} from "../../../src/data/carModels.js";
import moment from "moment";
import { faker } from '@faker-js/faker';


test.describe("Create car with controller", ()=>{
    const carBrand = CAR_BRANDS.Audi
    let carsIdToDelete

    test.afterEach(async ({carsController})=>{
        // const carsList = await carsController.getCars()
        // const {data: cars} = await carsList.json()
        //
        // await Promise.all(
        //     carsToDelete.map((id)=>(async ()=>{
        //         const res = await carsController.deleteCar(id)
        //         await expect(res).toBeOK()
        //     })())
        // )

        if(carsIdToDelete){
            const res = await carsController.deleteCar(carsIdToDelete)
            await expect(res).toBeOK()
        }

        carsIdToDelete = null
    })

    for (const carModel of Object.values(CAR_MODELS.AUDI)) {
        test(`Create car with brand ${carBrand.title} and model ${carModel.title}`, async({carsController})=>{
            // Arrange
            const requestBody = {
                "carBrandId": carBrand.id,
                "carModelId": carModel.id,
                "mileage": faker.number.int({min: 1, max: 100})
            }
            // ACT
            const requestTime = new Date()
            const response = await carsController.createCar(requestBody)

            // Assert
            expect(response.status(), "Status code should be valid").toBe(201)
            const actualBody = await response.json()
            carsIdToDelete = actualBody.data.id
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


            expect(moment(actualBody.data.carCreatedAt).diff(requestTime, 'second'), "'carCreatedAt' should be valid").toBeLessThan(3)
            expect(moment(actualBody.data.updatedMileageAt).diff(requestTime, 'second'), "'carCreatedAt' should be valid").toBeLessThan(3)
        })
    }
})
