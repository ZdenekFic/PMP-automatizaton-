
const { test, expect } = require("@playwright/test");
const constants = require("../src/constants.js");
import { LoginPage } from "../src/LoginPage.js";
import { ContentBricks } from "../src/ContentBricks.js";
//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const name = constants.cbName

test("PMP Creation of CB", async ({ page }) => {
  //Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username,password);
  await login.loginAssert();

  //main Function
  const cb = new ContentBricks(page);
  await cb.enterToCB();
  await cb.formCB_General(name);



  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});
