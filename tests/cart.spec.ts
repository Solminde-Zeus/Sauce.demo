import {test,expect } from '@playwright/test'
import { UserCredentials,UserType,users } from '../test-data/users'
import { products } from '../test-data/products';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

 let productone = products[0];
let producttwo = products[1];



let loginpage : LoginPage
let productpage : ProductsPage
let cartpage : CartPage

test.describe("Product and Cart Automation testing", () => {
    test.beforeEach(async({page}) => {
       
        await page.goto("https://saucedemo.com");
       
        loginpage = new LoginPage(page);
        productpage = new ProductsPage(page);
        cartpage = new CartPage(page);


   await loginpage.login('standard_user', 'secret_sauce')

    })


   test('TC_005 - Product List should be Visible @regression ', async ({page})=> {

     await productpage.verifyProductsPageIsVisible()



  })
     test('TC_006- Add one product to the cart @regression @cart', async ({page})=> {


    await productpage.addProductToCart(productone.name);
     await productpage.verifyCartCount(1)

})



test('TC_007- Remove one Product  @regression @cart', async ({page})=> {
await productpage.addProductToCart(productone.name)
await productpage.verifyCartCount(1)
await productpage.removeProductFromCart(productone.name);
await expect(page.locator('[data-test= "shopping-cart-badge"]')).toHaveCount(0)

})



test('TC_009- Cart page should show selected products @regression @cart', async ({page})=> {


await productpage.addProductToCart(productone.name);
await productpage.addProductToCart(producttwo.name);
await productpage.goToCart()
await cartpage.verifyProductInCart(productone.name)
await cartpage.verifyProductInCart(producttwo.name)






})

test("TC_008 Add multiple products to cart @regression @cart ", async ({ page }) => {
   await productpage.addProductToCart(productone.name);
   await productpage.addProductToCart(producttwo.name);
  await productpage.verifyCartCount(2);
});

 









})




   