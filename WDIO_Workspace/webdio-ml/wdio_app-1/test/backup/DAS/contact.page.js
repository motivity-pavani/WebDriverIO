// const { default: keys } = require("webdriverio/build/commands/browser/keys");

class contactPage {

    //Search By Account Name
    get inputAccountNameSearch() { return $('/html/body/bh-root/div[2]/bh-main/div/div/div/bh-dashboard/div/bh-active-accounts/div/div/div[2]/div/bh-grid/div/ag-grid-angular/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div[1]/div[1]/div/div/div/input'); }

    get selectAccountNameFromLIst() { return $('/html/body/bh-root/div[2]/bh-main/div/div/div/bh-dashboard/div/bh-active-accounts/div/div/div[2]/div/bh-grid/div/ag-grid-angular/div/div[1]/div[2]/div[3]/div[2]/div/div/div/div[1]/div/span'); }

    // Click Contract Menu
    get selectContractMenu() { return $('//div[contains(@class,"acc-details-category-section")]//div[text()=" Contracts "]'); }
    get inputContractNumberSearch() { return $('/html/body/bh-root/div[2]/bh-main/div/div/div/bh-account-details/div/div/div/div/bh-contracts/div/div/div[2]/bh-grid/div/ag-grid-angular/div/div[1]/div[2]/div[1]/div[2]/div/div[2]/div[1]/div[1]/div/div/div/input'); }
    get selectCOntractFromLIst() { return $('/html/body/bh-root/div[2]/bh-main/div/div/div/bh-account-details/div/div/div/div/bh-contracts/div/div/div[2]/bh-grid/div/ag-grid-angular/div/div[1]/div[2]/div[3]/div[2]/div/div/div/div[1]/div/span'); }


    get inputEmailAddress() { return $('#emailAddress'); }
    get selectContact() { return $('//*[@id="b9d0cc08-3212-4d60-b07f-c094f8cca631"]/div/div/div[2]/bh-contact-add/div/div/bh-search-contact/div/div[2]/div[2]'); }
    // get inputFirstName() { return $('/html/body/bh-root/div[2]/bh-main/div/div/div/bh-account-details/div/div/div/div/bh-contract-details/div/div/div[3]/bh-contact-list/bh-side-drawer[2]/div/div/div/div[2]/bh-contact-add/div/div/bh-input[2]/form/input');}
    get inputFirstName() { return $('//input[@id="firstName"]'); }
    // get inputLastName() { return $('/html/body/bh-root/div[2]/bh-main/div/div/div/bh-account-details/div/div/div/div/bh-contract-details/div/div/div[3]/bh-contact-list/bh-side-drawer[2]/div/div/div/div[2]/bh-contact-add/div/div/bh-input[3]/form/input');}
    get inputLastName() { return $('//input[@id="lastName"]'); }
    // get inputMobileNumber() { return $('/html/body/bh-root/div[2]/bh-main/div/div/div/bh-account-details/div/div/div/div/bh-contract-details/div/div/div[3]/bh-contact-list/bh-side-drawer[2]/div/div/div/div[2]/bh-contact-add/div/div/bh-input[4]/form/input');}
    get inputMobileNumber() { return $('//input[@id="mobileNumber"]'); }
    // get inputWorkNumber() { return $('//*[@id="b9d0cc08-3212-4d60-b07f-c094f8cca631"]/div/div/div[2]/bh-contact-add/div/div/div[2]/bh-input[1]/form/div');}
    get inputWorkNumber() { return $('//input[@id="workNumber"]'); }
    // get inputWorkNumberExt() { return $('/html/body/bh-root/div[2]/bh-main/div/div/div/bh-account-details/div/div/div/div/bh-contract-details/div/div/div[3]/bh-contact-list/bh-side-drawer[2]/div/div/div/div[2]/bh-contact-add/div/div/div[1]/bh-input[2]/form/input');}
    get inputWorkNumberExt() { return $('//input[@id="workNumberExt"]'); }
    get dropdownContactType() { return $('//label[text()="Contact Type"]//following-sibling::ng-select'); }
    get dropdownContactTypeValue() { return $('//label[text()="Contact Type"]//following-sibling::ng-select//ng-dropdown-panel//span[text()="Additional Billing Contact"]'); }
    get inputSave() { return $('//button[contains(text(),"Save")]'); }
    get btnAddContact() { return $('/html/body/bh-root/div[2]/bh-main/div/div/div/bh-account-details/div/div/div/div/bh-contract-details/div/div/div[3]/bh-contact-list/div/div/div[1]/div/div[2]/button[2]/div/i'); }
    get linkSelectAccount() { return $('//div[text() ="' + testdata.accountName + '"]//ancestor::div[@role="row"]//span[@class="ag-cell-link-button bh-text ellipsis ng-star-inserted"]'); }

    async searchAccountByName(accountObj) {
        await this.inputAccountNameSearch.setValue(testdata.accountName);
        await browser.pause(2000);
        await this.selectAccountNameFromLIst.click();
        await browser.pause(3000);
    }

    async goToAddContactPage(accountObj) {
        await this.selectContractMenu.click();
        await browser.pause(2000);
        await this.linkSelectAccount.click();
        await browser.pause(2000);
        // await this.inputContractNumberSearch.setValue(accountObj.contractNUmber);
        // await this.selectCOntractFromLIst.click();
        await this.btnAddContact.click();
        await browser.pause(2000);
    }

    async fillInAddContactInfoTask(contactInfoObj) {
        await this.inputEmailAddress.setValue(contactInfoObj.emailAddress);
        await this.inputFirstName.click();
        await browser.pause(4000);
        await this.inputFirstName.setValue(contactInfoObj.firstName);

        // await browser.pause(5000);

        //await this.selectContact.click();
        //await browser.pause(2000);

        await this.inputLastName.setValue(contactInfoObj.lastName);

        await browser.pause(1000);
        await this.inputMobileNumber.setValue(contactInfoObj.mobileNumber);
        // await browser.pause(1000);
        // await browser.pause(2000);
        // await this.inputWorkNumber.setValue(contactInfoObj.workNumber);

        // await browser.pause(2000);
        // await this.inputWorkNumberExt.setValue(contactInfoObj.workNumberExt);

        await browser.pause(1000);
        await this.dropdownContactType.click();

        await browser.pause(1000);

        await this.dropdownContactTypeValue.click();
        await browser.pause(1000);

        await this.inputSave.click();

        await browser.pause(5000);


    }

    open() {
        return super.open('accounts');
    }

}

module.exports = new contactPage();