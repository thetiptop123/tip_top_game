const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
    code: { type: String, unique: true, required: true },
    used: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);
