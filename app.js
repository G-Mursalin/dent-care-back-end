const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userRoute");
const serviceRoute = require("./routes/serviceRoute");
const AppError = require("./utils/appError");
const { globalErrorController } = require("./controllers/errorController");

//Middleware
app.use(express.json());
app.use(cors());

//Routs
app.use("/api/v1/users", userRoute);
app.use("/api/v1/services", serviceRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't not fine ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorController);

module.exports = app;
