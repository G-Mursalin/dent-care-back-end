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
const restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
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

const isAdmin = catchAsync(async (req, res) => {
  const isAdmin = req.user.role === "admin";
  res.status(200).send({ isAdmin });
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

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).send({
    status: "success",
    results: users.length,
    data: { users },
  });
});

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

const makeAUserAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate({ _id: id }, { role: "admin" });

  if (!user) {
    return res.status(200).send({ status: "User not found", data: { user } });
  }

  res
    .status(200)
    .send({ status: "successfully updated to admin role", data: { user } });
});

module.exports = {
  getJWTToken,
  protect,
  getAllUsers,
  createAUser,
  isAdmin,
  getAUser,
  deleteAUser,
  makeAUserAdmin,
  restrictTo,
};
