FROM node:20-alpine AS base

# Nastavení pracovního adresáře
WORKDIR /app

# Instalace závislostí
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Nastavení proměnných prostředí pro build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_GHOST_URL="https://ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io"
ENV NEXT_PUBLIC_GHOST_KEY="0fe6e78d497ebf77ab192d7804"

# Build aplikace
RUN npm run build

# Produkční image
FROM base AS runner

# Nastavení proměnných prostředí pro produkci
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_GHOST_URL="https://ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io"
ENV NEXT_PUBLIC_GHOST_KEY="0fe6e78d497ebf77ab192d7804"

# Vytvoření neprivilegovaného uživatele
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Kopírování buildu
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Nastavení portu a hostu
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Spuštění aplikace
CMD ["node", "server.js"]
