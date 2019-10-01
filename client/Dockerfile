FROM node:12-alpine

WORKDIR /app/

EXPOSE 4200

RUN apk add --no-cache \
  bash \
  git

COPY package.json .

RUN yarn

COPY . .

CMD ["yarn", "start"]
