FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install

# Installer Nodemon globalement pour le hot reload
RUN npm install -g nodemon

COPY . .
EXPOSE 5000

# Lancer le serveur avec Nodemon pour surveiller les changements
CMD ["nodemon", "server.js"]
