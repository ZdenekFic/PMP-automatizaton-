const { login, logout } = require('../src/testBase');
const { test, expect } = require("@playwright/test");
const constants = require("../src/constants.js");
//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;

test("PMP Login", async ({ page }) => {
  //Login page and signing in
  await login(page,baseURL,username,password);

  // Log out
  await logout(page,loggedOUTpageTitle)
});
