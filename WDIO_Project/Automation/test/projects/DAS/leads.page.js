const commonMethods = require('./common.methods');
const { setText, click, selectFromDropdown } = require('./actions');
const utilities = require("./utilities");
const Common = require('./common');

class Leads extends Common{
    get addAccountBtn() {
        return $(`i[title="Add Account"]`);
    }
    get inputAcccountName() {
        return $('#accountName');
    }
    get inputEffectiveDate() {
        return $('input[name="effectiveDate"]');
    }
    get tpadropDown() {
        return $('//label[text()="TPA"]/following-sibling::ng-select[1]');
    }
    get taxId() {
        return $('#taxId');
    }
    get businessName() {
        return $('#businessName');
    }
    get entityTypeDropDown() {
        return $('//label[text()="Entity Type"]//following-sibling::ng-select');
    }
    get industryDropDown() {
        return $('//label[text()="Industry"]//following-sibling::ng-select');
    }
    get inputAddressLine1() {
        return $('#addressline');
    }
    get inputAddressLine2() {
        return $('#addressLine2');
    }
    get inputCity() {
        return $('#city');
    }
    get inputState() {
        return $('#state');
    }
    get inputCountry() {
        return $('#country');
    }
    get inputZip() {
        return $('#zip');
    }
    get inputAnnualRevenue() {
        return $('#annualRevenue');
    }
    get inputNumberofEmployees() {
        return $('#numEmployees');
    }
    get inputYearsOfBusiness() {
        return $('#yearsBusiness');
    }
    get payrollFrequencyDropDown() {
        return $('//label[text()="Payroll Frequency"]//following-sibling::ng-select');
    }
    get save() {
        return $('//button[text()=" Save "]');
    }
    get dropDownMenu() {
        return $('//ng-dropdown-panel//span[text()="' + this.data.dropDownMenuValue + '"]')
    }
    get effectiveDateIcon() {
        return $('//input[@name="effectiveDate"]//following-sibling::*//i[contains(@class,"date-picker-icon")]');
    }
    get effectiveDateWindow() {
        return $('//ngb-datepicker[@class="dropdown-menu show ngb-dp-body ng-star-inserted"]');
    }

    async addAccount({tpaName, businessName, entityType, industry, addressLine1, addressLine2, city, state, zip, country, annualrevenue, numberofemployees, yearsOfbusiness, payrollfrequency, autoNachaDay = 'default'}){
        utilities.businessName = businessName;
        console.log("**********************************************************");
        console.log(utilities.accountNameValue)
        utilities.payrollFrequency = payrollfrequency;
        console.log("**********************************************************");
        await setText(this.inputAcccountName, utilities.accountNameValue);
        await setText(this.inputEffectiveDate, utilities.dt);
        this.data.dropDownMenuValue = tpaName;
        this.data.dropHeader = "TPA";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)
        await setText(this.businessName, businessName);
        var taxIdValue = utilities.taxID();
        await setText(this.taxId, taxIdValue);
        this.data.dropDownMenuValue = entityType;
        this.data.dropHeader = "Entity Type";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)
        if (autoNachaDay !== 'default') {
            utilities.autoNachaDay = autoNachaDay;
            this.data.dropDownMenuValue = autoNachaDay;
            this.data.dropHeader = "Auto Nacha Day";
            await click(this.openDropDown)
            await click(this.selectDropDownInput)
        }

        this.data.dropDownMenuValue = industry;
        this.data.dropHeader = "Industry";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)
        await setText(this.inputAddressLine1, addressLine1);
        await setText(this.inputAddressLine2, addressLine2);
        await setText(this.inputCity, city);
        await setText(this.inputState, state);
        await setText(this.inputCountry, country);
        await setText(this.inputZip, zip);
        await setText(this.inputAnnualRevenue, annualrevenue);
        await setText(this.inputNumberofEmployees, numberofemployees);
        await setText(this.inputYearsOfBusiness, yearsOfbusiness);
        this.data.dropDownMenuValue = payrollfrequency;
        this.data.dropHeader = "Payroll Frequency";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)
        await click(this.save);
        await this.alertMessage('Add Account')
        
    }

     /* Account Activate page */

     get activateBtn() {
        return $(`//a[@data-target='#activateAccountModal']`)
    }
    get postingDateInput() {
        return $(`//input[@name='postingDate']`)
    }

    get verifyBtn() {
        return $(`//button[text()=' OK ']`)
    }
    async activateAccount({ effectiveDate }) {
        await click(this.activateBtn);
        let date = effectiveDate == 'default' ? utilities.dt : effectiveDate;
        await setText(this.postingDateInput, date);
        await click(this.verifyBtn);
        await this.alertMessage('Activate Account')
        await commonMethods.waitForBrowser(5000)

    }

    /* end */

    /* bank details in account info page */

    data={
        sectionItemName: ""
    }

     get businessDetailsAccName(){
        return $(`//div[contains(text(), "${utilities.businessName}")]`);
    }
    get businessDetailsSections(){
        return $(`//div[text()="${this.data.sectionItemName}"]`)
    }


    async sectionMenuItem({ sectionName }) {
        //await browser.debug();
        console.log("****************sectionName*******************");
        //await click(this.businessDetailsAccName);
        await commonMethods.waitForBrowser(10000)
        await commonMethods.waitForBrowser(10000)
        await commonMethods.waitForBrowser(10000)
        this.data.sectionItemName = sectionName;
        await click(this.businessDetailsSections);
        await commonMethods.waitForBrowser(2000)
    }

    async businessDetailsBankAccName(){
        await commonMethods.waitForBrowser(9000)
        await click(this.businessDetailsAccName);
        
    }

    /* end */

    get fieldFEIN(){
        return $(`//form//label[contains(text(),"FEIN")]//following-sibling::input`)
    }
    async addAccountadm({tpaName}){
        console.log("**********************************************************");
        console.log(utilities.accountNameValue)
        console.log("**********************************************************");
        await setText(this.inputAcccountName, utilities.accountNameValue);
        await setText(this.inputEffectiveDate, utilities.dt);
        this.data.dropDownMenuValue = tpaName;
        this.data.dropHeader = "TPA";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)
        await setText(this.fieldFEIN, utilities.FEIN)
        await commonMethods.waitForBrowser(2000)
        await setText(this.businessName, utilities.businessName);
        await click(this.save);
        await this.alertMessage('Add Account')
    }
    

}
module.exports = new Leads();