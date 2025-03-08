const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashé
    googleId: { type: String, default: null },
    facebookId: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Participant', ParticipantSchema);
