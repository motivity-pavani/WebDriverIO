class Commonmethods{
    async waitForExist(time) {
        await locator.waitForExist({ timeout: time });
    }
}
module.exports = new Commonmethods();