const Booking = require("../models/bookingModel");
const { catchAsync } = require("../utils/catchAsync");

// Controllers

const getAllBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find();

  res.status(200).send({
    status: "success",
    results: bookings.length,
    data: { bookings },
  });
});

const createABooking = catchAsync(async (req, res) => {
  const newBooking = await Booking.create(req.body);
  res
    .status(201)
    .send({ status: "Booked Successfully", data: { booking: newBooking } });
});

module.exports = { createABooking, getAllBookings };
