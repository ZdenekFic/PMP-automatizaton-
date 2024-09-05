const { test} = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { SubContentBricks } from "../../src/SubContentBricks.js";
import { HomePage } from "../../src/HomePage.js";

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const name = constants.scbName;
const text = constants.scbText;
const labelName = constants.labelName;

const subCBdropdownElement1 = constants.subCBdropdownElement1;

//Setting for non parralel running of tests
test.describe.configure({ mode: "serial" });

test.describe("PMP Creation of SCB", () => {
  let login;
  let scb;

  let home;

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username, password);
    await login.loginAssert();
    home = new HomePage(page, constants.mainDomain);
    await home.switchDomains();
  });

  test("Check and delete", async ({ page }) => {
    //main Functions
    scb = new SubContentBricks(page, subCBdropdownElement1, name);
    await scb.checkCreatedSCB();
  });

  test("PMP main Creation of SCB", async ({ page }) => {
    //main Functions
    scb = new SubContentBricks(page, subCBdropdownElement1,undefined,labelName);
    await scb.enterToCB();
    await scb.addNewCB();
    await scb.formCBGeneral(name, text);

    await scb.chooseCBState();
  });

  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
