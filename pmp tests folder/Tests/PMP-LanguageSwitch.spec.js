import { LoginPage } from "../src/LoginPage.js";
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
  ///Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username,password);
  await login.loginAssert();

  //language Menu
  await languageMenu(page);

  //setting the english language
  await page.locator("//span[normalize-space()='English']").click();

  

 //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP current language check (English)", async ({ page }) => {
  //Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username,password);
  await login.loginAssert();

  await languageCheck(page);

  //Verification 
  const aktualniJazyk = await languageCheck(page);
  await expect(aktualniJazyk).toMatch("English");

  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
  


});





test("PMP - setting a czech language for these tests", async ({ page }) => {
  //Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username,password);
  await login.loginAssert();


  //language Menu
  await languageMenu(page);

  //setting the english language
  await page.locator("//span[normalize-space()='Czech']").click();

  

 //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP current language check (Czech)", async ({ page }) => {
  //Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username,password);
  await login.loginAssert();


  await languageCheck(page);

  //Verification 
  const aktualniJazyk = await languageCheck(page);
  await expect(aktualniJazyk).toMatch("Czech")

  
  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP - setting a chinese language for these tests", async ({ page }) => {
  //Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username,password);
  await login.loginAssert();


  //language Menu
  await languageMenu(page);

  //setting the english language
  await page.locator("//span[normalize-space()='Chinese']").click();

  

 //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP current language check (Chinese)", async ({ page }) => {
  //Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username,password);
  await login.loginAssert();


  await languageCheck(page);

  //Verification 
  const aktualniJazyk = await languageCheck(page);
  await expect(aktualniJazyk).toMatch("Chinese");

 //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP - setting a english language as default again", async ({ page }) => {
  ///Login
  const login = new LoginPage(page);
  await login.gotoLoginPage(baseURL);
  await login.login(username,password);
  await login.loginAssert();

  //language Menu
  await languageMenu(page);

  //setting the english language
  await page.locator("//span[normalize-space()='English']").click();

  

 //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});
