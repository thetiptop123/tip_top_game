

const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Participant = require('../models/Participant');

// Route pour le tirage final du gros lot (accessible via /game/draw)
// Ici, le participant déclenche le tirage final pour découvrir s'il est le gagnant du gros lot
router.post('/draw', async (req, res) => {
  try {
    // On récupère tous les tickets utilisés (supposés avoir été validés pendant le concours)
    const usedTickets = await Ticket.find({ used: true }).select('participantId');
    
    // Extraire les IDs de participant (en filtrant les valeurs nulles)
    const participantIds = usedTickets
      .map(ticket => ticket.participantId)
      .filter(id => id != null)
      .map(id => id.toString());
      
    // Ne garder que les IDs uniques pour que chaque participant ne compte qu'une seule fois
    const uniqueParticipantIds = [...new Set(participantIds)];
    
    if (uniqueParticipantIds.length === 0) {
      return res.status(400).json({ message: "Aucun participant n'a joué pour le tirage final." });
    }
    
    // Sélectionner un gagnant aléatoirement parmi les participants uniques
    const randomIndex = Math.floor(Math.random() * uniqueParticipantIds.length);
    const winnerId = uniqueParticipantIds[randomIndex];
    
    const winner = await Participant.findById(winnerId);
    if (!winner) {
      return res.status(400).json({ message: "Le participant gagnant n'existe pas." });
    }
    
    return res.json({
      message: "Félicitations, vous êtes le gagnant du gros lot d'un an de thé !",
      winner
    });
  } catch (error) {
    console.error("Erreur lors du tirage final:", error);
    res.status(500).json({ message: "Erreur serveur lors du tirage final." });
  }
});

module.exports = router;
