const express = require("express");
const { protect } = require("../controllers/userController");
const {
  createABooking,
  getAllBookings,
  updateABooking,
} = require("./../controllers/bookingController");

// Routs
const bookingRoute = express.Router();

bookingRoute.route("/").get(protect, getAllBookings).post(createABooking);
bookingRoute.route("/:id").patch(updateABooking);

module.exports = bookingRoute;
