const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters long']
  },
  platform: {
    type: [String],
    required: [true, 'At least one platform is required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Please select at least one platform'
    }
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long']
  },
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required'],
    validate: {
      validator: function(date) {
        return date <= new Date();
      },
      message: 'Release date cannot be in the future'
    }
  },
  imageUrl: {
    type: String,
    trim: true
  },
  totalAchievements: {
    type: Number,
    min: [0, 'Total achievements cannot be negative'],
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema); 