const Service = require("../models/serviceModel");
const { catchAsync } = require("../utils/catchAsync");

const getAllServices = catchAsync(async (req, res) => {
  const date = req.query.date;
  const services_aggregate = await Service.aggregate([
    {
      $lookup: {
        from: "bookings",
        localField: "name",
        foreignField: "serviceName",
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$appointmentDate", date],
              },
            },
          },
        ],
        as: "booked",
      },
    },
    {
      $project: {
        name: 1,
        slots: 1,
        price: 1,
        booked: {
          $map: {
            input: "$booked",
            as: "book",
            in: "$$book.slot",
          },
        },
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        slots: {
          $setDifference: ["$slots", "$booked"],
        },
      },
    },
  ]);

  res.status(200).send({
    status: "success",
    results: services_aggregate.length,
    data: { services: services_aggregate },
  });
});

const getAllServicesName = catchAsync(async (req, res) => {
  const services_name = await Service.find().select({ name: 1 });

  res.status(200).send({
    status: "success",
    results: services_name.length,
    data: { servicesName: services_name },
  });
});

module.exports = { getAllServices, getAllServicesName };
