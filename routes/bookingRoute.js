const express = require("express");
const { protect } = require("../controllers/userController");
const {
  createABooking,
  getAllBookings,
} = require("./../controllers/bookingController");

// Routs
const bookingRoute = express.Router();

bookingRoute.route("/").get(protect, getAllBookings).post(createABooking);

module.exports = bookingRoute;
