import { test, expect} from '@playwright/test'
import { UserCredentials,UserType,users } from '../test-data/users';
import { LoginPage } from '../pages/LoginPage';


// 

let loginpage: LoginPage


test.describe('Login Functionality Using User Data ', () => {


  test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page)

    await loginpage.goto();
  });

  test('TC_001 - Login page should load @smoke', async ({page})=> {
    await loginpage.verifyLoginPageIsVisible()

  })
  test('TC_002 - Valid user should be able to login @smoke', async ({ page }) => {
    
    const standardUser = users.find(u => u.type === 'standard');
    
    
    if (!standardUser) throw new Error('Standard user not found ');

    
    await loginpage.login(standardUser.username,standardUser.password)

    await expect(page).toHaveURL(/.*inventory.html/);
  });

    test('TC_003 - Invalid password should show error @negative @smoke', async ({ page }) => {
    
    const standardUser = users.find(u => u.type === 'standard');
    
    
    if (!standardUser) throw new Error('Standard user not found in mock data');

    
     await loginpage.login(standardUser.username,"123434")
    const errorContainer1 = page.locator('.error-message-container error');
    await expect(errorContainer1).toBeVisible;
  });

  test('TC_004 - Locked user should not be able to login @negative @smoke', async ({ page }) => {
    
    const lockedUser = users.find(u => u.type === 'locked');
    
    if (!lockedUser) throw new Error('Locked user not found in mock data');

    
   await loginpage.login(lockedUser.username,lockedUser.password)

    
    const errorContainer = page.locator('.login-box .error-message-container');
    await expect(errorContainer).toBeVisible();
  });

});