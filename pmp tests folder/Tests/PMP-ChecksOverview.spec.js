const {
    login,
    logout,
} = require("../src/testBase.js");

const {
    mainMenuTabs,
    checkUserAdministrationSection,
    definitionsMenu,
    checkAdministrationTabs,
} = require("../src/functions.js")

const { test, expect } = require("@playwright/test");
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
  test.beforeEach(async ({ page }) => {
    // Function for log in

    await login(page, baseURL, username, password);
  });

  test.afterEach(async ({ page }) => {
    // Function for log out
    await logout(page,loggedOUTpageTitle);
  });

  
  
  
  
  //Left panel Main tabs - Tasks, Active Projects, Draft Projects, DMI,

  test("Task overview", async ({ page }) => {
    await mainMenuTabs(page,overviewMenuButtons.taskMenuButton,overviewHeaders.taskHeader, pageUrls.taskOverview);
  });

  test("Active projects overview", async ({ page }) => {
    await mainMenuTabs(
      page,
      overviewMenuButtons.activeProjectsMenuButton,
      overviewHeaders.activeProjectsHeader,
      
      pageUrls.activeProjectsOverview
    );
  });

  test("Draft projects", async ({ page }) => {
    await mainMenuTabs(
      page,
      overviewMenuButtons.draftProjectsMenuButton,
      overviewHeaders.draftProjectsHeader,
      
      pageUrls.draftProjectsOverview
    );
  });

  test("Domain model instances overview", async ({ page }) => {
    await mainMenuTabs(
      page,
      overviewMenuButtons.domainModelInstancesMenuButton,
      overviewHeaders.domainModelInstancesHeader,
      
      pageUrls.domainModelInstancesOverview
    );
  });

  test("Reports", async ({ page }) => {
    await mainMenuTabs(page, overviewMenuButtons.reportsMenuButton, overviewHeaders.reportsHeader, pageUrls.reportsOverview);
  });



  
  
  
  
  
  //Definitions overviews tests
  test("Definitions/Content bricks", async ({ page }) => {
    await definitionsMenu(
      page,
     overviewMenuButtons.definitionsContentBricksMenuButton,
      overviewHeaders.definitionsContentBricksHeader,
      
      pageUrls.definitionsContentBricks
    );
  });

  test("Definitions/Sub Content bricks", async ({ page }) => {
    await definitionsMenu(
      page,
      overviewMenuButtons.definitionsSubContentBricksMenuButton,
      overviewHeaders.definitionsSubContentBricksHeader,
      
      pageUrls.definitionsSubContentBricks
    );
  });

  test("Definitions/Domain Data Models", async ({ page }) => {
    await definitionsMenu(
      page,
      overviewMenuButtons.definitionsDomainDataModelsMenuButton,
      overviewHeaders.definitionsDomainDataModelsHeader,
      
      pageUrls.definitionsDomainDataModels
    );
  });

  test("Definitions/DGL", async ({ page }) => {
    await definitionsMenu(
      page,
      overviewMenuButtons.definitionsDGLMenuButton,
     overviewHeaders.definitionsDGLHeader,
      
      pageUrls.definitionsDGL
    );
  });

  test("Definitions/PBBs", async ({ page }) => {
    await definitionsMenu(
      page,
      overviewMenuButtons.definitionsPBBsMenuButton,
      overviewHeaders.definitionsPBBsHeader,
      
      pageUrls.definitionsPBBs
    );
  });

  test("Definitions/PBBs queries", async ({ page }) => {
    await definitionsMenu(
      page,
      overviewMenuButtons.definitionsPBBsQueriesMenuButton,
      overviewHeaders.definitionsPBBsQueriesHeader,
      
      pageUrls.definitionsPBBsQueries
    );
  });

  test("Definitions/GDM", async ({ page }) => {
    await definitionsMenu(
      page,
      overviewMenuButtons.definitionsGDMMenuButton,
      overviewHeaders.definitionsGDMHeader,
      
      pageUrls.definitionsGDM
    );
  });

  
  
  
  
  
  
  // Administration Overviews tests

  test("Administration - Capabilities", async ({ page }) => {
    await checkAdministrationTabs(
      page,
      overviewMenuButtons.administrationCapabilitiesMenuButton,
      overviewHeaders.administrationCapabilitiesHeader,
      
      pageUrls.administrationCapabilities
    );
  });

  test("Administration - domains", async ({ page }) => {
    await checkAdministrationTabs(
      page,
     overviewMenuButtons.administrationDomainsMenuButton,
      overviewHeaders.administrationDomainsHeader,
      
      pageUrls.administrationDomains
    );
  });

  test("Administration - Formatting", async ({ page }) => {
    await checkAdministrationTabs(
      page,
      overviewMenuButtons.administrationFormattingMenuButton,
      overviewHeaders.administrationFormattingHeader,
      
      pageUrls.administrationFormatting
    );
  });

  test("Administration - Lists", async ({ page }) => {
    await checkAdministrationTabs(
      page,
      overviewMenuButtons.administrationListsMenuButton,
     overviewHeaders.administrationListsHeader,
      
      pageUrls.administrationLists
    );
  });

  test("Administration - Qualifications", async ({ page }) => {
    await checkAdministrationTabs(
      page,
      overviewMenuButtons.administrationQualificationsMenuButton,
      overviewHeaders.administrationQualificationsHeader,
      
      pageUrls.administrationQualifications
    );
  });

  test("Administration - Tags and search ids", async ({ page }) => {
    await checkAdministrationTabs(
      page,
      overviewMenuButtons.administrationTagsAndSearchIdsMenuButton,
      overviewHeaders.administrationTagsAndSearchIdsHeader,
      
      pageUrls.administrationTagsAndSearchIds
    );
  });

  test("Administration - Translations", async ({ page }) => {
    await checkAdministrationTabs(
      page,
      overviewMenuButtons.administrationTranslationsMenuButton,
      overviewHeaders.administrationTranslationsHeader,
      
      pageUrls.administrationTranslations
    );
  });

  test("Administration - Unit types", async ({ page }) => {
    await checkAdministrationTabs(
      page,
      overviewMenuButtons.administrationUnitTypesMenuButton,
      overviewHeaders.administrationUnitTypesHeader,
      
      pageUrls.administrationUnitTypes
    );
  });

  test("Administration - Units", async ({ page }) => {
    await checkAdministrationTabs(
      page,
      overviewMenuButtons.administrationUnitsMenuButton,
      overviewHeaders.administrationUnitsHeader,
      
      pageUrls.administrationUnits
    );
  });

  test("Administration - Usage Types", async ({ page }) => {
    await checkAdministrationTabs(
      page,
      overviewMenuButtons.administrationUsageTypesMenuButton,
      overviewHeaders.administrationUsageTypesHeader,
      
      pageUrls.administrationUsageTypes
    );
  });

  
  
  
  
  
  // User Administration overviews

  test("USER Administration - Groups", async ({ page }) => {
    await checkUserAdministrationSection(
      page,
      overviewMenuButtons.userAdministrationGroupsMenuButton,
      overviewHeaders.userAdministrationGroupsHeader,
      
      pageUrls.userAdministrationGroups
    );
  });

  test("USER Administration - Organigram", async ({ page }) => {
    await checkUserAdministrationSection(
      page,
      overviewMenuButtons.userAdministrationOrganigramMenuButton,
      overviewHeaders.userAdministrationOrganigramHeader,
      
      pageUrls.userAdministrationOrganigram
    );
  });

  test("USER Administration - roles", async ({ page }) => {
    await checkUserAdministrationSection(
      page,
     overviewMenuButtons.userAdministrationRolesMenuButton,
      overviewHeaders.userAdministrationRolesHeader,
      
      pageUrls.userAdministrationRoles
    );
  });

  test("USER Administration - Users", async ({ page }) => {
    await checkUserAdministrationSection(
      page,
      overviewMenuButtons.userAdministrationUsersMenuButton,
     overviewHeaders.userAdministrationUsersHeader,
      
      pageUrls.userAdministrationUsers
    );
  });
});
