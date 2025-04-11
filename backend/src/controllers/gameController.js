const Gain = require('../models/gainsModel');
const Ticket = require('../models/winningTicket');
const User = require('../models/usersModel');
const { 
  sendAdminNotification, 
  sendPlayerNotification, 
  sendPlayerGrandWinnerNotification, 
  sendAdminGrandWinnerNotification 
} = require('../config/emailService');

// Enregistrer le gain d'un utilisateur
const recordGameController = async (req, res) => {
  try {
    // get user id from token
    const user = req.user;
    const now = new Date(); // Use current local date if needed

    const { ticketNumber } = req.body;
    // Check if ticket number is provided
    if (!ticketNumber) {
      return res.status(400).json({
        success: false,
        message: 'ticket number is required',
      });
    }
    // Check if ticket number is valid
    const ticket = await Ticket.findOne({ ticketNumber }); // Vérifier si le ticket existe dans la base
    // Check if ticket is used  
    if (!ticket || ticket.isUsed) {
      return res.status(400).json({
        success: false,
        message: 'Ticket is invalid or already used.',
      });
    }

    // Enregistrer le gain
    const newGain = new Gain({
      userId: user._id,
      ticketNumber,
      prizeWon: ticket.prizeWon, // Le lot gagné
      prizeValue: ticket.prizeValue, // La valeur du lot
    });
    await newGain.save();  // Sauvegarder l'enregistrement dans la base de données

    // Marquer le ticket comme utilisé
    ticket.isUsed = true;
    await ticket.save();

    // Configuration de l'email pour le participant et l'administrateur
    // await sendPlayerNotification({ 
    //   userName: user.userName, 
    //   email: user.email, 
    //   date: now, 
    //   prizeWon: ticket.prizeWon, 
    //   prizeValue: ticket.prizeValue 
    // });
    // await sendAdminNotification({ 
    //   userName: user.userName, 
    //   email: user.email, 
    //   date: now, 
    //   prizeWon: ticket.prizeWon, 
    //   prizeValue: ticket.prizeValue 
    // });

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

const grandTirageController = async (req, res) => {
  try {
    const now = new Date(); // Use current local date if needed

    // Skip date validation logic and proceed directly to pick a random gain
    const randomGain = await Gain.aggregate([{ $sample: { size: 1 } }]);
    if (randomGain.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No gains found.',
      });
    }

    const bigWinner = await User.findById(randomGain[0].userId);
    if (!bigWinner) {
      return res.status(400).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Send email notifications to the big winner and admin
    await sendPlayerGrandWinnerNotification({ 
      userName: bigWinner.userName, 
      email: bigWinner.email, 
      date: now, 
      prizeWon: "grand Lot", 
      prizeValue: "360 euros" 
    });
    await sendAdminGrandWinnerNotification({ 
      userName: bigWinner.userName, 
      email: bigWinner.email, 
      date: now, 
      prizeWon: "grand Lot", 
      prizeValue: "360 euros" 
    });

    return res.status(200).json({
      success: true,
      message: `Congratulations, ${bigWinner.userName} is the big winner of the grand lot with 360 euros.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error playing game.',
    });
  }
};

module.exports = { recordGameController, grandTirageController };