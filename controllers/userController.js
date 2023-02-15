const User = require("../models/userModel");
const { catchAsync } = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");

// Helping Functions
const createToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Handlers
const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access", 401)
    );
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const freshUser = await User.findOne({ email: decodedToken.email });
  if (!freshUser) {
    return next(new AppError("This user does not exist", 401));
  }

  req.user = freshUser;
  next();
});

const getJWTToken = catchAsync(async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });

  if (user) {
    const token = createToken(user.email);
    return res.status(500).send({ accessToken: token });
  }

  res.status(500).send({ accessToken: "" });
});

const getAllUsers = (req, res) => {
  res
    .status(500)
    .send({ message: "This route is not define yet (getAllUsers)" });
};
const createAUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const token = createToken(user.email);
    return res.status(500).send({ status: "success" });
  }

  const newUser = await User.create({ email: req.body.email });
  res.status(201).send({
    status: "success",
  });
});

const getAUser = (req, res) => {
  const { id } = req.params;
  res.status(500).send({ message: "This route is not define yet (getAUser)" });
};
const deleteAUser = (req, res) => {
  const { id } = req.params;
  res
    .status(500)
    .send({ message: "This route is not define yet (deleteAUser)" });
};
const updateAUser = (req, res) => {
  const { id } = req.params;
  res
    .status(500)
    .send({ message: "This route is not define yet (updateAUser)" });
};

module.exports = {
  getJWTToken,
  protect,
  getAllUsers,
  createAUser,
  getAUser,
  deleteAUser,
  updateAUser,
};
