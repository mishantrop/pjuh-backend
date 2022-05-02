FROM node:16 as dev

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

RUN npm install glob rimraf

COPY . .

RUN npm run build
