// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

const { test, expect } = require("@playwright/test");
const constants = require("../src/constants.js");
import { LoginPage } from "../src/LoginPage.js";
import { DGL } from "../src/DGL.js";
import { HomePage } from "../src/HomePage.js";

// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------

// Setting for non-parallel running of tests
test.describe.configure({ mode: "serial" });

// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of DGL
// -------------------------------------------------------------------------------------

test.describe("PMP Creation of DGL", () => {
  let login;
  let dgl;
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
  // Test Case 1: Check and Delete Existing DGL
  // -------------------------------------------------------------------------

  test("Check and delete", async ({ page }) => {
    // Main Functions
    dgl = new DGL(page, constants.dropdownElement1, constants.dglName);
    await dgl.checkAndDelete();
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of DGL
  // -------------------------------------------------------------------------

  test("PMP - main creation", async ({ page }) => {
    // Main Functions
    dgl = new DGL(page, constants.dropdownElement1, undefined, constants.labelName);
    await dgl.enterToDGL();
    await dgl.generalForm(constants.dglName, constants.scbText);
    await dgl.addGroups(constants.dglGroupName);
    await dgl.addFields(constants.fieldName1, constants.valueName1);
    

    await dgl.chooseCBState();
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
