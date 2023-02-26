const express = require("express");
const { protect, restrictTo } = require("../controllers/userController");
const { createPaymentIntent } = require("./../controllers/paymentController");
// Routs
const paymentRoute = express.Router();

paymentRoute.route("/create-payment-intent").post(protect, createPaymentIntent);

module.exports = paymentRoute;
