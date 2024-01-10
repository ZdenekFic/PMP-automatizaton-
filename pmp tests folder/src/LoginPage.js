const { expect,getByLabel } = require("@playwright/test");
exports.LoginPage = class LoginPage {

    constructor(page,language) {
        this.page = page;
        this.usernameInput = page.getByLabel("Username or email");
        this.passwordInput = page.getByLabel("Password");
        this.submitButton = page.getByRole("button", { type: "submit" });
        this.titlePMP = page.getByRole("link", { name: "PMP" });
        this.logOutMenuButton = page.locator("header").getByRole("button").nth(2);
        this.logOutMenu = "//div[@class='v-list v-sheet theme--light']";
        this.logOutButton = page.locator('span[ui-test-data="top-bar-more-options-logout"]');
        this.expectedText = page.locator(".flip-card-inner");
        //Language tests
        this.mainLanguageMenu = "(//i[@class='v-icon notranslate mdi mdi-earth theme--light'])[1]";
        this.aktualniJazykElement = page.locator("//div[@class='v-list v-sheet theme--light v-list--dense']//span[@class='font-weight-bold']");
        this.choosenLanguage =  page.locator("//span[normalize-space()='" + language + "']");
        

        
    }

    async gotoLoginPage(url) {
        await this.page.goto(url);

    }

    async login(username,password) {
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

   
   
    async  languageMenu() {
        await this.page.$eval(
          this.mainLanguageMenu,
          (element) => element.click()
      );
      };

    async languageChoose() {
        await this.choosenLanguage.click();
    }
    
    async  languageCheck() {
        await this.page.$eval(
            this.mainLanguageMenu,
            (element) => element.click()
        );
    
        // Počkejte na zobrazení seznamu jazyků
        await this.page.waitForSelector('.v-list');
    
        // Získejte aktuální jazyk (tučný text)
        
    
        // Získání textu z elementu
        const aktualniJazykText = await this.aktualniJazykElement.innerText();
    
        console.log('Current language is ' + aktualniJazykText);
    
        // Vraťte hodnotu, kterou chcete použít mimo funkci
        return aktualniJazykText;
    }

    async languageResult(language) {
        //Verification 
        const aktualniJazyk = await this.languageCheck();
        await expect(aktualniJazyk).toMatch(language);
    }
}