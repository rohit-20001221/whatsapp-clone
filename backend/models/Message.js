const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user_email: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("message", MessageSchema);
exports.MessageSchema = MessageSchema;
exports.Message = Message;
