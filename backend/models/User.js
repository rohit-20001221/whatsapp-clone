const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create user schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "username was not provided"],
  },
  email: {
    type: String,
    required: [true, "email was not provided"],
  },
  name: {
    type: String,
    required: [true, "provide a name"],
  },
  password: {
    type: String,
    required: [true, "provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
