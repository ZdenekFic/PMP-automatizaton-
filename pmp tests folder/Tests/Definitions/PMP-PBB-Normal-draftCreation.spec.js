const { test, expect } = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { PBB } from "../../src/definitionsSRC/PBB.js";

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const pbbNameNormal = constants.pbbNameNormal;
const pbbText = constants.cbText;

//Setting for non parralel running of tests
test.describe.configure({ mode: "serial" });

test.describe("PMP Creation of PBB Normal", () => {
  let login;
  let pbb;

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username, password);
    await login.loginAssert();
  });

  test("Check and delete ", async ({ page }) => {
    //main Functions
    pbb = new PBB(page, pbbNameNormal);
    await pbb.checkAndDelete();
  });

  test("PMP main Creation of PBB in normal type", async ({ page }) => {
    //main Functions
    pbb = new PBB(page);
    await pbb.enterToPBB();
    await pbb.makroLevel_Name(pbbNameNormal);
    await pbb.makroLevel_PbbTypeNormal();
    await pbb.makroLevel_Owner();
    await pbb.makroLevel_Maintainer();
    await pbb.makroLevel_Tags();
    await pbb.makroLevel_Description(pbbText);
    await pbb.makroLevel_ContainsTask();
    await pbb.makroLevel_ShowInReports();
    await pbb.makroLevel_Save();
  });

  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
