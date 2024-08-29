const { expect } = require("@playwright/test");
const { requestAssert } = require("./constants");
const constants = require("./constants");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    //login
    this.usernameInput = 'input[type="text"]';
    this.passwordInput = 'input[type="password"]';
    this.submitButton = 'button[name="login"]';
    this.titlePMP = "span.nav-menu-title";



    //log out
    this.logOutMenuButton = 'button[ui-test-data="top-bar-more-options"]';
    this.logOutMenu = '[ui-test-data="top-bar-more-options-my-acc"]';
    this.logOutButton = 'span[ui-test-data="top-bar-more-options-logout"]';
    this.logOutPageTitle = "h1";
  }

  //_________________________________________________Methods_____________________________//

  async gotoLoginPage(url) {
    await this.page.goto(url);
  }

  async login(username, password) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.submitButton).click();
    
    // Validation of succesfull request
    await requestAssert(
      this.page,
      constants.loginRequest,
      constants.statusCode200
    );
  }

  async loginAssert() {
    await expect(this.page.locator(this.titlePMP)).toBeVisible();
  }

 

  async logOut() {
    // Click on button for dropdown menu
    await this.page.locator(this.logOutMenuButton).click();

    // Wait for a menu whit buttons
    await this.page.waitForSelector(this.logOutMenu);

    // Click on button for logOut
    await this.page.locator(this.logOutButton).click();
    await this.page.waitForTimeout(constants.timeOuts.timeS);
  }

  async logOutAssert(expectedTitle) {
    await expect(this.page.locator(this.logOutPageTitle)).toContainText(
      expectedTitle
    );
    await this.page.close();
  }
};
