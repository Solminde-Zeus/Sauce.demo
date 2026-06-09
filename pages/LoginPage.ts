import {Page,Locator,expect} from '@playwright/test';
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput : Locator;
    readonly LoginButton : Locator;
    readonly errorMessage: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator('[data-test = "username"]');
        this.passwordInput = page.locator('[data-test = "password"]');
        this.LoginButton = page.locator('[data-test = "login-button"]');
        this.errorMessage = page.locator('[data-test = "error"]');

    }
    async goto(): Promise<void> { 
    await this.page.goto('https://www.saucedemo.com/'); 
    }
    


      async login(username: string, password: string): Promise<void> { 
    await this.usernameInput.fill(username); 
    await this.passwordInput.fill(password); 
    await this.LoginButton.click(); 
  } 
 
  async verifyLoginPageIsVisible(): Promise<void> { 
    await expect(this.usernameInput).toBeVisible(); 
    await expect(this.passwordInput).toBeVisible(); 
    await expect(this.LoginButton).toBeVisible(); 
  } 
 
  async verifyErrorMessage(expectedMessage: string): Promise<void> { 
    await expect(this.errorMessage).toContainText(expectedMessage); 
  }

}