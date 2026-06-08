import { test, expect} from '@playwright/test'
import { UserCredentials,UserType,users } from '../test-data/users';
import { webkit, chromium, firefox } from 'playwright';
 


test('Test_Case_10: Check out with valid data', async ({ page }) => {
    //  NOW to the login page  
    await page.goto('https://www.saucedemo.com');
    const standardUser = users.find(u => u.type === 'standard');
    if (!standardUser) throw new Error('Standard user DATA is not found in mock data');
    //  Enter the username and password, and click the login button
    await page.locator('.login-box .form_group .input_error').first().fill(standardUser.username);
    await page.locator('[data-test="password"]').fill(standardUser.password);
    await page.locator('[data-test="login-button"]').click();
    //  Add the first item to the cart
    await page.locator('.inventory_list .inventory_item').first().locator('button').click();
    await page.locator('.shopping_cart_link').click();
    //  Click the checkout button
    await page.locator('[data-test="checkout"]').click();   
    //  Fill in the checkout information and continue
    await page.locator('[data-test="firstName"]').fill('Jayesh');
    await page.locator('[data-test="lastName"]').fill('Solminde');
    await page.locator('[data-test="postalCode"]').fill('401303');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    //  Verify that the checkout overview page is displayed with the correct information
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();    
});



test('Test_Case_11: Check out with no name data', async ({ page }) => {
    //  NOW to the login page  
    await page.goto('https://www.saucedemo.com');
    const standardUser = users.find(u => u.type === 'standard');
    if (!standardUser) throw new Error('Standard user DATA is not found in mock data');
    //  Enter the username and password, and click the login button
    await page.locator('.login-box .form_group .input_error').first().fill(standardUser.username);
    await page.locator('[data-test="password"]').fill(standardUser.password);
    await page.locator('[data-test="login-button"]').click();
    //  Add the first item to the cart
    await page.locator('.inventory_list .inventory_item').first().locator('button').click();
    await page.locator('.shopping_cart_link').click();
    //  Click the checkout button
    await page.locator('[data-test="checkout"]').click()
    //  Fill in the checkout information and continue
    await page.locator('[data-test="firstName"]').fill('');
    await page.locator('[data-test="lastName"]').fill('');
    await page.locator('[data-test="postalCode"]').fill('401303');
    await page.locator('[data-test="continue"]').click();
    //  Verify that the error message is displayed for missing name data
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
});



test('Test_Case_12: Check out with no pin code data', async ({ page }) => {
    //  NOW to the login page  
    await page.goto('https://www.saucedemo.com');
    const standardUser = users.find(u => u.type === 'standard');
    if (!standardUser) throw new Error('Standard user DATA is not found in mock data');
    //  Enter the username and password, and click the login button
    await page.locator('.login-box .form_group .input_error').first().fill(standardUser.username);
    await page.locator('[data-test="password"]').fill(standardUser.password);
    await page.locator('[data-test="login-button"]').click();
    //  Add the first item to the cart
    await page.locator('.inventory_list .inventory_item').first().locator('button').click();
    await page.locator('.shopping_cart_link').click();
    //  Click the checkout button
    await page.locator('[data-test="checkout"]').click()
    //  Fill in the checkout information and continue
    await page.locator('[data-test="firstName"]').fill('Jayesh');
    await page.locator('[data-test="lastName"]').fill('Solminde');
    await page.locator('[data-test="postalCode"]').fill('');
    await page.locator('[data-test="continue"]').click();
    //  Verify that the error message is displayed for missing name data
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
});