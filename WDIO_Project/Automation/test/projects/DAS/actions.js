class ActionPage{
    async setText(locator, value) {
        await locator.waitForClickable({ timeout: 10000 });
        await locator.setValue(value);
    }

    async click(locator) {
        await locator.waitForClickable({ timeout: 5000 });
        await locator.click();
    }
    
    async selectFromDropdown(locator, menuLoactor) {
        await locator.waitForClickable({ timeout: 20000 });
        await locator.click();
        var dropDownValue = locator[menuLoactor]
        await dropDownValue.waitForClickable({ timeout: 10000 });
        await dropDownValue.click();
    }
}
module.exports = new ActionPage();