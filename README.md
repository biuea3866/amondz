# ERD url
https://drawsql.app/asd-47/diagrams/amondz#

# 사용 방법

###  Docker를 사용할 경우
#### 1. git clone https://github.com/biuea3866/amondz.git
#### 2. cd amondz
#### 3. src/config/env.variable.ts 파일에서 MYSQL_HOST: mysql로 변경 
#### 4. docker-compose up --build --force-recreate -d 
#### 5. http://localhost:3000/에서 테스트 진행

###  localhost로 사용할 경우
#### 1. git clone https://github.com/biuea3866/amondz.git
#### 2. cd amondz
#### 3. src/config/env.variable.ts 파일에서 MYSQL_HOST: localhost로 변경 
#### 4. http://localhost:3000/에서 테스트 진행

# 테스트 예제

### 1. 상품 등록
<img width="1294" alt="스크린샷 2022-03-29 01 20 51" src="https://user-images.githubusercontent.com/59189504/160443023-f8992e22-5d4b-4f77-99e4-c3870567a10f.png">
<img width="1294" alt="스크린샷 2022-03-29 01 21 00" src="https://user-images.githubusercontent.com/59189504/160443035-c299b8a0-3236-40dd-9edd-e8909be9488b.png">

### 2. 상품 수정
<img width="1297" alt="스크린샷 2022-03-29 01 23 34" src="https://user-images.githubusercontent.com/59189504/160443437-b86bf7db-f546-4304-97d9-fe4266f80d23.png">
<img width="1299" alt="스크린샷 2022-03-29 01 23 46" src="https://user-images.githubusercontent.com/59189504/160443448-2a05b30b-4990-4790-8f19-848dc1f48342.png">

### 3. 상품 전체 조회
<img width="1294" alt="스크린샷 2022-03-29 01 24 46" src="https://user-images.githubusercontent.com/59189504/160443587-e1498b3e-85db-4a49-af67-2338d00b6149.png">

### 4. 개별 상품 조회
<img width="1299" alt="스크린샷 2022-03-29 01 25 12" src="https://user-images.githubusercontent.com/59189504/160443709-8ae471d8-61e9-450b-a45d-164ef59e3ee4.png">

### 5. 상품 좋아요
<img width="1294" alt="스크린샷 2022-03-29 01 26 04" src="https://user-images.githubusercontent.com/59189504/160443867-b2df540a-5c1c-450d-893f-2ccd1b3a3a6a.png">
<img width="1294" alt="스크린샷 2022-03-29 01 26 25" src="https://user-images.githubusercontent.com/59189504/160443931-b3b10690-7d9d-4c87-a37d-df53957b5993.png">

### 6. 상품 삭제
<img width="1300" alt="스크린샷 2022-03-29 01 27 19" src="https://user-images.githubusercontent.com/59189504/160444047-163268b0-8ab9-4c2a-bae3-cc5aca1cb022.png">
