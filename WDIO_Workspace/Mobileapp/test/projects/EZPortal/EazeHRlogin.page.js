const { setValue, click } = require('./action');
const commonMethods = require('./common');
class EazeHR{
    get skipButton(){
        return $(`//*[contains(@resource-id, 'btn_skip')]`);
    }

    get welcomePage(){
        return $(`//*[contains(@resource-id,'imageView1')]`);
    }

    get existingUserButton(){
        return $(`//*[contains(@resource-id, 'oldUserBtn')]`)
    }
    inputField(fieldName){
        return $(`//*[contains(@resource-id, '${fieldName}')]`);
    }
    
    get LoginButton(){
        return $(`//*[contains(@resource-id,'btn_sign_in')]`)
    }
    get hMenu(){
        return $(`//*[contains(@content-desc, 'Navigate up')]`);
    }
    get calenderMenu(){
        return $(`//*[contains(@text, 'Calendar')]`);
    }

    get logoutButton(){
        return $(`//*[contains(@text, 'Logout')]`)
    }

    get logoutConfirmButton(){
        return $(`//*[contains(@resource-id, 'tv_ok')]`)
    }


    async ezwelcomepage({url, username, password}){
        await commonMethods.waitForDisplayed(this.welcomePage, 10000);
        await click(this.skipButton)
        await commonMethods.waitForDisplayed(this.existingUserButton, 10000);
        await click(this.existingUserButton)
        await setValue(this.inputField('et_url'), url)
        await setValue(this.inputField('et_user_name'), username)
        await setValue(this.inputField('et_password'), password)
        await click(this.LoginButton)
    }
     async HamburgurMenu(){
         await click(this.hMenu);
         await click(this.calenderMenu);
        
        
         console.log("today date" + moment().format('LLLL'));
      }

    //  async logoutPage(){
    //     await click(this.hMenu);
    //     await click(this.logoutButton);
    //     await click(this.logoutConfirmButton);

    //  }
}
module.exports = new EazeHR();