const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./util/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

//Connect Database
connectDB();

// Init Middleware in order to use req.body
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello from express');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/mustard', require('./routes/mustard'));
app.use('/api/containers', require('./routes/containers'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/other', require('./routes/other'));
app.use('/api/oil', require('./routes/oil'));
app.use('/api/cake', require('./routes/cake'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/turnover', require('./routes/turnover'));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
