// -------------------------------------------------------------------------------------
// Class Definition: HomePage
// -------------------------------------------------------------------------------------
exports.HomePage = class HomePage {
  constructor(page, mainDomain) {
    this.page = page;
    this.mainDomain = mainDomain;

    // --------------------- Navigation and Domain Selectors ---------------------
    this.taskButton = '[ui-test-data="nav-tasks"]';
    this.inputDomains = 'div[role="button"][aria-haspopup="listbox"]';
    this.inputDomainsArea = ".v-navigation-drawer__content";
    this.dropDownDomainsMenu = "div[role='listbox']";
    this.changedDomain = `text=${mainDomain}`;
    this.checkedDomain = "v-list-item.primary--text.v-list-item--active";
  }

  // --------------------- Switch Domains ---------------------
  async switchDomains() {
    // Click on the task button to navigate to the Overview and enable the dropdown for domains
    await this.page.locator(this.taskButton).click();

    // Click on the domain input area to open the dropdown with available domains
    await this.page
      .locator(this.inputDomainsArea)
      .locator(this.inputDomains)
      .click();
    await this.page.waitForSelector(this.dropDownDomainsMenu);

    // Choose the specified domain
    await this.page.click(this.changedDomain);
  }
};
