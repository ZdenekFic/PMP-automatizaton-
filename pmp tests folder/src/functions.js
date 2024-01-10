
const { test, expect, browser } = require("@playwright/test");
const constants = require("./constants.js");

//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;



// Constants use

const overviewMenuButtons = constants.overviewMenuButtons;





//FUNCTIONS FOR OVERVIEW CHECKS
//main menu Tasks, active projects, draft projects, DMI
async function mainMenuTabs(page, menuText, testTitle, expectedURL) {
  let titleHeader;
  //Click on a specific tab  
  await page
      .getByRole("navigation")
      .locator("span")
      .filter({ hasText: menuText })
      .click();

  if(menuText === overviewMenuButtons.reportsMenuButton) {
    // Assertions if title header is visible
    titleHeader = await page.locator("//span[@class='definition-padding-right']");
     // Check the URL
     await expect(titleHeader).toBeVisible();
     await expect(page).toHaveURL(expectedURL);
  }   else {
    // Assertions if title header is visible
    titleHeader = await page
      .getByRole("main")
      .getByText(testTitle, { exact: true });
    // Check the URL
    await expect(titleHeader).toBeVisible();
    await expect(page).toHaveURL(expectedURL);
  }}
  
 
 
 
 
 
 
  //Function for Definition tab menu (DDM,PBB,PBB queries,GDM, CB, Sub CBs,GDL )
  const definitionsMenu = async (page, menuText, testTitle, url) => {
    // Clicking on a button Definitions in left panel menu for opening another minimenu
    await page.getByRole("button", { name: "Definitions" }).click();
  
    // Clicking on a button based on the menuText
    if (menuText === overviewMenuButtons.definitionsDomainDataModelsMenuButton) {
      await page
        .getByRole("navigation")
        .locator("span")
        .filter({ hasText: menuText })
        .click();
    } else if (menuText === overviewMenuButtons.definitionsDGLMenuButton) {
      await page
        .getByRole("navigation")
        .locator("span")
        .filter({ hasText: menuText })
        .click();
    } else if (menuText === overviewMenuButtons.definitionsPBBsMenuButton) {
      await page.locator("span").filter({ hasText: menuText }).click();
    } else if (menuText === overviewMenuButtons.definitionsPBBsQueriesMenuButton) {
      await page.getByText(menuText).click();
    } else if (menuText === overviewMenuButtons.definitionsGDMMenuButton) {
      await page.locator("span").filter({ hasText: menuText }).click();
    } else if (menuText === overviewMenuButtons.definitionsContentBricksMenuButton) {
      await page.locator("span").filter({ hasText: menuText }).first().click();
    } else if (menuText === overviewMenuButtons.definitionsSubContentBricksMenuButton) {
      await page.locator("span").filter({ hasText: menuText }).click();
      
    }
  
    // Assertions if title header is visible
    const titleHeader = await page
      .getByRole("main")
      .getByText(testTitle, { exact: true });
      
   
      await expect(titleHeader).toBeVisible();
  
    // Check the URL
    const expectedURL = url;
    await expect(page).toHaveURL(expectedURL);
  };
  
 
 
 
  async function checkAdministrationTabs(page,menuText, testTitle, url) {
    // Clicking on a button Definitions in left panel menu for opening another minimenu
    await page
      .getByRole("button", { name: "Administration", exact: true })
      .click();
  
    // Clicking on a button based on the menuText   
    if (menuText === overviewMenuButtons.administrationFormattingMenuButton) {
      await page
        .getByRole("navigation")
        .locator("span")
        .filter({ hasText: menuText })
        .click();
    } 
    
    else if (menuText === overviewMenuButtons.administrationListsMenuButton) {
      await page
        .getByRole("navigation")
        .locator("span")
        .filter({ hasText: menuText })
        .click();
    } 
    
    else if (menuText === overviewMenuButtons.administrationQualificationsMenuButton) {
      await page.getByText(menuText).click();
    } 
    
    else if (menuText === overviewMenuButtons.administrationTagsAndSearchIdsMenuButton) {
      await page
        .locator("span")
        .filter({ hasText: menuText })
        .click();
    } 
    
    else if (menuText === overviewMenuButtons.administrationTranslationsMenuButton) {
      await page.locator("span").filter({ hasText: menuText }).click();
      //Assertions if title header is visible. Translations have different overview.
      const titleHeader = await page.getByRole("tab", { name: testTitle });
      await expect(titleHeader).toBeVisible();
    } 
    
    else if (menuText === overviewMenuButtons.administrationUnitsMenuButton) {
      await page
        .getByRole("navigation")
        .locator("span")
        .filter({ hasText: menuText })
        .click();
    } 
    
    else if (menuText === overviewMenuButtons.administrationUsageTypesMenuButton) {
      await page.getByText(menuText).click();
    } 
    
    else {
      await page.locator("span").filter({ hasText: menuText }).click();
    }
  
    //Assertions if title header is visible
    const titleHeader = await page
      .getByRole("main")
      .getByText(testTitle, { exact: true });
    await expect(titleHeader).toBeVisible();
  
    const expectedURL = url;
    await expect(page).toHaveURL(expectedURL);
  }
  
  

  
  // function for user admnistrations such as groups, roles, users,
  async function checkUserAdministrationSection(page, menuText, testTitle,  url) {
    // Clicking on the button
    await page.getByRole("button", { name: "User Administration" }).click();
  
    if (menuText === overviewMenuButtons.userAdministrationOrganigramMenuButton) {
      await page
        .getByRole("navigation")
        .locator("span")
        .filter({ hasText: menuText })
        .click();
    } else {
      await page
        .getByRole("navigation")
        .locator("span")
        .filter({ hasText: menuText })
        .click();
    }
  
    // Verifying the title header
    const titleHeader = await page
      .getByRole("main")
      .getByText(testTitle, { exact: true });
    await expect(titleHeader).toBeVisible();
  
    // Verifying the URL
    await expect(page).toHaveURL(url);
  }





  module.exports = {
    
    mainMenuTabs,
    checkUserAdministrationSection,
    definitionsMenu,
    checkAdministrationTabs,
    
    
  }; // Exports function for using in another files
  