FROM node:18-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 8080

CMD ["node","dist/src/main"]