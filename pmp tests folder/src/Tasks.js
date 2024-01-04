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

 

};