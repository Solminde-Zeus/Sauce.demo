
import { test } from '@playwright/test'; 
import { loginAsStandard } from '../utils/testHelper';
import { ProductsPage } from '../pages/ProductsPage'; 
import { CartPage } from '../pages/CartPage'; 
import { CheckoutPage } from '../pages/CheckoutPage'; 

 

let productPage: ProductsPage; 
let cartPage: CartPage; 
let checkoutPage: CheckoutPage; 

test.describe('Checkout - Automation Testing', () => { 

  test.beforeEach(async ({ page }) => { 

    productPage  = new ProductsPage(page);
    cartPage     = new CartPage(page);
    checkoutPage = new CheckoutPage(page); 

    await loginAsStandard(page); 
    await productPage.addDefaultProductsToCart()
    await productPage.goToCart();
  }); 

  test('TC_011 - Checkout page is visible @smoke @checkout', async () => { 

    await cartPage.checkout(); 
    await checkoutPage.verifyCheckoutStepOneIsVisible(); 

  }); 
 
  test('TC_012 - Valid details moves to step two @smoke @checkout', async () => { 

    await cartPage.checkout(); 
    await checkoutPage.fillValidCheckoutDetails(); 
    await checkoutPage.continueCheckout(); 
    await checkoutPage.verifyCheckoutStepTwoIsVisible(); 

  }); 
  
   test('TC_013 - Missing first name shows error @negative @checkout', async () => { 

    await cartPage.checkout(); 
    await checkoutPage.fillWithMissingFirstName(); 
    await checkoutPage.continueCheckout(); 
    await checkoutPage.verifyMissingFirstNameError(); 

  }); 

  test('TC_014 - Missing last name shows error @negative @checkout', async () => { 

    await cartPage.checkout(); 
    await checkoutPage.fillWithMissingLastName(); 
    await checkoutPage.continueCheckout(); 
    await checkoutPage.verifyMissingLastNameError(); 

  }); 

  test('TC_015 - Missing postal code shows error @negative @checkout', async () => { 

    await cartPage.checkout(); 
    await checkoutPage.fillWithMissingPostalCode(); 
    await checkoutPage.continueCheckout(); 
    await checkoutPage.verifyMissingPostalCodeError(); 

  }); 

  test('TC_016 - Full checkout flow completes order @smoke @checkout', async () => { 

    await cartPage.checkout();
    await checkoutPage.fillValidCheckoutDetails(); 
    await checkoutPage.continueCheckout(); 
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderConfirmation();
  }); 

}); 

 

 
