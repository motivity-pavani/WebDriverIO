const commonFunctions = require('../../common/commonfunctions');
const { accountNameValue } = require('./globalvariables');

class commonpage {
    data = {
        accountNameValue: ""
    }
    //search account
    get inputSearchAccountName() { return $('//input[@name="Account Name-filterText"] | //input[@aria-label="Account Name Filter Input"]'); }
    get selectAccountNameFromLIst() { return $('//span[contains(text(),"' + this.data.accountNameValue + '")]//ancestor::*[@role="row"]//bh-link-button//div'); }
    get recordClick() {
        return $(`//span[@title='${this.data.accountNameValue}']`)
    }

    async searchAccountByNameAndDate({ accountName, dateval }) {
        // if (accountName != 'default') {
        //     accountNameValue = accountName;
        // }
        // console.log("account name in search" + accountNameValue);
        this.data.accountNameValue = accountName == 'default' ? accountNameValue : accountName
        await commonFunctions.waitFor5Sec()
        await commonFunctions.setText(this.inputSearchAccountName, this.data.accountNameValue);
        await commonFunctions.waitFor2Sec()
        // await commonFunctions.click(this.selectAccountNameFromLIst);
        await commonFunctions.click(this.recordClick);
    }
}

module.exports = new commonpage();