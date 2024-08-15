import {test as base, expect as baseExpect, request as apiRequest} from "@playwright/test";
import GaragePage from "../pageObjects/garagePage/GaragePage.js";
import {USER1_STORAGE_STATE_PATH} from "../data/constants.js";
import {faker} from "@faker-js/faker";
import {CAR_BRANDS} from "../data/cars.js";
import {CAR_MODELS} from "../data/carModels.js";
import CarsController from "../controllers/CarsController.js";
import ExpensesController from "../controllers/ExpensesController.js";

export const test = base.extend({
    context: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            //  get from file
            storageState: USER1_STORAGE_STATE_PATH
        })

        await use(ctx)

        await ctx.close()
    },
    request: async ({}, use)=>{
        const ctx = await apiRequest.newContext({
            //  get from file
            storageState: USER1_STORAGE_STATE_PATH
        })

        await use(ctx)

        await ctx.dispose()
    },
    garagePage: async ({page}, use)=>{
        // before test
        const gp = new GaragePage(page)

        // pass to test
        use(gp)

        // after test
    },
    carsController:  async ({request}, use)=>{
        await use(new CarsController(request))
    },
    expensesController:  async ({request}, use)=>{
        await use(new ExpensesController(request))
    },
    newCar: async ({request, carsController}, use)=>{
        // before test
        const carBrand = CAR_BRANDS.Audi
        const carModel = CAR_MODELS.AUDI.A6

        const requestBody = {
            "carBrandId": carBrand.id,
            "carModelId": carModel.id,
            "mileage": faker.number.int({min: 1, max: 100})
        }
        const response = await carsController.createCar(requestBody)
        const body = await response.json()
        // pass to test
        use(body.data)

        // after test
        await request.delete(`/api/cars/${body.id}`)
    },
    // createNewCar: async ({request}, use)=>{
    //     // before test
    //
    //     const creatCar = async (requestBody) =>{
    //         const response = await request.post('/api/cars', {
    //             data: requestBody
    //         })
    //         return  response.json()
    //     }
    //     // pass to test
    //     use(creatCar)
    //
    //     // after test
    //
    // },
})

export const expect = baseExpect