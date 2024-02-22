const exp = require("constants");
const { baseURL, scbName, timeOuts } = require("../constants");
const { expect } = require("@playwright/test");

exports.SubContentBricks = class SubContentBricks {
  constructor(page, dropdownElement, mainName) {
    this.page = page;
    this.mainName = mainName;
    this.dropdownElement = dropdownElement;
    this.definitionsTab = page.locator('div[ui-test-data="nav-definitions"]');
    this.subContentBricksTab = page.locator('span[ui-test-data="nav-definitions-sub-content-bricks"]')
    this.addButton = page.locator('a[ui-test-data="overview-header-add-btn"]');
    
    this.generalFormName = page.getByLabel("Name", { exact: true });
    this.generalFormIdentifier = page.getByLabel("Identifier", { exact: true });
    
    // Domains
    this.domainsSelect = page.locator('.v-input__append-inner .v-input__icon.v-input__icon--append i.mdi.mdi-menu-down');
    this.domainsListBox = page.locator('div.v-list.v-select-list[data-v-320c660f]');
    this.domainsItem = this.domainsListBox.locator('.v-list-item[role="option"]');
    // Tags and Search ids
    this.inputArea = 'div.row[data-v-320c660f]';
    this.redArrow = page.locator(
      'button[ui-test-data="upload-btn"]'
    );
    this.modalWindow = page.locator('div.v-card.v-sheet.theme--light[data-v-516a0fde]');
    this.item = "//tr/td[1]";
    this.buttonUpdate = page.locator('button[ui-test-data="update-btn"]');

    
   
    // Fields objects
    this.addFieldButton = page.locator(
      "(//button[@class='mt-3 v-btn theme--light elevation-2 v-size--default'])[1]"
    );
    this.fieldNameInput = page.locator(
      "(//div[@class='col col-3'])[1] >> text='Name'"
    );
    this.fieldIdentifier = page.locator(
      "//div[@class='col col-3']//div[@class='v-input theme--light v-text-field v-text-field--is-booted']//input"
    );
    this.fieldDataTypeButton = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']//div[@class='v-select__slot']"
    );
    this.elementDropdown = page.locator(
      `.v-list-item__title:has-text('${dropdownElement}')`
    );
    this.switchIsMandatory = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']//div[@class='v-input--selection-controls__ripple']"
    );
    this.uniteTypeRedArrowButton = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[4]"
    );
    this.uniteTypeFirstObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//tbody/tr[2]/td[1]"
    );
    this.uniteTypeFirstUpdateButton = page.locator(
      "//span[normalize-space()='Update Unit Type']"
    );
    this.unitRedArrowButton = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[5]"
    );
    this.uniteFirstObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//tbody/tr[1]/td[1]"
    );
    this.uniteUpdateButton = page.locator(
      "//span[normalize-space()='Update Unit']"
    );
    this.fieldAddButton = page.locator(
      "//button[@class='error v-btn v-btn--flat v-btn--text theme--light v-size--default']//span[@class='v-btn__content'][normalize-space()='Add']"
    );

    //draft, active, suspended combobox
    this.comboboxSCBstate = page.getByRole("combobox").nth(1);
    this.stateDraft = page.locator(
      " //div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//span[@class='status-chip-text'][normalize-space()='Draft']"
    );
    this.saveSCBbutton = page.locator(
      "//div[@class='detail-tab-menu-header-container']//button[2]"
    );

    // assertions objects
    this.areaOfCbs = page.locator(
      `//span[@ui-test-data='overview-definitions-content-brick-grid-name']`
    );
    this.deleteDraftButtton = page.locator(
      "//div[@class='entity-detail-card v-card v-sheet theme--light']//i[@class='v-icon notranslate mdi mdi-delete theme--light']"
    );
    this.modalDeleteButton = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']//span[normalize-space()='Delete']"
    );
  }

  async enterToSCB() {
    //click on Definitons tab
    await this.definitionsTab.click();

    //click on Definitions/Sub Content Bricks TAB
    await this.subContentBricksTab.click();

    //click on ADD button
    await this.addButton.click();
  }

  async formSCB_General(name) {
    //click and fill name
    await this.generalFormName.fill(name);
    await expect.soft(this.generalFormName).not.toBeEmpty();

    //click on identifier to get automaticaly identifier
    await this.generalFormIdentifier.click();
    await expect.soft(this.generalFormIdentifier).not.toBeEmpty();

    //DOMAINS
    await this.domainsSelect.nth(3).click();
    await expect(this.domainsListBox).toBeVisible();
    await this.domainsItem.nth(1).click();
    await this.domainsItem.nth(2).click();

    
    //TAGS
    // add tags
    await this.redArrow.nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item).nth(1).click();
    await this.modalWindow.locator(this.item).nth(3).click();
    await this.modalWindow.locator(this.item).nth(5).click();
    await this.modalWindow.locator(this.item).nth(6).click();
    await this.modalWindow.locator(this.item).nth(2).click();
    
    await this.buttonUpdate.click();

    // validation
    
    const tagsInputElements =await  this.page.locator(this.inputArea.nth(3)).locator(".v-select__slot");

    // Získejte počet span prvků v celém prvku
    const tagsSpanCount = await tagsInputElements
      .locator("span.v-chip__content")
      .count();

    // Ověřte, že počet span prvků je alespoň jeden
    await expect(tagsSpanCount).toBeGreaterThanOrEqual(5);
    console.log(tagsSpanCount);

    
    //SEARCH Identifiers
    // add search identifiers
    await this.redArrow.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.nth(1).locator(this.item).nth(1).click();
    await this.modalWindow.nth(1).locator(this.item).nth(2).click();
    await this.modalWindow.nth(1).locator(this.item).nth(3).click();
    

    await this.buttonUpdate.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);

    
    // validation
    
    const wholeElement =await this.inputArea.nth(4).locator(".v-select__slot");

    // Získejte počet span prvků v celém prvku
    const spanCount = await wholeElement
      .locator("span.v-chip__content")
      .count();

    // Ověřte, že počet span prvků je alespoň jeden
    await expect(spanCount).toBeGreaterThanOrEqual(3);
    console.log(spanCount);
  }

  async add_fields(name) {
    await this.addFieldButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.fieldNameInput.fill(name);
    await this.fieldIdentifier.click();
    await this.fieldDataTypeButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.elementDropdown.click();
    await this.switchIsMandatory.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.uniteTypeRedArrowButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.uniteTypeFirstObject.click();
    await this.uniteTypeFirstUpdateButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.unitRedArrowButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.uniteFirstObject.click();
    await this.uniteUpdateButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.fieldAddButton.click();
  }

  async chooseSCBState() {
    await this.comboboxSCBstate.click();
    await this.stateDraft.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.saveSCBbutton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
  }

  async checkCreatedSCB() {
    //click on Definitons tab
    await this.definitionsTab.click();

    //click on Definitions/Sub Content Bricks TAB
    await this.subContentBricksTab.click();
    await this.page.waitForTimeout(timeOuts.timeXXL);

    let elements = await this.page.$$(`body >> text=${this.mainName}`);

    for (let i = 0; i < elements.length; i++) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();

      if (elementText === this.mainName) {
        await elementHandle.click();
        await this.deleteDraftButtton.click();
        await this.modalDeleteButton.click();
        await this.page.waitForTimeout(timeOuts.timeL);

        // Fetch the latest elements after the deletion
        elements = await this.page.$$(`body >> text=${this.mainName}`);
        await this.page.waitForTimeout(timeOuts.timeL);

        // Reset the index to recheck the elements
        i = -1;
      }
    }
  }
};
