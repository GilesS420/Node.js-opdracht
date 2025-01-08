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

// GET route for new achievement form
router.get('/new/:gameId', async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) {
            return res.status(404).send('Game not found');
        }
        res.render('achievements/new', { 
            game: game,
            formData: {},
            error: null
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST route to create new achievement
router.post('/:gameId', async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) {
            return res.status(404).send('Game not found');
        }

        const achievementData = {
            name: req.body.name,
            description: req.body.description,
            points: req.body.points,
            difficulty: req.body.difficulty,
            game: req.params.gameId
        };

        const achievement = new Achievement(achievementData);
        
        const validationError = achievement.validateSync();
        if (validationError) {
            return res.render('achievements/new', {
                game: game,
                formData: req.body,
                error: Object.values(validationError.errors)[0].message
            });
        }

        await achievement.save();
        res.redirect(`/games/${req.params.gameId}`);

    } catch (error) {
        console.error('Error creating achievement:', error);
        const game = await Game.findById(req.params.gameId);
        res.render('achievements/new', {
            game: game,
            formData: req.body,
            error: error.message
        });
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
        if (!achievement) {
            return res.status(404).send('Achievement not found');
        }

        const gameId = achievement.game; // Store the game ID before deletion
        await Achievement.findByIdAndDelete(req.params.id);
        
        res.redirect(`/games/${gameId}`);
    } catch (error) {
        console.error('Error deleting achievement:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router; 