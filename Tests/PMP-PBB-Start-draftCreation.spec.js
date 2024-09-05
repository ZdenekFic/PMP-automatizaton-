// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

const { test } = require("@playwright/test");
const constants = require("../src/constants.js");
import { LoginPage } from "../src/LoginPage.js";
import { PBB } from "../src/PBB.js";
import { HomePage } from "../src/HomePage.js";

// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------

// Setting for non-parallel running of tests
test.describe.configure({ mode: "serial" });

// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of PBB
// -------------------------------------------------------------------------------------

test.describe("PMP Creation of PBB", () => {
  let login;
  let pbb;
  let home;

  // -------------------------------------------------------------------------
  // Before Each Test: Setup and Login
  // -------------------------------------------------------------------------

  test.beforeEach(async ({ page }) => {
    // Login
    login = new LoginPage(page);
    await login.gotoLoginPage(constants.baseURL);
    await login.login(constants.username, constants.password);
    await login.loginAssert();
    home = new HomePage(page, constants.mainDomain);
    await home.switchDomains();
  });

  // -------------------------------------------------------------------------
  // Test Case 1: Check and Delete Existing PBB
  // -------------------------------------------------------------------------

  test("Check and delete", async ({ page }) => {
    // Main Functions
    pbb = new PBB(page, constants.pbbName);
    await pbb.checkAndDelete();
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of PBB
  // -------------------------------------------------------------------------

  test("PMP main Creation of PBB", async ({ page }) => {
    // Main Functions
    pbb = new PBB(page, constants.pbbName, constants.testingDDMItem);
    await pbb.enterToPBB();
    await pbb.makroLevelName(constants.pbbName);
    await pbb.makroLevelPbbType();
    await pbb.makroLevelDescription(constants.scbText);
    await pbb.makroLevelDefaultDDM();
    await pbb.makroLevelSave();
    await pbb.requestSaveAssert();
  });

  // -------------------------------------------------------------------------
  // After Each Test: Logout and Cleanup
  // -------------------------------------------------------------------------

  test.afterEach(async () => {
    // LogOut
    await login.logOut();
    await login.logOutAssert(constants.loggedOUTpageTitle);
  });
});
