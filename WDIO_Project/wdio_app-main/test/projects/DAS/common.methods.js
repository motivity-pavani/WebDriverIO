class CommonPage {


    /*  common methods start */

    async waitForDisplayed(locator, time) {
        await locator.waitForDisplayed({ timeout: time });
    }
    async waitForBrowser(time) {
        await browser.pause(time)
    }

    async openUrl(url) {
        await browser.url(url);
        await browser.maximizeWindow();

    }



    /*  common methods end */

}
module.exports = new CommonPage();