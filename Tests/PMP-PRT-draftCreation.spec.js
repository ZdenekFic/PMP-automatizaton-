// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

import { test } from "@playwright/test";
import  constants  from "../src/constants.js";
import { LoginPage } from "../src/LoginPage.js";
import { PRT } from "../src/PRT.js";
import { HomePage } from "../src/HomePage.js";

// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------

// Setting for non-parallel running of tests
test.describe.configure({ mode: "serial" });

// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of Practical test
// -------------------------------------------------------------------------------------

test.describe("PMP Creation of Practical test", () => {
  let login;
  let prt;
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
  // Test Case 1: Check and Delete Existing PRT
  // -------------------------------------------------------------------------

  test("Check and delete", async ({ page }) => {
    // Main Functions
    prt = new PRT(page, constants.dropdownElement1, constants.prtName);
    await prt.checkAndDelete();
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of PRT
  // -------------------------------------------------------------------------

  test("PMP - main creation", async ({ page }) => {
    // Main Functions
    prt = new PRT(page, constants.dropdownElement1, undefined, constants.labelName);
    await prt.enterToPRT();
    await prt.generalForm(constants.prtName, constants.scbText);
    await prt.addGroups(constants.prtGroupName);
    await prt.addFields(constants.fieldName1, constants.valueName1);
    

    await prt.chooseCBState();
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
