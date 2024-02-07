import { LoginPage } from "../src/LoginPage.js";
const { test, expect, browser } = require("@playwright/test");
const constants = require("../src/constants.js");

const exp = require("constants");
//Login
const username2 = constants.username2;
const password2 = constants.password2;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const english = constants.english;
const czech = constants.czech;
const chinese = constants.chinese;

//Setting for non parralel running of tests
test.describe.configure({ mode: "serial" });

test("PMP - setting a english language for these tests", async ({ page }) => {
  ///Login
  const login = new LoginPage(page, english);
  await login.gotoLoginPage(baseURL);
  await login.login(username2, password2);
  await login.loginAssert();

  //language Menu
  await login.languageMenu();

  //setting the english language
  await login.languageChoose();

  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP current language check (English)", async ({ page }) => {
  //Login
  const login = new LoginPage(page, english);
  await login.gotoLoginPage(baseURL);
  await login.login(username2, password2);
  await login.loginAssert();

  await login.languageMenu();
  await login.languageCheck();

  //Verification
  await login.languageResult(english);

  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP - setting a czech language for these tests", async ({ page }) => {
  ///Login
  const login = new LoginPage(page, czech);
  await login.gotoLoginPage(baseURL);
  await login.login(username2, password2);
  await login.loginAssert();

  //language Menu
  await login.languageMenu();

  //setting the english language
  await login.languageChoose();

  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP current language check (Czech)", async ({ page }) => {
  //Login
  const login = new LoginPage(page, czech);
  await login.gotoLoginPage(baseURL);
  await login.login(username2, password2);
  await login.loginAssert();

  await login.languageMenu();
  await login.languageCheck();

  //Verification
  await login.languageResult(czech);

  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP - setting a chinese language for these tests", async ({ page }) => {
  ///Login
  const login = new LoginPage(page, chinese);
  await login.gotoLoginPage(baseURL);
  await login.login(username2, password2);
  await login.loginAssert();

  //language Menu
  await login.languageMenu();

  //setting the english language
  await login.languageChoose();

  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP current language check (Chinese)", async ({ page }) => {
  //Login
  const login = new LoginPage(page, chinese);
  await login.gotoLoginPage(baseURL);
  await login.login(username2, password2);
  await login.loginAssert();

  await login.languageMenu();
  await login.languageCheck();

  //Verification
  await login.languageResult(chinese);

  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});

test("PMP - setting a english language as default again", async ({ page }) => {
  ///Login
  const login = new LoginPage(page, english);
  await login.gotoLoginPage(baseURL);
  await login.login(username2, password2);
  await login.loginAssert();

  //language Menu
  await login.languageMenu();

  //setting the english language
  await login.languageChoose();

  //LogOut
  await login.logOut();
  await login.logOutAssert(loggedOUTpageTitle);
});
