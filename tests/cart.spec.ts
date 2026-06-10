

import { test } from '@playwright/test'; 
import { loginAsStandard } from '../utils/testHelper';
import { ProductsPage } from '../pages/ProductsPage'; 
import { CartPage } from '../pages/CartPage'; 
 
let productPage: ProductsPage;
let cartPage: CartPage; 
 
test.describe('Cart - Automation Testing', () => { 
 
  test.beforeEach(async ({ page }) => { 
    productPage = new ProductsPage(page);
    cartPage    = new CartPage(page); 
    await loginAsStandard(page); 
  }); 
 
  test('TC_006 - Product list is visible @regression', async () => { 
    await productPage.verifyProductsPageIsVisible(); 
  }); 
 
  test('TC_007 - Add one product to cart @regresson @cart', async () => { 
    await productPage.addDefaultProductsToCart(); 
    await productPage.verifySingleProductAdded(); 
  }); 
 
  test('TC_008 - Remove product from cart @regression @cart', async () => { 
    await productPage.addDefaultProductsToCart(); 
    await productPage.verifySingleProductAdded(); 
    await productPage.removeDefaultProductFromCart(); 
    await productPage.verifyCartBadgeIsGone(); 
  }); 
 
  test('TC_009 - Add multiple products to cart @regression @cart', async () => { 
    await productPage.addDefaultProductsToCart(); 
    await productPage.verifyTwoProductsAdded(); 
  }); 

  test('TC_010 - Cart shows all selected products @regression @cart', async () => { 
    await productPage.addDefaultProductsToCart(); 
    await productPage.goToCart(); 
    await cartPage.verifyDefaultProductsInCart(); 

  });  

}); 
