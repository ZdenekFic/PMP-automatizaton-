const { testInfo, expect } = require("@playwright/test");
const { baseURL } = require("./constants");



exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    
    
    
    this.testInfo = testInfo;
    this.taskButton = page.getByRole("navigation").locator("span").filter({ hasText: "Tasks" });
    this.inputDomains = "(//div[@class='v-select__slot'])[1]";
    this.dropDownDomainsMenu = "//div[@class='v-menu__content theme--light v-menu__content--fixed menuable__content__active']";
    this.changedDomain = "//div[contains(text(),'Marketing')]";
    this.checkedDomain = "//div[@class='v-select__selection v-select__selection--comma'][normalize-space()='Marketing']";
    this.searchBarInput = page.locator("//input[@ui-test-data='top-bar-search']");

    this.firstItemInBox = "//body/div[1]/div[2]/div/div[2]";
    this.buttonHelp = page.frameLocator('[data-testid="launcher-frame"]').locator('path');
    this.menuHelp = page.frameLocator('[data-testid="widget-frame"]').getByTestId('widget-body-home').locator('div').filter({ hasText: 'Got questions?SearchSuggested articlesNothing found.Contact us' }).first();
    this.closeHelp = page.frameLocator('[data-testid="widget-frame"]').getByTestId('header-close');

    



    
  }

  
  
  async switchDomains() {
    //click on e.g. task to get to Overview to get enabled menu dropdown for domains
    await this.taskButton.click();
    await this.page.waitForTimeout(3000);
    //click on input to get dropdown with domains
    await this.page.locator(this.inputDomains).click();
    await this.page.waitForSelector(this.dropDownDomainsMenu);

    //Choose a marketing domain
    await this.page.locator(this.changedDomain).click();
  }

  async switchDomainsAssert() {
    const dropdownElement = await this.page.locator(this.checkedDomain);
    //await expect(dropdownElement).toBeVisible();
    if (await dropdownElement.isVisible()) {
      await this.page.waitForTimeout(1000);
      await this.page.screenshot({
        path: "screenshots/screenshot.png",
        fullPage: true,
      });

      // Prints where screenshot is saved
      console.log("Screenshot was saved into folder: screenshots");
    }
  }

  async searchBar(searchedText) {
    //Click on a searchbar
    await this.searchBarInput.fill(searchedText);
    await this.page.waitForTimeout(3000);

    const firstListItem = await this.page.locator(this.firstItemInBox);
    console.log(this.page.url())

    await firstListItem.click();

    // Wait for navigation to complete
    await this.page.waitForNavigation();
    
    // Verify that the current URL is not equal to baseURL
    const currentURL = this.page.url();
    expect(currentURL).not.toBe(baseURL);

    await this.page.waitForTimeout(3000);
    console.log(this.page.url())
    await this.page.screenshot({
        path: "screenshots/screenshot1.png",
        fullPage: true,
      });

    await this.page.goto(baseURL);
    await this.page.waitForTimeout(2000);
  }


  async helpDesk() {

    await this.buttonHelp.click();
    await this.page.waitForTimeout(3400);

    const element = await this.menuHelp;
    
    await expect(element).toBeVisible();

    //close modal
    await this.closeHelp.click();


  }
};
