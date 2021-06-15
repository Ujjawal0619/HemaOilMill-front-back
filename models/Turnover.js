const mongoose = require('mongoose');

const TurnoverSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  day: {
    type: Date,
    uique: true,
    required: true,
    default: Date.now(),
  },
  expense: {
    type: Number,
    default: 0,
  },
  income: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('turnover', TurnoverSchema);
