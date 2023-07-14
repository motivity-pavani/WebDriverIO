

class commonFunctions {
    async setText(locator, value) {
        await locator.waitForClickable({ timeout: 10000 });
        await locator.setValue(value);
    }

    async click(locator) {
        await locator.waitForClickable({ timeout: 20000 });
        await locator.click();
    }

    async waitForDisplayed10Sec(locator) {
        await locator.waitForDisplayed({ timeout: 10000 });
    }

    async waitForDisplayed20Sec(locator) {
        await locator.waitForDisplayed({ timeout: 20000 });
    }

    async waitForClickable20Sec(locator) {
        await locator.waitForClickable({ timeout: 20000 });
    }

    async waitForClickable10Sec(locator) {
        await locator.waitForClickable({ timeout: 10000 });
    }

    async waitFor2Sec() {
        await browser.pause(2000)
    }

    async waitFor3Sec() {
        await browser.pause(3000)
    }

    async waitFor5Sec() {
        await browser.pause(5000)
    }

    async waitFor10Sec() {
        await browser.pause(10000)
    }

    async waitFor20Sec() {
        await browser.pause(20000)
    }

    async selectFromDropdown(locator, value) {
        await locator.waitForClickable({ timeout: 20000 });
        await locator.click();
        var dropDownValue = locator.$('//ng-dropdown-panel//span[text()="' + value + '"]')
        await dropDownValue.waitForClickable({ timeout: 10000 });
        await dropDownValue.click();
    }

    async selectLabelBoxFromList(value) {
        var labelBox = $('//label[text()="' + value + '"]')
        await labelBox.waitForClickable({ timeout: 10000 });
        await labelBox.click();
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * (9999999 - 1000000) + 1000000)
    }

    async selectByVisibleText(locator, value) {
        await locator.selectByVisibleText(value)
    }
}


module.exports = new commonFunctions();