
const { expect } = require("@playwright/test");


exports.DGL = class DGL {
    constructor(page,dropdownElement,mainName) {
      this.page = page;
      this.mainName = mainName;
      this.definitionsTab = page.getByRole('button', { name: 'Definitions' });
      this.designGuidelinesTab = page.getByRole('navigation').locator('span').filter({ hasText: 'Design Guidelines' });
      this.designGuidelinesAddButton = page.getByRole('link', { name: 'Add' });

      this.generalFormName = page.getByLabel('Name', { exact: true });
      this.generalFormIdentifier = page.getByLabel('Identifier', { exact: true });

      // Uasge types objects
      this.generalFormUsageTypesRedArrow = page.locator('.v-input__append-outer > .v-btn').first();
      this.firstObjectInTable = page.locator("//tbody/tr[1]/td[1]/div[1]/i[1]");
      this.secondObjectInTable = page.locator("//tbody/tr[2]/td[1]/div[1]/i[1]");
      this.fifthObjectUsageInTable = page.locator("//tbody/tr[5]/td[1]/div[1]/i[1]");
      this.buttonUpdateUsageTypes = page.locator("//span[normalize-space()='Update Usage types']");

        // Tags objects
      this.generalFormTagsRedArrow = page.locator("(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[2]");
      this.firstObjectInTableTags = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[2]/td[1]");
      this.secondObjectInTableTags = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[3]/td[1]");
      this.fifthObjectUsageInTableTags = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[6]/td[1]");
      this.buttonUpdateTags = page.locator("//span[normalize-space()='Update Tags']");

      // Search identifiers
    this.generalFormSearchIdentifierRedArrow = page.locator(".v-card__text > div:nth-child(3) > .pa-0 > div > .v-input > .v-input__append-outer > .v-btn");
    this.firstOBjectInTableSearchIdentifiers = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[1]/td[1]");
    this.secondObjectInTableSearchIdentifiers = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[2]/td[1]");
    this.fifthOBjectInTableSearchIdentifiers = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[5]/td[1]");
    this.buttonUpdateSearchIdentifiers = page.locator("//span[normalize-space()='Update Search identifiers']");

    // input for text to describe CB 
    this.descriptionCB = page.locator("//div[@label='Description']//div[@class='ql-editor ql-blank']");

    // Fields objects
    this.addFieldButton = page.locator("(//button[@class='mt-3 v-btn theme--light elevation-2 v-size--default'])[1]");
    this.addFiledButtonSecondary = page.getByRole('button', { name: 'Field', exact: true });
    this.fieldNameInput = page.locator("(//div[@class='col col-3'])[1] >> text='Name'");
    this.fieldIdentifier = page.locator("//div[@class='col col-3']//div[@class='v-input theme--light v-text-field v-text-field--is-booted']//input");
    this.fieldDataTypeButton = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']//div[@class='v-select__slot']");
    this.elementDropdown = page.locator(`.v-list-item__title:has-text('${dropdownElement}')`);
    this.switchIsMandatory = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']//div[@class='v-input--selection-controls__ripple']");
    this.fieldAddButton = page.locator("//button[@class='error v-btn v-btn--flat v-btn--text theme--light v-size--default']//span[@class='v-btn__content'][normalize-space()='Add']");

    //value fields
    this.addValueFieldButton = page.getByRole('button', { name: 'Value Field' });
    
    

    //draft, active, suspended combobox
    this.comboboxCBstate = page.getByRole('combobox').nth(1);
    this.stateDraft = page.locator(" //div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//span[@class='status-chip-text'][normalize-space()='Draft']");
    this.saveCBbutton = page.locator("//div[@class='detail-tab-menu-header-container']//button[2]")


    // assertions objects
    this.areaOfCbs = page.locator(`//span[@ui-test-data='overview-definitions-content-brick-grid-name']`);
    this.deleteDraftButtton = page.locator("//div[@class='entity-detail-card v-card v-sheet theme--light']//i[@class='v-icon notranslate mdi mdi-delete theme--light']");
    this.modalDeleteButton = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']//span[normalize-space()='Delete']");
    

    }




    async enterToDGL() {

        // go to definition
        await this.definitionsTab.click();
    
        // click on domain models
        await this.designGuidelinesTab.click();
        await this.page.waitForTimeout(1000);
    
        
    
    }

    async generalForm(name,text) {

        // click on ADD button 
        await this.designGuidelinesAddButton.click();
        await this.page.waitForTimeout(1000);

        //General Form
        //click and fill name
        await this.generalFormName.fill(name);

        //click on identifier to get automaticaly identifier
        await this.generalFormIdentifier.click();


        //add usage types -> opening modal window with usage types 
        await this.generalFormUsageTypesRedArrow.click();
        await this.page.waitForTimeout(1000);
        await this.firstObjectInTable.click();
        await this.secondObjectInTable.click();
        await this.fifthObjectUsageInTable.click();
        await this.buttonUpdateUsageTypes.click();

        // add tags 
        await this.generalFormTagsRedArrow.click();
        await this.page.waitForTimeout(1000);
        await this.firstObjectInTableTags.click();
        await this.secondObjectInTableTags.click();
        await this.fifthObjectUsageInTableTags.click();
        await this.buttonUpdateTags.click();

        // add search identifiers
        await this.generalFormSearchIdentifierRedArrow.click();
        await this.page.waitForTimeout(1000);
        await this.firstOBjectInTableSearchIdentifiers.click();
        await this.secondObjectInTableSearchIdentifiers.click();
        await this.fifthOBjectInTableSearchIdentifiers.click();
        await this.buttonUpdateSearchIdentifiers.click();

        // add some text to description
        await this.descriptionCB.fill(text)
            



}

async add_fields(name,valueName) {
    //add fields
    await this.addFieldButton.click();
    await this.page.waitForTimeout(1000);
    await this.addFiledButtonSecondary.click()
    await this.page.waitForTimeout(1000);
    await this.fieldNameInput.fill(name);
    await this.fieldIdentifier.click();
    await this.fieldDataTypeButton.click();
    await this.page.waitForTimeout(1000);
    await this.elementDropdown.click();
    await this.switchIsMandatory.click();
    await this.fieldAddButton.click();


    //add value fields
    await this.addFieldButton.click();
    await this.addValueFieldButton.click();
    await this.fieldNameInput.fill(valueName);
    await this.fieldIdentifier.click();
    await this.fieldDataTypeButton.click();
    await this.page.waitForTimeout(1000);
    await this.elementDropdown.click();
    
    await this.fieldAddButton.click();




}

async chooseCBState() {

    await this.comboboxCBstate.click();
    await this.stateDraft.click()
    await this.saveCBbutton.click();

}

async checkAndDelete() {
    //click on Definitons tab
    await this.definitionsTab.click();

    //click on Definitions/Content Bricks TAB
    await this.designGuidelinesTab.click();
    await this.page.waitForTimeout(4000);

    let elements = await this.page.$$(`body >> text=${this.mainName}`);

    for (let i = 0; i < elements.length; i++) {
        const elementHandle = elements[i];
        const elementText = await elementHandle.innerText();

        if (elementText === this.mainName) {
            await elementHandle.click();
            await this.deleteDraftButtton.click();
            await this.modalDeleteButton.click();
            await this.page.waitForTimeout(2000);

            // Fetch the latest elements after the deletion
            elements = await this.page.$$(`body >> text=${this.mainName}`);
            await this.page.waitForTimeout(2000);

            // Reset the index to recheck the elements
            i = -1;
       }
        
      }

}
}
