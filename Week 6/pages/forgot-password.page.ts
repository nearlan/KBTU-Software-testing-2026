import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ForgotPasswordPage extends BasePage {
  constructor(page: Page) { super(page); }

  async open(): Promise<void> {
    await super.open('/auth/forgot-password');
    await expect(this.page.getByTestId('forgot-password-form')).toBeVisible();
  }

  async submitEmail(email: string): Promise<void> {
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('forgot-password-submit').click();
  }

  async assertMalformedEmailRejected(): Promise<void> {
    const email = this.page.getByTestId('email');
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await expect.poll(() => email.evaluate(input => (input as HTMLInputElement).validity.typeMismatch))
      .toBe(true);
    await expect(this.page.getByTestId('email-error')).toBeVisible();
    await expect(this.page).toHaveURL(/\/auth\/forgot-password/);
  }

  async assertConfirmationShown(): Promise<void> {
    const success = this.page.getByTestId('forgot-password-form').getByRole('alert');
    await expect(success).toHaveAttribute('class', /alert-success/);
    await expect(success).not.toBeEmpty();
  }
}
