// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------

const { expect } = require("@playwright/test");
const constants = require("./constants");

// -------------------------------------------------------------------------------------
// Class Definition: DDM
// -------------------------------------------------------------------------------------
exports.DDM = class DDM {
  constructor(page, ddmName, dataModelContainerText) {
    this.page = page;
    this.ddmName = ddmName;

    // --------------------- Navigation Selectors ---------------------
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.domainModelsTab = '[ui-test-data="nav-definitions-data-models"]';
    this.domainModelsAddButton = 'a[ui-test-data="overview-header-add-btn"]';
    this.overviewHeader = '[ui-test-data="overview-header-add-btn"]';
    this.checkItem = "button.v-btn--disabled";

    // --------------------- General Form Objects ---------------------
    this.generalFormNameArea = ".col.col-12";
    this.generalFormName = 'input[type="text"]';

    // --------------------- Save General Form ---------------------
    this.saveGreenButton = 'button[aria-haspopup="true"][aria-expanded="false"] .mdi-content-save';

    // --------------------- Data Model Objects ---------------------
    this.treeSelector = '[role="tree"]';
    this.dataModelThreeDotsButton = ".mdi-dots-vertical";
    this.dataModelMenuObjects = 'div[role="menu"].v-menu__content.theme--light.menuable__content__active';
    this.buttonItem = ".v-icon.notranslate.mdi.mdi-folder.theme--light";
    this.dataModelMenuObjectsContainter = `span.order-2:has-text("${dataModelContainerText}")`;
    this.identifierCheck = "body";

    // --------------------- Save Data Model ---------------------
    this.saveArea = "header.v-toolbar.v-toolbar--dense.v-toolbar--floating";
    this.dataModelMenuObjectsSaveAll = 'button.v-btn:has(.mdi-content-save)';

    // --------------------- Delete DDM Draft ---------------------
    this.deleteDraftButtton = 'button[ui-test-data="delete-btn"].red--text';
    this.modalDeleteButton = 'button[ui-test-data="delete-confirm-btn"]';
    this.searchBarInput = "input[ui-test-data='top-bar-search']";
    this.searchedObject = `div.v-list-item:has-text("${ddmName}")`;
  }

  // --------------------- Enter Domain Data Models ---------------------
  async enterToDDM() {
    await this.page.locator(this.definitionsTab).click();
    await this.page.locator(this.domainModelsTab).click();
    await this.page.waitForSelector(this.overviewHeader);
  }

  // --------------------- Fill General Form ---------------------
  async generalForm(name) {
    await this.page.locator(this.domainModelsAddButton).click();
    await this.page.waitForSelector(this.checkItem);

    await this.page
      .locator(this.generalFormNameArea)
      .locator(this.generalFormName)
      .first()
      .fill(name);

    await this.page.locator(this.saveGreenButton).click();

    await constants.requestAssert(
      this.page,
      constants.ddmRequest,
      constants.statusCode201
    );

    // --------------------- Data Model Tab Actions ---------------------
    await this.page
      .locator(this.saveArea)
      .locator(this.dataModelMenuObjectsSaveAll);
  }

  // --------------------- Check and Delete Searched Object ---------------------
  async checkAndDelete(searchedText) {
    await this.page.locator(this.searchBarInput).fill(searchedText);
    await this.page.waitForTimeout(constants.timeOuts.timeXL);

    if (await this.page.locator(this.searchedObject).isVisible()) {
      await this.page.locator(this.searchedObject).click();
      await this.page.waitForTimeout(constants.timeOuts.timeM);
      await this.page.locator("body").click();

      await this.page.locator(this.deleteDraftButtton).click();
      await this.page.locator(this.modalDeleteButton).click();
    }
  }
};
