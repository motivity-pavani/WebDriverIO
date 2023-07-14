const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');

class Bank extends Common {
    get inputBankName() {
        return $('//input[@id="bankName"]');
    }
    get inputAccountName() {
        return $('//input[@id="accountName"]');
    }
    get inputAccountRouting() {
        return $('//input[@id="routingNumber"]');
    }
    get inputAccountNumber() {
        return $('//input[@id="accountNumber"]');
    }
    get saveBtn() {
        return $(`//button[text()='Save']`)
    }

    get openAccountVerify() {
        return $(`//i[@class='bi bi-three-dots'][1]`)
    }
    get accountVerify() {
        return $(`//a[contains(@class,'action-menu-a ag-cell-action-button')]`)
    }

    async addBankAccount({ bankName, accountName, accountRouting, accountNumber }) {
        this.data.tableBtnName = 'Add Bank';
        await click(this.TableBtn)
        utilities.bankDetails = {
            bankName: bankName == 'default' ? utilities.bankDetails.bankName : bankName,
            accountName: accountName == 'default' ? utilities.bankDetails.accountName : accountName,
            accountRouting: accountRouting == 'default' ? utilities.bankDetails.accountRouting : accountRouting,
            accountNumber: accountNumber == 'default' ? utilities.bankDetails.accountNumber : accountNumber,
        }
        console.log(JSON.stringify(utilities.bankDetails))

        await setText(this.inputBankName, utilities.bankDetails.bankName)
        await setText(this.inputAccountName, utilities.bankDetails.accountName)
        await setText(this.inputAccountRouting, utilities.bankDetails.accountRouting)
        await setText(this.inputAccountNumber, utilities.bankDetails.accountNumber)
        await click(this.saveBtn);
        await this.alertMessage('Add Bank Account')
        await commonMethods.waitForBrowser(2000)
        await click(this.openAccountVerify);
        await click(this.accountVerify);
        await this.alertMessage('Bank Account Verify')
        await commonMethods.waitForBrowser(10000)

    }

}
module.exports = new Bank();