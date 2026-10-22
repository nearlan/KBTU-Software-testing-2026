import { test } from '../fixtures/pages.fixture';

test('TC-05 Forgot-password confirmation and invalid-email validation', async ({ forgotPasswordPage, customer }) => {
  await test.step('Malformed email is marked invalid and rejected', async () => {
    await forgotPasswordPage.open();
    await forgotPasswordPage.submitEmail('not-an-email');
    await forgotPasswordPage.assertMalformedEmailRejected();
  });

  await test.step('Registered email displays reset confirmation', async () => {
    await forgotPasswordPage.open();
    await forgotPasswordPage.submitEmail(customer.email);
    await forgotPasswordPage.assertConfirmationShown();
  });
});
