const Room = require("../models/Room");
const User = require("../models/User");
const fs = require("fs");
// const Message = require("../models/Message");

exports.createRoom = (req, res) => {
  let path;
  if (req.file !== undefined) {
    path = req.file.path;
  } else {
    path = "";
  }
  Room.create({
    room_name: req.body.room_name,
    created_by: req.user.email,
    room_image: path,
  })
    .then((room) => {
      User.findOneAndUpdate(
        { email: req.user.email },
        { $push: { rooms: room._id } }
      )
        .then((user) => {
          console.log(user);
          res.status(200).json({ user: user });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      fs.unlinkSync(path);
      res.status(500).json({ error: err.message });
    });
};

exports.addToRoom = (req, res) => {
  User.findOneAndUpdate(
    { email: req.user.email },
    { $push: { rooms: req.body.room_id } }
  )
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
