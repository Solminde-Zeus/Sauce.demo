
import { Page, Locator, expect } from '@playwright/test';
 
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
 
  constructor(page: Page) {
    this.page          = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton   = page.locator('[data-test="login-button"]');
    this.errorMessage  = page.locator('[data-test="error"]');
  }
 //Fucntipn for GOTO
  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }
 //Fucntion for Login
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  //Funciton for verify Login Page
  async verifyLoginPageIsVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
 // Successful Login
  async verifySuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }
  // Error fir locked user
  async verifyLockedUserError(): Promise<void> {
    await expect(this.errorMessage).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  }
  // Emty Data
  async verifyEmptyCredentialsError(): Promise<void> {
    await expect(this.errorMessage).toContainText(
      'Epic sadface: Username is required'
    );
  }
  //Invalid Data
  async verifyInvalidCredentialsError(): Promise<void> {
    await expect(this.errorMessage).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  }
}
 
 
