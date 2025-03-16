const Gain = require('../models/gainsModel');
const Ticket = require('../models/winningTicket');
const { sendAdminNotification, sendPlayerNotification } = require('../../script/services/emailService');





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
    if (!ticket || ticket.isUsed || ticket.validUntil < new Date()) {
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

// controllers/launchGameController.js
const WinningTicket = require('../models/winningTicket');
// Répartition par défaut des lots
const defaultPrizeDistribution = [
  { label: "Lot 1", count: 300000, value: 10 },  // 60%
  { label: "Lot 2", count: 100000, value: 15 },  // 20%
  { label: "Lot 3", count: 50000, value: 20 },  // 10%
  { label: "Lot 4", count: 30000, value: 39 },  // 6%
  { label: "Lot 5", count: 20000, value: 69 }   // 4%
];

const prizeItems = {
  "Lot 1": "1 Infuseur à thé",
  "Lot 2": "1 Boite de 100g d’un thé détox ou infusion",
  "Lot 3": "1 boite de 100g d’un thé signature",
  "Lot 4": "1 coffret découverte d’une valeur de 39€",
  "Lot 5": "1 coffret découverte d’une valeur de 69€"
};

// Génération d'un numéro de ticket unique
const generateTicketNumber = () => {
  const prefix = "3T-";
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomPart = "";
  const length = 7;
  for (let i = 0; i < length; i++) {
    randomPart += characters[Math.floor(Math.random() * characters.length)];
  }
  return prefix + randomPart;
};

const generatedTicketNumbers = new Set();
const generateUniqueTicketNumber = () => {
  let num;
  do {
    num = generateTicketNumber();
  } while (generatedTicketNumbers.has(num));
  generatedTicketNumbers.add(num);
  return num;
};

// Contrôleur pour lancer le jeu et générer les tickets
const launchGameController = async (req, res) => {
  try {
    // Récupération des dates de début et de fin du jeu depuis le corps de la requête
    const { startDate, endDate, customDistribution } = req.body;
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'startDate and endDate are required'
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'startDate must be before endDate'
      });
    }

    // Utiliser la répartition personnalisée si fournie, sinon la répartition par défaut
    const prizeDistribution = Array.isArray(customDistribution) && customDistribution.length > 0
      ? customDistribution
      : defaultPrizeDistribution;

    // Supprime tous les anciens tickets
    await WinningTicket.deleteMany();
    console.log("Ancien tickets supprimés.");

    const batchSize = 10000; // Taille du batch pour l'insertion
    let batch = [];
    let totalInserted = 0;

    // Génération des tickets selon la répartition
    for (const prize of prizeDistribution) {
      let count = 0;
      while (count < prize.count) {
        const ticket = {
          ticketNumber: generateUniqueTicketNumber(),
          isUsed: false,
          prizeValue: prize.value,
          prizeWon: prizeItems[prize.label],
          startDate: start,  // Date de début du jeu
          validUntil: end    // Date de fin de validité du ticket
        };
        batch.push(ticket);
        count++;
        totalInserted++;

        if (batch.length >= batchSize) {
          await WinningTicket.insertMany(batch);
          console.log(`${totalInserted} tickets générés...`);
          batch = [];
        }
      }
    }

    if (batch.length > 0) {
      await WinningTicket.insertMany(batch);
    }

    console.log("✅ Tickets générés avec succès !");
    return res.status(200).json({
      success: true,
      message: 'Game launched and tickets generated successfully!',
      totalTickets: totalInserted,
      startDate: start,
      endDate: end
    });
  } catch (error) {
    console.error("Erreur lors du lancement du jeu :", error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};




module.exports = { recordGameController, launchGameController };
