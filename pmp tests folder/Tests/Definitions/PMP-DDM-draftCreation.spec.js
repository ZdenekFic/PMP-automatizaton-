const { test, expect } = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { DDM } from "../../src//definitionsSRC/DDM.js";


//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const ddmNAme = constants.ddmNAme;
const containerName = constants.containerName;


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

  test("Check and delete", async ({ page }) => {
    
    //main Functions
    ddm = new DDM(page,ddmNAme)
    await ddm.checkAndDelete();
    
  });

  test("PMP - main creation", async ({ page }) => {
    //main Functions
    ddm = new DDM(page);
    await ddm.enterToDDM();
    await ddm.generalForm(ddmNAme,containerName);
  });

  
  



  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
