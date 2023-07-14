const { setValue, click } = require('./actions');
const commonMethods = require('./common');
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
    async naukriLogin({username, password}){
        console.log(username,password)
        await browser.pause(10000)
        console.log("****************************username, password***********************************")
         await click(this.HomeloginButton)
        console.log("****************************username, password***********************************")
         await setValue(this.inputField('et_email'), username)
         await setValue(this.inputField('et_password'), password)
         await click(this.loginButton)
         await click(this.continueButton)
    }

    async hamburgerMenuButton(){
        const selector=`new UiSelector().packageName("naukriApp.appModules.login").instance(10)`;
        const button=await $(`android=${selector}`);
        await button.click();  
    }
    
    async logOut(){
        await click(this.logOutButton)
        await click(this.logOutDialougeBox)
    }
    
}
module.exports = new Loginpage();