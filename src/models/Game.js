const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  platform: [{
    type: String,
    required: true
  }],
  genre: [{
    type: String,
    required: true
  }],
  totalAchievements: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  releaseDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema); 