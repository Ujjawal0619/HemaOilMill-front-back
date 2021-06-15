// middleware is just a function that as acces to
// request response cycle/object, So every time we hit
// an end-point we can fireoff(for protective routes)
// this middleware and we can  check if threre is any token in header

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

module.exports = function (req, res, next) {
  // Get the token from header
  const token = req.header('Authorization');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token, Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // returns payload which we set to token, during Register user/ Sign in without token if expires and send back to user
    req.user = decoded.user; // updating the id of user to req.
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
