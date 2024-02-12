const {} = require("@playwright/test");
const { baseURL, timeOuts } = require("./constants");
const { expect } = require("@playwright/test");

exports.Users = class Users {
  constructor(page, domain, role, account) {
    this.page = page;
    this.buttonUserAdministration = page.getByRole("button", {
      name: "User Administration",
    });
    this.buttonUsersTab = page.getByText("Users");
    this.searchBarInput = page.locator(
      "//div[@class='row justify-space-between']//input"
    );
    this.buttonUserDetail = page.getByRole("link", { name: account });
    this.tabDomainRoles = page.getByRole("tab", { name: "User domain roles" });
    this.buttonAdd = page.getByRole("button", { name: "Add" });
    this.domainList = page.getByLabel("Domain", { exact: true });
    this.domainChoice = page.getByRole("option").nth(domain);
    this.rolesList = page.getByLabel("Role", { exact: true });
    this.rolesChoice = page.getByRole("option").nth(role);
    this.noData = page.getByText("Nejsou dostupná žádná data");
    this.somaData = page.locator(
      "//div[@class='v-menu__content theme--light v-menu__content--fixed menuable__content__active v-autocomplete__content']"
    );
    this.buttonCancel = page.locator("form").getByRole("button").first();
    this.buttonAddModal = page.locator(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//form[@class='v-form']//div[@class='v-card v-sheet theme--light']//span[contains(text(),'Add')]"
    );
  }

  async domainRolesEdit(name) {
    await this.page.waitForTimeout(timeOuts.timeL);
    //Going to account we want to edit
    // Left panel/User administration
    await this.buttonUserAdministration.click();
    //validation
    await expect.soft(this.buttonUsersTab).toBeVisible();

    // User Administration/Users
    await this.buttonUsersTab.click();
    await this.page.waitForTimeout(timeOuts.timeM);

    //Find user with a searchbar
    await this.searchBarInput.fill(name);

    // Clicking on user detail
    await this.buttonUserDetail.click();

    // In user detail we choose User domain roles tabb
    await this.tabDomainRoles.click();

    // Clicking on button ADD
    await this.buttonAdd.click();

    // Clicking on list
    await this.domainList.click();

    // Clicking on a domain which value is set in constants Domain
    await this.domainChoice.click();

    // Clicking on a list with roles
    await this.rolesList.click();
    await this.page.waitForTimeout(timeOuts.timeM);

    const text = await this.somaData.textContent();
    console.log(text);
    //Clicking on first data in a list and if there is no data it will pass it
    if (
      (await this.somaData.textContent()) === "Nejsou dostupná žádná data" ||
      (await this.somaData.textContent()) === "No data available"
    ) {
      await this.buttonCancel.click();
    } else {
      await this.rolesChoice.click();
      await this.buttonAddModal.click();
    }
  }
};
