
const express = require('express');

const connectDB = require('./src/config/db'); // Connexion DB
const authRoutes = require('./src/routes/authRoute');
const userRoutes = require('./src/routes/userRoute'); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);



module.exports = app;
=======
// server.js

require('dotenv').config(); // charge le .env
const express = require('express');
const connectDB = require('./src/db');


const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la base Mongo
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/auth', require('./src/routes/auth'));
app.use('/game', require('./src/routes/tickets'));
app.use('/game', require('./src/routes/draw'));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Backend lancé sur http://localhost:${PORT}`);
});

