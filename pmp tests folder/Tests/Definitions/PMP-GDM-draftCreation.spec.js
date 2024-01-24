const { test, expect } = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { GDM } from "../../src/definitionsSRC/GDM.js";
import { HomePage } from "../../src/HomePage.js";


//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const gdmName = constants.gdmName;
const contairName = constants.containerName;



//Setting for non parralel running of tests
test.describe.configure({ mode: 'serial' });

test.describe('PMP Creation of GDM', () => {
    let login;
    let gdm;
    
    

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username,password);
    await login.loginAssert();
  });

  test("Find and delete", async ({ page }) => {
    
    //main Functions
    
    gdm = new GDM(page,gdmName);

    await gdm.findAndDelete(gdmName);
    
  });

  test("PMP - main creation", async ({ page }) => {
    //main Functions
    gdm = new GDM(page);
    await gdm.enterToGDM_Overviews();
    await gdm.generalForm(gdmName);
    await gdm.dataModelTab(contairName);
  });

  

  
  



  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
