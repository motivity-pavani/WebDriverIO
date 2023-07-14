//const Page = require('./page');

const commonFunctions = require('../../common/commonfunctions')
// const { generateRandomNumber, dateMethods } = require('../utilities')
const { accountNameValue, dt } = require('./globalvariables')


class LeadsPage {

    get inputAcccountName() { return $('#accountName'); }
    get effectiveDateIcon() { return $('//input[@name="effectiveDate"]//following-sibling::*//i[contains(@class,"date-picker-icon")]'); }
    get effectiveDateWindow() { return $('//ngb-datepicker[@class="dropdown-menu show ngb-dp-body ng-star-inserted"]'); }
    get inputEffectiveDate() { return $('input[name="effectiveDate"]'); }
    get tpadropDown() { return $('//label[text()="TPA"]/following-sibling::ng-select'); }
    get businessName() { return $('#businessName'); }
    get taxId() { return $('#taxId'); }
    get entityTypeDropDown() { return $('//label[text()="Entity Type"]//following-sibling::ng-select'); }
    get industryDropDown() { return $('//label[text()="Industry"]//following-sibling::ng-select'); }
    get inputAddressLine1() { return $('#addressline'); }
    get inputAddressLine2() { return $('#addressLine2'); }
    get inputCity() { return $('#city'); }
    get inputState() { return $('#state'); }
    get inputCountry() { return $('#country'); }
    get inputZip() { return $('#zip'); }
    get inputAnnualRevenue() { return $('#annualRevenue'); }
    get inputNumberofEmployees() { return $('#numEmployees'); }
    get inputYearsOfBusiness() { return $('#yearsBusiness'); }
    get payrollFrequencyDropDown() { return $('//label[text()="Payroll Frequency"]//following-sibling::ng-select'); }
    get save() { return $('//button[text()=" Save "]'); }
    get addAccountIcon() { return $('i[title="Add Account"]'); }


    async clickAddAccountIcon() {
        await commonFunctions.click(this.addAccountIcon)
    }

    async verifyAccountCreatedInLeads() {
        var accountNameInGrid = $('//div[@ref="eCenterContainer"]//div[@role="row"]//span[@class="ag-cell-link-button bh-text ellipsis ng-star-inserted"]');
        expect(await accountNameInGrid.getAttribute('title')).toEqual(testdata.accountName)
    }

    async filladdAccountDetailsAndSave({ accountName, tpaName, businessName, entityType, industry, autoNachaDay, addressLine1, addressLine2, city, state, zip, country, annualrevenue, numberofemployees, yearsOfbusiness, payrollfrequency }) {
        // var accnum = ""
        this.clickAddAccountIcon()
        await commonFunctions.waitFor2Sec()
        // if (accountName == "") {
        //     accnum = accountNameValue
        // } else {
        //     accnum = accountName
        // }
        await commonFunctions.setText(this.inputAcccountName, accountNameValue)
        await commonFunctions.setText(this.inputEffectiveDate, dt)
        await commonFunctions.selectFromDropdown(this.tpadropDown, tpaName)
        await commonFunctions.setText(this.businessName, businessName);
        var taxIdValue = "22-" + Math.floor(Math.random() * (9999999 - 1000000) + 1000000)
        await commonFunctions.setText(this.taxId, taxIdValue);
        await commonFunctions.selectFromDropdown(this.entityTypeDropDown, entityType)
        await commonFunctions.selectFromDropdown(this.industryDropDown, industry)
        await commonFunctions.setText(this.inputAddressLine1, addressLine1);
        await commonFunctions.setText(this.inputAddressLine2, addressLine2);
        await commonFunctions.setText(this.inputCity, city);
        await commonFunctions.setText(this.inputState, state);
        await commonFunctions.setText(this.inputCountry, country);
        await commonFunctions.setText(this.inputZip, zip);
        await commonFunctions.setText(this.inputAnnualRevenue, annualrevenue);
        await commonFunctions.setText(this.inputNumberofEmployees, numberofemployees);
        await commonFunctions.setText(this.inputYearsOfBusiness, yearsOfbusiness);
        await commonFunctions.selectFromDropdown(this.payrollFrequencyDropDown, payrollfrequency)
        await commonFunctions.click(this.save);
        await commonFunctions.waitFor10Sec()

    }
}
module.exports = new LeadsPage();