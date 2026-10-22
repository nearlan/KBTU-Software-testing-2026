import { test } from '../fixtures/pages.fixture';

test('TC-02 Invalid login is rejected, valid login reaches account', async ({ loginPage, customer }) => {
  await test.step('Wrong password must show an error', async () => {
    await loginPage.open();
    await loginPage.signIn({ email: customer.email, password: 'WrongPass2026!' });
    await loginPage.assertInvalidCredentials();
  });

  await test.step('Valid credentials must open account', async () => {
    await loginPage.open();
    await loginPage.signIn(customer);
    await loginPage.assertAccountOpened();
  });
});
