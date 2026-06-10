 
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UserCredentials } from '../test-data/users';
 
export async function loginAs(page: Page, user: UserCredentials): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(user.username, user.password);
}
 