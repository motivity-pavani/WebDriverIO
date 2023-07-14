class Loginpage{

    get HomeloginButton(){
        return $(`//*[contains(@resource-id, 'textViewLogin')]`);
    }

    inputField(fieldName) {
       return $(`//*[contains(@resource-id, '${fieldName}')]`);
    }
    get loginButton(){
        return $(`//*[contains(@resource-id, 'bt_login')]`);
    }
    get continueButton(){
        return $(`//*[contains(@text, 'Continue')]`);
    }
    get logOutButton(){
        return $(`//*[contains(@resource-id, 'menu_logout')]`);
    }
    get logOutDialougeBox(){
        return $(`//*[contains(@text, 'Yes')]`);
    }

    async clickOnHomeLogin(){
        await this.HomeloginButton.click();
    }

    async naukriLogin(username, password){
        await this.inputField('et_email').setValue(username);
        await this.inputField('et_password').setValue(password);
        await this.loginButton.click();
        await this.continueButton.waitForExist(30000)
        await this.continueButton.click();
    }

    async hamburgerMenuButton(){
        const selector=`new UiSelector().packageName("naukriApp.appModules.login").instance(10)`;
        const button=await $(`android=${selector}`);
        await button.click();  
    }

    async logOut(){
        await this.logOutButton.click();
        await this.logOutDialougeBox.waitForExist(10000);
        await this.logOutDialougeBox.click();
    }
}
module.exports = new Loginpage();