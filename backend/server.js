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
