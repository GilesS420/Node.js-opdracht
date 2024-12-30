const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  points: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Expert'],
    required: true
  },
  rarity: {
    type: Number, 
    default: 0
  }
});

module.exports = mongoose.model('Achievement', achievementSchema);
