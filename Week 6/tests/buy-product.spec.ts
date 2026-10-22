import { test, expect } from '../fixtures/pages.fixture';

test('TC-03 Buy an available product and complete checkout', async ({
  loginPage, catalogPage, productPage, cartPage, checkoutPage, customer,
}) => {
  await test.step('Sign in with an isolated customer account', async () => {
    await loginPage.open();
    await loginPage.signIn(customer);
    await loginPage.assertAccountOpened();
  });

  let productName = '';
  await test.step('Pick an in-stock product and add two items', async () => {
    await catalogPage.open();
    await catalogPage.openAvailableProduct();
    const product = await productPage.snapshot();
    productName = product.name;
    expect(product.price).toBeGreaterThan(0);
    await productPage.addQuantityToCart(2);
    await productPage.openCart();
  });

  await test.step('Cart must contain the right name and quantity', async () => {
    await cartPage.assertProduct(productName, 2);
    await cartPage.proceedToCheckout();
  });

  await test.step('Complete order through the payment confirmation', async () => {
    await checkoutPage.continuePastLoginStep();
    await checkoutPage.enterShippingAddress(customer);
    await checkoutPage.payCashOnDelivery();
  });
});
