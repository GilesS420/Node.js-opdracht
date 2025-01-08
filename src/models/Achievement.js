const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long']
  },
  points: {
    type: Number,
    required: [true, 'Points are required'],
    enum: {
      values: [5, 10, 15, 20],
      message: 'Points must be either 5, 10, 15, or 20'
    }
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required'],
    enum: {
      values: ['Easy', 'Medium', 'Hard', 'Expert'],
      message: '{VALUE} is not a valid difficulty level'
    }
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: [true, 'Game reference is required']
  },
  imageUrl: { type: String },
  unlockDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
