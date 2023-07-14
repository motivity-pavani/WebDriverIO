class ActionPage {


    /*  common methods start */
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


    // async selectFromDropdown(locator, value) {
    //     await locator.waitForClickable({ timeout: 20000 });
    //     await locator.click();
    //     var dropDownValue = locator.$('//ng-dropdown-panel//span[text()="' + value + '"]')
    //     await dropDownValue.waitForClickable({ timeout: 10000 });
    //     await dropDownValue.click();
    // }

    /*  common methods end */

}
module.exports = new ActionPage();