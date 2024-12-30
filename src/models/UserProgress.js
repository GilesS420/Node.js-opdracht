const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  achievements: [{
    achievement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement'
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    }
  }],
  completionPercentage: {
    type: Number,
    default: 0
  },
  hoursPlayed: {
    type: Number,
    default: 0
  },
  lastPlayed: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
