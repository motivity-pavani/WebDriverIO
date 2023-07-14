class Actionpage{

    async setValue(locator, value) {
        await locator.setValue(value);
    }

    async click(locator) {
       // await locator.waitForClickable({ timeout: 5000 });
        await locator.click();
    }
}

module.exports = new Actionpage();