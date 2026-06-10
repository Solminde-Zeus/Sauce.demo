

import { Page, Locator, expect } from '@playwright/test'; 

import { products } from '../test-data/products'; 

 

const backpack  = products.find(p => p.name === 'Sauce Labs Backpack')!; 

const bikeLight = products.find(p => p.name === 'Sauce Labs Bike Light')!; 

 

export class ProductsPage { 

  readonly page: Page; 

  readonly cartBadge: Locator; 

  readonly cartLink: Locator; 

  readonly inventoryItems: Locator; 

 

  constructor(page: Page) { 

    this.page           = page; 

    this.cartBadge      = page.locator('[data-test="shopping-cart-badge"]'); 

    this.cartLink       = page.locator('[data-test="shopping-cart-link"]'); 

    this.inventoryItems = page.locator('[data-test="inventory-item"]'); 

  } 

 

  async verifyProductsPageIsVisible(): Promise<void> { 

    for (const card of await this.inventoryItems.all()) { 

      await expect(card).toBeVisible(); 

    } 

  } 

 

  async addProductToCart(productName: string): Promise<void> { 

    await this.page 

      .locator('.inventory_item') 

      .filter({ hasText: productName }) 

      .getByRole('button') 

      .click(); 

  } 

 

  async removeProductFromCart(productName: string): Promise<void> { 

    await this.page 

      .locator('.inventory_item') 

      .filter({ hasText: productName }) 

      .getByRole('button', { name: 'Remove' }) 

      .click(); 

  } 

 

  async addDefaultProductsToCart(): Promise<void> { 

    await this.addProductToCart(backpack.name); 

    await this.addProductToCart(bikeLight.name); 

  } 

 

  async removeDefaultProductFromCart(): Promise<void> { 

    await this.removeProductFromCart(backpack.name); 

  } 

 

  async verifyCartCount(expectedCount: number): Promise<void> { 

    await expect(this.cartBadge).toHaveText(expectedCount.toString()); 

  } 

 

  async verifyCartBadgeIsGone(): Promise<void> { 

    await expect(this.cartBadge).toHaveCount(0); 

  } 

 

  async verifySingleProductAdded(): Promise<void> { 

    await this.verifyCartCount(1); 

  } 

 

  async verifyTwoProductsAdded(): Promise<void> { 

    await this.verifyCartCount(2); 

  } 

 

  async goToCart(): Promise<void> { 

    await this.cartLink.click(); 

    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html'); 

  } 

} 

 
