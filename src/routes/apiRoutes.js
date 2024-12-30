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
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        
        const games = await Game.find()
            .skip(offset)
            .limit(limit)
            .select('title platform totalAchievements');
        
        const total = await Game.countDocuments();
        
        res.json({
            games,
            total,
            limit,
            offset
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search achievements
router.get('/api/achievements/search', async (req, res) => {
    try {
        const query = {};
        
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' };
        }
        
        if (req.query.difficulty) {
            query.difficulty = req.query.difficulty;
        }
        
        if (req.query.points) {
            query.points = parseInt(req.query.points);
        }
        
        const achievements = await Achievement.find(query)
            .populate('game', 'title')
            .select('name description points difficulty');
            
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 