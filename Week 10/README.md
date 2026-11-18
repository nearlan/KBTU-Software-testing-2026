# Description
Github actions was used due repo lives in github. CI pipeline is for week 6 project

## Timing Table

| Configuration | Test execution | CI elapsed time | Run |
| --- | --- | --- | --- |
| Without sharding | 1 min 18 sec | 25 min 36 sec | [Link](https://github.com/nearlan/KBTU-Software-testing-2026/actions/runs/44357643313) |
| 4 shards | 30 sec | 1 min 54 sec | [Link](https://github.com/nearlan/KBTU-Software-testing-2026/actions/runs/44351920899) |

Results show, that parallel execution reduces test execution time.

## Etc
Because original [toolshop](https://practicesoftwaretesting.com/) uses cloudfare protection, which leads to timeout errors in github CI, so I made my deployed my own toolshop [website](https://kbtu-software-testing-toolshop-4306a314fc50.herokuapp.com) from original fork.

## Screenshots
![alt text](image.png)
Created CI, that triggers on PR, push and manually

![alt text](image-1.png)
Created CI with no shards, to compare with 4 shards

![alt text](image-2.png)
Completed and running jobs

![alt text](image-3.png)
Completed action artifacts

![alt text](image-4.png)
Playwright report from CI

![alt text](image-5.png)
JSON report from failed action (failed because of original website cloudfare protection)

![alt text](image-6.png)
README badge