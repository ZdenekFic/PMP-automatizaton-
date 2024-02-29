const { expect } = require("@playwright/test");
const { timeOuts } = require("./constants");

exports.ActiveProjects = class ActiveProjects {
  constructor(page) {
    this.page = page;

    //ENTERTOOVERVIEWS Function
    //active projects Tab
    this.activeProjectTab = page.locator('span[ui-test-data="nav-project-active"]');

    //ENTER TO ITEM function
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

    //show root and preview checbox
    this.showRootCheckbox = page.locator(
      '.v-input.ml-5.mt-1.theme--light.v-input--selection-controls.v-input--switch').locator('.v-input--selection-controls__ripple');

    this.showRootCheckboxClass =
      "(//div[@class='v-input ml-5 mt-1 v-input--is-label-active v-input--is-dirty theme--light v-input--selection-controls v-input--switch primary--text'])[1]";

    //preview checkbox
    this.previewCheckbox = page.locator('.v-input.mx-5.mt-1.theme--light.v-input--selection-controls.v-input--switch').locator('.v-input--selection-controls__ripple');
    this.previewCheckboxClass =
      "//div[@class='v-input mx-5 mt-1 v-input--is-label-active v-input--is-dirty theme--light v-input--selection-controls v-input--switch primary--text']";

    //help button blue question mark
    this.helpButton = page.locator(
      "//button[@class='ml-2 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default']"
    );
    this.helpButtonModal = page.locator(
      "//div[@role='menu']//div[@class='v-card v-card--flat v-sheet theme--light']"
    );

    //_________________________________________________________________________________________

    //GENERAL tab function elements
    //general

    this.mainProjectTitleName = page.locator(
      "div[data-v-c1836cc6].v-card__title.pt-2.pb-0 .pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-8.col-xl-8"
    );
    this.inputName = page.getByLabel("Project name");

    //USER GROUPS adn TAGS
    this.redArrow2 = page.locator(
      'button[data-v-d1eabe68][ui-test-data="upload-btn"]'
    );
    this.modalWindow = page.locator(".v-card[data-v-516a0fde]");
    this.userGroupsItem = "//tr/td[1]";
    this.confirmButton = 'button[ui-test-data="update-btn"]';
    this.tagsItemTextValue = "//tr/td[3]";

    //tagDiv
    this.tagDivArea = page.locator(
      "div.v-input.theme--light.v-text-field.v-text-field--is-booted.v-select.v-select--chips.v-select--is-multi.v-autocomplete[data-v-d1eabe68]"
    );

    //OWNER and APPLICANT
    this.redArrow1 = page.locator('button[ui-test-data="open-list-btn"]');
    this.tableSearchInput = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//div[@class='row']//input"
    );
    this.tableResults = page.locator(
      "div.v-data-table.max-width.v-data-table--dense.theme--light[data-v-516a0fde]"
    );
    this.userToPick = "//tbody/tr[1]/td[1]";

    //assertion
    this.inputWithUser = page.locator(
      'input[ui-test-data="entity-details-input"]'
    );

    //__________________________________________________________________________________________________________________

    //DMI function

    //button for redirecting to DMI detail
    this.dmiRedirectDMIDetatil = page.locator(
      "i.v-icon.mdi.mdi-database.theme--light[data-v-058bcd0a]"
    );
    //jsob button
    this.dmiJsonButton = page.locator(
      'button.red--text.ml-3.v-btn.v-btn--depressed.v-btn--flat.v-btn--outlined.theme--light.v-size--default[dense=""]'
    );
    //modal with json structure
    this.dmiJsonModal = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']"
    );
    //modal button to close it
    this.dmiJsonModalClose = page.locator(
      "button.red--text.v-btn.v-btn--depressed.v-btn--flat.v-btn--outlined.theme--light.v-size--default"
    );

    //checkbox show full tree
    this.dmiCheckboxes = page
      .locator(
        "div.v-input.mt-0.ml-3.v-input--hide-details.theme--light.v-input--selection-controls.v-input--switch[data-v-058bcd0a]"
      )
      .locator(".v-input--selection-controls__ripple");

    //checkbox hide content bricks

    this.dmiHideContentBricksCheckboxCB =
      "div.vue-recycle-scroller__item-view[style='transform: translateY(-9999px);']";
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
    
    await this.page.waitForSelector('div.v-data-table.overview-table.pmtool-table.v-data-table--dense.theme--light')
    await this.page.waitForTimeout(timeOuts.timeM);

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
    await this.showRootCheckbox.click();
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
    await this.redArrow2.nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.userGroupsItem).nth(1).click();
    await this.modalWindow.locator(this.userGroupsItem).nth(2).click();
    await this.modalWindow.locator(this.userGroupsItem).nth(3).click();
    //confirm button
    await this.modalWindow.locator(this.confirmButton).click();

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

    //TAGS
    //click on arrow to open menu with tags values
    await this.redArrow2.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);

    //add some tags
    await this.modalWindow.nth(1).locator(this.userGroupsItem).nth(1).click();
    // save value text for later validation
    const tagTextValue = await this.modalWindow
      .nth(1)
      .locator(this.tagsItemTextValue)
      .nth(3)
      .textContent();
    console.log(tagTextValue);
    const tagTextValueTrimmed = tagTextValue.trim();
    //add some next items
    await this.modalWindow.nth(1).locator(this.userGroupsItem).nth(2).click();
    await this.modalWindow.nth(1).locator(this.userGroupsItem).nth(3).click();

    //confirm
    await this.modalWindow.locator(this.confirmButton).nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);

    //validate it
    const inputValues = await this.tagDivArea.nth(1).textContent();
    console.log(inputValues);

    await expect(inputValues).toContain(tagTextValueTrimmed);

    //OWNER
    //click on arrow to open menu with owner values
    await this.redArrow1.nth(0).click();
    await this.tableSearchInput.fill(name);
    await this.page.waitForTimeout(timeOuts.timeM);
    //add owner
    await this.tableResults.nth(2).locator(this.userToPick).click();

    //confirm table
    await this.page.locator(this.confirmButton).nth(2).click();

    //check it
    const ownText = await this.inputWithUser.nth(0).inputValue();
    console.log(ownText);

    //Applicant
    //click on arrow to open menu with applicant values
    await this.redArrow1.nth(1).click();
    await this.tableSearchInput.fill(name);
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.tableResults.nth(3).locator(this.userToPick).click();
    await this.page.locator(this.confirmButton).nth(3).click();

    //check it
    const appText = await this.inputWithUser.nth(1).inputValue();
    console.log(appText);
  }

  async dmi() {
    //Check if DMI tab is active
    const dmiTab = await this.tabsNav.locator(this.tab).nth(2);
    await dmiTab.click();
    await expect(dmiTab).toHaveClass("v-tab v-tab--active");
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
    await expect(dmiTab).toHaveClass("v-tab");

    //click on dmi tab
    await dmiTab.click();
    //check if dmi is active
    await expect(dmiTab).toHaveClass("v-tab v-tab--active");

    //click on button to open modal with json
    await this.dmiJsonButton.click();
    //check if modal is visible
    await expect(this.dmiJsonModal).toBeVisible();
    //close modal
    await this.dmiJsonModalClose.nth(1).click();

    //checkbox show full tree

    await this.dmiCheckboxes.nth(0).click();
    await expect(this.dmiCheckboxes.nth(0)).toBeEnabled();

    await this.dmiCheckboxes.nth(2).click();
    await expect(this.dmiCheckboxes.nth(2)).toBeEnabled();
  }

  async checkElementVisibility(ariaCheckedState) {
    await this.dmiCheckboxes.nth(1).click();
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
