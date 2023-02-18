const mongoose = require("mongoose");
const validator = require("validator");

//Schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us doctor name!"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please tell us  doctor email!"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  specialty: {
    type: String,
    required: [true, "Please tell us doctor specialty!"],
    trim: true,
  },
  imgUrl: {
    type: String,
    required: [true, "Doctor Image is required"],
  },
});

// Model
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
