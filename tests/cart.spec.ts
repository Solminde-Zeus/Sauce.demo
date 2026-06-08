import { test, expect} from '@playwright/test'
import { UserCredentials,UserType,users } from '../test-data/users';
import { webkit, chromium, firefox } from 'playwright';
 


test('Test_Case_05: Product list should be visivle after login product cart should be visible', async ({ page }) => {
    //  NOW to the login page  
    await page.goto('https://www.saucedemo.com');
    const standardUser = users.find(u => u.type === 'standard');
    if (!standardUser) throw new Error('Standard user DATA is not found in mock data');
    //  Enter the username and password, and click the login button
    await page.locator('.login-box .form_group .input_error').first().fill(standardUser.username);
    await page.locator('[data-test="password"]').fill(standardUser.password);
    await page.locator('[data-test="login-button"]').click();
    // Verify that the product list is visible and product cart is visible
    await expect(page.locator('.inventory_list')).toBeVisible();
    const productCart = page.locator('.shopping_cart_link');
    await expect(productCart).toBeVisible();
});


test('Test_case_06: Add one product tocart and verify the cart count', async ({ page }) => {
     
    await page.goto('https://www.saucedemo.com');
    const standardUser = users.find(u => u.type === 'standard');
    if (!standardUser) throw new Error('Standard user DATA is not found in mock data');

    await page.locator('.login-box .form_group .input_error').first().fill(standardUser.username);
    await page.locator('[data-test="password"]').fill(standardUser.password);
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    const cartCount = page.locator('.shopping_cart_badge');
    await expect(cartCount).toHaveText('1');
});
//  testcase 7 where we : 1. NOW to the login page 2. login with valid credentials 3. add one product to cart 4. remove the product from cart and verify that it gets removed from the cart and cart count should be updated
test('TEst_Case_07: Remove the product and it gets removed from the cart and cart count should be updated', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const standardUser = users.find(u => u.type === 'standard');
    if (!standardUser) throw new Error('Standard user DATA is not found in mock data'); 
    await page.locator('.login-box .form_group .input_error').first().fill(standardUser.username);
    await page.locator('[data-test="password"]').fill(standardUser.password);
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    const cartCount = page.locator('.shopping_cart_badge');
    await expect(cartCount).toBeHidden();
});

test('Test_Case_08: Add multiple products to cart and verify the cart count', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const standardUser = users.find(u => u.type === 'standard');
    if (!standardUser) throw new Error('Standard user DATA is not found in mock data');
    await page.locator('.login-box .form_group .input_error').first().fill(standardUser.username);
    await page.locator('[data-test="password"]').fill(standardUser.password);
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    const cartCount = page.locator('.shopping_cart_badge');
    await expect(cartCount).toHaveText('2');
});

test('Test_Case_10: Cart Pgage should show sleected products and their details', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const standardUsers =users.find(u => u.type === 'standard');
    if (!standardUsers) throw new Error('Standard user DATA is not found in mock data');
    await page.locator('.login-box .form_group .input_error').first().fill(standardUsers.username);
    await page.locator('[data-test="password"]').fill(standardUsers.password); 
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('.shopping_cart_link').click();
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
    const firstCartItem = cartItems.nth(0);
    await expect(firstCartItem.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(firstCartItem.locator('.inventory_item_price')).toHaveText('$29.99');
    const secondCartItem = cartItems.nth(1);
    await expect(secondCartItem.locator('.inventory_item_name')).toHaveText('Sauce Labs Bike Light');
    await expect(secondCartItem.locator('.inventory_item_price')).toHaveText('$9.99');
});
