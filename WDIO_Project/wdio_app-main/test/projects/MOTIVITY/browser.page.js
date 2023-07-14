
class Browser {

    async openUrl({ url }) {
        await browser.url(url);
        await browser.maximizeWindow();

    }

}

module.exports = new Browser();