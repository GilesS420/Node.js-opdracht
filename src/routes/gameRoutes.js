const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Game = require('../models/Game');
const Achievement = require('../models/Achievement');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, 'game-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // Increased to 5MB
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Show all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.render('games', { games });
    } catch (error) {
        res.status(500).send('Error fetching games');
    }
});

// Show create form - THIS MUST COME BEFORE THE /:id ROUTE
router.get('/newGame', (req, res) => {
    res.render('games/newGame', { error: null, game: {} });
});

// Create new game with file upload
router.post('/', upload.single('gameImage'), async (req, res) => {
    try {
        // Check for existing game with same title
        const existingGame = await Game.findOne({ title: req.body.title });
        if (existingGame) {
            // Render the form again with error message and previous input
            return res.render('games/newGame', {
                error: 'A game with this title already exists',
                game: req.body
            });
        }

        const gameData = {
            title: req.body.title,
            platform: req.body.platform,
            description: req.body.description,
            genre: req.body.genre,
            releaseDate: req.body.releaseDate,
            imageUrl: req.file ? `/uploads/games/${req.file.filename}` : ''
        };

        const game = new Game(gameData);
        await game.save();
        res.redirect('/games');
    } catch (error) {
        res.render('games/newGame', {
            error: error.message,
            game: req.body
        });
    }
});

// Show single game
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        const achievements = await Achievement.find({ game: req.params.id });
        res.render('games/detail', { game, achievements });
    } catch (error) {
        console.error('Error fetching game details:', error);
        res.redirect('/games');
    }
});

// Show edit form
router.get('/:id/edit', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        res.render('games/edit', { game });
    } catch (error) {
        res.redirect('/games');
    }
});

// Update game
router.put('/:id', upload.single('gameImage'), async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        
        // Prepare update data
        const updateData = {
            title: req.body.title,
            platform: Array.isArray(req.body.platform) ? req.body.platform : [req.body.platform],
            genre: req.body.genre.split(',').map(g => g.trim()),
            releaseDate: req.body.releaseDate,
            description: req.body.description
        };

        // If a new image was uploaded
        if (req.file) {
            // Delete old image if it exists
            if (game.imageUrl) {
                const oldImagePath = path.join(__dirname, '../..', 'public', game.imageUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }

        await Game.findByIdAndUpdate(req.params.id, updateData);
        res.redirect(`/games/${req.params.id}`);
    } catch (error) {
        console.error('Error updating game:', error);
        res.redirect('/games');
    }
});

// Delete game
router.delete('/:id', async (req, res) => {
    try {
        // First, get the game to find its image path
        const game = await Game.findById(req.params.id);
        
        if (game && game.imageUrl) {
            // Remove the '/uploads/' prefix from the imageUrl
            const imagePath = path.join(__dirname, '../..', 'public', game.imageUrl);
            
            // Delete the image file if it exists
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log('Image deleted successfully:', imagePath);
            }
        }

        // Then delete the game from database
        await Game.findByIdAndDelete(req.params.id);
        
        res.redirect('/games');
    } catch (error) {
        console.error('Error deleting game:', error);
        res.redirect('/games');
    }
});

module.exports = router; 