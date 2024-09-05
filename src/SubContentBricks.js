const constants = require("./constants");

exports.SubContentBricks = class SubContentBricks {
  constructor(page, dropdownElement, mainName, labelName) {
    this.page = page;
    this.mainName = mainName;
    this.dropdownElement = dropdownElement;

    //SCB enter
    this.definitionsTab = '[ui-test-data="nav-definitions"]';
    this.contentBricksTab =
      '[ui-test-data="nav-definitions-sub-content-bricks"]';
    this.overviewHeader = '[ui-test-data="overview-header-add-btn"]';
    this.addButton = 'a[ui-test-data="overview-header-add-btn"]';
    this.titleHeader = ".pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-7.col-xl-7";

    //SCB general form
    this.generalFormName = `.v-input:has(label:has-text("${labelName}")) input[type="text"]`;
    this.generalFormIdentifier = "body";

    // Overview table
    this.overviewTable =
      ".v-data-table.overview-table.pmtool-table.v-data-table--dense.theme--light";
    // Fields objects
    this.addFieldButton = 'button.v-btn:has-text("Add")';
    this.fieldsModal = "div.v-dialog.v-dialog--active.v-dialog--persistent";
    this.fieldNameInput = 'input[autofocus="autofocus"][type="text"]';

    this.fieldIdentifier = 'button[aria-label="Identifier appended action"]';
    this.fieldDataTypeButton =
      "div.v-input__icon.v-input__icon--append .mdi-menu-down";
    this.fieldsMultiElement = 'input[type="text"]';
    this.elementDropdown = `.v-list-item__title:has-text('${dropdownElement}')`;
    this.bottomModal = ".v-card__actions";
    this.modalButtonAdd = "button";

    //draft, active, suspended combobox
    this.stateBoxDiv = ".entity-detail-card.v-card.v-sheet.theme--light";
    this.comboboxSCBstate =
      "div.v-input__icon.v-input__icon--append .mdi-menu-down";
    this.stateModal =
      'div.v-list.v-select-list.v-sheet.theme--light.v-list--dense[role="listbox"]';
    this.stateDraft = 'text="Draft"';
    this.tabMenuHeader = ".detail-tab-menu-header-container";
    this.saveSCBbutton = ".v-toolbar__content button:has(.mdi-content-save)";

    // deleting objects
    this.deleteDraftButtton = 'button[ui-test-data="delete-btn"].red--text';
    this.modalDeleteButton = 'button[ui-test-data="delete-confirm-btn"]';
    this.succesMessage = '.v-snack__wrapper.v-sheet.theme--dark.success';
  }

  async enterToCB() {
    //click on Definitons tab
    await this.page.locator(this.definitionsTab).click();

    //click on Definitions/Content Bricks TAB
    await this.page.locator(this.contentBricksTab).click();
    await this.page.waitForSelector(this.overviewHeader);
  }

  async addNewCB() {
    //click on ADD button
    await this.page.locator(this.addButton).click();
    await this.page.waitForSelector(this.titleHeader);
  }

  async enterToCBDetail() {
    // this function helps to find our searched element by the name, so if there is a match, function will click it.
    let elements = await this.page.$$(`body >> text=${this.mainName}`);
    for (let i = 0; i < elements.length; ) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();

      if (elementText === this.mainName) {
        await elementHandle.click();

        // Fetch the latest elements after the deletion
        elements = await this.page.$$(`body >> text=${this.mainName}`);
        await this.page.waitForTimeout(constants.timeOuts.timeL);

        // No need to reset the index, as the loop will check the updated elements
      } else {
        // Increment the index only if no deletion occurred
        i++;
      }
    }
  }

  async formCBGeneral(name) {
    //click and fill name
    await this.page.locator(this.generalFormName).fill(name);

    //click on identifier to get automaticaly identifier
    await this.page.locator(this.generalFormIdentifier).click();
  }

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
    await constants.requestAssert(this.page, constants.subcbRequest, constants.statusCode200);
  }

  async checkCreatedSCB() {
    //this function helps to find content brick which was created by this test so in the end there wont be any duplicities
    //click on Definitions tab
    await this.page.locator(this.definitionsTab).click();

    //click on Definitions/Content Bricks TAB
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

        // Fetch the latest elements after the deletion
        elements = await this.page.$$(`body >> text=${this.mainName}`);
        await this.page.waitForTimeout(constants.timeOuts.timeL);

        // No need to reset the index, as the loop will check the updated elements
      } else {
        // Increment the index only if no deletion occurred
        i++;
      }
    }
  }
};
