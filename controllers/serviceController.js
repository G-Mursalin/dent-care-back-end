const Service = require("../models/serviceModel");
const { catchAsync } = require("../utils/catchAsync");

const getAllServices = catchAsync(async (req, res) => {
  const services = await Service.find();

  res.status(200).send({
    status: "success",
    results: services.length,
    data: { services },
  });
});

module.exports = { getAllServices };
