import { expect, type Page } from '@playwright/test';
import type { ProductSnapshot } from './product.page';
import { BasePage } from './base.page';

export class ComparisonPage extends BasePage {
  constructor(page: Page) { super(page); }

  async assertProductsAndPrices(products: ProductSnapshot[]): Promise<void> {
    await expect(this.page).toHaveURL(/\/comparison/);
    await expect(this.page.getByTestId('comparison-table')).toBeVisible();
    await expect(this.page.getByTestId('comparison-table').getByTestId('product-name'))
      .toHaveCount(products.length);

    for (const [index, product] of products.entries()) {
      await expect(this.page.getByTestId('comparison-table').getByTestId('product-name').nth(index))
        .toHaveText(product.name);
      await expect(this.page.getByTestId('compare-price').nth(index))
        .toHaveText(`$${product.price.toFixed(2)}`);
    }
  }
}
