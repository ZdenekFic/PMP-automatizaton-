const { test, expect } = require("@playwright/test");
const constants = require("../src/constants.js");
import { LoginPage } from "../src/LoginPage.js";
import { HomePage } from "../src/HomePage.js";
import { ActiveProjects } from "../src/ActiveProjects.js";

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;

test.describe("E2E test", () => {
  let login;
  let ap;
  let home;

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username, password);
    await login.loginAssert();
    home = new HomePage(page,"Test Domain");
    await home.switchDomains();
  });

  test("E2E", async ({ page }) => {
    //Main function
    ap = new ActiveProjects(page);
    await ap.enterToOverviews();
    await ap.addProject();

    
  });

 

  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
