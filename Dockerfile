FROM node:9.3-slim

WORKDIR /usr/app

ADD . /usr/app

RUN yarn install && yarn build

EXPOSE 3000

CMD ["node", "dist"]
