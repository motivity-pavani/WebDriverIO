const commonfunctions = require("../../common/commonfunctions");
const browserPage = require("./browser.page");
const { accountNameValue, dt } = require('./globalvariables')

class contractPage {

  //add contract
  get selectContractMenu() { return $('//div[contains(@class,"acc-details-category-section")]//div[text()=" Contracts "]'); }
  get buttonAddContract() { return $('//span[text()="Add Contract"]'); }
  get inputContractName() { return $('//input[@name="name"]'); }
  get inputPolicyNumber() { return $('//input[@name="policyNum"]'); }
  get dropdownBusiness() { return $('//label[text()="Business"]//following-sibling::ng-select'); }
  // get dropdownBusinessValue(){return $ ('//label[text()="Business"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="'+data.businessValue+'"]');}
  get dropdownBusinessValue() { return $('(//label[text()="Business"]//following-sibling::ng-select//ng-dropdown-panel//span)[1]'); }
  get dropdownCarrier() { return $('//label[text()="Carrier"]//following-sibling::ng-select'); }
  get dropdownCarrierValue() { return $('//label[text()="Carrier"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="' + data.carrierValue + '"]'); }
  // get dropdownCarrierValue(){return $ ('(//label[text()="Carrier"]//following-sibling::ng-select//ng-dropdown-panel//span)[1]');}
  get dropdownProductGroup() { return $('//label[text()="Product Group"]//following-sibling::ng-select'); }
  get dropdownProductGroupValue() { return $('//label[text()="Product Group"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="' + data.productGroupValue + '"]'); }
  // get dropdownProductGroupValue(){return $ ('(//label[text()="Product Group"]//following-sibling::ng-select//ng-dropdown-panel//span)[1]');}
  get dropdownEnrollmentKey() { return $('//label[text()="Enrollment Key"]//following-sibling::ng-select'); }
  get dropdownEnrollmentKeyValue() { return $('//label[text()="Enrollment Key"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="' + data.enrollmentKeyValue + '"]'); }
  get buttonSave() { return $('//button[text()=" Save "]'); }

  get subMenuCommission() { return $('//span[text()="COMMISSION"]'); }
  get buttonAddCommition() { return $('//i[@title="Add Commission"]'); }
  get selectDropDownProduct() { return $('//label[text()="Product"]//following-sibling::ng-select'); }
  get selectDropDownProductValue() { return $('//label[text()="Product"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="' + testdata.addContract.productGroupValue + '"]'); }
  get selectDropDownBrokerName() { return $('//label[text()="Broker Name"]//following-sibling::ng-select'); }
  get selectDropDownBrokerNameValue() { return $('//label[text()="Broker Name"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="' + testdata.addBrokerToAccount.selectBroker + '"]'); }
  get selectDropDownCommissionType() { return $('//label[text()="Commission Type"]//following-sibling::ng-select'); }
  get selectDropDownCommissionTypeValue() { return $('//label[text()="Commission Type"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="Percent"]'); }
  get inputCommissionValue() { return $('//input[@id="commissionValue"]'); }
  get linkSelectAccount() { return $('//div[text() ="' + testdata.accountName + '"]//ancestor::div[@role="row"]//span[@class="ag-cell-link-button bh-text ellipsis ng-star-inserted"]'); }
  get selectCheckboxContract() { return $('//div[text() ="' + testdata.accountName + '"]//ancestor::div[@role="row"]//input'); }
  get buttonActivateContract() { return $('//i[@title="Activate Contract"]'); }
  get buttonOk() { return $('//div[text()=" Are you sure you want to activate the selected contract(s)? "]//following-sibling::*//button[text()=" OK "]'); }
  get inputEffectiveDate() { return $('input[name="effectiveDate"]'); }





  async selectContract() {
    await this.selectContractMenu.click();
    await browser.pause(2000);
    await this.linkSelectAccount.click();
    await browser.pause(2000);
  }

  async selectContractCheckboxAndActivate() {
    await this.selectContractMenu.click();
    await browser.pause(2000);
    await this.selectCheckboxContract.click();
    await browser.pause(2000);
    await this.buttonActivateContract.click();
    await browser.pause(2000);
    // await this.buttonOk.click();
    //   await browser.pause(2000);
  }

  async navigateToCommisionPage() {
    await this.subMenuCommission.click();
    await browser.pause(2000);
    await this.buttonAddCommition.click();
    await browser.pause(2000);
  }

  async fillCommissionDetailsAndSave() {
    await browser.pause(2000);
    alert("Please enter Effective Date and click ok");
    await browser.pause(8000);
    await this.selectDropDownBrokerName.click();
    await browser.pause(2000);
    await this.selectDropDownBrokerNameValue.click();
    await this.selectDropDownProduct.click();
    await browser.pause(2000);
    await this.selectDropDownProductValue.click();

    await this.selectDropDownCommissionType.click();
    await browser.pause(2000);
    await this.selectDropDownCommissionTypeValue.click();
    await this.inputCommissionValue.setValue(testdata.addCommission.commisionValue);

  }
  async goToAddContractPage() {
    await this.selectContractMenu.click();
    await browser.pause(2000);
    await this.buttonAddContract.click();
    await browser.pause(2000);
  }

  async fillContractDetailsAndSave({ accountName, policyNumber, bussiness, carrier, productgroup, enrollmentkey }) {
    await this.goToAddContractPage()
    await commonfunctions.setText(this.inputContractName, accountNameValue);
    await commonfunctions.setText(this.inputEffectiveDate, dt)
    await commonfunctions.setText(this.inputPolicyNumber, policyNumber);
    // await commonfunctions.selectFromDropdown(this.dropdownBusiness, bussiness);
    await commonfunctions.selectFromDropdown(this.dropdownCarrier, carrier);
    await commonfunctions.selectFromDropdown(this.dropdownProductGroup, productgroup);
    await commonfunctions.selectFromDropdown(this.dropdownEnrollmentKey, enrollmentkey);
    await this.buttonSave.click();
    await commonfunctions.waitFor5Sec()
  }
}

module.exports = new contractPage();