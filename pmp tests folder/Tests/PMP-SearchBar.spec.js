const { test, expect } = require("@playwright/test");
const constants = require("../src/constants.js");
import { LoginPage } from "../src/LoginPage.js";
import { HomePage } from "../src/HomePage.js";
//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;

test("PMP Login", async ({ page }) => {
  //Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username, password);
  await login.loginAssert();

  const home = new HomePage(page);
  await home.searchBar("PBB");

  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});
