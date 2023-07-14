
const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');
const path = require('path');

class Employee extends Common {

    get fileUploadInput() {
        return $(`//input[@type='file']`)
    }

    get effectiveDateInput() {
        return $(`//input[@name='effectiveDate']`)
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
    async employeeUploadCensusFile({ fileLocation }) {
        await commonMethods.waitForBrowser(5000)
        this.data.tableBtnName = 'Census';
        await click(this.TableBtn)
        const filePath = path.join(__dirname, fileLocation);
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.fileUploadInput.setValue(remoteFilePath);
        await setText(this.effectiveDateInput, utilities.dt)
        await click(this.uploadSaveBtn);
        await commonMethods.waitForBrowser(10000)
        await click(this.uploadConfirmBtn);
        await commonMethods.waitForBrowser(10000)
        await click(this.uploadModelCloseBtn);

        //input[@type='file']

    }



}
module.exports = new Employee();
