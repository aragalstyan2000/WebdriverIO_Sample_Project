const Page = require('./page');

class InventoryPage extends Page {
    get inventoryList() {
        return browser.$('[class="inventory_list"]')
    }

    get cartBadge() {
        return browser.$('[class="shopping_cart_badge"]')
    }

    get cartIcon() {
        return browser.$('[class="shopping_cart_link"]')
    }

    get addToCartButton() {
        return browser.$('(//*[contains(@data-test, \'add-to-car\')])[1]')

    }

    get removeFromCartButton() {
        return browser.$('(//*[contains(@data-test, \'remove\')])[1]')
    }

    get inventoryItemNames() {
        return browser.$$('[class="inventory_item_name"]')
    }

    get inventoryItemPrices() {
        return browser.$$('[class="inventory_item_price"]')
    }

    get inventorySortButton() {
        return browser.$('[data-test="product_sort_container"]')
    }

    async itemsAreSortedBy(by = "name", how = "asc") {
        let items
        if (by === "price") {
            items = await this.inventoryItemPrices
        } else {
            items = await this.inventoryItemNames
        }

        let itemTexts = []
        for (let item of items) {
            if (by === "price") {
                let text = await item.getText()
                itemTexts.push(parseInt(text.substring(1)))
            } else {
                itemTexts.push(await item.getText())
            }
        }
        let ascendingItemTexts = []
        if (how.toLowerCase() === "desc") {
            ascendingItemTexts = [...itemTexts].sort((a, b) => {
                if (a > b)
                    return -1;
                if (a < b)
                    return 1;
                return 0;
            });
        } else {
            if (by==="price") {
                ascendingItemTexts = [...itemTexts].sort((a, b) => a - b);
            } else {
                ascendingItemTexts = [...itemTexts].sort();
            }
        }
        console.log(ascendingItemTexts)
        console.log(itemTexts)
        let result = true
        for (let index in itemTexts) {
            if (ascendingItemTexts[index] !== itemTexts[index]) {
                result = false
                break
            }
        }
        return result
    }

    async sortBy(by = "name", how = "asc") {
        let sortButton = await this.inventorySortButton
        const sort = async function (val) {
            await sortButton.selectByAttribute('value', val)
        }

        if (by.toLowerCase() === "name") {
            if (how.toLowerCase() === "asc") {
                await sort('az')
            } else if (how.toLowerCase() === "desc") {
                await sort('za')
            }
        } else if (by.toLowerCase() === "price") {
            if (how.toLowerCase() === "asc") {
                await sort('lohi')
            } else if (how.toLowerCase() === "desc") {
                await sort('hilo')
            }
        } else {
            by = "name"
            how = "asc"
            await this.sortBy(by, how)
        }
    }

    clearBrowser() {
        return super.clearBrowser();
    }
}

module.exports = new InventoryPage();
