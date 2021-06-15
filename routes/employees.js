const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Payment = require('../models/Payment');
const Employee = require('../models/Employee');

// @route   GET api/employees
// @desc    Get all user employees data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // because of auth middleware we have access to req.user.id (contains user id from token)
    // Also we have relationship b/w Record and User models. we will be able to filter records by user id.
    const employeeRecord = await Employee.find({
      user: req.user.id,
    }).sort({
      date: -1,
    });
    res.json(employeeRecord);
  } catch (err) {
    console.error(err.message); // server side console
    res.status(500).send('Server Error'); // responding to client
  }
});

// @route   POST api/employees
// @desc    Add new employees record
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('amount', 'Amount (salary) required').not().isEmpty(),
      check('mobile', 'Mobile is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('active', 'Active status required').not().isEmpty(),
      check('employeeType', 'EmployeeType required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { address, amount, desc, mobile, name, active, employeeType } =
      req.body;

    try {
      const newEmployee = new Employee({
        address,
        amount,
        desc,
        mobile,
        name,
        active,
        employeeType,
        due: 0, // for new employee
        adv: 0, // for new employee
        user: req.user.id, // relationship in model (user -> employee)
      });
      const employee = await newEmployee.save();

      res.json(employee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/employees/:id
// @desc    Update record with id
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const {
    address,
    amount,
    desc,
    mobile,
    name,
    active,
    employeeType,
    due,
    adv,
  } = req.body;

  // Build employee object
  const employeeFields = {};
  if (address) employeeFields.address = address;
  if (amount) employeeFields.amount = amount;
  if (desc) employeeFields.desc = desc;
  if (mobile) employeeFields.mobile = mobile;
  if (name) employeeFields.name = name;
  if (active) employeeFields.active = active;
  if (employeeType) employeeFields.employeeType = employeeType;
  if (due) employeeFields.due = due;
  if (adv) employeeFields.adv = adv;

  try {
    // since _id is unique so we not need 'type' to filter
    let employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({ msg: 'Employee not found' });

    // Make sure user owns contact
    // each employee is accociated to a user so
    if (employee.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: employeeFields },
      { new: true }
    );

    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/employees/:id
// @desc    Add new employees record
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({ msg: 'employee not found' });

    // Make sure user owns contact
    if (employee.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Payment.remove({ employee: req.params.id });
    await Employee.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Employee removed', type: 'employees' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
