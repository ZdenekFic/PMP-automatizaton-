import { LoginPage } from "../src/LoginPage.js";
import { Users } from "../src/Users.js";
const { test, expect } = require("@playwright/test");
const constants = require('../src/constants.js');


// Constants use for login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;


// Constants for assertations
const domain = constants.domain;
const role = constants.role;
const account = constants.account;




test("PMP Account editing", async ({ page }) => {
  //Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username,password);
  await login.loginAssert();


  //Main Function
  const users = new Users(page,domain,role,account);
  await users.domainRolesEdit()
  

  
  
//LogOut
await login.logOut();
await login.logOutAssert(loggedOUTpageTitle);
});

