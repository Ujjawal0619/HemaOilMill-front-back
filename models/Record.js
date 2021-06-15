const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: 'Not Availabel',
  },
  amount: {
    type: Number,
    default: null,
  },
  container: {
    type: Object,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  desc: {
    type: String,
    default: 'Not Availabel',
  },
  due: {
    type: Number,
    default: 0,
  },
  expenseType: {
    type: String,
    default: null,
  },
  mobile: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  quantity: {
    type: Number,
    default: null,
  },
  rate: {
    type: Number,
    default: null,
  },
  transactionType: {
    type: String,
    default: null,
  },
  transport: {
    type: Number,
    default: null,
  },
  paid: {
    type: Number,
    defalut: null,
  },
  adv: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model('records', RecordSchema);
