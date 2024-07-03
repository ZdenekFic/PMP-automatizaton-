const { expect } = require("@playwright/test");
const { timeOuts,statusCode200,statusCode201 } = require("../constants");
const { requestAssert } = require('../constants');
const constants = require("../constants");



exports.DDM = class DDM {
  constructor(page, ddmName) {
    this.page = page;
    this.ddmName = ddmName;
    this.definitionsTab = page.locator('div[ui-test-data="nav-definitions"]');
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
      '.v-dialog.v-dialog--active.v-dialog--persistent.v-dialog--scrollable'
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
      'div[role="menu"].v-menu__content.theme--light.menuable__content__active'
    );

    this.buttonItem = page.locator('button[type="button"].v-btn.v-btn--block.v-btn--flat.v-btn--text.theme--light.v-size--default.error--text[role="button"]')
    this.dataModelMenuObjectsB = page.locator(
      'div.v-list.v-sheet.theme--light[data-v-2bf3179e]'
    )
    

    this.dataModelMenuObjectsContainterButton = page.locator(
      '.v-list-item theme--light'
    );
    this.dataModelMenuObjectsContainter = page.locator(
      'div.el-tree-node__content'
    );
    this.dataModelMenuObjectsContainterName = page.locator(
      '.v-text-field__slot input[type="text"][autofocus="autofocus"]'
    );
    
    this.dataModelMenuObjectsIdentifierButton = page.locator(
      'button[aria-label="append icon"].mdi-refresh'
    );

   

    this.dataModelMenuGDMModalFilter = page.locator(
      'button.v-expansion-panel-header:has-text("Filter")'
    );
    this.dataModelGDMdomains = page.locator(
      '.v-input__slot[role="button"][aria-haspopup="listbox"]'
    );
    this.gdmDomainsItem = page.getByText('Test Domain');
     
    
    
    this.dataModelMenuObjectsGDMConfirm = page.locator(
      'button[ui-test-data="add-btn"]'
    );

    this.firstObjectGDMTable = page.locator("//tbody/tr[2]/td[1]");
    this.buttonNodeSelectionGDM = page.locator(
      'div.v-card__title[ui-test-data="dialog-header"]'
    ).locator('.v-tab[role="tab"]');

    // add CB 
    this.cbDomain = page.locator('div[role="combobox"][aria-haspopup="listbox"].v-input__slot');
    this.dataModelMenuObjectsCBFirstObject = page.locator(
      'div.v-data-table.v-data-table--dense.theme--light[ui-test-data="items-table"]'
    ).locator('//tr/td[1]');
    

    

    //save data model
    this.saveArea = page.locator(
      'header.v-toolbar.v-toolbar--dense.v-toolbar--floating'
    );
    this.dataModelMenuObjectsSaveAll = page.locator(
      'button.v-btn--icon[role="button"]'
    );

    ///Delete part
    //delete ddm draft
    this.deleteDraftButtton = page.locator(
      'button[ui-test-data="delete-btn"].red--text'
    );
    this.modalDeleteButton = page.locator(
      'button[ui-test-data="delete-confirm-btn"]'
    );
    this.searchBarInput = page.locator(
      "input[ui-test-data='top-bar-search']"
    );
    this.searchedObject = page.locator(
      `//div[@class='v-list-item__title'][normalize-space()='${ddmName}']`
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
    await this.modalWindow.locator(this.item.nth(1)).click();
    await this.modalWindow.locator(this.item.nth(2)).click();
    await this.modalWindow.locator(this.item.nth(3)).click();
    await this.buttonUpdateTags.nth(1).click();

    //add owner
    await this.ownerRedArrow.click();
    await this.modalWindow.locator(this.item.nth(1)).click();
    await this.buttonUpdateTags.nth(2).click();

    
    

    //save general form
    await this.saveGreenButton.click();

    await requestAssert(this.page,constants.ddmRequest,constants.statusCode201)

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
    

    

    // DATA MODEL TAB PART
    // click on menu "three dots button"
    await this.dataModelThreeDotsButton.nth(1).click();
    await expect(this.dataModelMenuObjects).toBeVisible();
    //add container to tree
    await this.dataModelMenuObjects.locator(this.buttonItem).nth(0).click();
    await expect(this.dataModelMenuObjectsContainter.nth(1)).toBeVisible();
    //check of name for  defaultcontainer
    await expect(this.dataModelMenuObjectsContainterName.nth(1)).toHaveValue(
      "Container"
    );
    //delete default value
    await this.dataModelMenuObjectsContainterName.nth(1).clear();
    //fill in our name
    await this.dataModelMenuObjectsContainterName.nth(1).fill(containerName);
    //click to get automated identifier
    await this.dataModelMenuObjectsIdentifierButton.click();
    //click on three dots but in container
    await this.dataModelThreeDotsButton.nth(2).click();
    await expect(this.dataModelMenuObjects).toBeVisible();

    //click on  GDM button in minimenu
    await this.dataModelMenuObjects.locator(this.buttonItem).nth(2).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.dataModelMenuGDMModalFilter.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.dataModelGDMdomains.nth(2).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.gdmDomainsItem.nth(1).click();

    
    

    // choose first object in table
    await this.firstObjectGDMTable.click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.buttonNodeSelectionGDM.nth(1).click();
    await this.dataModelMenuObjectsGDMConfirm.click();
    
    // click on menu "three dots button"
    await this.dataModelThreeDotsButton.nth(1).click();
    await expect(this.dataModelMenuObjects).toBeVisible();

    //add contant brick
    await this.dataModelMenuObjects.locator(this.buttonItem).nth(3).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.modalWindow.locator(this.cbDomain).click()
    
    await this.gdmDomainsItem.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.dataModelMenuObjectsCBFirstObject.nth(1).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.gdmDomainsItem.nth(1).click();
    await this.dataModelMenuObjectsGDMConfirm.click();

    // lets add DGL
    await this.dataModelThreeDotsButton.nth(1).click();
    await expect(this.dataModelMenuObjects).toBeVisible();
    await this.page.waitForTimeout(timeOuts.timeM);

    await this.dataModelMenuObjectsCBButton.nth(4).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.dataModelMenuObjectsCBFirstObject.nth(0).click();
    await this.page.waitForTimeout(timeOuts.timeM);
    await this.dataModelMenuObjectsGDMConfirm.click();
    await this.page.waitForTimeout(timeOuts.timeM);

    await this.saveArea.locator(this.dataModelMenuObjectsSaveAll.nth(1)).click();

    await expect(successMessage).toContain("Domain Data Model has been");
  }};

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

  };