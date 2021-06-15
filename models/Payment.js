const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employees',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  type: {
    type: String,
    default: 'payments',
  },
  amount: {
    type: Number,
    default: null,
  },
  paid: {
    type: Number,
    defalut: null,
  },
  due: {
    type: Number,
    default: 0,
  },
  advance: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  desc: {
    type: String,
    default: 'Not Availabel',
  },
  modified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('payments', PaymentSchema);
