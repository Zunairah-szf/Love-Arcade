require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from root

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { dbName: 'loveArcade' })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Schema
const matchSchema = new mongoose.Schema({
    name1: String,
    name2: String,
    flamesResult: String,
    loveScore: Number,
    prediction: String,
    date: { type: Date, default: Date.now }
});

const Match = mongoose.model('Match', matchSchema);

// Routes
app.post('/api/save', async (req, res) => {
    console.log('Received save request:', req.body);
    try {
        const newMatch = new Match(req.body);
        await newMatch.save();
        console.log('Match saved successfully:', req.body);
        res.status(201).json({ message: 'Match saved successfully!' });
    } catch (error) {
        console.log('CRITICAL ERROR saving match:', error); // Using log to ensure visibility
        res.status(500).json({ error: 'Failed to save match', details: error.message });
    }
});

// Serve index.html for any other route
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
