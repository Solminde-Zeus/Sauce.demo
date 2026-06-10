
import { test } from '@playwright/test'; 
import { LoginPage } from '../pages/LoginPage';  

let loginPage: LoginPage; 


test.describe('Login - Automation Testing', () => { 

  test.beforeEach(async ({ page }) => { 

    loginPage = new LoginPage(page); 
    await loginPage.goto(); 

  }); 


  test('TC_001 - Login page elements are visible @smoke', async () => { 

    await loginPage.verifyLoginPageIsVisible(); 

  }); 

  test('TC_002 - Valid login navigates to products page @smoke', async () => { 

    await loginPage.loginAsStandardUser();
    await loginPage.verifySuccessfulLogin(); 

  }); 


  test('TC_003 - Locked user sees error @negative', async () => { 

    await loginPage.loginAsLockedUser(); 
    await loginPage.verifyLockedUserError(); 

  }); 

 

  test('TC_004 - Empty credentials shows error @negative', async () => { 

    await loginPage.loginWithEmptyCredentials(); 
    await loginPage.verifyEmptyCredentialsError(); 

  }); 

 
  test('TC_005 - Invalid credentials shows error @negative', async () => { 
    await loginPage.loginWithInvalidCredentials(); 
    await loginPage.verifyInvalidCredentialsError(); 

  }); 

}); 

 

 

