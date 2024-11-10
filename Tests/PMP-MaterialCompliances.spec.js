// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

import { test } from "@playwright/test";
import  constants  from "../src/constants.js";
import { LoginPage } from "../src/LoginPage.js";
import { MaterialCompliances } from "../src/MaterialCompliances.js";
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
  let materialCompliance;
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
  // Test Case 1: Check and Delete Existing Material compliance
  // -------------------------------------------------------------------------

  test("Check and delete", async ({ page }) => {
    // Main Functions
    materialCompliance = new MaterialCompliances(page, constants.dropdownElement1, constants.normAStand);
    await materialCompliance.checkAndDelete();
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of Material compliance
  // -------------------------------------------------------------------------

  test("PMP - main creation", async ({ page }) => {
    // Main Functions
    materialCompliance = new MaterialCompliances(page, constants.dropdownElement1, undefined, constants.labelName);
    await materialCompliance.enterToPRT();
    await materialCompliance.generalForm(constants.matComp, constants.scbText);
    await materialCompliance.addGroups(constants.matCompGroupt);
    await materialCompliance.addFields(constants.fieldName1, constants.valueName1);
    

    await materialCompliance.chooseCBState();
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
