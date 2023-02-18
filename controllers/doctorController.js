const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Doctor = require("../models/doctorModel");

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

module.exports = {
  createADoctor,
};
