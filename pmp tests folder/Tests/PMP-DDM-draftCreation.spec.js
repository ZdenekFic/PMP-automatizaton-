const { test, expect } = require("@playwright/test");
const constants = require("../src/constants.js");
import { LoginPage } from "../src/LoginPage.js";
import { DDM } from "../src/DDM.js";


//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const ddmNAme = constants.ddmNAme;


//Setting for non parralel running of tests
test.describe.configure({ mode: 'serial' });

test.describe('PMP Creation of DDM', () => {
    let login;
    let ddm;
    

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username,password);
    await login.loginAssert();
  });

  test("PMP main Creation of DDM", async ({ page }) => {
    //main Functions
    ddm = new DDM(page);
    await ddm.enterToDDM();
    await ddm.generalForm(ddmNAme);
  });

  test("Check and delete", async ({ page }) => {
    
    //main Functions
    ddm = new DDM(page,ddmNAme)
    await ddm.checkAndDelete();
    
  });



  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
