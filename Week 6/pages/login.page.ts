import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  constructor(page: Page) { super(page); }

  async open(): Promise<void> {
    await super.open('/auth/login');
    await expect(this.page.getByTestId('login-submit')).toBeVisible();
  }

  async signIn(user: { email: string; password: string }): Promise<void> {
    await this.page.getByTestId('email').fill(user.email);
    await this.page.getByTestId('password').fill(user.password);
    await this.page.getByTestId('login-submit').click();
  }

  async assertInvalidCredentials(): Promise<void> {
    await expect(this.page.getByTestId('login-error')).toBeVisible();
    await expect(this.page.getByTestId('login-error')).not.toBeEmpty();
    await expect(this.page).not.toHaveURL(/\/account(?:\/|$)/);
  }

  async assertAccountOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/\/account(?:\/|$)/);
  }
}
