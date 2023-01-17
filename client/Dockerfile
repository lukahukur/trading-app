FROM node:18-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY ./ ./

RUN npm i
RUN npm run build

EXPOSE 8080

CMD ["npm","start"]