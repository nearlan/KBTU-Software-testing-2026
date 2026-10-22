import { expect, type Page } from '@playwright/test';
import type { Customer } from '../data/user.factory';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  constructor(page: Page) { super(page); }

  async continuePastLoginStep(): Promise<void> {
    await this.page.getByTestId('proceed-2').click();
  }

  async enterShippingAddress(customer: Customer): Promise<void> {
    await expect(this.page.getByTestId('proceed-3')).toBeVisible();
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
    await expect(this.page.getByTestId('proceed-3')).toBeEnabled();
    await this.page.getByTestId('proceed-3').click();
  }

  async payCashOnDelivery(): Promise<void> {
    await this.page.getByTestId('payment-method').selectOption('cash-on-delivery');
    await expect(this.page.getByTestId('finish')).toBeEnabled();

    await this.page.getByTestId('finish').click();
    await expect(this.page.getByTestId('payment-success-message')).toBeVisible();
    
    const confirm = this.page.getByRole('button', { name: 'Confirm', exact: true });
    await expect(confirm).toBeEnabled();
    const invoiceResponse = this.page.waitForResponse(response =>
      new URL(response.url()).pathname === '/invoices' && response.request().method() === 'POST');
    await confirm.click();
    const response = await invoiceResponse;
    expect(response.ok(), await response.text()).toBe(true);
    await expect(this.page.locator('#order-confirmation')).toBeVisible();
    await expect(this.page.locator('#order-confirmation')).not.toBeEmpty();
  }
}
