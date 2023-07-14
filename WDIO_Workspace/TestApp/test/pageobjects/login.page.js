
//const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
//class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
//    get inputUsername () {
//        return $('#username');
//    }

//    get inputPassword () {
//        return $('#password');
//    }

//    get btnSubmit () {
//        return $('button[type="submit"]');
//    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
//    async login (username, password) {
//        await this.inputUsername.setValue(username);
//       await this.inputPassword.setValue(password);
//        await this.btnSubmit.click();
//    }

    /**
     * overwrite specific options to adapt it to page object
     */
//    open () {
//        return super.open('login');
//   }
class EazeHR{

    get skipButton(){
        return $(`//*[contains(@resource-id, 'btn_skip')]`);
    }

    get existingUserButton(){
        return $(`//*[contains(@resource-id, 'oldUserBtn')]`)
    }
    inputField(fieldName){
        return $(`//*[contains(@resource-id, '${fieldName}')]`);
    }
    get hMenu(){
        return $(`//*[contains(@content-desc, 'Navigate up')]`);
    }
    get calenderMenu(){
        return $(`//*[contains(@text, 'Calendar')]`);
    }

async welcome_To_EazeHR(){
    await this.skipButton.click();
    await this.existingUserButton.waitForExist(5000);
    await this.existingUserButton.click();
}

async loginPage(url, Username, Password){
    await this.inputField('et_url').setValue(url);
    await this.inputField('et_user_name').setValue(Username);
    await this.inputField('et_password').setValue(Password);
}

async clickOnLoginButton(){
        const button=$(`//*[contains(@resource-id, 'btn_sign_in')]`);
        button.saveScreenshot(`./pageview.png`);
        console.log(button);
        await button.waitForExist(10000)
        await button.click()
} 
async HamburgurMenu(){
   await this.hMenu.click();
   await this.calenderMenu.click();
}

async Calender(){
    const list= await $(`//*[contains(@resource-id, 'calendar_tv')]`)
    const size=await list.getSize();
    console.log("calender dates", size);
}

}


module.exports = new EazeHR();
