const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', default: null },
  code: { type: String, unique: true, required: true },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  lot: { type: String },      // Ajouté pour conserver le Lot
  libelle: { type: String }   // Ajouté pour conserver le Libellé
});

module.exports = mongoose.model('Ticket', TicketSchema);
