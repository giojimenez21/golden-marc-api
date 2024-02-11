FROM node:18-alpine3.15 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build


FROM node:18-alpine3.15 AS runner

WORKDIR /usr/src/app

COPY package.json docs.yaml  ./

RUN yarn install --prod

COPY --from=builder /app/dist ./dist

CMD ["node","dist/index.js"]