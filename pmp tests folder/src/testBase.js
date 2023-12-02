const { test, expect } = require("@playwright/test");

// LOGIN Function
async function login(page, baseURL, username, password) {
  await page.goto(baseURL);

  await page.getByLabel("Username or email").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { type: "submit" }).click();

  // Verification if login was succesfull
  const titlePMP = await page.getByRole("link", { name: "PMP" });
  await expect(titlePMP).toBeVisible();
}



// LOGOUT Function
async function logout(page,expectedTitle) {
  await page.locator("header").getByRole("button").nth(2).click();
  await page.waitForSelector("//div[@class='v-list v-sheet theme--light']");

  const logoutButton = await page.locator('span[ui-test-data="top-bar-more-options-logout"]');
  await logoutButton.click();

  

  // Verification if log out was successfull
  const expectedText = await page.locator(".flip-card-inner");
  await expect(expectedText).toContainText(expectedTitle);
  await page.close();
}




module.exports = {
  login,
  logout,
  
}; // Exports function for using in another files
