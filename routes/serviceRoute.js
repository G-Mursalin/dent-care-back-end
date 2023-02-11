const express = require("express");
const { getAllServices } = require("./../controllers/serviceController");

// Routs
const serviceRoute = express.Router();

serviceRoute.route("/").get(getAllServices);

module.exports = serviceRoute;
