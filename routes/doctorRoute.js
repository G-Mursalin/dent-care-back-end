const express = require("express");
const { protect } = require("../controllers/userController");
const { createADoctor } = require("./../controllers/doctorController");
// Routs
const doctorRoute = express.Router();

doctorRoute.route("/").post(protect, createADoctor);
module.exports = doctorRoute;
