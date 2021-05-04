const Page = require('./page');

class LoginPage extends Page {
    get loginInput() {
        return browser.$('[data-test="username"]')
    }

    get passwordInput() {
        return browser.$('[data-test="password"]')
    }

    get submitButton() {
        return browser.$('[data-test="login-button"]')
    }

    get loginErrorMsg() {
        return browser.$('[data-test="error"]')
    }
    async login(username, password) {
        await (await this.loginInput).setValue(username);
        await (await this.passwordInput).setValue(password);
        await (await this.submitButton).click();
    }

    open() {
        return super.open();
    }
}

module.exports = new LoginPage();
