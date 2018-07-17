const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

const User = require('../models/user');
const UserController = require('../controllers/user');

//get all users data
router.get('/', UserController.all_users);

//logout
router.get('/:userId/logout', UserController.user_logout);

//login
router.post('/login', UserController.user_login);

//delete user
router.delete('/:userId', UserController.user_delete);

//update user name & phone number
router.put('/:userId', UserController.user_update);

//register new user
router.post('/signup', [
  check('name').not().isEmpty().withMessage('name cannot be empty'),
  check('email').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage('your email is invalid'),
  check('phoneNumber').matches(/^\d+$/).withMessage('must contain a numbers only'),
  check('password').matches(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/).withMessage('must contain at least 8 chars, a combination of letters and numbers')
], UserController.user_signup);

//change password
router.post('/:userId/change', [
  check('password').matches(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/).withMessage('must contain at least 8 chars, a combination of letters and numbers')],
UserController.change_password);

module.exports = router;
