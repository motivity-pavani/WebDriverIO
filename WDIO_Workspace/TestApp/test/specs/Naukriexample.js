const LoginPage = require('../pageobjects/NaukriLoginPage');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.pause(10000);
        await browser.pause(10000);
        await browser.pause(10000);
        await LoginPage.clickOnHomeLogin();
        await LoginPage.naukriLogin("lakshmipavaniiv@gmail.com", "Pavaniiv95");
        console.log("Naukri login successfully");
        await LoginPage.hamburgerMenuButton();
        await LoginPage.logOut();
        console.log("Logout successfully");
    });  

});