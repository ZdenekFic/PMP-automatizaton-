// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

import { test } from "@playwright/test";
import  constants  from "../src/constants.js";
import { LoginPage } from "../src/LoginPage.js";
import { PreShipment } from "../src/Pre-shipmentInst.js";
import { HomePage } from "../src/HomePage.js";

// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------

// Setting for non-parallel running of tests
test.describe.configure({ mode: "serial" });

// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of Norms and standarts
// -------------------------------------------------------------------------------------

test.describe("PMP Creation of Pre-shipment", () => {
  let login;
  let preshipment;
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
  // Test Case 1: Check and Delete Existing Pre-shipment
  // -------------------------------------------------------------------------

  test("Check and delete", async ({ page }) => {
    // Main Functions
    preshipment = new PreShipment(page, constants.dropdownElement1, constants.preshipmentInst);
    await preshipment.checkAndDelete();
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of Material compliance
  // -------------------------------------------------------------------------

  test("PMP - main creation", async ({ page }) => {
    // Main Functions
    preshipment = new PreShipment(page, constants.dropdownElement1, undefined, constants.labelName);
    await preshipment.enterToPRT();
    await preshipment.generalForm(constants.preshipmentInst, constants.scbText);
    await preshipment.addGroups(constants.preshipmentInstGroup);
    await preshipment.addFields(constants.fieldName1, constants.valueName1);
    

    await preshipment.chooseCBState();
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
