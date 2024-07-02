FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript

RUN tsc

EXPOSE 4000

CMD ["node", "dist/index.js"]
