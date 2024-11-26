const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  login_type: {
    type: String,
    enum: ["Google", "Facebook", "Apple"],
    trim: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
