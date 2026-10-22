import { test } from '../fixtures/pages.fixture';
import { newCustomer } from '../data/user.factory';

test('TC-01 Register a unique new customer', async ({ registerPage }) => {
  const customer = newCustomer();
  await registerPage.open();
  await registerPage.register(customer);
  await registerPage.assertRegistrationSucceeded();
});
