# Utiliser l'image officielle de Node.js comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package*.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste des fichiers dans le conteneur
COPY . .

# Exposer le port sur lequel le serveur écoute
EXPOSE 5000

# Démarrer l'application avec la commande npm start
CMD ["npm", "start"]
