 

import { Page } from '@playwright/test'; 
import { LoginPage } from '../pages/LoginPage'; 
import { UserCredentials, users } from '../test-data/users'; 

 

export async function loginAs(page: Page, user: UserCredentials): Promise<void> { 

  const loginPage = new LoginPage(page); 
  await loginPage.loginAs(user); 

} 

 

export async function loginAsStandard(page: Page): Promise<void> { 

  const standardUser = users.find(u => u.type === 'standard')!; 
  const loginPage = new LoginPage(page);
  await loginPage.loginAs(standardUser); 

} 

 

