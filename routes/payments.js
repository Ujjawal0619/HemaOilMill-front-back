const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Employee = require('../models/Employee');
const Payment = require('../models/Payment');

// @route   GET api/payments/empId
// @desc    Get all user payments data
// @access  Private
router.get('/:empId', auth, async (req, res) => {
  try {
    // because of auth middleware we have access to req.user.id (contains user id from token)
    // Also we have relationship b/w Record and User models. we will be able to filter records by user id.
    const paymentRecord = await Payment.find({
      employee: req.params.empId,
    }).sort({
      date: -1,
    });

    res.json(paymentRecord);
  } catch (err) {
    console.error(err.message); // server side console
    res.status(500).send('Server Error'); // responding to client
  }
});

// @route   POST api/payments
// @desc    Add new payments record
// @access  Private
router.post(
  '/:empId',
  [
    auth,
    [
      check('amount', 'Amount is required').not().isEmpty(),
      check('due', 'Due is required').not().isEmpty(),
      check('paid', 'Paid is required').not().isEmpty(),
      check('advance', 'Advance is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { amount, due, paid, advance, desc } = req.body;

    if (due > 0 && advance > 0) {
      return res
        .status(400)
        .json({ msg: "A payment can't have advance and due both values" });
    }

    const empId = req.params.empId;
    if (!empId) {
      return res.status(400).json({ msg: 'header does not contain empId' });
    }
    try {
      let employee = await Employee.findById(req.params.empId);

      if (!employee) return res.status(404).json({ msg: 'Employee not found' });

      // Make sure user owns contact
      // each employee is accociated to a user so
      if (employee.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      const newPayment = new Payment({
        amount,
        due,
        paid,
        advance,
        desc,
        employee: empId, // relationship in model (employee -> payment)
        user: req.user.id, // include by auth middleware in header
      });

      let employeeFields = { advance, due };

      const payment = await newPayment.save();
      employee = await Employee.findByIdAndUpdate(
        req.params.empId,
        { $set: employeeFields },
        { new: true }
      );
      res.json(payment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/payments/:id
// @desc    Update record with id
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { amount, due, paid, advance, desc } = req.body;

  // Build record object
  const paymentFields = {};
  if (amount) paymentFields.amount = amount;
  if (due) paymentFields.due = due;
  if (paid) paymentFields.paid = paid;
  if (advance) paymentFields.advance = advance;
  if (desc) paymentFields.desc = desc;
  paymentFields.modified = true;

  try {
    // since _id is unique so we not need 'employee' to filter
    let payment = await Payment.findById(req.params.id);

    if (!payment) return res.status(404).json({ msg: 'Payment not found' });

    // Make sure user owns contact
    if (payment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { $set: paymentFields },
      { new: true }
    );

    await Employee.findByIdAndUpdate(payment.employee, {
      $set: { advance, due },
    });

    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/payments/:id
// @desc    Add new payments record
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let payment = await Payment.findById(req.params.id);

    if (!payment)
      return res.status(404).json({ msg: 'Payment record not found' });

    // Make sure user owns contact
    if (payment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Payment.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Record removed', type: 'payments' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
