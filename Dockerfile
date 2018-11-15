FROM node:10

WORKDIR /usr/app

ADD . /usr/app

RUN yarn install && yarn build

EXPOSE 3000

CMD ["node", "dist"]
