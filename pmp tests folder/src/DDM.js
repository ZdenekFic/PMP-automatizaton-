const { cbName } = require("./constants");



exports.DDM = class DDM {
    constructor(page) {
      this.page = page;
      this.definitionsTab = page.getByRole('button', { name: 'Definitions' });
      this.domainModelsTab = page.getByRole('navigation').locator('span').filter({ hasText: 'Domain Models' });
      this.domainModelsAddButton = page.getByRole('link', { name: 'Add' });

      //general Form objects
      this.generalFormName = page.getByLabel('Name');
      this.generalFormDomainsRedArrow = page.locator('.py-0 > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon > .v-icon');
      this.domainKWB = page.locator("//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//div[@class='v-list-item__title'][normalize-space()='KWB Projects']");
      this.domainMarketing = page.locator("//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//div[@class='v-list-item__title'][normalize-space()='Marketing']");
      this.domainPlayground = page.locator("//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//div[@class='v-list-item__title'][normalize-space()='Playground']");
      this.domainEcos = page.locator("//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//div[@class='v-list-item__title'][normalize-space()='ECOS']");

      // Tags objects
    this.generalFormTagsRedArrow = page.locator("(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[1]");
    this.firstObjectInTableTags = page.locator("//div[@class='v-card__text']//tbody/tr[1]/td[1]");
    this.secondObjectInTableTags = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[3]/td[1]");
    this.fifthObjectUsageInTableTags = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[6]/td[1]");
    this.buttonUpdateTags = page.locator("//span[normalize-space()='Update Tags']");

    //default DMI tags
    this.defaultDMITags = page.locator("(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[2]");
    this.defaultDMITagsFirstObject = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[1]/td[1]");
    this.defaultDMITagsSecondObject = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[2]/td[1]");




    }

async enterToDDM() {

    // go to definition
    await this.definitionsTab.click();

    // click on domain models
    await this.domainModelsTab.click();

    

}

async generalForm(name) {

    // click on ADD button 
    await this.domainModelsAddButton.click();
    await this.page.waitForTimeout(1000);
    // fill the name
    await this.generalFormName.fill(name);

    //click on dropdown for domains
    await this.generalFormDomainsRedArrow.click();
    await this.page.waitForTimeout(1000);
    await this.domainKWB.click();
    await this.domainEcos.click();
    await this.domainMarketing.click();
    await this.domainPlayground.click();
    await this.page.click('body');

    // add tags 
    await this.generalFormTagsRedArrow.click();
    await this.page.waitForTimeout(1000);
    await this.firstObjectInTableTags.click();
    await this.secondObjectInTableTags.click();
    await this.fifthObjectUsageInTableTags.click();
    await this.buttonUpdateTags.click();

    // add default DMI tags
    await this.defaultDMITags.click();
    await this.defaultDMITagsFirstObject.click();
    await this.defaultDMITagsSecondObject.click();


}






};