const { expect } = require("@playwright/test");
const { timeOuts } = require("../constants");
const { requestAssert } = require("../constants");
const constants = require("../constants");

exports.DDM = class DDM {
  constructor(page, ddmName) {
    this.page = page;
    this.ddmName = ddmName;
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.domainModelsTab = '[ui-test-data="nav-definitions-data-models"]';
    this.domainModelsAddButton = 'a[ui-test-data="overview-header-add-btn"]';
    this.overviewHeader = '[ui-test-data="overview-header-add-btn"]';
    this.titleHeader = ".pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-7.col-xl-7";

    //general Form objects
    this.generalFormNameArea = ".col.col-12";
    this.generalFormName = 'input[type="text"]';

    //save general form
    this.saveGreenButton =
      'button[aria-haspopup="true"][aria-expanded="false"] .mdi-content-save';

   // Data model objects
    this.navBar = 'div.detail-tab-menu-header-container[role="tab"]';
    this.dataModelTab = '.v-tab.v-tab--active[role="tab"]';
    this.treeSelector = '[role="tree"]';
    this.dataModelThreeDotsButton = '.mdi-dots-vertical';
    this.dataModelMenuObjects = 'div[role="menu"].v-menu__content.theme--light.menuable__content__active';
    this.buttonItem = 'button[type="button"]';
    this.dataModelMenuObjectsB = "div.v-list.v-sheet.theme--light[data-v-2bf3179e]";
    this.dataModelMenuObjectsContainterButton = ".v-list-item theme--light";
    this.dataModelMenuObjectsContainter = "div.el-tree-node__content";
    this.dataModelMenuObjectsContainterName = '.v-text-field__slot input[type="text"][autofocus="autofocus"]';
    this.dataModelMenuObjectsIdentifierButton = "body";
    this.dataModelMenuGDMModalFilter = 'button.v-expansion-panel-header:has-text("Filter")';
    this.dataModelGDMdomains = '.v-input__slot[role="button"][aria-haspopup="listbox"]';
    this.gdmDomainsItem = 'text=Test Domain';
    this.dataModelMenuObjectsGDMConfirm = 'button[ui-test-data="add-btn"]';
    this.firstObjectGDMTable = "//tbody/tr[2]/td[1]";
    this.buttonNodeSelectionGDM = 'div.v-card__title[ui-test-data="dialog-header"] .v-tab[role="tab"]';

    // add CB
    this.cbDomain = 'div[role="combobox"][aria-haspopup="listbox"].v-input__slot';
    this.dataModelMenuObjectsCBFirstObject = 'div.v-data-table.v-data-table--dense.theme--light[ui-test-data="items-table"] //tr/td[1]';

    // save data model
    this.saveArea = "header.v-toolbar.v-toolbar--dense.v-toolbar--floating";
    this.dataModelMenuObjectsSaveAll = 'button.v-btn--icon[role="button"]';

    //save data model
    this.saveArea =
      "header.v-toolbar.v-toolbar--dense.v-toolbar--floating"
    ;
    this.dataModelMenuObjectsSaveAll = 
      'button.v-btn:has(.mdi-content-save)';
    

    ///Delete part
    //delete ddm draft
    this.deleteDraftButtton = 
      'button[ui-test-data="delete-btn"].red--text'
    ;
    this.modalDeleteButton = 
      'button[ui-test-data="delete-confirm-btn"]'
    ;
    this.searchBarInput = "input[ui-test-data='top-bar-search']";
    this.searchedObject = 
      `div.v-list-item:has-text("${ddmName}")`
    ;
  }

  async enterToDDM() {
    // go to definition
    await this.page.locator(this.definitionsTab).click();

    // click on domain models
    await this.page.locator(this.domainModelsTab).click();
    await this.page.waitForSelector(this.overviewHeader);
  }

  async generalForm(name, containerName,treeValueText) {
    // click on ADD button
    await this.page.locator(this.domainModelsAddButton).click();
    await this.page.waitForSelector(this.titleHeader);

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
    await this.page.locator(this.dataModelThreeDotsButton).nth(1).click();
    await expect(this.page.locator(this.dataModelMenuObjects)).toBeVisible();
    
    //add container to tree
    await this.page.locator(this.dataModelMenuObjects).locator(this.buttonItem).first().click();
    await expect(this.page.locator(this.dataModelMenuObjectsContainter).nth(1)).toBeVisible();
 
    //check of name for  defaultcontainer
    await expect(this.page.locator(this.dataModelMenuObjectsContainterName).nth(1)).toHaveValue(treeValueText);
    //delete default value
    await this.page.locator(this.dataModelMenuObjectsContainterName).nth(1).clear();
    //fill in our name
    await this.page.locator(this.dataModelMenuObjectsContainterName).nth(1).fill(containerName);
    //click to get automated identifier
    await this.page.locator(this.dataModelMenuObjectsIdentifierButton).click();
   
    await this.page.locator(this.saveArea).locator(this.dataModelMenuObjectsSaveAll);
     

    
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
