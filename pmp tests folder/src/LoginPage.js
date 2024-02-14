const { expect, getByLabel } = require("@playwright/test");
exports.LoginPage = class LoginPage {
  constructor(page, language) {
    this.page = page;
    //login
    this.usernameInput = page.locator('input[type="text"][data-v-86df1422]');
    this.passwordInput = page.locator('input[type="password"][data-v-86df1422]');
    this.submitButton = page.locator('button[data-v-5bf93122][name="login"]');
    this.titlePMP = page.locator('span[data-v-32e88e0e].nav-menu-title');
    
    //log out
    this.logOutMenuButton = page.locator('i[data-v-464da812]').nth(1);
    this.logOutMenu = '[ui-test-data="top-bar-more-options-my-acc"][data-v-464da812]';
    this.logOutButton = page.locator(
      'span[ui-test-data="top-bar-more-options-logout"][data-v-464da812]'
    );
    this.expectedText = page.locator('h1[data-v-a29247dc]');
    
    //Language tests
    this.mainLanguageMenu =
      'i.mdi.mdi-earth[data-v-95744cba]';

    this.languageBox = ".v-list";
    this.actualLanguage = page.locator(
      "//div[@class='v-list v-sheet theme--light v-list--dense']//span[@class='font-weight-bold']"
    );
    this.choosenLanguage = page.locator(
      "//span[normalize-space()='" + language + "']"
    );
  }

  async gotoLoginPage(url) {
    await this.page.goto(url);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async loginAssert() {
    await expect(this.titlePMP).toBeVisible();
  }

  async logOut() {
    //Click on button for dropdown menu
    await this.logOutMenuButton.click();
    //Wait for a menu whit buttons
    await this.page.waitForSelector(this.logOutMenu);
    //Click on button for logOut
    await this.logOutButton.click();
  }

  async logOutAssert(expectedTitle) {
    await expect(this.expectedText).toContainText(expectedTitle);
    await this.page.close();
  }

  async languageMenu() {
    await this.page.$eval(this.mainLanguageMenu, (element) => element.click());
  }

  async languageChoose() {
    await this.choosenLanguage.click();
  }

  async languageCheck() {
    await this.page.$eval(this.mainLanguageMenu, (element) => element.click());

    // Počkejte na zobrazení seznamu jazyků
    await this.page.waitForSelector(this.languageBox);

    // Získejte aktuální jazyk (tučný text)

    // Získání textu z elementu
    const actualLanguageText = await this.actualLanguage.innerText();

    console.log("Current language is " + actualLanguageText);

    // Vraťte hodnotu, kterou chcete použít mimo funkci
    return actualLanguageText;
  }

  async languageResult(language) {
    //Verification
    const aktualniJazyk = await this.languageCheck();
    await expect(aktualniJazyk).toMatch(language);
  }
};
