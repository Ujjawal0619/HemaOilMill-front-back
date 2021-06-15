const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Record = require('../models/Record');

// @route   GET api/oil
// @desc    Get all user oil data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // because of auth middleware we have access to req.user.id (contains user id from token)
    // Also we have relationship b/w Record and User models. we will be able to filter records by user id.
    const oilRecord = await Record.find({
      user: req.user.id,
      type: 'oil',
    }).sort({
      date: -1,
    });
    res.json(oilRecord);
  } catch (err) {
    console.error(err.message); // server side console
    res.status(500).send('Server Error'); // responding to client
  }
});

// @route   POST api/oil
// @desc    Add new oil record
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('type', 'Type is required').not().isEmpty(),
      check('amount', 'Amount is required').not().isEmpty(),
      check('container', 'Container is required').not().isEmpty(),
      check('due', 'Due is required').not().isEmpty(),
      check('mobile', 'Mobile is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('paid', 'Paid is required').not().isEmpty(),
      check('quantity', 'Quantity is required').not().isEmpty(),
      check('rate', 'Rate is required').not().isEmpty(),
      check('transactionType', 'TransactionType is required').not().isEmpty(),
      check('transport', 'Transport is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      type,
      address,
      amount,
      container,
      desc,
      due,
      mobile,
      name,
      paid,
      quantity,
      rate,
      transactionType,
      transport,
    } = req.body;

    try {
      const newRecord = new Record({
        type,
        address,
        amount,
        container,
        desc,
        due,
        mobile,
        name,
        paid,
        quantity,
        rate,
        transactionType,
        transport,
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

// @route   PUT api/oil/:id
// @desc    Update record with id
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const {
    address,
    amount,
    container,
    desc,
    due,
    mobile,
    name,
    paid,
    quantity,
    rate,
    transactionType,
    transport,
  } = req.body;

  // Build record object
  const recordFields = {};
  if (address) recordFields.address = address;
  if (amount) recordFields.amount = amount;
  if (container) recordFields.container = container;
  if (desc) recordFields.desc = desc;
  if (due) recordFields.due = due;
  if (mobile) recordFields.mobile = mobile;
  if (name) recordFields.name = name;
  if (paid) recordFields.paid = paid;
  if (quantity) recordFields.quantity = quantity;
  if (rate) recordFields.rate = rate;
  if (transactionType) recordFields.transactionType = transactionType;
  if (transport) recordFields.transport = transport;

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

// @route   DELETE api/oil/:id
// @desc    Add new oil record
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

    res.json({ msg: 'Record removed', type: 'oil' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
