// -------------------------------------------------------------------------------------
// Module Imports
// -------------------------------------------------------------------------------------
const { expect } = require("@playwright/test");
const constants = require("./constants");

// -------------------------------------------------------------------------------------
// Class Definition: DMI
// -------------------------------------------------------------------------------------
exports.Report = class Report {
  constructor(page, reportName) {
    this.page = page;
    this.reportName = reportName;
    this.tbody = "tbody";

    // --------------------- Navigation Selectors ---------------------
    this.reportTab = '[ui-test-data="nav-reports"]';
    this.reportAddButton = 'a[ui-test-data="overview-header-add-btn"]';
    this.overviewHeader = '[ui-test-data="overview-header-add-btn"]';
    this.checkItem = ".mdi-certificate";
    this.filterButton = 'button.v-expansion-panel-header:has-text("Filter")';

    // --------------------- Initialization Objects ---------------------

    this.nameInput = 'label:has-text("Report name") + input';
    this.pbbSelect = ".mdi-upload";
    this.modalTitle = '[ui-test-data="dialog-header"]';
    this.modalPBBItem ='.gates-list-pbb-code:has-text("Testing PBB start")';
    ;
    this.modalUpdateButton = '[ui-test-data="update-btn"]';
    this.cellTable = "tbody";
    this.expectedText = ".dx-datagrid-rowsview >> text=Romulus test";
    this.expectedTextTable = ".dx-datagrid-rowsview";
    this.saveSCBbutton = ".v-toolbar__content button:has(.mdi-content-save)";
    this.succesMessage = ".v-snack__wrapper.v-sheet.theme--dark.success";

    // --------------------- Deletion Objects ---------------------
    this.deleteDraftButtton = 'button[ui-test-data="delete-btn"]';
    this.modalDeleteButton = 'button[ui-test-data="delete-confirm-btn"]';
    this.fieldsModal = "div.v-dialog.v-dialog--active.v-dialog--persistent";
  }

  // -------------------------------------------------------------------------------------
  // Methods
  // -------------------------------------------------------------------------------------

  // --------------------- Enter Reports ---------------------
  async enterToReport() {
    // Click on the reports tab
    await this.page.locator(this.reportTab).click();
  
    await this.page.waitForSelector(this.overviewHeader);
  }

  async makeReport() {
    // Click on the button to add a new report
    await this.page.locator(this.reportAddButton).click();
    await this.page.waitForSelector(this.checkItem);

    // Click on the filter button
    await this.page.locator(this.filterButton).click();
    await this.page.waitForSelector(this.nameInput);

    // Fill in the report name
    await this.page.locator(this.nameInput).fill(this.reportName);

    // Click on the PBB select
    await this.page.locator(this.pbbSelect).click();
  
    // Ensure the modal title is visible
    await expect(this.page.locator(this.modalTitle)).toBeVisible();
    await this.page.waitForTimeout(constants.timeOuts.timeM);

    // Select the third item in the modal
    await this.page.locator(this.modalPBBItem).click();
  
    // Click on the update button in the modal
    await this.page.locator(this.modalUpdateButton).click();
    await this.page.waitForSelector(this.expectedText);

    // Verify that the table contains the text "Romulus test"
    await expect(this.page.locator(this.expectedTextTable)).toHaveText(/Romulus test/);

    // Click on the button to save the SCB
    await this.page.locator(this.saveSCBbutton).click();
  
    await this.page.waitForSelector(this.succesMessage);
  }

  // --------------------- Check Report ---------------------
  async deleteCreatedReports() {
    await this.page.locator(this.reportTab).click();
    await this.page.waitForSelector(this.overviewHeader);
    let elements = await this.page.$$(`body >> text=${this.reportName}`);
    for (let i = 0; i < elements.length; ) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();
      if (elementText === this.reportName) {
        await elementHandle.click();
        await this.page.locator(this.deleteDraftButtton).click();
        await this.page.waitForSelector(this.fieldsModal);
        await this.page.locator(this.modalDeleteButton).click();
        await this.page.waitForSelector(this.succesMessage, { visible: true });
        await this.page.waitForSelector(this.overviewHeader);
        elements = await this.page.$$(`body >> text=${this.reportName}`);
        await this.page.waitForTimeout(constants.timeOuts.timeL);
      } else {
        i++;
      }
    }
  }
};
