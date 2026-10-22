import { expect, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CatalogPage extends BasePage {
  constructor(page: Page) { super(page); }

  async open(): Promise<void> {
    await super.open('/');
    await expect(this.page.getByTestId('product-name').first()).toBeVisible();
  }

  async productNames(): Promise<string[]> {
    await expect.poll(() => this.page.getByTestId('product-name').count()).toBeGreaterThanOrEqual(2);
    return (await this.page.getByTestId('product-name').allTextContents())
      .map(name => name.trim())
      .filter(Boolean);
  }

  async openProductByName(name: string): Promise<void> {
    await this.page.getByTestId('product-name').and(this.page.getByText(name, { exact: true })).click();
    await expect(this.page).toHaveURL(/\/product\//);
    await expect(this.page.getByTestId('product-name')).toHaveText(name);
    await expect(this.page.getByTestId('unit-price')).toBeVisible();
  }

  async openAvailableProduct(): Promise<void> {
    const names = await this.productNames();
    for (const name of names) {
      await this.openProductByName(name);
      if (await this.page.getByTestId('add-to-cart').count() > 0 &&
          await this.page.getByTestId('add-to-cart').isEnabled() &&
          await this.page.getByTestId('quantity').count() > 0) return;
      await this.open();
    }
    throw new Error('No in-stock, non-rental products on the first catalog page');
  }
}
