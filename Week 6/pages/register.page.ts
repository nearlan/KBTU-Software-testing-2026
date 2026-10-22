import { expect, type Page } from '@playwright/test';
import type { Customer } from '../data/user.factory';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {
  constructor(page: Page) { super(page); }

  async open(): Promise<void> {
    await super.open('/auth/register');
    await expect(this.page.getByTestId('register-form')).toBeVisible();
  }

  async register(customer: Customer): Promise<void> {
    await this.page.getByTestId('first-name').fill(customer.firstName);
    await this.page.getByTestId('last-name').fill(customer.lastName);
    await this.page.getByTestId('dob').fill(customer.birthDate);
    await this.page.getByTestId('country').selectOption(customer.countryCode);
    await this.page.getByTestId('postal_code').fill(customer.postalCode);
    const postcodeResponse = this.page.waitForResponse(response =>
      new URL(response.url()).pathname === '/postcode-lookup' &&
      new URL(response.url()).searchParams.get('country') === customer.countryCode &&
      new URL(response.url()).searchParams.get('postcode') === customer.postalCode &&
      new URL(response.url()).searchParams.get('house_number') === customer.houseNumber);
    await this.page.getByTestId('house_number').fill(customer.houseNumber);

    const addressResponse = await postcodeResponse;
    expect(addressResponse.ok(), await addressResponse.text()).toBe(true);
    const address = await addressResponse.json();
    await expect(this.page.getByTestId('postcode-lookup-loading')).toBeHidden();
    await expect(this.page.getByTestId('street')).toHaveValue(address.street);
    await expect(this.page.getByTestId('city')).toHaveValue(address.city);
    await expect(this.page.getByTestId('state')).toHaveValue(address.state);
    await this.page.getByTestId('phone').fill(customer.phone);
    await this.page.getByTestId('email').fill(customer.email);
    await this.page.getByTestId('password').fill(customer.password);
    await this.page.getByTestId('password').blur();
    await this.page.getByTestId('register-submit').click();
  }

  async assertRegistrationSucceeded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/auth\/login(?:[/?#]|$)|\/account(?:[/?#]|$)/);
    await expect(this.page.getByTestId('register-error')).toBeHidden();
  }
}
