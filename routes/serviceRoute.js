const express = require("express");
const {
  getAllServices,
  getAllServicesName,
} = require("./../controllers/serviceController");

// Routs
const serviceRoute = express.Router();

serviceRoute.route("/").get(getAllServices);
serviceRoute.route("/name").get(getAllServicesName);

module.exports = serviceRoute;
