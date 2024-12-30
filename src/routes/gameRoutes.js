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
    try {
        console.log('Attempting to render newGame form');
        console.log('Views directory:', req.app.get('views')); // Log the views directory path
        res.render('games/newGame', (err, html) => {
            if (err) {
                console.error('Error rendering template:', err);
                return res.status(500).send(err.message);
            }
            res.send(html);
        });
    } catch (error) {
        console.error('Error in newGame route:', error);
        res.status(500).send('Error loading the new game form');
    }
});

// Create new game with file upload
router.post('/', upload.single('gameImage'), async (req, res) => {
    try {
        console.log('Form data received:', req.body);  // Log the form data
        console.log('File uploaded:', req.file);      // Log the uploaded file

        const gameData = {
            title: req.body.title,
            platform: Array.isArray(req.body.platform) ? req.body.platform : [req.body.platform], // Ensure platform is an array
            genre: req.body.genre,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
            releaseDate: req.body.releaseDate,
            description: req.body.description
        };
        
        console.log('Game data to save:', gameData);  // Log the processed data

        const game = new Game(gameData);
        await game.save();
        console.log('Game saved successfully:', game);  // Log the saved game
        res.redirect('/games');
    } catch (error) {
        console.error('Error creating game:', error);
        res.render('games/newGame', { 
            error: error.message
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