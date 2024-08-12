import {expect, test} from "@playwright/test";
import {VALID_CARS_BRANDS_RESPONSE} from "./fixtures/fetchCarDataFixture.js";


test("fetch car brands", async({request})=>{
    const response = await request.get('/api/cars/brands')
    const body = await response.json()

    expect(body, "Response body should contain car brands").toEqual(VALID_CARS_BRANDS_RESPONSE)
})