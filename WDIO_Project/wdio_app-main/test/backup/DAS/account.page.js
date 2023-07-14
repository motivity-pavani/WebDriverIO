const commonFunctions = require('../../common/commonfunctions')
const commonpage = require('./common.page')
var { dt, accountNameValue, generate } = require('./globalvariables')
class accountPage {

    // contract
    data = {
        carrierName: "",
        productGroupName: "",
        EnrollmentKeyName: ""

    }
    get selectContractsMenu() {
        return $('//div[contains(@class,"acc-details-category-section")]//div[text()=" Contracts "]');
    }
    get openAddContractModel() {
        return $(`//span[text()='Add Contract']`)

    }
    get nameInput() {
        return $(`//input[@name='name']`)
    }

    get effectiveDateInput() {
        return $(`//input[@name='effectiveDate']`)
    }

    get firstProcessingDateInput() {
        return $(`//input[@name='firstProcessingDate']`)
    }

    get policyNumInput() {
        return $(`//input[@name='policyNum']`)
    }

    get tminuscreationDateInput() {
        return $(`//input[@name='tminuscreationDate']`)
    }

    get CarrierSelectInput() {
        return $(`//label[text()='Carrier']/following::input`)
    }
    get CarrierDropDown() {
        // return $(`//span[text()='Unified Life']`)
        // return $(`//span[text()='${this.data.carrierName}']`)
        //span[text()='Health and Wealth']
        return $(`//label[text()="Carrier"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="${this.data.carrierName}"]`)
    }
    get productGroupSelectInput() {
        return $(`//label[text()='Product Group']/following::input`)
    }
    get productGroupDropDown() {
        // return $(`//span[text()='Variable Unit']`)
        // return $(`//span[text()='${this.data.productGroupName}']`)
        return $(`//label[text()="Product Group"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="${this.data.productGroupName}"]`)
    }

    get EnrollmentKeySelectInput() {
        return $(`//label[text()="Enrollment Key"]//following-sibling::ng-select`)
    }
    get EnrollmentKeyDropDown() {
        return $(`//label[text()="Enrollment Key"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="${this.data.EnrollmentKeyName}"]`)
    }
    get saveBtn() {
        return $(`//button[text()=' Save ']`)
    }



    async addContract({ tminuscreationDate, carrier, productGroup, enrollmentKey }) {
        this.data = {
            carrierName: carrier,
            productGroupName: productGroup,
            EnrollmentKeyName: enrollmentKey

        }
        await commonFunctions.click(this.selectContractsMenu)
        await commonFunctions.waitFor2Sec()
        await commonFunctions.click(this.openAddContractModel)
        await commonFunctions.waitFor2Sec()
        await commonFunctions.setText(this.nameInput, accountNameValue)
        await commonFunctions.setText(this.effectiveDateInput, dt)
        await commonFunctions.setText(this.firstProcessingDateInput, dt)
        await commonFunctions.setText(this.policyNumInput, generate(10))
        await commonFunctions.setText(this.tminuscreationDateInput, tminuscreationDate)
        await commonFunctions.click(this.CarrierSelectInput)
        await commonFunctions.waitFor2Sec()
        await commonFunctions.click(this.CarrierDropDown)
        await commonFunctions.waitFor5Sec()
        await commonFunctions.click(this.productGroupSelectInput);
        await commonFunctions.waitFor2Sec()
        await commonFunctions.click(this.productGroupDropDown)
        await commonFunctions.click(this.EnrollmentKeySelectInput);
        await commonFunctions.click(this.EnrollmentKeyDropDown)
        await commonFunctions.waitFor10Sec()
        await commonFunctions.click(this.saveBtn);
        await commonFunctions.waitFor10Sec()


    }


}
module.exports = new accountPage();