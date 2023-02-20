const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const environment = require('../services/env.service')

describe('Login tests', () => {
    before(async () => {
        await LoginPage.open();
    })

    afterEach(async () => {
        await InventoryPage.clearBrowser()
    })

    it('Should show error messages for invalid credentials', async () => {
        await LoginPage.login('', '');
        await expect(await LoginPage.loginErrorMsg).toHaveText('Epic sadface: Username is required');
        await LoginPage.login('test', '');
        await expect(await LoginPage.loginErrorMsg).toHaveText('Epic sadface: Password is required');
        await LoginPage.login('test', 'test');
        await expect(await LoginPage.loginErrorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    it('Should login with valid credentials', async () => {
        await LoginPage.login(environment.defaultUserName, environment.defaultUserPass);
        await expect(await InventoryPage.inventoryList).toBeExisting();
    });
});
