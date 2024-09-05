// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

const { test, expect } = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { DDM } from "../../src/DDM.js";
import { HomePage } from "../../src/HomePage.js";

// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------

// Setting for non-parallel running of tests
test.describe.configure({ mode: "serial" });

// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of DDM
// -------------------------------------------------------------------------------------

test.describe("PMP Creation of DDM", () => {
  let login;
  let ddm;
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
  // Test Case 1: Check and Delete Existing DDM
  // -------------------------------------------------------------------------

  test("Check and delete", async ({ page }) => {
    // Main Functions
    ddm = new DDM(page, constants.ddmName);
    await ddm.checkAndDelete(constants.ddmName);
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of DDM - General
  // -------------------------------------------------------------------------

  test("PMP - main creation General", async ({ page }) => {
    // Main Functions
    ddm = new DDM(page, constants.ddmName, constants.treeValueText);
    await ddm.enterToDDM();
    await ddm.generalForm(constants.ddmName);
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
