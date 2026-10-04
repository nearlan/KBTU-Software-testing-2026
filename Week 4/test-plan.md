# Test Plan - Money Transfer Feature

## 1. Scope

### In Scope

The testing covers the main business rules of the money transfer feature:

- Transfer amount validation.
- Minimum transfer amount: 100 KZT.
- Maximum transfer amount: 500,000 KZT.
- Only whole-tenge amounts are accepted.
- Transfers above 100,000 KZT require SMS verification.
- Transfers of 100,000 KZT or less do not require SMS verification.
- Daily transfer limit: 1,000,000 KZT.
- Validation of combinations of transfer amount and current daily total.
- SMS code verification flow.
- Successful confirmation with a correct SMS code.
- Handling of incorrect SMS codes.
- Cancellation of the transfer after three incorrect SMS code attempts.
- SMS code expiration after 120 seconds.
- Prevention of transfer execution after SMS expiration or cancellation.
- Verification that the account balance and daily total are updated correctly after a successful transfer.
- Verification that rejected or cancelled transfers do not change the account balance or daily total.
- Validation of error precedence when both the transfer amount and the daily limit are violated.

### Out of Scope

The following areas are not covered by this test plan:

- User registration and authentication.
- Recipient creation and management.
- Bank account creation and management.
- Card and deposit functionality unrelated to money transfers.
- SMS delivery infrastructure and mobile operator availability.
- Performance and load testing.
- Security penetration testing.
- Fraud detection rules outside the provided money transfer requirements.
- Fees and commissions, because they are not defined in the provided requirements.
- Transfer reversal and refund processing.
- Scheduled or recurring transfers.
- Backend implementation details and internal source code.



## 2. Test Approach

The money transfer feature will be tested mainly using black-box functional testing.

The following test design techniques will be used:

### Equivalence Partitioning

Transfer amount inputs are divided into valid and invalid partitions.

Examples:

- Amount below 100 KZT - invalid.
- Amount from 100 to 100,000 KZT - valid, no SMS required.
- Amount from 100,001 to 500,000 KZT - valid, SMS required.
- Amount above 500,000 KZT - invalid.
- Fractional amount - invalid.
- Non-numeric or empty input - invalid.

### Boundary Value Analysis

Boundary values will be tested around the main transfer limits:

- 100 KZT minimum amount.
- 100,000 KZT SMS verification threshold.
- 500,000 KZT maximum amount.

Special attention will be given to values immediately below, at, and above these boundaries.

### Decision Table Testing

A decision table will be used to verify combinations of:

- Whether the transfer amount is valid.
- Whether the daily limit remains within 1,000,000 KZT.
- Whether the transfer amount is above 100,000 KZT.

This is used to verify whether the system should:

- reject the transfer because of an invalid amount;
- reject the transfer because of the daily limit;
- request an SMS code;
- execute the transfer immediately.

### State Transition Testing

The SMS verification flow will be tested as a state-based process.

The tests will cover:

- Correct SMS code.
- First and second incorrect SMS attempts.
- Third incorrect attempt and transfer cancellation.
- SMS expiration after 120 seconds.
- Attempts to use a code after expiration.
- Attempts to confirm a transfer after it has already been completed or cancelled.

Testing will be performed manually using predefined test data and observable expected results.



## 3. Entry Criteria

Testing can begin when all of the following conditions are satisfied:

- The money transfer feature is deployed to the test environment.
- The test environment is available and stable.
- The money transfer requirements are available.
- A test user account is available.
- The test account has sufficient balance to execute the planned transfer scenarios.
- The current daily transfer total can be controlled or reset for testing.
- SMS verification can be triggered in the test environment.
- The tester can verify the current account balance and daily transfer total.
- Basic smoke testing confirms that the transfer screen can be opened and a transfer can be submitted.



## 4. Exit Criteria

Testing can be considered complete when:

- All planned money transfer test cases have been executed.
- All requirements included in the test scope are covered by at least one test case, or uncovered requirements are explicitly documented.
- All amount boundary tests have been executed.
- All approval decision-table scenarios have been executed.
- All critical SMS state transitions have been tested.
- No Critical or High severity defects remain open without documented acceptance.
- Defects marked as fixed have been retested.
- No unresolved defect can cause an incorrect debit, duplicate transfer, daily-limit bypass, or SMS-verification bypass.
- Account balance and daily total behavior have been verified for successful, rejected, expired, and cancelled transfers.
- Any remaining known risks are documented before release.

If any exit criterion is not met, the remaining risk must be explicitly documented and accepted before release.



## 5. Top Three Product Risks

### Risk 1 - Duplicate Transfer / Double Debit

A transfer may be executed more than once if the user submits the same successful confirmation multiple times or if the request is retried.

For example, if a correct SMS code is submitted twice, the system must not execute the transfer twice.

**Impact:** Critical.

Possible consequences:

- Customer money is debited twice.
- The recipient receives duplicate payments.
- The account balance becomes incorrect.
- Financial reconciliation may be required.



### Risk 2 - SMS Verification Bypass

A transfer requiring SMS verification may be executed using:

- an expired SMS code;
- a code submitted after three incorrect attempts;
- a previously used code;
- another confirmation after the transfer has already been completed.

The SMS verification mechanism protects transfers above 100,000 KZT and must not allow an invalid state transition to approve the transaction.

**Impact:** High.

Possible consequences:

- Unauthorized transfer approval.
- Bypass of authentication controls.
- Increased fraud risk.



### Risk 3 - Daily Limit Incorrectly Applied

The daily transfer limit of 1,000,000 KZT may be calculated or reset incorrectly.

A particularly important risk is the midnight reset because the requirement uses Almaty time. Incorrect server-time handling may cause the limit to reset at the wrong moment.

The system must also prevent a transfer from exceeding the daily limit while keeping the account balance unchanged when the transfer is rejected.

**Impact:** High.

Possible consequences:

- Customer exceeds the permitted daily transfer limit.
- Valid transfers are incorrectly rejected.
- Daily totals become inconsistent.
- Transfers near midnight are assigned to the wrong day.