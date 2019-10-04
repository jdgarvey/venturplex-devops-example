ARG NODE_VERSION=12-alpine
FROM node:${NODE_VERSION}

WORKDIR /app/

EXPOSE 4200

RUN apk add --no-cache \
  bash \
  git

COPY package.json .

RUN yarn

COPY . .

CMD ["yarn", "start"]
