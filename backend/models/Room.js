const shortid = require("shortid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Message = require("./Message");

const RoomSchema = new Schema({
  room_id: {
    type: String,
    default: shortid.generate,
  },
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
  messages: [Message],
});

const Room = mongoose.model("room", RoomSchema);
module.exports = Room;
