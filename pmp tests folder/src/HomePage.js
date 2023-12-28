const { testInfo, attach } = require("@playwright/test");

exports.HomePage = class HomePage {

    constructor(page,testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.taskButton = page.getByRole('navigation').locator('span').filter({ hasText: 'Tasks' });
        this.inputDomains = "(//div[@class='v-select__slot'])[1]";
        this.dropDownDomainsMenu = "//div[@class='v-menu__content theme--light v-menu__content--fixed menuable__content__active']";
        this.changedDomain = "//div[contains(text(),'Marketing')]";
        this.checkedDomain = "//div[@class='v-select__selection v-select__selection--comma'][normalize-space()='Marketing']";
        
    }



    async switchDomains() {
        //click on e.g. task to get to Overview to get enabled menu dropdown for domains
        await this.taskButton.click();
        await this.page.waitForTimeout(3000);
        //click on input to get dropdown with domains
        await this.page.locator(this.inputDomains).click();
        await this.page.waitForSelector(this.dropDownDomainsMenu);

        //Choose a marketing domain
        await this.page.locator(this.changedDomain).click()

    }

    async switchDomainsAssert() {

        const dropdownElement = await this.page.locator(this.checkedDomain);
        //await expect(dropdownElement).toBeVisible();
        if(await dropdownElement.isVisible()) {
            await this.page.waitForTimeout(1000);
            await this.page.screenshot({ path: 'screenshots/screenshot.png', fullPage: true }); 

        // Vytiskne informaci o tom, kde byl screenshot uložen
        console.log('Screenshot was saved into folder: screenshots');
                }

        
        }



}