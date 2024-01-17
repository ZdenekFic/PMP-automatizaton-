const { cbName } = require("./constants");
const { expect } = require("@playwright/test");



exports.DDM = class DDM {
    constructor(page,ddmName) {
      this.page = page;
      this.ddmName = ddmName;
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
    this.defaultDMITagsThirdObject = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[3]/td[1]");
    this.defaultDMITagsFourthObject = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[4]/td[1]");
    this.defaultDMITagsFifthObject = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[5]/td[1]");
    this.defaultDMITagsSixthObject = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[6]/td[1]");
    this.defaultDMITagsConfirmButton = page.locator("//span[normalize-space()='Update Default DMI Tags']");

    // add owner
    this.ownerRedArrowButton = page.locator("//button[@class='add-reference-textfield-append v-btn v-btn--flat v-btn--icon v-btn--round v-btn--tile theme--light elevation-2 v-size--default error--text']//i[@class='v-icon notranslate mdi mdi-upload theme--light']");
    this.ownerFirstObject = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//tbody/tr[1]/td[1]");
    this.ownerConfirmButton = page.locator("//span[normalize-space()='Update Owner']");

    //save general form
    this.saveGreenButton = page.locator("//i[@class='v-icon notranslate v-icon--dense mdi mdi-content-save theme--light success--text']");
    
    //Data model objects
    this.dataModelTab =  page.locator("//div[normalize-space()='Data model']");

    //delete ddm draft
    this.deleteDraftButtton = page.locator("//i[@class='v-icon notranslate mdi mdi-delete theme--light']");
    this.modalDeleteButton = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent']//span[normalize-space()='Delete']");


    }

async enterToDDM() {

    // go to definition
    await this.definitionsTab.click();

    // click on domain models
    await this.domainModelsTab.click();
    await this.page.waitForTimeout(1000);

    

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
    await this.defaultDMITagsThirdObject.click();
    await this.defaultDMITagsFourthObject.click();
    await this.defaultDMITagsFifthObject.click();
    await this.defaultDMITagsSixthObject.click();
    await this.defaultDMITagsConfirmButton.click();

    //add owner
    await this.ownerRedArrowButton.click();
    await this.ownerFirstObject.click();
    await this.ownerConfirmButton.click();


    //check if data model tab is disabled before saving
    await expect(this.dataModelTab).toHaveClass("v-tab v-tab--disabled");

    //save general form
    await this.saveGreenButton.click();

    //expect if datamodel tab is enabled after save
    await expect(this.dataModelTab).toHaveClass("v-tab v-tab--active");

}

async checkAndDelete() {

    await this.enterToDDM();
    
    let elements = await this.page.$$(`body >> text=${this.ddmName}`);

    for (let i = 0; i < elements.length; i++) {
        const elementHandle = elements[i];
        const elementText = await elementHandle.innerText();
        console.log(elementText);

        if (elementText === this.ddmName) {
            await this.page.waitForTimeout(1000);
            await elementHandle.click();
            await this.deleteDraftButtton.click();
            await this.modalDeleteButton.click();
            await this.page.waitForTimeout(2000);

            // Fetch the latest elements after the deletion
            elements = await this.page.$$(`body >> text=${this.ddmName}`);
            await this.page.waitForTimeout(2000);

            // Reset the index to recheck the elements
            i = -1;
       }
        
      }
}

};