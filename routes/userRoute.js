const express = require("express");
const {
  getJWTToken,
  protect,
  getAllUsers,
  createAUser,
  getAUser,
  deleteAUser,
  updateAUser,
} = require("./../controllers/userController");

// Routs
const userRoute = express.Router();

userRoute.route("/jwt").get(getJWTToken);
userRoute.route("/").get(getAllUsers).post(createAUser);
userRoute.route("/:id").get(getAUser).delete(deleteAUser).patch(updateAUser);

module.exports = userRoute;
