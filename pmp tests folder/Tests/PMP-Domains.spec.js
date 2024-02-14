import { LoginPage } from "../src/LoginPage.js";
import { HomePage } from "../src/HomePage.js";
const { test, expect } = require("@playwright/test");
const constants = require("../src/constants.js");

const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;

test.describe("Menu actions", () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    const login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username, password);
    await login.loginAssert();
  });

  test.afterEach(async ({ page }) => {
    // LogOut after each test
    const login = new LoginPage(page);
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });

  test("Hiding left menu", async ({ page }) => {
    const home = new HomePage(page);
    await home.hideMenu();
  });

  test("Opening left menu", async ({ page }) => {
    const home = new HomePage(page);
    await home.openMenu();
  });
});
