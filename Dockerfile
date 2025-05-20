FROM node:24-slim AS dev

WORKDIR /app

COPY package.json .

RUN yarn install && yarn cache clean

COPY . .

CMD ["pnpm", "dev", "--turbo"]

FROM node:24-slim AS build

RUN npm i -g corepack@latest
RUN corepack enable
RUN corepack prepare pnpm@latest-10 --activate

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm prisma generate
RUN pnpm build

CMD ["pnpm", "start", "--turbo"]
