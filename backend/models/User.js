const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create user schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "email field is required"],
    unique: [true, "email must be unique"],
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
  profile_pic: { type: String, default: "" },
  rooms: [String],
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
