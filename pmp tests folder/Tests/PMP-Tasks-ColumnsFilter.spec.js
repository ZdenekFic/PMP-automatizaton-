
const { test, expect,retries } = require("@playwright/test");
const constants = require("../src/constants.js");
import { LoginPage } from "../src/LoginPage.js";
import { Tasks } from "../src/Tasks.js";

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;

test("PMP Choose Columns", async ({ page }) => {
  //Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username,password);
  await login.loginAssert();

  //Main function
  const tasks = new Tasks(page);
  await tasks.columnsChooser();
  
  


  



  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
  
});
