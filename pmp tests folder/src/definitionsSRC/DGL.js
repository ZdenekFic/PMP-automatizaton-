const { expect } = require("@playwright/test");
const { timeOuts, dglRequest, statusCode200 } = require("../constants");

const { requestAssert } = require("../constants");

exports.DGL = class DGL {
  constructor(page, dropdownElement, mainName, labelName,fieldButtonText,valueFieldButtonText) {
    this.page = page;
    this.mainName = mainName;
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.designGuidelinesTab =
      '[ui-test-data="nav-definitions-design-guidelines"]';
    this.overviewHeader = '[ui-test-data="overview-header-add-btn"]';
    this.designGuidelinesAddButton =
      'a[ui-test-data="overview-header-add-btn"]';
    this.titleHeader = ".pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-7.col-xl-7";

    //general form
    this.generalFormName = `.v-input:has(label:has-text("${labelName}")) input[type="text"]`;
    this.generalFormIdentifier =
      'button[type="button"][aria-label="Identifier appended action"]';

    // input for text to describe CB
    this.descriptionCB = '.ql-editor.ql-blank[contenteditable="true"]';

    // Groups - fields
    this.fieldDiv = "div.d-inline-flex.align-center";
    this.addGroupButton = 'button.v-btn:has(span:has-text("Add group"))';
    this.groupAddButton = "button.error.v-btn.v-btn--text.theme--light";

    // Fields objects
    this.addFieldButtonModal = 'button[aria-haspopup="true"][aria-expanded="false"]';
    this.addFieldButton = 'button[ui-test-data="drop-down-option-btn"]';
    this.fieldButtonSel = 'i.mdi-cube';
    this.valueFieldButtonSel = 'i.mdi-cube-scan';
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
  }

  //Functions part
  async enterToDGL() {
    // go to definition
    await this.page.locator(this.definitionsTab).click();

    // click on domain models
    await this.page.locator(this.designGuidelinesTab).click();
    await this.page.waitForSelector(this.overviewHeader);
  }

  async generalForm(name, text) {
    // click on ADD button
    await this.page.locator(this.designGuidelinesAddButton).click();
    await this.page.waitForSelector(this.titleHeader);

    //General Form
    //click and fill name
    await this.page.locator(this.generalFormName).fill(name);

    //click on identifier to get automaticaly identifier
    await this.page.locator(this.generalFormIdentifier).click();

    // add some text to description
    await this.page.locator(this.descriptionCB).nth(0).fill(text);
  }

  async addGroups(name) {
    await this.page
      .locator(this.fieldDiv)
      .locator(this.addGroupButton)
      .click();
    await this.page.waitForSelector(this.fieldsModal);
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
    await this.page
      .locator(this.fieldDiv)
      .locator(this.addFieldButtonModal)
      .click();
      await this.page.locator(this.addFieldButton).filter({ has: this.page.locator(this.fieldButtonSel) }).click();

    await this.page.waitForSelector(this.fieldsModal);

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
    await this.page.waitForTimeout(timeOuts.timeM);

    await this.page.locator(this.elementDropdown).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.page
      .locator(this.fieldsModal)
      .locator(this.groupAddButton)
      .click();
  }
  async addValueField(name) {
    //add value fields
    await this.page
      .locator(this.fieldDiv)
      .locator(this.addFieldButtonModal)
      .click();
      await this.page.locator(this.addFieldButton).filter({ has: this.page.locator(this.valueFieldButtonSel) }).click();
    await this.page.waitForSelector(this.fieldsModal);

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
    await this.page.waitForTimeout(timeOuts.timeM);

    await this.page.locator(this.elementDropdown).click();

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
    await requestAssert(this.page, dglRequest, statusCode200);
  }
  async checkAndDelete() {
    //this function helps to find content brick which was created by this test so in the end there wont be any duplicities
    //click on Definitions tab
    await this.page.locator(this.definitionsTab).click();

    //click on Definitions/Content Bricks TAB
    await this.page.locator(this.designGuidelinesTab).click();
    await this.page.waitForSelector(this.overviewHeader);

    let elements = await this.page.$$(`body >> text=${this.mainName}`);

    for (let i = 0; i < elements.length; ) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();

      if (elementText === this.mainName) {
        await elementHandle.click();
        await this.page.locator(this.deleteDraftButtton).click();
        await this.page.waitForSelector(this.fieldsModal);
        await this.page.locator(this.modalDeleteButton).click();
        await this.page.waitForSelector(this.overviewHeader);

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
