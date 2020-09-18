const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json({
            message: "user created!!",
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};

exports.delete = (req, res) => {
  User.remove({ _id: req.params.userID })
    .exec()
    .then((res_) => {
      res.status(200).json({
        message: "user deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, res_) => {
        if (err) {
          return res.status(401).json({
            message: "Unauthorized",
          });
        }

        if (res_) {
          const token = jwt.sign(
            {
              email: user[0].email,
              id: user[0]._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "auth successful",
            token: token,
          });
        } else {
          return res.status(401).json({
            message: "Unauthorized",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
