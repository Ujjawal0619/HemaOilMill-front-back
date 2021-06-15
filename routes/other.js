const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Record = require('../models/Record');

// @route   GET api/other
// @desc    Get all user other data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // because of auth middleware we have access to req.user.id (contains user id from token)
    // Also we have relationship b/w Record and User models. we will be able to filter records by user id.
    const otherRecord = await Record.find({
      user: req.user.id,
      type: 'other',
    }).sort({
      date: -1,
    });
    res.json(otherRecord);
  } catch (err) {
    console.error(err.message); // server side console
    res.status(500).send('Server Error'); // responding to client
  }
});

// @route   POST api/other
// @desc    Add new other record
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('type', 'Type is required').not().isEmpty(),
      check('amount', 'Amount is required').not().isEmpty(),
      check('expenseType', 'ExpenseType is required').not().isEmpty(),
      check('transactionType', 'TransactionType is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, amount, desc, expenseType, transactionType } = req.body;

    try {
      const newRecord = new Record({
        type,
        amount,
        desc,
        expenseType,
        transactionType,
        user: req.user.id, // relationship in model (user -> record)
      });

      const record = await newRecord.save();

      res.json(record);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/other/:id
// @desc    Update record with id
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { type, amount, desc, expenseType, transactionType } = req.body;

  // Build record object
  const recordFields = {};
  if (type) recordFields.type = type;
  if (amount) recordFields.amount = amount;
  if (desc) recordFields.desc = desc;
  if (expenseType) recordFields.expenseType = expenseType;
  if (transactionType) recordFields.transactionType = transactionType;

  try {
    // since _id is unique so we not need 'type' to filter
    let record = await Record.findById(req.params.id);

    if (!record) return res.status(404).json({ msg: 'Record not found' });

    // Make sure user owns contact
    // each record is accociated to a user so
    if (record.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    record = await Record.findByIdAndUpdate(
      req.params.id,
      { $set: recordFields },
      { new: true }
    );

    res.json(record);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/other/:id
// @desc    Add new other record
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let record = await Record.findById(req.params.id);

    if (!record) return res.status(404).json({ msg: 'Record not found' });

    // Make sure user owns contact
    if (record.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Record.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Record removed', type: 'other' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
