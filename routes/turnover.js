const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Record = require('../models/Record');
const Payment = require('../models/Payment');

// @route   GET api/turnover
// @desc    Get all user turnover data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // const { startDate, endDate } = req.body;

    const startDate = new Date(2021 - 06 - 06);
    const endDate = Date.now(2021 - 06 - 08);

    if (startDate === '' || endDate === '') {
      return res.status(400).json({
        msg: 'Please ensure you pick two dates',
      });
    }

    const allRecord = await Record.find({
      user: req.user.id,
      date: {
        $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
        $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
      },
    });
    const allPayment = await Payment.find({
      user: req.user.id,
      date: {
        $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
        $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
      },
    });

    allRecord.concat(allPayment);

    // required operation on records filterd date range
    res.send(allRecord);
  } catch (err) {
    console.error(err.message); // server side console
    res.status(500).send('Server Error'); // responding to client
  }
});

module.exports = router;
