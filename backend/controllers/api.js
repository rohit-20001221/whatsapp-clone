const Room = require("../models/Room");
const User = require("../models/User");
const fs = require("fs");
const mongoose = require("mongoose");
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
        { $push: { rooms: room._id } },
        { new: true }
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
  console.log(req.body);
  User.findOneAndUpdate(
    { email: req.user.email },
    { $push: { rooms: req.body.room_id } },
    { new: true }
  )
    .then((user) => {
      res.status(200).json({ user: user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getRooms = (req, res) => {
  // const ids = req.body.ids;
  // console.log(req.user);
  User.findOne({ _id: req.user.id })
    .then((user) => {
      const room_ids = user.rooms.map((id) => mongoose.Types.ObjectId(id));
      Room.find({ _id: { $in: room_ids } })
        .then((rooms) => {
          res.status(200).json({ rooms: rooms });
        })
        .catch((err) => {
          res.status(404).json({ error: "rooms not found" });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.sendMessage = (req, res) => {
  const id = req.params.roomId;
  Room.findOneAndUpdate(
    { _id: id },
    { $push: { messages: req.body.message } },
    { new: true }
  )
    .then((room) => {
      res.status(200).json({
        message: "message send successful!!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.latestMessage = (req, res) => {
  const id = req.query.roomId;
  Room.findOne({ _id: id }, { messages: true })
    .then(({ messages }) => {
      const message = messages.pop();
      res.status(200).json({
        latest_message: message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
