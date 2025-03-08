// server.js

require('dotenv').config(); // charge le .env
const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la base Mongo
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/auth', require('./src/routes/auth'));
app.use('/game', require('./src/routes/tickets'));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Backend lancé sur http://localhost:${PORT}`);
});
