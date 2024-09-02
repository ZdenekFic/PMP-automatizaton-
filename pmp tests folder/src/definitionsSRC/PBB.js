const {
  requestAssert,
  pbbRequest,
  statusCode200,
  statusCode201,
} = require("../constants");
const { baseURL, timeOuts } = require("../constants");
const { expect } = require("@playwright/test");

exports.PBB = class PBB {
  constructor(page, pbbName, itemName) {
    this.page = page;
    this.pbbName = pbbName;
    this.itemName = itemName;

    //enter to PBB function - objects
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.pbbTab = '[ui-test-data="nav-definitions-pbb"]';
    this.addButton = '[ui-test-data="overview-header-add-btn"]';
    this.titleHeader = ".pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-7.col-xl-7";

    //general form function - objects
    this.inputName = 'input[ui-test-data="pbb-name-input"]';
    this.pbbTypeDropdown = 'div[ui-test-data="pbb-type-input"]';
    this.pbbTypeStartPBB =
      'div.v-list-item.v-list-item--link.theme--light:has-text("Start PBB")';
    this.pbbTypeNormalPBB =
      'div.v-list-item.v-list-item--link.theme--light:has-text("Normal PBB")';

    // input for text to describe PBB
    this.descriptionPBB = '.ql-editor.ql-blank[contenteditable="true"]';
    this.descriptionCheck = 'p[role="paragraph"]';

    this.fieldsModal = "div.v-dialog.v-dialog--active.v-dialog--persistent";
    this.rowSelector = '.row.minimum-space';
    this.minimumSpaceSelector = '.minimum-space.pt-5.col-md-8.col-12';
    this.inputSelector = '.v-input.theme--light.v-text-field.v-text-field--is-booted.v-select.v-autocomplete';
    this.testingDDMItem = `span.gates-list-pbb-code:has-text("${itemName}")`
    this.updateButton = '[ui-test-data="update-btn"]';

    // add value to planned cost
    this.plannedCost = 'input[aria-label="Planned Cost"]';

    // currency dropdown
    this.currencyDropdown = 'input[aria-label="Currency"]';

    // project wizard expert Mode
    this.projectWizardSwitch =
      'input[type="checkbox"][role="switch"][ui-test-data="project-wizard-expert-mode-switch"]';

    // deactive switch Contains task
    this.containsTaskSwitch =
      'input[type="checkbox"][role="switch"][ui-test-data="contains-task-switch"]';

    this.showInReports =
      'input[type="checkbox"][role="switch"][ui-test-data="showInReport-task-switch"]';

    // save button
    this.saveGreenButton = '[ui-test-data="save-btn"]';

    // check and delete
    this.deleteDraftButtton = 'button[ui-test-data="delete-btn"].red--text';
    this.modalDeleteButton = 'button[ui-test-data="delete-confirm-btn"]';
    
  }
  // FUNCTIONS part

  async enterToPBB() {
    //click on Definitons tab
    await this.page.locator(this.definitionsTab).click();

    //click on Definitions/Content Bricks TAB
    await this.page.locator(this.pbbTab).click();
    await this.page.waitForSelector(this.addButton);
  }

  async makroLevelName(pbbName) {
    //click on ADD button
    await this.page.locator(this.addButton).click();

    //filling a name
    await this.page.locator(this.inputName).fill(pbbName);

    const inputValue = await this.page.locator(this.inputName).inputValue();
    await expect(inputValue).toBe(pbbName);
  }

  async makroLevelPbbType() {
    //click on dropdown to choose type of PBB

    await this.page.locator(this.pbbTypeDropdown).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.page.locator(this.pbbTypeStartPBB).click();
  }

  async makroLevelPbbTypeNormal() {
    //click on dropdown to choose type of PBB
    await this.page.locator(this.pbbTypeDropdown).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.page.locator(this.pbbTypeNormalPBB).click();
  }

  async makroLevelDescription(text) {
    // add description
    await this.page.locator(this.descriptionPBB).fill(text);
  }

  async makroLevelDefaultDDM() {
    //add Default DDM
    await this.page
    .locator(this.rowSelector)
    .locator(this.minimumSpaceSelector)
    .locator(this.inputSelector)
    .dblclick();
    await this.page.locator(this.fieldsModal).locator(this.testingDDMItem).click();
    await this.page.locator(this.fieldsModal).locator(this.updateButton).click();
  }

  async makroLevelSave() {
    //save PBB
    await this.page.locator(this.saveGreenButton).click();
    
  }

  async requestSaveAssert() {
    await requestAssert(this.page, pbbRequest, statusCode201);
  }

  async checkAndDelete() {
    await this.enterToPBB();
    

    let elements = await this.page.$$(`body >> text=${this.pbbName}`);

    for (let i = 0; i < elements.length; i++) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();
      console.log(elementText);

      if (elementText === this.pbbName) {
        await this.page.waitForTimeout(timeOuts.timeM);
        await elementHandle.click();
        await this.page.locator(this.deleteDraftButtton).click();
        await this.page.locator(this.modalDeleteButton).click();
        await this.page.waitForTimeout(timeOuts.timeL);

        // Fetch the latest elements after the deletion
        elements = await this.page.$$(`body >> text=${this.pbbName}`);
        await this.page.waitForTimeout(timeOuts.timeL);

        // Reset the index to recheck the elements
        i = -1;
      }
    }
  }
};
