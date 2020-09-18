// const shortid = require("shortid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageDB = require("./Message");

const RoomSchema = new Schema({
  room_name: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  messages: [MessageDB.MessageSchema],
});

const Room = mongoose.model("room", RoomSchema);
module.exports = Room;
