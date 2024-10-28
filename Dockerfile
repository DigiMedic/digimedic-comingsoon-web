FROM node:20-alpine AS base
WORKDIR /app

# První stage pro instalaci závislostí
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Druhý stage pro build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Nastavení proměnných prostředí pro build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV NEXT_PUBLIC_GHOST_URL="https://ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io"
ENV NEXT_PUBLIC_GHOST_KEY="0fe6e78d497ebf77ab192d7804"

RUN npm run build

# Produkční stage
FROM base AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_GHOST_URL="https://ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io"
ENV NEXT_PUBLIC_GHOST_KEY="0fe6e78d497ebf77ab192d7804"

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
