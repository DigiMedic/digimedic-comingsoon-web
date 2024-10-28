FROM node:20-alpine AS base

# Instalace pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app

# Kopírování konfiguračních souborů
COPY package.json pnpm-lock.yaml ./

# Instalace závislostí
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Nastavení proměnných prostředí pro build
ENV NEXT_TELEMETRY_DISABLED 1
ENV GHOST_URL="https://ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io"
ENV GHOST_KEY="0fe6e78d497ebf77ab192d7804"

RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
