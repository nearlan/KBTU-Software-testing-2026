# Test Cases - Money Transfer Feature

## Requirements

- **REQ-01** - Transfer amount must be from 100 to 500,000 KZT.
- **REQ-02** - Transfers above 100,000 KZT require SMS verification; transfers of 100,000 KZT or less are executed without SMS verification.
- **REQ-03** - The daily transfer total must not exceed 1,000,000 KZT.
- **REQ-04** - If both the transfer amount and the daily limit are violated, the amount validation error has precedence.
- **REQ-05** - A correct SMS code confirms the transfer.
- **REQ-06** - The SMS code expires after 120 seconds.
- **REQ-07** - Three incorrect SMS code attempts cancel the transfer.

## TC-01 - Amount below minimum

**ID:** TC-01  
**Traces to:** REQ-01  
**Technique:** Boundary Value Analysis

### Preconditions

- User is logged in.
- Account balance is 1,000,000 KZT.
- Daily transfer total is 0 KZT.

### Steps

1. Start a new money transfer.
2. Enter `99 KZT` as the transfer amount.
3. Submit the transfer.

### Expected Result

- Invalid amount error is shown.
- No SMS code is requested.
- The transfer is not created.
- Account balance remains 1,000,000 KZT.
- Daily transfer total remains 0 KZT.

### Postconditions

- Transfer is not created.
- Balance: 1,000,000 KZT.
- Daily total: 0 KZT.



## TC-02 - Minimum valid amount

**ID:** TC-02  
**Traces to:** REQ-01, REQ-02  
**Technique:** Boundary Value Analysis

### Preconditions

- User is logged in.
- Account balance is 1,000,000 KZT.
- Daily transfer total is 0 KZT.

### Steps

1. Start a new money transfer.
2. Enter `100 KZT`.
3. Submit the transfer.

### Expected Result

- Transfer is executed immediately.
- No SMS code is requested.
- Account balance becomes 999,900 KZT.
- Daily transfer total becomes 100 KZT.

### Postconditions

- Transfer is completed.
- Balance: 999,900 KZT.
- Daily total: 100 KZT.



## TC-03 - SMS threshold boundary without SMS

**ID:** TC-03  
**Traces to:** REQ-02  
**Technique:** Boundary Value Analysis

### Preconditions

- User is logged in.
- Account balance is 1,000,000 KZT.
- Daily transfer total is 0 KZT.

### Steps

1. Start a new money transfer.
2. Enter `100,000 KZT`.
3. Submit the transfer.

### Expected Result

- Transfer is executed immediately.
- No SMS code is requested.
- Account balance becomes 900,000 KZT.
- Daily transfer total becomes 100,000 KZT.

### Postconditions

- Transfer is completed.
- Balance: 900,000 KZT.
- Daily total: 100,000 KZT.



## TC-04 - SMS threshold boundary with SMS

**ID:** TC-04  
**Traces to:** REQ-02  
**Technique:** Boundary Value Analysis

### Preconditions

- User is logged in.
- Account balance is 1,000,000 KZT.
- Daily transfer total is 0 KZT.

### Steps

1. Start a new money transfer.
2. Enter `100,001 KZT`.
3. Submit the transfer.

### Expected Result

- SMS code screen is shown.
- Transfer is not executed before SMS confirmation.
- Account balance remains 1,000,000 KZT.
- Daily transfer total remains 0 KZT.

### Postconditions

- Transfer is pending SMS confirmation.
- Balance: 1,000,000 KZT.
- Daily total: 0 KZT.



## TC-05 - Maximum valid transfer amount

**ID:** TC-05  
**Traces to:** REQ-01, REQ-02  
**Technique:** Boundary Value Analysis

### Preconditions

- User is logged in.
- Account balance is 1,000,000 KZT.
- Daily transfer total is 0 KZT.

### Steps

1. Start a new money transfer.
2. Enter `500,000 KZT`.
3. Submit the transfer.

### Expected Result

- SMS code screen is shown.
- Transfer is not executed before SMS confirmation.
- Account balance remains 1,000,000 KZT.
- Daily transfer total remains 0 KZT.

### Postconditions

- Transfer is pending SMS confirmation.
- Balance: 1,000,000 KZT.
- Daily total: 0 KZT.



## TC-06 - Amount above maximum

**ID:** TC-06  
**Traces to:** REQ-01  
**Technique:** Boundary Value Analysis

### Preconditions

- User is logged in.
- Account balance is 1,000,000 KZT.
- Daily transfer total is 0 KZT.

### Steps

1. Start a new money transfer.
2. Enter `500,001 KZT`.
3. Submit the transfer.

### Expected Result

- Invalid amount error is shown.
- No SMS code is requested.
- Transfer is not created.
- Account balance remains 1,000,000 KZT.
- Daily transfer total remains 0 KZT.

### Postconditions

- Transfer is not created.
- Balance: 1,000,000 KZT.
- Daily total: 0 KZT.



