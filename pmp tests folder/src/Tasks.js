const { expect } = require("@playwright/test");

const { baseURL, timeOuts } = require("./constants");

exports.Tasks = class Tasks {
  constructor(page) {
    this.page = page;
    //clicking on filter to get more filters
    this.filterMenu = page.locator(
      'button.v-expansion-panel-header.bg240'
    );
    this.filterArrowButton =
      '.v-expansion-panel-header__icon .v-icon.mdi.mdi-chevron-down.theme--light';
    this.filterBox =
    'div.v-expansion-panel-content.table-filter-panel-content';

    // action to get into first item in table
    this.tableTasks = page.locator(
      'div.v-data-table.overview-table.pmtool-table.v-data-table--dense.theme--light'
    );

    // CHECKBOXES
    // My recenet items
    this.myRecentItemsDiv = page.locator('div.p-0.col.col-2');
    this.myRecentItemsCheckbox = ".v-input--selection-controls__ripple";
    // Is being repaired
    this.isBeingRepairedDiv = page.locator(
      'div[xs="12"].p-0.col-sm-12.col-md-3.col-lg-3.col-xl-3.col-12'
    );
    this.isBeingRepairedCheckbox = ".v-input--selection-controls__ripple";
    // Postponed
    this.postponedDiv = page.locator(
      'div[xs="12"].p-0.col-sm-12.col-md-3.col-lg-3.col-xl-3.col-12'
    );
    this.postponedCheckbox = ".v-input--selection-controls__ripple";
    // Unread
    this.unread = page.getByText("Unread");
    // Show finished
    this.finished = page.getByText("Show Finished");
    // Show closed
    this.closed = page.getByText("Show Closed");

    //Choose columns filter
    this.buttonColumnsChooser = page.getByRole("button", {
      name: "Choose columns",
      exact: true,
    });

    // Checkboxes for columns picker
    this.allCheckboxesDiv = page.locator("div.row.no-gutters");

    //Actions
    this.checkboxActions = page
      .locator(".v-input--selection-controls__ripple")
      .first();
    //Assigned to
    this.checkboxAssignedTo = page.locator(
      "div:nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Async
    this.checkboxAsync = page.locator(
      "div:nth-child(3) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Friendly
    this.checkboxFriendly = page.locator(
      "div:nth-child(4) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Milestone Due Date
    this.checkboxMilestoneDueDate = page.locator(
      "div:nth-child(5) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Name
    this.checkboxName = page.locator(
      "div:nth-child(6) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //PBB Code
    this.checkboxPBBCode = page.locator(
      "div:nth-child(7) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Postpone end date
    this.checkboxPostponeEndDate = page.locator(
      "div:nth-child(8) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Prority
    this.checkboxPriority = page.locator(
      "div:nth-child(9) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Project Applicant
    this.checkboxProjectApplicant = page.locator(
      "div:nth-child(10) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Project code
    this.checkboxProjectCode = page.locator(
      "div:nth-child(11) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Project Name
    this.checkboxProjectName = page.locator(
      "div:nth-child(12) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Project owner
    this.checkboxProjectOwner = page.locator(
      "div:nth-child(13) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Start date
    this.checkboxStartDate = page.locator(
      "div:nth-child(14) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Status
    this.checkboxStatus = page.locator(
      "div:nth-child(15) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    //Task code
    this.checkboxTaskCode = page.locator(
      "div:nth-child(16) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    this.saveButton = page.getByRole("button", { name: "Save" });
    //expect element t table
    this.textColumn = page.locator("//thead[@class='v-data-table-header']");
  }

  async filterCheck() {
    //Expand the list by clicking on a filter
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.filterMenu.locator(this.filterArrowButton).click();

    await this.page.waitForTimeout(timeOuts.timeS);
    await this.page.waitForSelector(this.filterBox);

    //Clicking on first task no matter what it is, this action get checkbox myrecentitems enabled
    await this.tableTasks.locator("//tr").nth(1).click();
    await expect(this.page).not.toHaveURL(baseURL);
    await this.page.goBack();
    await this.page.waitForTimeout(timeOuts.timeL);

    //Enable checkbox My recent items
    await this.myRecentItemsDiv.locator(this.myRecentItemsCheckbox).click();
    const checkboxMyRecIT = await this.page.locator('[aria-checked="true"]');
    await expect(checkboxMyRecIT).toBeChecked();
    //Click again to get unchecked
    await this.myRecentItemsDiv.locator(this.myRecentItemsCheckbox).click();

    //Enable checkbox is being repaired
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.isBeingRepairedDiv
      .nth(0)
      .locator(this.isBeingRepairedCheckbox)
      .click();
    const checkboxIsBeRe = await this.page.locator('[aria-checked="true"]');
    await expect(checkboxIsBeRe).toBeChecked();
    //Click again to get unchecked
    await this.isBeingRepairedDiv
      .nth(0)
      .locator(this.isBeingRepairedCheckbox)
      .click();

    //Enable checkbox Postponed
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.postponedDiv.nth(1).locator(this.postponedCheckbox).click();
    const checkboxPostponed = await this.page.locator('[aria-checked="true"]');
    await expect(checkboxPostponed).toBeChecked();
    await this.postponedDiv.nth(1).locator(this.postponedCheckbox).click();

    //Enable checkbox Unread
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.unread.click();
    const checkboxUnread = await this.page.locator('[aria-checked="true"]');
    await expect(checkboxUnread).toBeChecked();
    await this.unread.click();

    //Enable switch Show finished
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.finished.click();
    const switchFinished = await this.page.locator('[aria-checked="true"]');
    await expect(switchFinished).toBeChecked();
    await this.finished.click();

    //Enable switch Show closed
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.closed.click();
    const switchClosed = await this.page.locator('[aria-checked="true"]');
    await expect(switchClosed).toBeChecked();
    await this.closed.click();
  }

  async columnsChooser() {
    //click on button for choosing columns
    await this.buttonColumnsChooser.click();

    //checkboxex clicking to active it
    await this.checkboxActions.click();
    

    

    await this.checkboxAssignedTo.click();
    await this.checkboxAsync.click();
    await this.checkboxFriendly.click();
    await this.checkboxMilestoneDueDate.click();
    await this.checkboxName.click();
    //second click becuase this checkbox is defaultly enable
    await this.checkboxName.click();
    await this.checkboxPBBCode.click();
    await this.checkboxPostponeEndDate.click();
    await this.checkboxPriority.click();
    await this.checkboxProjectApplicant.click();
    await this.checkboxProjectCode.click();
    await this.checkboxProjectName.click();
    await this.checkboxProjectOwner.click();
    await this.checkboxStartDate.click();
    await this.checkboxStatus.click();
    await this.checkboxTaskCode.click();
    //second click becuase this checkbox is defaultly enable
    await this.checkboxTaskCode.click();

    //save it button
    await this.saveButton.click();

    await expect(this.textColumn).toContainText("Actions");
    await expect(this.textColumn).toContainText("Actions");
    await expect(this.textColumn).toContainText("Assigned to");
    await expect(this.textColumn).toContainText("Async");
    await expect(this.textColumn).toContainText("Friendly");
    await expect(this.textColumn).toContainText("Milestone Due Date");
    await expect(this.textColumn).toContainText("Name");
    await expect(this.textColumn).toContainText("PBB Code");
    await expect(this.textColumn).toContainText("Postpone end date");
    await expect(this.textColumn).toContainText("Project Name");
    await expect(this.textColumn).toContainText("Project Code");
    await expect(this.textColumn).toContainText("Project Applicant");
    await expect(this.textColumn).toContainText("Priority");
    await expect(this.textColumn).toContainText("Project Owner");
    await expect(this.textColumn).toContainText("Start Date");
    await expect(this.textColumn).toContainText("Status");
    await expect(this.textColumn).toContainText("Task Code");
  }
};
