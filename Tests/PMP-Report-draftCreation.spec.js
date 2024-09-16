// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

import { test } from "@playwright/test";
import  constants  from "../src/constants.js";
import { LoginPage } from "../src/LoginPage.js";
import { Report } from "../src/Report.js";
import { HomePage } from "../src/HomePage.js";

// -------------------------------------------------------------------------------------
// Test Suite Configuration
// -------------------------------------------------------------------------------------

// Setting for non-parallel running of tests
test.describe.configure({ mode: "serial" });

// -------------------------------------------------------------------------------------
// Main Test Suite: PMP Creation of Content Brick (report)
// -------------------------------------------------------------------------------------

test.describe("PMP Creation of report", () => {
  let login;
  let report;
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
  // Test Case 1: Delete created reports
  // -------------------------------------------------------------------------
  test("PMP delete created reports", async ({ page }) => {
    // Main Functions
    report = new Report(page, constants.reportName);
    await report.deleteCreatedReports();
  
    
  });


  // -------------------------------------------------------------------------
  // Test Case 2: Main Creation of Report
  // -------------------------------------------------------------------------

  test("PMP main Creation of Report", async ({ page }) => {
    // Main Functions
    report = new Report(page, constants.reportName);
    await report.enterToReport();
    await report.makeReport();
  
    
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
