const LoginPage = require('../pageobjects/login.page');
//const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
       // await LoginPage.open();

        //await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        //await expect(SecurePage.flashAlert).toBeExisting();
        //await expect(SecurePage.flashAlert).toHaveTextContaining(
         //   'You logged into a secure area!');

         await LoginPage.welcome_To_EazeHR();
         await LoginPage.loginPage("motivity", "pavani", "pavani123*");
         await LoginPage.clickOnLoginButton();
         await LoginPage.HamburgurMenu();
         await LoginPage.Calender();
    });
});


