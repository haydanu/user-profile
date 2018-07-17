const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const session = require('express-session')
require('dotenv').config()

const app = express();

const usersRoutes = require('./api/routes/users');

mongoose.connect('mongodb://localhost:27017/gigel-user');

// app.use(express.static('public'));

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session( {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));

//home page
app.get('/', (req, res, next) => {
  const localTime = (new Date()).toLocaleTimeString();

  res.status(200).send(`hello gigel user! server run start on ${localTime}.`)
});

//Routes to handle request
app.use('/user', usersRoutes);

// catch 404
app.use((req, res, next) => {
  const error = new Error('this route is not available, please back to home');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
