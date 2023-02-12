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
  const { serviceName, patientEmail, appointmentDate } = req.body;

  // Limit Booking per user per treatment per day
  const isAlreadyBooked = await Booking.find({
    serviceName,
    patientEmail,
    appointmentDate,
  });
  if (!(isAlreadyBooked.length === 0)) {
    res.status(201).send({
      status: `You already have an appointment on ${appointmentDate}`,
      data: { booking: isAlreadyBooked },
    });
  } else {
    // Create booking
    const newBooking = await Booking.create(req.body);
    res
      .status(201)
      .send({ status: "Booked Successfully", data: { booking: newBooking } });
  }
});

module.exports = { createABooking, getAllBookings };
