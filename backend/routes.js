const express = require("express");
const router = express.Router();
const User = require("./models/User");
const jwt = require("jsonwebtoken");

//get list of users
router.get("/users", (req, res) => {
  res.status(200).json({
    type: "GET",
    api: "/users",
  });
});

router.post("/users", (req, res, next) => {
  // let user = new User(req.body);
  // user.save();
  User.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(next);
});

router.post("/login", (req, res) => {});

module.exports = router;
