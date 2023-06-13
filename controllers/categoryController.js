const Category = require("../models/Category");
const Transaction = require("../models/Transaction");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Attendee = require("../models/Attendee");

const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .send({ msg: "Votre catégorie a bien été crée.", category: category });
};

const getAllCategory = async (req, res) => {
  const categories = await Category.find({})
    .populate({ path: "attendee", select: "firstname lastname" })
    .populate({ path: "user", select: "_id firstname lastname" });
  res.status(StatusCodes.OK).json({ categories: categories });
};

const getSingleCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const category = await Category.findOne({ _id: categoryId })
    .populate({ path: "attendee", select: "firstname lastname" })
    .populate({ path: "user", select: "_id firstname lastname" });

  if (!category) {
    throw new CustomError.NotFoundError(`La catégorie n'existe pas.`);
  }

  res.status(StatusCodes.OK).json({ category });
};

const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const { name, description, priceTotal, motto, attendees, user } = req.body;
  const category = await Category.findOne({ _id: categoryId });
  const nbAttendees = await Attendee.countDocuments({status : true});
  if (!category) {
    throw new CustomError.NotFoundError(`La catégorie n'existe pas.`);
  }
  category._id = categoryId;
  category.name = name;
  category.description = description;
  category.motto = motto;
  category.priceTotal = parseInt(priceTotal);
  category.atMyExpense = parseInt(priceTotal) / parseInt(nbAttendees);
  category.attendees = attendees;
  category.user = user;
  await category.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Votre catégorie a été modifiée avec succes.", categories: category });
};

const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const category = await Category.findOne({ _id: categoryId });

  const transactions = await Transaction.find({ category: categoryId });
  console.log(transactions);
  if(transactions.length > 0) {
    console.log("coucou");
    throw new CustomError.UnauthorizedError(`La catégorie ne peut pas être supprimé car elle contient des transactions.`);
  }

  if (!category) {
    throw new CustomError.NotFoundError(`La catégorie n'existe pas.`);
  }

  await Category.deleteOne({ _id: categoryId });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Votre catégorie a été supprimée avec succes." });
};

module.exports = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
