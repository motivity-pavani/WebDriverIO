const commonMethods = require('./common.methods');
const { setText, click } = require('./actions');
const Common = require('./SystemAdmin/common');

class Login extends Common {
    data = {
        selectGroupName: ""
    }
    get labelLogin() {
        return $('//label[text()="Login"]');
    }
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

    async openSite({ url }) {
        await commonMethods.openUrl(url);
        await commonMethods.waitForDisplayed(this.labelLogin, 5000)
    }
    async login({ username, password }) {
        await setText(this.inputUsername, username)
        await setText(this.inputPassword, password)
        await click(this.btnSubmit)
        await this.alertMessage('Login')
        // let alert = await $('div[role=alertdialog]')
        // console.log("alert message:", await alert.getText())

        // await commonMethods.waitForBrowser(10000)

    }

    async selectGroup({ name }) {
        this.data.selectGroupName = name;
        await commonMethods.waitForDisplayed(this.selectGroupOptionMenu, 10000);
        await click(this.selectGroupOptionMenu);
        await commonMethods.waitForBrowser(3000)
        // await browser.debug()

    }

}
module.exports = new Login()