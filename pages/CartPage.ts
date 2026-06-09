import { Locator, Page,expect } from "@playwright/test";
import { products } from "../test-data/products";
export class CartPage{
    readonly page: Page;
    readonly continueshop : Locator;

    constructor(page:Page){
        this.page = page;
        this.continueshop = page.locator('[data-test="continue-shopping"]')
    }

async verifyProductInCart(productName:string): Promise<void> {
   await expect(this.page.getByText(productName)).toBeVisible()

}
async continueShopping(): Promise<void> {
    await this.continueshop.click()
}
async checkout(): Promise<void> {
    await this.page.locator('[data-test="checkout"]').click()
}

}