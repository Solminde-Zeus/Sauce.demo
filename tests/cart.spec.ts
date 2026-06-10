
import { test } from '@playwright/test';
import { users } from '../test-data/users';
import { products } from '../test-data/products';
import { loginAs } from '../utils/testHelpers';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
 
const standardUser = users.find(u => u.type === 'standard')!;
const backpack      = products.find(p => p.name === 'Sauce Labs Backpack')!;
const bikeLight     = products.find(p => p.name === 'Sauce Labs Bike Light')!;
 
let productPage: ProductsPage;
let cartPage: CartPage;
 
test.describe('Cart - Automation Testing', () => {
 
  test.beforeEach(async ({ page }) => {
    productPage = new ProductsPage(page);
    cartPage    = new CartPage(page);
    await loginAs(page, standardUser);
  });
 
  test('TC_006 - Product list is visible @regression', async () => {
    await productPage.verifyProductsPageIsVisible();
  });
 
  test('TC_007 - Add one product to cart @regression @cart', async () => {
    await productPage.addProductToCart(backpack.name);
    await productPage.verifyCartCount(1);
  });
 
  test('TC_008 - Remove product from cart @regression @cart', async () => {
    await productPage.addProductToCart(backpack.name);
    await productPage.verifyCartCount(1);
    await productPage.removeProductFromCart(backpack.name);
    await productPage.verifyCartBadgeIsGone();
  });
 
  test('TC_009 - Add multiple products to cart @regression @cart', async () => {
    await productPage.addProductToCart(backpack.name);
    await productPage.addProductToCart(bikeLight.name);
    await productPage.verifyCartCount(2);
  });
 
  test('TC_010 - Cart shows all selected products @regression @cart', async () => {
    await productPage.addProductToCart(backpack.name);
    await productPage.addProductToCart(bikeLight.name);
    await productPage.goToCart();
    await cartPage.verifyProductInCart(backpack.name);
    await cartPage.verifyProductInCart(bikeLight.name);
  });
 
});
 
 
