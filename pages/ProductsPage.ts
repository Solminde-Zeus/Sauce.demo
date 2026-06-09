import { Page , Locator , expect} from '@playwright/test';

export class ProductsPage{
    readonly page: Page;
    readonly p1_add: Locator;
    readonly p2_add : Locator;
    readonly cartBadge : Locator;
    readonly productscard : Locator;
    readonly p1_removeButton: Locator;
    readonly p2_removeButton: Locator;
    

    

    constructor(page: Page){
        this.page = page;
        this.p1_add = page.locator('[data-test = "add-to-cart-sauce-labs-backpack"]')
        this.p2_add = page.locator('[data-test = "add-to-cart-sauce-labs-bike-light"]')
        this.cartBadge = page.locator('[data-test = "shopping-cart-badge"]')
        this.p1_removeButton = page.locator('[data-test = "remove-sauce-labs-backpack"]')
        this.p2_removeButton = page.locator('[data-test = "remove-sauce-labs-bike-light"]')
        this.productscard = page.locator('[data-test="inventory-item"]')
        


    }
    async verifyProductsPageIsVisible(): Promise<void> {
        const products_card = this.productscard;

    for( const cards of await products_card.all()){
        await expect(cards).toBeVisible();
    }
    }

    async addProductToCart(productName: string) : Promise<void>{
        await this.page.locator('.inventory_item').filter({hasText:productName}).getByRole('button').click();
    }
 
    async removeProductFromCart(productName: string) : Promise<void>{
        await this.page.locator('.inventory_item').filter({hasText:productName}).getByRole('button',{name:'Remove'}).click();
    }

    async goToCart(): Promise<void> {
        await this.page.locator('[data-test = "shopping-cart-link"]').click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html")

    }

    async verifyCartCount(expectedCount:number):Promise<void>{
        await expect(this.cartBadge).toHaveText(expectedCount.toString())
        
    }

    
}