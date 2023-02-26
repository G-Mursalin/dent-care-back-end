const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userRoute");
const serviceRoute = require("./routes/serviceRoute");
const bookingRoute = require("./routes/bookingRoute");
const doctorRoute = require("./routes/doctorRoute");
const paymentRoute = require("./routes/paymentRoute");
const AppError = require("./utils/appError");
const { globalErrorController } = require("./controllers/errorController");

//Middleware
app.use(express.json());
app.use(cors());

//Routs
app.use("/api/v1/users", userRoute);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/payment", paymentRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't not fine ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorController);

module.exports = app;
