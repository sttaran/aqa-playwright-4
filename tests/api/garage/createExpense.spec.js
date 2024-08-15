import {expect, test} from "../../../src/fixtures/myFixtures.js";
import {CAR_BRANDS} from "../../../src/data/cars.js";
import {CAR_MODELS} from "../../../src/data/carModels.js";
import { faker } from '@faker-js/faker';
import ExpensesController from "../../../src/controllers/ExpensesController.js";


test.describe("Create Expense", ()=>{
    const carBrand = CAR_BRANDS.Audi
    const carModel = CAR_MODELS.AUDI.A6

    test(`Add an expense for ${carBrand.title} and model ${carModel.title}`, async({request, newCar: createdCar})=>{
        console.log(createdCar)
        const expenseRes =  await request.post('/api/expenses', {
            data: {
                "carId": createdCar.id,
                "reportedAt": new Date().toISOString(),
                "mileage": createdCar.mileage + faker.number.int({min: 1, max: 10}),
                "liters": faker.number.int({min: 1, max: 10}),
                "totalCost": faker.number.int({min: 1, max: 10})
            }
        })
        const expensesBody = await expenseRes.json()
        expect(expensesBody.status).toBe('ok')
    })

    test.only(`Add an expense for ${carBrand.title} and model ${carModel.title} (with controller)`, async({expensesController, newCar: createdCar})=>{
        const expenseRes = await expensesController.createExpense({
            "carId": createdCar.id,
            "reportedAt": new Date().toISOString(),
            "mileage": createdCar.mileage + faker.number.int({min: 1, max: 10}),
            "liters": faker.number.int({min: 1, max: 10}),
            "totalCost": faker.number.int({min: 1, max: 10})
        })

        const expensesBody = await expenseRes.json()
        expect(expensesBody.status).toBe('ok')
    })

    // test(`Add an expense for ${carBrand.title} and model ${carModel.title}`, async({request, createNewCar})=>{
    //     const createdCar = createNewCar({
    //         //...
    //     })
    //     const expenseRes =  await request.post('/api/expenses', {
    //         data: {
    //             "carId": createdCar.id,
    //             "reportedAt": new Date().toISOString(),
    //             "mileage": createdCar.mileage + faker.number.int({min: 1, max: 10}),
    //             "liters": faker.number.int({min: 1, max: 10}),
    //             "totalCost": faker.number.int({min: 1, max: 10})
    //         }
    //     })
    //     const expensesBody = await expenseRes.json()
    //     expect(expensesBody.status).toBe('ok')
    // })

})
