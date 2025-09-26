require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');

const app = express();

// Passport
app.use(passport.initialize());

// app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/authentication'));
app.use('/api', require('./routes/api'));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});