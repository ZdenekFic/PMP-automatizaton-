const { baseURL, scbName } = require("./constants");
const { expect } = require("@playwright/test");

exports.SubContentBricks = class SubContentBricks {
  constructor(page, dropdownElement, mainName) {
    this.page = page;
    this.mainName = mainName;
    this.dropdownElement = dropdownElement;
    this.definitionsTab = page.getByRole("button", { name: "Definitions" });
    this.subContentBricksTab = page
      .locator("span")
      .filter({ hasText: "Sub Content Bricks" })
      .first();
    this.addButton = page.getByRole("link", { name: "Add" });
    this.generalFormName = page.getByLabel("Name", { exact: true });
    this.generalFormIdentifier = page.getByLabel("Identifier", { exact: true });
    // Uasge types objects
    this.generalFormUsageTypesRedArrow = page
      .locator(".v-input__append-outer > .v-btn")
      .first();
    this.firstObjectInTable = page.locator("//tbody/tr[1]/td[1]/div[1]/i[1]");
    this.secondObjectInTable = page.locator("//tbody/tr[2]/td[1]/div[1]/i[1]");
    this.fifthObjectUsageInTable = page.locator(
      "//tbody/tr[5]/td[1]/div[1]/i[1]"
    );
    this.buttonUpdateUsageTypes = page.locator(
      "//span[normalize-space()='Update Usage types']"
    );
    // Tags objects
    this.generalFormTagsRedArrow = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[1]"
    );
    this.firstObjectInTableTags = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[2]/td[1]"
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

    // Search identifiers
    this.generalFormSearchIdentifierRedArrow = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[2]"
    );
    this.firstOBjectInTableSearchIdentifiers = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[1]/td[1]"
    );
    this.secondObjectInTableSearchIdentifiers = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[2]/td[1]"
    );
    this.fifthOBjectInTableSearchIdentifiers = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[5]/td[1]"
    );
    this.buttonUpdateSearchIdentifiers = page.locator(
      "//span[normalize-space()='Update Search identifiers']"
    );

    // Fields objects
    this.addFieldButton = page.locator(
      "(//button[@class='mt-3 v-btn theme--light elevation-2 v-size--default'])[1]"
    );
    this.fieldNameInput = page.locator(
      "(//div[@class='col col-3'])[1] >> text='Name'"
    );
    this.fieldIdentifier = page.locator(
      "//div[@class='col col-3']//div[@class='v-input theme--light v-text-field v-text-field--is-booted']//input"
    );
    this.fieldDataTypeButton = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']//div[@class='v-select__slot']"
    );
    this.elementDropdown = page.locator(
      `.v-list-item__title:has-text('${dropdownElement}')`
    );
    this.switchIsMandatory = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']//div[@class='v-input--selection-controls__ripple']"
    );
    this.uniteTypeRedArrowButton = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[4]"
    );
    this.uniteTypeFirstObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//tbody/tr[2]/td[1]"
    );
    this.uniteTypeFirstUpdateButton = page.locator(
      "//span[normalize-space()='Update Unit Type']"
    );
    this.unitRedArrowButton = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[5]"
    );
    this.uniteFirstObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//tbody/tr[1]/td[1]"
    );
    this.uniteUpdateButton = page.locator(
      "//span[normalize-space()='Update Unit']"
    );
    this.fieldAddButton = page.locator(
      "//button[@class='error v-btn v-btn--flat v-btn--text theme--light v-size--default']//span[@class='v-btn__content'][normalize-space()='Add']"
    );

    //draft, active, suspended combobox
    this.comboboxSCBstate = page.getByRole("combobox").nth(1);
    this.stateDraft = page.locator(
      " //div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//span[@class='status-chip-text'][normalize-space()='Draft']"
    );
    this.saveSCBbutton = page.locator(
      "//div[@class='detail-tab-menu-header-container']//button[2]"
    );

    // assertions objects
    this.areaOfCbs = page.locator(
      `//span[@ui-test-data='overview-definitions-content-brick-grid-name']`
    );
    this.deleteDraftButtton = page.locator(
      "//div[@class='entity-detail-card v-card v-sheet theme--light']//i[@class='v-icon notranslate mdi mdi-delete theme--light']"
    );
    this.modalDeleteButton = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']//span[normalize-space()='Delete']"
    );
  }

  async enterToSCB() {
    //click on Definitons tab
    await this.definitionsTab.click();

    //click on Definitions/Sub Content Bricks TAB
    await this.subContentBricksTab.click();

    //click on ADD button
    await this.addButton.click();
  }

  async formSCB_General(name) {
    //click and fill name
    await this.generalFormName.fill(name);

    //click on identifier to get automaticaly identifier
    await this.generalFormIdentifier.click();

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
  }

  async add_fields(name) {
    await this.addFieldButton.click();
    await this.page.waitForTimeout(1000);
    await this.fieldNameInput.fill(name);
    await this.fieldIdentifier.click();
    await this.fieldDataTypeButton.click();
    await this.page.waitForTimeout(1000);
    await this.elementDropdown.click();
    await this.switchIsMandatory.click();
    await this.page.waitForTimeout(1000);
    await this.uniteTypeRedArrowButton.click();
    await this.page.waitForTimeout(1000);
    await this.uniteTypeFirstObject.click();
    await this.uniteTypeFirstUpdateButton.click();
    await this.page.waitForTimeout(1000);
    await this.unitRedArrowButton.click();
    await this.page.waitForTimeout(1000);
    await this.uniteFirstObject.click();
    await this.uniteUpdateButton.click();
    await this.page.waitForTimeout(1000);
    await this.fieldAddButton.click();
  }

  async chooseSCBState() {
    await this.comboboxSCBstate.click();
    await this.stateDraft.click();
    await this.page.waitForTimeout(1000);
    await this.saveSCBbutton.click();
    await this.page.waitForTimeout(1000);
  }

  async checkCreatedSCB() {
    //click on Definitons tab
    await this.definitionsTab.click();

    //click on Definitions/Sub Content Bricks TAB
    await this.subContentBricksTab.click();
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
};
