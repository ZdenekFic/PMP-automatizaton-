const { expect } = require("@playwright/test");

exports.Project = class Project {
  constructor(page) {
    this.page = page;
    this.activeProjectsTab = '[ui-test-data="nav-project-active"]';
    this.activeProjectsAddBtn = 'a[ui-test-data="overview-header-add-btn"]';
    this.titleHeader = ".pl-0.pt-0.pb-0.col.col-12.col-md-6.col-lg-7.col-xl-7";

    //Pick a pbb type brick
    this.selectProjectArea = ".container.container--fluid.grid-list-md";
    this.selectProjectButtonArea = ".layout.row.wrap";
    this.selectProjectButton = ".v-card__title.pbb-card-title";

    this.activeTabSelector =
      'div[role="tab"].v-tab.v-tab--active:has-text("Data")';
    this.proDetailsFirstArea = ".v-window-item.v-window-item--active";
    this.proDetailsInputName = 'input[type="text"][autofocus]';
    this.proDetailNextButtonArea = ".py-0.px-4.d-flex.col.col-auto";
    this.proDetailNextButton =
      ".error.mx-2.v-btn.v-btn--text.theme--light.v-size--default";
    this.proDetailDeleteButton = '[ui-test-data="delete-btn"]';
    this.proDetailStartButton =
      ".error.split-button-main-btn.v-btn.v-btn--text.theme--light.v-size--default";

    this.disabledButton = "button:disabled";

    this.taskArea = ".v-card.v-card--flat.v-sheet.theme--light";
    this.taskAreaSecond = ".pbb-name-label";
    this.taskButton = "a[href]";

    this.greenFinishButton =
      ".mr-1.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default";

    this.mainTaskArea =
      ".v-card.v-sheet.theme--light.mb-3.lighten-5.initial.pmtool-card-content-brick";
    this.mainTaskAreaInput = 'input[type="number"]';

    this.saveBlackButtonArea = ".ml-4";
    this.saveBlackButton =
      ".v-icon.notranslate.mdi.mdi-content-save-check.theme--light";
    this.greenTaskIcon =
      ".v-icon.notranslate.v-alert__icon.mdi.mdi-check.theme--dark.success--text";
  }

  async enterToOverview() {
    await this.page.locator(this.activeProjectsTab).click();
    await this.page.waitForSelector(this.activeProjectsAddBtn);
  }

  async newProject(name) {
    await this.page.locator(this.activeProjectsAddBtn).click();
    await this.page.waitForSelector(this.titleHeader);

    await this.page
      .locator(this.selectProjectArea)
      .locator(this.selectProjectButtonArea)
      .locator(this.selectProjectButton)
      .click();

    // Čekání na aktivní tab
    await this.page.waitForSelector(this.activeTabSelector, {
      state: "visible",
    });
    await expect(this.page.locator(this.activeTabSelector)).toBeVisible();

    await this.page
      .locator(this.proDetailsFirstArea)
      .locator(this.proDetailsInputName)
      .fill(name);

    await this.page
      .locator(this.proDetailNextButtonArea)
      .locator(this.proDetailNextButton)
      .click();

    await this.page.waitForSelector(this.proDetailDeleteButton);

    await this.page
      .locator(this.proDetailNextButtonArea)
      .locator(this.proDetailStartButton)
      .click();
    await this.page.waitForSelector(this.disabledButton);

    await this.page
      .locator(this.taskArea)
      .locator(this.taskAreaSecond)
      .locator(this.taskButton)
      .click();
    await this.page.waitForSelector(this.greenFinishButton);

    await this.page
      .locator(this.mainTaskArea)
      .locator(this.mainTaskAreaInput)
      .fill("9789");

    await this.page
      .locator(this.saveBlackButtonArea)
      .locator(this.saveBlackButton)
      .click();
    await this.page.waitForSelector(this.greenTaskIcon);
  }
};
