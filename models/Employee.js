const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  active: {
    type: Boolean,
    default: true,
  },
  employeeType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: null,
  },
  mobile: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    default: 'Not Availabel',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    require: true,
  },
  desc: {
    type: String,
    default: 'Not Availabel',
  },
  due: {
    type: Number,
    default: 0,
  },
  advance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('employees', EmployeeSchema);
