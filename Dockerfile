FROM node:10-alpine

MAINTAINER gyan.satapathy@yahoo.com

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm install

RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/docs /usr/share/nginx/html