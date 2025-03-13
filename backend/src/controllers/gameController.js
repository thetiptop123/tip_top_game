const Gain = require('../models/gainsModel');
const Ticket = require('../models/winningTicket');
const transporter = require('../config/transporter');

// Importer le modèle de ticket pour vérifier si le ticket est gagnant
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')


// Enregistrer le gain d'un utilisateur
const recordGameController = async (req, res) => {
  try {
    // get user id from token
    const user = req.user;
    const { ticketNumber } = req.body;
    // check if all fields are provided
    if (!ticketNumber) {
      return res.status(400).json({
        success: false,
        message: 'ticket number is required',
      });
    }
    // check if ticket number is valid
    const ticket = await Ticket.findOne({ ticketNumber });  // Vérifier si le ticket existe dans la base
    // check if ticket is used  
    if (!ticket || ticket.isUsed) {
      return res.status(400).json({
        success: false,
        message: 'Ticket is invalid or already used.',
      });
    }
    // check if ticket is used  
    // Enregistrer le gain
    const newGain = new Gain({
      userId: req.user._id,
      ticketNumber,
      prizeWon: ticket.prizeWon, // Le lot gagné
      prizeValue: ticket.prizeValue, // La valeur du lot

    });

    await newGain.save();  // Sauvegarder l'enregistrement dans la base de données

    // Marquer le ticket comme utilisé
    ticket.isUsed = true;
    await ticket.save();


    // Formater la date actuelle
    const date = new Date().toLocaleString();

    // Configuration de l'email pour l'administrateur
    const adminMailOptions = {
      from: `${user.userName} <${user.email}>`,   // Affiché dans l'en-tête "From:"
      to: 'mouaadsellak123@gmail.com',     // Email de l'administrateur (à adapter)
      subject: `Nouveau participant au concours Thé Tip Top : ${user.userName}`,
      text: `Bonjour,

Un nouveau participant vient de jouer le ${date} dans le concours Thé Tip Top.
Détails :
- Nom : ${user.userName}
- Email : ${user.email}
- Lot gagné : ${newGain.prizeWon}
- Valeur du lot : ${newGain.prizeValue} 

Cordialement,
L'équipe Thé Tip Top`,
      html: `
    <h3>Nouveau participant au concours Thé Tip Top</h3>
    <p><strong>Date de participation :</strong> ${date}</p>
    <p><strong>Nom :</strong> ${user.userName}</p>
    <p><strong>Email :</strong> ${user.email}</p>
    <p><strong>Lot gagné :</strong> ${newGain.prizeWon}</p>
    <p><strong>Valeur du lot :</strong> ${newGain.prizeValue} euros</p>
    <p>Cordialement,<br>L'équipe Thé Tip Top</p>
  `,
      envelope: {
        from: process.env.EMAIL_USER, // Utilisé pour l'authentification SMTP
        to: 'mouaadsellak123@gmail.com'
      }
    };

    // Configuration de l'email pour le participant
    const playerMailOptions = {
      from: `Thé Tip Top <${process.env.EMAIL_USER}>`,
      to: req.user.email, // L'adresse email du participant, extraite de req.user
      subject: 'Félicitations, vous avez gagné dans le concours Thé Tip Top !',
      text: `Bonjour ${req.user.userName},

Félicitations ! Vous venez de gagner dans le concours Thé Tip Top.
Détails de votre gain :
- Date de participation : ${date}
- Lot : ${newGain.prizeWon}
- Valeur : ${newGain.prizeValue}

Merci pour votre participation.

Cordialement,
L'équipe Thé Tip Top`,
      html: `
    <p>Bonjour ${req.user.userName},</p>
    <p>Félicitations ! Vous venez de gagner dans le concours <strong>Thé Tip Top</strong>.</p>
    <p><strong>Date de participation :</strong> ${date}</p>
    <p><strong>Lot :</strong> ${newGain.prizeWon}</p>
    <p><strong>Valeur :</strong> ${newGain.prizeValue} euros</p>
    <p>Merci pour votre participation.</p>
    <p>Cordialement,<br>L'équipe Thé Tip Top</p>
  `,
      envelope: {
        from: process.env.EMAIL_USER,
        to: req.user.email
      }
    };

    // Envoi de l'email à l'administrateur
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log("Email envoyé à l'administrateur :", adminInfo.response);

    // Envoi de l'email au participant
    const playerInfo = await transporter.sendMail(playerMailOptions);
    console.log("Email envoyé au participant :", playerInfo.response);

    // Retourner la réponse positive
    return res.status(200).json({
      success: true,
      message: 'Congratulations, you won a prize. Notifications have been sent to your email!',
      gain: newGain,
    });
  } catch (error) {
    console.error("Erreur dans recordGameAndSendEmailController :", error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = { recordGameController };
