// contactRoute.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Création d'un transporteur pour Nodemailer avec les paramètres de Gmail
// Note : Pour Gmail, il est préférable d'utiliser un "App Password" si vous avez activé la double authentification
// et de stocker vos identifiants dans des variables d'environnement pour plus de sécurité.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Votre email, par exemple: 'votre.email@gmail.com'
    pass: process.env.EMAIL_PASS  // Votre mot de passe ou app password
  }
});
console.log(process.env.EMAIL_USER)
console.log(process.env.EMAIL_PASS)

// Route POST pour recevoir les données du formulaire de contact
router.post('/', async (req, res) => {
  // Extraction des données envoyées par le formulaire (assurez-vous d'avoir le middleware body-parser ou express.json() activé)
  const { nom, adresse_mail, message } = req.body;

  // Vérification de la présence des champs essentiels
  if (!nom || !adresse_mail || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  // Configuration de l'email à envoyer
  const mailOptions = {
    from: `${nom} <${adresse_mail}>`,   // Affiché dans l'en-tête "From:"
    to: 'mouaadsellak123@gmail.com',
    subject: `Nouveau contact de ${nom}`,
    text: message,
    html: `
    <p><strong></strong> ${message}</p>
    <p><strong></strong> ${nom}</p>
    `,
    envelope: {
      from: process.env.EMAIL_USER,     // Utilisé pour l'authentification SMTP
      to: 'mouaadsellak123@gmail.com'
    }
  };
  

  try {
    // Envoi de l'email avec Nodemailer
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé :", info.response);
    return res.status(200).json({ message: "Votre message a bien été envoyé !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    return res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
});

module.exports = router;
