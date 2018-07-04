const express = require('express');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');

const User = require("../models/user");

// exports.user_signup = (req, res, next) => {
//   User.find({email: req.body.email}).exec().then(user => {
//     if (user.length >= 1) {
//       return res.status(409).json({message: "Account with this email already registered"});
//     } else {
//       bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//           return res.status(500).json({error: err});
//         } else {
//           const user = new User({_id: new mongoose.Types.ObjectId(), name: req.body.name, phoneNumber: req.body.phoneNumber, email: req.body.email, password: hash});
//           user.save().then(result => {
//             console.log(result);
//             res.status(201).json({message: "User created"});
//           }).catch(err => {
//             console.log(err);
//             res.status(500).json({error: err});
//           });
//         }
//       });
//     }
//   });
// };

exports.user_login = (req, res, next) => {
  User.findOne({email: req.body.email}).exec().then(user => {
    if (!user) {
      return res.status(401).json({message: 'Auth failed'});
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({message: 'Auth failed'});
      }
      if (result) {
        return res.status(200).json({message: 'Auth successful'});
      }
      res.status(401).json({message: 'Auth failed'});
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
};

exports.user_delete = (req, res, next) => {
  User.remove({_id: req.params.userId}).exec().then(result => {
    res.status(200).json({message: 'User deleted'});
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
};

exports.user_update = (req, res, next) => {
  User.update({name: req.body.name, phoneNumber: req.body.phoneNumber}).exec().then(result => {
    res.status(200).json({message: 'User updated'});
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
};

// exports.change_password = (req, res, next) => {
//   User.update({password: req.body.password}).exec().then(bcrypt.hash(req.body.password, 10, (err, hash) => {
//     if (err) {
//       return res.status(500).json({error: err});
//     } else {
//       User.findById(req.params.userId, (err, user) => {
//         if (err) {
//           return next(err);
//         }
//         user.password = hash
//         user.save()
//       }).then(result => {
//         console.log(result);
//         res.status(201).json({message: "password changed"});
//       }).catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//       });
//     }
//   }))
// };

exports.all_users = (req, res, next) => {
  User.find({}).exec().then(result => {
    res.status(200).json({result});
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
};
