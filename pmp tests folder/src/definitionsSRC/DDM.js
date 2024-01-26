const { cbName } = require("../constants");
const { expect } = require("@playwright/test");

exports.DDM = class DDM {
  constructor(page, ddmName) {
    this.page = page;
    this.ddmName = ddmName;
    this.definitionsTab = page.getByRole("button", { name: "Definitions" });
    this.domainModelsTab = page
      .getByRole("navigation")
      .locator("span")
      .filter({ hasText: "Domain Models" });
    this.domainModelsAddButton = page.getByRole("link", { name: "Add" });

    //general Form objects
    this.generalFormName = page.getByLabel("Name");
    this.generalFormDomainsRedArrow = page.locator(
      ".py-0 > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon > .v-icon"
    );
    this.domainKWB = page.locator(
      "//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//div[@class='v-list-item__title'][normalize-space()='KWB Projects']"
    );
    this.domainMarketing = page.locator(
      "//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//div[@class='v-list-item__title'][normalize-space()='Marketing']"
    );
    this.domainPlayground = page.locator(
      "//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//div[@class='v-list-item__title'][normalize-space()='Playground']"
    );
    this.domainEcos = page.locator(
      "//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//div[@class='v-list-item__title'][normalize-space()='ECOS']"
    );

    // Tags objects
    this.generalFormTagsRedArrow = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[1]"
    );
    this.firstObjectInTableTags = page.locator(
      "//div[@class='v-card__text']//tbody/tr[1]/td[1]"
    );
    this.secondObjectInTableTags = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[3]/td[1]"
    );
    this.fifthObjectUsageInTableTags = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[6]/td[1]"
    );
    this.buttonUpdateTags = page.locator(
      "//span[normalize-space()='Update Tags']"
    );

    //default DMI tags
    this.defaultDMITags = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[2]"
    );
    this.defaultDMITagsFirstObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[1]/td[1]"
    );
    this.defaultDMITagsSecondObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[2]/td[1]"
    );
    this.defaultDMITagsThirdObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[3]/td[1]"
    );
    this.defaultDMITagsFourthObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[4]/td[1]"
    );
    this.defaultDMITagsFifthObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[5]/td[1]"
    );
    this.defaultDMITagsSixthObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//table[1]/tbody[1]/tr[6]/td[1]"
    );
    this.defaultDMITagsConfirmButton = page.locator(
      "//span[normalize-space()='Update Default DMI Tags']"
    );

    // add owner
    this.ownerRedArrowButton = page.locator(
      "//button[@class='add-reference-textfield-append v-btn v-btn--flat v-btn--icon v-btn--round v-btn--tile theme--light elevation-2 v-size--default error--text']//i[@class='v-icon notranslate mdi mdi-upload theme--light']"
    );
    this.ownerFirstObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//tbody/tr[1]/td[1]"
    );
    this.ownerConfirmButton = page.locator(
      "//span[normalize-space()='Update Owner']"
    );

    //save general form
    this.saveGreenButton = page.locator(
      "//i[@class='v-icon notranslate v-icon--dense mdi mdi-content-save theme--light success--text']"
    );
    this.ddmHasBeenCreated = page.getByText('Domain Data Model has been');

    //Data model objects
    this.dataModelTab = page.locator("//div[normalize-space()='Data model']");
    this.dataModelThreeDotsButton = page.locator(
      "(//button[@role='button'])[4]"
    );
    this.dataModelMenuObjects = page.locator(
      "//div[@class='v-list v-sheet theme--light']"
    );
    this.dataModelMenuObjectsTree = page.locator("//div[@role='tree']");

    this.dataModelMenuObjectsContainterButton = page.locator(
      "(//button[@role='button'])[5]"
    );
    this.dataModelMenuObjectsContainter = page.locator(
      "//span[@class='order-2'][normalize-space()='Container']"
    );
    this.dataModelMenuObjectsContainterName = page.locator(
      "(//div[@class='v-input__control'])[14]//input"
    );
    this.dataModelMenuObjectsContainterThreeDots = page.locator(
      "(//button[@role='button'])[5]"
    );
    this.dataModelMenuObjectsIdentifierButton = page.locator(
      "(//div[@class='row'])[16]//button[@aria-label='append icon']"
    );

    this.dataModelMenuObjectsGDMButton = page.locator(
      "(//span[@class='v-btn__content'])[24]"
    );
    this.dataModelMenuObjectsGDMConfirm = page.locator(
      "//button[@ui-test-data='add-btn']"
    );
    this.firstObjectGDMTable = page.locator("//tbody/tr[2]/td[1]");
    this.buttonNodeSelectionGDM = page.locator(
      "//div[normalize-space()='Node Selection']"
    );

    this.dataModelMenuObjectsCBButton = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-cube theme--light'])[3]"
    );
    this.dataModelMenuObjectsCBFirstObject = page.locator(
      "//div[@class='v-data-table__wrapper']//tbody/tr[1]/td[1]"
    );
    this.dataModelMenuObjectsCBConfirm = page.locator(
      "//div[@class='v-card__actions']//span[normalize-space()='Add']"
    );

    this.dataModelMenuObjectsDGLButton = page.locator(
      "//span[@class='v-btn__content']//i[@class='v-icon notranslate mdi mdi-cube-scan theme--light']"
    );
    this.dataModelMenuObjectsDGLFirstOBject = page.locator(
      "//div[@class='v-data-table__wrapper']//tbody/tr[1]/td[1]"
    );
    this.dataModelMenuObjectsDGLConfirm = page.locator(
      "//div[@class='v-card__actions']//button"
    );

    //save data model
    this.dataModelMenuObjectsSaveAll = page.locator(
      "//header[@class='v-sheet theme--light v-toolbar v-toolbar--dense v-toolbar--floating']//button[2]"
    );

    //delete ddm draft
    this.deleteDraftButtton = page.locator(
      "//i[@class='v-icon notranslate mdi mdi-delete theme--light']"
    );
    this.modalDeleteButton = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//span[normalize-space()='Delete']"
    );
  }

  async enterToDDM() {
    // go to definition
    await this.definitionsTab.click();

    // click on domain models
    await this.domainModelsTab.click();
    await this.page.waitForTimeout(1000);
  }

  async generalForm(name, containerName) {
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
    await this.page.click("body");

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
    await this.page.waitForTimeout(2000);

     //validation of success message
     const successMessage = await this.ddmHasBeenCreated.textContent();
     await expect(successMessage).toContain('Domain Data Model has been created');
 
     //assertions after save cb
     await expect(this.generalFormName).not.toBeEmpty();
     

    //expect if datamodel tab is enabled after save
    await expect(this.dataModelTab).toHaveClass("v-tab v-tab--active");

    
    
    
    
    
    // DATA MODEL TAB PART
    // click on menu "three dots button"
    await this.dataModelThreeDotsButton.click();
    await expect(this.dataModelMenuObjects).toBeVisible();
    //add container to tree
    await this.dataModelMenuObjectsContainterButton.click();
    await expect(this.dataModelMenuObjectsContainter).toBeVisible();
    //check of name for  defaultcontainer
    await expect(this.dataModelMenuObjectsContainterName).toHaveValue(
      "Container"
    );
    //delete default value
    await this.dataModelMenuObjectsContainterName.clear();
    //fill in our name
    await this.dataModelMenuObjectsContainterName.fill(containerName);
    //click to get automated identifier
    await this.dataModelMenuObjectsIdentifierButton.click();
    //click on three dots but in container
    await this.dataModelMenuObjectsContainterThreeDots.click();
    await expect(this.dataModelMenuObjects).toBeVisible();

    //click on  GDM button in minimenu
    await this.dataModelMenuObjectsGDMButton.click();
    await this.page.waitForTimeout(1000);
    // choose first object in table
    await this.firstObjectGDMTable.click();
    await this.page.waitForTimeout(1000);
    await this.buttonNodeSelectionGDM.click();
    await this.dataModelMenuObjectsGDMConfirm.click();
    // click on menu "three dots button"
    await this.dataModelThreeDotsButton.click();
    await expect(this.dataModelMenuObjects).toBeVisible();

    //add contant brick
    await this.dataModelMenuObjectsCBButton.click();
    await this.page.waitForTimeout(1000);
    await this.dataModelMenuObjectsCBFirstObject.click();
    await this.dataModelMenuObjectsCBConfirm.click();

    // lets add DGL
    await this.dataModelThreeDotsButton.click();
    await expect(this.dataModelMenuObjects).toBeVisible();
    await this.page.waitForTimeout(1000);

    await this.dataModelMenuObjectsDGLButton.click();
    await this.page.waitForTimeout(1000);
    await this.dataModelMenuObjectsDGLFirstOBject.click();
    await this.page.waitForTimeout(1000);
    await this.dataModelMenuObjectsDGLConfirm.click();
    await this.page.waitForTimeout(1000);

    await this.page.screenshot({
      path: "screenshots/DataModelScreenShot.png",
      fullPage: true,
    });

    await this.dataModelMenuObjectsSaveAll.click();
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
