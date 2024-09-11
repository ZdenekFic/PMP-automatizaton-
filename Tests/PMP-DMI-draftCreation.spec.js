// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

import { test } from "@playwright/test";
import  constants  from "../src/constants.js";
import { LoginPage } from "../src/LoginPage.js";
import { DMI } from "../src/DMI.js";
import { HomePage } from "../src/HomePage.js";

// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------

// Setting for non-parallel running of tests
test.describe.configure({ mode: "serial" });

// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of dmi
// -------------------------------------------------------------------------------------

test.describe("PMP Creation of DMI", () => {
  let login;
  let dmi;
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
  // Test Case 1: Main Creation of dmi - General
  // -------------------------------------------------------------------------

  test("PMP - main creation General", async ({ page }) => {
    // Main Functions
    dmi = new DMI(page, constants.dmiName, constants.treeValueText);
    await dmi.enterToDMI();
    await dmi.generalForm(constants.dmiName);
    await dmi.dataModelCheck();
    await dmi.startProject(constants.dmiProjectName);
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
