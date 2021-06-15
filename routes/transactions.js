const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const Record = require('../models/Record');
const Payment = require('../models/Payment');
const Employee = require('../models/Employee');

// @route   GET api/transactions
// @desc    Get all user transactions data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const allRecord = await Record.find({
      user: req.user.id,
      date: {
        $gte: new Date(
          new Date().getTime() - process.env.QUERY_DAYS * 24 * 60 * 60 * 1000
        ),
      },
    });

    let allPayment = await Payment.find({
      user: req.user.id,
      date: {
        $gte: new Date(
          new Date().getTime() - process.env.QUERY_DAYS * 24 * 60 * 60 * 1000
        ),
      },
    }).lean();

    // adding more info of employee related to each payment

    const employeeRecord = await Employee.find({
      user: req.user.id,
    });

    const mp = {};
    for (emp in employeeRecord) {
      mp[employeeRecord[emp]._id] = employeeRecord[emp];
    }

    for (let i = 0; i < allPayment.length; i++) {
      allPayment[i].name = mp[allPayment[i].employee].name;
      allPayment[i].mobile = mp[allPayment[i].employee].mobile;
      allPayment[i].salary = mp[allPayment[i].employee].amount;
    }

    const allResult = allRecord
      .concat(allPayment)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(allResult);
  } catch (err) {
    console.error(err.message); // server side console
    res.status(500).send('Server Error'); // responding to client
  }
});

module.exports = router;
