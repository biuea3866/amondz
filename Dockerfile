FROM node:16

WORKDIR /amondz

COPY package*.json /product-service
COPY tsconfig.json /product-service
COPY /src /product-service/src

RUN npm install
RUN npm run tsc

CMD ["npm", "start"]

EXPOSE 3000