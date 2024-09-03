const { expect } = require("@playwright/test");
const { timeOuts } = require("../constants");
const { requestAssert } = require("../constants");
const constants = require("../constants");

exports.DDM = class DDM {
  constructor(page, ddmName, dataModelContainerText) {
    this.page = page;
    this.ddmName = ddmName;
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.domainModelsTab = '[ui-test-data="nav-definitions-data-models"]';
    this.domainModelsAddButton = 'a[ui-test-data="overview-header-add-btn"]';
    this.overviewHeader = '[ui-test-data="overview-header-add-btn"]';
    this.checkItem = "button.v-btn--disabled";

    //general Form objects
    this.generalFormNameArea = ".col.col-12";
    this.generalFormName = 'input[type="text"]';

    //save general form
    this.saveGreenButton =
      'button[aria-haspopup="true"][aria-expanded="false"] .mdi-content-save';

    // Data model objects
    this.treeSelector = '[role="tree"]';
    this.dataModelThreeDotsButton = ".mdi-dots-vertical";
    this.dataModelMenuObjects =
      'div[role="menu"].v-menu__content.theme--light.menuable__content__active';
    this.buttonItem = ".v-icon.notranslate.mdi.mdi-folder.theme--light";
    this.dataModelMenuObjectsContainter = `span.order-2:has-text("${dataModelContainerText}")`;
    this.identifierCheck = "body";

    // save data model
    this.saveArea = "header.v-toolbar.v-toolbar--dense.v-toolbar--floating";
    this.dataModelMenuObjectsSaveAll = 'button.v-btn--icon[role="button"]';

    //save data model
    this.saveArea = "header.v-toolbar.v-toolbar--dense.v-toolbar--floating";
    this.dataModelMenuObjectsSaveAll = "button.v-btn:has(.mdi-content-save)";

    ///Delete part
    //delete ddm draft
    this.deleteDraftButtton = 'button[ui-test-data="delete-btn"].red--text';
    this.modalDeleteButton = 'button[ui-test-data="delete-confirm-btn"]';
    this.searchBarInput = "input[ui-test-data='top-bar-search']";
    this.searchedObject = `div.v-list-item:has-text("${ddmName}")`;
  }

  async enterToDDM() {
    // go to definition
    await this.page.locator(this.definitionsTab).click();

    // click on domain models
    await this.page.locator(this.domainModelsTab).click();
    await this.page.waitForSelector(this.overviewHeader);
  }

  async generalForm(name) {
    // click on ADD button
    await this.page.locator(this.domainModelsAddButton).click();
    await this.page.waitForSelector(this.checkItem);

    // fill the name
    await this.page
      .locator(this.generalFormNameArea)
      .locator(this.generalFormName)
      .first()
      .fill(name);

    //save general form
    await this.page.locator(this.saveGreenButton).click();

    await requestAssert(
      this.page,
      constants.ddmRequest,
      constants.statusCode201
    );

    // DATA MODEL TAB PART
    // click on menu "three dots button"
    await this.page
      .locator(this.treeSelector)
      .locator(this.dataModelThreeDotsButton)
      .click();
    await expect(this.page.locator(this.dataModelMenuObjects)).toBeVisible();

    //add container to tree
    await this.page
      .locator(this.dataModelMenuObjects)
      .locator(this.buttonItem)
      .click();

    await expect(
      this.page.locator(this.dataModelMenuObjectsContainter)
    ).toBeVisible();

    //click to get automated identifier
    await this.page.locator(this.identifierCheck).click();

    await this.page
      .locator(this.saveArea)
      .locator(this.dataModelMenuObjectsSaveAll);
  }

  async checkAndDelete(searchedText) {
    //Click on a searchbar
    await this.page.locator(this.searchBarInput).fill(searchedText);
    await this.page.waitForTimeout(timeOuts.timeXL);

    if (await this.page.locator(this.searchedObject).isVisible()) {
      await this.page.locator(this.searchedObject).click();
      await this.page.waitForTimeout(timeOuts.timeM);
      await this.page.locator("body").click();

      await this.page.locator(this.deleteDraftButtton).click();
      await this.page.locator(this.modalDeleteButton).click();
      await this.page.waitForTimeout(timeOuts.timeL);
    }
  }
};
