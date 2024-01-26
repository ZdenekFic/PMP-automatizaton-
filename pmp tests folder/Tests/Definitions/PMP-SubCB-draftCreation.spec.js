const { test, expect } = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { SubContentBricks } from "../../src/definitionsSRC/SubContentBricks.js";

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const name = constants.scbName;
const text = constants.scbText;
const fieldName1 = constants.subcontentBrickFieldName1;
const fieldName2 = constants.subcontentBrickFieldName2;
const subCBdropdownElement1 = constants.subCBdropdownElement1;
const subCBdropdownElement2 = constants.subCBdropdownElement2;

//Setting for non parralel running of tests
test.describe.configure({ mode: 'serial' });

test.describe('PMP Creation of SCB', () => {
  let login;
  let scb;
  let scb2;

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username,password);
    await login.loginAssert();
  });


  test("Check and delete", async ({ page }) => {
    
    //main Functions
    scb = new SubContentBricks(page,subCBdropdownElement1,name);
    await scb.checkCreatedSCB();

    
  });

  test("PMP main Creation of SCB", async ({ page }) => {
    //main Functions
    scb = new SubContentBricks(page,subCBdropdownElement1);
    await scb.enterToSCB();
    await scb.formSCB_General(name,text);
    await scb.add_fields(fieldName1)

    
    
    await scb.chooseSCBState();
  });

 



  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
