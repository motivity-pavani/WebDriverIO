const commonMethods = require('./common.methods');
const { setText, click, selectFromDropdown } = require('./actions');
const utilities = require("./utilities");
const Common = require('./common');

class Bank extends Common{
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
        return $(`//button[text()=' Save ']`)
    }

    get openAccountVerify() {
        return $(`//i[@class='bi bi-three-dots'][1]`)
    }
    get accountVerify() {
        return $(`//a[contains(@class,'action-menu-a ag-cell-action-button')]`)
    }
    get inputEffectiveDate() {
        return $('input[name="effectiveDate"]');
    }

    /* click on bank checkbox */
    get selectBankDetailsCheckBox(){
        
        return $('//div[contains(@ref, "eCheckbox")]//following-sibling::input')
    }

    get markVerifiedBtn(){
        //return $('//span[contains(text(), " Mark Verified")]')
        return $('//i[contains(@title, "Mark Verified")]');
    }

    async addBankAccount({ bankName, accountName, accountRouting, accountNumber, accountType }) {
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
        this.data.dropDownMenuValue = accountType;
        this.data.dropHeader = "Account Type";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)
        await setText(this.inputEffectiveDate, utilities.dt);
        await commonMethods.waitForBrowser(9000)
        await click(this.saveBtn);
        await this.alertMessage('Add Bank Account')
        // await click(this.selectBankDetailsCheckBox);
        // await click(this.markVerifiedBtn);

        // await click(this.openAccountVerify);
       // await click(this.accountVerify);
        // await this.alertMessage('Bank Account Verify')
        // await commonMethods.waitForBrowser(10000)
    } 

    //search the bank name in bank page

    get bankNameFilter(){
        return $(`//div[@class="ag-wrapper ag-input-wrapper ag-text-field-input-wrapper"]//following-sibling::input[@aria-label="Bank Name Filter Input"]`)
    }

    get accVerified(){
        return $(`//input[@aria-label="Account Verified Filter Input"]`)
    }

    async filterBankName(){
        console.log("********************filter the bank name*******************")
        await commonMethods.waitForBrowser(4000)
        await setText(this.bankNameFilter, utilities.bankDetails.bankName)
        await commonMethods.waitForBrowser(2000)
        await setText(this.accVerified, "Not Verified")
    }
    

}
module.exports = new Bank();