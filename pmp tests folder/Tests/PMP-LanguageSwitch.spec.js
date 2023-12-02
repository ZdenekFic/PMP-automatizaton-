const { login, logout } = require("../src/testBase");
const { test, expect, browser } = require("@playwright/test");
const constants = require("../src/constants.js");
const { languageCheck,languageMenu } = require("../src/functions.js");
const exp = require("constants");
//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;

//Setting for non parralel running of tests
test.describe.configure({ mode: 'serial' });


test("PMP - setting a english language for these tests", async ({ page }) => {
  //Login page and signing in
  await login(page, baseURL, username, password);

  //language Menu
  await languageMenu(page);

  //setting the english language
  await page.locator("//span[normalize-space()='English']").click();

  

  // Log out
  await logout(page, loggedOUTpageTitle);
});

test("PMP current language check (English)", async ({ page }) => {
  //Login page and signing in
  await login(page, baseURL, username, password);

  await languageCheck(page);

  //Verification 
  const aktualniJazyk = await languageCheck(page);
  await expect(aktualniJazyk).toMatch("English");

  //Log out
  await logout(page, loggedOUTpageTitle);
  


});





test("PMP - setting a czech language for these tests", async ({ page }) => {
  //Login page and signing in
  await login(page, baseURL, username, password);

  //language Menu
  await languageMenu(page);

  //setting the english language
  await page.locator("//span[normalize-space()='Czech']").click();

  

  // Log out
  await logout(page, loggedOUTpageTitle);
});

test("PMP current language check (Czech)", async ({ page }) => {
  //Login page and signing in
  await login(page, baseURL, username, password);

  await languageCheck(page);

  //Verification 
  const aktualniJazyk = await languageCheck(page);
  await expect(aktualniJazyk).toMatch("Czech")

  
  await logout(page, loggedOUTpageTitle);
});

test("PMP - setting a chinese language for these tests", async ({ page }) => {
  //Login page and signing in
  await login(page, baseURL, username, password);

  //language Menu
  await languageMenu(page);

  //setting the english language
  await page.locator("//span[normalize-space()='Chinese']").click();

  

  // Log out
  await logout(page, loggedOUTpageTitle);
});

test("PMP current language check (Chinese)", async ({ page }) => {
  //Login page and signing in
  await login(page, baseURL, username, password);

  await languageCheck(page);

  //Verification 
  const aktualniJazyk = await languageCheck(page);
  await expect(aktualniJazyk).toMatch("Chinese");

  // Log out
  await logout(page, loggedOUTpageTitle);
});
