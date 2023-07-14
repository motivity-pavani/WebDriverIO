const LoginPage = require('../naukri/login.page');
describe('My Login application', () => {
    //await browser.pause(10000);
    //await browser.pause(10000);
    //await browser.pause(10000);
    it('should login with valid credentials', async () => {
    await LoginPage.clickOnHomeLogin();
    await LoginPage.naukriLogin("lakshmipavaniiv@gmail.com", "Pavaniiv95");
    console.log("Naukri login successfully");
    });
});