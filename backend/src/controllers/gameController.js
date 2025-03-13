const Gain = require('../models/gainsModel');
const Ticket = require('../models/winningTicket'); // Importer le modèle de ticket pour vérifier si le ticket est gagnant
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')


// Enregistrer le gain d'un utilisateur
const recordGameController = async (req, res) => {
  try {
    // get user id from token
    const { ticketNumber } = req.body;
    // check if all fields are provided
    if(!ticketNumber) {
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

    res.status(200).json({
      success: true,
      message: 'congratulations you won a prize.',
      gain: newGain,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = { recordGameController };
