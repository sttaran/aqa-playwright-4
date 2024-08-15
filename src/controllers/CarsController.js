

export default class CarsController {
    #CREATE_CAR_PATH = '/api/cars'
    #GET_CARS_PATH = '/api/cars'
    #DELETE_CAR_PATH = (id) => `/api/cars/${id}`

    constructor(request){
        this._request = request
    }

    async getCars(){
        console.log("Get all user's cars")
        return this._request.get(this.#GET_CARS_PATH)
    }

    async createCar(requestBody){
        console.log("Create car with data: ", requestBody)
        return this._request.post(this.#CREATE_CAR_PATH, {
            data: requestBody
        })
    }

    async deleteCar(id){
        console.log(`Delete car bt id: ${id}`)
        return this._request.delete(this.#DELETE_CAR_PATH(id))
    }
}