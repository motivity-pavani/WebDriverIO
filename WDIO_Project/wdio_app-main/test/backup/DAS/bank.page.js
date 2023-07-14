

class BankAccountPage {
    get sectionLinkbankAccount() { return $("//div[normalize-space(text())='Bank Accounts']"); }
    get buttonAddBank() { return $("//div/*[@title='Add Bank']"); }
    get inputBankName() { return $('//input[@id="bankName"]'); }
    get inputAccountName() { return $('//input[@id="accountName"]'); }
    get inputAccountRouting() { return $('//input[@id="routingNumber"]'); }
    get inputAccountNumber() { return $('//input[@id="accountNumber"]'); }
    get inputAccountType() { return $('//label[normalize-space(text())="Account Type"]/following::input[1]'); }
    get inputAccountTypeValue() { return $('//label[normalize-space(text())="Account Type"]/following::*//span[normalize-space(text())="' + data.AccountTypeValueName + '"]'); }
    get buttonSave() { return $('//button[contains(text(),"Save")]'); }


    async navigateToBankSection() {
        await this.sectionLinkbankAccount.click();
        await browser.pause(2000);
        await this.buttonAddBank.click();
    }
    async fillBankDetailsAndSave() {
        await this.inputBankName.setValue(data.bankName);
        await browser.pause(1000);
        await this.inputAccountName.setValue(testdata.accountName);
        await browser.pause(1000);
        await this.inputAccountRouting.setValue(data.AccountRouting);
        await browser.pause(1000);

        await this.inputAccountNumber.setValue(data.AccountNumber);
        await browser.pause(1000);

        await this.inputAccountType.click();
        await browser.pause(1000);
        await this.inputAccountTypeValue.click();
        await browser.pause(1000);
        await this.buttonSave.click();
        await browser.pause(5000);
    }




    open() {
        return super.open('BankAccountPage');
    }

}

module.exports = new BankAccountPage();