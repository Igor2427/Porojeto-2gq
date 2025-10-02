FROM node:20-alpine

# Pasta de trabalho do container
WORKDIR /app

# Copia só o package.json e package-lock.json da pasta do app
COPY digimonbank/package*.json ./digimonbank/

# Vai para a pasta do app
WORKDIR /app/digimonbank

# Instala dependências
RUN npm install

# Copia todo o app
COPY digimonbank/ .

# Roda build
RUN npm run build

# Expõe porta do Next.js
EXPOSE 3000

# Inicia app
CMD ["npm", "start"]
