const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// Show all achievements
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find().populate('game');
        res.render('achievements', { achievements });
    } catch (error) {
        res.status(500).send('Error fetching achievements');
    }
});

// Show single achievement
router.get('/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id).populate('game');
        res.render('achievementDetails', { achievement });
    } catch (error) {
        res.status(500).send('Error fetching achievement details');
    }
});

module.exports = router; 