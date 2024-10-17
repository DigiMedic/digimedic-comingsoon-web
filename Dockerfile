FROM node:18-alpine

# Nastavte pracovní adresář v kontejneru
WORKDIR /app

# Zkopírujte package.json a package-lock.json
COPY package*.json ./

# Nainstalujte závislosti
RUN npm ci

# Zkopírujte zdrojové soubory
COPY . .

# Sestavte aplikaci
RUN npm run build

# Spusťte aplikaci
CMD ["npm", "start"]
