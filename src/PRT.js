// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

const constants = require("./constants");

// -------------------------------------------------------------------------------------
// Class Definition: DGL
// -------------------------------------------------------------------------------------
exports.PRT = class PRT {
  constructor(page, dropdownElement, mainName, labelName) {
    this.page = page;
    this.mainName = mainName;

    // --------------------- Navigation Selectors ---------------------
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.prtTab = '[ui-test-data="nav-definitions-pracitcal-tests"]';
    this.overviewHeader = '[ui-test-data="overview-header-add-btn"]';
    this.prtAddButton = 'a[ui-test-data="overview-header-add-btn"]';
    this.titleHeader = ".pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-7.col-xl-7";

    // --------------------- General Form Selectors ---------------------
    this.generalFormName = `.v-input:has(label:has-text("${labelName}")) input[type="text"]`;
    this.generalFormIdentifier = 'button[type="button"][aria-label="Identifier appended action"]';

    // --------------------- Description Input ---------------------
    this.descriptionCB = ".quillWrapper.cb-description-editor";
    this.descriptionCBtextArea = ".ql-editor";

    // --------------------- Group Fields ---------------------
    this.fieldDiv = "div.d-inline-flex.align-center";
    this.addGroupButton = 'button.v-btn:has(span:has-text("Add group"))';
    this.groupAddButton = "button.error.v-btn.v-btn--text.theme--light";

    // --------------------- Fields Objects ---------------------
    this.addFieldButtonModal = 'button[aria-haspopup="true"][aria-expanded="false"]';
    this.addFieldButton = 'button[ui-test-data="drop-down-option-btn"]';
    this.fieldButtonSel = "i.mdi-cube";
    this.valueFieldButtonSel = "i.mdi-cube-scan";
    this.fieldsModal = "div.v-dialog.v-dialog--active.v-dialog--persistent";
    this.fieldNameInput = 'input[autofocus="autofocus"][type="text"]';
    this.fieldIdentifier = 'button[aria-label="Identifier appended action"]';
    this.fieldDataTypeButton = "div.v-input__icon.v-input__icon--append .mdi-menu-down";
    this.fieldsMultiElement = 'input[type="text"]';
    this.elementDropdown = `.v-list-item__title:has-text('${dropdownElement}')`;
    this.switchIsMandatory = ".v-input--selection-controls__ripple";

    // --------------------- State Combobox ---------------------
    this.stateBoxDiv = ".entity-detail-card.v-card.v-sheet.theme--light";
    this.comboboxSCBstate = "div.v-input__icon.v-input__icon--append .mdi-menu-down";
    this.stateModal = 'div.v-list.v-select-list.v-sheet.theme--light.v-list--dense[role="listbox"]';
    this.stateDraft = 'text="Draft"';
    this.tabMenuHeader = ".detail-tab-menu-header-container";
    this.saveSCBbutton = ".v-toolbar__content button:has(.mdi-content-save)";

    // --------------------- Deletion Objects ---------------------
    this.deleteDraftButtton = 'button[ui-test-data="delete-btn"].red--text';
    this.modalDeleteButton = 'button[ui-test-data="delete-confirm-btn"]';
    this.succesMessage = '.v-snack__wrapper.v-sheet.theme--dark.success';
  }

  // --------------------- Enter Design Guidelines ---------------------
  async enterToPRT() {
    await this.page.locator(this.definitionsTab).click();
    await this.page.locator(this.prtTab).click();
    await this.page.waitForSelector(this.overviewHeader);
  }

  // --------------------- Fill General Form ---------------------
  async generalForm(name, text) {
    await this.page.locator(this.prtAddButton).click();
    await this.page.waitForSelector(this.titleHeader);

    await this.page.locator(this.generalFormName).fill(name);
    await this.page.locator(this.generalFormIdentifier).click();

    await this.page
      .locator(this.descriptionCB)
      .locator(this.descriptionCBtextArea)
      .fill(text);
  }

  // --------------------- Add Groups ---------------------
  async addGroups(name) {
    await this.page.locator(this.fieldDiv).locator(this.addGroupButton).click();
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

  // --------------------- Add Fields ---------------------
  async addFields(name) {
    await this.page
      .locator(this.fieldDiv)
      .locator(this.addFieldButtonModal)
      .click();
    await this.page
      .locator(this.addFieldButton)
      .filter({ has: this.page.locator(this.fieldButtonSel) })
      .click();

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
    await this.page.waitForTimeout(constants.timeOuts.timeM);

    await this.page.locator(this.elementDropdown).click();
    await this.page.waitForTimeout(constants.timeOuts.timeM);
    await this.page
      .locator(this.fieldsModal)
      .locator(this.groupAddButton)
      .click();
  }

  // --------------------- Add Value Fields ---------------------
  async addValueField(name) {
    await this.page
      .locator(this.fieldDiv)
      .locator(this.addFieldButtonModal)
      .click();
    await this.page
      .locator(this.addFieldButton)
      .filter({ has: this.page.locator(this.valueFieldButtonSel) })
      .click();
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
    await this.page.waitForTimeout(constants.timeOuts.timeM);

    await this.page.locator(this.elementDropdown).click();

    await this.page
      .locator(this.fieldsModal)
      .locator(this.groupAddButton)
      .click();
  }

  // --------------------- Choose Content Brick State ---------------------
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
    await constants.requestAssert(
      this.page,
      constants.dglRequest,
      constants.statusCode200
    );
  }

  // --------------------- Check and Delete Created Content Brick ---------------------
  async checkAndDelete() {
    await this.page.locator(this.definitionsTab).click();
    await this.page.locator(this.prtTab).click();
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
        await this.page.waitForSelector(this.succesMessage, { visible: true });
        await this.page.waitForSelector(this.overviewHeader);

        elements = await this.page.$$(`body >> text=${this.mainName}`);
        await this.page.waitForTimeout(constants.timeOuts.timeL);
      } else {
        i++;
      }
    }
  }
};
