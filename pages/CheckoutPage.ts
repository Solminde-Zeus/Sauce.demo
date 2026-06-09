import { Locator, Page,expect } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly fname: Locator;
    readonly lname:Locator;
    readonly pcode: Locator;

    
    
        constructor(page:Page){
            this.page = page;
            this.fname = page.locator('[data-test = "firstName"]');
            this.lname = page.locator('[data-test = "lastName"]');
            this.pcode = page.locator('[data-test = "postalCode"]');
         
        }

          async fillCheckoutDetails(firstName:string,lastName:string,postalCode:string): Promise<void> { 
    await this.fname.fill(firstName);
    await this.lname.fill(lastName)
    await this.pcode.fill(postalCode)

  }

    async continueCheckout(): Promise<void> { 
        await this.page.locator('[data-test = "continue"]').click()

  }
      async verifyValidationMessage(expectedMessage: string): Promise<void> { 
      
      await expect(this.page.getByText(expectedMessage)).toBeVisible()


  }
    async finishCheckout(): Promise<void> { 
    await this.page.locator('[data-test = "finish"]').click();

  }
    async verifyOrderConfirmation(): Promise<void> { 
      
      await expect(this.page.getByText("Thank you for your order!")).toBeVisible()

  }
}