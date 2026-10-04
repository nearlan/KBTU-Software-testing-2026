# Release Checklist - SMS Code Flow

- SMS verification is requested for transfers above 100,000 KZT.
- SMS verification is not requested for transfers of 100,000 KZT or less.
- A correct SMS code successfully confirms the transfer.
- After successful SMS confirmation, the account balance is reduced by the transfer amount.
- After successful SMS confirmation, the daily transfer total is updated correctly.
- After the first incorrect SMS code, the user is allowed to make a second attempt.
- After the second incorrect SMS code, the user is allowed to make a third attempt.
- After the third incorrect SMS code, the transfer is cancelled.
- The SMS code expires after 120 seconds.
- An expired SMS code cannot complete the transfer.
- A correct SMS code entered after the transfer has been blocked is rejected.
- Repeated confirmation does not execute or debit the same transfer twice.