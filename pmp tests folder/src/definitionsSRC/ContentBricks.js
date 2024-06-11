const { baseURL, cbName, timeOuts } = require("../constants");
const { expect } = require("@playwright/test");

exports.ContentBricks = class ContentBricks {
  constructor(page, dropdownElement, mainName) {
    this.page = page;
    this.mainName = mainName;
    this.dropdownElement = dropdownElement;
    this.definitionsTab = page.locator('div[ui-test-data="nav-definitions"]');
    this.contentBricksTab = page.locator(
      'span[ui-test-data="nav-definitions-content-bricks"]'
    );
    this.addButton = page.locator('a[ui-test-data="overview-header-add-btn"]');
    this.generalFormName = page.getByLabel("Name", { exact: true });
    this.generalFormIdentifier = page.locator('button.v-icon.mdi.mdi-refresh[aria-label="append icon"]');
    // Uasge types objects
    this.generalFormUsageTypesRedArrow = page
      .locator(".v-input__append-outer > .v-btn")
      .first();
    
    

    // input for text to describe CB
    this.descriptionCB = page.locator(
      '.ql-editor.ql-blank[contenteditable="true"]'
    );
    // Tags and Search ids
   
    this.redArrow = page.locator('button[ui-test-data="upload-btn"]');
    this.modalWindow = page.locator(
      '.v-dialog.v-dialog--active.v-dialog--persistent.v-dialog--scrollable'
     );
    this.item = "//tr/td[1]";
    this.buttonUpdate = page.locator('button[ui-test-data="update-btn"]');

    // Fields objects
    this.addFieldButton = page.locator(
      "button.mx-1.v-btn.elevation-2"
    );
    this.fieldsModal = page.locator("div.v-card.v-sheet.theme--light");
    this.fieldNameInput = page.locator(
      'input[autofocus="autofocus"][type="text"]'
    );

    this.fieldIdentifier = page.locator(
      "//div[@class='col col-3']//div[@class='v-input theme--light v-text-field v-text-field--is-booted']//input"
    );
    this.fieldDataTypeButton = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']//div[@class='v-select__slot']"
    );
    this.fieldsMultiElement = page.locator('input[type="text"]');
    this.elementDropdown = page.locator(
      `.v-list-item__title:has-text('${dropdownElement}')`
    );
    this.switchIsMandatory = page.locator(
      ".v-input--selection-controls__ripple"
    );

    this.fieldAddButton = page.locator(
      "button.error.v-btn.v-btn--flat.v-btn--text.theme--light.v-size--default"
    );

    //draft, active, suspended combobox
    this.comboboxSCBstate = page.getByRole("combobox").nth(1);
    this.stateModal = page.locator('div.v-list.v-select-list.v-sheet.theme--light.v-list--dense[role="listbox"]');
    this.stateDraft = page.locator("div");
    this.saveSCBbutton = page.locator('button.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default[role="button"][aria-haspopup="true"][aria-expanded="false"]');

    this.cbHasBeenCreated = page.getByText("Content Brick has been created");

    // assertions objects
    this.deleteDraftButtton = page.locator(
      'button[ui-test-data="delete-btn"].red--text'
    );
    this.modalDeleteButton = page.locator(
      'button[ui-test-data="delete-confirm-btn"]'
    );
  }

  async enterToCB() {
    //click on Definitons tab
    await this.definitionsTab.click();

    //click on Definitions/Content Bricks TAB
    await this.contentBricksTab.click();

    //click on ADD button
    await this.addButton.click();
  }

  async formCB_General(name, text) {
    //click and fill name
    await this.generalFormName.fill(name);

    //click on identifier to get automaticaly identifier
    await this.generalFormIdentifier.click();

    //USAGE TYPES
    await this.redArrow.nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item).nth(1).click();
    await this.modalWindow.locator(this.item).nth(3).click();
    await this.modalWindow.locator(this.item).nth(5).click();

    await this.buttonUpdate.click();

    
    //TAGS
    // add tags
    await this.redArrow.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item).nth(1).click();
    await this.modalWindow.locator(this.item).nth(3).click();
    await this.modalWindow.locator(this.item).nth(5).click();
    await this.modalWindow.locator(this.item).nth(6).click();
    await this.modalWindow.locator(this.item).nth(2).click();

    await this.buttonUpdate.nth(1).click();

    

    //SEARCH Identifiers
    // add search identifiers
    await this.redArrow.nth(2).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item).nth(1).click();
    await this.modalWindow.locator(this.item).nth(2).click();
    await this.modalWindow.locator(this.item).nth(3).click();

    await this.buttonUpdate.nth(2).click();
    await this.page.waitForTimeout(timeOuts.timeM);

    

    // add some text to description
    await this.descriptionCB.nth(0).fill(text);
  }

  async add_fields(name) {
    await this.addFieldButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.fieldsModal.nth(8).locator(this.fieldNameInput).fill(name);

    await this.fieldsModal
      .nth(8)
      .locator(this.fieldsMultiElement.nth(1))
      .click();
    await this.fieldsModal
      .nth(8)
      .locator(this.fieldsMultiElement.nth(2))
      .click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.elementDropdown.click();
    await this.fieldsModal.nth(8).locator(this.switchIsMandatory).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.fieldAddButton.nth(4).click();
  }

  async chooseCBState() {
    await this.comboboxSCBstate.click();
   
    await this.stateModal.nth(1).locator(this.stateDraft).nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.saveSCBbutton.nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);

    //validation of success message
    const successMessage = await this.cbHasBeenCreated.textContent();
    await expect(successMessage).toContain("Content Brick has been created");

    
    
  }

  async checkCreatedCB() {
    //click on Definitions tab
    await this.definitionsTab.click();

    //click on Definitions/Content Bricks TAB
    await this.contentBricksTab.click();
    await this.page.waitForTimeout(timeOuts.timeXXL);

    let elements = await this.page.$$(`body >> text=${this.mainName}`);

    for (let i = 0; i < elements.length; ) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();

      if (elementText === this.mainName) {
        await elementHandle.click();
        await this.deleteDraftButtton.click();
        await this.page.waitForTimeout(timeOuts.timeM);
        await this.modalDeleteButton.click();
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
