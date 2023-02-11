const mongoose = require("mongoose");

//Schema
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Service price is required"],
  },
  slots: {
    type: [String],
    required: [true, "Time slots is required"],
  },
});

// Model
const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
