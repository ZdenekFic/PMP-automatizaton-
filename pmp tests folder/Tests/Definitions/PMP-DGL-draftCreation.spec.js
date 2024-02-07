const { test, expect } = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { DGL } from "../../src/definitionsSRC/DGL.js";
import { HomePage } from "../../src/HomePage.js";

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const dglName = constants.dglName;

const text = constants.cbText;
const fieldName1 = constants.contentBrickFieldName1;
const fieldName2 = constants.contentBrickFieldName2;
const valueName1 = constants.valueName1;
const valueName2 = constants.valueName2;
const dropdownElement1 = constants.dropdownElement1;
const dropdownElement2 = constants.dropdownElement2;

//Setting for non parralel running of tests
test.describe.configure({ mode: "serial" });

test.describe("PMP Creation of DGL", () => {
  let login;
  let dgl;
  let dgl2;
  let home;

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username, password);
    await login.loginAssert();
    home = new HomePage(page);
    await home.switchDomains();
  });

  test("Check and delete", async ({ page }) => {
    //main Functions
    dgl = new DGL(page, dropdownElement1, dglName);
    await dgl.checkAndDelete();
  });

  test("PMP - main creation", async ({ page }) => {
    //main Functions
    dgl = new DGL(page, dropdownElement1);
    await dgl.enterToDGL();
    await dgl.generalForm(dglName, text);
    await dgl.add_fields(fieldName1, valueName1);

    dgl2 = new DGL(page, dropdownElement2);
    await dgl2.add_fields(fieldName2, valueName2);

    await dgl.chooseCBState();
  });

  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
