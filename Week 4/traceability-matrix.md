# Traceability Matrix - Money Transfer Feature

| Requirement ID | Requirement | Test Cases | Technique | Coverage Status | Notes |
|---|---|---|---|---|---|
| REQ-01 | Transfer amount must be from 100 to 500,000 KZT | TC-01, TC-02, TC-05, TC-06, TC-07, TC-09 | Boundary Value Analysis, Decision Table | Covered | Minimum, maximum, below-minimum and above-maximum values are tested |
| REQ-02 | Transfers above 100,000 KZT require SMS verification; transfers of 100,000 KZT or less do not require SMS verification | TC-02, TC-03, TC-04, TC-05, TC-09, TC-10 | Boundary Value Analysis, Decision Table, State Transition | Covered | Tests both sides of the 100,000 KZT SMS threshold |
| REQ-03 | Daily transfer total must not exceed 1,000,000 KZT | TC-07, TC-08, TC-09 | Decision Table | Covered | Includes a scenario where the daily limit is exceeded |
| REQ-04 | If both the amount rule and daily-limit rule are violated, the amount validation error has precedence | TC-07 | Decision Table | Covered | Invalid amount and daily-limit violation occur in the same test |
| REQ-05 | A correct SMS code confirms the transfer | TC-10 | State Transition | Covered | Covers W1 → Confirmed transition |
| REQ-06 | SMS code expires after 120 seconds | TC-11 | State Transition | Covered | Covers W1 → Expired transition |
| REQ-07 | Three incorrect SMS code attempts cancel the transfer | TC-12 | State Transition | Covered | Covers W1 → W2 → W3 → Blocked |
| REQ-08 | Daily transfer limit resets at midnight using Almaty time | - | Boundary / State Transition | Not Covered | No test for the midnight reset is included in the selected 12 test cases |
| REQ-09 | A transfer pending SMS verification across midnight must be assigned to the correct daily limit period | - | State Transition | Cannot Be Covered | The requirements do not specify whether the transfer belongs to the day it was initiated or the day SMS verification was completed |

## Coverage Summary

- Total requirements identified: **9**
- Covered requirements: **7**
- Not covered requirements: **1**
- Requirements that cannot currently be covered: **1**

### Uncovered Requirement

**REQ-08 - Daily limit reset at midnight**

The Week 3 requirements state that the daily transfer limit resets at midnight Almaty time, but none of the selected twelve test cases verifies the reset itself.

A future test should verify the daily total immediately before and after midnight in Almaty time.

### Requirement That Cannot Be Covered

**REQ-09 - Pending SMS transfer across midnight**

The available requirements do not specify which day should be used when a transfer starts before midnight but the SMS code is confirmed after midnight.

For example:

- Transfer initiated at 23:59.
- SMS code entered at 00:01.

It is unclear whether the transfer should count toward the previous day's or the new day's 1,000,000 KZT daily limit.

This requirement cannot be tested reliably until the expected behavior is clarified by the analyst or product owner.