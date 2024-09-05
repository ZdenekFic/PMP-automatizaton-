// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

const constants = require("./constants");
const { expect } = require("@playwright/test");

// -------------------------------------------------------------------------------------
// Class Definition: PBB
// -------------------------------------------------------------------------------------
exports.PBB = class PBB {
  constructor(page, pbbName, itemName) {
    this.page = page;
    this.pbbName = pbbName;
    this.itemName = itemName;

    // --------------------- Navigation Selectors ---------------------
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.pbbTab = '[ui-test-data="nav-definitions-pbb"]';
    this.addButton = '[ui-test-data="overview-header-add-btn"]';
    this.titleHeader = ".pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-7.col-xl-7";

    // --------------------- General Form Selectors ---------------------
    this.inputName = 'input[ui-test-data="pbb-name-input"]';
    this.pbbTypeDropdown = 'div[ui-test-data="pbb-type-input"]';
    this.pbbTypeStartPBB = 'div.v-list-item.v-list-item--link.theme--light:has-text("Start PBB")';
    this.pbbTypeNormalPBB = 'div.v-list-item.v-list-item--link.theme--light:has-text("Normal PBB")';

    // --------------------- Description Input ---------------------
    this.descriptionPBB = '.ql-editor.ql-blank[contenteditable="true"]';
    this.descriptionCheck = 'p[role="paragraph"]';

    // --------------------- Fields Selectors ---------------------
    this.fieldsModal = "div.v-dialog.v-dialog--active.v-dialog--persistent";
    this.rowSelector = ".row.minimum-space";
    this.minimumSpaceSelector = ".minimum-space.pt-5.col-md-8.col-12";
    this.inputSelector = ".v-input.theme--light.v-text-field.v-text-field--is-booted.v-select.v-autocomplete";
    this.testingDDMItem = `span.gates-list-pbb-code:has-text("${itemName}")`;
    this.updateButton = '[ui-test-data="update-btn"]';

    // --------------------- Planned Cost and Currency ---------------------
    this.plannedCost = 'input[aria-label="Planned Cost"]';
    this.currencyDropdown = 'input[aria-label="Currency"]';

    // --------------------- Switch Selectors ---------------------
    this.projectWizardSwitch = 'input[type="checkbox"][role="switch"][ui-test-data="project-wizard-expert-mode-switch"]';
    this.containsTaskSwitch = 'input[type="checkbox"][role="switch"][ui-test-data="contains-task-switch"]';
    this.showInReports = 'input[type="checkbox"][role="switch"][ui-test-data="showInReport-task-switch"]';

    // --------------------- Save Button ---------------------
    this.saveGreenButton = '[ui-test-data="save-btn"]';

    // --------------------- Delete Selectors ---------------------
    this.deleteDraftButtton = 'button[ui-test-data="delete-btn"].red--text';
    this.modalDeleteButton = 'button[ui-test-data="delete-confirm-btn"]';
  }

  // -------------------------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------------------------

  // --------------------- Enter PBB Section ---------------------
  async enterToPBB() {
    await this.page.locator(this.definitionsTab).click();
    await this.page.locator(this.pbbTab).click();
    await this.page.waitForSelector(this.addButton);
  }

  // --------------------- Fill PBB Name ---------------------
  async makroLevelName(pbbName) {
    await this.page.locator(this.addButton).click();
    await this.page.locator(this.inputName).fill(pbbName);

    const inputValue = await this.page.locator(this.inputName).inputValue();
    await expect(inputValue).toBe(pbbName);
  }

  // --------------------- Select Start PBB Type ---------------------
  async makroLevelPbbType() {
    await this.page.locator(this.pbbTypeDropdown).click();
    await this.page.waitForTimeout(constants.timeOuts.timeM);
    await this.page.locator(this.pbbTypeStartPBB).click();
  }

  // --------------------- Select Normal PBB Type ---------------------
  async makroLevelPbbTypeNormal() {
    await this.page.locator(this.pbbTypeDropdown).click();
    await this.page.waitForTimeout(constants.timeOuts.timeM);
    await this.page.locator(this.pbbTypeNormalPBB).click();
  }

  // --------------------- Add Description ---------------------
  async makroLevelDescription(text) {
    await this.page.locator(this.descriptionPBB).fill(text);
  }

  // --------------------- Add Default DDM ---------------------
  async makroLevelDefaultDDM() {
    await this.page
      .locator(this.rowSelector)
      .locator(this.minimumSpaceSelector)
      .locator(this.inputSelector)
      .dblclick();
    await this.page
      .locator(this.fieldsModal)
      .locator(this.testingDDMItem)
      .click();
    await this.page
      .locator(this.fieldsModal)
      .locator(this.updateButton)
      .click();
  }

  // --------------------- Save PBB ---------------------
  async makroLevelSave() {
    await this.page.locator(this.saveGreenButton).click();
  }

  // --------------------- Save Request Assertion ---------------------
  async requestSaveAssert() {
    await constants.requestAssert(this.page, constants.pbbRequest, constants.statusCode201);
  }

  // --------------------- Check and Delete PBB ---------------------
  async checkAndDelete() {
    await this.enterToPBB();

    let elements = await this.page.$$(`body >> text=${this.pbbName}`);

    for (let i = 0; i < elements.length; i++) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();

      if (elementText === this.pbbName) {
        await this.page.waitForTimeout(constants.timeOuts.timeM);
        await elementHandle.click();
        await this.page.locator(this.deleteDraftButtton).click();
        await this.page.locator(this.modalDeleteButton).click();
        await this.page.waitForTimeout(constants.timeOuts.timeL);

        // Fetch the latest elements after the deletion
        elements = await this.page.$$(`body >> text=${this.pbbName}`);
        await this.page.waitForTimeout(constants.timeOuts.timeL);

        // Reset the index to recheck the elements
        i = -1;
      }
    }
  }
};
