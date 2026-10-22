import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface ProductSnapshot { name: string; price: number; }

export class ProductPage extends BasePage {
  constructor(page: Page) { super(page); }

  async snapshot(): Promise<ProductSnapshot> {
    const nameElement = this.page.getByTestId('product-name');
    const priceElement = this.page.getByTestId('unit-price');
    await expect(nameElement).toBeVisible();
    await expect(priceElement).toBeVisible();
    const name = (await nameElement.innerText()).trim();
    const price = Number((await priceElement.innerText()).trim());
    if (!name || !Number.isFinite(price)) {
      throw new Error('Product name or price could not be captured');
    }
    return { name, price };
  }

  async addQuantityToCart(quantity: number): Promise<void> {
    await this.page.getByTestId('quantity').fill(String(quantity));
    await expect(this.page.getByTestId('quantity')).toHaveValue(String(quantity));
    await this.page.getByTestId('add-to-cart').click();
    await expect(this.page.getByTestId('cart-quantity')).toContainText(String(quantity));
  }

  async addToComparison(): Promise<void> {
    await this.page.getByTestId('add-to-compare').click();
  }

  async openCart(): Promise<void> {
    await this.page.getByTestId('nav-cart').click();
  }

  async showComparison(): Promise<void> {
    await expect(this.page.getByTestId('comparison-bar')).toBeVisible();
    await this.page.getByTestId('compare-link').click();
  }
}
