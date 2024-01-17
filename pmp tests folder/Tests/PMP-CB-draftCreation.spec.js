const { test, expect } = require("@playwright/test");
const constants = require("../src/constants.js");
import { LoginPage } from "../src/LoginPage.js";
import { ContentBricks } from "../src/ContentBricks.js";

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const name = constants.cbName;
const text = constants.cbText;
const fieldName1 = constants.contentBrickFieldName1;
const fieldName2 = constants.contentBrickFieldName2;
const dropdownElement1 = constants.dropdownElement1;
const dropdownElement2 = constants.dropdownElement2

//Setting for non parralel running of tests
test.describe.configure({ mode: 'serial' });

test.describe('PMP Creation of CB', () => {
  let login;
  let cb;
  let cb2;

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username,password);
    await login.loginAssert();
  });

  test("PMP main Creation of CB", async ({ page }) => {
    //main Functions
    cb = new ContentBricks(page,dropdownElement1);
    await cb.enterToCB();
    await cb.formCB_General(name,text);
    await cb.add_fields(fieldName1)

    cb2 = new ContentBricks(page,dropdownElement2);
    await cb2.add_fields(fieldName2)
    
    await cb.chooseCBState();
  });

  test("Check and delete", async ({ page }) => {
    
    //main Functions
    cb = new ContentBricks(page,dropdownElement1,name);
    await cb.checkCreatedCB();

    
  });



  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
