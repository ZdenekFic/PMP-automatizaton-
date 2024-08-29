const {
  timeOuts,
  cbRequest,
  statusCode200,
  requestAssert,
  requestJSONAssert,
} = require("../constants");
const { expect } = require("@playwright/test");

exports.ContentBricks = class ContentBricks {
  constructor(page, dropdownElement, mainName) {
    this.page = page;
    this.mainName = mainName;
    this.dropdownElement = dropdownElement;
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.contentBricksTab = '[ui-test-data="nav-definitions-content-bricks"]';
    this.addButton = 'a[ui-test-data="overview-header-add-btn"]';
    this.generalFormName = 'input[type="text"][maxlength="80"]';
    this.generalFormIdentifier =
      'button[type="button"][aria-label="Identifier appended action"]';

    // Overview table
    this.overviewTable =
      ".v-data-table.overview-table.pmtool-table.v-data-table--dense.theme--light";

    // input for text to describe CB
    this.descriptionCB = '.ql-editor.ql-blank[contenteditable="true"]';

    // Groups - fields
    this.fieldDiv = "div.d-inline-flex align-center";
    this.addGroupButton = "button.mx-3.v-btn.elevation-2";
    this.groupAddButton = "button.error.v-btn.v-btn--text.theme--light";

    // Fields objects
    this.addFieldButton = "button.mx-1.v-btn.elevation-2";
    this.fieldsModal = "div.v-dialog.v-dialog--active.v-dialog--persistent";
    this.fieldNameInput = 'input[autofocus="autofocus"][type="text"]';

    this.fieldIdentifier = 'button[aria-label="Identifier appended action"]';
    this.fieldDataTypeButton =
      "div.v-input__icon.v-input__icon--append .mdi-menu-down";
    this.fieldsMultiElement = 'input[type="text"]';
    this.elementDropdown = `.v-list-item__title:has-text('${dropdownElement}')`;
    this.switchIsMandatory = ".v-input--selection-controls__ripple";

    //draft, active, suspended combobox
    this.stateBoxDiv = ".entity-detail-card.v-card.v-sheet.theme--light";
    this.comboboxSCBstate =
      "div.v-input__icon.v-input__icon--append .mdi-menu-down";
    this.stateModal =
      'div.v-list.v-select-list.v-sheet.theme--light.v-list--dense[role="listbox"]';
    this.stateDraft = 'text="Draft"';
    this.tabMenuHeader = ".detail-tab-menu-header-container";
    this.saveSCBbutton = ".v-toolbar__content button:has(.mdi-content-save)";

    // deleting objects
    this.deleteDraftButtton = 'button[ui-test-data="delete-btn"].red--text';
    this.modalDeleteButton = 'button[ui-test-data="delete-confirm-btn"]';

    // tab scripts objects !!!!!!! not finished
    this.barDiv = ".v-slide-group__wrapper";
    this.tabScripts = 'text="Scripts"';
    this.title = ".v-card__title";
    this.textAreaScript = '[data-testid="textarea"]';
    this.buttonArea = ".v-card__text";
    this.buttonArea2 = ".row.row--dense";
    this.buttonValidate = 'button';
  }

  async enterToCB() {
    //click on Definitons tab
    await this.page.locator(this.definitionsTab).click();

    //click on Definitions/Content Bricks TAB
    await this.page.locator(this.contentBricksTab).click();
    await this.page.waitForTimeout(timeOuts.timeL);
  }

  async addNewCB() {
    //click on ADD button
    await this.page.locator(this.addButton).click();
  }

  async enterToCBDetail() {
    // this function helps to find our searched element by the name, so if there is a match, function will click it.
    let elements = await this.page.$$(`body >> text=${this.mainName}`);
    for (let i =0; i < elements.length; ) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();

      if (elementText === this.mainName) {
        await elementHandle.click();
        
        // Fetch the latest elements after the deletion
        elements = await this.page.$$(`body >> text=${this.mainName}`);
        await this.page.waitForTimeout(timeOuts.timeL);

        // No need to reset the index, as the loop will check the updated elements
      } else {
        // Increment the index only if no deletion occurred
        i++;
      }
    }
  }

  async scriptTab(tabName,scriptExample) {
    //opens tab Script in Content brick
    await this.page.locator(this.barDiv).locator(this.tabScripts).click();
    
    //assertion
    const textTitle = await this.page.locator(this.title).nth(4).textContent();
    expect(textTitle).toContain(tabName);
    await this.page.waitForTimeout(timeOuts.timeM);
    
    //writing the value
    await this.page.locator(this.textAreaScript).first().fill(scriptExample);
    
    //assertion
    expect(this.page.locator(this.textAreaScript).first()).not.toBeEmpty();

    //button validation click
    await this.page.locator(this.buttonArea).locator(this.buttonArea2).locator(this.buttonValidate).first().click();
    
    //assertion with request
    await requestJSONAssert(
      this.page,
      "/api/v1/ContentBrickDefinition/.*/scripts/1/validate$",
      statusCode200,
      {
        success: true,
        errorMessage: null,
      }
    );
  }

  async formCBGeneral(name, text) {
    //click and fill name
    await this.page.locator(this.generalFormName).first().fill(name);

    //click on identifier to get automaticaly identifier
    await this.page.locator(this.generalFormIdentifier).click();

    // add some text to description
    await this.page.locator(this.descriptionCB).first().fill(text);
  }

  async addGroups(name) {
    await this.page.locator(this.addGroupButton).click();
    await this.page.locator(this.fieldNameInput).fill(name);
    await this.page
      .locator(this.fieldsModal)
      .locator(this.fieldIdentifier)
      .click();
    await this.page
      .locator(this.fieldsModal)
      .locator(this.groupAddButton)
      .click();
  }

  async addFields(name) {
    await this.page.locator(this.addFieldButton).first().click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.page
      .locator(this.fieldsModal)
      .locator(this.fieldNameInput)
      .fill(name);
    await this.page
      .locator(this.fieldsModal)
      .locator(this.fieldIdentifier)
      .click();
    await this.page
      .locator(this.fieldsModal)
      .locator(this.fieldDataTypeButton)
      .click();

    await this.page.waitForTimeout(timeOuts.timeS);
    await this.page.locator(this.elementDropdown).click();
    await this.page
      .locator(this.fieldsModal)
      .locator(this.switchIsMandatory)
      .click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.page
      .locator(this.fieldsModal)
      .locator(this.groupAddButton)
      .click();
  }

  async chooseCBState() {
    await this.page
      .locator(this.stateBoxDiv)
      .locator(this.comboboxSCBstate)
      .click();
    await this.page.locator(this.stateModal).locator(this.stateDraft).click();
    await this.page
      .locator(this.tabMenuHeader)
      .locator(this.saveSCBbutton)
      .click();
    await requestAssert(this.page, cbRequest, statusCode200);
  }

  async checkCreatedCB() {
    //this function helps to find content brick which was created by this test so in the end there wont be any duplicities
    //click on Definitions tab
    await this.page.locator(this.definitionsTab).click();

    //click on Definitions/Content Bricks TAB
    await this.page.locator(this.contentBricksTab).click();
    await this.page.waitForTimeout(timeOuts.timeXXL);

    let elements = await this.page.$$(`body >> text=${this.mainName}`);

    for (let i = 0; i < elements.length; ) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();

      if (elementText === this.mainName) {
        await elementHandle.click();
        await this.page.locator(this.deleteDraftButtton).click();
        await this.page.waitForTimeout(timeOuts.timeM);
        await this.page.locator(this.modalDeleteButton).click();
        await this.page.waitForTimeout(timeOuts.timeL);

        // Fetch the latest elements after the deletion
        elements = await this.page.$$(`body >> text=${this.mainName}`);
        await this.page.waitForTimeout(timeOuts.timeL);

        // No need to reset the index, as the loop will check the updated elements
      } else {
        // Increment the index only if no deletion occurred
        i++;
      }
    }
  }
};
