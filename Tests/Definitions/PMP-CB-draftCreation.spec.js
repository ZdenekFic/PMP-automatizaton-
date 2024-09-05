// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

const { test } = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { ContentBricks } from "../../src/ContentBricks.js";
import { HomePage } from "../../src/HomePage.js";

// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------

// Setting for non-parallel running of tests
test.describe.configure({ mode: "serial" });

// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of Content Brick (CB)
// -------------------------------------------------------------------------------------

test.describe("PMP Creation of CB", () => {
  let login;
  let cb;
  let cb2;
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
  // Test Case 1: Check and Delete Existing Content Bricks
  // -------------------------------------------------------------------------

  test("Check and delete", async ({ page }) => {
    // Main Functions
    cb = new ContentBricks(page, constants.dropdownElement1, constants.cbName);
    await cb.checkCreatedCB();
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of Content Brick (CB)
  // -------------------------------------------------------------------------

  test("PMP main Creation of CB", async ({ page }) => {
    // Main Functions
    cb = new ContentBricks(page, constants.dropdownElement1, undefined, constants.labelName);
    await cb.enterToCB();
    await cb.addNewCB();
    await cb.formCBGeneral(constants.cbName, constants.cbText);
    await cb.addGroups(constants.contentBrickGroupName1);
    await cb.addFields(constants.contentBrickFieldName1);

    cb2 = new ContentBricks(page, constants.dropdownElement2);
    await cb2.addFields(constants.contentBrickFieldName2);

    await cb.chooseCBState();
  });

  // -------------------------------------------------------------------------
  // Test Case 3: Script Tab Check in Content Brick
  // -------------------------------------------------------------------------

  test("Script tab check", async ({ page }) => {
    // Main Functions
    cb = new ContentBricks(page, constants.dropdownElement1, constants.cbName);
    await cb.enterToCB();
    await cb.enterToCBDetail();
    await cb.scriptTab(constants.tabName, constants.scriptExample);
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
