const User = require("../models/User");
const Attendee = require("../models/Attendee");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const register = async (req, res) => {
  const { lastname, firstname, gender, email, password } = req.body;
  const emailAlreadyExists = await User.find({ email });
  if (emailAlreadyExists.length > 0) {
    throw new CustomError.BadRequestError("Ce compte existe déjà.");
  }

  // First registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  await User.create({
    lastname,
    firstname,
    gender,
    email,
    password,
    role,
  }).then((response) => {
    console.log(response);
    const attendee = Attendee.create({firstname: response.firstname, lastname: response.lastname, user: response});
    res.status(StatusCodes.CREATED).json({
      msg: `Vous êtes maintenant enregistré ${response.firstname} ${response.lastname} et vous faites partie des participants.`,
      user: response,
    }); 
  })
 
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError.BadRequestError(
        "Merci de renseigner un email et un password corrects."
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError.UnauthenticatedError(
        "Les identifiants sont incorrects."
      );
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError(
        "Les identifiants sont incorrects."
      );
    }
    res.status(StatusCodes.OK).json({
        msg: `Vous êtes maintenant connecté ${user.firstname} ${user.lastname} .`,
        user: user,
      });
}

const logout = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "Vous êtes déconnecté." });
  };

  module.exports = {
    register,
    login,
    logout,
  };