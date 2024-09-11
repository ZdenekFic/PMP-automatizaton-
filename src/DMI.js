// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------
const { expect } = require("@playwright/test");
const constants = require("./constants");

// -------------------------------------------------------------------------------------
// Class Definition: DMI
// -------------------------------------------------------------------------------------
exports.DMI = class DMI {
  constructor(page, ddmName) {
    this.page = page;
    this.ddmName = ddmName;
    this.tbody = "tbody";

    // --------------------- Navigation Selectors ---------------------
    this.dmisTab = '[ui-test-data="nav-domain-model-instances"]';
    this.dmisAddButton = 'a[ui-test-data="overview-header-add-btn"]';
    this.overviewHeader = '[ui-test-data="overview-header-add-btn"]';
    this.checkItem = "button.v-btn--disabled";

    // --------------------- Initialization Objects ---------------------
    this.tableItem = ".v-simple-checkbox";
    this.generalTab =
      ".v-icon.notranslate.mdi.mdi-certificate.theme--light.red--text";
    this.dataModelTab =
      ".v-icon.notranslate.mdi.mdi-database.theme--light.red--text";
    this.exportButton =
      ".v-icon.notranslate.v-icon--dense.mdi.mdi-file-export-outline.theme--light.info--text";

    // --------------------- General Form Objects ---------------------
    this.generalFormName =
      'label.v-label.v-label--active.theme--light:has-text("Name")';
    this.modalWindow = '.v-card__actions button:has-text("Yes")';

    // --------------------- Data Model Objects ---------------------
    this.tree = ".el-tree.el-tree--highlight-current";
    this.expectedDGL =
      ".v-icon.notranslate.mdi.mdi-cube-scan.theme--light.pr-1";
    this.dataModelTitleBar = ".entity-detail-card.v-card.v-sheet.theme--light";
    this.stateBox = ".v-input__control";

    // --------------------- Save General Form ---------------------
    this.saveGreenButton =
      ".v-icon.notranslate.v-icon--dense.mdi.mdi-content-save.theme--light.success--text";

    // --------------------- Save Data Model ---------------------
    this.saveArea = "header.v-toolbar.v-toolbar--dense.v-toolbar--floating";
    this.dataModelMenuObjectsSaveAll = "button.v-btn:has(.mdi-content-save)";
    this.succesMessage = ".v-snack__wrapper.v-sheet.theme--dark.success";
    this.activeState = '.status-chip-text:has-text("Active")';
    this.repairModeButton =
      ".v-icon.notranslate.v-icon--dense.mdi.mdi-tools.theme--light.error--text";
    this.fieldsModal = "div.v-dialog.v-dialog--active.v-dialog--persistent";

    // --------------------- Start Project Selectors ---------------------
    this.toolbarContent = ".v-toolbar__content";
    this.newProjectButton = "button:has(.mdi-cube)";
    this.newProjectNameInput = '[ui-test-data="new-project-name-input"]';
    this.fieldsModalButton =
      ".error.v-btn.v-btn--text.theme--light.v-size--default";
    this.arrowDownButton = ".mdi-arrow-expand-down";
    this.pbbTree = ".pbb-tree";
  }

  // -------------------------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------------------------

  // --------------------- Enter Domain Data Models ---------------------
  async enterToDMI() {
    await this.page.locator(this.dmisTab).click();
    await this.page.waitForSelector(this.overviewHeader);
  }

  // --------------------- Fill General Form ---------------------
  async generalForm(name) {
    await this.page.locator(this.dmisAddButton).click();
    await this.page.waitForTimeout(constants.timeOuts.timeM);
    await this.page.waitForSelector(this.checkItem);

    await this.page.locator(this.tbody).locator(this.tableItem).click();
    await this.page.locator(this.generalTab).click();
    await this.page.waitForSelector(this.generalFormName);
    await this.page.locator(this.generalFormName).clear();
    await this.page.locator(this.generalFormName).fill(name);

    await this.page.locator(this.saveGreenButton).click();
    expect(await this.page.locator(this.modalWindow)).toBeVisible();

    await this.page.locator(this.modalWindow).click();
    await this.page.waitForSelector(this.succesMessage);
    await this.page.waitForSelector(this.exportButton);
  }

  // --------------------- Data Model Check ---------------------
  async dataModelCheck() {
    expect(
      await this.page.locator(this.tree).locator(this.expectedDGL)
    ).toBeVisible();

    await this.page
      .locator(this.dataModelTitleBar)
      .locator(this.stateBox)
      .click();
    await expect(this.page.locator(this.activeState).first()).toBeVisible();

    await this.page.locator(this.activeState).first().click();
    await this.page.locator(this.saveGreenButton).click();
    await this.page.waitForSelector(this.succesMessage);
    await expect(this.page.locator(this.repairModeButton)).toBeVisible();
  }
  
  // --------------------- Start project ---------------------
  async startProject(name) {
    await this.page
      .locator(this.toolbarContent)
      .locator(this.newProjectButton)
      .click();
    await this.page.waitForSelector(this.newProjectNameInput);
    await this.page.locator(this.newProjectNameInput).fill(name);
    await this.page
      .locator(this.fieldsModal)
      .locator(this.fieldsModalButton)
      .click();
    await this.page.waitForSelector(this.succesMessage);

    await this.page.waitForSelector(this.arrowDownButton);
    await expect(this.page.locator(this.pbbTree)).toBeVisible();
  }
};
