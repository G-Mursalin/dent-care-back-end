const express = require("express");
const { protect, restrictTo } = require("../controllers/userController");
const {
  createADoctor,
  getAllDoctors,
  deleteADoctor,
} = require("./../controllers/doctorController");
// Routs
const doctorRoute = express.Router();

doctorRoute
  .route("/")
  .post(protect, restrictTo("admin"), createADoctor)
  .get(getAllDoctors);
doctorRoute.route("/:id").delete(protect, restrictTo("admin"), deleteADoctor);

module.exports = doctorRoute;
