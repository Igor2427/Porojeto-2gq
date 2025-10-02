FROM node:20-alpine

WORKDIR /app

# Copiar apenas o package.json da pasta do app
COPY digimonbank/package*.json ./digimonbank/

# Entrar na pasta do app e instalar dependências
WORKDIR /app/digimonbank
RUN npm install

# Copiar todo o app
COPY digimonbank/ .

# Rodar build dentro da pasta do app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
