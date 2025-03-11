const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Participant = require('../models/Participant');
require('dotenv').config();

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const participant = new Participant({ email, password: hashedPassword });
        await participant.save();

        const token = jwt.sign({ id: participant._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: "Email déjà utilisé" });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const participant = await Participant.findOne({ email });
    if (!participant || !(await bcrypt.compare(password, participant.password))) {
        return res.status(400).json({ message: "Identifiants incorrects" });
    }

    const token = jwt.sign({ id: participant._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
