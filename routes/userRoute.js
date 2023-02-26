const express = require("express");
const {
  getJWTToken,
  protect,
  restrictTo,
  getAllUsers,
  createAUser,
  isAdmin,
  deleteAUser,
  makeAUserAdmin,
} = require("./../controllers/userController");

// Routs
const userRoute = express.Router();

userRoute.route("/jwt").get(getJWTToken);
userRoute.route("/admin").get(protect, isAdmin);
userRoute
  .route("/")
  .get(protect, restrictTo("admin"), getAllUsers)
  .post(createAUser);
userRoute
  .route("/:id")
  .delete(protect, restrictTo("admin"), deleteAUser)
  .patch(protect, restrictTo("admin"), makeAUserAdmin);

module.exports = userRoute;
