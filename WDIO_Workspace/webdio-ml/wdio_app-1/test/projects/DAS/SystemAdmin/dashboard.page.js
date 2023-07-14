const commonMethods = require('../common.methods');
const { setText, click } = require('../actions');
const utilities = require("../utilities");

class Dashboard {
    data = {
        menuItemName: "",
        sideMenuNavName: "",
        profileMenuName: "",
        tabName: ""
    }

    get navBar() {
        return $(`//button[@data-target='#headerMenuNavbar']//i[1]`);
    }
    get menuItemInput() {
        return $(`//span[text()="${this.data.menuItemName}"]`)
    }
    get accountNameSearchInput() {
        return $(`(//input[contains(@id,"Account Name") or contains(@aria-label,"Account Name")])[1]`)
    }
    get recordClick() {
        return $(`//span[@title='${this.data.accountNameValue}']`)
    }
    get sideMenuNav() {
        return $(`//div[contains(@class,"acc-details-category-section")]//div[contains(text(), '${this.data.sideMenuNavName}')]`)

    }
    get profileMenu() {
        return $(`//i[@class="bi bi-person-circle"]`)
    }

    get profileMenuSelect() {
        return $(`//a[text()="${this.data.profileMenuName}"]`)
    }

    get tabsMenu() {
        return $(`//div//a[@href]//div//span[text()='${this.data.tabName}']`)
    }
    async chooseProfileMenu({ menuName }) {
        await click(this.profileMenu)
        await click(this.profileMenu)
        await commonMethods.waitForBrowser(1000)
        this.data.profileMenuName = menuName;
        await click(this.profileMenuSelect)
        await commonMethods.waitForBrowser(2000)

    }

    async refreshPage({ page }) {
        await browser.refresh();
        await commonMethods.waitForBrowser(5000)
    }

    async tab({ tabName }) {
        this.data.tabName = tabName;
        await click(this.tabsMenu)
        await commonMethods.waitForBrowser(1000)
    }



    async navMenuItem({ menuName }) {
        this.data.menuItemName = menuName;
        await click(this.menuItemInput);
        await commonMethods.waitForBrowser(2000)
    }

    async sideMenuItem({ menuName }) {
        this.data.sideMenuNavName = menuName;
        await click(this.sideMenuNav);
        await commonMethods.waitForBrowser(2000)
    }

    async accountNameSearch({ accountName }) {
        this.data.accountNameValue = accountName == 'default' ? utilities.accountNameValue : accountName
        await commonMethods.waitForBrowser(2000)
        await setText(this.accountNameSearchInput, this.data.accountNameValue)
        await commonMethods.waitForBrowser(2000)
        await click(this.recordClick)
        await commonMethods.waitForBrowser(3000)


    }


}
module.exports = new Dashboard();