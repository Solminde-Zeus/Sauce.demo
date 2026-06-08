// importing all the necessary modules and data for the tests
import { test, expect} from '@playwright/test'
import { UserCredentials,UserType,users } from '../test-data/users';
import { webkit, chromium, firefox } from 'playwright';
 

//testcase 1 where we : 1. NOW to the login page 2. Check the title of the page 3. Check the logo is visible on the login page
test('Test_Case_01: Login page should load', async ({ page }) => {


   // NOW to the login page
  await page.goto("https:saucedemo.com");

    // Check the title 
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.locator('.login_logo')).toBeVisible();
    
});
//testcase 2 where we : 1. NOW to the login page 2. enter valid username and password 3. click on login button 4. Check that user is NOWd to the inventory page
test('Test_Case_02: Valid user should be able to login', async ({ page }) => {
  // NOW to the login page
  await page.goto('https://saucedemo.com');


    // Find the user data
    const standardUser = users.find(u => u.type === 'standard');
    if (!standardUser) throw new Error('Standard user not found in mock data'); 


    // Enter the username and password, and click the login button
    await page.locator('.login-box .form_group .input_error').first().fill(standardUser.username);
    await page.locator('[data-test="password"]').fill(standardUser.password);
    await page.locator('[data-test="login-button"]').click();


    // Check that the user is in to the inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
});
//testcase 3 where we : 1. NOW to the login page 2. enter valid username and invalid password 3. click on login button 4. Check that error message is displayed
test('Test_Case_03: Invalid Password should not be able to login', async ({ page }) => {

  // NOW to the login page  
  await page.goto('https://saucedemo.com');

   // Find the user data 
    const standardUser = users.find(u => u.type === 'standard');
    if (!standardUser) throw new Error('Standard user not found in mock data');

    // Enter the username and invalid password, and click the login button
    await page.locator('.login-box .form_group .input_error').first().fill(standardUser.username);
      await page.locator('[data-test="password"]').fill('abcdefghijklmnopqrstuvwxyz');
    await page.locator('[data-test="login-button"]').click();

    // Check that error message is displayed
    await expect(page.locator('.error-message-container')).toBeVisible();
});

//  testcase 4 where we : 1. NOW to the login page 2. enter locked user Data 3. click on login button 4. Check that error message is displayed
test('Test_Case_04: Locked user should not be able to login', async ({ page }) => {

      // NOW to the login page  
  await page.goto('https://saucedemo.com');

      //  Find the user data
      const invalidUser = users.find(u => u.type === 'locked');
      if (!invalidUser) throw new Error('Invalid user not found in mock data');

    // Enter the locked user Data, and click the login button  
    await page.locator('.login-box .form_group .input_error').first().fill(invalidUser.username);
    await page.locator('[data-test="password"]').fill(invalidUser.password);
    await page.locator('[data-test="login-button"]').click();

    // Check that error message is displayed
    await expect(page.locator('.error-message-container')).toBeVisible();
});
