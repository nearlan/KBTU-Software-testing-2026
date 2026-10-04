# Defect Reports - Money Transfer Feature

## DEF- 001 - Transfer executed twice after repeated SMS confirmation

**Title:**  
SMS confirmation: transfer is executed twice when the same confirmation is submitted twice

**Environment:**  
Test environment  
Money Transfer feature  
Test account with SMS verification enabled

**Preconditions:**

- User is logged in.
- Account balance is 2,000,000 KZT.
- Daily transfer total is 0 KZT.
- A transfer of 300,000 KZT has been submitted.
- SMS code screen is open.
- A valid SMS code is available.

**Steps to Reproduce:**

1. Enter the correct SMS code.
2. Submit the SMS confirmation.
3. Immediately submit the confirmation again.

**Expected Result:**

- The transfer is executed only once.
- The second confirmation does not create another transfer.
- Account balance becomes 1,700,000 KZT.
- Daily transfer total becomes 300,000 KZT.

**Actual Result:**

- The transfer is executed twice.
- Account balance becomes 1,400,000 KZT.
- Daily transfer total becomes 600,000 KZT.

**Reproducibility:**  
5 of 5 attempts.

**Severity - Proposal:** Critical

**Priority - Proposal:** High

**Reason:**  
The defect causes a direct financial loss because the customer can be charged twice for a single intended transfer.

**Evidence Needed:**

- Screen recording of both confirmation requests.
- Account balance before and after the transfer.
- Transfer history showing two transactions.
- Backend request IDs for both confirmation requests.

**Traces To:**

- REQ-05 - A correct SMS code confirms the transfer.
- Related Week 3 invalid-transition scenario: correct code → Confirmed → submit correct code again.

## DEF-002 - Expired SMS code still completes the transfer



**Title:**  
SMS verification: expired code completes transfer after 120 seconds

**Environment:**  
Test environment  
Money Transfer feature  
Test account with SMS verification enabled

**Preconditions:**

- User is logged in.
- Account balance is 2,000,000 KZT.
- Daily transfer total is 0 KZT.
- A transfer of 300,000 KZT has been submitted.
- SMS code screen is open.
- A valid SMS code has been received.

**Steps to Reproduce:**

1. Wait for 120 seconds without submitting the code.
2. Verify that the SMS code has expired.
3. Enter the originally correct SMS code.
4. Submit the code.

**Expected Result:**

- The expired code is rejected.
- The transfer is not executed.
- Account balance remains 2,000,000 KZT.
- Daily transfer total remains 0 KZT.

**Actual Result:**

- The expired code is accepted.
- The transfer is completed.
- Account balance becomes 1,700,000 KZT.
- Daily transfer total becomes 300,000 KZT.

**Reproducibility:**  
5 of 5 attempts.

**Severity - Proposal:** High

**Priority - Proposal:** High

**Reason:**  
An expired authentication code should no longer authorize a transfer. Accepting it bypasses the defined 120-second validity rule.

**Evidence Needed:**

- Screen recording showing the 120-second wait.
- Timestamp of SMS generation.
- Timestamp of code submission.
- Transfer history.
- Backend request ID.

**Traces To:**

- REQ-06 - SMS code expires after 120 seconds.
- TC-11 - SMS code expires after 120 seconds.
- Related Week 3 invalid-transition scenario: Expired → correct code.

## DEF-003 - Transfer succeeds after three incorrect SMS attempts

**Title:**  
SMS verification: correct code is accepted after transfer is blocked by three incorrect attempts

**Environment:**  
Test environment  
Money Transfer feature  
Test account with SMS verification enabled

**Preconditions:**

- User is logged in.
- Account balance is 2,000,000 KZT.
- Daily transfer total is 0 KZT.
- A transfer of 300,000 KZT has been submitted.
- SMS code screen is open.
- Current SMS state is W1.

**Steps to Reproduce:**

1. Enter an incorrect SMS code.
2. Submit the code.
3. Enter a second incorrect SMS code.
4. Submit the code.
5. Enter a third incorrect SMS code.
6. Submit the code.
7. Enter the correct SMS code.
8. Submit the code.

**Expected Result:**

- After the third incorrect attempt, the transfer is cancelled.
- The transfer remains blocked.
- The correct code entered afterwards is rejected.
- Account balance remains 2,000,000 KZT.
- Daily transfer total remains 0 KZT.

**Actual Result:**

- After the third incorrect attempt, the transfer is shown as blocked.
- The correct SMS code entered afterwards is accepted.
- The transfer is completed.
- Account balance becomes 1,700,000 KZT.
- Daily transfer total becomes 300,000 KZT.

**Reproducibility:**  
5 of 5 attempts.

**Severity - Proposal:** High

**Priority - Proposal:** High

**Reason:**  
The three-attempt limit is intended to stop further authentication attempts. Accepting a code after blocking makes the protection ineffective.

**Evidence Needed:**

- Screen recording showing all four code submissions.
- SMS attempt counter logs.
- Transfer status before and after the fourth submission.
- Account balance history.
- Backend request ID.

**Traces To:**

- REQ-07 - Three incorrect SMS code attempts cancel the transfer.
- TC-12 - Transfer cancelled after three incorrect SMS codes.
- Related Week 3 invalid-transition scenario: Blocked → correct code.