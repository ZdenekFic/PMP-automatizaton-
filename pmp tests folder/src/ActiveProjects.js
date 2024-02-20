const { expect } = require("@playwright/test");
const { timeOuts } = require("./constants");

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
    this.projectDiv = page.locator(
      "div[data-v-a8d76044].container.pl-5.pt-5.container--fluid"
    );

    this.checkedDiv = page.locator(
      "div[data-v-a8d76044] .container.project-detail.container--fluid .entity-detail-card.v-card.v-sheet.theme--light"
    );

    //PBB tree function
    //Tabs div area
    this.tabsNav = page.locator(
      "div.v-slide-group__content.v-tabs-bar__content"
    );

    // tab   in methods is used "nth(n)" to pick right tab due to situation
    this.tab = 'div[role="tab"]';

    //unfold button
    this.unfoldButton = page.locator(
      'button[type="button"].v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.elevation-2.v-size--default[role="button"][aria-haspopup="true"][aria-expanded="false"]'
    );

    //show/hide columns button
    this.show_hideColumns = page.locator(
      'button[type="button"].ml-2.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.elevation-2.v-size--default'
    );
    this.show_hideColumnsModal = page.locator(
      "div[data-v-65ea29d0].v-card.v-sheet.theme--light"
    );
    this.show_hideColumnsSaveButton = page.locator(
      'button[data-v-65ea29d0][type="button"].error.v-btn.v-btn--flat.v-btn--text.theme--light.v-size--default'
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

    this.mainProjectTitleName = page.locator(
      "div[data-v-c1836cc6].v-card__title.pt-2.pb-0 .pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-8.col-xl-8"
    );
    this.inputName = page.getByLabel("Project name");

    //user groups
    this.userGroupsRedArrow = page
      .locator(".v-input__append-outer > .v-btn")
      .first();

    this.userGroupsModal = ".v-card[data-v-516a0fde]";
    this.userGroupsItem = "//tr/td[1]";

    this.userGroupsConfirmButton = 'button[ui-test-data="update-btn"]';

    //TAGS
    this.tagsArea = page.locator('div[data-v-19b89e56]');
    this.tagsArrow = 'button[data-v-19b89e56][ui-test-data="upload-btn"]';
    // Tags   modal 
    this.tagsModal = 'div.v-card.v-sheet.theme--light[data-v-516a0fde]';
    this.tagsItem = "//tr/td[1]";
    
    
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

  //_____________________________________Methods_________________________________________________

  async enterToOverviews() {
    //Click on active projects Tab and get into it
    await this.activeProjectTab.click();
    await this.page.waitForTimeout(timeOuts.timeM);
  }

  async enterToItem() {
    //Click on first item
    await this.projectDiv.locator("//tr").nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeXXL);

    //Validation
    await expect.soft(this.page.url()).toContain("/project/detail");
    console.log(this.page.url());
    await expect.soft(this.checkedDiv).toBeVisible();
  }

  async pbbTree() {
    //check if pbb tree is defaultly set as active tab after opening a project detail
    const pbbTreeCheck = await this.tabsNav.locator(this.tab).nth(1);
    await expect.soft(pbbTreeCheck).toHaveClass("v-tab v-tab--active");

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
    //Check if general tab is active
    const generalTab = await this.tabsNav.locator(this.tab).nth(0);
    await generalTab.click();
    await expect(generalTab).toHaveClass("v-tab v-tab--active");

    //Check if title of project matches to title project in generalForm
    const projectMain = await this.mainProjectTitleName.textContent();
    console.log(projectMain);

    const inputNameText = await this.inputName.inputValue();
    console.log(inputNameText);
    await expect(projectMain).toMatch(inputNameText);

    //user groups add items
    await this.userGroupsRedArrow.click();
    await this.page.waitForSelector(this.userGroupsModal);
    await this.page
      .locator(this.userGroupsModal)
      .locator(this.userGroupsItem)
      .nth(1)
      .click();
    await this.page
      .locator(this.userGroupsModal)
      .locator(this.userGroupsItem)
      .nth(2)
      .click();
    await this.page
      .locator(this.userGroupsModal)
      .locator(this.userGroupsItem)
      .nth(3)
      .click();
      //confirm button
    await this.page.locator(this.userGroupsModal).locator(this.userGroupsConfirmButton).click();

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
    await this.tagsArea.locator(this.tagsArrow).nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    //add some tags
    const value = await this.page.locator(this.tagsModal).locator(this.tagsItem).textContent();
    console.log(value);
    await this.page.locator(this.tagsModal).locator(this.tagsItem).nth(2).click();
    await this.page.locator(this.tagsModal).locator(this.tagsItem).nth(3).click();
    
    // const tagTextValue = await this.tag2text.textContent();
    // console.log(tagTextValue);
    // await this.tag2.click();
    // await this.tag3.click();
    // // confirm
    // await this.tagConfirm.click();
    // //validate it
    // await expect(this.tagDiv).toContainText(tagTextValue);

    //OWNER
    //click on arrow to open menu with owner values
    await this.ownerRedArrow.click();
    await this.ownerTableSearchInput.fill(name);
    await this.page.waitForTimeout(timeOuts.timeM);
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
    await this.page.waitForTimeout(timeOuts.timeM);
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
    await this.page.waitForTimeout(timeOuts.timeM);
    //check if we were redirected
    console.log(
      "You were successfully redirected to -> " + this.page.url() + "."
    );
    await expect(this.page.url()).toContain("domainDataModelInstances/detail/");

    //go back
    await this.page.goBack();
    await this.page.waitForTimeout(timeOuts.timeM);
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
