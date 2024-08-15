

export default class ExpensesController {
    #CREATE_EXPENSE_PATH = '/api/expenses'

    constructor(request){
        this._request = request
    }

    async createExpense(requestBody){
        return this._request.post(this.#CREATE_EXPENSE_PATH, {
            data: requestBody
        })
    }
}