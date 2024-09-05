// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

const { expect } = require("@playwright/test");
const constants = require("./constants");

// -------------------------------------------------------------------------------------
// Class Definition: LoginPage
// -------------------------------------------------------------------------------------
exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;

    // --------------------- Login Selectors ---------------------
    this.usernameInput = 'input[type="text"]';
    this.passwordInput = 'input[type="password"]';
    this.submitButton = 'button[name="login"]';
    this.titlePMP = "span.nav-menu-title";

    // --------------------- Logout Selectors ---------------------
    this.logOutMenuButton = 'button[ui-test-data="top-bar-more-options"]';
    this.logOutMenu = '[ui-test-data="top-bar-more-options-my-acc"]';
    this.logOutButton = 'span[ui-test-data="top-bar-more-options-logout"]';
    this.logOutPageTitle = "h1";
  }

  // -------------------------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------------------------

  // --------------------- Navigate to Login Page ---------------------
  async gotoLoginPage(url) {
    await this.page.goto(url);
  }

  // --------------------- Perform Login ---------------------
  async login(username, password) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.submitButton).click();

    // Validation of successful request
    await constants.requestAssert(
      this.page,
      constants.loginRequest,
      constants.statusCode200
    );
  }

  // --------------------- Login Assertion ---------------------
  async loginAssert() {
    await expect(this.page.locator(this.titlePMP)).toBeVisible();
  }

  // --------------------- Perform Logout ---------------------
  async logOut() {
    // Click on button for dropdown menu
    await this.page.locator(this.logOutMenuButton).click();

    // Wait for the menu with logout options
    await this.page.waitForSelector(this.logOutMenu);

    // Click on the logout button
    await this.page.locator(this.logOutButton).click();
    await this.page.waitForTimeout(constants.timeOuts.timeS);
  }

  // --------------------- Logout Assertion ---------------------
  async logOutAssert(expectedTitle) {
    await expect(this.page.locator(this.logOutPageTitle)).toContainText(
      expectedTitle
    );
    await this.page.close();
  }
};
