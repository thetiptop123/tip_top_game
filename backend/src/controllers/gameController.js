const Gain = require('../models/gainsModel');
const Ticket = require('../models/winningTicket');
const { sendAdminNotification, sendPlayerNotification } = require('../config/emailService');



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

   
    // Configuration de l'email pour le participant
    await sendPlayerNotification({ userName: user.userName, email: user.email, date, prizeWon: ticket.prizeWon, prizeValue: ticket.prizeValue });
    // Configuration de l'email pour l'administrateur
    await sendAdminNotification({ userName: user.userName, email: user.email, date, prizeWon: ticket.prizeWon, prizeValue: ticket.prizeValue });

    return res.status(200).json({
      success: true,
      message: `Congratulations, you won ${ticket.prizeWon} worth ${ticket.prizeValue} euros.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error playing game.',
    });
  }
};

module.exports = { recordGameController };
