const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Doctor = require("../models/doctorModel");

// Handlers

const getAllDoctors = catchAsync(async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).send({
    status: "success",
    results: doctors.length,
    data: { doctors },
  });
});

const createADoctor = catchAsync(async (req, res) => {
  const newDoctor = await Doctor.create({
    name: req.body.name,
    email: req.body.email,
    specialty: req.body.specialty,
    imgUrl: req.body.imgUrl,
  });
  res.status(201).send({
    status: "success",
  });
});

const deleteADoctor = catchAsync(async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);
  if (!doctor) {
    return next(new AppError("No doctor found with that ID", 404));
  }
  res.status(201).send({ status: "successfully deleted", data: null });
});

module.exports = {
  createADoctor,
  getAllDoctors,
  deleteADoctor,
};
