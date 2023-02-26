const express = require("express");
const { protect } = require("../controllers/userController");
const {
  createABooking,
  getAllBookings,
  updateABooking,
  deleteBooking,
  getAllBookingsGroupsByDate,
} = require("./../controllers/bookingController");

// Routs
const bookingRoute = express.Router();

bookingRoute
  .route("/")
  .get(protect, getAllBookings)
  .post(protect, createABooking);
bookingRoute
  .route("/bookings-group-date")
  .get(protect, getAllBookingsGroupsByDate);
bookingRoute
  .route("/:id")
  .patch(protect, updateABooking)
  .delete(protect, deleteBooking);

module.exports = bookingRoute;
