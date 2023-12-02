const { login, logout } = require('../src/testBase.js');
const { test, expect } = require("@playwright/test");
const constants = require('../src/constants.js');



const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;


test("Hiding left menu", async ({ page }) => {
    //Login page and signing in
    await login(page,baseURL,username,password);

    //clicking on button for hiding left menu
    await page.getByRole('link', { name: 'PMP' }).getByRole('button').click();

    //Assertions left menu is realla hidden
    const buttonOpenLeftMenu = await page.getByRole('navigation').locator('button').nth(1);
    await expect(buttonOpenLeftMenu).toBeVisible();


  
  await logout(page,loggedOUTpageTitle)  
  });

  test("Opening left menu", async ({ page }) => {
     //Login page and signing in
     await login(page,baseURL,username,password);

     //clicking on button for hiding left menu
     await page.getByRole('link', { name: 'PMP' }).getByRole('button').click();
 
     //Assertions left menu is realla hidden
     const buttonOpenLeftMenu = await page.getByRole('navigation').locator('button').nth(1);
     await expect(buttonOpenLeftMenu).toBeVisible();
 
    
    await page.getByRole('navigation').locator('button').nth(1).click();

    //Assertions left menu is realla hidden
    const buttonHideLeftMenu = await page.getByRole('link', { name: 'PMP' }).getByRole('button');
    await expect(buttonHideLeftMenu).toBeVisible();


  
  await logout(page,loggedOUTpageTitle)  
  });
