import { LoginPage } from "../src/LoginPage.js";
import { Overviews } from "../src/Overviews.js";

const { test } = require("@playwright/test");
const constants = require("../src/constants.js");

// Constants use
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const pageUrls = constants.pageUrls;
const overviewHeaders = constants.overviewHeaders;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;
const overviewMenuButtons = constants.overviewMenuButtons;

//Test starts HERE
test.describe("Overview check TESTS ", () => {
  let login;
  let home;

  test.beforeEach(async ({ page }) => {
    // Function for log in

    //Login
    login = new LoginPage(page);
    await login.gotoLoginPage(baseURL);
    await login.login(username, password);
    await login.loginAssert();
  });

  test.afterEach(async ({ page }) => {
    //LogOut
    login = new LoginPage(page);
    await login.logOut();
    await login.logOutAssert(loggedOUTpageTitle);
  });

  //Left panel Main tabs - Tasks, Active Projects, Draft Projects, DMI,

  test("Task overview", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.taskMenuButton,
      overviewHeaders.taskHeader,
      pageUrls.taskOverview
    );
    await home.mainMenuTabs(
      overviewMenuButtons.taskMenuButton,
      pageUrls.taskOverview
    );
  });

  test("Active projects overview", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.activeProjectsMenuButton,
      overviewHeaders.activeProjectsHeader,
      pageUrls.activeProjectsOverview
    );
    await home.mainMenuTabs(
      overviewMenuButtons.activeProjectsMenuButton,
      pageUrls.activeProjectsOverview
    );
  });

  test("Draft projects", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.draftProjectsMenuButton,
      overviewHeaders.draftProjectsHeader,
      pageUrls.draftProjectsOverview
    );
    await home.mainMenuTabs(
      overviewMenuButtons.draftProjectsMenuButton,
      pageUrls.draftProjectsOverview
    );
  });

  test("Domain model instances overview", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.domainModelInstancesMenuButton,
      overviewHeaders.domainModelInstancesHeader,
      pageUrls.domainModelInstancesOverview
    );
    await home.mainMenuTabs(
      overviewMenuButtons.domainModelInstancesMenuButton,
      pageUrls.domainModelInstancesOverview
    );
  });

  test("Reports", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.reportsMenuButton,
      overviewHeaders.reportsHeader,
      pageUrls.reportsOverview
    );
    await home.mainMenuTabs(
      overviewMenuButtons.reportsMenuButton,
      pageUrls.reportsOverview
    );
  });

  //Definitions overviews tests
  test("Definitions/Content bricks", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.definitionsContentBricksMenuButton,
      overviewHeaders.definitionsContentBricksHeader,
      pageUrls.definitionsContentBricks
    );
    await home.definitionsMenu(
      overviewMenuButtons.definitionsContentBricksMenuButton,
      pageUrls.definitionsContentBricks
    );
  });

  test("Definitions/Sub Content bricks", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.definitionsSubContentBricksMenuButton,
      overviewHeaders.definitionsSubContentBricksHeader,
      pageUrls.definitionsSubContentBricks
    );
    await home.definitionsMenu(
      overviewMenuButtons.definitionsSubContentBricksMenuButton,
      pageUrls.definitionsSubContentBricks
    );
  });

  test("Definitions/Domain Data Models", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.definitionsDomainDataModelsMenuButton,
      overviewHeaders.definitionsDomainDataModelsHeader,
      pageUrls.definitionsDomainDataModels
    );
    await home.definitionsMenu(
      overviewMenuButtons.definitionsDomainDataModelsMenuButton,
      pageUrls.definitionsDomainDataModels
    );
  });

  test("Definitions/DGL", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.definitionsDGLMenuButton,
      overviewHeaders.definitionsDGLHeader,
      pageUrls.definitionsDGL
    );
    await home.definitionsMenu(
      overviewMenuButtons.definitionsDGLMenuButton,
      pageUrls.definitionsDGL
    );
  });

  test("Definitions/PBBs", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.definitionsPBBsMenuButton,
      overviewHeaders.definitionsPBBsHeader,
      pageUrls.definitionsPBBs
    );
    await home.definitionsMenu(
      overviewMenuButtons.definitionsPBBsMenuButton,
      pageUrls.definitionsPBBs
    );
  });

  test("Definitions/PBBs queries", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.definitionsPBBsQueriesMenuButton,
      overviewHeaders.definitionsPBBsQueriesHeader,
      pageUrls.definitionsPBBsQueries
    );
    await home.definitionsMenu(
      overviewMenuButtons.definitionsPBBsQueriesMenuButton,
      pageUrls.definitionsPBBsQueries
    );
  });

  test("Definitions/GDM", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.definitionsGDMMenuButton,
      overviewHeaders.definitionsGDMHeader,
      pageUrls.definitionsGDM
    );
    await home.definitionsMenu(
      overviewMenuButtons.definitionsGDMMenuButton,
      pageUrls.definitionsGDM
    );
  });

  // Administration Overviews tests

  test("Administration - Capabilities", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.administrationCapabilitiesMenuButton,
      overviewHeaders.administrationCapabilitiesHeader,
      pageUrls.administrationCapabilities
    );
    await home.administrationsTabs(
      overviewMenuButtons.administrationCapabilitiesMenuButton,
      pageUrls.administrationCapabilities
    );
  });

  test("Administration - domains", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.administrationDomainsMenuButton,
      overviewHeaders.administrationDomainsHeader,
      pageUrls.administrationDomains
    );
    await home.administrationsTabs(
      overviewMenuButtons.administrationDomainsMenuButton,
      pageUrls.administrationDomains
    );
  });

  test("Administration - Formatting", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.administrationFormattingMenuButton,
      overviewHeaders.administrationFormattingHeader,
      pageUrls.administrationFormatting
    );
    await home.administrationsTabs(
      overviewMenuButtons.administrationFormattingMenuButton,
      pageUrls.administrationFormatting
    );
  });

  test("Administration - Lists", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.administrationListsMenuButton,
      overviewHeaders.administrationListsHeader,
      pageUrls.administrationLists
    );
    await home.administrationsTabs(
      overviewMenuButtons.administrationListsMenuButton,
      pageUrls.administrationLists
    );
  });

  test("Administration - Qualifications", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.administrationQualificationsMenuButton,
      overviewHeaders.administrationQualificationsHeader,
      pageUrls.administrationQualifications
    );
    await home.administrationsTabs(
      overviewMenuButtons.administrationQualificationsMenuButton,
      pageUrls.administrationQualifications
    );
  });

  test("Administration - Tags and search ids", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.administrationTagsAndSearchIdsMenuButton,
      overviewHeaders.administrationTagsAndSearchIdsHeader,
      pageUrls.administrationTagsAndSearchIds
    );
    await home.administrationsTabs(
      overviewMenuButtons.administrationTagsAndSearchIdsMenuButton,
      pageUrls.administrationTagsAndSearchIds
    );
  });

  test("Administration - Unit types", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.administrationUnitTypesMenuButton,
      overviewHeaders.administrationUnitTypesHeader,
      pageUrls.administrationUnitTypes
    );
    await home.administrationsTabs(
      overviewMenuButtons.administrationUnitTypesMenuButton,
      pageUrls.administrationUnitTypes
    );
  });

  test("Administration - Units", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.administrationUnitsMenuButton,
      overviewHeaders.administrationUnitsHeader,
      pageUrls.administrationUnits
    );
    await home.administrationsTabs(
      overviewMenuButtons.administrationUnitsMenuButton,
      pageUrls.administrationUnits
    );
  });

  test("Administration - Usage Types", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.administrationUsageTypesMenuButton,
      overviewHeaders.administrationUsageTypesHeader,
      pageUrls.administrationUsageTypes
    );
    await home.administrationsTabs(
      overviewMenuButtons.administrationUsageTypesMenuButton,
      pageUrls.administrationUsageTypes
    );
  });

  // User Administration overviews

  test("USER Administration - Groups", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.userAdministrationGroupsMenuButton,
      overviewHeaders.userAdministrationGroupsHeader,
      pageUrls.userAdministrationGroups
    );
    await home.userAdministrationTabs(
      overviewMenuButtons.userAdministrationGroupsMenuButton,
      pageUrls.userAdministrationGroups
    );
  });

  test("USER Administration - Organigram", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.userAdministrationOrganigramMenuButton,
      overviewHeaders.userAdministrationOrganigramHeader,
      pageUrls.userAdministrationOrganigram
    );
    await home.userAdministrationTabs(
      overviewMenuButtons.userAdministrationOrganigramMenuButton,
      pageUrls.userAdministrationOrganigram
    );
  });

  test("USER Administration - roles", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.userAdministrationRolesMenuButton,
      overviewHeaders.userAdministrationRolesHeader,
      pageUrls.userAdministrationRoles
    );
    await home.userAdministrationTabs(
      overviewMenuButtons.userAdministrationRolesMenuButton,
      pageUrls.userAdministrationRoles
    );
  });

  test("USER Administration - Users", async ({ page }) => {
    home = new Overviews(
      page,
      overviewMenuButtons.userAdministrationUsersMenuButton,
      overviewHeaders.userAdministrationUsersHeader,
      pageUrls.userAdministrationUsers
    );
    await home.userAdministrationTabs(
      overviewMenuButtons.userAdministrationUsersMenuButton,
      pageUrls.userAdministrationUsers
    );
  });
});
