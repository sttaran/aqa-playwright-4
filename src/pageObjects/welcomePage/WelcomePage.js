import BasePage from "../BasePage.js";


export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('.header-link.-guest') )
    }


    // Might be okay but I don't recommend
    verifyEmailInputError(errorText){
        // real vs expected
    }
}