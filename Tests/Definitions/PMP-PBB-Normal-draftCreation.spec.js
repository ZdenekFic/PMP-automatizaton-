// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

const { test} = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { PBB } from "../../src/PBB.js";
import { HomePage } from "../../src/HomePage.js";

// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------

// Setting for non-parallel running of tests
test.describe.configure({ mode: "serial" });

// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of PBB Normal
// -------------------------------------------------------------------------------------

test.describe("PMP Creation of PBB Normal", () => {
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
    pbb = new PBB(page, constants.pbbNameNormal);
    await pbb.checkAndDelete();
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of PBB in Normal Type
  // -------------------------------------------------------------------------

  test("PMP main Creation of PBB in normal type", async ({ page }) => {
    // Main Functions
    pbb = new PBB(page);
    await pbb.enterToPBB();
    await pbb.makroLevelName(constants.pbbNameNormal);
    await pbb.makroLevelPbbTypeNormal();
    await pbb.makroLevelDescription(constants.scbText);
    await pbb.makroLevelSave();
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
