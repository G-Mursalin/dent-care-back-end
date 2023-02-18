const express = require("express");
const { protect } = require("../controllers/userController");
const {
  createADoctor,
  getAllDoctors,
} = require("./../controllers/doctorController");
// Routs
const doctorRoute = express.Router();

doctorRoute.route("/").post(protect, createADoctor).get(protect, getAllDoctors);
module.exports = doctorRoute;
