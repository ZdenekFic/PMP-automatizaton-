const { cbName, timeOuts } = require("../constants");
const { expect } = require("@playwright/test");

exports.DDM = class DDM {
  constructor(page, ddmName) {
    this.page = page;
    this.ddmName = ddmName;
    this.definitionsTab = this.definitionsTab = page.locator('div[ui-test-data="nav-definitions"]');
    this.domainModelsTab = page.locator(
      'span[ui-test-data="nav-definitions-data-models"]'
    );
    this.domainModelsAddButton = page.locator('a[ui-test-data="overview-header-add-btn"]');

    //general Form objects
    //Domains
    this.generalFormName = page.getByLabel("Name");
    this.generalFormDomainsRedArrow = page.locator(
      'div.v-input__slot[role="combobox"]'
    );
    this.domainsListBox = page.locator('div[role="listbox"]')
    this.domainsItem1 = page.locator('div[role="option"]:nth-of-type(1)');
    this.domainsItem2 = page.locator('div[role="option"]:nth-of-type(2)');
    this.domainsItem3 = page.locator('div[role="option"]:nth-of-type(3)');

    // Tags objects
    this.redArrow = page.locator(
      'button[ui-test-data="upload-btn"]'
    );
    this.item = page.locator(
      "//tr/td[1]"
    );
    this.modalWindow = page.locator(
      "div.v-card.v-sheet.theme--light[data-v-516a0fde]"
    );
    
    this.buttonUpdateTags = page.locator(
      'button[ui-test-data="update-btn"]'
    );

    //default DMI tags
    

    // add owner
    this.ownerRedArrow = page.locator('button[ui-test-data="open-list-btn"]');

    //modal window with message to save if DDM with same name alreade exists
    this.controlDupliciteModal = page.locator('div.v-card.v-sheet.theme--light[data-v-1970b457]')

    //save general form
    this.saveGreenButton = page.locator(
      'button[aria-haspopup="true"][aria-expanded="false"] .mdi-content-save'
    );
    this.ddmHasBeenCreated = page.getByText(
      "Domain Data Model has been created"
    );

    //Data model objects
    this.navBar = page.locator('div.detail-tab-menu-header-container[role="tab"]');
    this.dataModelTab = page.locator('.v-tab.v-tab--active[role="tab"]');
    this.dataModelThreeDotsButton = page.locator(
      '.mdi-dots-vertical'
    );
    this.dataModelMenuObjects = page.locator(
      'div.v-menu__content.menuable__content__active[data-v-2bf3179e]'
    );
    

    this.dataModelMenuObjectsContainterButton = page.locator(
      'button.v-btn--text.error--text[data-v-2bf3179e]'
    );
    this.dataModelMenuObjectsContainter = page.locator(
      "//span[@class='order-2'][normalize-space()='Container']"
    );
    this.dataModelMenuObjectsContainterName = page.locator(
      "(//div[@class='v-input__control'])[14]//input"
    );
    this.dataModelMenuObjectsContainterThreeDots = page.locator(
      "(//button[@role='button'])[5]"
    );
    this.dataModelMenuObjectsIdentifierButton = page.locator(
      "(//div[@class='row'])[16]//button[@aria-label='append icon']"
    );

    this.dataModelMenuObjectsGDMButton = page.locator(
      "(//span[@class='v-btn__content'])[24]"
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

    ///Delete part
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
      `//div[@class='v-list-item__title'][normalize-space()='${ddmName}']`
    );
    this.searchedArea = page.locator(
      "//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']"
    );
  }

  async enterToDDM() {
    // go to definition
    await this.definitionsTab.click();

    // click on domain models
    await this.domainModelsTab.click();
    await this.page.waitForTimeout(timeOuts.timeM);
  }

  async generalForm(name, containerName) {
    // click on ADD button
    await this.domainModelsAddButton.click();
    await this.page.waitForTimeout(timeOuts.timeM);

    // fill the name
    await this.generalFormName.fill(name);

    //click on dropdown for domains
    await this.generalFormDomainsRedArrow.nth(2).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.domainsListBox.nth(1).locator(this.domainsItem1).click();
    await this.domainsListBox.nth(1).locator(this.domainsItem2).click();
    await this.domainsListBox.nth(1).locator(this.domainsItem3).click();
    await this.page.keyboard.press('Escape');
    
    

    

    // add tags
    await this.redArrow.nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.item.nth(1)).click();
    await this.modalWindow.locator(this.item.nth(2)).click();
    await this.modalWindow.locator(this.item.nth(3)).click();
    await this.buttonUpdateTags.click();

    // add default DMI tags
    await this.redArrow.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.nth(1).locator(this.item.nth(1)).click();
    await this.modalWindow.nth(1).locator(this.item.nth(2)).click();
    await this.modalWindow.nth(1).locator(this.item.nth(3)).click();
    await this.buttonUpdateTags.nth(1).click();

    //add owner
    await this.ownerRedArrow.click();
    await this.modalWindow.nth(2).locator(this.item.nth(1)).click();
    await this.buttonUpdateTags.nth(2).click();

    
    

    //save general form
    await this.saveGreenButton.click();
    await this.page.waitForTimeout(timeOuts.timeL);

    if(await this.controlDupliciteModal.isVisible()){
      await this.page.click('button:has-text("No")');

    } else{
      //validation of success message
    const successMessage = await this.ddmHasBeenCreated.textContent();
    await expect(successMessage).toContain("Domain Data Model has been");

    //assertions after save cb
    await expect(this.generalFormName).not.toBeEmpty();

    //expect if datamodel tab is enabled after save
    //await expect(this.navBar).toHaveClass("v-tab v-tab--active");
    }};

    
async dataModelSet(){
    // DATA MODEL TAB PART
    // click on menu "three dots button"
     this.dataModelThreeDotsButton.nth(1).click();
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
    //click to get automated identifier
    await this.dataModelMenuObjectsIdentifierButton.click();
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

    await expect(successMessage).toContain("Domain Data Model has been");
  }

    async checkAndDelete(searchedText) {
      //Click on a searchbar
      await this.searchBarInput.fill(searchedText);
      await this.page.waitForTimeout(timeOuts.timeXL);
  
      if (await this.searchedObject.isVisible()) {
        await this.searchedObject.click();
        await this.page.waitForTimeout(timeOuts.timeM);
        await this.page.locator('body').click();
        
        await this.deleteDraftButtton.click();
        await this.modalDeleteButton.click();
        await this.page.waitForTimeout(timeOuts.timeL);
      } 
    }

  }