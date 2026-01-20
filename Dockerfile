FROM node:22-alpine AS base
FROM base AS deps
# RUN apk add --no-cache --update libc6-compat python3 py3-pip build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev
WORKDIR /app

COPY package.json package-lock.json ./
RUN yarn install --ignore-scripts && yarn cache clean

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=local
ENV APP_ENV=local

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p /app/public/cmi && chown -R nextjs:nodejs /app/public/cmi
RUN ln -s /media /app/public/cmi

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]