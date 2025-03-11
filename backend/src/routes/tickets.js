// routes/tickets.js (ou game.js)
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Gain = require('../models/Gain');

// Vérifier et utiliser un code
router.post('/use-ticket', async (req, res) => {
  try {
    // Récupérer le code du ticket et l'ID du participant depuis le body
    // (ou depuis un token JWT si tu préfères)
    const { code, participantId } = req.body;

    // Trouver un ticket non utilisé correspondant au code
    const ticket = await Ticket.findOne({ code, used: false });
    if (!ticket) {
      return res.status(400).json({ message: "Code invalide ou déjà utilisé" });
    }

    // Définir les probabilités
    const lots = [
      { lot: "Infuseur à thé", prob: 60 },
      { lot: "Thé détox 100g", prob: 20 },
      { lot: "Thé signature 100g", prob: 10 },
      { lot: "Coffret découverte (39€)", prob: 6 },
      { lot: "Coffret découverte (69€)", prob: 4 }
    ];

    // Calculer aléatoirement le lot gagné
    let random = Math.random() * 100;
    let selectedLot = "Infuseur à thé";
    for (const item of lots) {
      if (random < item.prob) {
        selectedLot = item.lot;
        break;
      }
      random -= item.prob;
    }

    // Associer le ticket au participant et le marquer comme utilisé
    ticket.participantId = participantId;  // <-- c'est ici qu'on associe le ticket au participant
    ticket.used = true;
    ticket.lot = selectedLot;              // si tu veux stocker le lot directement dans le ticket
    await ticket.save();

    // Enregistrer le gain dans la collection Gains (optionnel si tu veux un historique séparé)
    const gain = new Gain({
      ticketId: ticket._id,
      lot: selectedLot
    });
    await gain.save();

    return res.json({
      message: "🎉 Félicitations ! Vous avez gagné : " + selectedLot,
      ticket
    });
  } catch (error) {
    console.error("Erreur lors de l'utilisation du ticket:", error);
    return res.status(500).json({ message: "Erreur serveur lors de l'utilisation du ticket." });
  }
});

module.exports = router;
