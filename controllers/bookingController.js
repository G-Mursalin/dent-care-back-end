const Booking = require("../models/bookingModel");
const { catchAsync } = require("../utils/catchAsync");

// Controllers

const getAllBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find(req.query);

  res.status(200).send({
    status: "success",
    results: bookings.length,
    data: { bookings },
  });
});

const getAllBookingsGroupsByDate = catchAsync(async (req, res) => {
  const bookings = await Booking.aggregate([
    {
      $match: {},
    },
    {
      $group: {
        _id: "$appointmentDate",
        bookingOnThisDay: { $push: "$$ROOT" },
      },
    },
    {
      $sort: { _id: -1 },
    },
  ]);

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

const updateABooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!booking) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).send({ status: "successfully paid", data: { booking } });
});

const deleteBooking = catchAsync(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }
  res.status(201).send({ status: "successfully deleted", data: null });
});

module.exports = {
  createABooking,
  getAllBookings,
  updateABooking,
  deleteBooking,
  getAllBookingsGroupsByDate,
};
