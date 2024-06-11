const exp = require("constants");
const { baseURL, scbName, timeOuts } = require("../constants");
const { expect } = require("@playwright/test");

exports.SubContentBricks = class SubContentBricks {
  constructor(page, dropdownElement, mainName) {
    this.page = page;
    this.mainName = mainName;
    this.dropdownElement = dropdownElement;
    this.definitionsTab = page.locator('div[ui-test-data="nav-definitions"]');
    this.subContentBricksTab = page.locator(
      'span[ui-test-data="nav-definitions-sub-content-bricks"]'
    );
    this.addButton = page.locator('a[ui-test-data="overview-header-add-btn"]');

    this.generalFormName = page.getByLabel("Name", { exact: true });
    this.generalFormIdentifier = page.getByLabel("Identifier", { exact: true });

    // Domains
    this.domainsSelect = page.locator(
      ".v-input__append-inner .v-input__icon.v-input__icon--append i.mdi.mdi-menu-down"
    );
    this.domainsListBox = page.locator(
      "div.v-list.v-select-list"
    );
    this.domainsItem = 
      '.v-list-item[role="option"]';
    // Tags and Search ids
    this.inputArea = page.locator("div.v-select__selections");
    this.redArrow = page.locator('button[ui-test-data="upload-btn"]');
    this.modalWindow = page.locator(
      '.v-dialog.v-dialog--active.v-dialog--persistent.v-dialog--scrollable'
     );
    this.item = "//tr/td[1]";
    this.buttonUpdate = page.locator('button[ui-test-data="update-btn"]');

    // Fields objects
    this.addFieldButton = page.locator(
      "button.mt-3.v-btn.theme--light.elevation-2.v-size--default"
    );
    this.fieldsModal = page.locator("div.v-card.v-sheet.theme--light");
    this.fieldNameInput = page.locator(
      'input[autofocus="autofocus"][type="text"]'
    );
   //identifier and data type in fields
    this.fieldsMultiElement = page.locator('input[type="text"]');
 
    this.elementDropdown = page.locator(
      `.v-list-item__title:has-text('${dropdownElement}')`
    );
    this.switchIsMandatory = page.locator(
      ".v-input--selection-controls__ripple"
    );
    this.uniteTypeRedArrowButton = page.locator(
      'button[ui-test-data="open-list-btn"]'
    );

    this.uniteTypeFirstObject = page.locator("//tr/td[1]");
    this.uniteTypeFirstUpdateButton = page.locator(
      "button[ui-test-data='update-btn']"
    );

    this.fieldAddButton = page.locator(
      "button.error.v-btn.v-btn--flat.v-btn--text.theme--light.v-size--default"
    );

    //draft, active, suspended combobox
    this.comboboxSCBstate = page.getByRole("combobox").nth(1);
    this.stateModal = page.locator('div.v-list.v-select-list.v-sheet.theme--light.v-list--dense[role="listbox"]');
    this.stateDraft = page.locator("div");
    this.saveSCBbutton = page.locator(
      'button.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default[role="button"][aria-haspopup="true"][aria-expanded="false"]'
    );

    // assertions objects

    this.deleteDraftButtton = page.locator(
      'button[ui-test-data="delete-btn"].red--text'
    );
    this.modalDeleteButton = page.locator(
      'button[ui-test-data="delete-confirm-btn"]'
    );
  }
  //______________________________________Methods_____________________________________________________________

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
    await expect.soft(this.generalFormName).not.toBeEmpty();

    //click on identifier to get automaticaly identifier
    await this.generalFormIdentifier.click();
    await expect.soft(this.generalFormIdentifier).not.toBeEmpty();

    

    //TAGS
    // add tags
    await this.redArrow.nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item).nth(1).click();
    await this.modalWindow.locator(this.item).nth(3).click();
    await this.modalWindow.locator(this.item).nth(5).click();
    await this.modalWindow.locator(this.item).nth(6).click();
    await this.modalWindow.locator(this.item).nth(2).click();

    await this.buttonUpdate.click();

    

    //SEARCH Identifiers
    // add search identifiers
    await this.redArrow.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item).nth(1).click();
    await this.modalWindow.locator(this.item).nth(2).click();
    await this.modalWindow.locator(this.item).nth(3).click();

    await this.buttonUpdate.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);

    
  }

  async add_fields(name) {
    await this.addFieldButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.fieldsModal
      .nth(7)
      .locator(this.fieldNameInput.nth(0))
      .fill(name);

    await this.fieldsModal
      .nth(7)
      .locator(this.fieldsMultiElement.nth(1))
      .click();
    await this.fieldsModal
      .nth(7)
      .locator(this.fieldsMultiElement.nth(2))
      .click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.elementDropdown.click();
    await this.fieldsModal.nth(7).locator(this.switchIsMandatory).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.uniteTypeRedArrowButton.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow
      .locator(this.uniteTypeFirstObject.nth(2))
      .click();
    await this.uniteTypeFirstUpdateButton.nth(2).click();

    await this.page.waitForTimeout(timeOuts.timeM);
    await this.uniteTypeRedArrowButton.nth(2).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow
      .locator(this.uniteTypeFirstObject.nth(0))
      .click();
    await this.uniteTypeFirstUpdateButton.nth(3).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.fieldAddButton.nth(3).click();
  }

  async chooseSCBState() {
    await this.comboboxSCBstate.click();
    await this.stateModal.nth(1).locator(this.stateDraft).nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.saveSCBbutton.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
  }

  async checkCreatedSCB() {
    //click on Definitons tab
    await this.definitionsTab.click();

    //click on Definitions/Sub Content Bricks TAB
    await this.subContentBricksTab.click();
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
