const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const environment = require('../services/env.service')

describe('Inventory Tests', () => {
    before(async () => {
        await LoginPage.open();
    })

    beforeEach(async () => {
        await LoginPage.login(environment.defaultUserName, environment.defaultUserPass);
    })

    afterEach(async () => {
        await InventoryPage.clearBrowser()
    })

    it('Should add items to cart and remove', async () => {
        await expect(await InventoryPage.cartIcon).toBeExisting();
        await expect(await InventoryPage.cartBadge).not.toBeExisting();
        await (await InventoryPage.addToCartButton).click()
        await expect(await InventoryPage.cartBadge).toBeVisible();
        await expect(await InventoryPage.cartBadge).toHaveText('1');
        await (await InventoryPage.removeFromCartButton).click()
        await expect(await InventoryPage.cartBadge).not.toBeExisting();
    });

    it('Should filter items properly', async () => {
        await InventoryPage.sortBy('name', 'asc')
        await expect(await InventoryPage.itemsAreSortedBy('name', 'asc')).toBeTruthy();

        await InventoryPage.sortBy('name', 'desc')
        await expect(await InventoryPage.itemsAreSortedBy('name', 'desc')).toBeTruthy();

        await InventoryPage.sortBy('price', 'asc')
        await expect(await InventoryPage.itemsAreSortedBy('price', 'asc')).toBeTruthy();

        await InventoryPage.sortBy('price', 'desc')
        await expect(await InventoryPage.itemsAreSortedBy('price', 'desc')).toBeTruthy();
    });
});
