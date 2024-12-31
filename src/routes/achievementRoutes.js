const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const Game = require('../models/Game');
const multer = require('multer');
const path = require('path');

// Configure multer for achievement images
const storage = multer.diskStorage({
    destination: './public/uploads/achievements/',
    filename: function(req, file, cb) {
        cb(null, 'achievement-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

// Show all achievements (now just '/' since /achievements is the base)
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find().populate('game');
        res.render('achievements/index', { achievements });
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.redirect('/');
    }
});

// Show achievement form (now starts with /games)
router.get('/new/:gameId', async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        res.render('achievements/new', { game });
    } catch (error) {
        res.redirect('/games');
    }
});

// Create achievement
router.post('/:gameId', upload.single('achievementImage'), async (req, res) => {
    try {
        // Validate points
        const points = parseInt(req.body.points);
        if (points < 5 || points > 20) {
            throw new Error('Points must be between 5 and 20');
        }

        const achievementData = {
            name: req.body.name,
            description: req.body.description,
            points: points,
            difficulty: req.body.difficulty,
            game: req.params.gameId,
            imageUrl: req.file ? `/uploads/achievements/${req.file.filename}` : ''
        };

        const achievement = new Achievement(achievementData);
        await achievement.save();

        await Game.findByIdAndUpdate(req.params.gameId, {
            $inc: { totalAchievements: 1 }
        });

        res.redirect(`/games/${req.params.gameId}`);
    } catch (error) {
        console.error('Error creating achievement:', error);
        res.redirect(`/games/${req.params.gameId}`);
    }
});

// Edit achievement form
router.get('/:id/edit', async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id).populate('game');
        res.render('achievements/edit', { achievement });
    } catch (error) {
        res.redirect('/games');
    }
});

// Update achievement
router.put('/:id', upload.single('achievementImage'), async (req, res) => {
    try {
        // Validate points
        const points = parseInt(req.body.points);
        if (points < 5 || points > 20) {
            throw new Error('Points must be between 5 and 20');
        }

        const achievement = await Achievement.findById(req.params.id);
        
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            points: points,
            difficulty: req.body.difficulty
        };

        if (req.file) {
            updateData.imageUrl = `/uploads/achievements/${req.file.filename}`;
        }

        await Achievement.findByIdAndUpdate(req.params.id, updateData);
        res.redirect(`/games/${achievement.game}`);
    } catch (error) {
        console.error('Error updating achievement:', error);
        res.redirect('/games');
    }
});

// Delete achievement
router.delete('/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        const gameId = achievement.game;

        await achievement.remove();
        
        // Update game's total achievements
        await Game.findByIdAndUpdate(gameId, {
            $inc: { totalAchievements: -1 }
        });

        res.redirect(`/games/${gameId}`);
    } catch (error) {
        res.redirect('/games');
    }
});

module.exports = router; 