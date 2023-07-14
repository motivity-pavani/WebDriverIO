const commonMethods = require('./common.methods');
const { setText, click } = require('./actions');
const Common = require('./common');

class Loginpage extends Common{
    data = {
        selectGroupName: "",
        selectGroupTitle: "",
        selectGroupMenuName: ""
    }
    // get labelLogin() {
    //     return $('//label[text()="Login"]');
    // }
     get inputUsername() {
        return $('#username');
    }
    get inputPassword() {
        return $('#password');
    }
    get btnSubmit() {
        return $('button[name="submit"]');
    }
    get selectGroupOptionMenu() {
        return $(`//div[contains(text(), "${this.data.selectGroupName}")]`)
    }

    get profileGroupName(){
        return $(`//div[@title="${this.data.selectGroupTitle}"]`)  
    }
    get selectGroupTileName(){
        return $(`//li/div//a[contains(text(), "${this.data.selectGroupMenuName}")]`)
    }


    async openSite({ url }){
        await commonMethods.openUrl(url);
        //await commonMethods.waitForDisplayed(this.labelLogin, 30000)
        await commonMethods.waitForBrowser(7000);
    }

    async login({ username, password }){
        await browser.refresh();
        //await click(this.inputUsername);
        console.log("*****************************8")
        await commonMethods.waitForBrowser(15000)
        await setText(this.inputUsername, username);
        await setText(this.inputPassword, password);
        await click(this.btnSubmit);
        await commonMethods.waitForBrowser(15000);
       // await this.alertMessage('Login')
        await commonMethods.waitForBrowser(15000);
    }
    async selectGroup({ name }) {
        this.data.selectGroupName = name;
        console.log("************************group")
        await commonMethods.waitForDisplayed(this.selectGroupOptionMenu, 10000);
        await click(this.selectGroupOptionMenu);
        await commonMethods.waitForBrowser(3000)
       //  await browser.debug()
    }

    async userAdmin({adminGroupName}){
        this.data.selectGroupTitle="System Admin "
        console.log("***************************admin name")
        await commonMethods.waitForBrowser(9000)
        await click(this.profileGroupName);
        this.data.selectGroupMenuName = adminGroupName;
        await commonMethods.waitForDisplayed(this.selectGroupTileName, 10000);
        await click(this.selectGroupTileName);
        await commonMethods.waitForBrowser(3000)
    }

    
}
module.exports = new Loginpage();