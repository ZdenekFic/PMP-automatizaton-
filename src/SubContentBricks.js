// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

const constants = require("./constants");

// -------------------------------------------------------------------------------------
// Class Definition: SubContentBricks
// -------------------------------------------------------------------------------------
exports.SubContentBricks = class SubContentBricks {
  constructor(page, dropdownElement, mainName, labelName) {
    this.page = page;
    this.mainName = mainName;
    this.dropdownElement = dropdownElement;

    // --------------------- Navigation Selectors ---------------------
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.contentBricksTab = '[ui-test-data="nav-definitions-sub-content-bricks"]';
    this.overviewHeader = '[ui-test-data="overview-header-add-btn"]';
    this.addButton = 'a[ui-test-data="overview-header-add-btn"]';
    this.titleHeader = ".pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-7.col-xl-7";

    // --------------------- General Form Selectors ---------------------
    this.generalFormName = `.v-input:has(label:has-text("${labelName}")) input[type="text"]`;
    this.generalFormIdentifier = "body";

    // --------------------- Overview Table ---------------------
    this.overviewTable = ".v-data-table.overview-table.pmtool-table.v-data-table--dense.theme--light";

    // --------------------- Fields Selectors ---------------------
    this.addFieldButton = 'button.v-btn:has-text("Add")';
    this.fieldsModal = "div.v-dialog.v-dialog--active.v-dialog--persistent";
    this.fieldNameInput = 'input[autofocus="autofocus"][type="text"]';
    this.fieldIdentifier = 'button[aria-label="Identifier appended action"]';
    this.fieldDataTypeButton = "div.v-input__icon.v-input__icon--append .mdi-menu-down";
    this.fieldsMultiElement = 'input[type="text"]';
    this.elementDropdown = `.v-list-item__title:has-text('${dropdownElement}')`;
    this.bottomModal = ".v-card__actions";
    this.modalButtonAdd = "button";

    // --------------------- State Combobox ---------------------
    this.stateBoxDiv = ".entity-detail-card.v-card.v-sheet.theme--light";
    this.comboboxSCBstate = "div.v-input__icon.v-input__icon--append .mdi-menu-down";
    this.stateModal = 'div.v-list.v-select-list.v-sheet.theme--light.v-list--dense[role="listbox"]';
    this.stateDraft = 'text="Draft"';
    this.tabMenuHeader = ".detail-tab-menu-header-container";
    this.saveSCBbutton = ".v-toolbar__content button:has(.mdi-content-save)";

    // --------------------- Deletion Selectors ---------------------
    this.deleteDraftButtton = 'button[ui-test-data="delete-btn"].red--text';
    this.modalDeleteButton = 'button[ui-test-data="delete-confirm-btn"]';
    this.succesMessage = '.v-snack__wrapper.v-sheet.theme--dark.success';
  }

  // -------------------------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------------------------

  // --------------------- Enter Sub Content Bricks ---------------------
  async enterToCB() {
    await this.page.locator(this.definitionsTab).click();
    await this.page.locator(this.contentBricksTab).click();
    await this.page.waitForSelector(this.overviewHeader);
  }

  // --------------------- Add New Sub Content Brick ---------------------
  async addNewCB() {
    await this.page.locator(this.addButton).click();
    await this.page.waitForSelector(this.titleHeader);
  }

  // --------------------- Enter Sub Content Brick Details ---------------------
  async enterToCBDetail() {
    let elements = await this.page.$$(`body >> text=${this.mainName}`);
    for (let i = 0; i < elements.length; ) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();

      if (elementText === this.mainName) {
        await elementHandle.click();
        elements = await this.page.$$(`body >> text=${this.mainName}`);
        await this.page.waitForTimeout(constants.timeOuts.timeL);
      } else {
        i++;
      }
    }
  }

  // --------------------- Fill General Form ---------------------
  async formCBGeneral(name) {
    await this.page.locator(this.generalFormName).fill(name);
    await this.page.locator(this.generalFormIdentifier).click();
  }

  // --------------------- Choose Sub Content Brick State ---------------------
  async chooseCBState() {
    await this.page.locator(this.stateBoxDiv).locator(this.comboboxSCBstate).click();
    await this.page.locator(this.stateModal).locator(this.stateDraft).click();
    await this.page.locator(this.tabMenuHeader).locator(this.saveSCBbutton).click();
    await constants.requestAssert(this.page, constants.subcbRequest, constants.statusCode200);
  }

  // --------------------- Check and Delete Created Sub Content Brick ---------------------
  async checkCreatedSCB() {
    await this.page.locator(this.definitionsTab).click();
    await this.page.locator(this.contentBricksTab).click();
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
