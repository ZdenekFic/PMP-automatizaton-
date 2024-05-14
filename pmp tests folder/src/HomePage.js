const { testInfo, expect } = require("@playwright/test");
const { baseURL, timeOuts, mainDomain } = require("./constants");

exports.HomePage = class HomePage {
  constructor(page, mainDomain) {
    this.page = page;
    this.mainDomain = mainDomain;

    // switch domain test objects
    this.taskButton = page
      .getByRole("navigation")
      .locator("span")
      .filter({ hasText: "Tasks" });

    this.inputDomains = page.locator("div.v-select__selection");
    this.dropDownDomainsMenu = "div[role='listbox']";
    this.changedDomain = `//div[contains(text(),'${mainDomain}')]`;
    this.checkedDomain = page.locator(
      `//div[@class='v-select__selection v-select__selection--comma'][normalize-space()='${mainDomain}']`
    );

    // searchBar function
    this.searchBarInput = page.locator(
      "//input[@ui-test-data='top-bar-search']"
    );
    this.searchedBoxMenu = 'div[role="listbox"][data-v-b559d94e]';
    this.firstItemInBox = 'div[role="menuitem"]';

    //Menu hiding
    this.buttonOpenLeftMenu = page
      .getByRole("navigation")
      .locator("button")
      .nth(1);

    this.buttonHideLeftMenu = page
      .getByRole("link", { name: "PMP" })
      .getByRole("button");
  }

  async switchDomains() {
    //click on e.g. task to get to Overview to get enabled menu dropdown for domains
    await this.taskButton.click();
    await this.page.waitForTimeout(timeOuts.timeXL);
    //click on input to get dropdown with domains
    await this.inputDomains.nth(0).click();
    await this.page.waitForSelector(this.dropDownDomainsMenu);

    //Choose a marketing domain
    await this.page.locator(this.changedDomain).click();
  }

  async switchDomainsAssert() {
    if (await this.checkedDomain.isVisible()) {
      await this.page.waitForTimeout(timeOuts.timeM);
    }
  }

  async searchBar(searchedText) {
    //Click on a searchbar
    await this.searchBarInput.fill(searchedText);
    await this.page.waitForTimeout(timeOuts.timeXL);

    console.log(
      "Current URL before redirecting to item from box is " + this.page.url()
    );

    //wait for menu with results
    await this.page.waitForSelector(this.searchedBoxMenu);

    await this.page
      .locator(this.searchedBoxMenu)
      .locator(this.firstItemInBox)
      .nth(1)
      .click();

    await this.page.waitForTimeout(timeOuts.timeXL);

    // Verify that the current URL is not equal to baseURL
    const currentURL = this.page.url();
    await expect(currentURL).not.toBe(baseURL);

    await this.page.waitForTimeout(timeOuts.timeXL);
    console.log(
      "Current URL after clicking on item from box" + this.page.url()
    );

    await this.page.goto(baseURL);
    await this.page.waitForTimeout(timeOuts.timeXL);
  }

  async hideMenu() {
    //clicking on button for hiding left menu
    await this.buttonHideLeftMenu.click();

    //Assertions left menu is realla hidden
    await expect(this.buttonOpenLeftMenu).toBeVisible();
  }

  async openMenu() {
    // hide menu and check it
    await this.hideMenu();

    // open menu
    await this.buttonOpenLeftMenu.click();

    //Assertions left menu is realla hidden
    await expect(this.buttonHideLeftMenu).toBeVisible();
  }
};
