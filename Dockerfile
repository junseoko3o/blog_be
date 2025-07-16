FROM node:18-alpine as deps

WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add --no-cache libc6-compat && yarn install --frozen-lockfile

FROM node:18-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs

ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_PORT=$DATABASE_PORT
ENV DATABASE_USERNAME=$DATABASE_USERNAME
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD
ENV DATABASE_NAME=$DATABASE_NAME
ENV JWT_ACCESS_SECRET=$JWT_ACCESS_SECRET
ENV JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET
ENV PORT=$PORT
ENV JWT_ACCESS_EXPIRATION_TIME=$JWT_ACCESS_EXPIRATION_TIME
ENV JWT_REFRESH_EXPIRATION_TIME=$JWT_REFRESH_EXPIRATION_TIME
ENV CRYPTO_KEY=$CRYPTO_KEY
ENV REDIS_PORT=$REDIS_PORT
ENV REDIS_HOST=$REDIS_HOST
ENV REDIS_PASSWORD=$REDIS_PASSWORD

ENV NODE_ENV prod

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

USER nestjs

EXPOSE 8080

CMD ["node", "dist/main"]
