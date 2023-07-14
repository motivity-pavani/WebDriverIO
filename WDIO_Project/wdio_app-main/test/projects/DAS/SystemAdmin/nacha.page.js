const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');

class Nacha extends Common {
    get accountSearchInput() {
        return $(`(//input[contains(@id,"Account") or contains(@aria-label,"Description Filter Input")])[1]`)
    }
    get checkBoxInput() {
        return $(`//span[contains(text(),'Description')]/preceding::div[contains(@class,'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper')]`)
    }

    // get markInput() {
    //     return $(`//i[@class='bi bi-file-check-fill']`)
    // }
    async accountSearchandMark({ description }) {
        description = description == 'default' ? utilities.NACHA.description : description;
        await commonMethods.waitForBrowser(2000)
        await setText(this.accountSearchInput, description)
        await commonMethods.waitForBrowser(2000)
        await click(this.checkBoxInput)
        await commonMethods.waitForBrowser(2000)

    }

    async nachaApprove({ description }) {
        await this.accountSearchandMark({ description })
        await commonMethods.waitForBrowser(2000)
        this.data.tableBtnName = 'Approve Nacha'
        await click(this.TableBtn)
        await this.alertMessage(`NACHA Approve`)
        await commonMethods.waitForBrowser(5000)


    }


    async nachSubmit({ description }) {
        await this.accountSearchandMark({ description })
        await commonMethods.waitForBrowser(2000)
        this.data.tableBtnName = 'Submit Nacha'
        await click(this.TableBtn)
        await this.alertMessage(`NACHA Submit`)
        await commonMethods.waitForBrowser(5000)
    }

    async nachMarkasPaid({ description }) {
        await this.accountSearchandMark({ description })
        await commonMethods.waitForBrowser(2000)
        await click(this.markInput)
        await this.alertMessage(`NACHA Mark as Paid`)
        await commonMethods.waitForBrowser(5000)

    }
}
module.exports = new Nacha();
