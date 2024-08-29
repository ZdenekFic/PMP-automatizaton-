const { timeOuts } = require("./constants");

exports.HomePage = class HomePage {
  constructor(page, mainDomain) {
    this.page = page;
    this.mainDomain = mainDomain;

     //productFruits
     this.prodFruWindow = 'div.productfruits--container';

    // switch domain test objects
    this.taskButton = '[ui-test-data="nav-tasks"]';

    this.inputDomains = 'div[role="button"][aria-haspopup="listbox"]';
    this.dropDownDomainsMenu = "div[role='listbox']";
    this.changedDomain = `text=${mainDomain}`;
    this.checkedDomain = 'v-list-item.primary--text.v-list-item--active';

  }

  async switchDomains() {
    //click on e.g. task to get to Overview to get enabled menu dropdown for domains
    await this.page.locator(this.taskButton).click();
    
    // Najdeme hostitele Shadow DOM
const shadowHost = await this.page.locator('div.productfruits--container');

// Přístup k shadowRoot
const shadowRoot = await shadowHost.evaluateHandle((element) => element.shadowRoot);

// Najdeme tlačítko "Close" uvnitř shadowRoot
const closeButton = await shadowRoot.$('button:has-text("Close")');

// Klikneme na tlačítko "Close", pokud existuje
if (closeButton) {
    await closeButton.click();
    console.log("Pop-up was closed.");
} else {
    console.log("Close button not found.");
}



    

   
    //click on input to get dropdown with domains
    await this.page.locator(this.inputDomains).nth(0).click();
    await this.page.waitForSelector(this.dropDownDomainsMenu);

    //Choose a marketing domain
    await this.page.click(this.changedDomain);

  }}
