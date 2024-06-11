const { expect } = require("@playwright/test");
const { timeOuts } = require("../constants");
const { cwd } = require("process");

exports.DGL = class DGL {
  constructor(page, dropdownElement, mainName) {
    this.page = page;
    this.mainName = mainName;
    this.definitionsTab = page.locator('div[ui-test-data="nav-definitions"]');
    this.designGuidelinesTab = page.locator(
      'span[ui-test-data="nav-definitions-design-guidelines"]'
    );
    this.designGuidelinesAddButton = page.locator('a[ui-test-data="overview-header-add-btn"]');

    this.generalFormName = page.getByLabel("Name", { exact: true });
    this.generalFormIdentifier = page.getByLabel("Identifier", { exact: true });

    // Uasge types objects
    this.generalFormUsageTypesRedArrow = page
      .locator(".v-input__append-outer > .v-btn")
      .first();
    
    this.buttonUpdateUsageTypes = page.locator(
      "//span[normalize-space()='Update Usage types']"
    );
      // Tags and Search ids
   
    this.redArrow = page.locator('button[ui-test-data="upload-btn"]');
    this.modalWindow = page.locator(
     '.v-dialog.v-dialog--active.v-dialog--persistent.v-dialog--scrollable'
    );
    this.item = "//tr/td[1]";
    this.buttonUpdate = page.locator('button[ui-test-data="update-btn"]');
    

    

    // input for text to describe CB
    this.descriptionCB = page.locator(
      '.ql-editor.ql-blank[contenteditable="true"]'
    );

    // Fields objects
    this.addFieldButton = page.locator(
      "button.mx-3.v-btn.elevation-2"
    );
    this.addFiledButtonSecondary = page.getByRole("button", {
      name: "Field",
      exact: true,
    });
    this.fieldNameInput = page.locator(
      'input[autofocus="autofocus"][type="text"]'
    );
    this.fieldsModal = page.locator("div.v-card.v-sheet.theme--light");
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

    //value fields
    this.addValueFieldButton = page.getByRole("button", {
      name: "Value Field",
    });

    this.comboboxSCBstate = page.getByRole("combobox").nth(1);
    this.stateModal = page.locator('div.v-list.v-select-list.v-sheet.theme--light.v-list--dense[role="listbox"]');
    this.stateDraft = page.locator("div");
    this.saveSCBbutton = page.locator('button.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default[role="button"][aria-haspopup="true"][aria-expanded="false"]');

    this.dglHasBeenCreated = page.getByText("Design Guideline has been");

    // assertions objects
    
    this.deleteDraftButtton = page.locator(
      'button[ui-test-data="delete-btn"].red--text'
    );
    this.modalDeleteButton = page.locator(
      'button[ui-test-data="delete-confirm-btn"]'
    );
  }

  //Functions part

  async enterToDGL() {
    // go to definition
    await this.definitionsTab.click();

    // click on domain models
    await this.designGuidelinesTab.click();
    await this.page.waitForTimeout(timeOuts.timeM);
  }

  async generalForm(name, text) {
    // click on ADD button
    await this.designGuidelinesAddButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);

    //General Form
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

  async add_fields(name, valueName) {
    //add fields
    await this.addFieldButton.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.addFiledButtonSecondary.click();
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
    await this.fieldAddButton.nth(4).click();

    //add value fields
    await this.addFieldButton.nth(1).click();
    await this.addValueFieldButton.click();
    await this.page.waitForTimeout(timeOuts.timeL);
    await this.fieldsModal.nth(8).locator(this.fieldNameInput).fill(valueName);
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

    await this.fieldAddButton.nth(4).click();
  }

  async chooseCBState() {
    await this.comboboxSCBstate.click();
    await this.stateModal.nth(1).locator(this.stateDraft).nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.saveSCBbutton.nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);

    //validation of success message
    const successMessage = await this.dglHasBeenCreated.textContent();
    await expect(successMessage).toContain("Design Guideline has been created");

    //assertions after save cb
    await expect(this.generalFormName).not.toBeEmpty();
    await expect(this.generalFormIdentifier.nth(0)).not.toBeEmpty();
    await this.page.waitForTimeout(timeOuts.timeL);
  }

  async checkAndDelete() {
    //click on Definitons tab
    await this.definitionsTab.click();

    //click on Definitions/Content Bricks TAB
    await this.designGuidelinesTab.click();
    await this.page.waitForTimeout(timeOuts.timeXXL);

    let elements = await this.page.$$(`body >> text=${this.mainName}`);

    for (let i = 0; i < elements.length; i++) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();

      if (elementText === this.mainName) {
        await elementHandle.click();
        await this.deleteDraftButtton.click();
        await this.modalDeleteButton.click();
        await this.page.waitForTimeout(timeOuts.timeL);

        // Fetch the latest elements after the deletion
        elements = await this.page.$$(`body >> text=${this.mainName}`);
        await this.page.waitForTimeout(timeOuts.timeL);

        // Reset the index to recheck the elements
        i = -1;
      }
    }
  }
};
