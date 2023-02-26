const express = require("express");
const { protect } = require("../controllers/userController");
const {
  getAllServices,
  getAllServicesName,
} = require("./../controllers/serviceController");

// Routs
const serviceRoute = express.Router();

serviceRoute.route("/").get(protect, getAllServices);
serviceRoute.route("/name").get(protect, getAllServicesName);

module.exports = serviceRoute;
