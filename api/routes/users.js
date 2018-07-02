const express = require('express');
const router = express.Router();

const User = require('../models/user');
const UserController = require('../controllers/user');

router.get('/', UserController.all_users);

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/:userId', UserController.user_delete);

router.put('/:userId', UserController.user_update);

router.post('/:userId/change', UserController.change_password);

module.exports = router;
