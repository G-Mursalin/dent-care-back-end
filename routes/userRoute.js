const express = require("express");
const {
  getJWTToken,
  protect,
  restrictTo,
  getAllUsers,
  createAUser,
  isAdmin,
  getAUser,
  deleteAUser,
  makeAUserAdmin,
} = require("./../controllers/userController");

// Routs
const userRoute = express.Router();

userRoute.route("/jwt").get(getJWTToken);
userRoute.route("/admin").get(protect, isAdmin);
userRoute.route("/").get(getAllUsers).post(createAUser);
userRoute
  .route("/:id")
  .get(getAUser)
  .delete(deleteAUser)
  .patch(protect, restrictTo("admin"), makeAUserAdmin);

module.exports = userRoute;
