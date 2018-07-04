const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

const User = require('../models/user');
const UserController = require('../controllers/user');


router.get('/', UserController.all_users);

router.post('/signup', [
  check('name').not().isEmpty().withMessage('name cannot be empty'),
  check('email').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage('your email is invalid'),
  check('phoneNumber').matches(/^\d+$/).withMessage('must contain a numbers only'),
  check('password').matches(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/).withMessage('must contain a combination of letters and numbers')
], (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
  } else {
    User.find({email: req.body.email}).exec().then(user => {
      if (user.length >= 1) {
        return res.status(409).json({message: "Account with this email already registered"});
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({error: err});
          } else {
            const user = new User({_id: new mongoose.Types.ObjectId(), name: req.body.name, phoneNumber: req.body.phoneNumber, email: req.body.email, password: hash});
            user.save().then(result => {
              console.log(result);
              res.status(201).json({message: "User created"});
            }).catch(err => {
              console.log(err);
              res.status(500).json({error: err});
            });
          }
        });
      }
    });
  }
});

router.post('/login', UserController.user_login);

router.delete('/:userId', UserController.user_delete);

router.put('/:userId', UserController.user_update);

router.post('/:userId/change', UserController.change_password);

module.exports = router;
