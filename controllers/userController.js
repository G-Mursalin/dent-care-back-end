const User = require("../models/userModel");
const { catchAsync } = require("../utils/catchAsync");

// Handlers
const getAllUsers = (req, res) => {
  res
    .status(500)
    .send({ message: "This route is not define yet (getAllUsers)" });
};
const createAUser = catchAsync(async (req, res) => {
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
  getAllUsers,
  createAUser,
  getAUser,
  deleteAUser,
  updateAUser,
};
