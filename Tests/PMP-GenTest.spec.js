// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

import { test } from "@playwright/test";
import  constants  from "../src/constants.js";
import { LoginPage } from "../src/LoginPage.js";
import { GenTest } from "../src/GenTest.js";
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
  let genTest;
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
  // Test Case 1: Check and Delete Existing genTest
  // -------------------------------------------------------------------------

  test("Check and delete", async ({ page }) => {
    // Main Functions
    genTest = new GenTest(page, constants.dropdownElement1, constants.genTest);
    await genTest.checkAndDelete();
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of genTest
  // -------------------------------------------------------------------------

  test("PMP - main creation", async ({ page }) => {
    // Main Functions
    genTest = new GenTest(page, constants.dropdownElement1, undefined, constants.labelName);
    await genTest.enterToPRT();
    await genTest.generalForm(constants.genTest, constants.scbText);
    await genTest.addGroups(constants.genGroupName);
    await genTest.addFields(constants.fieldName1, constants.valueName1);
    

    await genTest.chooseCBState();
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
