const mongoose = require("mongoose");
const validator = require("validator");

//Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please tell us your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Model
const User = mongoose.model("User", userSchema);

module.exports = User;
