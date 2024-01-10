const { expect } = require("@playwright/test");


const { baseURL } = require("./constants");

exports.Tasks = class Tasks {
  constructor(page) {
    this.page = page;
    this.filterMenu = page.getByRole('button', { name: 'Filter (Active filters: My' });
    this.filterBox = '.v-expansion-panel-content__wrap';
    this.myRecentItems = page.locator('.v-input--selection-controls__ripple').first();
    this.firstTaskValue = page.locator('//table/tbody/tr[1]');
    this.taskTab = page.getByRole('navigation').locator('span').filter({ hasText: 'Tasks' });
    this.isBeingRepaired = page.getByText('Is being repaired');
    this.postponed = page.getByText('Postponed');
    this.unread = page.getByText('Unread');
    this.finished = page.getByText('Show Finished');
    this.closed = page.getByText('Show Closed');
    this.deadlineRangeList = page.getByRole('button', { name: 'Deadline range All' });
    this.deadlineRangeListValue = page.getByText('After Deadline');
    //Choose columns filter
    this.buttonColumnsChooser = page.getByRole('button', { name: 'Choose columns', exact: true });
    this.checkboxActions = page.locator('.v-input--selection-controls__ripple').first();
    this.checkboxAssignedTo = page.locator('div:nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxAsync = page.locator('div:nth-child(3) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxFriendly = page.locator('div:nth-child(4) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxMilestoneDueDate = page.locator('div:nth-child(5) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxName = page.locator('div:nth-child(6) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxPBBCode = page.locator('div:nth-child(7) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxPostponeEndDate = page.locator('div:nth-child(8) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxPriority = page.locator('div:nth-child(9) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxProjectApplicant = page.locator('div:nth-child(10) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxProjectCode = page.locator('div:nth-child(11) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxProjectName = page.locator('div:nth-child(12) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxProjectOwner = page.locator('div:nth-child(13) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxStartDate = page.locator('div:nth-child(14) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxStatus = page.locator('div:nth-child(15) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.checkboxTaskCode = page.locator('div:nth-child(16) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    //expect element t table
    this.textColumn = page.locator("//thead[@class='v-data-table-header']");



    




  }

  async filterCheck() {

    //Expand the list by clicking on a filter
    await this.filterMenu.click();
    await this.page.waitForTimeout(2000);

    //Clicking on first task no matter what it is
    await this.firstTaskValue.click();
    await expect(this.page).not.toHaveURL(baseURL);
    await this.page.goBack();
    await this.page.waitForTimeout(2000);

    
    

    //Enable checkbox My recent items 
    await this.myRecentItems.click();
    const checkboxMyRecIT = await this.page.locator('[aria-checked="true"]');
    await expect(checkboxMyRecIT).toBeChecked();
    await this.myRecentItems.click();

    //Enable checkbox is being repaired
    await this.page.waitForTimeout(1000);
    await this.isBeingRepaired.click();
    const checkboxIsBeRe = await this.page.locator('[aria-checked="true"]');
    await expect(checkboxIsBeRe).toBeChecked();
    await this.isBeingRepaired.click();

    //Enable checkbox Postponed
    await this.page.waitForTimeout(1000);
    await this.postponed.click();
    const checkboxPostponed = await this.page.locator('[aria-checked="true"]');
    await expect(checkboxPostponed).toBeChecked();
    await this.postponed.click();

    //Enable checkbox Unread
    await this.page.waitForTimeout(1000);
    await this.unread.click();
    const checkboxUnread = await this.page.locator('[aria-checked="true"]');
    await expect(checkboxUnread).toBeChecked();
    await this.unread.click();


    //Enable switch Show finished
    await this.page.waitForTimeout(1000);
    await this.finished.click();
    const switchFinished = await this.page.locator('[aria-checked="true"]');
    await expect(switchFinished).toBeChecked();
    await this.finished.click();

    //Enable switch Show closed
    await this.page.waitForTimeout(1000);
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

    await expect(this.textColumn).toContainText("Actions")
    await expect(this.textColumn).toContainText('Actions');
    await expect(this.textColumn).toContainText('Assigned to');
    await expect(this.textColumn).toContainText('Async');
    await expect(this.textColumn).toContainText('Friendly');
    await expect(this.textColumn).toContainText('Milestone Due Date');
    await expect(this.textColumn).toContainText('Name');
    await expect(this.textColumn).toContainText('PBB Code');
    await expect(this.textColumn).toContainText('Postpone end date');
    await expect(this.textColumn).toContainText('Project Name');
    await expect(this.textColumn).toContainText('Project Code');
    await expect(this.textColumn).toContainText('Project Applicant');
    await expect(this.textColumn).toContainText('Priority');
    await expect(this.textColumn).toContainText('Project Owner');
    await expect(this.textColumn).toContainText('Start Date');
    await expect(this.textColumn).toContainText('Status');
    await expect(this.textColumn).toContainText('Task Code');




    }

 

};