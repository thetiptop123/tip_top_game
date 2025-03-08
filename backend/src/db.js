// db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // process.env.MONGO_URI vient de .env (chargé plus tard par server.js)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    process.exit(1); // Arrête l'app si la connexion échoue
  }
};

module.exports = connectDB;
