class Commonpage{

    async openUrl(url) {
        await browser.url(url);
        await browser.maximizeWindow();
    }

    async waitForDisplayed(locator, time) {
        await locator.waitForDisplayed({ timeout: time });
    }
    async waitForBrowser(time) {
        await browser.pause(time)
    }
}
module.exports = new Commonpage();