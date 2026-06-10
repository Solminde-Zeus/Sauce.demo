

import { Page, Locator, expect } from '@playwright/test'; 

import { products } from '../test-data/products'; 

 

const backpack  = products.find(p => p.name === 'Sauce Labs Backpack')!; 
const bikeLight = products.find(p => p.name === 'Sauce Labs Bike Light')!; 
 

export class CartPage { 

  readonly page: Page; 
  readonly continueShoppingButton: Locator; 
  readonly checkoutButton: Locator; 

 

  constructor(page: Page) { 

    this.page= page; 
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]'); 
    this.checkoutButton = page.locator('[data-test="checkout"]'); 
  } 

 

  async verifyProductInCart(productName: string): Promise<void> { 
    await expect(this.page.getByText(productName)).toBeVisible(); 

  } 

 

  async verifyDefaultProductsInCart(): Promise<void> { 
    await this.verifyProductInCart(backpack.name); 
    await this.verifyProductInCart(bikeLight.name); 

  } 

 

  async verifyCartPageIsVisible(): Promise<void> { 

    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html'); 
    await expect(this.continueShoppingButton).toBeVisible(); 
    await expect(this.checkoutButton).toBeVisible(); 

  } 

 

  async continueShopping(): Promise<void> { 
    await this.continueShoppingButton.click(); 
  } 

 

  async checkout(): Promise<void> { 
    await this.checkoutButton.click(); 
  } 

} 

