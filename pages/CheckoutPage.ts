
import { Page, Locator, expect } from '@playwright/test'; 
import { Userdatas } from '../test-data/fill_user'; 

 

export class CheckoutPage { 
  readonly page: Page; 
  readonly firstNameInput: Locator; 
  readonly lastNameInput: Locator; 
  readonly postalCodeInput: Locator; 
  readonly continueButton: Locator; 
  readonly finishButton: Locator; 
  readonly errorMessage: Locator; 
  readonly confirmationHeader: Locator; 

 

  constructor(page: Page) { 

    this.page               = page; 
    this.firstNameInput     = page.locator('[data-test="firstName"]'); 
    this.lastNameInput      = page.locator('[data-test="lastName"]'); 
    this.postalCodeInput    = page.locator('[data-test="postalCode"]'); 
    this.continueButton     = page.locator('[data-test="continue"]'); 
    this.finishButton       = page.locator('[data-test="finish"]'); 
    this.errorMessage       = page.locator('[data-test="error"]'); 
    this.confirmationHeader = page.locator('[data-test="complete-header"]'); 

  } 

 

  async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string): Promise<void> { 
    await this.firstNameInput.fill(firstName); 
    await this.lastNameInput.fill(lastName); 
    await this.postalCodeInput.fill(postalCode); 

  } 

 

  async fillValidCheckoutDetails(): Promise<void> { 
    await this.fillCheckoutDetails(Userdatas.firstname, Userdatas.lastname, Userdatas.postalcode); 

  } 

 

  async fillWithMissingFirstName(): Promise<void> { 
    await this.fillCheckoutDetails('', Userdatas.lastname, Userdatas.postalcode); 

  } 

 

  async fillWithMissingLastName(): Promise<void> { 
    await this.fillCheckoutDetails(Userdatas.firstname, '', Userdatas.postalcode); 

  } 

 

  async fillWithMissingPostalCode(): Promise<void> { 
    await this.fillCheckoutDetails(Userdatas.firstname, Userdatas.lastname, ''); 

  } 

 

  async continueCheckout(): Promise<void> { 
    await this.continueButton.click(); 

  } 

 

  async finishCheckout(): Promise<void> { 
    await this.finishButton.click(); 

  } 

 

  async verifyCheckoutStepOneIsVisible(): Promise<void> { 
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html'); 
    await expect(this.firstNameInput).toBeVisible(); 
    await expect(this.lastNameInput).toBeVisible(); 
    await expect(this.postalCodeInput).toBeVisible(); 

  } 

 

  async verifyCheckoutStepTwoIsVisible(): Promise<void> { 
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html'); 
    await expect(this.finishButton).toBeVisible(); 

  } 

 

  async verifyMissingFirstNameError(): Promise<void> { 
    await expect(this.errorMessage).toHaveText('Error: First Name is required'); 

  } 


  async verifyMissingLastNameError(): Promise<void> { 
    await expect(this.errorMessage).toHaveText('Error: Last Name is required'); 

  } 


  async verifyMissingPostalCodeError(): Promise<void> { 
    await expect(this.errorMessage).toHaveText('Error: Postal Code is required'); 

  } 

  async verifyOrderConfirmation(): Promise<void> { 
    await expect(this.confirmationHeader).toHaveText('Thank you for your order!'); 

  } 

} 

 

 
