const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const parser = require('../middleware/parser');
const User = require("../models/user");
const Blacklist = require('../models/blacklist');
const errorHandler = require('../middleware/errorHandler');

exports.user_signup = (req, res, next) => {
  const params = parser.parse_query_params(req, res, next);
  if (!params.BAD_REQUEST) {
    console.log(req.body)
    User.find({
        email: req.body.email
      })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                role: "User",
                username: req.body.username
              });
              user
                .save()
                .then(result => {
                  // console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => errorHandler(err));
            }
          });
        }
      });
  }
};

exports.user_login = (req, res, next) => {
  const params = parser.parse_query_params(req, res, next);
  if (!params.BAD_REQUEST) {
    User.find({
        username: req.body.username
      })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            console.log(user[0]);
            console.log(user[0].role);
            const token = jwt.sign({
                email: user[0].email,
                userId: user[0]._id,
                role: user[0].role
              },
              process.env.JWT_KEY, {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => errorHandler(err));
  }
};

exports.user_delete = (req, res, next) => {
  const params = parser.parse_query_params(req, res, next);
  if (!params.BAD_REQUEST) {
    User.remove({
        _id: req.params.userId
      })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => errorHandler(err));
  }
};




exports.users_get_all = (req, res, next) => {
  const params = parser.parse_query_params(req, res, next);
  if (!params.BAD_REQUEST) {
    User.find()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          users: docs.map(doc => {
            return {
              _id: doc._id,
              email: doc.email,
              role: doc.role
            }
          })
        }
        res.status(200).json(response);
      })
      .catch(err => errorHandler(err));
  }
}




exports.user_logout = (req, res, next) => {
  const params = parser.parse_query_params(req, res, next);
  if (!params.BAD_REQUEST) {
    // console.log(req.headers['x-observatory-auth']);
    const invalidToken = new Blacklist({
      _id: new mongoose.Types.ObjectId(),
      token: req.headers['x-observatory-auth']
    });
    invalidToken
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({
          message: 'OK',
        });
      })
      .catch(err => errorHandler(err));
  }
};