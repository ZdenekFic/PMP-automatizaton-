const { expect } = require("@playwright/test");
const exp = require("constants");
const { timeOuts } = require("../constants");

exports.GDM = class GDM {
  constructor(page, gdmName) {
    this.page = page;
    this.gdmName = gdmName;

    //enterToGdm_overviews function objects
    this.definitionsTab = page.getByRole("button", { name: "Definitions" });
    this.gdmTab = page.locator("span").filter({ hasText: "General Models" });
    this.filter = page.locator(
      "//div[@class='v-expansion-panel-header__icon']//i[@class='v-icon notranslate mdi mdi-chevron-down theme--light']"
    );
    this.myRecentItemsCheckbox = page.locator(
      "//div[@class='v-input--selection-controls__ripple primary--text']"
    );

    //generalForm function objects
    this.newGDMAddButton = page.getByRole("link", { name: "Add" });

    // name
    this.inputName = page.getByLabel("Name");

    //domains
    this.domainsArrow = page.locator("form i").first();
    //domainDiv
    this.domainsDiv = page.locator("div:nth-child(2) > .pt-0 > .v-input");
    //domain1
    this.domain1 = page
      .getByRole("option", { name: "ECOS" })
      .locator("div")
      .first();
    //domain2
    this.domain2 = page
      .getByRole("option", { name: "Certification" })
      .locator("div")
      .first();

    //domain3
    this.domain3 = page
      .getByRole("option", { name: "IP Projects" })
      .locator("div")
      .first();

    //TAGS
    this.tagsArrow = page.locator(
      "//button[@class='v-btn v-btn--flat v-btn--icon v-btn--round v-btn--tile theme--light elevation-2 v-size--default error--text']//i[@class='v-icon notranslate mdi mdi-upload theme--light']"
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
      "//div[@class='v-input v-input--is-label-active v-input--is-dirty theme--light v-text-field v-text-field--is-booted v-select v-select--chips v-select--is-multi v-autocomplete']"
    );

    //OWNER
    this.ownerInput = page.locator(
      "//button[@class='add-reference-textfield-append v-btn v-btn--flat v-btn--icon v-btn--round v-btn--tile theme--light elevation-2 v-size--default error--text']"
    );
    this.owner1 = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent v-dialog--scrollable']//tbody/tr[1]/td[1]"
    );
    this.ownerConfirm = page.locator(
      "//span[normalize-space()='Update Owner']"
    );

    //SAVE part
    this.saveButton = page.locator(".v-toolbar__content > button:nth-child(4)");
    this.dataModelTabCheck = page.locator(
      "//div[normalize-space()='Data model']"
    );

    //Delete part
    //delete ddm draft
    this.deleteDraftButtton = page.locator(
      "//i[@class='v-icon notranslate mdi mdi-delete theme--light']"
    );
    this.modalDeleteButton = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//span[normalize-space()='Delete']"
    );
    this.searchBarInput = page.locator(
      "//input[@ui-test-data='top-bar-search']"
    );
    this.searchedObject = page.locator(
      `//div[@class='v-list-item__title'][normalize-space()='${gdmName}']`
    );
    this.searchedArea = page.locator(
      "//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']"
    );

    //DATA model part objects

    //Data model objects
    //data model three dots button
    this.dataModelThreeDotsButton = page.locator(
      "(//button[@role='button'])[4]"
    );
    //mini menu with elements such as container, cb, dgl
    this.dataModelMenuObjects = page.locator(
      "//div[@class='v-list v-sheet theme--light']"
    );
    this.dataModelMenuObjectsTree = page.locator("//div[@role='tree']");

    this.dataModelMenuObjectsContainterButton = page.locator(
      "(//button[@role='button'])[5]"
    );
    this.dataModelMenuObjectsContainter = page.locator(
      "//span[@class='order-2'][normalize-space()='Container']"
    );
    this.dataModelMenuObjectsContainterName = page.getByRole("textbox", {
      name: "Name",
    });

    this.dataModelMenuObjectsContainterThreeDots = page.locator(
      "(//button[@role='button'])[5]"
    );
    this.dataModelMenuObjectsIdentifierButton = page.getByLabel("append icon");
    this.dataModelMenuObjectsIdentifierValue = page.getByLabel("Identifier");

    this.dataModelMenuObjectsGDMButton = page.locator(
      "(//span[@class='v-btn__content'])[23]"
    );
    this.dataModelMenuObjectsGDMConfirm = page.locator(
      "//button[@ui-test-data='add-btn']"
    );
    this.firstObjectGDMTable = page.locator("//tbody/tr[2]/td[1]");
    this.buttonNodeSelectionGDM = page.locator(
      "//div[normalize-space()='Node Selection']"
    );

    this.dataModelMenuObjectsCBButton = page.locator(
      "(//i[@class='v-icon notranslate mdi mdi-cube theme--light'])[3]"
    );
    this.dataModelMenuObjectsCBFirstObject = page.locator(
      "//div[@class='v-data-table__wrapper']//tbody/tr[1]/td[1]"
    );
    this.dataModelMenuObjectsCBConfirm = page.locator(
      "//div[@class='v-card__actions']//span[normalize-space()='Add']"
    );

    this.dataModelMenuObjectsDGLButton = page.locator(
      "//span[@class='v-btn__content']//i[@class='v-icon notranslate mdi mdi-cube-scan theme--light']"
    );
    this.dataModelMenuObjectsDGLFirstOBject = page.locator(
      "//div[@class='v-data-table__wrapper']//tbody/tr[1]/td[1]"
    );
    this.dataModelMenuObjectsDGLConfirm = page.locator(
      "//div[@class='v-card__actions']//button"
    );

    //save data model
    this.dataModelMenuObjectsSaveAll = page.locator(
      "//header[@class='v-sheet theme--light v-toolbar v-toolbar--dense v-toolbar--floating']//button[2]"
    );
  }
  async enterToGDM_Overviews() {
    await this.definitionsTab.click();
    await this.gdmTab.click();
  }

  async generalForm(gdmName) {
    //click on add button to get into new GDM generalForm
    await this.newGDMAddButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    //validate if newGDMAddButton was successful
    await expect(this.page.url()).toContain("/generalDataModels/new");

    //GENERAL FORM

    //filling a name
    await this.inputName.fill(gdmName);
    //validate if there is a value
    await expect(this.inputName).not.toBeEmpty();

    //add domain
    await this.domainsArrow.click();

    //add domain from dropdown
    await this.domain1.click();
    await this.domain2.click();
    await this.domain3.click();

    //hide dropdown
    await this.domainsArrow.click();

    //TAGS
    //click on arrow to open menu with tags values
    await this.tagsArrow.click();
    await this.page.waitForTimeout(timeOuts.timeM);
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
    await this.ownerInput.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    //add owner
    await this.owner1.click();
    //confirm table
    await this.ownerConfirm.click();

    //check if next tab DATA model is disabled how it should be before saving
    await expect(this.dataModelTabCheck).toHaveClass("v-tab v-tab--disabled");
    //save gdm
    await this.saveButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    //validation(if save was successfull datamodel tab shoud have class v-tab v-tab--active)
    await expect(this.dataModelTabCheck).toHaveClass("v-tab v-tab--active");
  }

  async findAndDelete(searchedText) {
    //Click on a searchbar
    await this.searchBarInput.fill(searchedText);
    await this.page.waitForTimeout(timeOuts.timeXL);

    if (await this.searchedObject.isVisible()) {
      await this.searchedObject.click();
      await this.page.waitForTimeout(timeOuts.timeM);
      await this.page.locator("body").click();
      await this.deleteDraftButtton.click();
      await this.modalDeleteButton.click();
      await this.page.waitForTimeout(timeOuts.timeL);
    } else {
      await this.page.locator("body").click();
    }
  }

  async dataModelTab(containerName) {
    // DATA MODEL TAB PART
    // click on menu "three dots button"
    await this.dataModelThreeDotsButton.click();
    //validation
    await expect(this.dataModelMenuObjects).toBeVisible();

    //add container to tree
    await this.dataModelMenuObjectsContainterButton.click();
    await expect(this.dataModelMenuObjectsContainter).toBeVisible();
    //check of name for  defaultcontainer
    await expect(this.dataModelMenuObjectsContainterName).toHaveValue(
      "Container"
    );

    //delete default value
    await this.dataModelMenuObjectsContainterName.clear();
    //fill in our name
    await this.dataModelMenuObjectsContainterName.fill(containerName);
    //validation
    await this.page.waitForTimeout(timeOuts.timeM);
    await expect(this.dataModelMenuObjectsContainterName).not.toBeEmpty();
    //click to get automated identifier
    await this.dataModelMenuObjectsIdentifierButton.click();
    //validation
    await expect(this.dataModelMenuObjectsIdentifierValue).not.toBeEmpty();
    //click on three dots but in container
    await this.dataModelMenuObjectsContainterThreeDots.click();
    await expect(this.dataModelMenuObjects).toBeVisible();

    //click on  GDM button in minimenu
    await this.dataModelMenuObjectsGDMButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    // choose first object in table
    await this.firstObjectGDMTable.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.buttonNodeSelectionGDM.click();
    await this.dataModelMenuObjectsGDMConfirm.click();
    // click on menu "three dots button"
    await this.dataModelThreeDotsButton.click();
    await expect(this.dataModelMenuObjects).toBeVisible();

    //add contant brick
    await this.dataModelMenuObjectsCBButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.dataModelMenuObjectsCBFirstObject.click();
    await this.dataModelMenuObjectsCBConfirm.click();

    // lets add DGL
    await this.dataModelThreeDotsButton.click();
    await expect(this.dataModelMenuObjects).toBeVisible();
    await this.page.waitForTimeout(timeOuts.timeM);

    await this.dataModelMenuObjectsDGLButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.dataModelMenuObjectsDGLFirstOBject.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.dataModelMenuObjectsDGLConfirm.click();
    await this.page.waitForTimeout(timeOuts.timeM);

    await this.dataModelMenuObjectsSaveAll.click();
  }
};
