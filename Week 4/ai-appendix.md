# AI Appendix

AI was used mainly for three things: checking my answers against the lecture material, checking English grammar, and translating some notes from Russian to English. I did not use the AI output as the final answer directly.

## 1. Checking the answers
**Prompt used**

> По контексту презентаций Week 3 и Week 4 проверь, правильно ли составлены мои ответы по заданию Week 4. Не переписывай работу полностью. Пиши кратко: номер пункта и что стоит исправить или уточнить.

**Raw output**

1. Test plan - structure is correct: scope, approach, entry/exit criteria and risks are included.  
2. Test cases - boundary values and SMS states match the Week 3 task.  
3. Traceability matrix - REQ-08 is correctly marked as not covered; the case with a transfer across midnight cannot have a fixed expected result because the requirement is unclear.  
4. Checklist - keep it short and focused on the SMS flow.  
5. Defect reports - titles, preconditions, steps, expected/actual results and severity/priority are present.  
6. Do not add exact error messages or other behaviour that was not given in the requirements.

**What I changed and why**

I used this mostly as a second check. I kept the same test logic, but reviewed the places where I could accidentally add behaviour that was not in the Week 3 task. In particular, I left the midnight-crossing case as unclear instead of inventing the expected result. I also checked that the defect reports had the fields shown in the Week 4 lecture.

## 2. Grammar check

**Prompt used**

> Проверь английскую грамматику в этом тексте. Не меняй смысл и QA-термины. Пиши только: номер, исходная фраза, исправленная фраза. Если фраза нормальная - не пиши её.

**Raw output**

1. `SMS approve required` → `SMS verification required`  
2. `Transfer cancelled after 3 incorrect codes` → `Transfer is cancelled after three incorrect codes`  
3. `Daily total stays 0` → `Daily transfer total remains 0 KZT`  
4. `Code expired message is shown` → `A code-expired message is shown`  
5. `Transfer not created` → `The transfer is not created`

**What I changed and why**

I used the corrections only where the English sounded unnatural or too short. I kept the QA terminology and the original meaning. I also made wording more consistent between the test cases, checklist and defect reports, for example using `daily transfer total`, `SMS verification`, and `the transfer is not created`.

## 3. Translation from Russian to English

**Prompt used**

> Переведи мои заметки с русского на английский для QA-документации. Не добавляй новые детали. Сохрани простой стиль и термины из презентаций Week 3 и Week 4. Если есть несколько вариантов, дай один самый естественный.

**Raw output**

1. `Перевод не должен выполниться после истечения SMS-кода.`  
   → `The transfer must not be executed after the SMS code expires.`

2. `После третьего неправильного кода перевод отменяется.`  
   → `The transfer is cancelled after the third incorrect SMS code.`

3. `Если пользователь подтвердит перевод два раза, списание не должно произойти дважды.`  
   → `If the user confirms the transfer twice, the account must not be debited twice.`

4. `Если лимит превышен, баланс не должен измениться.`  
   → `If the daily limit is exceeded, the account balance must remain unchanged.`

5. `Неясно, к какому дню относится перевод, если SMS подтвержден после полуночи.`  
   → `It is unclear which day the transfer belongs to if SMS confirmation is completed after midnight.`

**What I changed and why**

I used the translations as a starting point and then adjusted them to match the wording already used in the rest of the assignment. I kept sentences short because they are used in test cases, checklist items and defect descriptions. I did not add requirements that were not in the original notes.

## Final note

The final structure, selected test cases, requirement coverage, checklist items and defect scenarios were decided by me using the Week 3 work and Week 4 lecture material. AI was used as a helper for review, wording, grammar and translation.
