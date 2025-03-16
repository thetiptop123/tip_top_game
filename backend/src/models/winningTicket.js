const mongoose = require("mongoose");

const winningTicketSchema = new mongoose.Schema({
  ticketNumber: { type: String, unique: true, required: true },
  isUsed: { type: Boolean, default: false },
  prizeValue: { type: Number, required: true },
  prizeWon: { type: String, required: true },
  startDate: { type: Date, default: null },      // Date de début du jeu
  validUntil: { type: Date, required: true }       // Date de fin (fin de validité)
}, { timestamps: true });

module.exports = mongoose.model("WinningTicket", winningTicketSchema);
