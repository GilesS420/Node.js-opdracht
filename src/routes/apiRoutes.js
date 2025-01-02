const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Achievement = require('../models/Achievement');

// API Documentation page
router.get('/', (req, res) => {
    res.render('api-docs');
});

// Get games with limit and offset
router.get('/api/games', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 6;
        const offset = parseInt(req.query.offset) || 0;
        
        const games = await Game.find()
            .sort({ createdAt: -1 })  // Sort by creation date, newest first
            .skip(offset)
            .limit(limit)
            .lean();

        const total = await Game.countDocuments();
        
        res.json({
            games,
            total,
            limit,
            offset
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Search achievements
router.get('/api/achievements/search', async (req, res) => {
    try {
        const query = {};

        // Search by name (case-insensitive)
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' };
        }

        // Filter by difficulty
        if (req.query.difficulty) {
            query.difficulty = req.query.difficulty;
        }

        // Filter by points
        if (req.query.points) {
            query.points = parseInt(req.query.points);
        }

        const achievements = await Achievement.find(query)
            .populate('game', 'title')  // Include game title
            .lean();

        res.json({
            achievements,
            count: achievements.length,
            filters: req.query
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 