const commonFunctions = require('../../common/commonfunctions')
const commonpage = require('./common.page')
var { dt } = require('./globalvariables')
class brokerPage {

    //add broker
    get selectBrokerMenu() { return $('//div[contains(@class,"acc-details-category-section")]//div[text()=" Broker "]'); }
    get buttonAddBroker() { return $('//button//i[@title="Add Broker"]'); }
    get selectBrokerDropDown() { return $('//label[text()="Broker"]//following-sibling::ng-select'); }
    get checkBoxIsPrimary() { return $('//label[text()="Is Primary"]//following-sibling::input'); }
    get buttonSave() { return $('//button[text()=" Save "]'); }
    get buttonActivateAccount() { return $('//span[text()="Activate Account"]'); }
    get buttonOk() { return $('//div[text()=" Are you sure you want to activate the account? "]//following-sibling::*//button[text()=" OK "]'); }
    get inputEffectiveDate() { return $('input[name="effectiveDate"]'); }
    get checkboxBroker() { return $('//span[contains(text(),"MotivityBrokerTest1_US")]//ancestor::div[@role="row"]//input'); }
    get buttonMarkAsPrimary() { return $('//i[@title="Mark as Primary"]'); }
    get selectAccountInfoMenu() { return $('//div[contains(@class,"acc-details-category-section")]//div[text()=" Account Info "]'); }


    async goToAddBrokerPage() {
        await commonFunctions.click(this.selectBrokerMenu);
        await commonFunctions.click(this.buttonAddBroker)
    }

    async markBrokerAsPrimary() {
        await this.checkboxBroker.click();
        await browser.pause(2000);
        await this.buttonMarkAsPrimary.click();
        await browser.pause(2000);
    }

    async goToActivateAccountInAccountInfo() {
        await this.selectAccountInfoMenu.click();
        await browser.pause(2000);
    }

    async activateAccountInBroker({ accountName }) {
        await this.goToActivateAccountInAccountInfo()
        await this.buttonActivateAccount.click();
        await browser.pause(2000);
        await this.buttonOk.click();
        await browser.pause(2000);
    }

    async fillBrokerDetailsAndSave({ broker, dateval, isprimary }) {
        this.goToAddBrokerPage()
        await commonFunctions.selectFromDropdown(this.selectBrokerDropDown, broker);
        await commonFunctions.setText(this.inputEffectiveDate, dt)
        await commonFunctions.click(this.checkBoxIsPrimary);
        await commonFunctions.click(this.buttonSave);
        await commonFunctions.waitFor5Sec()
    }

}

module.exports = new brokerPage();