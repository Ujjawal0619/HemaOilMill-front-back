const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// Load env vars
dotenv.config({ path: './config/config.env' });

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private (auth middleware protect this route)
router.get('/', auth, async (req, res) => {
  // remember if we have access to this route then auth middleware
  // set a user in req which contains user id.
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email }); // email : email (ES6 Sytax)

      //checking user
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // checking password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credential' });
      }

      const payload = {
        user: {
          id: user.id, // user id from DB (_id) of given email
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
