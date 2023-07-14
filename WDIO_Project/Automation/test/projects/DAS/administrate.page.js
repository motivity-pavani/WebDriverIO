//const { setText, click } = require("./actions");
const { setText, click, selectFromDropdown } = require('./actions');
const commonMethods = require('./common.methods');
const utilities = require("./utilities");
const Common = require('./common');
class Administrate extends Common{
    data = {
        sideMenuItem: "",
        fieldname: "",
    }
    get sideMenu() {
        return $(`//div[contains(@class,"left-menu-category-section bh-text muted ng-star-inserted")]//div[contains(text(), '${this.data.sideMenuItem}')]`)
    }
    
    
    get addBussinessMng(){
        //return $(`//label[contains(text(), "Business Name")]//following-sibling::input`)
        return $(`i[title="Add Business Management"]`);
    }
    get fieldName(){
        return $(`//label[contains(text(), "${this.data.fieldname}")]//following-sibling::input`)
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
    get save() {
        return $('//button[text()=" Save "]');
    }

    async admSideMenuItem({ menuName }) {
        this.data.sideMenuItem = menuName;
        await commonMethods.waitForBrowser(15000)
        await click(this.sideMenu);
        await commonMethods.waitForBrowser(5000)
    }

    async addBusinessManagement({FEIN, businessName, businessMail, businessPhoneNo, addressLine1, addressLine2, city, state, country, zip, entityType, industry, annualrevenue, numberofemployees, yearsOfbusiness, payrollfrequency}){
       // utilities.FEIN= FEIN
       console.log(FEIN)
       console.log(utilities.FEIN) 
        this.data.fieldname="FEIN"
       // await commonMethods.waitForBrowser(9000)
        await setText(this.fieldName, utilities.FEIN);
        utilities.businessName= businessName
        this.data.fieldname="Business Name"
        await commonMethods.waitForBrowser(5000)
       // await setText(this.fieldName, utilities.businessName);
       console.log(utilities.businessName)
       console.log(businessName)
       await click(this.fieldName);
       await commonMethods.waitForBrowser(2000)
       await setText(this.fieldName, utilities.businessName)
        this.data.fieldname="Business Email"
        await setText(this.fieldName, businessMail);
        this.data.fieldname="Business Phone Number"
        await setText(this.fieldName, businessPhoneNo);
        await setText(this.inputAddressLine1, addressLine1);
        await setText(this.inputAddressLine2, addressLine2);
        await setText(this.inputCity, city);
        await setText(this.inputState, state);
        await setText(this.inputCountry, country);
        await setText(this.inputZip, zip);
        this.data.dropDownMenuValue = entityType;
        this.data.dropHeader = "Entity Type";
        await click(this.openDropDown)
        await commonMethods.waitForBrowser(9000)
        await click(this.selectDropDownInput)
        this.data.dropDownMenuValue = industry;
        this.data.dropHeader = "Industry";
        await click(this.openDropDown)
        await commonMethods.waitForBrowser(9000)
        await click(this.selectDropDownInput)
        await setText(this.inputAnnualRevenue, annualrevenue);
        await setText(this.inputNumberofEmployees, numberofemployees);
        await setText(this.inputYearsOfBusiness, yearsOfbusiness);
        this.data.dropDownMenuValue = payrollfrequency;
        this.data.dropHeader = "Payroll Frequency";
        await click(this.openDropDown)
        await commonMethods.waitForBrowser(9000)
        await click(this.selectDropDownInput)
        await click(this.save);
        await this.alertMessage('Add business Account')
    }

    //filter the latest data with fein
    get filterFEIN(){
        return $(`//div[@class="ag-wrapper ag-input-wrapper ag-text-field-input-wrapper"]//following-sibling::input[@aria-label="FEIN Filter Input"]`)
    }

    get searchAccount(){
        return $(`//div//span[@class="ag-cell-link-button bh-text ellipsis ng-star-inserted"]`);
    }

    async searchFEINAcc(){
        await commonMethods.waitForBrowser(9000)
        await setText(this.filterFEIN, utilities.FEIN)
        await click(this.searchAccount);
    }

    //add the bank account in administrater
    data={
        sectionItemName: ""
    }
    get admBusinessDetailsSections(){
        return $(`//div[text()="${this.data.sectionItemName}"]`)
    }
    async sectionMenuItem({ sectionName }) {
        console.log("****************sectionName*******************");
        await commonMethods.waitForBrowser(9000)
        this.data.sectionItemName = sectionName;
        await click(this.admBusinessDetailsSections);
        await commonMethods.waitForBrowser(2000)
    }


}
module.exports = new Administrate();