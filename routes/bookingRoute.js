const express = require("express");
const {
  createABooking,
  getAllBookings,
} = require("./../controllers/bookingController");

// Routs
const bookingRoute = express.Router();

bookingRoute.route("/").get(getAllBookings).post(createABooking);

module.exports = bookingRoute;
