const { test, expect } = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { ContentBricks } from "../../src/definitionsSRC/ContentBricks.js";
import { HomePage } from "../../src/HomePage.js";

//variables
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const name = constants.cbName;
const text = constants.cbText;
const groupName1 = constants.contentBrickGroupName1;
const fieldName1 = constants.contentBrickFieldName1;
const fieldName2 = constants.contentBrickFieldName2;
const dropdownElement1 = constants.dropdownElement1;
const dropdownElement2 = constants.dropdownElement2;
const tabName = constants.tabName;
const scriptExample = constants.scriptExample;
const labelName = constants.labelName;

//Setting for non parralel running of tests
test.describe.configure({ mode: "serial" });

test.describe("PMP Creation of CB", () => {
  let login;
  let cb;
  let cb2;
  let home;

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username, password);
    await login.loginAssert();
    home = new HomePage(page,constants.mainDomain);
    await home.switchDomains();
    
  });

  test("Check and delete", async ({ page }) => {
    //main Functions
    cb = new ContentBricks(page, dropdownElement1, name);
    await cb.checkCreatedCB();
  });

  test("PMP main Creation of CB", async ({ page }) => {
    //main Functions
    cb = new ContentBricks(page, dropdownElement1,undefined, labelName);
    await cb.enterToCB();
    await cb.addNewCB();
    await cb.formCBGeneral(name, text);
    await cb.addGroups(groupName1)
    await cb.addFields(fieldName1);

    cb2 = new ContentBricks(page, dropdownElement2);
    await cb2.addFields(fieldName2);

    await cb.chooseCBState();
  });

  test("Script tab check", async ({ page }) => {
    //main Functions
    cb = new ContentBricks(page, dropdownElement1,name);
    await cb.enterToCB();
    await cb.enterToCBDetail();
    await cb.scriptTab(tabName,scriptExample);

    

    
  });

  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
