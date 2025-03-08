const express = require('express');
const Ticket = require('../models/Ticket');
const Gain = require('../models/Gain');
const router = express.Router();

// Vérifier et utiliser un code
router.post('/use-ticket', async (req, res) => {
    const { code } = req.body;

    const ticket = await Ticket.findOne({ code, used: false });
    if (!ticket) return res.status(400).json({ message: "Code invalide ou déjà utilisé" });

    // Définir les probabilités
    const lots = [
        { lot: "Infuseur à thé", prob: 60 },
        { lot: "Thé détox 100g", prob: 20 },
        { lot: "Thé signature 100g", prob: 10 },
        { lot: "Coffret découverte (39€)", prob: 6 },
        { lot: "Coffret découverte (69€)", prob: 4 }
    ];

    let random = Math.random() * 100;
    let selectedLot = "Infuseur à thé"; 

    for (const item of lots) {
        if (random < item.prob) {
            selectedLot = item.lot;
            break;
        }
        random -= item.prob;
    }

    ticket.used = true;
    await ticket.save();

    const gain = new Gain({ ticketId: ticket._id, lot: selectedLot });
    await gain.save();

    res.json({ message: "🎉 Félicitations ! Vous avez gagné : " + selectedLot });
});

module.exports = router;
