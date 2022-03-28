# 사용 방법

###  Docker를 사용할 경우
#### 1. git clone https://github.com/biuea3866/amondz.git
#### 2. cd amondz
#### 3. docker-compose up --build --force-recreate -d 
#### 4. http://localhost:3000/에서 테스트 진행

###  localhost로 사용할 경우
#### 1. git clone https://github.com/biuea3866/amondz.git
#### 2. cd amondz
#### 3. src/config/env.variable.ts 파일에서 MYSQL_HOST: localhost로 변경 
#### 4. http://localhost:3000/에서 테스트 진행