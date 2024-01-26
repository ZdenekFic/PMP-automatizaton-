const { expect } = require("@playwright/test");

exports.ActiveProjects = class ActiveProjects {
  constructor(page) {
    this.page = page;

    //ENTERTOOVERVIEWS Function
    //active projects Tab
    this.activeProjectTab = page
      .getByRole("navigation")
      .getByText("Active Projects");

    //ENTERTOITEM function
    //first item in table
    this.firstProject = page.locator(
      "//div[@class='v-card__text']//tbody/tr[1]"
    );
    this.checkedDiv = page.locator(
      "//div[@class='container project-detail container--fluid']"
    );

    //PBB tree function
    //PBB tree tab
    this.pbbTreeTab = page.locator("//div[normalize-space()='PBB Tree']");

    //unfold button
    this.unfoldButton = page.locator(
      "//button[@class='v-btn v-btn--flat v-btn--icon v-btn--round theme--light elevation-2 v-size--default']//span[@class='v-btn__content']"
    );

    //show/hide columns button
    this.show_hideColumns = page.locator(
      "//button[@class='ml-2 v-btn v-btn--flat v-btn--icon v-btn--round theme--light elevation-2 v-size--default']//span[@class='v-btn__content']"
    );
    this.show_hideColumnsModal = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//div[@class='v-card v-sheet theme--light']"
    );
    this.show_hideColumnsSaveButton = page.locator(
      "//span[normalize-space()='Save']"
    );

    //show root checkbox
    this.showRootCheckbox = page.locator(
      "//div[@class='v-input ml-5 mt-1 theme--light v-input--selection-controls v-input--switch']//div[@class='v-input--selection-controls__ripple']"
    );
    this.showRootCheckboxClass =
      "(//div[@class='v-input ml-5 mt-1 v-input--is-label-active v-input--is-dirty theme--light v-input--selection-controls v-input--switch primary--text'])[1]";

    //preview checkbox
    this.previewCheckbox = page.locator(
      "//div[@class='v-input mx-5 mt-1 theme--light v-input--selection-controls v-input--switch']//div[@class='v-input--selection-controls__ripple']"
    );
    this.previewCheckboxClass =
      "//div[@class='v-input mx-5 mt-1 v-input--is-label-active v-input--is-dirty theme--light v-input--selection-controls v-input--switch primary--text']";

    //help button blue question mark
    this.helpButton = page.locator(
      "//button[@class='ml-2 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default']"
    );
    this.helpButtonModal = page.locator(
      "//div[@role='menu']//div[@class='v-card v-card--flat v-sheet theme--light']"
    );

    //GENERAL tab function
    //general
    this.generalTab = page.locator("//div[contains(text(),'General')]");
    this.mainProjectTitleName = page.locator(
      "//div[@class='pl-0 pt-0 pb-0 col col-12 col-md-6 col-lg-8 col-xl-8']"
    );
    this.inputName = page.getByLabel("Project name");

    //user groups
    this.userGroupsRedArrow = page
      .locator(".v-input__append-outer > .v-btn")
      .first();
    this.userGroupsItem1 = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[1]/td[1]"
    );
    this.userGroupsItem2 = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[2]/td[1]"
    );
    this.userGroupsItem3 = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[3]/td[1]"
    );
    this.userGroupsConfirmButton = page.locator(
      "//span[normalize-space()='Update User groups']"
    );
    this.userGroupsDiv = page.locator(
      "//div[@class='v-input v-input--is-label-active v-input--is-dirty v-input--is-focused theme--light v-text-field v-text-field--is-booted v-select v-select--chips v-select--is-multi v-autocomplete error--text']//div[@class='v-select__selections']"
    );

    //TAGS
    this.tagsArrow = page.locator(
      "div:nth-child(5) > .col > div > .v-input > .v-input__append-outer > .v-btn"
    );
    //tag1
    this.tag1 = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//tbody/tr[1]/td[1]/div[1]/i[1]"
    );
    //tag2
    this.tag2 = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//tbody/tr[2]/td[1]/div[1]/i[1]"
    );
    //tag2 text
    this.tag2text = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card v-sheet theme--light']//tbody/tr[2]/td[3]"
    );
    //tag3
    this.tag3 = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//tbody/tr[5]/td[1]/div[1]/i[1]"
    );
    //Confirm Tags
    this.tagConfirm = page.locator("//span[normalize-space()='Update Tags']");
    //tagDiv
    this.tagDiv = page.locator(
      "div:nth-child(5) > .col > div > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections"
    );

    //OWNER
    this.ownerRedArrow = page
      .locator(".add-reference-textfield-append")
      .first();
    this.ownerTableSearchInput = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='row']//input"
    );
    this.owner1 = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//tbody/tr[1]/td[1]"
    );

    this.ownerConfirm = page.locator(
      "//span[normalize-space()='Update Owner']"
    );
    //assertion
    this.ownerMain_Input = page.getByLabel("Owner");

    //Applicant
    this.applicantRedArrow = page.locator(
      "div:nth-child(4) > .col > div > .v-input > .v-input__append-outer > .add-reference-textfield-append"
    );
    this.applicantTableSearchInput = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='row']//input"
    );
    this.applicantNewApplicant = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='v-card__text']//tbody/tr[1]/td[1]"
    );
    this.applicantConfirm = page.locator(
      "//span[normalize-space()='Update Applicant']"
    );
    //assertion
    this.applicantMain_Input = page.getByLabel("Applicant");

    //tooltip helper
    this.generalHelperButton = page.locator(
      "//button[@class='ml-2 mt-3 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default']//span[@class='v-btn__content']"
    );
    this.generalHelperButtonTooltip = page.locator(
      "//div[@role='menu']//div[@class='v-card v-card--flat v-sheet theme--light']//div[@class='d-flex flex-column']//p[1]"
    );

    //DMI function

    //dmi tab button
    this.dmiTab = page.locator("//div[normalize-space()='DMI']");
    //button for redirecting to DMI detail
    this.dmiRedirectDMIDetatil = page.locator(
      "//span[@class='v-btn__content']//i[@class='v-icon notranslate mdi mdi-database theme--light']"
    );
    //jsob button
    this.dmiJsonButton = page.getByRole("button", { name: "JSON" });
    //modal with json structure
    this.dmiJsonModal = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']"
    );
    //modal button to close it
    this.dmiJsonModalClose = page.locator("//span[normalize-space()='Close']");

    //checkbox show full tree
    this.dmiShowFullTreeCheckbox = page
      .locator(
        ".v-card__title > div > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
      )
      .first();

    //checkbox hide content bricks
    this.dmiHideContentBricksCheckbox = page.locator(
      "div:nth-child(5) > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
    this.dmiHideContentBricksCheckboxCB =
      "div.vue-recycle-scroller__item-view[style='transform: translateY(-9999px);']";
    //checkbox show manually hidden nodes
    this.dmiShowManuallyHiddenNodes = page.locator(
      ".v-card__title > div:nth-child(6) > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    );
  }

  async enterToOverviews() {
    //Click on active projects Tab and get into it
    await this.activeProjectTab.click();
    await this.page.waitForTimeout(1000);
  }

  async enterToItem() {
    //Click on first item
    await this.firstProject.click();
    await this.page.waitForTimeout(5000);

    //Validation
    await expect.soft(this.page.url()).toContain("/project/detail");
    console.log(this.page.url());
    await expect.soft(this.checkedDiv).toBeVisible();
  }

  async pbbTree() {
    //check if pbb tree is defaultly set as active tab after opening a project detail
    await expect.soft(this.pbbTreeTab).toHaveClass("v-tab v-tab--active");

    //unfold button click and check
    await this.unfoldButton.click();
    //this button does something onldy in case of larger content
    await expect.soft(this.unfoldButton).toBeEnabled();

    //show/hide columns click and check
    await this.show_hideColumns.click();
    await expect.soft(this.show_hideColumnsModal).toBeVisible();
    await this.show_hideColumnsSaveButton.click();

    //show root checkbox
    await this.showRootCheckbox.click();
    //check if there is a change after clicking on checkbox
    const elementClass = await this.page.$(this.showRootCheckboxClass);
    if (elementClass) {
      console.log("Class exists");
    } else {
      console.log("Class does not exist.");
    }

    //preview checkbox
    await this.previewCheckbox.click();
    const elementClass1 = await this.page.$(this.previewCheckboxClass);
    if (elementClass1) {
      console.log("Class for checkbox Preview exists");
    } else {
      console.log("Class for checkbox Preview does not exists");
    }

    //help button blue question mark
    await this.helpButton.hover();
    const helpText = await this.helpButtonModal.textContent();
    await expect(helpText).toContain("Name column");
    await expect(helpText).toContain("Actions column");
  }

  async general(name) {
    await this.generalTab.click();
    await expect(this.generalTab).toHaveClass("v-tab v-tab--active");

    //Check if title of project matches to title project in generalForm
    const projectMain = await this.mainProjectTitleName.textContent();
    console.log(projectMain);

    const inputNameText = await this.inputName.inputValue();
    console.log(inputNameText);
    await expect(projectMain).toMatch(inputNameText);

    //user groups add items
    await this.userGroupsRedArrow.click();
    await this.userGroupsItem1.click();
    await this.userGroupsItem2.click();
    await this.userGroupsItem3.click();
    await this.userGroupsConfirmButton.click();

    //check it
    // Získejte Locator celého prvku
    const wholeElement = this.page.locator(".v-select__slot");

    // Získejte počet span prvků v celém prvku
    const spanCount = await wholeElement
      .locator("span.v-chip__content")
      .count();

    // Ověřte, že počet span prvků je alespoň jeden
    await expect(spanCount).toBeGreaterThanOrEqual(3);
    console.log(spanCount);

    //Tags
    //TAGS
    //click on arrow to open menu with tags values
    await this.tagsArrow.click();
    await this.page.waitForTimeout(1000);
    //add some tags
    await this.tag1.click();
    const tagTextValue = await this.tag2text.textContent();
    console.log(tagTextValue);
    await this.tag2.click();
    await this.tag3.click();
    // confirm
    await this.tagConfirm.click();
    //validate it
    await expect(this.tagDiv).toContainText(tagTextValue);

    //OWNER
    //click on arrow to open menu with owner values
    await this.ownerRedArrow.click();
    await this.ownerTableSearchInput.fill(name);
    await this.page.waitForTimeout(1000);
    //add owner
    await this.owner1.click();
    //confirm table
    await this.ownerConfirm.click();

    //check it
    const ownText = await this.ownerMain_Input.inputValue();
    console.log(ownText);

    //Applicant
    //click on arrow to open menu with applicant values
    await this.applicantRedArrow.click();
    await this.applicantTableSearchInput.fill(name);
    await this.page.waitForTimeout(700);
    await this.applicantNewApplicant.click();
    await this.applicantConfirm.click();

    //check it
    const appText = await this.applicantMain_Input.inputValue();
    console.log(appText);

    //tooltip helper
    await this.generalHelperButton.hover();
    const tooltipText = await this.generalHelperButtonTooltip.textContent();
    await expect(tooltipText).toContain(
      "Project Owner can work on Tasks even when they are not Assigned."
    );
  }

  async dmi() {
    //click on dmi tab
    await this.dmiTab.click();
    //check if dmi is active
    await expect(this.dmiTab).toHaveClass("v-tab v-tab--active");

    //button for redirecting to DMI detail
    await this.dmiRedirectDMIDetatil.click();
    await this.page.waitForTimeout(1000);
    //check if we were redirected
    console.log(
      "You were successfully redirected to -> " + this.page.url() + "."
    );
    await expect(this.page.url()).toContain("domainDataModelInstances/detail/");

    //go back
    await this.page.goBack();
    await this.page.waitForTimeout(1000);
    //check if we are really back in project
    console.log(
      "You were successfully redirected back  to -> " + this.page.url() + "."
    );
    await expect(this.page.url()).toContain("/project/detail/");

    //check if dmi is active
    await expect(this.dmiTab).toHaveClass("v-tab");

    //click on dmi tab
    await this.dmiTab.click();
    //check if dmi is active
    await expect(this.dmiTab).toHaveClass("v-tab v-tab--active");

    //click on button to open modal with json
    await this.dmiJsonButton.click();
    //check if modal is visible
    await expect(this.dmiJsonModal).toBeVisible();
    //close modal
    await this.dmiJsonModalClose.click();

    //checkbox show full tree
    await expect(this.dmiShowFullTreeCheckbox).toBeEnabled();

    await expect(this.dmiShowManuallyHiddenNodes).toBeEnabled();
    await this.dmiShowManuallyHiddenNodes.click();
  }

  async checkElementVisibility(ariaCheckedState) {
    

    await this.dmiHideContentBricksCheckbox.click();
    const switchElement = await this.page.$(
      `div.v-input--switch:has-text("Hide content bricks")`
    );

    // Ověření hodnoty atributu aria-checked
    let ariaChecked = await switchElement.$eval('input[role="switch"]', (el) =>
      el.getAttribute("aria-checked")
    );
    console.log(`Aria-checked je: ${ariaChecked}`);

    if (ariaChecked === ariaCheckedState) {
      const element = await this.page.$(this.dmiHideContentBricksCheckboxCB);

      if (element !== null) {
        //const isVisible = await element.isVisible();

        if (element) {
          console.log("CB is successfully hidden.");
        } else {
          console.log("CB was not found it");
        }
      } else {
        console.log("CB is visible.");
      }
    } else {
      console.log(`Switch "Hide content bricks" is not in the expected state.`);
    }
  }
};
