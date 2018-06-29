const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRoutes = require('./api/routes/users');

mongoose.connect('mongodb://localhost/gigel-user');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

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
