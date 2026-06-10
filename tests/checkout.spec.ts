import {test,expect } from '@playwright/test'
import { UserCredentials,UserType,users } from '../test-data/users'
import { products } from '../test-data/products';
import { Userdata, Userdatas } from '../test-data/fill_user';
import { loginAsStandardUser } from '../utils/testHelper';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';



let productpage : ProductsPage
let cartpage : CartPage
let checkoutpage: CheckoutPage
let loginpage: LoginPage
let product1 = products[0];
let product2 = products[1];

test.describe("Checkout Validation Automation", () => {
    test.beforeEach(async({page}) => {
                productpage = new ProductsPage(page);
                cartpage = new CartPage(page);
                checkoutpage = new CheckoutPage(page)
                loginpage = new LoginPage(page)

   
    
        await page.goto('https://saucedemo.com');
   

      await loginAsStandardUser(page)
      await productpage.addProductToCart(product1.name);
await productpage.addProductToCart(product2.name);
await productpage.goToCart()
      


    })

test('TC__010-Checkout with Valid Details @smoke @checkout', async ({page}) =>{

await cartpage.checkout()
await checkoutpage.fillCheckoutDetails(Userdatas.firstname,Userdatas.lastname,Userdatas.postalcode);
await checkoutpage.continueCheckout()
await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")

    })
test('TC__011-Checkout with missing first name @negative @checkout', async ({page}) =>{
await cartpage.checkout()
await checkoutpage.fillCheckoutDetails("",Userdatas.lastname,Userdatas.postalcode);
await checkoutpage.continueCheckout()
await expect(page.locator('[data-test = "error"]')).toHaveText('Error: First Name is required')


    })
test('TC__012-Checkout with missing postal code @negative @checkout', async ({page}) =>{
await cartpage.checkout()
await checkoutpage.fillCheckoutDetails(Userdatas.firstname,Userdatas.lastname,"");
await checkoutpage.continueCheckout()
await expect(page.locator('[data-test = "error"]')).toHaveText('Error: Postal Code is required')



    })

})