import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { ForgotPasswordPage } from '../pages/forgot-password.page';
import { CatalogPage } from '../pages/catalog.page';
import { ProductPage } from '../pages/product.page';
import { ComparisonPage } from '../pages/comparison.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { newCustomer, type Customer } from '../data/user.factory';

interface Pages {
  customer: Customer;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  forgotPasswordPage: ForgotPasswordPage;
  catalogPage: CatalogPage;
  productPage: ProductPage;
  comparisonPage: ComparisonPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}

export const test = base.extend<Pages>({
  customer: async ({ registerPage }, use) => {
    const customer = newCustomer();
    await registerPage.open();
    await registerPage.register(customer);
    await registerPage.assertRegistrationSucceeded();
    await use(customer);
  },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  registerPage: async ({ page }, use) => { await use(new RegisterPage(page)); },
  forgotPasswordPage: async ({ page }, use) => { await use(new ForgotPasswordPage(page)); },
  catalogPage: async ({ page }, use) => { await use(new CatalogPage(page)); },
  productPage: async ({ page }, use) => { await use(new ProductPage(page)); },
  comparisonPage: async ({ page }, use) => { await use(new ComparisonPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },
});

export { expect } from '@playwright/test';
