import { test, expect } from '../fixtures/pages.fixture';
import type { ProductSnapshot } from '../pages/product.page';

test('TC-04 Compare two product names and prices in Toolshop comparison', async ({
  catalogPage, productPage, comparisonPage,
}) => {
  await catalogPage.open();
  const names = [...new Set(await catalogPage.productNames())];
  expect(names.length).toBeGreaterThanOrEqual(2);

  const snapshots: ProductSnapshot[] = [];
  for (const name of names.slice(0, 2)) {
    await catalogPage.open();
    await catalogPage.openProductByName(name);
    const snapshot = await productPage.snapshot();
    expect(snapshot.price).toBeGreaterThan(0);
    snapshots.push(snapshot);
    await productPage.addToComparison();
  }

  expect(snapshots[0].name).not.toBe(snapshots[1].name);
  await productPage.showComparison();
  await comparisonPage.assertProductsAndPrices(snapshots);
});