## TC-07 - Invalid amount has precedence over daily-limit error

**ID:** TC-07  
**Traces to:** REQ-01, REQ-03, REQ-04  
**Technique:** Decision Table Testing

### Preconditions

- User is logged in.
- Account balance is 2,000,000 KZT.
- Daily transfer total is 600,000 KZT.

### Steps

1. Start a new money transfer.
2. Enter `600,000 KZT`.
3. Submit the transfer.

### Expected Result

- Invalid amount error is shown.
- Daily-limit error is not shown instead of the amount error.
- No SMS code is requested.
- Account balance remains unchanged.

### Postconditions

- Transfer is not created.
- Daily total remains 600,000 KZT.
- Balance remains 2,000,000 KZT.



## TC-08 - Daily transfer limit exceeded

**ID:** TC-08  
**Traces to:** REQ-03  
**Technique:** Decision Table Testing

### Preconditions

- User is logged in.
- Account balance is 2,000,000 KZT.
- Daily transfer total is 950,000 KZT.

### Steps

1. Start a new money transfer.
2. Enter `60,000 KZT`.
3. Submit the transfer.

### Expected Result

- Daily-limit error is shown.
- No SMS code is requested.
- Transfer is not created.
- Account balance remains unchanged.

### Postconditions

- Transfer is not created.
- Balance remains 2,000,000 KZT.
- Daily total remains 950,000 KZT.



## TC-09 - Valid amount below SMS threshold

**ID:** TC-09  
**Traces to:** REQ-01, REQ-02, REQ-03  
**Technique:** Decision Table Testing

### Preconditions

- User is logged in.
- Account balance is 2,000,000 KZT.
- Daily transfer total is 0 KZT.

### Steps

1. Start a new money transfer.
2. Enter `50,000 KZT`.
3. Submit the transfer.

### Expected Result

- Transfer is executed immediately.
- No SMS code is requested.
- Account balance becomes 1,950,000 KZT.
- Daily transfer total becomes 50,000 KZT.

### Postconditions

- Transfer is completed.
- Balance: 1,950,000 KZT.
- Daily total: 50,000 KZT.



## TC-10 - Correct SMS code confirms transfer

**ID:** TC-10  
**Traces to:** REQ-02, REQ-05  
**Technique:** State Transition Testing

### Preconditions

- User is logged in.
- Account balance is 2,000,000 KZT.
- Daily transfer total is 0 KZT.
- A transfer of 300,000 KZT has been submitted.
- SMS code screen is open.
- Current SMS state is W1.

### Steps

1. Enter the correct SMS code.
2. Submit the code.

### Expected Result

- SMS verification succeeds.
- Transfer is executed.
- State changes from W1 to Confirmed.
- Account balance becomes 1,700,000 KZT.
- Daily transfer total becomes 300,000 KZT.

### Postconditions

- Transfer is completed.
- Balance: 1,700,000 KZT.
- Daily total: 300,000 KZT.
- SMS state: Confirmed.



## TC-11 - SMS code expires after 120 seconds

**ID:** TC-11  
**Traces to:** REQ-06  
**Technique:** State Transition Testing

### Preconditions

- User is logged in.
- Account balance is 2,000,000 KZT.
- Daily transfer total is 0 KZT.
- A transfer of 300,000 KZT has been submitted.
- SMS code screen is open.
- Current SMS state is W1.

### Steps

1. Do not enter an SMS code.
2. Wait 120 seconds.

### Expected Result

- SMS code expires.
- Code-expired message is shown.
- Transfer is cancelled.
- State changes from W1 to Expired.
- Account balance remains 2,000,000 KZT.
- Daily transfer total remains 0 KZT.

### Postconditions

- Transfer is cancelled.
- Balance: 2,000,000 KZT.
- Daily total: 0 KZT.
- SMS state: Expired.



## TC-12 - Transfer cancelled after three incorrect SMS codes

**ID:** TC-12  
**Traces to:** REQ-07  
**Technique:** State Transition Testing

### Preconditions

- User is logged in.
- Account balance is 2,000,000 KZT.
- Daily transfer total is 0 KZT.
- A transfer of 300,000 KZT has been submitted.
- SMS code screen is open.
- Current SMS state is W1.

### Steps

1. Enter an incorrect SMS code.
2. Submit the code.
3. Enter another incorrect SMS code.
4. Submit the code.
5. Enter a third incorrect SMS code.
6. Submit the code.

### Expected Result

- After the first wrong code, state changes from W1 to W2.
- After the second wrong code, state changes from W2 to W3.
- After the third wrong code, state changes from W3 to Blocked.
- Transfer is cancelled.
- Account balance remains 2,000,000 KZT.
- Daily transfer total remains 0 KZT.

### Postconditions

- Transfer is cancelled.
- Balance: 2,000,000 KZT.
- Daily total: 0 KZT.
- SMS state: Blocked.