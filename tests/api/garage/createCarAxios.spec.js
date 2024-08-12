import {expect, test} from "@playwright/test";
import axios  from 'axios'
import {USERS} from "../../../src/data/users.js";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import {config} from "../../../config/config.js";

test.describe("Create car", ()=>{
    let cookie
    test.beforeEach(async ()=>{
        const loginResponse = await axios.post('https://qauto.forstudy.space/api/auth/signin', {
            "email": USERS.USER1.email,
            "password": USERS.USER1.password,
            "remember": false
        })

        cookie = loginResponse.headers.get('set-cookie')[0].split(';')[0]
    })

    test("Create car with axios", async()=>{
        const requestBody = {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 122
        }

        const createCarResponse = await axios.post('https://qauto.forstudy.space/api/cars', requestBody, {
            headers: {
                "Cookie": cookie
            }
        })
        expect(createCarResponse.status).toBe(201)
    })
})


test.describe("Cars API", ()=>{
    test.describe("Create wih jar", ()=>{
        let request

        test.beforeAll(async ()=>{
            const jar = new CookieJar();
            request = wrapper(axios.create({
                jar,
                baseURL: config.baseURL,
                validateStatus: (status) => {
                    return status <= 500
                }
            }))

            await request.post(`${config.baseURL}api/auth/signin`,{
                "email": USERS.USER1.email,
                "password": USERS.USER1.password,
                "remember": false
            })
        })

        test.afterAll(async ()=>{
            const carsResponse = await request.get('/api/cars')
            const cars = await carsResponse.data

            await Promise.all(
                cars.data.map((car) => request.delete(`/api/cars/${car.id}`))
            )
        })

        test("create car", async ()=>{
            const requestBody = {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 122
            }

            const createCarResponse = await request.post('/api/cars', requestBody)
            expect(createCarResponse.status).toBe(201)
        })
    })
})