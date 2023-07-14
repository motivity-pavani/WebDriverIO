
const commonFunctions = require('../../common/commonfunctions')

class commonpage {


    get inputSearchAccountName() { return $('//input[@aria-label="Account Name Filter Input"]'); }
    get SystemAdmin() { return $('//*/div/div/div[2]/div/div[1]'); }
    get mainMenu() { return $('/html/body/bh-root/div[1]/bh-header/nav/button'); }
    get mainMenuCollapsed() { return $(' //button[@class="btn header-menu-btn ng-star-inserted collapsed"]'); }
    get clickonLeads() { return $('/html/body/bh-root/div[1]/bh-header/div/div/div/div/div[2]/a/div/span'); }
    get accountsMenu() { return $('//span[text()="ACCOUNTS"]'); }
    get accountNameSearch() { return $('input[aria-label="Account Name Filter Input"]'); }
    get labelLogin() { return $('//label[text()="Login"]'); }


    async searchAccountByNameAndDate() {
        await commonFunctions.setText(this.inputSearchAccountName, testdata.accountName);
        await commonFunctions.click(this.selectAccountNameFromLIst);
    }

    async goToAccountMenu() {
        await commonFunctions(this.accountsMenu)
    }

    async goToMenu({ menuItem }) {
        if (this.mainMenuCollapsed.isDisplayed()) {
            await commonFunctions.click(this.mainMenu)
        }
        var mainMenuItem = $('//span[text()="' + menuItem + '"]')
        await commonFunctions.click(mainMenuItem)
    }

    async NavigateToUrl({ url }) {
        await browser.url(url);
        await browser.maximizeWindow();
        await commonFunctions.waitForDisplayed10Sec(this.labelLogin)
    }

    async VerifyBrowserNavigation(title) {
        expect(await browser.getTitle()).toEqual(title)
    }

    async closeMenuBar({ defaultparameter }) {
        $('//i[@class="bi bi-x opened"]').click()
        await commonFunctions.waitFor2Sec()
    }
}

module.exports = new commonpage();