const { test, expect } = require("@playwright/test");
const constants = require("../src/constants.js");
import { LoginPage } from "../src/LoginPage.js";
import { ActiveProjects } from "../src/ActiveProjects.js";

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;

test.describe("PMP Active projects functional check", () => {
  let login;
  let ap;

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username, password);
    await login.loginAssert();
  });

  test("PBB tree tab", async ({ page }) => {
    //Main function
    ap = new ActiveProjects(page);
    await ap.enterToOverviews();
    await ap.enterToItem();
    await ap.pbbTree();
  });

  test("PBB general tab", async ({ page }) => {
    //Main function
    ap = new ActiveProjects(page);
    await ap.enterToOverviews();
    await ap.enterToItem();
    await ap.general(username);
  });

  test("PBB dmi tab", async ({ page }) => {
    //Main function
    ap = new ActiveProjects(page);
    await ap.enterToOverviews();
    await ap.enterToItem();
    await ap.dmi();
    await ap.checkElementVisibility("true");
    await ap.checkElementVisibility("false");
  });

  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
