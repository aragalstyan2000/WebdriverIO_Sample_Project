module.exports = class Page {
    async open() {
        await browser.url(`/`)
    }

    async clearBrowser() {
        await browser.deleteAllCookies()
        await browser.refresh()
    }
}
