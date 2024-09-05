// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

import { test } from "@playwright/test";
import constants from "../src/constants.js";
import { LoginPage } from "../src/LoginPage.js";
import { SubContentBricks } from "../src/SubContentBricks.js";
import { HomePage } from "../src/HomePage.js";


// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------


// Nastavení pro sekvenční spuštění testů (ne paralelně)
test.describe.configure({ mode: "serial" });


// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of PBB
// -------------------------------------------------------------------------------------


// Hlavní testovací popis: Vytváření a správa SCB
test.describe("PMP Creation of SCB", () => {
  let login;
  let scb;
  let home;

 // -------------------------------------------------------------------------
  // Before Each Test: Setup and Login
  // -------------------------------------------------------------------------
  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.gotoLoginPage(constants.baseURL);
    await login.login(constants.username, constants.password);
    await login.loginAssert();
    home = new HomePage(page, constants.mainDomain);
    await home.switchDomains();
  });

  // -------------------------------------------------------------------------
  // Test Case 1: Check and Delete Existing SCB
  // -------------------------------------------------------------------------

  test("Check and delete", async ({ page }) => {
    scb = new SubContentBricks(page, constants.subCBdropdownElement1, constants.scbName);
    await scb.checkCreatedSCB();
  });

  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of SCB
  // -------------------------------------------------------------------------
  test("PMP main Creation of SCB", async ({ page }) => {
    scb = new SubContentBricks(page, constants.subCBdropdownElement1, undefined, constants.labelName);
    await scb.enterToCB();
    await scb.addNewCB();
    await scb.formCBGeneral(constants.scbName, constants.scbText);
    await scb.chooseCBState();
  });

  // -------------------------------------------------------------------------
  // After Each Test: Logout and Cleanup
  // -------------------------------------------------------------------------
  test.afterEach(async () => {
    await login.logOut();
    await login.logOutAssert(constants.loggedOUTpageTitle);
  });
});
