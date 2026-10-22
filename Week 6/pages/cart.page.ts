import { expect, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  constructor(page: Page) { super(page); }

  async assertProduct(name: string, quantity: number): Promise<void> {
    const row = this.page.getByRole('row').filter({
      has: this.page.getByTestId('product-title').filter({
        hasText: name
      })
    });

    await expect(row).toHaveCount(1);
    await expect(row.getByTestId('product-title')).toContainText(name);
    await expect(row.getByTestId('product-quantity')).toHaveValue(String(quantity));
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByTestId('proceed-1').click();
  }
}