// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

import { test } from "@playwright/test";
import  constants  from "../src/constants.js";
import { LoginPage } from "../src/LoginPage.js";
import { NormsAndStandarts } from "../src/NormsAndStandarts.js";
import { HomePage } from "../src/HomePage.js";

// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------

// Setting for non-parallel running of tests
test.describe.configure({ mode: "serial" });

// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of Norms and standarts
// -------------------------------------------------------------------------------------

test.describe("PMP Creation of Practical test", () => {
  let login;
  let normsAndStandarts;
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
  // Test Case 1: Check and Delete Existing normsAndStandarts
  // -------------------------------------------------------------------------

  test("Check and delete", async ({ page }) => {
    // Main Functions
    normsAndStandarts = new NormsAndStandarts(page, constants.dropdownElement1, constants.normAStand);
    await normsAndStandarts.checkAndDelete();
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of Norms and stand
  // -------------------------------------------------------------------------

  test("PMP - main creation", async ({ page }) => {
    // Main Functions
    normsAndStandarts = new NormsAndStandarts(page, constants.dropdownElement1, undefined, constants.labelName);
    await normsAndStandarts.enterToPRT();
    await normsAndStandarts.generalForm(constants.normAStand, constants.scbText);
    await normsAndStandarts.addGroups(constants.normAStandGroup);
    await normsAndStandarts.addFields(constants.fieldName1, constants.valueName1);
    

    await normsAndStandarts.chooseCBState();
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
