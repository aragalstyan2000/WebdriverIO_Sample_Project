# JS-WebdriverIO-Mocha-SauceLab

An example project of WebdriverIO integrated to SauceLabs for cross browser testing.

### Setup

1. Global Dependencies
    * Install [Node.js](https://nodejs.org/en/).
    * Register to [SauceLabs](https://saucelabs.com/).
2. Sauce Credentials
    * Set your `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` of SauceLabs account in the `.env` file.
    * Set desired region in `wdio.config.js` file(**'us'** is set by default)
3. Project Dependencies
    * `cd` to root directory of the project
    * Install Node modules using:
    ```
    npm install
    ```

### Running Tests

* Run tests on SauceLabs using:
  ```
  npm run test
  ```
* Open SauceLabs dashboard to see the test results.
[Sauce Labs Dashboard](https://app.saucelabs.com/dashboard/tests/)

### Generate Allure report
* Install allure cli globally using:
  ```
  npm i allure-commandline -g
  ```
* Generate and open the report using:
   ```
   allure generate ./allure-results --clean && allure open
   ```
