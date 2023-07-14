const path = require('path');
const commonFunctions = require('../../common/commonfunctions')
const commonpage = require('./common.page')
var { dt, accountNameValue, generate } = require('./globalvariables')
// search Employees
class EmployeePage {
    get selectEmployeesMenu() { return $('//div[contains(@class,"acc-details-category-section")]//div[text()=" Employees "]'); }
    get buttonAddEmployee() { return $('//i[@title="Add Employee"]'); }
    get inputFirstName() { return $("#firstName") };
    get inputLastName() { return $("#lastName"); }
    get inputEmployeeId() { return $("#employeeId"); }
    get inputTaxId() { return $("#taxId"); }
    get inputDepartment() { return $("#department"); }
    get inputpayrollfrequency() { return $('(//input[@role="combobox"])[3]'); }
    get selectpayrollfrequency() { return $('//div[@role="option"]//span[1]'); }
    get inputGender() { return $('(//div[@class="ng-input"]//input)[3]'); }
    get selectGender() { return $('//span[text()="Male"]'); }
    get inputMaritalstatus() { return $('//label[text()="Marital Status"]/following::input'); }
    get selectMaritalstatus() { return $('//span[text()="Single"]'); }
    get inputEmail() { return $("#emailAddress"); }
    get inputMobileNumber() { return $("#mobileNumber"); }
    get buttonSave() { return $('//button[text()=" Save "]'); }

    get addEmployeesBtn() {
        return $(`//i[@title='Census']`)
    }
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

    //functions

    async clickOnEmployee() {
        await this.selectEmployeesMenu.click();
        await this.buttonAddEmployee.click();
    }
    async employeeUpload({ }) {
        const filePath = path.join(__dirname, './census.csv');
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.fileUploadInput.setValue(remoteFilePath);
        await commonFunctions.waitFor5Sec()
        await commonFunctions.setText(this.effectiveDateInput, dt)
        await commonFunctions.waitFor5Sec()
        await commonFunctions.click(this.uploadSaveBtn);
        await commonFunctions.waitFor5Sec()
        await commonFunctions.click(this.uploadConfirmBtn);
        await commonFunctions.waitFor5Sec()
        await commonFunctions.click(this.uploadModelCloseBtn);
        await commonFunctions.waitFor10Sec()

        //input[@type='file']

    }

    async filladdEmployeeDetailsAndSave() {
        await this.inputFirstName.setValue(data.firstname);
        await this.inputLastName.setValue(data.lastname);
        await this.inputEmployeeId.setValue(data.employeeId);
        alert("Please enter Effective Date manually and click ok");
        await browser.pause(7000);
        await this.inputTaxId.setValue(data.taxId);
        await this.inputDepartment.setValue(data.department);
        await this.inputpayrollfrequency.click();
        await this.selectpayrollfrequency.click();
        await this.inputGender.click();
        await this.selectGender.click();
        await this.inputMaritalstatus.click();
        await this.selectMaritalstatus.click();
        alert("Please enter DOB Date manually and click ok");
        await browser.pause(7000);
        await this.inputEmail.setValue(data.emailAddress);
        await this.inputMobileNumber.setValue(data.mobileNumber);
        await this.buttonSave.click();
        await browser.pause(10000);
        // await browser.pause(2000);

    }
}

module.exports = new EmployeePage();