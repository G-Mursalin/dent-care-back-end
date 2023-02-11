const mongoose = require("mongoose");

//Schema
const bookingSchema = new mongoose.Schema({
  serviceId: {
    type: String,
    required: [true, "Service ID is required!"],
  },
  serviceName: {
    type: String,
    required: [true, "Service name is required!"],
    trim: true,
  },
  servicePrice: {
    type: Number,
    required: [true, "Service price is required!"],
    min: [0, "Price can not be negative"],
  },
  appointmentDate: {
    type: String,
    required: [true, "Appointment date is required!"],
  },
  slot: {
    type: String,
    required: [true, "Slot data is required!"],
  },
  patientName: {
    type: String,
    required: [true, "Patent Name is required!"],
  },
  patientEmail: {
    type: String,
    required: [true, "Patent Email is required!"],
  },
  patientPhone: {
    type: String,
    required: [true, "Patent Phone is required!"],
  },
});

// Model
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
