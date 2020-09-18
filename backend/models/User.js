const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create user schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rooms: [String],
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
