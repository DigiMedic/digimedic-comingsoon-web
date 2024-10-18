# Základní obraz
FROM node:18-alpine

# Nastavení pracovního adresáře
WORKDIR /app

# Kopírování package.json a package-lock.json
COPY package.json package-lock.json* ./

# Instalace závislostí
RUN npm ci

# Kopírování zdrojových souborů
COPY . .

# Sestavení aplikace
RUN npm run build

# Nastavení proměnných prostředí
ENV NODE_ENV=production
ENV PORT=3000

# Expozice portu
EXPOSE 3000

# Spuštění aplikace
CMD ["npm", "start"]
