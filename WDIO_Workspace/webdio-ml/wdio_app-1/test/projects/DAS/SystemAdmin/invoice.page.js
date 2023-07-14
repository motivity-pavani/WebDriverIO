const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');

class Invoice extends Common {

    get checkBoxInput() {
        return $(`//span[contains(text(),'Description')]/preceding::div[contains(@class,'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper')][2]`)
    }

    get accountSearchInput() {
        return $(`(//input[contains(@id,"Account") or contains(@aria-label,"Account")])[1]`)
    }


    async accountSearchandMark({ accountName }) {
        accountName = accountName == 'default' ? utilities.accountNameValue : accountName;
        await commonMethods.waitForBrowser(2000)
        await setText(this.accountSearchInput, accountName)
        await commonMethods.waitForBrowser(2000)
        await click(this.checkBoxInput)
        await commonMethods.waitForBrowser(2000)

    }


    async invoiceApprove({ accountName }) {
        await this.accountSearchandMark({ accountName })
        this.data.tableBtnName = 'Approve Invoice'
        await click(this.TableBtn)
        await commonMethods.waitForBrowser(1000)
        await click(this.yesBtn)
        await this.alertMessage('Invoice Approve')
        await commonMethods.waitForBrowser(5000)

    }

    async invoiceMaskasPaid({ accountName }) {
        await this.accountSearchandMark({ accountName })
        await click(this.markInput)
        await commonMethods.waitForBrowser(1000)
        await click(this.yesBtn)
        await this.alertMessage('Invoice Mark as Paid')
        await commonMethods.waitForBrowser(5000)

    }

}
module.exports = new Invoice()