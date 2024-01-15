const { baseURL } = require("./constants");

exports.ContentBricks = class ContentBricks {
  constructor(page) {
    this.page = page;
    this.definitionsTab = page.getByRole('button', { name: 'Definitions' });
    this.contentBricksTab = page.locator('span').filter({ hasText: 'Content Bricks' }).first();
    this.addButton = page.getByRole('link', { name: 'Add' });
    this.generalFormName = page.getByLabel('Name', { exact: true });
    this.generalFormIdentifier = page.getByLabel('Identifier', { exact: true });
    this.generalFormUsageTypesRedArrow = page.locator('.v-input__append-outer > .v-btn').first();
    this.firstObjectUsageTypes = page.locator("//tbody/tr[1]/td[1]/div[1]/i[1]");
    this.buttonUpdateUsageTypes = page.locator("//span[normalize-space()='Update Usage types']");


   



}

async enterToCB() {

    //click on Definitons tab
    await this.definitionsTab.click();

    //click on Definitions/Content Bricks TAB
    await this.contentBricksTab.click();

    //click on ADD button
    await this.addButton.click()

}

async formCB_General(name) {

    //click and fill name
    await this.generalFormName.fill(name);

    //click on identifier to get automaticaly identifier
    await this.generalFormIdentifier.click();

    //add usage types -> opening modal window with usage types 
    await this.generalFormUsageTypesRedArrow.click();
    await this.page.waitForTimeout(1000);
    await this.firstObjectUsageTypes.click();
    await this.buttonUpdateUsageTypes.click();



}


};