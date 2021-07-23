FROM node:12

ENV TZ America/Lima

WORKDIR /app

RUN yarn global add @quasar/cli

ADD package.json .

RUN yarn install

COPY . .

# RUN yarn build:ssr

EXPOSE 80
CMD ["quasar", "dev"]
