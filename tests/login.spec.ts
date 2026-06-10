
import { test } from '@playwright/test';
import { users } from '../test-data/users';
import { LoginPage } from '../pages/LoginPage';
 
const standardUser = users.find(u => u.type === 'standard')!;
const lockedUser   = users.find(u => u.type === 'locked')!;
 
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
    await loginPage.login(standardUser.username, standardUser.password);
    await loginPage.verifySuccessfulLogin();
  });
 
  test('TC_003 - Locked user sees error @negative', async () => {
    await loginPage.login(lockedUser.username, lockedUser.password);
    await loginPage.verifyLockedUserError();
  });
 
  test('TC_004 - Empty credentials shows error @negative', async () => {
    await loginPage.login('', '');
    await loginPage.verifyEmptyCredentialsError();
  });
 
  test('TC_005 - Invalid credentials shows error @negative', async () => {
    await loginPage.login('wrong_user', 'wrong_pass');
    await loginPage.verifyInvalidCredentialsError();
  });
 
});
