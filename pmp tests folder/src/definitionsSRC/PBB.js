const { text } = require("stream/consumers");
const { baseURL, timeOuts } = require("../constants");
const { expect } = require("@playwright/test");
const exp = require("constants");

exports.PBB = class PBB {
  constructor(page, pbbName) {
    this.page = page;
    this.pbbName = pbbName;

    //enter to PBB function - objects
    this.definitionsTab = page.getByRole("button", { name: "Definitions" });
    this.pbbTab = page.locator("span").filter({ hasText: "PBBs" });
    this.addButton = page.getByRole("link", { name: "Add" });

    //general form function - objects
    this.inputName = page.getByLabel("Name", { exact: true });
    this.pbbTypeDropdown = page.locator(
      'div[ui-test-data="pbb-type-input"]'
    );
    this.pbbTypeStartPBB = page.getByRole("option", { name: "Start PBB" });
    this.pbbTypeNormalPBB = page.getByRole("option", { name: "Normal PBB" });
    this.pbbTypeStartCheck = page.getByRole("button", {
      name: "PBB Type Start PBB",
    });

    // add owner
    this.redArrowButton = page
      .locator('[ui-test-data="open-list-btn"]');
      this.redArrowButton2 = page
      .locator('[ui-test-data="upload-btn"]');
    this.modalWindow = page.locator(
        '.v-dialog.v-dialog--active.v-dialog--persistent.v-dialog--scrollable'
       );  
    this.item = page.locator(
      "//tr/td[1]"
    );
    this.buttonUpdate = page.locator(
     'button[ui-test-data="update-btn"]'
    );
    this.ownerInput = page.getByLabel("Owner");

    //add maintainer
    
   
    this.maintainerInput = page.getByLabel("Maintainer");

    // Tags objects

    
    // input for text to describe PBB
    this.descriptionPBB = page.locator('.ql-editor.ql-blank[contenteditable="true"]');
    this.descriptionCheck = page.getByRole("paragraph");

    
    // add value to planned cost
    this.plannedCost = page.getByLabel("Planned Cost");

    

    
    //currency dropdown
    this.currencyDropdown = page.getByLabel("Currency");

    //project wizard expert Mode
    this.projectWizardSwitch = page.locator(
      'input[type="checkbox"][role="switch"][ui-test-data="project-wizard-expert-mode-switch"]'
    );
    
    //deactive switch Contains task
    this.containsTaskSwitch = page.locator(
      'input[type="checkbox"][role="switch"][ui-test-data="contains-task-switch"]'
    );

    

    //savebutton
    this.saveGreenButton = page.locator(
      '[ui-test-data="save-btn"]'
    );

    //message - success saved
    this.pbbHasBeenCreated = page.locator("v-snack__wrapper v-sheet theme--dark success");

    //assigment tab
    this.assigmentTab = page.locator("//a[normalize-space()='Assignment']");

    //delete ddm draft
    this.deleteDraftButtton = page.locator(
       '[ui-test-data="delete-btn"]'
    );
    this.modalDeleteButton = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//span[normalize-space()='Delete']"
    );
  }

  // FUNCTIONS part

  async enterToPBB() {
    //click on Definitons tab
    await this.definitionsTab.click();

    //click on Definitions/Content Bricks TAB
    await this.pbbTab.click();
  }

  async makroLevel_Name(pbbName) {
    //click on ADD button
    await this.addButton.click();

    //filling a name
    await this.inputName.fill(pbbName);

    const inputValue = await this.inputName.inputValue();
    await expect(inputValue).toBe(pbbName);
  }

  async makroLevel_PbbType() {
    //click on dropdown to choose type of PBB
    
    await this.pbbTypeDropdown.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.pbbTypeStartPBB.click();
    await expect(this.pbbTypeStartCheck).toBeVisible();
  }

  async makroLevel_PbbTypeNormal() {
    //click on dropdown to choose type of PBB
    await this.pbbTypeDropdown.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.pbbTypeNormalPBB.click();
  }

  async makroLevel_Owner() {
    //add owner
    await this.redArrowButton.nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeXL);
    await this.modalWindow.locator(this.item).nth(2).click();
    await this.buttonUpdate.click();
  }
  async makroLevel_Maintainer() {
    // add maintainer
    await this.redArrowButton.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item).nth(2).click();
    await this.buttonUpdate.nth(1).click();
  }
  async makroLevel_Tags() {
    // add tags
    await this.redArrowButton2.nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item).nth(2).click();
    await this.modalWindow.locator(this.item).nth(4).click();
    await this.modalWindow.locator(this.item).nth(8).click();
    await this.buttonUpdate.nth(2).click();
  }
  async makroLevel_Description(text) {
    // add description
    await this.descriptionPBB.fill(text);
  }

  async makroLevel_ProjectDefTags() {
    //add project default tags
    await this.redArrowButton2.nth(2).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item).nth(2).click();
    await this.modalWindow.locator(this.item).nth(4).click();
    await this.modalWindow.locator(this.item).nth(8).click();
    await this.buttonUpdate.nth(3).click();
  }

  
  

  async makroLevel_DefaultDDM() {
    //add Default DDM
    await this.redArrowButton.nth(2).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item).nth(2).click();
    await this.buttonUpdate.nth(4).click();
    
  }
  async makroLevel_Wizard() {
    //project wizard switch
    await this.page.locator(timeOuts.timeM)
    await this.projectWizardSwitch.click({ force: true });
    await expect(this.projectWizardSwitch).toBeChecked();
  }

 

  
  async makroLevel_ContainsTask() {
    //deactive switch contains task
    await this.containsTaskSwitch.click({ force: true });
    //check if switch contains task is defaultly enabled due to to pbb start

    
    await expect(this.containsTaskSwitch).toBeChecked();
  }
  async makroLevel_ShowInReports() {
    //active switch show in reports
    await this.showInReports.click();
    if (await this.showInReports.isChecked()) {
      await expect(this.nameInReports).toBeVisible();
    }
  }

  async makroLevel_Save() {
    //check if assignment is disabled due to unsafed macrolevel

    await expect(this.assigmentTab).toHaveClass("v-tab v-tab--disabled");

    //save PBB
    await this.saveGreenButton.click();
   
    //check message about successful saving

    await this.pbbHasBeenCreated.waitFor();
    //check if assignment is disabled due to unsafed macrolevel

    await expect(this.assigmentTab).not.toHaveClass("v-tab v-tab--disabled");

    //check if inputs are empty or not after save
    await expect(this.inputName).not.toBeEmpty();

    await expect.soft(this.descriptionCheck).not.toBeEmpty();
    await expect.soft(this.ownerInput).not.toBeEmpty();
    await expect.soft(this.maintainerInput).not.toBeEmpty();
    await expect.soft(this.nameInReports).toBeEmpty();
    
  }

  async checkAndDelete() {
    await this.enterToPBB();
    await this.page.waitForTimeout(timeOuts.timeM);

    let elements = await this.page.$$(`body >> text=${this.pbbName}`);

    for (let i = 0; i < elements.length; i++) {
      const elementHandle = elements[i];
      const elementText = await elementHandle.innerText();
      console.log(elementText);

      if (elementText === this.pbbName) {
        await this.page.waitForTimeout(timeOuts.timeM);
        await elementHandle.click();
        await this.deleteDraftButtton.click();
        await this.modalDeleteButton.click();
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
