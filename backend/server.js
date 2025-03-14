// server.js

require('dotenv').config(); // charge le .env
const cors = require('cors');
const express = require('express');
const connectDB = require('./src/db');


const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la base Mongo
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

app.use(cors())

// Routes
app.use('/auth', require('./src/routes/auth'));
app.use('/game', require('./src/routes/tickets'));
app.use('/game', require('./src/routes/draw'));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Backend lancé sur http://localhost:${PORT}`);
});
