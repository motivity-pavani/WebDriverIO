const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');
const path = require('path');

class DailyTask extends Common {

    get contractSearchInput() {
        return $(`//input[@aria-label="Contract Filter Input"]`)
    }

    get invoiceCreateBtn() {
        // return $(`//bh-multi-action-button//div//div/a[@title="Invoice"]`)
        return $(`//a[@title="Invoice"][1]`)
    }
    get deductionBtn() {
        return $(`//a[@title="Deduction"][1]`)
    }

    get fileUploadInput() {
        return $(`//input[@type='file']`)
    }

    get uploadSaveBtn() {
        return $(`//button[text()=' Upload ']`)
    }

    get uploadConfirmBtn() {
        return $(`//div[@class='right-side-action-buttons bg-buttons']//button[1]`)
    }
    get uploadModelCloseBtn() {
        return $(`(//button[@class='close'])[2]`)
    }

    async generateInvoice({ contractName }) {
        contractName = contractName == 'default' ? utilities.contractName : accountName;
        await commonMethods.waitForBrowser(2000)
        await setText(this.contractSearchInput, contractName)
        await commonMethods.waitForBrowser(5000)
        await click(this.invoiceCreateBtn)
        await commonMethods.waitForBrowser(5000)
    }

    async deductionInvoice({ fileLocation }) {
        await click(this.deductionBtn)
        await commonMethods.waitForBrowser(2000)
        const filePath = path.join(__dirname, fileLocation);
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.fileUploadInput.setValue(remoteFilePath);
        this.data.inputLabelName = 'Deduction Date';
        await setText(this.inputField, utilities.toDayDate);
        await click(this.uploadSaveBtn);
        await commonMethods.waitForBrowser(10000)
        await click(this.uploadConfirmBtn);
        await commonMethods.waitForBrowser(10000)
        await click(this.uploadModelCloseBtn);

    }

}
module.exports = new DailyTask()