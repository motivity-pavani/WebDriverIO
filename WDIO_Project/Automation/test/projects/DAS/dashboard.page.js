const { setText, click } = require("./actions");
const commonMethods = require('./common.methods');
const utilities = require("./utilities");

class Dashboard{
    data = {
        menuItemName: "",
        sideMenuNavName: "",
        profileMenuName: "",
        tabName: ""
    }
    //menu 
    get navBar() {
        console.log("************************** no")
        return $(`//button[@data-target='#headerMenuNavbar']//i[1]`);
    } 
    //click on menus like lead....
    get menuItemInput() {
        return $(`//span[text()="${this.data.menuItemName}"]`)
    } 
    //after add account search the name in leads page
    get accountNameSearchInput() {
        return $(`(//input[contains(@id,"Account Name") or contains(@aria-label,"Account Name")])[1]`)
    }
    //click on sear record data
    get recordClick() {
        return $(`//span[@title='${this.data.accountNameValue}']`)
    }
    
    //click on side menu list (Broker, Employees, contacts,.....)
    get sideMenuNav() {
        return $(`//div[contains(@class,"acc-details-category-section")]//div[contains(text(), '${this.data.sideMenuNavName}')]`)

    }

    async navMenuItem({ menuName }) {
        this.data.menuItemName = menuName;
        await click(this.menuItemInput);
        await commonMethods.waitForBrowser(2000)
    }
    async accountNameSearch({ accountName }) {
        this.data.accountNameValue = accountName == 'default' ? utilities.accountNameValue : accountName
        await commonMethods.waitForBrowser(2000)
        await setText(this.accountNameSearchInput, this.data.accountNameValue)
        await commonMethods.waitForBrowser(2000)
        await click(this.recordClick)
        await commonMethods.waitForBrowser(3000)
        // await this.bussinessDetailsName(utilities.businessName).click()
    }

    async sideMenuItem({ menuName }) {
        this.data.sideMenuNavName = menuName;
        await commonMethods.waitForBrowser(3000)
        await click(this.sideMenuNav);
        await commonMethods.waitForBrowser(2000)
    }
    

}
module.exports = new Dashboard();