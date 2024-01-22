const { testInfo, expect } = require("@playwright/test");
const { baseURL } = require("./constants.js");
const overviewMenuButtons = require("./constants.js").overviewMenuButtons;


exports.Overviews = class Overviews {
  constructor(page,menuText, testTitle, expectedURL) {
    this.page = page;
    
    this.menuText = menuText;
    this.testTitle = testTitle;
    this.expectedURL = expectedURL;
    
    

    //main tabs
    this.mainMenuTabsButtons = page.getByRole("navigation").locator("span").filter({ hasText: menuText });
    this.reportsHeader = page.locator("//span[@class='definition-padding-right']");
    this.mainMenuTabsHeader = page.getByRole("main").getByText(testTitle, { exact: true });


    //definitons tabs
    this.definitionsTabsButtons = page.getByRole("button", { name: "Definitions" });
    this.definitionsDomainDataModelsMenuButtonPath = page.getByRole("navigation").locator("span").filter({ hasText: menuText });
    this.definitionsDGLMenuButtonPath = page.getByRole("navigation").locator("span").filter({ hasText: menuText });
    this.definitionsPBBsMenuButtonPath = page.locator("span").filter({ hasText: menuText });
    this.definitionsPBBsQueriesMenuButtonPath = page.getByText(menuText);
    this.definitionsGDMMenuButtonPath = page.locator("span").filter({ hasText: menuText });
    this.definitionsContentBricksMenuButtonPath = page.locator("span").filter({ hasText: menuText }).first();
    this.definitionsSubContentBricksMenuButtonPath = page.locator("span").filter({ hasText: menuText });
    this.definitionsTitleHeader = page.getByRole("main").getByText(testTitle, { exact: true });

    //administration tabs
    this.mainAdministrationTab = page.getByRole("button", { name: "Administration", exact: true });
    this.administrationFormattingMenuButtonPath = page.getByRole("navigation").locator("span").filter({ hasText: menuText });
    this.administrationListsMenuButtonPath = page.getByRole("navigation").locator("span").filter({ hasText: menuText });
    this.administrationQualificationsMenuButtonPath = page.getByText(menuText);
    this.administrationTagsAndSearchIdsMenuButtonPath = page.locator("span").filter({ hasText: menuText });
    this.administrationTranslationsMenuButtonPath = page.locator("span").filter({ hasText: menuText });
    this.administrationUnitsMenuButtonPath = page.getByRole("navigation").locator("span").filter({ hasText: menuText });
    this.administrationUsageTypesMenuButtonPath = page.getByText(menuText);
    this.administrationsPath = page.locator("span").filter({ hasText: menuText });
    this.expectTranslation = page.getByRole("tab", { name: testTitle });
    this.expectUnited = page.getByRole("main").getByText(testTitle, { exact: true });


    //User administration tabs
    this.mainUserAdministrationTabs = page.getByRole("button", { name: "User Administration" });
    this.userAdministrationOrganigramMenuButtonPath = page.getByRole("navigation").locator("span").filter({ hasText: menuText });
    this.userAdministrationTabsPathUnited = page.getByRole("navigation").locator("span").filter({ hasText: menuText });
    this.userAdministrationTabsTitleHeader = page.getByRole("main").getByText(testTitle, { exact: true });



    
  }

  async mainMenuTabs(menuText,expectedURL) {
    let titleHeader;
    await this.mainMenuTabsButtons.click();
    await this.page.waitForTimeout(1000);

    //only reports got different selector so if is reason
    if(menuText === overviewMenuButtons.reportsMenuButton) {
      // Assertions if title header for reports is visible
      titleHeader = await this.reportsHeader;
       // Check the URL
       await expect(titleHeader).toBeVisible();
       await expect(this.page).toHaveURL(expectedURL);
    } else {
      // Assertions if title header is visible
      titleHeader = await this.mainMenuTabsHeader;
      // Check the URL
      await expect(titleHeader).toBeVisible();
      await expect(this.page).toHaveURL(expectedURL);
    }};


  async definitionsMenu(menuText,expectedURL) {
    // Clicking on a button Definitions in left panel menu for opening another minimenu
    await this.definitionsTabsButtons.click();
    await this.page.waitForTimeout(1000);

    // Clicking on a button based on the menuText
    if (menuText === overviewMenuButtons.definitionsDomainDataModelsMenuButton) {
      await 
        this.definitionsDomainDataModelsMenuButtonPath.click();
        await this.page.waitForTimeout(1000);
    } else if (menuText === overviewMenuButtons.definitionsDGLMenuButton) {
      await 
        this.definitionsDGLMenuButtonPath.click();
        await this.page.waitForTimeout(1000);
    } else if (menuText === overviewMenuButtons.definitionsPBBsMenuButton) {
      await this.definitionsPBBsMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
    } else if (menuText === overviewMenuButtons.definitionsPBBsQueriesMenuButton) {
      await this.definitionsPBBsQueriesMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
    } else if (menuText === overviewMenuButtons.definitionsGDMMenuButton) {
      await this.definitionsGDMMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
    } else if (menuText === overviewMenuButtons.definitionsContentBricksMenuButton) {
      await this.definitionsContentBricksMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
    } else if (menuText === overviewMenuButtons.definitionsSubContentBricksMenuButton) {
      await this.definitionsSubContentBricksMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
      
    }

    // Assertions if title header is visible
    const titleHeader = await this.definitionsTitleHeader;
      
   
      await expect(titleHeader).toBeVisible();

      // Check the URL
    
    await expect(this.page).toHaveURL(expectedURL);

  }


  async administrationsTabs(menuText,expectedURL) {
    // Clicking on a button Definitions in left panel menu for opening another minimenu
    await this.mainAdministrationTab.click();
    await this.page.waitForTimeout(1000);
  
    // Clicking on a button based on the menuText   
    if (menuText === overviewMenuButtons.administrationFormattingMenuButton) {
      await this.administrationFormattingMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
    } 
    else if (menuText === overviewMenuButtons.administrationListsMenuButton) {
      await this.administrationFormattingMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
    } 
    else if (menuText === overviewMenuButtons.administrationQualificationsMenuButton) {
      await this.administrationQualificationsMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
    } 
    else if (menuText === overviewMenuButtons.administrationTagsAndSearchIdsMenuButton) {
      await this.administrationTagsAndSearchIdsMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
    } 
    else if (menuText === overviewMenuButtons.administrationTranslationsMenuButton) {
      await this.administrationTranslationsMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
      //Assertions if title header is visible. Translations have different overview.
      const titleHeader = await this.expectTranslation;
      await expect(titleHeader).toBeVisible();
    } 
    else if (menuText === overviewMenuButtons.administrationUnitsMenuButton) {
      await this.administrationUnitsMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
    } 

    else if (menuText === overviewMenuButtons.administrationUsageTypesMenuButton) {
      await this.administrationUsageTypesMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
    } 
    else {
      await this.administrationsPath.click();
      await this.page.waitForTimeout(1000);
    }
  
    //Assertions if title header is visible
    const titleHeader = await this.expectUnited;
    await expect(titleHeader).toBeVisible();
  
    
    await expect(this.page).toHaveURL(expectedURL);
  
  
  }

  async userAdministrationTabs(menuText,expectedURL) {

    // Clicking on the button
    await this.mainUserAdministrationTabs.click();
    await this.page.waitForTimeout(1000);

    if (menuText === overviewMenuButtons.userAdministrationOrganigramMenuButton) {
      await this.userAdministrationOrganigramMenuButtonPath.click();
      await this.page.waitForTimeout(1000);
  }
    else {
      await this.userAdministrationTabsPathUnited.click();
      await this.page.waitForTimeout(1000);
  }

      // Verifying the title header
      const titleHeader = await this.userAdministrationTabsTitleHeader;
    await expect(titleHeader).toBeVisible();

    // Verifying the URL
    await expect(this.page).toHaveURL(expectedURL);


  

  
  
  
  
}
  
  
};
