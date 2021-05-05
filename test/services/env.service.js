const envService = process.env;

module.exports = {
    defaultUserName: envService.SAUCE_LOGIN,
    defaultUserPass: envService.SAUCE_PASSWORD,
}
