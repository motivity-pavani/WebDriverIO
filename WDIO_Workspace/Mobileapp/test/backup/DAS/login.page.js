
// const { navigateBrowser } = require('./page');
// const Page = require('./page');
const logger = require('../../utilities/winston')
const commonFunctions = require('../../common/commonfunctions')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class login {
    /**
     * define selectors using getter methods
     */
    //get btnLogin() { return $('a[href = "/login"]')} //find element login
    //get textCheck(){return $('(//*[contains(text(),"RETIREMENT ACCOUNTS")])[2]')}
    get inputUsername() { return $('#username'); }
    get inputPassword() { return $('#password'); }
    get btnSubmit() { return $('button[name="submit"]'); }
    get SystemAdmin() { return $('//div[text()=" System Admin "]'); }
    get accountNameSearch() { return $('input[aria-label="Account Name Filter Input"]'); }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login({ username, password, selectGroup }) {
        try {
            await commonFunctions.setText(this.inputUsername, username)
            await commonFunctions.setText(this.inputPassword, password)
            await commonFunctions.click(this.btnSubmit)
            var selectGroupType = $('//div[text()=" ' + selectGroup + ' "]')
            await commonFunctions.waitForDisplayed10Sec(selectGroupType)
            await commonFunctions.click(selectGroupType)
            await commonFunctions.waitFor2Sec()
            // await commonFunctions.waitForClickable10Sec(this.accountNameSearch)
        }
        catch (e) {
            logger.error(`ERROR-efficienceLogin:- , ${e.message}`)
            console.log("ERROR-efficienceLogin:", e.message)
        }
    }
}

module.exports = new login();
