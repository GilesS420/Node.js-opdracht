const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Achievement = require('../models/Achievement');

// Show all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.render('games', { games });
    } catch (error) {
        res.status(500).send('Error fetching games');
    }
});

// Show single game with its achievements
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        const achievements = await Achievement.find({ game: req.params.id });
        res.render('gameDetails', { game, achievements });
    } catch (error) {
        res.status(500).send('Error fetching game details');
    }
});

module.exports = router; 