class Commonmethods{
    async waitForExist(time) {
        await locator.waitForExist({ timeout: time });
    }
    async waitForDisplayed(locator, time) {
        await locator.waitForDisplayed({ timeout: time });
    }
}
module.exports = new Commonmethods();