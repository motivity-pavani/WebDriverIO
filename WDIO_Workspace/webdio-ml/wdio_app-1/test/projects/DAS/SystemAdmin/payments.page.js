const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');

class Payments extends Common {

    get accountSearchInput() {
        return $(`(//input[contains(@id,"Account") or contains(@aria-label,"Account Name Filter Input")])[1]`)
    }

    get checkBoxInput() {
        return $(`//span[contains(text(),'Description')]/preceding::div[contains(@class,'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper')][2]`)
    }

    get generateNACHABtn() {
        return $(`//img[@title="Generate NACHA"]`)
    }
    get generateNACHAConfirmBtn() {
        return $(`//button[text()=" Generate NACHA "]`)
    }
    get setDateInput() {
        return $(`#postingDate`)
    }
    async accountSearchandMark({ accountName }) {
        accountName = accountName == 'default' ? utilities.accountNameValue : accountName;
        await commonMethods.waitForBrowser(5000)
        await setText(this.accountSearchInput, accountName)
        await commonMethods.waitForBrowser(5000)
        await click(this.checkBoxInput)
        await commonMethods.waitForBrowser(5000)

    }

    async generateNACHA({
        postingDate,
        accountName,
        NACHAType,
        description
    }) {
        accountName = accountName == 'default' ? utilities.accountNameValue : accountName;
        NACHAType = NACHAType == 'default' ? 'Premium / Claim' : NACHAType;
        description = description == 'default' ? utilities.NACHA.description : description;
        postingDate = postingDate == 'default' ? utilities.toDayDate : postingDate;

        await commonMethods.waitForBrowser(5000)
        await this.accountSearchandMark({ accountName })
        await click(this.generateNACHABtn)
        await commonMethods.waitForBrowser(1000)
        await commonMethods.waitForBrowser(5000)
        // await this.setDateInput.setValue(postingDate);
        await commonMethods.waitForBrowser(5000)
        // await click(this.inputField)
        // 
        // await browser.debug()
        this.data.inputLabelName = "Posting Date";
        await setText(this.inputField, postingDate)

        this.data.dropHeader = 'NACHA Type';
        this.data.dropDownMenuValue = NACHAType;
        await click(this.openDropDown)
        await click(this.selectDropDownInput)

        this.data.inputLabelName = "Description";
        await setText(this.inputTextAreaField, description)
        console.log("description:", description)

        await commonMethods.waitForBrowser(1000)
        await click(this.generateNACHAConfirmBtn)
        await this.alertMessage(`Generate NACHA`)

        await commonMethods.waitForBrowser(2000)

    }


}
module.exports = new Payments();