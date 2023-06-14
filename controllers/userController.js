const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUser = async (req, res) => {
  console.log("Get all user");
  const user = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ user });
};
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(
      `Pas d'utilisateur avec l'id: ${req.params.id}`
    );
  }
  res.status(StatusCodes.OK).json({ user });
};
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, email } = req.body;
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`L'utilisateur n'existe pas.`);
  }
  user.firstname = firstname !== "" ? firstname : user.firstname;
  user.lastname = lastname !== "" ? lastname : user.lastname;
  user.email = email !== "" ? email : user.email;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Votre profil a été modifié avec succés." });
};
const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  res.status(StatusCodes.OK).json({ user: user });
};
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  console.log(user);
  if (!user) {
    throw new CustomError.NotFoundError(`Le participant n'existe pas.`);
  }
  await user.deleteOne({ _id: userId });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Votre participant a été supprimé avec succès." });
};

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  deleteUser,
};
