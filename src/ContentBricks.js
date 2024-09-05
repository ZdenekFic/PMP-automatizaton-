// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------
const constants = require("./constants");
const { expect } = require("@playwright/test");


// -------------------------------------------------------------------------------------
// Class Definition: ContentBricks
// -------------------------------------------------------------------------------------
exports.ContentBricks = class ContentBricks {
  constructor(page, dropdownElement, mainName, labelName) {
    this.page = page;
    this.mainName = mainName;
    this.dropdownElement = dropdownElement;
    
    // --------------------- Navigation Selectors ---------------------
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.contentBricksTab = '[ui-test-data="nav-definitions-content-bricks"]';
    this.overviewHeader = '[ui-test-data="overview-header-add-btn"]';
    this.addButton = '[ui-test-data="overview-header-add-btn"]';
    
    // --------------------- General Form Selectors ---------------------
    this.titleHeader = ".pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-7.col-xl-7";
    this.generalFormName = `.v-input:has(label:has-text("${labelName}")) input[type="text"]`;
    this.generalFormIdentifier = 'button[type="button"][aria-label="Identifier appended action"]';
    
    // --------------------- Overview Table ---------------------
    this.overviewTable = ".v-data-table.overview-table.pmtool-table.v-data-table--dense.theme--light";
    
    // --------------------- Description Input ---------------------
    this.descriptionCB = ".quillWrapper.cb-description-editor";
    this.descriptionCBtextArea = ".ql-editor";
    
    // --------------------- Group Fields ---------------------
    this.fieldDiv = ".d-inline-flex.align-center";
    this.addGroupButton = "button.mx-3.v-btn.elevation-2";
    this.groupAddButton = "button.error.v-btn.v-btn--text.theme--light";
    
    // --------------------- Field Objects ---------------------
    this.addFieldButton = "button.mx-1.v-btn.elevation-2";
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
    this.deleteDraftButtton = 'button[ui-test-data="delete-btn"]';
    this.modalDeleteButton = 'button[ui-test-data="delete-confirm-btn"]';
    
    // --------------------- Script Tab Objects ---------------------
    this.barDiv = ".v-slide-group__wrapper";
    this.tabScripts = 'text="Scripts"';
    this.scritpTitleAre = ".v-window-item.v-window-item--active";
    this.title = ".v-card__title";
    this.textAreaScript = '[data-testid="textarea"]';
    this.buttonArea = ".v-card__text";
    this.buttonArea2 = ".row.row--dense";
    this.buttonValidate = "button";
    this.succesMessage = '.v-snack__wrapper.v-sheet.theme--dark.success';
  }

  // --------------------- Enter Content Brick ---------------------
  async enterToCB() {
    await this.page.locator(this.definitionsTab).click();
    await this.page.locator(this.contentBricksTab).click();
    await this.page.waitForSelector(this.overviewHeader);
  }

  // --------------------- Add New Content Brick ---------------------
  async addNewCB() {
    await this.page.locator(this.addButton).click();
    await this.page.waitForSelector(this.titleHeader);
  }

  // --------------------- Enter Content Brick Details ---------------------
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

  // --------------------- Script Tab Actions ---------------------
  async scriptTab(tabName, scriptExample) {
    await this.page.locator(this.barDiv).locator(this.tabScripts).click();
    const textTitle = await this.page.locator(this.scritpTitleAre).locator(this.title).textContent();
    expect(textTitle).toContain(tabName);
    await this.page.waitForTimeout(constants.timeOuts.timeM);
    await this.page.locator(this.textAreaScript).first().fill(scriptExample);
    expect(this.page.locator(this.textAreaScript).first()).not.toBeEmpty();
    await this.page.locator(this.buttonArea).locator(this.buttonArea2).locator(this.buttonValidate).first().click();
    await this.page.waitForSelector(this.succesMessage, { visible: true });
  }

  // --------------------- General Form for Content Brick ---------------------
  async formCBGeneral(name, text) {
    await this.page.locator(this.generalFormName).fill(name);
    await this.page.locator(this.generalFormIdentifier).click();
    await this.page.locator(this.descriptionCB).locator(this.descriptionCBtextArea).fill(text);
  }

  // --------------------- Add Groups ---------------------
  async addGroups(name) {
    await this.page.locator(this.addGroupButton).click();
    await this.page.waitForSelector(this.fieldsModal);
    await this.page.locator(this.fieldNameInput).fill(name);
    await this.page.locator(this.fieldsModal).locator(this.fieldIdentifier).click();
    await this.page.locator(this.fieldsModal).locator(this.groupAddButton).click();
  }

  // --------------------- Add Fields ---------------------
  async addFields(name) {
    await this.page.locator(this.fieldDiv).locator(this.addFieldButton).click();
    await this.page.waitForSelector(this.fieldsModal);
    await this.page.locator(this.fieldsModal).locator(this.fieldNameInput).fill(name);
    await this.page.locator(this.fieldsModal).locator(this.fieldIdentifier).click();
    await this.page.locator(this.fieldsModal).locator(this.fieldDataTypeButton).click();
    await this.page.waitForTimeout(constants.timeOuts.timeM);
    await this.page.locator(this.elementDropdown).click();
    await this.page.locator(this.fieldsModal).locator(this.switchIsMandatory).click();
    await this.page.waitForTimeout(constants.timeOuts.timeM);
    await this.page.locator(this.fieldsModal).locator(this.groupAddButton).click();
  }

  // --------------------- Choose Content Brick State ---------------------
  async chooseCBState() {
    await this.page.locator(this.stateBoxDiv).locator(this.comboboxSCBstate).click();
    await this.page.locator(this.stateModal).locator(this.stateDraft).click();
    await this.page.locator(this.tabMenuHeader).locator(this.saveSCBbutton).click();
    await constants.requestAssert(this.page, constants.cbRequest, constants.statusCode200);
    await this.page.waitForSelector(this.succesMessage, { visible: true });
  }

  // --------------------- Check Created Content Brick ---------------------
  async checkCreatedCB() {
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
