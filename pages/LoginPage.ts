
import { Page, Locator, expect } from '@playwright/test'; 
import { UserCredentials, users } from '../test-data/users'; 

 

export class LoginPage { 
  readonly page: Page; 
  readonly usernameInput: Locator 
  readonly passwordInput: Locator;
  readonly loginButton: Locator; 
  readonly errorMessage: Locator; 
 
  private readonly standardUser  = users.find(u => u.type === 'standard')!; 
  private readonly lockedUser    = users.find(u => u.type === 'locked')!; 
  private readonly emptyUser     = users.find(u => u.type === 'empty')!; 
  private readonly invalidUser   = users.find(u => u.type === 'invalid')!; 

 

  constructor(page: Page) { 
    this.page          = page; 
    this.usernameInput = page.locator('[data-test="username"]'); 
    this.passwordInput = page.locator('[data-test="password"]'); 
    this.loginButton   = page.locator('[data-test="login-button"]'); 
    this.errorMessage  = page.locator('[data-test="error"]'); 

  } 


  async goto(): Promise<void> { 
    await this.page.goto('https://www.saucedemo.com/'); 

  } 

 

  async login(username: string, password: string): Promise<void> { 
    await this.usernameInput.fill(username); 
    await this.passwordInput.fill(password); 
    await this.loginButton.click(); 

  } 

 
  async loginAs(user: UserCredentials): Promise<void> { 
    await this.goto(); 
    await this.login(user.username, user.password); 

  }  

  async loginAsStandardUser(): Promise<void> { 
    await this.loginAs(this.standardUser); 

  } 


  async loginAsLockedUser(): Promise<void> { 
    await this.loginAs(this.lockedUser); 

  } 


  async loginWithEmptyCredentials(): Promise<void> { 
    await this.loginAs(this.emptyUser); 

  } 

  async loginWithInvalidCredentials(): Promise<void> { 
    await this.loginAs(this.invalidUser); 

  } 


  async verifyLoginPageIsVisible(): Promise<void> { 
    await expect(this.usernameInput).toBeVisible(); 
    await expect(this.passwordInput).toBeVisible(); 
    await expect(this.loginButton).toBeVisible(); 

  } 

 

  async verifySuccessfulLogin(): Promise<void> { 
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

  } 

 

  async verifyLockedUserError(): Promise<void> { 
    await expect(this.errorMessage).toContainText( 
      'Epic sadface: Sorry, this user has been locked out.' 

    ); 

  } 

 

  async verifyEmptyCredentialsError(): Promise<void> { 
    await expect(this.errorMessage).toContainText( 
      'Epic sadface: Username is required' 

    ); 

  } 

 

  async verifyInvalidCredentialsError(): Promise<void> { 
    await expect(this.errorMessage).toContainText( 
      'Epic sadface: Username and password do not match any user in this service' 

    ); 

  } 

} 
