const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, required: true },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard', 'Expert'],
    required: true 
  },
  game: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game',
    required: true 
  },
  imageUrl: { type: String },
  unlockDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
