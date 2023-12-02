const { login, logout } = require('../src/testBase.js');
const { test, expect } = require("@playwright/test");
const constants = require('../src/constants.js');

// Constants use for login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;


// Constants for assertations
const domain = constants.domain;
const role = constants.role;
const account = constants.account;

test("PMP Account editing", async ({ page }) => {
  //Login page and signing in
  await login(page, baseURL, username, password);

  //Going to account we want to edit
  // Left panel/User administration
  await page.getByRole("button", { name: "User Administration" }).click();
  
  // User Administration/Users
  await page.getByText("Users").click();
 
  // Clicking on user detail
  await page.getByRole("link", { name: account }).click();
  
  // In user detail we choose User domain roles tab
  await page.getByRole("tab", { name: "User domain roles" }).click();
  
  // Clicking on button ADD
  await page.getByRole("button", { name: "Add" }).click();
  
  // Clicking on list
  await page.getByLabel("Domain", { exact: true }).click();
  
  // Choosing first value in a list no matter what it is
  await page.getByRole("option").nth(domain).click();
  
  // Clicking on list
  await page.getByLabel("Role", { exact: true }).click();
  
  // Choosing first value in a list no matter what it is
  await page.getByRole("option").nth(role).click();
  
  // Confirm a change by clicking on button ADD
  await page.locator("form").getByRole("button", { name: "Add" }).click();

  
  
  // Log out
  await logout(page,loggedOUTpageTitle);
});
