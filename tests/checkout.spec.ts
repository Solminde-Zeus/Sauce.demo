
import { test } from '@playwright/test';
import { users } from '../test-data/users';
import { products } from '../test-data/products';
import { Userdatas } from '../test-data/fill_user';
import { loginAs } from '../utils/testHelpers';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
 
const standardUser = users.find(u => u.type === 'standard')!;
const backpack      = products.find(p => p.name === 'Sauce Labs Backpack')!;
const bikeLight     = products.find(p => p.name === 'Sauce Labs Bike Light')!;
 
let productPage: ProductsPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
 
test.describe('Checkout - Automation Testing', () => {
 
  test.beforeEach(async ({ page }) => {
    productPage  = new ProductsPage(page);
    cartPage     = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
 
    await loginAs(page, standardUser);
    await productPage.addProductToCart(backpack.name);
    await productPage.addProductToCart(bikeLight.name);
    await productPage.goToCart();
  });
 
  test('TC_011 - Checkout page is visible @smoke @checkout', async () => {
    await cartPage.checkout();
    await checkoutPage.verifyCheckoutStepOneIsVisible();
  });
 
  test('TC_012 - Valid details moves to step two @smoke @checkout', async () => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutDetails(Userdatas.firstname, Userdatas.lastname, Userdatas.postalcode);
    await checkoutPage.continueCheckout();
    await checkoutPage.verifyCheckoutStepTwoIsVisible();
  });
 
  test('TC_013 - Missing first name shows error @negative @checkout', async () => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutDetails('', Userdatas.lastname, Userdatas.postalcode);
    await checkoutPage.continueCheckout();
    await checkoutPage.verifyMissingFirstNameError();
  });
 
  test('TC_014 - Missing last name shows error @negative @checkout', async () => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutDetails(Userdatas.firstname, '', Userdatas.postalcode);
    await checkoutPage.continueCheckout();
    await checkoutPage.verifyMissingLastNameError();
  });
 
  test('TC_015 - Missing postal code shows error @negative @checkout', async () => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutDetails(Userdatas.firstname, Userdatas.lastname, '');
    await checkoutPage.continueCheckout();
    await checkoutPage.verifyMissingPostalCodeError();
  });
 
  test('TC_016 - Full checkout flow completes order @smoke @checkout', async () => {
    await cartPage.checkout();
    await checkoutPage.fillCheckoutDetails(Userdatas.firstname, Userdatas.lastname, Userdatas.postalcode);
    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderConfirmation();
  });
 
});
 