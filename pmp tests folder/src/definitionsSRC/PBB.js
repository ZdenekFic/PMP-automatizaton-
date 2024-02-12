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
      "//div[@class='v-input v-input--is-label-active v-input--is-dirty theme--light v-text-field v-text-field--is-booted v-select']//div[@class='v-select__slot']"
    );
    this.pbbTypeStartPBB = page.getByRole("option", { name: "Start PBB" });
    this.pbbTypeNormalPBB = page.getByRole("option", { name: "Normal PBB" });
    this.pbbTypeStartCheck = page.getByRole("button", {
      name: "PBB Type Start PBB",
    });

    // add owner
    this.ownerRedArrowButton = page
      .locator(".add-reference-textfield-append")
      .first();
    this.ownerFirstObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//tbody/tr[1]/td[1]"
    );
    this.ownerConfirmButton = page.locator(
      "//span[normalize-space()='Update Owner']"
    );
    this.ownerInput = page.getByLabel("Owner");

    //add maintainer
    this.maintainerRedArrowButton = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[2]"
    );
    this.maintainerSecongObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//tbody/tr[2]/td[1]"
    );
    this.maintainerConfirmButton = page.locator(
      "//span[normalize-space()='Update Maintainer']"
    );
    this.maintainerInput = page.getByLabel("Maintainer");

    // Tags objects

    this.generalFormTagsRedArrow = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[3]"
    );
    this.firstObjectInTableTags = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-data-table__wrapper']//tbody/tr[1]/td[1]"
    );
    this.secondObjectInTableTags = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[2]/td[1]"
    );
    this.fifthObjectUsageInTableTags = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[5]/td[1]"
    );
    this.buttonUpdateTags = page.locator(
      "//span[normalize-space()='Update Tags']"
    );

    //  //project default tags
    //  this.projectDefaultTagsRedArrow = page.locator("//div[@class='v-input v-input--is-focused theme--light v-text-field v-text-field--is-booted v-select v-select--chips v-select--is-multi v-autocomplete error--text']//button");
    //  this.projectDefaultTagsFourthObject = page.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-data-table__wrapper']//tbody/tr[4]/td[1]");
    //  this.projectDefaultTagsConfirmButton = page.locator("//span[normalize-space()='Update Project Default Tags']");

    // input for text to describe PBB
    this.descriptionPBB = page.locator("//div[@class='ql-editor ql-blank']");
    this.descriptionCheck = page.getByRole("paragraph");

    // add project default tags
    this.projectDefaultTagsRedArrow = page.locator(
      "(//div[@class='v-input theme--light v-text-field v-text-field--is-booted v-select v-select--chips v-select--is-multi v-autocomplete'])[2]//button"
    );
    this.projectDefaultTagsFourthObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-data-table__wrapper']//tbody/tr[3]/td[1]"
    );
    this.projectDefaultTagsConfirmButton = page.locator(
      "//span[normalize-space()='Update Project Default Tags']"
    );

    // add value to planned cost
    this.plannedCost = page.getByLabel("Planned Cost");

    //add value into input planned resource time
    this.plannedResourceTime = page.getByLabel("Planned Resource Time");

    //add value into input process time
    this.plannedProcesstime = page.getByLabel("Planned Process Time");

    //add default ddm
    this.defaultDDM = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-upload theme--light'])[6]"
    );
    this.defaultDDMRandomObject = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-data-table__wrapper']//tbody/tr[3]/td[1]"
    );
    this.defaultDDMConfirm = page.locator(
      "//span[normalize-space()='Update Default DDM']"
    );

    //currency dropdown
    this.currencyDropdown = page.getByLabel("Currency");

    //project wizard expert Mode
    this.projectWizardSwitch = page.locator(
      "//label[normalize-space()='Project Wizard Expert Mode']"
    );
    //active switch Time recording
    this.timeRecordingSwitch = page.locator(
      "//label[normalize-space()='Time Recording']"
    );

    //active switch enforce validation
    this.enforceValidation = page.locator(
      "//label[normalize-space()='Enforce Validation']"
    );

    //deactive switch Contains task
    this.containsTaskSwitch = page.locator(
      "//label[normalize-space()='Contains Task']"
    );

    //active show in reports
    this.showInReports = page.locator(
      "//label[normalize-space()='Show In Reports']"
    );
    this.nameInReports = page.getByLabel("Name in Reports");

    //savebutton
    this.saveGreenButton = page.locator(
      "//i[@class='v-icon notranslate v-icon--dense mdi mdi-content-save theme--light success--text']"
    );

    //message - success saved
    this.pbbHasBeenCreated = page.getByText("PBB has been created.");

    //assigment tab
    this.assigmentTab = page.locator("//a[normalize-space()='Assignment']");

    //delete ddm draft
    this.deleteDraftButtton = page.locator(
      "//i[@class='v-icon notranslate mdi mdi-delete theme--light']"
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
    await this.ownerRedArrowButton.click();
    await this.page.waitForTimeout(timeOuts.timeXL);
    await this.ownerFirstObject.click();
    await this.ownerConfirmButton.click();
  }
  async makroLevel_Maintainer() {
    // add maintainer
    await this.maintainerRedArrowButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.maintainerSecongObject.click();
    await this.maintainerConfirmButton.click();
  }
  async makroLevel_Tags() {
    // add tags
    await this.generalFormTagsRedArrow.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.firstObjectInTableTags.click();
    await this.secondObjectInTableTags.click();
    await this.fifthObjectUsageInTableTags.click();
    await this.buttonUpdateTags.click();
  }
  async makroLevel_Description(text) {
    // add description
    await this.descriptionPBB.fill(text);
  }

  async makroLevel_ProjectDefTags() {
    //add project default tags
    await this.projectDefaultTagsRedArrow.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.projectDefaultTagsFourthObject.click();
    await this.projectDefaultTagsConfirmButton.click();
  }

  async makroLevel_PlannedCost() {
    await this.plannedCost.fill("9999999999");
    await expect(this.plannedCost).not.toBeEmpty();
  }

  async makroLevel_Currency() {
    await this.currencyDropdown.click();
  }

  async makroLevel_ResourceTime() {
    //add value into input planned resource time
    const input = await this.plannedResourceTime;
    await input.fill("6000");

    const inputValue = await input.inputValue();
    await expect(inputValue).toBe("6000");
  }

  async makroLevel_ProcessTime() {
    const input = await this.plannedProcesstime;
    await input.fill("100");

    const inputValue = await input.inputValue();
    await expect(inputValue).toBe("100");
  }

  async makroLevel_DefaultDDM() {
    //add Default DDM
    await this.defaultDDM.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.defaultDDMRandomObject.click();
    await this.defaultDDMConfirm.click();
  }
  async makroLevel_Wizard() {
    //project wizard switch
    await this.projectWizardSwitch.click();
    await expect(this.projectWizardSwitch).toBeChecked();
  }

  async makroLevel_TimeRecordingSwitch() {
    //active switch Time recording
    await this.timeRecordingSwitch.click();
    await expect(this.timeRecordingSwitch).toBeChecked();
  }

  async makroLevel_EnforceValidation() {
    //active switch Enforce Validation
    await this.enforceValidation.click();
    await expect(this.enforceValidation).toBeChecked();
  }
  async makroLevel_ContainsTask() {
    //deactive switch contains task
    //check if switch contains task is defaultly enabled due to to pbb start

    await this.containsTaskSwitch.click();
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
    await this.page.waitForTimeout(timeOuts.timeM);

    //check message about successful saving

    const successMessage = await this.pbbHasBeenCreated.textContent();
    await expect(successMessage).toContain("PBB has been created");

    //check if assignment is disabled due to unsafed macrolevel

    await expect(this.assigmentTab).not.toHaveClass("v-tab v-tab--disabled");

    //check if inputs are empty or not after save
    await expect(this.inputName).not.toBeEmpty();

    await expect.soft(this.descriptionCheck).not.toBeEmpty();
    await expect.soft(this.ownerInput).not.toBeEmpty();
    await expect.soft(this.maintainerInput).not.toBeEmpty();
    await expect.soft(this.nameInReports).toBeEmpty();
    await expect.soft(this.plannedProcesstime).not.toBeEmpty();
    await expect.soft(this.plannedResourceTime).not.toBeEmpty();
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
