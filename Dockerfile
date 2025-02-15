FROM node:20 AS dev

WORKDIR /app

COPY package.json .

RUN yarn install && yarn cache clean

COPY src/. src/.
COPY public/. public/.
COPY sentry.client.config.ts .
COPY sentry.edge.config.ts .
COPY sentry.server.config.ts .
COPY next.config.ts .
COPY tsconfig.json .
COPY postcss.config.mjs .
COPY tailwind.config.ts .

CMD ["yarn", "dev"]

FROM node:20 AS build

WORKDIR /app

COPY package.json .

RUN yarn install && yarn cache clean

COPY src/. src/.
COPY public/. public/.
COPY prisma/. prisma/.
COPY sentry.client.config.ts .
COPY sentry.edge.config.ts .
COPY sentry.server.config.ts .
COPY next.config.ts .
COPY tsconfig.json .
COPY postcss.config.mjs .
COPY tailwind.config.ts .
COPY LICENSE .

RUN yarn prisma generate
RUN yarn build

CMD ["yarn", "db:push"]
