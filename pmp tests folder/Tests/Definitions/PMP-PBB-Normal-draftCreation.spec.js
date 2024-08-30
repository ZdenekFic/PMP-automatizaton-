const { test, expect } = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { PBB } from "../../src/definitionsSRC/PBB.js";
import { HomePage } from "../../src/HomePage.js";

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const pbbNameNormal = constants.pbbNameNormal;
const pbbText = constants.cbText;
const mainDomain = constants.mainDomain;


//Setting for non parralel running of tests
test.describe.configure({ mode: "serial" });

test.describe("PMP Creation of PBB Normal", () => {
  let login;
  let pbb;
  let home;

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username, password);
    await login.loginAssert();
    home = new HomePage(page,mainDomain);
    await home.switchDomains();
    
    
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
    await pbb.makroLevelName(pbbNameNormal);
    await pbb.makroLevelPbbTypeNormal();
    await pbb.makroLevelDescription(pbbText);
    await pbb.makroLevelSave();
  });

  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
