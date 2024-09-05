const { test, expect } = require("@playwright/test");
const constants = require("../../src/constants.js");
import { LoginPage } from "../../src/LoginPage.js";
import { Project } from "../../src/Project.js";
import { HomePage } from "../../src/HomePage.js";

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const projectName = constants.projectName;


//Setting for non parralel running of tests
test.describe.configure({ mode: "serial" });

test.describe("Project creation", () => {
  let login;
  let project;
  let home;

  test.beforeEach(async ({ page }) => {
    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username, password);
    await login.loginAssert();
    home = new HomePage(page,constants.mainDomain);
    await home.switchDomains();
  });


  test("New project", async ({ page }) => {
    //main Functions
    project = new Project(page);
    await project.enterToOverview();
    await project.newProject(projectName);
    
  });

  test.afterEach(async ({}) => {
    //LogOut
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });
});
